// Integrity of the REAL offline question bank and the real shuffle used when a game starts.
import { describe, test, expect } from 'vitest';
import { FALLBACK, getFallback } from '../src/data/questionBank.js';
import { NIGERIA } from '../src/data/curriculum.js';
import { shuffleQuestions, shuffleOpts } from '../src/utils/shuffleQuestions.js';

const entries = Object.entries(FALLBACK);
const all = entries.flatMap(([key, arr]) => arr.map((q, i) => ({ key, i, q })));
const bare = o => String(o).replace(/^[A-D]\)\s*/, '').trim().toLowerCase();

describe('question bank', () => {
  test('has a substantial number of questions across many subjects', () => {
    expect(all.length).toBeGreaterThan(2000);
    expect(entries.length).toBeGreaterThan(60);
  });
  test('every question is well-formed: 4 distinct prefixed options, a valid answer index, an explanation', () => {
    for (const { key, i, q } of all) {
      const where = `${key} #${i}: ${q.q}`;
      expect(q.q?.trim().length, where).toBeGreaterThanOrEqual(5);
      expect(q.options?.length, where).toBe(4);
      expect(new Set(q.options.map(bare)).size, where + ' (duplicate options)').toBe(4);
      q.options.forEach((o, j) => expect(o.startsWith('ABCD'[j] + ')'), where).toBe(true));
      expect(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, where).toBe(true);
      expect(q.explanation?.trim().length, where).toBeGreaterThan(0);
    }
  });
  test('no duplicate question text within a subject', () => {
    for (const [key, arr] of entries) {
      const texts = arr.map(q => q.q.trim().toLowerCase());
      expect(new Set(texts).size, key).toBe(texts.length);
    }
  });
  test('keys are "CLASS|Subject" and the class exists in the Nigerian curriculum', () => {
    const classes = new Set(Object.values(NIGERIA).flatMap(l => l.classes));
    for (const [key] of entries) {
      const [cls, subject] = key.split('|');
      expect(subject, key).toBeTruthy();
      expect(classes.has(cls), `unknown class in key: ${key}`).toBe(true);
    }
  });
  test('getFallback returns the requested number of questions from the right subject', () => {
    const [key] = entries.find(([, a]) => a.length >= 10);
    const [cls, subject] = key.split('|');
    const out = getFallback(cls, subject, 5);
    expect(out.length).toBe(5);
    for (const q of out) expect(FALLBACK[key].some(x => x.q === q.q)).toBe(true);
  });
});

describe('answer shuffling (the raw bank is biased toward option A)', () => {
  test('the raw bank really is biased, which is why shuffling at load time matters', () => {
    const a = all.filter(x => x.q.answer === 0).length / all.length;
    expect(a).toBeGreaterThan(0.4);
  });
  test('shuffling keeps the correct answer text correct for EVERY real question', () => {
    for (const { key, i, q } of all) {
      const s = shuffleOpts(q);
      expect(bare(s.options[s.answer]), `${key} #${i}`).toBe(bare(q.options[q.answer]));
      expect(new Set(s.options.map(bare)).size).toBe(4);
      s.options.forEach((o, j) => expect(o.startsWith('ABCD'[j] + ')')).toBe(true));
    }
  });
  test('after shuffling, the correct answer is spread roughly evenly over A-D', () => {
    const pos = [0, 0, 0, 0]; let n = 0;
    for (let rep = 0; rep < 3; rep++) for (const q of shuffleQuestions(all.map(x => x.q))) { pos[q.answer]++; n++; }
    for (const c of pos) { expect(c / n).toBeGreaterThan(0.2); expect(c / n).toBeLessThan(0.3); }
  });
  test('shuffleQuestions does not mutate its input', () => {
    const src = all.slice(0, 20).map(x => x.q); const copy = JSON.stringify(src);
    shuffleQuestions(src); expect(JSON.stringify(src)).toBe(copy);
  });
});
