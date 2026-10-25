import fs from 'node:fs';
import path from 'node:path';

const base = '/frotas-experience/';
const origin = 'https://engeteles.com.br';
const out = path.resolve('dist/kinghost');
const pages = ['index.html', 'politica-de-privacidade.html', 'termos-de-uso.html'];
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync('public/frotas-experience', out, { recursive: true });
for (const dir of ['mirror', 'images', 'fonts']) {
  fs.cpSync(`public/${dir}`, `${out}/assets/${dir}`, { recursive: true });
}
fs.copyFileSync('public/favicon.ico', `${out}/favicon.ico`);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
for (const file of walk(out)) {
  if (!/\.(html|css|js)$/.test(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  // Include URLs embedded in JSON and inline scripts, without changing external URLs.
  for (const dir of ['mirror', 'images', 'fonts']) {
    text = text.replace(new RegExp(`(?<![\\w:/])/${dir}/`, 'g'), `${base}assets/${dir}/`);
    text = text.replaceAll(`\\/${dir}\\/`, `${base}assets/${dir}/`.replaceAll('/', '\\/'));
  }
  for (const slug of ['politica-de-privacidade', 'termos-de-uso']) {
    text = text.replace(new RegExp(`(["'])/${slug}(?:\\.html)?(?=["'#?])`, 'g'), `$1${base}${slug}.html`);
  }
  text = text.replace(/href=(["'])\/\1/g, `href="${base}"`);
  fs.writeFileSync(file, text);
}
for (const page of pages) {
  const file = path.join(out, page);
  const url = origin + base + (page === 'index.html' ? '' : page);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<link\b[^>]*rel=["']?canonical["']?[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property=["']?og:url["']?[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']?(?:icon|apple-touch-icon)["']?[^>]*>/gi, '');
  const metadata = `<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"><link rel="icon" href="${base}favicon.ico?v=frotas-20261025">`;
  html = html.replace('</head>', metadata + '</head>');
  if (page !== 'index.html') {
    const title = page.startsWith('termos') ? 'Termos de Uso' : 'Política de Privacidade';
    html = html.replace('</head>', `<meta name="description" content="${title} do Frotas Experience, promovido pela ENGETELES."></head>`);
  }
  html = html.replace(/(<meta\b[^>]*property=["']?og:image["']?\s+content=")\/(?!\/)/g, `$1${origin}/`);
  fs.writeFileSync(file, html);
}
fs.writeFileSync(`${out}/robots.txt`, `User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}sitemap.xml\n`);
fs.writeFileSync(`${out}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `  <url><loc>${origin}${base}${p === 'index.html' ? '' : p}</loc></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(`${out}/htaccess`, `DirectoryIndex index.html\nRewriteEngine On\nRewriteBase ${base}\n\nRewriteCond %{REQUEST_FILENAME} -f [OR]\nRewriteCond %{REQUEST_FILENAME} -d\nRewriteRule ^ - [L]\n\nRewriteRule ^(politica-de-privacidade|termos-de-uso)/?$ $1.html [L]\n`);
console.log(`Static KingHost production build: ${out}`);
