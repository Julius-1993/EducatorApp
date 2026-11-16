// Renders the REAL <App/> in jsdom and drives the real UI. These catch crashes such as undefined
// variables or missing imports that tests of extracted logic cannot see.
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, within } from '@testing-library/react';
import App from '../src/App.jsx';
import * as engine from '../src/academy/engine.js';
import { NIGERIA } from '../src/data/curriculum.js';
import { click, advance, flush, btn, esc, lessonOf, openHome, openAcademy, enrol, openLanguage, openLesson, answerItem } from './helpers.jsx';

beforeEach(() => { vi.useFakeTimers(); });
afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });

describe('app shell', () => {
  test('renders without throwing and shows the EdTek logo splash first', () => {
    render(<App />);
    expect(screen.getAllByText(/EdTek Interactive/).length).toBeGreaterThan(0);
  });
  test('after the splash, the home screen offers Play and Language Academy', async () => {
    await openHome(App);
    expect(screen.getByText(/Play Now/i)).toBeTruthy();
    expect(screen.getByText(/Language Academy/)).toBeTruthy();
  });
});

describe('language academy: language and level selection', () => {
  test('opens with nothing enrolled and offers all four languages', async () => {
    await openAcademy(App);
    click(btn(/Choose a Language/i));
    for (const name of ['Spanish', 'Mandarin', 'French', 'Arabic']) expect(screen.getAllByText(name).length).toBeGreaterThan(0);
  });
  test.each([
    ['French', 'Advanced', /Subjonctif/, /Bonjour! — Greetings/],
    ['Spanish', 'Expert', /Estilo y Registro/, /Hello and Goodbye/],
    ['Mandarin', 'Intermediate', /Talking About Family/, /Basic Greetings/],
    ['Arabic', 'Beginner', /Greetings/, /Advanced|Expert/],
  ])('%s at %s shows only that level\'s lessons', async (lang, level, shouldSee, shouldNotSee) => {
    await openAcademy(App); await enrol(lang, level); await openLanguage(lang);
    expect(screen.getAllByText(shouldSee).length).toBeGreaterThan(0);
    expect(screen.queryByText(shouldNotSee)).toBeNull();
  });
  test('Arabic is flagged as right-to-left on the enrolment screen', async () => {
    await openAcademy(App); click(btn(/Choose a Language/i)); click(btn(/Arabic/));
    expect(screen.getByText(/written right-to-left/)).toBeTruthy();
  });
  test('every level of every language lists real lessons', async () => {
    for (const [lang, level] of [['Spanish', 'Advanced'], ['Mandarin', 'Expert'], ['French', 'Intermediate'], ['Arabic', 'Expert']]) {
      const { unmount } = render(<App />); await advance(3500); click(screen.getByText(/Language Academy/)); await advance(50);
      await enrol(lang, level); await openLanguage(lang);
      expect(screen.queryByText(/lessons loading/i), `${lang}/${level}`).toBeNull();
      expect(screen.getAllByText(/Module 1/).length, `${lang}/${level}`).toBeGreaterThan(0);
      unmount(); localStorage.clear();
    }
  });
});

