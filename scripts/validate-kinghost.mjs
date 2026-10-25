import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist/kinghost');
const base = '/frotas-experience/';
const origin = 'https://engeteles.com.br';
for (const name of ['index.html', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'htaccess', 'assets', 'politica-de-privacidade.html', 'termos-de-uso.html']) {
  assert(fs.existsSync(path.join(root, name)), `Missing ${name}`);
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
const errors = new Set();
let references = 0;
function check(url, file) {
  url = url.trim().replaceAll('&amp;', '&');
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) return;
  const pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  if (pathname.startsWith('/') && !pathname.startsWith(base)) errors.add(`Outside base: ${url}`);
  const target = pathname.startsWith(base) ? path.join(root, pathname.slice(base.length)) : path.resolve(path.dirname(file), pathname);
  if (!target.startsWith(root)) errors.add(`Outside package: ${url}`);
  else if (!fs.existsSync(target)) errors.add(`Missing: ${path.relative(root, file)} → ${url}`);
  references++;
}
for (const file of walk(root)) {
  assert(!/(^|\/)(?:node_modules|src|\.env[^/]*|\.git)(\/|$)/.test(path.relative(root, file)), `Unexpected source/secret: ${file}`);
  if (!/\.(html|css|js)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  assert(!text.includes(base + 'frotas-experience/'), `Duplicated base in ${file}`);
  if (/\.html$/.test(file) && !file.includes('/assets/')) {
    const markup = text.replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, '$1</script>');
    for (const m of markup.matchAll(/\b(?:src|href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) check(m[1] ?? m[2] ?? m[3], file);
    for (const m of markup.matchAll(/\bsrcset\s*=\s*"([^"]*)"/gi)) {
      for (const candidate of m[1].split(',')) check(candidate.trim().split(/\s+/)[0], file);
    }
  }
  if (/\.css$/.test(file)) {
    for (const m of text.matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/gi)) check(m[1], file);
  }
}
for (const page of ['index.html', 'politica-de-privacidade.html', 'termos-de-uso.html']) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const url = origin + base + (page === 'index.html' ? '' : page);
  assert(/<html\s+lang=["']?pt-BR/.test(html));
  assert(html.includes(`rel="canonical" href="${url}"`));
  assert(html.includes(`property="og:url" content="${url}"`));
  assert(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').includes(`<loc>${url}</loc>`));
}
assert(!fs.existsSync(path.join(root, '.htaccess')));
assert(fs.readFileSync(path.join(root, 'htaccess'), 'utf8').includes(`RewriteBase ${base}`));
if (errors.size) throw new Error([...errors].join('\n'));
console.log(`Validated ${walk(root).length} files and ${references} local references; SEO, base path, real HTML subpages and package root OK.`);
