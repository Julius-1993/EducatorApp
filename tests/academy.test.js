// Tests of the REAL academy modules (engine, curriculum, speech): nothing here is a copy of the logic.
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { CURRICULUM, LANGUAGES, LEVELS, ACHIEVEMENTS } from '../src/academy/curriculum.js';
import * as engine from '../src/academy/engine.js';
import { evaluateSpeech, normalizeForSpeech, STT } from '../src/academy/speech.js';

const LANGS = ['es', 'zh', 'fr', 'ar'];
const LEVEL_IDS = ['beginner', 'intermediate', 'advanced', 'expert'];
const lessonsOf = (lang, level) => CURRICULUM[lang][level].flatMap(m => m.lessons);
const allLessons = LANGS.flatMap(l => LEVEL_IDS.flatMap(v => lessonsOf(l, v).map(x => ({ lang: l, level: v, lesson: x }))));
const EMOJI = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2B50\u2705\u274C]/u;

describe('curriculum: every language has real lessons at every level', () => {
  test.each(LANGS.flatMap(l => LEVEL_IDS.map(v => [l, v])))('%s / %s is non-empty', (lang, level) => {
    expect(lessonsOf(lang, level).length).toBeGreaterThanOrEqual(2);
  });
  test('lesson ids are unique and follow lang-level-module-lesson', () => {
    const ids = allLessons.map(x => x.lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const { lang, level, lesson } of allLessons) expect(lesson.id).toMatch(new RegExp(`^${lang}-${level[0]}-m\\d+-l\\d+$`));
  });
  test('no level reuses another level\'s lessons', () => {
    for (const lang of LANGS) {
      const titles = LEVEL_IDS.flatMap(v => lessonsOf(lang, v).map(x => x.title));
      expect(new Set(titles).size).toBe(titles.length);
    }
  });
  test('four languages and four levels are defined', () => {
    expect(LANGUAGES.map(l => l.id).sort()).toEqual([...LANGS].sort());
    expect(LEVELS.map(l => l.id)).toEqual(LEVEL_IDS);
  });
  test('Arabic is flagged right-to-left and the rest are not', () => {
    expect(LANGUAGES.find(l => l.id === 'ar').rtl).toBe(true);
    for (const l of LANGUAGES.filter(l => l.id !== 'ar')) expect(l.rtl).toBe(false);
  });
});

describe('curriculum: every lesson is complete and internally consistent', () => {
  test.each(allLessons.map(x => [x.lesson.id, x.lesson]))('%s', (_id, L) => {
    expect(L.title?.length).toBeGreaterThan(2);
    expect(L.objectives.length).toBeGreaterThanOrEqual(2);
    expect(L.vocab.length).toBeGreaterThanOrEqual(4);
    for (const v of L.vocab) { expect(v.word).toBeTruthy(); expect(v.translation).toBeTruthy(); }
    expect(L.grammar.title && L.grammar.explanation.length).toBeGreaterThan(40);
    expect(L.dialogue.lines.length).toBeGreaterThanOrEqual(3);
    for (const l of L.dialogue.lines) { expect(l.speaker && l.text && l.translation).toBeTruthy(); }
    expect(L.exercises.length).toBeGreaterThanOrEqual(3);
    expect(L.assessment.length).toBeGreaterThanOrEqual(2);
    for (const q of [...L.exercises, ...L.assessment]) {
      expect(['mcq', 'fill', 'translate', 'match', 'speak']).toContain(q.type);
      expect(q.explanation?.length).toBeGreaterThan(10);
      if (q.type === 'mcq') {
        expect(q.options.length).toBe(4);
        expect(new Set(q.options).size).toBe(4);
        expect(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4).toBe(true);
      }
      if (q.type === 'fill' || q.type === 'translate') { expect(q.q).toBeTruthy(); expect(q.answer).toBeTruthy(); }
      if (q.type === 'match') expect(q.pairs.length).toBeGreaterThanOrEqual(2);
      if (q.type === 'speak') { expect(q.target).toBeTruthy(); expect(q.tip).toBeTruthy(); }
    }
  });
  test('assessments contain only auto-gradable items (no speaking)', () => {
    for (const { lesson } of allLessons) for (const q of lesson.assessment) expect(q.type).not.toBe('speak');
  });
  test('every language has at least one speaking exercise at every level', () => {
    for (const lang of LANGS) for (const level of LEVEL_IDS)
      expect(lessonsOf(lang, level).some(l => l.exercises.some(e => e.type === 'speak')), `${lang}/${level}`).toBe(true);
  });
  test('Mandarin vocabulary carries pinyin', () => {
    for (const level of LEVEL_IDS) for (const L of lessonsOf('zh', level)) for (const v of L.vocab) expect(v.pinyin, `${L.id} ${v.word}`).toBeTruthy();
  });
  test('no emoji anywhere in lesson content', () => {
    for (const { lesson } of allLessons) expect(EMOJI.test(JSON.stringify(lesson)), lesson.id).toBe(false);
  });
  test('no lesson claims to be human-reviewed (none has been)', () => {
    for (const { lesson } of allLessons) expect(lesson.__reviewed === true, lesson.id).toBe(false);
  });
  test('Arabic 10:45 question is consistent (quarter to ELEVEN = الحادية عشرة)', () => {
    const q = lessonsOf('ar', 'intermediate').flatMap(l => [...l.exercises, ...l.assessment]).find(x => /10:45/.test(x.q || ''));
    expect(q.q).toContain('الحادية عشرة');
    expect(q.explanation).not.toMatch(/wait/i);
  });
  test('achievements have icon names, not emoji', () => { for (const a of ACHIEVEMENTS) expect(EMOJI.test(a.icon)).toBe(false); });
});

