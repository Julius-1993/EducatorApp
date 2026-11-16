import { ACHIEVEMENTS } from './curriculum.js';

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE ACADEMY ENGINE — progress, mastery, XP, spaced repetition
// All state stored in localStorage under namespace 'etow_lang_v1'
// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS already defined above

const NS = 'etow_lang_v1';

function load() {
  try { return JSON.parse(localStorage.getItem(NS)) || {}; } catch { return {}; }
}
function storageAvailable() {
  try { const k = '__etow_probe'; localStorage.setItem(k, '1'); localStorage.removeItem(k); return true; } catch { return false; }
}
function save(data) {
  try { localStorage.setItem(NS, JSON.stringify(data)); } catch {}
}

// ── Profile ────────────────────────────────────────────────────────────────
function getProfile() {
  const d = load();
  return d.profile || { name: '', xp: 0, streak: 0, lastStudyDay: null, achievements: [] };
}
function saveProfile(profile) {
  const d = load();
  d.profile = { ...d.profile, ...profile };
  save(d);
}

// ── Language enrolment ─────────────────────────────────────────────────────
function getEnrolments() {
  return load().enrolments || {};
}
function enrol(langId, level, eduGroup) {
  const d = load();
  if (!d.enrolments) d.enrolments = {};
  if (!d.enrolments[langId]) {
    d.enrolments[langId] = { langId, level, eduGroup, enrolledAt: Date.now(), progress: {} };
  } else {
    d.enrolments[langId].level = level;
    d.enrolments[langId].eduGroup = eduGroup;
  }
  save(d);
  return d.enrolments[langId];
}

// ── Lesson progress ────────────────────────────────────────────────────────
function getLessonProgress(langId, lessonId) {
  const d = load();
  return d.enrolments?.[langId]?.progress?.[lessonId] || null;
}
function startLesson(langId, lessonId) {
  const d = load();
  if (!d.enrolments?.[langId]) return;
  if (!d.enrolments[langId].progress) d.enrolments[langId].progress = {};
  const existing = d.enrolments[langId].progress[lessonId];
  if (!existing) {
    d.enrolments[langId].progress[lessonId] = {
      lessonId, status: 'in_progress', startedAt: Date.now(),
      completedAt: null, score: null, attempts: 0, bestScore: 0,
    };
    save(d);
  }
}
function completeLesson(langId, lessonId, score) {
  const d = load();
  if (!d.enrolments?.[langId]?.progress) return;
  const prev = d.enrolments[langId].progress[lessonId] || {};
  const bestScore = Math.max(score, prev.bestScore || 0);
  const wasMastered = (prev.bestScore || 0) >= 70;
  const nowMastered = bestScore >= 70;
  const firstTime = !prev.completedAt;
  d.enrolments[langId].progress[lessonId] = {
    ...prev,
    lessonId,
    status: nowMastered ? 'mastered' : 'completed',   // a worse retake never removes mastery
    completedAt: Date.now(),
    score,
    bestScore,
    attempts: (prev.attempts || 0) + 1,
  };
  save(d);
  // XP rewards learning, not repetition: full XP the first time, a bonus for first reaching mastery, nothing for repeats.
  const xpGain = firstTime ? (score >= 90 ? 100 : score >= 70 ? 75 : 50) : (!wasMastered && nowMastered ? 25 : 0);
  if (xpGain) addXP(xpGain);
  updateStreak();
  return d.enrolments[langId].progress[lessonId];
}

// ── Assessment attempts ────────────────────────────────────────────────────
function saveAttempt(langId, lessonId, responses, score) {
  const d = load();
  if (!d.attempts) d.attempts = [];
  d.attempts.push({
    langId, lessonId, responses, score,
    timestamp: Date.now(),
    id: `${langId}_${lessonId}_${Date.now()}`,
  });
  // Keep last 200 attempts
  if (d.attempts.length > 200) d.attempts = d.attempts.slice(-200);
  save(d);
}
function getAttempts(langId, lessonId) {
  const d = load();
  return (d.attempts || []).filter(a => a.langId === langId && a.lessonId === lessonId);
}

