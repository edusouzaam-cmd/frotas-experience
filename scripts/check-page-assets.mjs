import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const publicRoot = path.join(root, 'public');
const visited = new Set();
const missing = new Set();

function inspect(file) {
  if (visited.has(file)) return;
  visited.add(file);
  if (!/\.(html|css|js)$/.test(file)) return;
  const text = fs.readFileSync(file, 'utf8').replaceAll('\\/', '/');
  for (const match of text.matchAll(/\/mirror\/[^\s"'<>`\\)\]}]+/g)) {
    const url = match[0].replace(/[,;]+$/, '').replaceAll('&amp;', '&');
    let target;
    try {
      target = path.resolve(publicRoot, '.' + decodeURIComponent(url.split(/[?#]/)[0]));
    } catch {
      missing.add(url);
      continue;
    }
    if (!target.startsWith(publicRoot + path.sep)) throw new Error('Invalid asset path');
    if (!fs.existsSync(target)) missing.add(url);
    else inspect(target);
  }
}

inspect(path.join(root, 'public/frotas-experience/index.html'));
console.log(`Checked ${visited.size - 1} local resources.`);
if (missing.size) {
  console.error('Missing references:', [...missing]);
  process.exitCode = 1;
}

// Only files reachable from the supplied page belong in this import.
if (process.argv.includes('--list-unused')) {
  const mirrorRoot = path.join(publicRoot, 'mirror');
  const unused = fs.readdirSync(mirrorRoot, { recursive: true })
    .map((relative) => path.join(mirrorRoot, relative))
    .filter((file) => fs.statSync(file).isFile() && !visited.has(file));
  fs.writeFileSync(path.join(root, 'unused-assets.local'), unused.join('\n'));
  console.log(`${unused.length} unrelated resources listed in unused-assets.local.`);
}