describe('grading (real engine.gradeExercise / gradeAssessment)', () => {
  const g = engine.gradeExercise, ga = engine.gradeAssessment;
  test('mcq', () => { expect(g({ type: 'mcq', answer: 2 }, 2).score).toBe(100); expect(g({ type: 'mcq', answer: 2 }, 1).score).toBe(0); expect(g({ type: 'mcq', answer: 0 }, 0).correct).toBe(true); });
  test('fill ignores case and punctuation, accepts alternates', () => {
    expect(g({ type: 'fill', answer: 'Buenos' }, ' BUENOS. ').correct).toBe(true);
    expect(g({ type: 'fill', answer: 'a', alt: ['b'] }, 'b').correct).toBe(true);
    expect(g({ type: 'fill', answer: 'Buenos' }, 'Hola').correct).toBe(false);
  });
  test('translate accepts listed alternatives only', () => {
    const ex = { type: 'translate', answer: 'Nos duchamos todas las mañanas.', alt: ['Nos duchamos cada mañana.'] };
    expect(g(ex, 'nos duchamos cada mañana').correct).toBe(true);
    expect(g(ex, 'Me ducho cada mañana').correct).toBe(false);
  });
  test('match: partial credit, non-array is zero', () => {
    const ex = { type: 'match', pairs: [['a', '1'], ['b', '2']] };
    expect(g(ex, ['1', '2']).score).toBe(100); expect(g(ex, ['1', 'x']).score).toBe(50); expect(g(ex, null).score).toBe(0);
  });
  test('speak: pass at 70, skipped is zero without throwing', () => {
    expect(g({ type: 'speak' }, { score: 70 }).correct).toBe(true); expect(g({ type: 'speak' }, { score: 69 }).correct).toBe(false);
    expect(g({ type: 'speak' }, { score: 0, skipped: true }).score).toBe(0);
  });
  test('unanswered (undefined) answers score zero and never throw', () => {
    for (const t of ['mcq', 'fill', 'translate', 'match', 'speak']) expect(() => g({ type: t, answer: 'x', pairs: [['a', 'b']] }, undefined)).not.toThrow();
    expect(g({ type: 'mcq', answer: 0 }, undefined).score).toBe(0);
  });
  test('assessment pass mark is exactly 70', () => {
    const mk = n => Array.from({ length: 100 }, () => ({ type: 'mcq', answer: 0 }));
    const r = k => ga(mk(), Array.from({ length: 100 }, (_, i) => (i < k ? 0 : 1)));
    expect(r(70).passed).toBe(true); expect(r(69).passed).toBe(false); expect(r(100).score).toBe(100); expect(r(0).score).toBe(0);
  });
  test('every REAL assessment item is passed by its own stored answer (answer keys are self-consistent)', () => {
    for (const { lesson } of allLessons) {
      const answers = lesson.assessment.map(q => (q.type === 'match' ? q.pairs.map(p => p[1]) : q.answer));
      expect(ga(lesson.assessment, answers).score, lesson.id).toBe(100);
    }
  });
});

