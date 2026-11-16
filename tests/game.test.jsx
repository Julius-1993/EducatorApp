// The ORIGINAL quiz game, driven through the real UI with offline questions (the AI server is unreachable).
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, fireEvent, act } from '@testing-library/react';
import App from '../src/App.jsx';
import { FALLBACK } from '../src/data/questionBank.js';
import { click, advance, flush, btn, openHome } from './helpers.jsx';

const bare = (o) => String(o).replace(/^[A-D]\)\s*/, '').trim();
beforeEach(() => { vi.useFakeTimers(); globalThis.fetch = vi.fn(async () => { throw new TypeError('offline'); }); });
afterEach(() => { vi.useRealTimers(); });

const KEY = 'Primary 1|Mathematics';
const bankQs = () => [...FALLBACK[KEY], ...(JSON.parse(localStorage.getItem('etow_ng_bank_v1') || '[]'))];

async function setup({ mode = 'Solo Challenge', timer = 'No Timer', count = '5', names = ['Amara', 'Chidi'] } = {}) {
  await openHome(App);
  click(screen.getByText(/Play Now/i)); await advance(50);
  click(btn(/^Primary School/)); await advance(50);
  click(btn(/^Primary 1$/)); await advance(50);
  click(btn(/^Mathematics/)); await advance(50);
  click(btn(/^Easy/)); await advance(50);
  click(btn(new RegExp('^' + timer))); await advance(50);
  click(btn(new RegExp('^' + mode))); await advance(50);
  const inputs = [...document.querySelectorAll('input')];
  if (inputs[0]) fireEvent.change(inputs[0], { target: { value: names[0] } });
  if (mode.startsWith('2 Players') && inputs[1]) fireEvent.change(inputs[1], { target: { value: names[1] } });
  click(screen.getByRole('button', { name: count }));
  click(btn(/Generate & Play/));
  for (let i = 0; i < 30 && !current(); i++) { await advance(400); await flush(); }
}
// which question is on screen? (longest matching question text wins)
function current() {
  const text = document.body.textContent;
  const hits = bankQs().filter(q => text.includes(q.q)).sort((a, b) => b.q.length - a.q.length);
  return hits[0] || null;
}
const optionButton = (txt) => screen.getAllByRole('button').find(b => b.textContent.includes(bare(txt)) && /^[A-D]/.test(b.textContent.trim()));
const answer = (correct) => {
  const q = current(); const i = correct ? q.answer : (q.answer + 1) % 4; click(optionButton(q.options[i])); return q;
};
async function next() { click(btn(/Next Question|See Results|Your Turn/)); await advance(300); await flush(); }

describe('solo game with offline questions', () => {
  test('starts even though the AI server is unreachable, and shows a real question', async () => {
    await setup(); expect(current()).not.toBeNull();
    expect(screen.getAllByRole('button').filter(b => /^[A-D]/.test(b.textContent.trim())).length).toBeGreaterThanOrEqual(4);
  });
  test('answering every question correctly gives a perfect score and a results screen', async () => {
    await setup();
    for (let i = 0; i < 5; i++) { answer(true); await next(); }
    expect(screen.getByText(/Wins!|Draw/)).toBeTruthy();
    expect(screen.getAllByText(/5 correct/).length).toBeGreaterThan(0); expect(screen.getAllByText(/100%/).length).toBeGreaterThan(0);
  });
  test('a wrong answer reveals the correct option and the explanation', async () => {
    await setup(); const q = answer(false);
    expect(screen.getAllByText(new RegExp(q.explanation.slice(0, 20).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))).length).toBeGreaterThan(0);
    expect(btn(/Next Question|See Results/)).toBeTruthy();
  });
  test('wrong answers are listed in the review with the correct answer', async () => {
    await setup(); const wrong = [];
    for (let i = 0; i < 5; i++) { wrong.push(answer(false).q); await next(); }
    click(btn(/^Review/)); await advance(50);
    expect(screen.getByText(/missed 5 questions/)).toBeTruthy();
    for (const q of wrong) expect(screen.getAllByText(q).length).toBeGreaterThan(0);
  });
  test('the final score is added to the leaderboard', async () => {
    await setup(); for (let i = 0; i < 5; i++) { answer(true); await next(); }
    const lb = JSON.parse(localStorage.getItem('etow_ng_lb_v1') || '[]'); expect(lb.length).toBeGreaterThan(0);
  });
  test('the timer expiring counts as a miss and moves on', async () => {
    await setup({ timer: '15s' });
    await advance(16000); await flush();
    expect(btn(/Next Question|See Results/)).toBeTruthy();
    click(btn(/Next Question|See Results/)); await advance(300);
    expect(current()).not.toBeNull();
  });
});

describe('two-player game', () => {
  test('each player\'s missed questions are listed under that player only', async () => {
    await setup({ mode: '2 Players', names: ['Amara', 'Chidi'] });
    const p1 = [], p2 = [];
    for (let i = 0; i < 5; i++) {
      const isP1 = i % 2 === 0;                       // turns alternate: P1, P2, P1, P2, P1
      const q = answer(!isP1);                        // Amara always wrong, Chidi always right
      (isP1 ? p1 : p2).push(q.q); await next();
    }
    click(btn(/^Review/)); await advance(50);
    click(btn(/Amara/)); await advance(50);
    expect(screen.getByText(/Amara missed 3 questions/)).toBeTruthy();
    for (const q of p1) expect(screen.getAllByText(q).length).toBeGreaterThan(0);
    for (const q of p2) expect(screen.queryByText(q)).toBeNull();      // Chidi's questions never appear under Amara
    click(btn(/Chidi/)); await advance(50);
    expect(screen.getByText(/Chidi got every question right/)).toBeTruthy();
  });
  test('the player who answered more correctly wins', async () => {
    await setup({ mode: '2 Players', names: ['Amara', 'Chidi'] });
    for (let i = 0; i < 5; i++) { answer(i % 2 === 1); await next(); }
    expect(screen.getByText(/Chidi Wins!/)).toBeTruthy();
  });
});

describe('teacher-saved questions in the game', () => {
  test('questions saved to the bank are used by a game for that class and subject', async () => {
    const mine = Array.from({ length: 5 }, (_, i) => ({ q: `Teacher question ${i + 1}: what is ${i + 2} + ${i + 2}?`, options: [`A) ${(i + 2) * 2}`, 'B) 1', 'C) 2', 'D) 3'], answer: 0, explanation: 'Doubling.', topic: '', className: 'Primary 1', subject: 'Mathematics' }));
    localStorage.setItem('etow_ng_bank_v1', JSON.stringify(mine));
    await setup();
    const q = current(); expect(mine.some(m => m.q === q.q)).toBe(true);
  });
});
