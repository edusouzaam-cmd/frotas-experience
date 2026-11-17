#!/usr/bin/env python3
"""Gera o plugin WordPress do Frotas Experience a partir do pacote estático.

Uso (na raiz do repositório):
    node scripts/build-kinghost.mjs        # gera dist/kinghost/
    python3 wordpress-plugin/build.py      # gera dist/wordpress/engeteles-frotas-experience.zip
"""
import hashlib
import os
import re
import shutil
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_PLUGIN = os.path.join(ROOT, "wordpress-plugin", "engeteles-frotas-experience")
PACKAGE = os.path.join(ROOT, "dist", "kinghost")
SLUG = "engeteles-frotas-experience"
OUT_DIR = os.path.join(ROOT, "dist", "wordpress")
BUILD = os.path.join(OUT_DIR, SLUG)
SITE = os.path.join(BUILD, "site")

BASE = "/frotas-experience"
ABS_BASE = "https://engeteles.com.br/frotas-experience"
ASSETS = "{{ENGETELES_FROTAS_EXPERIENCE_ASSETS}}"
HOME = "{{ENGETELES_FROTAS_EXPERIENCE_HOME}}"
MAX_ZIP = 60 * 1024 * 1024  # limite de upload configurado no WordPress: 64 MB

# Endereço (depois de /frotas-experience/) => arquivo HTML do pacote.
PAGES = {
    "": "index.html",
    "index.html": "index.html",
    "termos-de-uso.html": "termos-de-uso.html",
    "termos-de-uso": "termos-de-uso.html",
    "politica-de-privacidade.html": "politica-de-privacidade.html",
    "politica-de-privacidade": "politica-de-privacidade.html",
}
REF_RE = re.compile(r'(?:/frotas-experience/|\\/frotas-experience\\/)([^"\'\s)>,;`]+)')
FILE_RE = r'(?<=["\'(\s,=])' + re.escape(BASE) + r'/([^"\'\s),?#]*?\.[a-z0-9]+)(?=[?"\'\s),#])'


def norm(ref):
    path = ref.replace("\\/", "/").split("?")[0].split("#")[0]
    return os.path.normpath(path).replace(os.sep, "/") if path else path


def used_files():
    """Arquivos usados pelas páginas, seguindo referências em HTML, CSS e JS."""
    seen, todo = set(), sorted(set(PAGES.values()))
    while todo:
        rel = todo.pop()
        path = os.path.join(PACKAGE, rel)
        if rel in seen or not os.path.isfile(path):
            continue
        seen.add(rel)
        if not rel.endswith((".html", ".css", ".js")):
            continue
        text = open(path, encoding="utf-8", errors="ignore").read()
        todo += [norm(m.group(1)) for m in REF_RE.finditer(text)]
        if rel.endswith(".css"):
            folder = os.path.dirname(rel)
            for url in re.findall(r'url\(\s*["\']?([^"\')]+)', text):
                if not url.startswith(("data:", "http", "/", "#")):
                    todo.append(os.path.normpath(os.path.join(folder, norm(url))).replace(os.sep, "/"))
    return sorted(f for f in seen if os.path.isfile(os.path.join(PACKAGE, f)) and f not in PAGES.values())


def add_versions(html):
    """Acrescenta ?v=<hash do arquivo> nos arquivos sem versão, para o navegador
    não reaproveitar uma versão antiga em cache depois de uma atualização."""
    def ver(m):
        rel = m.group(1)
        path = os.path.join(SITE, rel)
        if not os.path.isfile(path):
            return m.group(0)
        digest = hashlib.md5(open(path, "rb").read()).hexdigest()[:10]
        return f"{ASSETS}/{rel}?v={digest}"
    return re.sub(re.escape(ASSETS) + r'/([^"\'\s),?#]+)(?![?\w])', ver, html)