describe('progress, mastery, XP and streaks (real engine on real localStorage)', () => {
  beforeEach(() => { engine.enrol('es', 'beginner', 'sss'); engine.enrol('fr', 'beginner', 'jss'); });
  test('enrolment is stored per language and survives a fresh read', () => {
    const e = engine.getEnrolments(); expect(Object.keys(e).sort()).toEqual(['es', 'fr']); expect(e.fr.eduGroup).toBe('jss');
  });
  test('changing level keeps existing progress', () => {
    engine.startLesson('es', 'es-b-m1-l1'); engine.completeLesson('es', 'es-b-m1-l1', 80);
    engine.enrol('es', 'intermediate', 'sss');
    expect(engine.getEnrolments().es.level).toBe('intermediate');
    expect(engine.getLessonProgress('es', 'es-b-m1-l1').status).toBe('mastered');
  });
  test('>= 70 is mastered, below is only completed', () => {
    expect(engine.completeLesson('es', 'a', 70).status).toBe('mastered');
    expect(engine.completeLesson('es', 'b', 69).status).toBe('completed');
  });
  test('a worse retake never lowers best score and never removes mastery', () => {
    engine.completeLesson('es', 'es-b-m1-l1', 90);
    const after = engine.completeLesson('es', 'es-b-m1-l1', 40);
    expect(after.bestScore).toBe(90); expect(after.attempts).toBe(2); expect(after.status).toBe('mastered');
  });
  test('Spanish progress never changes French progress', () => {
    engine.completeLesson('es', 'x1', 100);
    expect(engine.getLessonProgress('fr', 'x1')).toBeNull();
    expect(engine.getStats('fr').mastered).toBe(0); expect(engine.getStats('es').mastered).toBe(1);
  });
  test('XP is not farmed by repeating a lesson with no improvement', () => {
    engine.completeLesson('es', 'l', 90); const xp1 = engine.getProfile().xp;
    engine.completeLesson('es', 'l', 90); engine.completeLesson('es', 'l', 80);
    expect(engine.getProfile().xp).toBe(xp1);
  });
  test('assessment attempts are kept as history, not overwritten', () => {
    engine.saveAttempt('es', 'l', { 0: 1 }, 50); engine.saveAttempt('es', 'l', { 0: 2 }, 90);
    const a = engine.getAttempts('es', 'l'); expect(a.length).toBe(2); expect(a.map(x => x.score)).toEqual([50, 90]);
  });
  test('getStats averages best scores', () => {
    engine.completeLesson('es', 'a', 100); engine.completeLesson('es', 'b', 50);
    const s = engine.getStats('es'); expect(s.total).toBe(2); expect(s.avgScore).toBe(75); expect(s.mastered).toBe(1);
  });
});

describe('streaks (fake clock)', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });
  test('consecutive days build a streak; a gap resets it; same-day repeats do not double count', () => {
    vi.setSystemTime(new Date('2026-03-01T10:00:00')); expect(engine.updateStreak()).toBe(1); expect(engine.updateStreak()).toBe(1);
    vi.setSystemTime(new Date('2026-03-02T10:00:00')); expect(engine.updateStreak()).toBe(2);
    vi.setSystemTime(new Date('2026-03-03T10:00:00')); expect(engine.updateStreak()).toBe(3);
    vi.setSystemTime(new Date('2026-03-06T10:00:00')); expect(engine.updateStreak()).toBe(1);
  });
  test('3-day streak unlocks its achievement exactly once', () => {
    expect(engine.checkAchievements('streak', 3).map(a => a.id)).toEqual(['streak_3']);
    expect(engine.checkAchievements('streak', 3)).toEqual([]);
  });
});