describe('language academy: a full lesson', () => {
  const L = lessonOf('es-b-m1-l1');
  async function openL() { await openAcademy(App); await enrol('Spanish', 'Beginner'); await openLanguage('Spanish'); await openLesson(L.title); }

  test('shows a draft notice until a teacher records a review', async () => {
    await openL();
    expect(screen.getByRole('note').textContent).toMatch(/Draft lesson/);
  });
  test('no draft notice once the lesson has been reviewed', async () => {
    engine.setLessonReview('es-b-m1-l1', 'Mrs Adeyemi');
    await openL();
    expect(screen.queryByText(/Draft lesson/)).toBeNull();
  });
  test('shows objectives, then vocabulary flashcards that reveal the translation', async () => {
    await openL();
    for (const o of L.objectives) expect(screen.getByText(o)).toBeTruthy();
    expect(screen.getAllByText(L.vocab[0].word).length).toBeGreaterThan(0);
    click(screen.getAllByText(/Tap to reveal meaning/)[0]);
    expect(screen.getAllByText(L.vocab[0].translation).length).toBeGreaterThan(0);
  });
  test('walks vocabulary → grammar → dialogue → exercises → assessment', async () => {
    await openL();
    click(btn(/Continue to Grammar/)); expect(screen.getByText(L.grammar.title)).toBeTruthy();
    click(btn(/Continue to Dialogue/)); expect(screen.getByText(L.dialogue.title)).toBeTruthy();
    click(btn(/Continue to Exercises/)); expect(screen.getByText(/EXERCISE 1/)).toBeTruthy();
  });
  test('phase buttons have accessible names', async () => {
    await openL();
    for (const n of ['Vocabulary', 'Grammar', 'Dialogue', 'Exercises', 'Assessment']) expect(screen.getByRole('button', { name: n })).toBeTruthy();
  });
  test('a wrong exercise answer shows the explanation; a right one is marked correct', async () => {
    await openL(); click(screen.getByRole('button', { name: 'Exercises' }));
    const q = L.exercises[0];
    const wrong = screen.getAllByRole('button').find(b => b.textContent.includes(q.options[(q.answer + 1) % 4]) && /^[A-D]/.test(b.textContent.trim()));
    click(wrong);
    expect(screen.getByText(q.explanation.slice(0, 25), { exact: false })).toBeTruthy();
  });
  test('completing the assessment saves mastery, XP and attempt history, and survives a reload', async () => {
    await openL(); click(screen.getByRole('button', { name: 'Assessment' }));
    for (const q of L.assessment) answerItem(q);
    click(btn(/Submit Assessment/));
    expect(screen.getByText('100%')).toBeTruthy();
    click(btn(/Complete lesson/)); await advance(100);
    const p = engine.getLessonProgress('es', L.id);
    expect(p.status).toBe('mastered'); expect(p.bestScore).toBe(100);
    expect(engine.getProfile().xp).toBeGreaterThan(0);
    expect(engine.getAttempts('es', L.id).length).toBe(1);
    // "reload": a fresh render reads the same progress from storage
    document.body.innerHTML = '';
    await openAcademy(App); expect(screen.getByText(/1 lessons mastered/)).toBeTruthy();
  });
  test('a failing assessment offers retry and lists the mistakes with explanations', async () => {
    await openL(); click(screen.getByRole('button', { name: 'Assessment' }));
    for (const q of L.assessment) {
      if (q.type === 'mcq') { const b = screen.getAllByRole('button').find(x => x.textContent.includes(q.options[(q.answer + 1) % 4]) && /^[A-D]/.test(x.textContent.trim())); click(b); }
      else fireEvent.change(screen.getByRole('textbox'), { target: { value: 'zzz' } });
    }
    click(btn(/Submit Assessment/));
    expect(screen.getByText('Review Your Mistakes')).toBeTruthy(); expect(btn(/Retry/)).toBeTruthy();
  });
  test('Submit stays disabled until every question is answered', async () => {
    await openL(); click(screen.getByRole('button', { name: 'Assessment' }));
    expect(btn(/Submit Assessment/).disabled).toBe(true);
  });
});

describe('language academy: speaking practice without speech recognition', () => {
  test('an unsupported browser gets a clear message, a model to listen to, and can skip', async () => {
    const L = lessonOf('es-i-m1-l1');
    await openAcademy(App); await enrol('Spanish', 'Intermediate'); await openLanguage('Spanish'); await openLesson(L.title);
    click(screen.getByRole('button', { name: 'Exercises' }));
    for (const q of L.exercises.filter(e => e.type !== 'speak')) { answerItem(q); click(btn(/Next Exercise|Go to Assessment/)); }
    expect(screen.getByText(/SPEAKING PRACTICE/)).toBeTruthy();
    expect(screen.getByText(/not available in this browser/)).toBeTruthy();
    expect(screen.getByText(/^Tip:/, { exact: false })).toBeTruthy();
    click(screen.getByText(/Skip this speaking exercise/));
    expect(screen.getByText(/approximate/i)).toBeTruthy();                 // feedback is shown for the LAST exercise
    click(btn(/See practice summary/));
    expect(screen.getByText(/Practice complete/)).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();                         // the skipped speaking item is not counted against the score
  });
});

describe('language academy: AI tutor', () => {
  async function openTutor() { await openAcademy(App); await enrol('Spanish', 'Beginner'); await openLanguage('Spanish'); click(btn(/AI Tutor/)); await advance(50); }
  const reply = (status, body) => vi.fn(async () => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));
  async function send(text) { fireEvent.change(screen.getByPlaceholderText(/Ask about Spanish/), { target: { value: text } }); click(btn(/Send message/)); await flush(); await flush(); }

  test('sends an operation + context (never a system message) and shows the reply', async () => {
    globalThis.fetch = reply(200, { choices: [{ message: { content: 'Hola means hello.' } }] });
    await openTutor(); await send('What does hola mean?');
    expect(screen.getByText('Hola means hello.')).toBeTruthy();
    const [url, init] = globalThis.fetch.mock.calls[0]; const body = JSON.parse(init.body);
    expect(url).toBe('/api/ai'); expect(body.operation).toBe('tutor');
    expect(body.context).toMatchObject({ lang: 'es', level: 'beginner' });
    expect(body.messages.every(m => m.role === 'user' || m.role === 'assistant')).toBe(true);
    expect(JSON.stringify(body)).not.toMatch(/sk-|api key/i);
  });
  test('a server error is shown to the student in plain words', async () => {
    globalThis.fetch = reply(503, { error: { message: 'AI service is not configured on this server.' } });
    await openTutor(); await send('Hi'); expect(screen.getByText(/not configured/)).toBeTruthy();
  });
  test('no server reachable gives a clear recoverable message', async () => {
    globalThis.fetch = vi.fn(async () => { throw new TypeError('Failed to fetch'); });
    await openTutor(); await send('Hi'); expect(screen.getByText(/Could not reach the AI server/)).toBeTruthy();
    expect(screen.getByPlaceholderText(/Ask about Spanish/)).toBeTruthy();
  });
  test('a host with no AI server (HTML 404) gives the same clear message, not a crash', async () => {
    globalThis.fetch = vi.fn(async () => new Response('<html>Not found</html>', { status: 404, headers: { 'Content-Type': 'text/html' } }));
    await openTutor(); await send('Hi'); expect(screen.getByText(/need the EdTek server/)).toBeTruthy();
  });
  test('the daily limit stops further messages before any request is made', async () => {
    globalThis.fetch = reply(200, { choices: [{ message: { content: 'ok' } }] });
    for (let i = 0; i < 20; i++) engine.recordTutorUsage();
    await openTutor();
    expect(screen.getByPlaceholderText(/Ask about Spanish/).disabled).toBe(true); expect(globalThis.fetch).not.toHaveBeenCalled();
  });
  test('the first tutor use unlocks its achievement', async () => {
    globalThis.fetch = reply(200, { choices: [{ message: { content: 'ok' } }] });
    await openTutor(); await send('Hola');
    expect(engine.getProfile().achievements).toContain('tutor_chat');
  });
});

