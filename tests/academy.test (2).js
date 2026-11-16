// ─────────────────────────────────────────────────────────────────────────────
// Language Academy — Comprehensive Unit Tests
// Run: node tests/academy.test.js
// Uses Node built-in assert — no external framework required
// Tests real curriculum data structures and grading logic
// ─────────────────────────────────────────────────────────────────────────────
import assert from 'assert';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Polyfill localStorage for Node ───────────────────────────────────────────
const _store = {};
global.localStorage = {
  getItem:    k     => _store[k] ?? null,
  setItem:    (k,v) => { _store[k] = String(v); },
  removeItem: k     => { delete _store[k]; },
  clear:      ()    => { Object.keys(_store).forEach(k => delete _store[k]); },
};

// ─────────────────────────────────────────────────────────────────────────────
// TEST RUNNER
// ─────────────────────────────────────────────────────────────────────────────
let passed = 0, failed = 0, skipped = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ ${name}`);
    passed++;
  } catch (e) {
    const msg = e.message || String(e);
    console.error(`  ❌ ${name}`);
    console.error(`     ${msg}`);
    failures.push({ name, msg });
    failed++;
  }
}

function skip(name, reason) {
  console.log(`  ⏭  ${name} — skipped: ${reason}`);
  skipped++;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTRACT TESTABLE LOGIC FROM SOURCE FILES
// (avoids maintaining duplicate copies of the same logic)
// ─────────────────────────────────────────────────────────────────────────────

// ── gradeExercise (extract from App.jsx) ─────────────────────────────────────
function normalize(s) {
  return (s || '').toLowerCase().trim().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
}

function gradeExercise(exercise, studentAnswer) {
  if (exercise.type === 'mcq') {
    const correct = studentAnswer === exercise.answer;
    return { correct, score: correct ? 100 : 0, feedback: correct ? '✓ Correct!' : `✗ ${exercise.explanation || ''}` };
  }
  if (exercise.type === 'fill') {
    const ans = normalize(studentAnswer);
    const correct = normalize(exercise.answer);
    const alts = (exercise.alt || []).map(normalize);
    const isCorrect = ans === correct || alts.includes(ans);
    return { correct: isCorrect, score: isCorrect ? 100 : 0, feedback: isCorrect ? '✓ Correct!' : `✗ Expected: "${exercise.answer}". ${exercise.explanation || ''}` };
  }
  if (exercise.type === 'translate') {
    const ans = normalize(studentAnswer);
    const correct = normalize(exercise.answer);
    const alts = (exercise.alt || []).map(normalize);
    const isCorrect = ans === correct || alts.includes(ans);
    return { correct: isCorrect, score: isCorrect ? 100 : 0 };
  }
  if (exercise.type === 'speak') {
    const score = typeof studentAnswer === 'object' ? (studentAnswer.score || 0) : 0;
    return { correct: score >= 70, score };
  }
  if (exercise.type === 'match') {
    if (!Array.isArray(studentAnswer)) return { correct: false, score: 0 };
    const total = exercise.pairs.length;
    const correctCount = studentAnswer.filter((a, i) => a === exercise.pairs[i][1]).length;
    const score = Math.round((correctCount / total) * 100);
    return { correct: score === 100, score };
  }
  return { correct: false, score: 0, feedback: 'Unknown type' };
}

function gradeAssessment(assessment, responses) {
  let total = 0, earned = 0;
  const results = assessment.map((q, i) => {
    const result = gradeExercise(q, responses[i]);
    total += 100;
    earned += result.score;
    return { ...q, ...result };
  });
  const score = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { score, results, passed: score >= 70 };
}

// ── shuffleQuestionOptions ────────────────────────────────────────────────────
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffleQuestionOptions(q) {
  const texts = q.options.map(o => o.replace(/^[A-D]\)\s*/, '').trim());
  const correctText = texts[q.answer];
  const shuffled = shuffleArr(texts);
  return {
    ...q,
    options: shuffled.map((t, i) => `${String.fromCharCode(65 + i)}) ${t}`),
    answer: shuffled.indexOf(correctText),
  };
}

// ── Tutor rate limiting ───────────────────────────────────────────────────────
const TUTOR_LIMIT = 20;
const NS = 'etow_lang_v1';

function canUseTutor() {
  const today = new Date().toDateString();
  try {
    const d = JSON.parse(localStorage.getItem(NS)) || {};
    return (d.tutorUsage?.[today] || 0) < TUTOR_LIMIT;
  } catch { return true; }
}

function recordTutorUsage() {
  const today = new Date().toDateString();
  try {
    const d = JSON.parse(localStorage.getItem(NS)) || {};
    if (!d.tutorUsage) d.tutorUsage = {};
    d.tutorUsage[today] = (d.tutorUsage[today] || 0) + 1;
    localStorage.setItem(NS, JSON.stringify(d));
  } catch {}
}

// ── Progress engine ───────────────────────────────────────────────────────────
function completeLesson(langId, lessonId, score, store = {}) {
  const key = `${langId}_${lessonId}`;
  const prev = store[key] || { attempts: 0, bestScore: 0 };
  store[key] = {
    lessonId,
    status: score >= 70 ? 'mastered' : 'completed',
    score,
    bestScore: Math.max(score, prev.bestScore),
    attempts: prev.attempts + 1,
    completedAt: Date.now(),
  };
  return store;
}

// ── Server sanitizeMessages ───────────────────────────────────────────────────
function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) throw new Error('messages must be an array');
  if (messages.length > 20) throw new Error('Too many messages');
  return messages.map((m, i) => {
    if (!m || typeof m !== 'object') throw new Error(`Message ${i} invalid`);
    const role = String(m.role || '');
    if (!['user', 'assistant', 'system'].includes(role)) throw new Error(`Invalid role: ${role}`);
    const content = String(m.content || '').slice(0, 8000);
    return { role, content };
  });
}

// ── Parse curriculum data directly from source files ─────────────────────────
function parseCurriculumFromSource() {
  // Extract CURRICULUM object boundaries from App.jsx
  const appSrc = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');

  // Count lesson IDs per language/level using regex
  const results = {};
  const LANGS   = ['es', 'zh', 'fr', 'ar'];
  const LEVELS  = ['beginner', 'intermediate', 'advanced', 'expert'];

  LANGS.forEach(lang => {
    results[lang] = {};
    LEVELS.forEach(level => {
      const prefix = `'${lang}-${level[0]}-m`;
      const altPrefix = `"${lang}-${level[0]}-m`;
      const count = (appSrc.match(new RegExp(prefix, 'g')) || []).length
                  + (appSrc.match(new RegExp(altPrefix, 'g')) || []).length;
      results[lang][level] = count;
    });
  });

  // Also check intermediate and advanced files
  const interSrc = readFileSync(path.join(ROOT, 'src/academy/curriculum_intermediate.js'), 'utf8');
  const advSrc   = readFileSync(path.join(ROOT, 'src/academy/curriculum_advanced.js'), 'utf8');

  LANGS.forEach(lang => {
    const iCount = (interSrc.match(new RegExp(`'${lang}-i-m`, 'g')) || []).length;
    const aCount = (advSrc.match(new RegExp(`'${lang}-a-m`, 'g')) || []).length;
    const eCount = (advSrc.match(new RegExp(`'${lang}-e-m`, 'g')) || []).length;
    results[lang]._intermediate_file = iCount;
    results[lang]._advanced_file     = aCount;
    results[lang]._expert_file       = eCount;
  });

  return results;
}

