// Shared UI helpers for tests that drive the real <App/> in jsdom.
import { vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CURRICULUM } from '../src/academy/curriculum.js';

export const click = (el) => fireEvent.click(el);
export const advance = async (ms) => { await act(async () => { vi.advanceTimersByTime(ms); }); };
export const flush = async () => { await act(async () => { await Promise.resolve(); await Promise.resolve(); }); };
export const esc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const btn = (name) => screen.getByRole('button', { name: name instanceof RegExp ? name : new RegExp(esc(name)) });
export const lessonOf = (id) => Object.values(CURRICULUM).flatMap(l => Object.values(l)).flat().flatMap(m => m.lessons).find(x => x.id === id);

export async function openHome(App) { render(<App />); await advance(3500); }
export async function openAcademy(App) { await openHome(App); click(screen.getByText(/Language Academy/)); await advance(50); }
export async function enrol(lang, level) {
  click(btn(/Choose a Language/i));
  click(btn(new RegExp(lang)));
  click(btn(new RegExp('^' + level)));
  click(btn(new RegExp('Start Learning ' + lang)));
  await advance(3200);
}
export async function openLanguage(lang) { click(btn(new RegExp(lang))); await advance(50); }
export async function openLesson(title) { click(btn(new RegExp(esc(title)))); await advance(50); }

// answer a lesson exercise / assessment item correctly, using the real lesson data
export function answerItem(q) {
  if (q.type === 'mcq') {
    const b = screen.getAllByRole('button').find(x => x.textContent.includes(q.options[q.answer]) && /^[A-D]/.test(x.textContent.trim()));
    click(b);
  } else if (q.type === 'fill' || q.type === 'translate') {
    const input = screen.getByRole('textbox'); fireEvent.change(input, { target: { value: q.answer } });
    const check = screen.queryByRole('button', { name: /^Check$/ }); if (check) click(check);
  }
}
