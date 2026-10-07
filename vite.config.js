import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const pages = ['index', 'onderhoud', 'nieuws', 'lezingen', 'activiteiten', 'gebedstijden', 'over-ons', 'contact', 'doneren', 'statuten', 'nieuwbouw'];
export default defineConfig({ build: { rollupOptions: { input: Object.fromEntries(pages.map(page => [page, resolve(import.meta.dirname, `${page}.html`)])) } } });
