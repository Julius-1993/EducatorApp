// Speaking practice with a FAKE SpeechRecognition / speechSynthesis (jsdom has neither).
// This verifies our code's behaviour (language codes, permission/no-speech handling, RTL, TTS call).
// It does NOT verify real microphones, real recognition accuracy or real voices: those need a browser/device.
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, act } from '@testing-library/react';
import { click, advance, btn, lessonOf, openAcademy, enrol, openLanguage, openLesson, answerItem } from './helpers.jsx';

class FakeRecognition { static last = null; static starts = 0; constructor() { FakeRecognition.last = this; } start() { FakeRecognition.starts++; } stop() { this.onend && this.onend(); } }
window.webkitSpeechRecognition = FakeRecognition;
const spoken = [];
class FakeUtterance { constructor(text) { this.text = text; } }
window.SpeechSynthesisUtterance = FakeUtterance;
window.speechSynthesis = { speak: (u) => spoken.push(u), cancel() {}, getVoices: () => [{ lang: 'en-US', name: 'EN' }, { lang: 'ar-EG', name: 'AR-EG' }, { lang: 'fr-CA', name: 'FR-CA' }] };
const { default: App } = await import('../src/App.jsx');

beforeEach(() => { vi.useFakeTimers(); FakeRecognition.last = null; FakeRecognition.starts = 0; spoken.length = 0; });
afterEach(() => { vi.useRealTimers(); });

const CASES = [['Spanish', 'es-i-m1-l1', 'es-ES', 'ltr'], ['Mandarin', 'zh-i-m1-l1', 'zh-CN', 'ltr'], ['French', 'fr-i-m1-l1', 'fr-FR', 'ltr'], ['Arabic', 'ar-i-m1-l3', 'ar-SA', 'rtl']];

async function reachSpeaking(lang, id) {
  const L = lessonOf(id);
  await openAcademy(App); await enrol(lang, 'Intermediate'); await openLanguage(lang); await openLesson(L.title);
  click(screen.getByRole('button', { name: 'Exercises' }));
  for (const q of L.exercises.filter(e => e.type !== 'speak')) { answerItem(q); click(btn(/Next Exercise|See practice summary/)); }
  return L.exercises.find(e => e.type === 'speak');
}
const hear = (transcript) => act(() => { FakeRecognition.last.onresult({ results: [[{ transcript, confidence: 0.9 }]] }); });

describe.each(CASES)('%s speaking exercise', (lang, id, code, dir) => {
  test(`uses speech language ${code}, shows the target with the right text direction, and a tip`, async () => {
    const ex = await reachSpeaking(lang, id);
    const target = screen.getByText(ex.target);
    expect(target.closest('[dir]').getAttribute('dir')).toBe(dir);
    if (ex.pinyin) expect(screen.getByText(ex.pinyin)).toBeTruthy();
    expect(screen.getByText(/^Tip:/, { exact: false })).toBeTruthy();
    click(btn(/Start Speaking/));
    expect(FakeRecognition.starts).toBe(1); expect(FakeRecognition.last.lang).toBe(code);
  });
  test('a recognised answer is scored, shown, and labelled as approximate', async () => {
    const ex = await reachSpeaking(lang, id);
    click(btn(/Start Speaking/)); hear(ex.target);
    expect(screen.getByText(/You said:/)).toBeTruthy(); expect(screen.getByText('100%')).toBeTruthy();
    expect(screen.getByText(/Clearly recognised/)).toBeTruthy();
    expect(screen.getByText(/approximate feedback, not professional pronunciation scoring/)).toBeTruthy();
  });
  test('a half-recognised answer gets partial credit and lists the missed words', async () => {
    const ex = await reachSpeaking(lang, id);
    click(btn(/Start Speaking/)); hear(lang === 'Mandarin' ? ex.target.slice(0, 3) : ex.target.split(' ').slice(0, 2).join(' '));
    const pct = parseInt(screen.getByText(/^\d+%$/).textContent, 10);
    expect(pct).toBeGreaterThan(0); expect(pct).toBeLessThan(100);
    expect(screen.getByText(/Words not recognised:/)).toBeTruthy();
  });
  test('"Listen to model" speaks the target in the right language', async () => {
    const ex = await reachSpeaking(lang, id);
    click(btn(/Listen to model pronunciation/));
    expect(spoken.length).toBe(1); expect(spoken[0].text).toBe(ex.target); expect(spoken[0].lang).toBe(code);
  });
});

describe('speech error handling', () => {
  test('denied microphone permission explains what to do and hides the record button', async () => {
    await reachSpeaking('Spanish', 'es-i-m1-l1'); click(btn(/Start Speaking/));
    act(() => { FakeRecognition.last.onerror({ error: 'not-allowed' }); });
    expect(screen.getAllByText(/permission/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: /Start Speaking/ })).toBeNull();
    expect(btn(/Skip this speaking exercise|Skip/)).toBeTruthy();
  });
  test('no speech detected is reported and the student can try again', async () => {
    await reachSpeaking('French', 'fr-i-m1-l1'); click(btn(/Start Speaking/));
    act(() => { FakeRecognition.last.onerror({ error: 'no-speech' }); });
    expect(screen.getByText(/No speech detected/)).toBeTruthy();
    expect(btn(/Start Speaking/)).toBeTruthy();
  });
  test('a network error from the recogniser is explained', async () => {
    await reachSpeaking('Mandarin', 'zh-i-m1-l1'); click(btn(/Start Speaking/));
    act(() => { FakeRecognition.last.onerror({ error: 'network' }); });
    expect(screen.getByText(/needs internet/)).toBeTruthy();
  });
  test('the record button toggles to Stop while recording', async () => {
    await reachSpeaking('Spanish', 'es-i-m1-l1'); click(btn(/Start Speaking/));
    expect(screen.getByRole('button', { name: /Stop Recording/ })).toBeTruthy();
  });
});

describe('text-to-speech voice selection', () => {
  test('picks an installed voice whose language matches (ar-SA → ar-EG, fr-FR → fr-CA)', async () => {
    const { TTS } = await import('../src/academy/speech.js');
    const seen = [];
    window.speechSynthesis.speak = (u) => seen.push(u);
    TTS.speak('مرحبا', 'ar-SA'); TTS.speak('bonjour', 'fr-FR'); TTS.speak('hola', 'es-ES');
    expect(seen[0].voice.name).toBe('AR-EG'); expect(seen[1].voice.name).toBe('FR-CA'); expect(seen[2].voice).toBeUndefined();
  });
});