describe('spaced repetition', () => {
  test('correct answers double the interval (max 30 days); a miss resets to 1', () => {
    engine.reviewVocab('es', 'hola', true); engine.reviewVocab('es', 'hola', true); engine.reviewVocab('es', 'hola', true);
    expect(engine.getVocabStatus('es').hola.interval).toBe(8);
    engine.reviewVocab('es', 'hola', false); expect(engine.getVocabStatus('es').hola.interval).toBe(1);
    for (let i = 0; i < 10; i++) engine.reviewVocab('es', 'adios', true);
    expect(engine.getVocabStatus('es').adios.interval).toBe(30);
  });
  test('words reviewed today are not due; new words are', () => {
    engine.reviewVocab('es', 'hola', true);
    const due = engine.getDueVocab('es', [{ word: 'hola' }, { word: 'nuevo' }]);
    expect(due.map(v => v.word)).toEqual(['nuevo']);
  });
});

describe('AI tutor daily limit (real engine)', () => {
  test('allowed until 20 messages, blocked after, reset next day', () => {
    expect(engine.canUseTutor()).toBe(true);
    for (let i = 0; i < 19; i++) engine.recordTutorUsage(); expect(engine.canUseTutor()).toBe(true);
    engine.recordTutorUsage(); expect(engine.canUseTutor()).toBe(false); expect(engine.getTutorUsageToday()).toBe(20);
    const y = new Date(Date.now() - 86400000).toDateString();
    localStorage.setItem('etow_lang_v1', JSON.stringify({ tutorUsage: { [y]: 20 } })); expect(engine.canUseTutor()).toBe(true);
  });
});

describe('lesson review records', () => {
  test('a teacher can mark and unmark a lesson', () => {
    expect(engine.getLessonReview('es-b-m1-l1')).toBeNull();
    engine.setLessonReview('es-b-m1-l1', '  Mrs Adeyemi '); expect(engine.getLessonReview('es-b-m1-l1').reviewer).toBe('Mrs Adeyemi');
    engine.setLessonReview('es-b-m1-l1', ''); expect(engine.getLessonReview('es-b-m1-l1')).toBeNull();
  });
});

describe('speech evaluation (approximate recognition match, not pronunciation scoring)', () => {
  test('ignores accents, case and punctuation (Spanish)', () => expect(evaluateSpeech('Buenos días, ¿cómo estás?', 'buenos dias como estas', 'es').score).toBe(100));
  test('ignores Arabic diacritics and letter variants', () => expect(evaluateSpeech('إنَّ التعليمَ أساسُ', 'ان التعليم اساس', 'ar').score).toBe(100));
  test('Chinese is compared per character, with partial credit', () => {
    expect(evaluateSpeech('你好', '你好。', 'zh').score).toBe(100);
    expect(evaluateSpeech('我有一个哥哥', '我有一个弟弟', 'zh').score).toBe(67);
  });
  test('reports which words were missed', () => expect(evaluateSpeech('Bonjour comment allez-vous', 'bonjour allez vous', 'fr').missing).toEqual(['comment']));
  test('empty recognition scores zero and says so', () => { const r = evaluateSpeech('Hola', '', 'es'); expect(r.score).toBe(0); expect(r.feedback).toMatch(/No speech/); });
  test('result is always labelled approximate', () => expect(evaluateSpeech('a', 'a').approximate).toBe(true));
  test('normalizeForSpeech splits Chinese into characters and others into words', () => {
    expect(normalizeForSpeech('你好吗', 'zh')).toEqual(['你', '好', '吗']); expect(normalizeForSpeech('Hola, amigo!', 'es')).toEqual(['hola', 'amigo']);
  });
  test('speech recognition is reported unsupported where the browser lacks it', () => expect(STT.supported).toBe(false));
});