def main():
    if not os.path.isdir(PACKAGE):
        sys.exit("dist/kinghost/ não existe: rode antes `node scripts/build-kinghost.mjs`.")
    shutil.rmtree(BUILD, ignore_errors=True)
    os.makedirs(SITE)
    for name in os.listdir(SRC_PLUGIN):
        shutil.copy2(os.path.join(SRC_PLUGIN, name), BUILD)

    files = used_files()
    for rel in files:
        dest = os.path.join(SITE, rel)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(os.path.join(PACKAGE, rel), dest)

    # CSS: caminhos /frotas-experience/... viram relativos ao próprio arquivo.
    for rel in files:
        if rel.endswith(".css"):
            path = os.path.join(SITE, rel)
            up = os.path.relpath(SITE, os.path.dirname(path)).replace(os.sep, "/")
            prefix = "" if up == "." else up + "/"
            css = open(path, encoding="utf-8").read()
            css = css.replace(BASE + "/", prefix).replace("\\/frotas-experience\\/", prefix.replace("/", "\\/"))
            open(path, "w", encoding="utf-8").write(css)
    # JS fica como está: o plugin também entrega esses arquivos pelo endereço /frotas-experience/.

    for page in sorted(set(PAGES.values())):
        html = open(os.path.join(PACKAGE, page), encoding="utf-8").read()
        html = html.replace(ABS_BASE + "/assets/", ASSETS + "/assets/")
        html = html.replace(ABS_BASE + "/", HOME + "/").replace(ABS_BASE, HOME)
        # Caminhos escapados em JSON de scripts embutidos (ex.: \/frotas-experience\/assets\/...).
        html = re.sub(r'\\/frotas-experience\\/((?:[^"\'\s\\]|\\/)+?\.[a-z0-9]+)(?=[?"\'\\])',
                      lambda m: f"{ASSETS}/{m.group(1).replace(chr(92) + '/', '/')}", html)
        html = html.replace("\\/frotas-experience\\/", HOME + "/")
        missing = [m for m in re.findall(FILE_RE, html)
                   if not m.endswith(".html") and not os.path.isfile(os.path.join(SITE, m))]
        if missing:
            sys.exit(f"{page}: arquivos referenciados que não existem: {missing[:5]}")
        html = re.sub(FILE_RE, lambda m: m.group(0) if m.group(1).endswith(".html") else f"{ASSETS}/{m.group(1)}", html)
        html = re.sub(r'(?<=["\'(\s,=])' + re.escape(BASE) + r'(?=[/"\'#?])', HOME, html)
        leftover = re.findall(r'(?<![\w}\-])' + re.escape(BASE) + r'\b', html)
        if leftover:
            sys.exit(f"{page}: {len(leftover)} caminhos /frotas-experience sem tratamento")
        open(os.path.join(SITE, page), "w", encoding="utf-8").write(add_versions(html))

    with open(os.path.join(SITE, "routes.php"), "w", encoding="utf-8") as f:
        f.write("<?php\n// Gerado por wordpress-plugin/build.py\nreturn array(\n")
        for route, file in sorted(PAGES.items()):
            f.write(f"\t'{route}' => '{file}',\n")
        f.write(");\n")

    for dirpath, _, names in os.walk(BUILD):
        if "index.php" not in names and "index.html" not in names:
            open(os.path.join(dirpath, "index.php"), "w").write("<?php // Silence is golden.\n")

    zip_path = os.path.join(OUT_DIR, SLUG + ".zip")
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for dirpath, _, names in os.walk(BUILD):
            for name in sorted(names):
                full = os.path.join(dirpath, name)
                z.write(full, os.path.relpath(full, OUT_DIR))
    size = os.path.getsize(zip_path)
    print(f"arquivos usados: {len(files)} (de {sum(len(n) for _, _, n in os.walk(PACKAGE))} no pacote)")
    print(f"zip: {zip_path} ({size / 1024 / 1024:.2f} MB)")
    if size > MAX_ZIP:
        sys.exit("Pacote passou de 60 MB (limite de upload configurado no WordPress: 64 MB)")


if __name__ == "__main__":
    main()
