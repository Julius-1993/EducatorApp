// Builds the single-file HTML and EXECUTES it in a fresh jsdom window, the way a browser would.
import { describe, test, expect, beforeAll } from 'vitest';
import { JSDOM, VirtualConsole } from 'jsdom';
import { execFileSync } from 'child_process';
import { readFileSync } from 'fs';

const FILE = 'dist-standalone/EduTugOfWar.html';
let html;
beforeAll(() => { execFileSync('node', ['scripts/build-standalone.mjs'], { stdio: 'pipe' }); html = readFileSync(FILE, 'utf8'); }, 120000);

describe('standalone HTML artifact', () => {
  test('is self-contained: no external scripts, stylesheets or module imports', () => {
    expect(html).not.toMatch(/<script[^>]+src=/); expect(html).not.toMatch(/<link[^>]+rel="stylesheet"/); expect(html).not.toMatch(/type="module"/);
  });
  test('contains no secrets or direct provider calls', () => {
    expect(html).not.toContain('api.openai.com'); expect(/sk-[A-Za-z0-9_-]{16,}/.test(html)).toBe(false);
  });
  test('carries the dark blue theme and the responsive rope layout', () => {
    expect(html).toContain('--navy:#0a0f1e'); expect(html).toMatch(/\.game-layout\{[^}]*flex-direction:column/); expect(html).toMatch(/min-width:768px/);
  });
  test('runs in a browser-like window: no script errors, and the EdTek splash renders', async () => {
    const errors = []; const vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message)); vc.on('error', e => errors.push(String(e)));
    const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc });
    await new Promise(r => setTimeout(r, 400));
    expect(errors).toEqual([]);
    expect(dom.window.document.getElementById('root').textContent).toContain('EdTek Interactive');
    dom.window.close();
  });
  test('after the splash, the home screen and the Language Academy entry are reachable', async () => {
    const errors = []; const vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message));
    const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'https://example.test/', virtualConsole: vc });
    await new Promise(r => setTimeout(r, 3800));
    const text = dom.window.document.body.textContent;
    expect(errors).toEqual([]); expect(text).toContain('Play Now'); expect(text).toContain('Language Academy');
    expect(text).not.toMatch(/TEACHER|TROPHY|MUTE_ON/);              // the placeholder-label bug can never ship again
    dom.window.close();
  }, 20000);
});
