import { cp, readdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const build = resolve(root, 'dist');
// Only these generated folders and HTML files belong to the publication step.
const folders = new Set(['assets', 'images', 'documenten']);
const pages = new Set(['index', 'onderhoud', 'nieuws', 'lezingen', 'activiteiten', 'gebedstijden', 'over-ons', 'contact', 'doneren', 'statuten', 'nieuwbouw'].map(page => `${page}.html`));
await access(resolve(build, 'index.html'));
const entries = await readdir(build, { withFileTypes: true });
for (const entry of entries) {
  if (entry.isDirectory() ? !folders.has(entry.name) : !pages.has(entry.name)) {
    throw new Error(`Unexpected build output: ${entry.name}`);
  }
}
for (const entry of entries) {
  const target = resolve(root, entry.name);
  if (entry.isDirectory()) await rm(target, { recursive: true, force: true });
  await cp(resolve(build, entry.name), target, { recursive: true });
}
console.log('Publication files are ready at the repository root for Plesk Git.');
