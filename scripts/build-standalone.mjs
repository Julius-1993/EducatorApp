// Builds ONE self-contained HTML file (no external scripts or styles) from the real Vite build.
// Usage: npm run build:standalone  →  dist-standalone/EduTugOfWar.html
// Note: the standalone file has no server, so AI features show a clear "needs the EdTek server" message.
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const out = 'dist-standalone';
fs.rmSync(out, { recursive: true, force: true });
await build({
  configFile: false,
  logLevel: 'warn',
  plugins: [react()],
  base: './',
  build: {
    outDir: out,
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    chunkSizeWarningLimit: 5000,
    rollupOptions: { output: { format: 'iife', inlineDynamicImports: true, entryFileNames: 'app.js', assetFileNames: 'app[extname]' } },
  },
});

let html = fs.readFileSync(path.join(out, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(out, 'app.js'), 'utf8');
const cssFile = path.join(out, 'app.css');
const css = fs.existsSync(cssFile) ? fs.readFileSync(cssFile, 'utf8') : '';
html = html
  .replace(/<script[^>]*src="[^"]*app\.js"[^>]*><\/script>/, '')
  .replace(/<link[^>]*href="[^"]*app\.css"[^>]*>/, '')
  .replace('</head>', `<style>${css}</style>\n</head>`)
  .replace('</body>', `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>\n</body>`);
fs.writeFileSync(path.join(out, 'EduTugOfWar.html'), html);
for (const f of ['app.js', 'app.css', 'index.html']) fs.rmSync(path.join(out, f), { force: true });
console.log(`standalone: ${path.join(out, 'EduTugOfWar.html')} (${(html.length / 1024).toFixed(0)} KB)`);
