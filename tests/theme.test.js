// The visual requirements, checked against the real stylesheet and the real components.
import { describe, test, expect } from 'vitest';
import { readFileSync } from 'fs';
const css = readFileSync('src/styles/theme.css', 'utf8');
const app = readFileSync('src/App.jsx', 'utf8');
const rootBlock = css.slice(css.indexOf(':root'), css.indexOf('}', css.indexOf(':root')));

describe('dark blue and white theme', () => {
  test('palette variables are navy, blue and white', () => {
    expect(rootBlock).toMatch(/--navy:\s*#0a0f1e/);
    expect(rootBlock).toMatch(/--primary:\s*#2563eb/);
    expect(rootBlock).toMatch(/--cream:\s*#f8fafc/);
  });
  test('page background and card surfaces come from the navy palette, not the old green', () => {
    expect(rootBlock).toMatch(/--ink:\s*#0a0f1e/);
    expect(rootBlock).toMatch(/--ink2:\s*#0f1729/);
    for (const green of ['#0c1a13', '#1a2e22', '#2d4a38', '#0a3d2e;--forest2:#0f5240']) expect(rootBlock).not.toContain(green);
  });
  test('primary button is blue', () => expect(css).toMatch(/\.btn-primary\{background:linear-gradient\(135deg,var\(--primary\)/));
  test('App imports the stylesheet (no second inline copy)', () => {
    expect(app).toMatch(/import '\.\/styles\/theme\.css'/); expect(app).not.toContain('GLOBAL_CSS');
  });
});

describe('responsive rope layout', () => {
  test('phone: stacked (rope above question)', () => expect(css).toMatch(/\.game-layout\{display:flex;flex-direction:column/));
  test('tablet 768px+: rope beside the question', () => expect(css).toMatch(/@media \(min-width:768px\)\{[^@]*\.game-layout\{flex-direction:row/));
  test('smartboard 1200px+: wider rope column', () => expect(css).toMatch(/@media \(min-width:1200px\)\{ \.game-rope-col\{width:420px/));
  test('the game screen actually uses those classes', () => {
    for (const c of ['game-layout', 'game-rope-col', 'game-question-col']) expect(app).toContain(c);
  });
});

describe('accessibility basics', () => {
  test('reduced-motion preference is respected', () => expect(css).toMatch(/prefers-reduced-motion:\s*reduce/));
});

describe('icons, not emoji', () => {
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2B50\u2705\u274C]/u;
  for (const f of ['src/App.jsx', 'src/academy/Academy.jsx', 'src/academy/ReviewTab.jsx', 'src/academy/engine.js', 'src/data/curriculum.js'])
    test(`no emoji in ${f}`, () => expect(EMOJI.test(readFileSync(f, 'utf8'))).toBe(false));
});
