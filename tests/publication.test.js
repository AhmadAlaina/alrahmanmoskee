import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pages = ['index', 'onderhoud', 'nieuws', 'lezingen', 'activiteiten', 'gebedstijden', 'over-ons', 'contact', 'doneren', 'statuten'];
for (const page of pages) {
  test(`${page}: Plesk entry loads built JS and CSS with existing asset files`, async () => {
    const html = await readFile(resolve(root, `${page}.html`), 'utf8');
    assert.doesNotMatch(html, /(?:src|href)="\/src\//);
    assert.match(html, /src="\/assets\/[^" ]+\.js"/);
    assert.match(html, /href="\/assets\/[^" ]+\.css"/);
    for (const [,path] of html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)) {
      await access(resolve(root, path.slice(1)));
    }
  });
}
test('old new construction URL still redirects to maintenance after static publication', async () => {
  const html = await readFile(resolve(root, 'nieuwbouw.html'), 'utf8');
  assert.match(html, /url=\/onderhoud\.html/);
});