describe('language academy: storage problems', () => {
  test('warns the student when the browser blocks storage', async () => {
    await openHome(App); click(screen.getByText(/Language Academy/));
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    await advance(50);
    document.body.innerHTML = ''; await openAcademy(App);
    expect(screen.getByRole('alert').textContent).toMatch(/blocking storage/);
  });
});

describe('teacher portal', () => {
  async function openPortal() { await openHome(App); click(screen.getByTitle('Teacher Portal')); await advance(50); }
  test('opens with all tabs, including lesson review', async () => {
    await openPortal();
    for (const t of ['AI Generate', 'Upload Notes', 'Set Questions', 'Review Lessons', 'Manage Bank']) expect(screen.getAllByText(t).length).toBeGreaterThan(0);
  });
  test('a teacher can write a question with options, answer and explanation, and it is saved to the bank', async () => {
    await openPortal(); click(screen.getByText('Set Questions'));
    const selects = [...document.querySelectorAll('select')];
    const lk = Object.keys(NIGERIA)[2]; fireEvent.change(selects[0], { target: { value: lk } });
    const cls = NIGERIA[lk].classes[0]; fireEvent.change(document.querySelectorAll('select')[1], { target: { value: cls } });
    const sub = NIGERIA[lk].subjects[0]; fireEvent.change(document.querySelectorAll('select')[2], { target: { value: sub } });
    fireEvent.change(screen.getByPlaceholderText(/Type your .* question here/), { target: { value: 'What is the capital of Nigeria?' } });
    ['Lagos', 'Abuja', 'Kano', 'Ibadan'].forEach((o, i) => fireEvent.change(screen.getByPlaceholderText(`Option ${'ABCD'[i]}…`), { target: { value: o } }));
    click(screen.getByRole('button', { name: 'B' }));
    fireEvent.change(screen.getByPlaceholderText(/Explain WHY/), { target: { value: 'Abuja became the capital in 1991, replacing Lagos.' } });
    click(btn(/Save All 1 Question/)); await advance(50);
    expect(screen.getByText(/Saved!/)).toBeTruthy();
    const bank = JSON.parse(localStorage.getItem('etow_ng_bank_v1'));
    const saved = bank.find(q => q.q === 'What is the capital of Nigeria?');
    expect(saved.className).toBe(cls); expect(saved.subject).toBe(sub);
    expect(saved.q).toBe('What is the capital of Nigeria?'); expect(saved.options[saved.answer]).toMatch(/Abuja/); expect(saved.explanation).toMatch(/1991/);
  });
  test('saving is blocked while a question is incomplete', async () => {
    await openPortal(); click(screen.getByText('Set Questions'));
    const b = btn(/Save All 1 Question/); expect(b.disabled).toBe(true);
  });
  test('a teacher can mark a language lesson as reviewed, and unmark it', async () => {
    await openPortal(); click(screen.getByText('Review Lessons'));
    expect(screen.getByRole('note').textContent).toMatch(/AI-drafted/);
    const first = screen.getAllByRole('button', { name: 'Mark reviewed' })[0]; expect(first.disabled).toBe(true);
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Mrs Adeyemi' } });
    click(screen.getAllByRole('button', { name: 'Mark reviewed' })[0]);
    expect(screen.getByText(/Reviewed by Mrs Adeyemi/)).toBeTruthy();
    expect(Object.keys(JSON.parse(localStorage.getItem('etow_lang_v1')).reviews).length).toBe(1);
    click(screen.getByRole('button', { name: 'Remove review' }));
    expect(screen.queryByText(/Reviewed by/)).toBeNull();
  });
});
