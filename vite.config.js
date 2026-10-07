import { defineConfig } from 'vite';
import { resolve } from 'node:path';
const pages = ['index', 'onderhoud', 'nieuws', 'lezingen', 'activiteiten', 'gebedstijden', 'over-ons', 'contact', 'doneren', 'statuten', 'nieuwbouw'];
export default defineConfig({
  root: resolve(import.meta.dirname, 'site'),
  publicDir: resolve(import.meta.dirname, 'public'),
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(pages.map(page => [page, resolve(import.meta.dirname, 'site', `${page}.html`)])),
    },
  },
});