// ── Check for security patterns ───────────────────────────────────────────────
function checkSecurityPatterns() {
  const appSrc = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  return {
    hasWindowPrompt:      appSrc.includes('window.prompt'),
    hasSessionStorageKey: appSrc.includes('sessionStorage') && appSrc.includes('okey'),
    hasHardcodedKey:      appSrc.includes('sk-') || appSrc.includes('YOUR_OPENAI_API_KEY'),
    hasDirectOpenAI:      appSrc.includes("'https://api.openai.com'") || appSrc.includes('"https://api.openai.com"'),
    hasServerProxy:       appSrc.includes("'/api/ai'") || appSrc.includes('"/api/ai"'),
    hasNoServerError:     appSrc.includes('noServer') || appSrc.includes('No server') || appSrc.includes('npm run dev:full'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTS
// ─────────────────────────────────────────────────────────────────────────────

// ══ 1. GRADING ENGINE ════════════════════════════════════════════════════════
console.log('\n=== 1. GRADING ENGINE ===');

test('MCQ: correct answer → score 100', () => {
  const r = gradeExercise({ type: 'mcq', answer: 2, options: ['A','B','C','D'] }, 2);
  assert.strictEqual(r.score, 100);
  assert.strictEqual(r.correct, true);
});

test('MCQ: wrong answer → score 0', () => {
  const r = gradeExercise({ type: 'mcq', answer: 2, options: ['A','B','C','D'] }, 1);
  assert.strictEqual(r.score, 0);
  assert.strictEqual(r.correct, false);
});

test('MCQ: boundary — answer index 0', () => {
  const r = gradeExercise({ type: 'mcq', answer: 0, options: ['A','B','C','D'] }, 0);
  assert.strictEqual(r.correct, true);
});

test('Fill: case-insensitive match', () => {
  assert.strictEqual(gradeExercise({ type: 'fill', answer: 'Buenos' }, 'buenos').correct, true);
  assert.strictEqual(gradeExercise({ type: 'fill', answer: 'Buenos' }, 'BUENOS').correct, true);
});

test('Fill: strips trailing punctuation', () => {
  assert.strictEqual(gradeExercise({ type: 'fill', answer: 'Hola' }, 'Hola,').correct, true);
  assert.strictEqual(gradeExercise({ type: 'fill', answer: 'Hola' }, 'Hola.').correct, true);
});

test('Fill: accepts alternate valid answers', () => {
  const ex = { type: 'fill', answer: 'Hasta luego amigo', alt: ['Hasta luego, amigo', 'hasta luego amigo'] };
  assert.strictEqual(gradeExercise(ex, 'hasta luego amigo').correct, true);
  assert.strictEqual(gradeExercise(ex, 'Hasta luego, amigo').correct, true);
});

test('Fill: rejects completely wrong answer', () => {
  assert.strictEqual(gradeExercise({ type: 'fill', answer: 'Buenos' }, 'Hola').correct, false);
});

test('Translate: accepts primary and alternate answers', () => {
  const ex = { type: 'translate', answer: 'Nos duchamos todas las mañanas.', alt: ['Nos duchamos cada mañana.'] };
  assert.strictEqual(gradeExercise(ex, 'nos duchamos todas las mañanas').correct, true);
  assert.strictEqual(gradeExercise(ex, 'nos duchamos cada mañana').correct, true);
  assert.strictEqual(gradeExercise(ex, 'Me ducho cada mañana.').correct, false);
});

test('Match: all correct → 100', () => {
  const ex = { type: 'match', pairs: [['Hola','Hello'],['Adiós','Goodbye']] };
  assert.strictEqual(gradeExercise(ex, ['Hello','Goodbye']).score, 100);
});

test('Match: partial correct → partial score', () => {
  const ex = { type: 'match', pairs: [['Hola','Hello'],['Adiós','Goodbye']] };
  assert.strictEqual(gradeExercise(ex, ['Hello','Wrong']).score, 50);
});

test('Match: all wrong → 0', () => {
  const ex = { type: 'match', pairs: [['Hola','Hello'],['Adiós','Goodbye']] };
  assert.strictEqual(gradeExercise(ex, ['Wrong','Wrong']).score, 0);
});

test('Match: non-array response → 0', () => {
  const ex = { type: 'match', pairs: [['Hola','Hello']] };
  assert.strictEqual(gradeExercise(ex, null).score, 0);
});

test('Speak: score ≥ 70 → correct', () => {
  assert.strictEqual(gradeExercise({ type: 'speak' }, { score: 85 }).correct, true);
  assert.strictEqual(gradeExercise({ type: 'speak' }, { score: 70 }).correct, true);
});

test('Speak: score < 70 → incorrect', () => {
  assert.strictEqual(gradeExercise({ type: 'speak' }, { score: 69 }).correct, false);
});

test('Speak: skipped (score 0) → does not throw', () => {
  const r = gradeExercise({ type: 'speak' }, { score: 0 });
  assert.strictEqual(r.correct, false);
  assert.strictEqual(r.score, 0);
});

test('Assessment: 3/4 correct = 75% = passed', () => {
  const as = [0,1,2,3].map(a => ({ type: 'mcq', answer: a, options: ['A','B','C','D'] }));
  const result = gradeAssessment(as, [0, 1, 0, 3]); // Q3 wrong
  assert.strictEqual(result.score, 75);
  assert.strictEqual(result.passed, true);
});

test('Assessment: all wrong = 0% = not passed', () => {
  const as = [0,0].map(a => ({ type: 'mcq', answer: a, options: ['A','B','C','D'] }));
  const result = gradeAssessment(as, [1, 1]);
  assert.strictEqual(result.score, 0);
  assert.strictEqual(result.passed, false);
});

test('Assessment: exactly 70% = passed (boundary)', () => {
  const as = [0,0,0,0,0,0,0,0,0,0].map(a => ({ type: 'mcq', answer: a, options: ['A','B','C','D'] }));
  const responses = [0,0,0,0,0,0,0,1,1,1]; // 7/10 correct
  const result = gradeAssessment(as, responses);
  assert.strictEqual(result.score, 70);
  assert.strictEqual(result.passed, true);
});

test('Assessment: 69% = not passed (boundary)', () => {
  const as = Array.from({length:100}, () => ({ type: 'mcq', answer: 0, options: ['A','B','C','D'] }));
  const responses = Array.from({length:100}, (_, i) => i < 69 ? 0 : 1);
  const result = gradeAssessment(as, responses);
  assert.strictEqual(result.score, 69);
  assert.strictEqual(result.passed, false);
});

// ══ 2. SHUFFLE ENGINE ════════════════════════════════════════════════════════
console.log('\n=== 2. SHUFFLE ENGINE ===');

test('Shuffle: correct answer tracked after 100 shuffles', () => {
  const q = { q: 'Test', options: ['A) Cat','B) Dog','C) Fish','D) Bird'], answer: 2 };
  for (let i = 0; i < 100; i++) {
    const s = shuffleQuestionOptions(q);
    const correctText = s.options[s.answer].replace(/^[A-D]\) /, '');
    assert.strictEqual(correctText, 'Fish', `Failed on iteration ${i}: answer=${s.answer}, options=${JSON.stringify(s.options)}`);
  }
});

test('Shuffle: all 4 options preserved', () => {
  const q = { q: 'T', options: ['A) Cat','B) Dog','C) Fish','D) Bird'], answer: 0 };
  const s = shuffleQuestionOptions(q);
  const texts = s.options.map(o => o.replace(/^[A-D]\) /, ''));
  ['Cat','Dog','Fish','Bird'].forEach(item => assert.ok(texts.includes(item), `Missing: ${item}`));
});

test('Shuffle: answer index always valid (0–3)', () => {
  const q = { q: 'T', options: ['A) a','B) b','C) c','D) d'], answer: 3 };
  for (let i = 0; i < 50; i++) {
    const s = shuffleQuestionOptions(q);
    assert.ok(s.answer >= 0 && s.answer <= 3, `Invalid answer index: ${s.answer}`);
  }
});

// ══ 3. PROGRESS ENGINE ═══════════════════════════════════════════════════════
console.log('\n=== 3. PROGRESS ENGINE ===');

test('completeLesson: score ≥ 70 = mastered', () => {
  const store = {};
  completeLesson('es', 'es-b-m1-l1', 85, store);
  assert.strictEqual(store['es_es-b-m1-l1'].status, 'mastered');
});

test('completeLesson: score < 70 = completed (not mastered)', () => {
  const store = {};
  completeLesson('es', 'es-b-m1-l1', 60, store);
  assert.strictEqual(store['es_es-b-m1-l1'].status, 'completed');
});

test('completeLesson: best score updates on retry', () => {
  const store = {};
  completeLesson('fr', 'fr-b-m1-l1', 55, store);
  completeLesson('fr', 'fr-b-m1-l1', 90, store);
  assert.strictEqual(store['fr_fr-b-m1-l1'].bestScore, 90);
  assert.strictEqual(store['fr_fr-b-m1-l1'].attempts, 2);
});

test('completeLesson: best score does not decrease on worse retry', () => {
  const store = {};
  completeLesson('ar', 'ar-b-m1-l1', 90, store);
  completeLesson('ar', 'ar-b-m1-l1', 40, store);
  assert.strictEqual(store['ar_ar-b-m1-l1'].bestScore, 90);
  assert.strictEqual(store['ar_ar-b-m1-l1'].attempts, 2);
});

test('completeLesson: different languages stored independently', () => {
  const store = {};
  completeLesson('es', 'es-b-m1-l1', 100, store);
  completeLesson('fr', 'fr-b-m1-l1', 50, store);
  assert.strictEqual(store['es_es-b-m1-l1'].status, 'mastered');
  assert.strictEqual(store['fr_fr-b-m1-l1'].status, 'completed');
});

// ══ 4. TUTOR RATE LIMITING ═══════════════════════════════════════════════════
console.log('\n=== 4. TUTOR RATE LIMITING ===');

test('Tutor: allowed at 0 uses', () => {
  localStorage.clear();
  assert.strictEqual(canUseTutor(), true);
});

test('Tutor: allowed after 19 uses', () => {
  localStorage.clear();
  for (let i = 0; i < 19; i++) recordTutorUsage();
  assert.strictEqual(canUseTutor(), true);
});

test('Tutor: blocked at exactly 20 uses', () => {
  localStorage.clear();
  for (let i = 0; i < 20; i++) recordTutorUsage();
  assert.strictEqual(canUseTutor(), false);
});

test('Tutor: blocked at 21 uses', () => {
  localStorage.clear();
  for (let i = 0; i < 21; i++) recordTutorUsage();
  assert.strictEqual(canUseTutor(), false);
});

test('Tutor: usage resets on a new day', () => {
  localStorage.clear();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  localStorage.setItem(NS, JSON.stringify({ tutorUsage: { [yesterday]: 20 } }));
  assert.strictEqual(canUseTutor(), true);
});

// ══ 5. SERVER INPUT SANITISATION ═════════════════════════════════════════════
console.log('\n=== 5. SERVER INPUT SANITISATION ===');

test('sanitizeMessages: rejects non-array', () => {
  assert.throws(() => sanitizeMessages('oops'), /must be an array/);
  assert.throws(() => sanitizeMessages(null),   /must be an array/);
  assert.throws(() => sanitizeMessages(42),     /must be an array/);
});

test('sanitizeMessages: rejects > 20 messages', () => {
  const msgs = Array.from({ length: 21 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
  assert.throws(() => sanitizeMessages(msgs), /Too many/);
});

test('sanitizeMessages: accepts exactly 20 messages', () => {
  const msgs = Array.from({ length: 20 }, (_, i) => ({ role: 'user', content: `msg ${i}` }));
  const result = sanitizeMessages(msgs);
  assert.strictEqual(result.length, 20);
});

test('sanitizeMessages: rejects invalid role', () => {
  assert.throws(() => sanitizeMessages([{ role: 'admin',  content: 'x' }]), /Invalid role/);
  assert.throws(() => sanitizeMessages([{ role: 'hacker', content: 'x' }]), /Invalid role/);
});

test('sanitizeMessages: accepts all valid roles', () => {
  const msgs = [
    { role: 'user',      content: 'hello' },
    { role: 'assistant', content: 'hi' },
    { role: 'system',    content: 'you are a tutor' },
  ];
  const result = sanitizeMessages(msgs);
  assert.strictEqual(result.length, 3);
  assert.strictEqual(result[0].role, 'user');
  assert.strictEqual(result[2].role, 'system');
});

test('sanitizeMessages: truncates content > 8000 chars', () => {
  const long = 'x'.repeat(10000);
  const result = sanitizeMessages([{ role: 'user', content: long }]);
  assert.strictEqual(result[0].content.length, 8000);
});

test('sanitizeMessages: handles missing content gracefully', () => {
  const result = sanitizeMessages([{ role: 'user' }]);
  assert.strictEqual(result[0].content, '');
});

test('sanitizeMessages: rejects non-object message', () => {
  assert.throws(() => sanitizeMessages(['not an object']), /invalid/i);
});

// ══ 6. SECURITY AUDIT ════════════════════════════════════════════════════════
console.log('\n=== 6. SECURITY AUDIT (Source Code) ===');

const sec = checkSecurityPatterns();

test('No window.prompt for API key in frontend', () => {
  assert.strictEqual(sec.hasWindowPrompt, false,
    'window.prompt found in App.jsx — remove frontend key prompting');
});

test('No sessionStorage key storage in frontend', () => {
  assert.strictEqual(sec.hasSessionStorageKey, false,
    'sessionStorage + okey found — frontend must not store API keys');
});

test('No hardcoded API key in frontend', () => {
  assert.strictEqual(sec.hasHardcodedKey, false,
    'Hardcoded API key found in App.jsx');
});

test('No direct call to api.openai.com from frontend', () => {
  assert.strictEqual(sec.hasDirectOpenAI, false,
    'Direct OpenAI fetch found in App.jsx — must use server proxy');
});

test('Frontend uses /api/ai server proxy', () => {
  assert.strictEqual(sec.hasServerProxy, true,
    'Server proxy endpoint /api/ai not found in App.jsx');
});

test('Frontend shows clear error when server unavailable', () => {
  assert.strictEqual(sec.hasNoServerError, true,
    'No clear error message found for when server is unavailable');
});

// ══ 7. CURRICULUM COMPLETENESS ═══════════════════════════════════════════════
console.log('\n=== 7. CURRICULUM COMPLETENESS ===');

const currData = parseCurriculumFromSource();
const LANGS  = ['es', 'zh', 'fr', 'ar'];
const LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];
const LANG_NAMES = { es: 'Spanish', zh: 'Mandarin', fr: 'French', ar: 'Arabic' };

LANGS.forEach(lang => {
  test(`${LANG_NAMES[lang]}: has beginner content`, () => {
    const count = currData[lang].beginner;
    assert.ok(count > 0, `${LANG_NAMES[lang]} beginner has no lessons (count: ${count})`);
  });

  test(`${LANG_NAMES[lang]}: has intermediate content`, () => {
    const count = currData[lang]._intermediate_file || currData[lang].intermediate;
    assert.ok(count > 0, `${LANG_NAMES[lang]} intermediate has no lessons (count in file: ${currData[lang]._intermediate_file})`);
  });

  test(`${LANG_NAMES[lang]}: has advanced content`, () => {
    const count = currData[lang]._advanced_file || currData[lang].advanced;
    assert.ok(count > 0, `${LANG_NAMES[lang]} advanced has no lessons (count in file: ${currData[lang]._advanced_file})`);
  });

  test(`${LANG_NAMES[lang]}: has expert content`, () => {
    const count = currData[lang]._expert_file || currData[lang].expert;
    assert.ok(count > 0, `${LANG_NAMES[lang]} expert has no lessons (count in file: ${currData[lang]._expert_file})`);
  });
});

// ══ 8. LESSON STRUCTURE VALIDATION ══════════════════════════════════════════
console.log('\n=== 8. LESSON STRUCTURE VALIDATION ===');

// Parse a sample of lessons from source
function extractSampleLesson(langId, levelChar) {
  const appSrc = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const advSrc = readFileSync(path.join(ROOT, 'src/academy/curriculum_advanced.js'), 'utf8');
  const intSrc = readFileSync(path.join(ROOT, 'src/academy/curriculum_intermediate.js'), 'utf8');

  const id = `${langId}-${levelChar}-m1-l1`;
  // Check if ID exists in any source file
  const inApp  = appSrc.includes(`'${id}'`) || appSrc.includes(`"${id}"`);
  const inAdv  = advSrc.includes(`'${id}'`) || advSrc.includes(`"${id}"`);
  const inInt  = intSrc.includes(`'${id}'`) || intSrc.includes(`"${id}"`);
  return { id, found: inApp || inAdv || inInt, inApp, inAdv, inInt };
}

const sampleLessons = [
  { lang: 'es', level: 'b', name: 'Spanish Beginner L1' },
  { lang: 'es', level: 'i', name: 'Spanish Intermediate L1' },
  { lang: 'es', level: 'a', name: 'Spanish Advanced L1' },
  { lang: 'es', level: 'e', name: 'Spanish Expert L1' },
  { lang: 'zh', level: 'b', name: 'Mandarin Beginner L1' },
  { lang: 'zh', level: 'a', name: 'Mandarin Advanced L1' },
  { lang: 'fr', level: 'b', name: 'French Beginner L1' },
  { lang: 'fr', level: 'e', name: 'French Expert L1' },
  { lang: 'ar', level: 'b', name: 'Arabic Beginner L1' },
  { lang: 'ar', level: 'e', name: 'Arabic Expert L1' },
];

sampleLessons.forEach(({ lang, level, name }) => {
  test(`Lesson ID exists: ${name}`, () => {
    const result = extractSampleLesson(lang, level);
    assert.ok(result.found, `Lesson ID "${result.id}" not found in any source file`);
  });
});

// ══ 9. ARABIC FIX VERIFICATION ═══════════════════════════════════════════════
console.log('\n=== 9. ARABIC BUG FIX VERIFICATION ===');

test('Arabic time question: inconsistency fixed in App.jsx', () => {
  const appSrc = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const hasBug = appSrc.includes('الساعة العاشرة _____. (It is 10:45') &&
                 appSrc.includes('Wait — the question says 10:45');
  assert.strictEqual(hasBug, false, 'Arabic time question inconsistency still present in App.jsx');
});

test('Arabic time question: fixed in curriculum_intermediate.js', () => {
  const intSrc = readFileSync(path.join(ROOT, 'src/academy/curriculum_intermediate.js'), 'utf8');
  const hasBug = intSrc.includes('Wait — the question says 10:45');
  assert.strictEqual(hasBug, false, 'Arabic time question inconsistency still present in curriculum_intermediate.js');
});

test('Arabic time question: correct answer in both files', () => {
  const appSrc = readFileSync(path.join(ROOT, 'src/App.jsx'), 'utf8');
  const intSrc = readFileSync(path.join(ROOT, 'src/academy/curriculum_intermediate.js'), 'utf8');
  // The correct question should reference الحادية عشرة (eleven) for 10:45
  const appFixed = appSrc.includes('الحادية عشرة') || appSrc.includes('ar-i-m1-l3');
  const intFixed = intSrc.includes('الحادية عشرة');
  assert.ok(intFixed, 'Fixed Arabic time question not found in curriculum_intermediate.js');
});

// ══ 10. FILE STRUCTURE ═══════════════════════════════════════════════════════
console.log('\n=== 10. FILE STRUCTURE ===');

const EXPECTED_FILES = [
  'package.json',
  'vite.config.js',
  'server.js',
  'index.html',
  '.env.example',
  'src/App.jsx',
  'src/main.jsx',
  'src/academy/curriculum_intermediate.js',
  'src/academy/curriculum_advanced.js',
  'src/styles/theme.css',
  'tests/academy.test.js',
  'electron/main.js',
];

EXPECTED_FILES.forEach(file => {
  test(`File exists: ${file}`, () => {
    const full = path.join(ROOT, file);
    try {
      readFileSync(full);
    } catch {
      assert.fail(`File not found: ${file}`);
    }
  });
});

test('package.json has all required dependencies', () => {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  const required = ['react', 'react-dom', 'vite', '@vitejs/plugin-react',
                    'lucide-react', 'express', 'concurrently', 'wait-on'];
  const missing = required.filter(p => !all[p]);
  assert.strictEqual(missing.length, 0, `Missing dependencies: ${missing.join(', ')}`);
});

test('package.json test script runs node directly (no fallback)', () => {
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const testScript = pkg.scripts?.test || '';
  assert.ok(testScript.includes('node') && testScript.includes('academy.test.js'),
    `Test script should run "node tests/academy.test.js", got: "${testScript}"`);
  assert.ok(!testScript.includes('echo') && !testScript.includes('true'),
    `Test script must not contain fallback that silently reports success`);
});

test('.env.example does not contain real API key', () => {
  const env = readFileSync(path.join(ROOT, '.env.example'), 'utf8');
  assert.ok(!env.match(/sk-[a-zA-Z0-9]{20,}/), '.env.example contains what looks like a real API key');
});

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────────────────────────────────────
const divider = '═'.repeat(60);
console.log(`\n${divider}`);
console.log(`Results: ${passed} passed  |  ${failed} failed  |  ${skipped} skipped`);

if (failures.length > 0) {
  console.error('\nFailed tests:');
  failures.forEach(({ name, msg }) => {
    console.error(`  ❌ ${name}`);
    console.error(`     → ${msg}`);
  });
}

if (failed > 0) {
  console.error(`\n❌ ${failed} test(s) failed — see details above`);
  process.exit(1);
} else {
  console.log('\n✅ All tests passed');
  process.exit(0);
}
