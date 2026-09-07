import { mkdir, copyFile, cp, readFile, stat } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'style.css', 'script.js']) await copyFile(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
const html = await readFile('index.html', 'utf8');
for (const match of html.matchAll(/(?:src|href)="(assets\/[^"#]+)"/g)) await stat(match[1]);
console.log('Production site built. All HTML asset references verified.');