// ── Vocabulary mastery (spaced repetition) ─────────────────────────────────
function getVocabStatus(langId) {
  return load().vocab?.[langId] || {};
}
function reviewVocab(langId, word, correct) {
  const d = load();
  if (!d.vocab) d.vocab = {};
  if (!d.vocab[langId]) d.vocab[langId] = {};
  const existing = d.vocab[langId][word] || { correct: 0, wrong: 0, nextReview: Date.now(), interval: 1 };
  if (correct) {
    existing.correct++;
    existing.interval = Math.min(existing.interval * 2, 30); // days
  } else {
    existing.wrong++;
    existing.interval = 1;
  }
  existing.nextReview = Date.now() + existing.interval * 86400000;
  existing.lastReviewed = Date.now();
  d.vocab[langId][word] = existing;
  save(d);
}
function getDueVocab(langId, lessonVocab) {
  const status = getVocabStatus(langId);
  const now = Date.now();
  return lessonVocab.filter(v => {
    const s = status[v.word];
    if (!s) return true; // never reviewed
    return s.nextReview <= now;
  });
}

// ── XP and streaks ─────────────────────────────────────────────────────────
function addXP(amount) {
  const d = load();
  if (!d.profile) d.profile = { xp: 0, streak: 0, lastStudyDay: null, achievements: [] };
  d.profile.xp = (d.profile.xp || 0) + amount;
  save(d);
  return d.profile.xp;
}
function updateStreak() {
  const d = load();
  if (!d.profile) d.profile = { xp: 0, streak: 0, lastStudyDay: null, achievements: [] };
  const today = new Date().toDateString();
  const last = d.profile.lastStudyDay;
  if (last === today) return d.profile.streak; // already counted today
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (last === yesterday) {
    d.profile.streak = (d.profile.streak || 0) + 1;
  } else if (last !== today) {
    d.profile.streak = 1; // reset
  }
  d.profile.lastStudyDay = today;
  save(d);
  // Check streak achievements
  checkAchievements('streak', d.profile.streak);
  return d.profile.streak;
}

// ── Achievements ───────────────────────────────────────────────────────────
function checkAchievements(trigger, value) {
  const d = load();
  if (!d.profile) d.profile = { xp: 0, streak: 0, lastStudyDay: null, achievements: [] };
  if (!d.profile.achievements) d.profile.achievements = [];
  const unlocked = [];
  for (const a of ACHIEVEMENTS) {
    if (d.profile.achievements.includes(a.id)) continue;
    let earned = false;
    if (a.id === 'first_lesson' && trigger === 'lesson_complete') earned = true;
    if (a.id === 'perfect_score' && trigger === 'score' && value >= 100) earned = true;
    if (a.id === 'streak_3' && trigger === 'streak' && value >= 3) earned = true;
    if (a.id === 'streak_7' && trigger === 'streak' && value >= 7) earned = true;
    if (a.id === 'bilingual' && trigger === 'enrol' && value >= 2) earned = true;
    if (a.id === 'module_done' && trigger === 'module_complete') earned = true;
    if (a.id === 'vocab_10' && trigger === 'vocab' && value >= 10) earned = true;
    if (a.id === 'tutor_chat' && trigger === 'tutor') earned = true;
    if (earned) {
      d.profile.achievements.push(a.id);
      d.profile.xp = (d.profile.xp || 0) + a.xp;
      unlocked.push(a);
    }
  }
  if (unlocked.length) save(d);
  return unlocked;
}
function getAchievements() {
  const d = load();
  const earned = d.profile?.achievements || [];
  return ACHIEVEMENTS.map(a => ({ ...a, earned: earned.includes(a.id) }));
}

// ── Stats ──────────────────────────────────────────────────────────────────
function getStats(langId) {
  const d = load();
  const enr = d.enrolments?.[langId];
  if (!enr) return null;
  const progress = enr.progress || {};
  const lessons = Object.values(progress);
  return {
    total: lessons.length,
    mastered: lessons.filter(l => l.status === 'mastered').length,
    completed: lessons.filter(l => l.status === 'completed').length,
    avgScore: lessons.length
      ? Math.round(lessons.reduce((s, l) => s + (l.bestScore || 0), 0) / lessons.length)
      : 0,
    xp: d.profile?.xp || 0,
    streak: d.profile?.streak || 0,
  };
}

