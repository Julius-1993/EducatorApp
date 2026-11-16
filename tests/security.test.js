// Static checks over the real source: no secrets or direct provider calls can reach the browser.
import { describe, test, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import path from 'path';

const walk = d => readdirSync(d).flatMap(n => { const p = path.join(d, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const clientFiles = walk('src').filter(f => /\.(jsx?|css)$/.test(f));
const clientSrc = clientFiles.map(f => [f, readFileSync(f, 'utf8')]);

describe('frontend contains no secrets and never calls OpenAI directly', () => {
  test('no OpenAI host in client code', () => { for (const [f, s] of clientSrc) expect(s.includes('api.openai.com'), f).toBe(false); });
  test('no API key patterns in client code', () => { for (const [f, s] of clientSrc) expect(/sk-[A-Za-z0-9_-]{16,}/.test(s), f).toBe(false); });
  test('no prompting the user for a key, no key in storage', () => {
    for (const [f, s] of clientSrc) { expect(s.includes('window.prompt'), f).toBe(false); expect(/sessionStorage|__etow_okey/.test(s), f).toBe(false); }
  });
  test('client never sends a system message (the server builds every system prompt)', () => {
    for (const [f, s] of clientSrc) expect(/role:\s*['"]system['"]/.test(s), f).toBe(false);
  });
  test('client talks to /api/ai with an operation name', () => {
    const app = readFileSync('src/App.jsx', 'utf8'); expect(app).toContain("'/api/ai'");
    for (const op of ['question_gen', 'notes_gen']) expect(app).toContain(`operation:"${op}"`);
    expect(readFileSync('src/academy/aiTutor.js', 'utf8')).toContain("operation: 'tutor'");
  });
  test('no VITE_ variable holds a secret', () => {
    const env = readFileSync('.env.example', 'utf8');
    expect(env).not.toMatch(/^VITE_\w*(KEY|SECRET|TOKEN)\w*=/m);
    expect(/sk-[A-Za-z0-9_-]{16,}/.test(env)).toBe(false);
  });
  test('.env is git-ignored', () => expect(readFileSync('.gitignore', 'utf8')).toMatch(/^\.env$/m));
});

describe('desktop app', () => {
  const main = readFileSync('electron/main.js', 'utf8');
  test('renderer is sandboxed with context isolation and no node integration', () => {
    expect(main).toMatch(/contextIsolation:\s*true/); expect(main).toMatch(/nodeIntegration:\s*false/); expect(main).toMatch(/sandbox:\s*true/);
  });
  test('main process forwards AI requests over IPC and never embeds a key', () => {
    expect(main).toContain("ipcMain.handle('etow:ai'"); expect(main).not.toMatch(/OPENAI|sk-|Authorization/);
  });
  test('server URL must be https (http only for localhost)', () => expect(main).toMatch(/protocol !== 'https:'/));
  test('preload exposes only the ai bridge', () => {
    const pre = readFileSync('electron/preload.cjs', 'utf8'); expect(pre).toContain('exposeInMainWorld'); expect((pre.match(/ipcRenderer/g) || []).length).toBeLessThan(4);
  });
});

describe('project hygiene', () => {
  test('npm test runs the real test runner, with no success fallback', () => {
    const t = JSON.parse(readFileSync('package.json', 'utf8')).scripts.test;
    expect(t).toMatch(/vitest/); expect(t).not.toMatch(/echo|\|\||true/);
  });
  test('required packages are declared', () => {
    const p = JSON.parse(readFileSync('package.json', 'utf8')); const all = { ...p.dependencies, ...p.devDependencies };
    for (const d of ['react', 'react-dom', 'vite', '@vitejs/plugin-react', 'lucide-react', 'express', 'cors', 'dotenv', 'vitest', 'jsdom', 'eslint']) expect(all[d], d).toBeTruthy();
  });
  test('lockfile exists', () => expect(existsSync('package-lock.json')).toBe(true));
});