// ── Grading ────────────────────────────────────────────────────────────────
function gradeExercise(exercise, studentAnswer) {
  const normalize = s => (s || '').toLowerCase().trim()
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ');
  if (exercise.type === 'mcq') {
    const correct = studentAnswer === exercise.answer;
    return { correct, score: correct ? 100 : 0, feedback: correct
      ? 'Correct.' : `Not quite. ${exercise.explanation || ''}` };
  }
  if (exercise.type === 'fill') {
    const ans = normalize(studentAnswer);
    const correct = normalize(exercise.answer);
    const alts = (exercise.alt || []).map(normalize);
    const isCorrect = ans === correct || alts.includes(ans);
    return { correct: isCorrect, score: isCorrect ? 100 : 0,
      feedback: isCorrect ? 'Correct.' : `Expected: "${exercise.answer}". ${exercise.explanation || ''}` };
  }
  if (exercise.type === 'translate') {
    const ans = normalize(studentAnswer);
    const correct = normalize(exercise.answer);
    const alts = (exercise.alt || []).map(normalize);
    const isCorrect = ans === correct || alts.includes(ans);
    return { correct: isCorrect, score: isCorrect ? 100 : 0,
      feedback: isCorrect ? 'Good translation.' : `Model answer: "${exercise.answer}". ${exercise.explanation || ''}` };
  }
  if (exercise.type === 'speak') {
    const score = typeof studentAnswer === 'object' ? (studentAnswer.score || 0) : 0;
    const correct = score >= 70;
    return { correct, score,
      feedback: correct ? `Words recognised: ${score}%` : `Score: ${score}%. Keep practising — try listening to the model first.` };
  }
  if (exercise.type === 'match') {
    if (!Array.isArray(studentAnswer)) return { correct: false, score: 0, feedback: 'No answer.' };
    const total = exercise.pairs.length;
    const correct = studentAnswer.filter((a, i) => a === exercise.pairs[i][1]).length;
    const score = Math.round((correct / total) * 100);
    return { correct: score === 100, score,
      feedback: score === 100 ? 'All pairs matched.' : `${correct}/${total} correct. ${exercise.explanation || ''}` };
  }
  return { correct: false, score: 0, feedback: 'Exercise type not supported.' };
}

function gradeAssessment(assessment, responses) {
  let total = 0, earned = 0;
  const results = assessment.map((q, i) => {
    // Skip-friendly: speaking exercises that weren't attempted get 0 gracefully
    const result = gradeExercise(q, responses[i]);
    total += 100;
    earned += result.score;
    return { ...q, studentAnswer: responses[i], ...result };
  });
  const score = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { score, results, passed: score >= 70 };
}

// ── AI tutor usage guard ───────────────────────────────────────────────────
const TUTOR_LIMIT_PER_DAY = 20;
function canUseTutor() {
  const d = load();
  const today = new Date().toDateString();
  const usage = d.tutorUsage || {};
  return (usage[today] || 0) < TUTOR_LIMIT_PER_DAY;
}
function recordTutorUsage() {
  const d = load();
  const today = new Date().toDateString();
  if (!d.tutorUsage) d.tutorUsage = {};
  d.tutorUsage[today] = (d.tutorUsage[today] || 0) + 1;
  // Clean old days
  Object.keys(d.tutorUsage).forEach(k => { if (k !== today) delete d.tutorUsage[k]; });
  save(d);
}
function getTutorUsageToday() {
  const d = load();
  const today = new Date().toDateString();
  return d.tutorUsage?.[today] || 0;
}



// ── Lesson review records (device-local; there are no accounts, so this is advisory) ──
function getLessonReview(lessonId) { return load().reviews?.[lessonId] || null; }
function setLessonReview(lessonId, reviewer) {
  const d = load(); d.reviews = d.reviews || {};
  const name = String(reviewer || '').trim().slice(0, 60);
  if (name) d.reviews[lessonId] = { reviewer: name, at: Date.now() }; else delete d.reviews[lessonId];
  save(d); return d.reviews[lessonId] || null;
}

export { storageAvailable, getLessonReview, setLessonReview, addXP, canUseTutor, checkAchievements, completeLesson, enrol, getAchievements, getAttempts, getDueVocab, getEnrolments, getLessonProgress, getProfile, getStats, getTutorUsageToday, getVocabStatus, gradeAssessment, gradeExercise, load, recordTutorUsage, reviewVocab, save, saveAttempt, saveProfile, startLesson, updateStreak };
