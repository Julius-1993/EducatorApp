import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Flame, Volume2, VolumeX, Mic, MicOff, Bot, ArrowRight, CheckCircle2, XCircle, Lightbulb, Award, Target, Play, RotateCcw, Info, Zap, Plus, Loader2, Globe, AlertCircle, Sprout, Trophy, ClipboardList, PenLine, Users } from 'lucide-react';
import { Ic } from '../components/Icon.jsx';
import { LANGUAGES, LEVELS, EDU_GROUPS, CURRICULUM } from './curriculum.js';
import { canUseTutor, checkAchievements, completeLesson, enrol, getAchievements, getEnrolments, getProfile, getStats, getTutorUsageToday, gradeAssessment, gradeExercise, recordTutorUsage, reviewVocab, saveAttempt, startLesson, getLessonReview, storageAvailable } from './engine.js';
import { TTS, STT } from './speech.js';
import { askTutor, getSuggestedPrompts } from './aiTutor.js';

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE ACADEMY — Main UI
// Integrates with existing App.jsx via the 'academy' screen
// ─────────────────────────────────────────────────────────────────────────────


const ACH_ICONS = { Sprout, Target, Flame, Trophy, Globe, BookOpen, ClipboardList, Bot };
const PHASE_ICONS = { vocab: BookOpen, grammar: Lightbulb, dialogue: Users, exercises: PenLine, assessment: Target };

export function Academy({ onBack, callOpenAI }) {
  const [view, setView] = useState('hub'); 
  const [selectedLang, setSelectedLang] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [profile, setProfile] = useState(getProfile);
  const [enrolments, setEnrolments] = useState(getEnrolments);
  const [toast, setToast] = useState(null);

  function refreshState() {
    setProfile(getProfile());
    setEnrolments(getEnrolments());
  }

  function showToast(msg, type = 'info', duration = 3000) {
    setToast({ msg, type });
    setTimeout(() => setToast(null), duration);
  }

  function handleEnrol(langId, level, eduGroup) {
    enrol(langId, level, eduGroup);
    const newEnrolments = getEnrolments();
    setEnrolments(newEnrolments);
    const total = Object.keys(newEnrolments).length;
    if (total >= 2) checkAchievements('enrol', total);
    showToast('Enrolled! Start your first lesson.', 'success');
    setView('hub');
  }

  function handleLessonComplete(langId, lessonId, score) {
    const result = completeLesson(langId, lessonId, score);
    checkAchievements('lesson_complete', 1);
    if (score >= 100) checkAchievements('score', 100);
    refreshState();
    showToast(
      score >= 90 ? `Excellent! ${score}%`
      : score >= 70 ? `Passed! ${score}%`
      : `${score}%. Keep practising.`,
      score >= 70 ? 'success' : 'warn', 4000
    );
    setView('hub');
    setSelectedLesson(null);
  }

  const lang = LANGUAGES.find(l => l.id === selectedLang);
  const enr = enrolments[selectedLang];

  return (
    <div className="screen" style={{ background: 'var(--bg)', paddingTop: 'max(env(safe-area-inset-top,0px),80px)', paddingBottom: 'calc(env(safe-area-inset-bottom,0px)+80px)' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)',
          zIndex: 999, background: toast.type === 'success' ? 'var(--emerald)' : toast.type === 'warn' ? '#d97706' : 'var(--primary)',
          color: '#fff', borderRadius: 12, padding: '10px 20px', fontWeight: 700,
          fontSize: 'var(--t-sm)', boxShadow: '0 4px 20px #00000055', maxWidth: '90vw', textAlign: 'center',
          animation: 'fadeUp .3s ease',
        }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 var(--s-4) var(--s-3)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--s-3)' }}>
        <button onClick={view === 'hub' ? onBack : () => { setView('hub'); setSelectedLesson(null); }}
          style={{ background: 'var(--ink3)', border: '1px solid var(--border)', borderRadius: 8, padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Ic icon={ChevronLeft} size={18} color="var(--text3)" />
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-lg)', fontWeight: 900, color: 'var(--text)' }}>
            <Ic icon={Globe} size={18} style={{ marginRight: 6, verticalAlign: '-3px' }} />Language Academy
          </div>
          {/* <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>by EdTek Interactive</div> */}
        </div>
        {/* XP + Streak */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ background: 'var(--primary)22', border: '1px solid var(--primary2)', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Ic icon={Zap} size={13} color="var(--primary3)" />
            <span style={{ fontSize: 'var(--t-xs)', fontWeight: 800, color: 'var(--primary3)' }}>{profile.xp || 0} XP</span>
          </div>
          {(profile.streak || 0) > 0 && (
            <div style={{ background: '#d9770622', border: '1px solid #d97706', borderRadius: 8, padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Ic icon={Flame} size={13} color="#f59e0b" />
              <span style={{ fontSize: 'var(--t-xs)', fontWeight: 800, color: '#f59e0b' }}>{profile.streak}</span>
            </div>
          )}
        </div>
      </div>

      {!storageAvailable() && (
        <div role="alert" style={{ margin: '0 var(--s-4) var(--s-3)', padding: '10px 14px', background: '#7f1d1d33', border: '1px solid var(--red)', borderRadius: 10, color: '#fca5a5', fontSize: 'var(--t-xs)' }}>
          <Ic icon={AlertCircle} size={13} style={{ marginRight: 5 }} color="#fca5a5" />
          This browser is blocking storage (private mode or full), so your progress cannot be saved. Lessons still work, but progress will be lost when you close the page.
        </div>
      )}

      {/* ── HUB VIEW ── */}
      {view === 'hub' && (
        <AcademyHub
          enrolments={enrolments}
          profile={profile}
          onSelectLang={(langId) => { setSelectedLang(langId); setView(enrolments[langId] ? 'lang_home' : 'enrol'); }}
          onEnrolNew={() => setView('choose_lang')}
          onViewProgress={() => setView('progress')}
          onViewAchievements={() => setView('achievements')}
        />
      )}

      {/* ── LANGUAGE CHOOSER ── */}
      {view === 'choose_lang' && (
        <LanguageChooser
          onSelect={(langId) => { setSelectedLang(langId); setView('enrol'); }}
          enrolments={enrolments}
        />
      )}

      {/* ── ENROLMENT ── */}
      {view === 'enrol' && lang && (
        <EnrolScreen lang={lang} onEnrol={handleEnrol} onBack={() => setView('hub')} />
      )}

      {/* ── LANGUAGE HOME ── */}
      {view === 'lang_home' && lang && enr && (
        <LangHome
          lang={lang}
          enrolment={enr}
          onStartLesson={(lesson) => { setSelectedLesson(lesson); setView('lesson'); }}
          onOpenTutor={() => setView('tutor')}
          stats={getStats(lang.id)}
        />
      )}

      {/* ── LESSON VIEW ── */}
      {view === 'lesson' && selectedLesson && lang && enr && (
        <LessonView
          lang={lang}
          lesson={selectedLesson}
          level={enr.level}
          eduGroup={enr.eduGroup}
          onComplete={(score) => handleLessonComplete(lang.id, selectedLesson.id, score)}
          onBack={() => { setView('lang_home'); setSelectedLesson(null); }}
        />
      )}

      {/* ── AI TUTOR ── */}
      {view === 'tutor' && lang && enr && (
        <AITutorView
          lang={lang}
          enrolment={enr}
          callOpenAI={callOpenAI}
          onBack={() => setView('lang_home')}
          onUsageBadge={() => showToast('Daily tutor limit reached (20 messages). Resets tomorrow.', 'warn', 5000)}
        />
      )}

      {/* ── PROGRESS ── */}
      {view === 'progress' && (
        <ProgressView enrolments={enrolments} onSelectLang={(id) => { setSelectedLang(id); setView('lang_home'); }} />
      )}

      {/* ── ACHIEVEMENTS ── */}
      {view === 'achievements' && (
        <AchievementsView profile={profile} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACADEMY HUB
// ─────────────────────────────────────────────────────────────────────────────
function AcademyHub({ enrolments, profile, onSelectLang, onEnrolNew, onViewProgress, onViewAchievements }) {
  const myLangs = LANGUAGES.filter(l => enrolments[l.id]);
  const xpNeeds = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5000];
  const xp = profile.xp || 0;
  const lvl = xpNeeds.findLastIndex(n => xp >= n) + 1;
  const nextXP = xpNeeds[Math.min(lvl, xpNeeds.length - 1)] || 5000;
  const prevXP = xpNeeds[Math.min(lvl - 1, xpNeeds.length - 1)] || 0;
  const pct = nextXP > prevXP ? Math.round(((xp - prevXP) / (nextXP - prevXP)) * 100) : 100;

  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      {/* Welcome / XP card */}
      <div className="card-raised" style={{ background: 'linear-gradient(135deg,var(--primary)22,var(--navy3))', border: '1px solid var(--primary)44' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', fontWeight: 900, color: 'var(--text)' }}>
              {profile.name ? `Welcome back, ${profile.name}!` : 'Language Academy'}
            </div>
            <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 3 }}>Level {lvl} Learner</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 900, fontSize: 'var(--t-xl)', color: 'var(--primary3)' }}>{xp} XP</div>
            <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{nextXP - xp} to next level</div>
          </div>
        </div>
        <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,var(--primary),var(--primary3))', transition: 'width 1s ease' }} />
        </div>
      </div>

      {/* My Languages */}
      {myLangs.length > 0 ? (
        <div>
          <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)', marginBottom: 'var(--s-2)' }}>My Languages</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
            {myLangs.map(lang => {
              const enr = enrolments[lang.id];
              const stats = getStats(lang.id);
              return (
                <button key={lang.id} onClick={() => onSelectLang(lang.id)}
                  style={{ width: '100%', background: 'var(--ink3)', border: `1.5px solid ${lang.color}33`, borderRadius: 14, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', transition: 'all .2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${lang.color}22`, border: `1.5px solid ${lang.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                      <span aria-hidden="true" style={{ fontWeight: 900, color: lang.color }}>{lang.glyph}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <span style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)' }}>{lang.name}</span>
                        <span style={{ fontSize: 'var(--t-xs)', color: lang.color, fontWeight: 700, textTransform: 'capitalize' }}>{enr.level}</span>
                      </div>
                      <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${stats?.total ? Math.round((stats.mastered / Math.max(stats.total, 1)) * 100) : 0}%`, background: lang.color, transition: 'width .8s ease' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{stats?.mastered || 0} lessons mastered</span>
                        <span style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>Avg {stats?.avgScore || 0}%</span>
                      </div>
                    </div>
                    <Ic icon={ChevronRight} size={18} color="var(--text3)" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 'var(--s-6)', background: 'var(--ink3)', borderRadius: 16, border: '2px dashed var(--border)' }}>
          <div style={{ marginBottom: 12 }}><Ic icon={Globe} size={48} color="var(--primary3)" /></div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', color: 'var(--text)', marginBottom: 6 }}>Start Learning</div>
          <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', marginBottom: 'var(--s-4)', lineHeight: 1.6 }}>Choose a language and begin your journey</div>
          <button onClick={onEnrolNew} className="btn btn-primary" style={{ gap: 8, display: 'inline-flex', alignItems: 'center' }}>
            <Ic icon={Plus} size={16} />Choose a Language
          </button>
        </div>
      )}

      {/* Add another language */}
      {myLangs.length > 0 && myLangs.length < LANGUAGES.length && (
        <button onClick={onEnrolNew} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--ink3)', border: '1.5px dashed var(--border)', borderRadius: 12, cursor: 'pointer', color: 'var(--text3)', fontWeight: 700, fontSize: 'var(--t-sm)' }}>
          <Ic icon={Plus} size={16} color="var(--primary2)" />
          <span>Add another language</span>
        </button>
      )}

      {/* Quick nav */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s-2)' }}>
        {[
          { label: 'Progress', icon: Target, onClick: onViewProgress, color: 'var(--emerald)' },
          { label: 'Achievements', icon: Award, onClick: onViewAchievements, color: '#d97706' },
        ].map(({ label, icon, onClick, color }) => (
          <button key={label} onClick={onClick}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: 'var(--ink3)', border: `1.5px solid ${color}33`, borderRadius: 12, cursor: 'pointer', color: 'var(--text)', fontWeight: 700, fontSize: 'var(--t-sm)' }}>
            <Ic icon={icon} size={16} color={color} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE CHOOSER
// ─────────────────────────────────────────────────────────────────────────────
function LanguageChooser({ onSelect, enrolments }) {
  return (
    <div style={{ padding: '0 var(--s-4)' }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', fontWeight: 900, color: 'var(--text)', marginBottom: 5 }}>Choose a Language</div>
      <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', marginBottom: 'var(--s-4)', lineHeight: 1.5 }}>Select the language you want to learn</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
        {LANGUAGES.map(lang => {
          const enrolled = !!enrolments[lang.id];
          return (
            <button key={lang.id} onClick={() => onSelect(lang.id)}
              style={{ width: '100%', background: 'var(--ink3)', border: `1.5px solid ${enrolled ? lang.color + '55' : 'var(--border)'}`, borderRadius: 14, padding: '16px', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${lang.color}22`, border: `2px solid ${lang.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  <span aria-hidden="true" style={{ fontWeight: 900, color: lang.color }}>{lang.glyph}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontWeight: 900, fontSize: 'var(--t-md)', color: 'var(--text)' }}>{lang.name}</span>
                    <span style={{ color: lang.color, fontSize: 'var(--t-sm)', fontWeight: 700 }}>{lang.nativeName}</span>
                    {enrolled && <span style={{ background: lang.color + '22', color: lang.color, fontSize: 'var(--t-xs)', fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>Enrolled</span>}
                  </div>
                  <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', lineHeight: 1.5, marginBottom: 5 }}>{lang.intro}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {lang.characteristics.slice(0, 3).map(c => (
                      <span key={c} style={{ background: 'var(--ink2)', border: '1px solid var(--border)', borderRadius: 6, padding: '2px 7px', fontSize: 10, color: 'var(--text3)' }}>{c}</span>
                    ))}
                  </div>
                </div>
                <Ic icon={ChevronRight} size={18} color="var(--text3)" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENROLMENT SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function EnrolScreen({ lang, onEnrol, onBack }) {
  const [level, setLevel] = useState('beginner');
  const [eduGroup, setEduGroup] = useState('sss');

  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      {/* Language header */}
      <div style={{ textAlign: 'center', padding: 'var(--s-3)' }}>
        <div style={{ fontSize: 52, marginBottom: 8 }}><span aria-hidden="true" style={{ fontWeight: 900, color: lang.color }}>{lang.glyph}</span></div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-2xl)', fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>{lang.name}</div>
        <div style={{ color: lang.color, fontSize: 'var(--t-lg)', fontWeight: 700, marginBottom: 8 }}>{lang.nativeName}</div>
        <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', lineHeight: 1.6 }}>{lang.intro}</div>
        {lang.rtl && (
          <div style={{ marginTop: 8, background: '#d9770618', border: '1px solid #d97706', borderRadius: 8, padding: '6px 12px', fontSize: 'var(--t-xs)', color: '#d97706', fontWeight: 700 }}>
            <Ic icon={AlertCircle} size={13} style={{ marginRight: 5 }} />This language is written right-to-left
          </div>
        )}
      </div>

      {/* Level selection */}
      <div>
        <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)', marginBottom: 'var(--s-2)' }}>Your Level</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {LEVELS.map(l => (
            <button key={l.id} onClick={() => setLevel(l.id)}
              style={{ padding: '12px 14px', background: level === l.id ? 'var(--primary)22' : 'var(--ink3)', border: `1.5px solid ${level === l.id ? 'var(--primary2)' : 'var(--border)'}`, borderRadius: 12, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 'var(--t-sm)' }}>{l.label} <span style={{ color: 'var(--text3)', fontWeight: 600 }}>({l.cefr})</span></div>
                <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 2 }}>{l.desc}</div>
              </div>
              {level === l.id && <Ic icon={CheckCircle2} size={18} color="var(--primary2)" />}
            </button>
          ))}
        </div>
      </div>

      {/* School group */}
      <div>
        <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)', marginBottom: 'var(--s-2)' }}>School Group</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {EDU_GROUPS.map(g => (
            <button key={g.id} onClick={() => setEduGroup(g.id)}
              style={{ padding: '10px 12px', background: eduGroup === g.id ? 'var(--primary)22' : 'var(--ink3)', border: `1.5px solid ${eduGroup === g.id ? 'var(--primary2)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 'var(--t-sm)' }}>{g.label}</div>
              <div style={{ color: 'var(--text3)', fontSize: 10, marginTop: 2 }}>Ages {g.ages}</div>
            </button>
          ))}
        </div>
      </div>

      <button className="btn btn-primary btn-full btn-lg" onClick={() => onEnrol(lang.id, level, eduGroup)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <Ic icon={Play} size={18} />Start Learning {lang.name}!
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE HOME — module/lesson browser
// ─────────────────────────────────────────────────────────────────────────────
function LangHome({ lang, enrolment, onStartLesson, onOpenTutor, stats }) {
  // Show the enrolled level's modules only — no silent substitution
  const curriculum = CURRICULUM[lang.id]?.[enrolment.level] || [];
  const isLevelFallback = false; // no silent fallback — show honest empty state
  const progress = enrolment.progress || {};

  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      {/* Lang header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: `${lang.color}22`, border: `2px solid ${lang.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
          <span aria-hidden="true" style={{ fontWeight: 900, color: lang.color }}>{lang.glyph}</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', fontWeight: 900, color: 'var(--text)' }}>{lang.name}</div>
          <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', textTransform: 'capitalize' }}>{enrolment.level} · {enrolment.eduGroup}</div>
        </div>
        {/* AI Tutor button */}
        <button onClick={onOpenTutor} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, background: 'var(--primary)18', border: '1px solid var(--primary)44', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', color: 'var(--primary3)', fontWeight: 700, fontSize: 'var(--t-xs)' }}>
          <Ic icon={Bot} size={14} color="var(--primary3)" />AI Tutor
        </button>
      </div>

      {/* Stats row */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          {[
            { label: 'Mastered', value: stats.mastered, color: 'var(--emerald)' },
            { label: 'Avg Score', value: `${stats.avgScore}%`, color: 'var(--primary3)' },
            { label: 'Total XP', value: stats.xp, color: '#d97706' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card" style={{ textAlign: 'center', padding: '10px 6px' }}>
              <div style={{ fontWeight: 900, fontSize: 'var(--t-xl)', color }}>{value}</div>
              <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Modules + Lessons */}
      {isLevelFallback && curriculum.length > 0 && (
        <div style={{ background: '#d9770618', border: '1px solid #d97706', borderRadius: 10, padding: '10px 14px', fontSize: 'var(--t-xs)', color: '#d97706', marginBottom: 'var(--s-2)' }}>
          <Ic icon={Info} size={13} style={{ marginRight: 5 }} color="#d97706" />
          {enrolment.level.charAt(0).toUpperCase() + enrolment.level.slice(1)} content is coming soon. Showing beginner lessons to get you started.
        </div>
      )}
      {curriculum.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--s-5)', background: 'var(--ink3)', borderRadius: 16, border: '2px dashed var(--border)' }}>
          <Ic icon={BookOpen} size={40} color="var(--text3)" style={{ margin: '0 auto 12px', display: 'block' }} />
          <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontSize: 'var(--t-md)' }}>
            {enrolment.level.charAt(0).toUpperCase() + enrolment.level.slice(1)} lessons loading…
          </div>
          <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', lineHeight: 1.6, marginBottom: 'var(--s-3)' }}>
            If content does not appear, try switching to a different level in your profile, or use the AI Tutor to practise.
          </div>
          <button onClick={onOpenTutor} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <Ic icon={Bot} size={15} />Open AI Tutor
          </button>
        </div>
      ) : curriculum.map((module) => (
        <div key={module.moduleId}>
          <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)', marginBottom: 'var(--s-2)' }}>
            Module {module.order}: {module.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {module.lessons.map((lesson) => {
              const lp = progress[lesson.id];
              const reviewed = lesson.__reviewed === true || !!getLessonReview(lesson.id);
              const status = lp?.status || 'not_started';
              const score = lp?.bestScore || null;
              const statusColor = status === 'mastered' ? 'var(--emerald)' : status === 'completed' ? '#d97706' : status === 'in_progress' ? 'var(--primary2)' : 'var(--text3)';
              const statusLabel = status === 'mastered' ? 'Mastered' : status === 'completed' ? 'Completed' : status === 'in_progress' ? 'In progress' : 'Start';
              return (
                <button key={lesson.id} onClick={() => onStartLesson(lesson)}
                  style={{ width: '100%', background: 'var(--ink3)', border: `1.5px solid ${statusColor}33`, borderRadius: 12, padding: '14px 16px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${statusColor}22`, border: `1.5px solid ${statusColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, color: statusColor, fontSize: 'var(--t-sm)' }}>
                    {lesson.order}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 'var(--t-sm)', marginBottom: 3 }}>{lesson.title}</div>
                    <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>
                      {!reviewed && <span style={{ color: '#fbbf24', fontWeight: 700 }}>Draft · </span>}{lesson.vocab?.length} vocabulary · {lesson.exercises?.length} exercises
                      {score !== null && ` · Best: ${score}%`}
                    </div>
                  </div>
                  <div style={{ color: statusColor, fontWeight: 700, fontSize: 'var(--t-xs)', flexShrink: 0 }}>{statusLabel}</div>
                  <Ic icon={ChevronRight} size={16} color="var(--text3)" />
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON VIEW — vocabulary, grammar, dialogue, exercises, assessment
// ─────────────────────────────────────────────────────────────────────────────
function LessonView({ lang, lesson, level, eduGroup, onComplete, onBack }) {
  const [phase, setPhase] = useState('vocab');  // vocab|grammar|dialogue|exercises|assessment
  const [exIdx, setExIdx] = useState(0);
  const [responses, setResponses] = useState({});
  const [assResp, setAssResp] = useState({});
  const [revealed, setRevealed] = useState({});
  const [speaking, setSpeaking] = useState(null);
  const [assResult, setAssResult] = useState(null);

  useEffect(() => { startLesson(lang.id, lesson.id); }, []);

  const phases = ['vocab','grammar','dialogue','exercises','assessment'];
  const phaseLabels = { vocab: 'Vocabulary', grammar: 'Grammar', dialogue: 'Dialogue', exercises: 'Exercises', assessment: 'Assessment' };
  const phaseIdx = phases.indexOf(phase);

  function speakText(text, langVoice) {
    setSpeaking(text);
    TTS.speak(text, langVoice || lang.voiceLang, 0.9, () => setSpeaking(null));
  }

  function handleExAnswer(idx, answer) {
    const ex = lesson.exercises[idx];
    const result = gradeExercise(ex, answer);
    setResponses(r => ({ ...r, [idx]: { answer, ...result } }));
    setRevealed(r => ({ ...r, [idx]: true }));
    if (ex.type === 'mcq' || ex.type === 'fill') {
      lesson.vocab?.forEach(v => {
        if ((ex.q || '').includes(v.word)) reviewVocab(lang.id, v.word, result.correct);
      });
    }
  }

  function handleAssAnswer(idx, answer) {
    setAssResp(r => ({ ...r, [idx]: answer }));
  }

  function submitAssessment() {
    const result = gradeAssessment(lesson.assessment, lesson.assessment.map((_, i) => assResp[i]));
    setAssResult(result);
    saveAttempt(lang.id, lesson.id, assResp, result.score);
  }

  function proceedToNext() {
    if (phaseIdx < phases.length - 1) {
      setPhase(phases[phaseIdx + 1]);
      setExIdx(0);
    }
  }

  const PHASE_COLORS = { vocab: 'var(--primary)', grammar: 'var(--emerald)', dialogue: '#d97706', exercises: 'var(--sky)', assessment: '#dc2626' };

  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      {/* Lesson header */}
      <div className="card-raised" style={{ borderLeft: `4px solid ${PHASE_COLORS[phase]}` }}>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-lg)', fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>{lesson.title}</div>
        <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginBottom: 8 }}>{lang.name} · {level} · Lesson {lesson.order}</div>
        {!(lesson.__reviewed === true || getLessonReview(lesson.id)) && (
          <div role="note" style={{ background: '#d9770618', border: '1px solid #d97706', borderRadius: 8, padding: '6px 10px', marginBottom: 8, color: '#fbbf24', fontSize: 'var(--t-xs)' }}>
            <Ic icon={AlertCircle} size={13} style={{ marginRight: 5 }} color="#fbbf24" />Draft lesson: not yet checked by a language teacher. Tell your teacher if you spot a mistake.
          </div>
        )}
        {/* Objectives */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {lesson.objectives.map((o, i) => (
            <span key={i} style={{ background: 'var(--primary)18', border: '1px solid var(--primary)33', borderRadius: 6, padding: '2px 8px', fontSize: 'var(--t-xs)', color: 'var(--primary3)' }}>{o}</span>
          ))}
        </div>
      </div>

      {/* Phase nav */}
      <div style={{ display: 'flex', background: 'var(--ink3)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {phases.map((p, i) => (
          <button key={p} onClick={() => setPhase(p)} aria-label={phaseLabels[p]} title={phaseLabels[p]} aria-current={phase === p ? 'step' : undefined}
            style={{ flex: 1, padding: '8px 4px', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700,
              background: phase === p ? PHASE_COLORS[p] + '33' : 'transparent',
              borderBottom: phase === p ? `2px solid ${PHASE_COLORS[p]}` : '2px solid transparent',
              color: phase === p ? PHASE_COLORS[p] : 'var(--text3)', transition: 'all .2s',
            }}><Ic icon={PHASE_ICONS[p]} size={16} /></button>
        ))}
      </div>

      {/* ── VOCABULARY PHASE ── */}
      {phase === 'vocab' && (
        <VocabPhase lang={lang} vocab={lesson.vocab} onSpeak={speakText} speaking={speaking} onDone={proceedToNext} />
      )}

      {/* ── GRAMMAR PHASE ── */}
      {phase === 'grammar' && lesson.grammar && (
        <GrammarPhase grammar={lesson.grammar} onDone={proceedToNext} />
      )}

      {/* ── DIALOGUE PHASE ── */}
      {phase === 'dialogue' && lesson.dialogue && (
        <DialoguePhase lang={lang} dialogue={lesson.dialogue} onSpeak={speakText} speaking={speaking} onDone={proceedToNext} />
      )}

      {/* ── EXERCISES PHASE ── */}
      {phase === 'exercises' && lesson.exercises?.length > 0 && (
        <ExercisesPhase
          exercises={lesson.exercises}
          exIdx={exIdx}
          setExIdx={setExIdx}
          responses={responses}
          revealed={revealed}
          onAnswer={handleExAnswer}
          onDone={proceedToNext}
          lang={lang}
          onSpeak={speakText}
          speaking={speaking}
        />
      )}

      {/* ── ASSESSMENT PHASE ── */}
      {phase === 'assessment' && lesson.assessment?.length > 0 && (
        <AssessmentPhase
          assessment={lesson.assessment}
          assResp={assResp}
          assResult={assResult}
          onAnswer={handleAssAnswer}
          onSubmit={submitAssessment}
          onComplete={() => onComplete(assResult?.score || 0)}
          onRetry={() => { setAssResp({}); setAssResult(null); }}
          lang={lang}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VOCAB PHASE
// ─────────────────────────────────────────────────────────────────────────────
function VocabPhase({ lang, vocab, onSpeak, speaking, onDone }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const v = vocab[idx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 'var(--t-xs)', fontWeight: 700 }}>
        VOCABULARY — Card {idx + 1} of {vocab.length}
      </div>
      {/* Flashcard */}
      <div className="card-raised" style={{ minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', padding: 'var(--s-5)', borderLeft: '4px solid var(--primary)' }}
        onClick={() => setFlipped(f => !f)}>
        {!flipped ? (
          <>
            <div dir={lang.rtl ? 'rtl' : 'ltr'} style={{ fontFamily: lang.id === 'zh' ? '"Noto Sans CJK SC",sans-serif' : lang.id === 'ar' ? '"Noto Naskh Arabic",sans-serif' : 'inherit', fontSize: lang.id === 'zh' ? 36 : lang.id === 'ar' ? 28 : 'var(--t-2xl)', fontWeight: 900, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>
              {v.word}
            </div>
            {v.pinyin && <div style={{ color: 'var(--primary3)', fontSize: 'var(--t-md)', fontWeight: 700 }}>{v.pinyin}</div>}
            <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>Tap to reveal meaning</div>
          </>
        ) : (
          <>
            <div style={{ color: 'var(--text)', fontWeight: 800, fontSize: 'var(--t-lg)', textAlign: 'center' }}>{v.translation}</div>
            <div dir={lang.rtl ? 'rtl' : 'ltr'} style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', textAlign: 'center', fontStyle: 'italic', lineHeight: 1.5 }}>
              {lang.id === 'zh' ? v.example : v.example}
            </div>
            {(v.exampleEn || v.example) && lang.id !== 'en' && (
              <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', textAlign: 'center' }}>
                {v.exampleEn || ''}
              </div>
            )}
          </>
        )}
      </div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button onClick={() => onSpeak(v.word || v.audio || v.word, lang.voiceLang)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--primary)22', border: '1px solid var(--primary)44', borderRadius: 10, cursor: 'pointer', color: 'var(--primary3)', fontWeight: 700, fontSize: 'var(--t-xs)' }}>
          <Ic icon={speaking === (v.word || v.audio) ? VolumeX : Volume2} size={14} color="var(--primary3)" />
          {speaking === (v.word || v.audio) ? 'Stop' : 'Listen'}
        </button>
        <button onClick={() => { setFlipped(false); if (idx < vocab.length - 1) setIdx(i => i + 1); }}
          disabled={idx >= vocab.length - 1}
          style={{ flex: 1, maxWidth: 120, padding: '8px 14px', background: idx < vocab.length - 1 ? 'var(--primary)' : 'var(--ink3)', border: `1px solid ${idx < vocab.length - 1 ? 'var(--primary2)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', color: idx < vocab.length - 1 ? '#fff' : 'var(--text3)', fontWeight: 700, fontSize: 'var(--t-xs)' }}>
          Next →
        </button>
      </div>
      {/* All vocab list */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 'var(--t-xs)', color: 'var(--text3)', marginBottom: 4 }}>ALL WORDS IN THIS LESSON</div>
        {vocab.map((item, i) => (
          <div key={i} onClick={() => { setIdx(i); setFlipped(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: i === idx ? 'var(--primary)18' : 'var(--ink3)', borderRadius: 8, cursor: 'pointer', border: `1px solid ${i === idx ? 'var(--primary)44' : 'var(--border)'}` }}>
            <button onClick={(e) => { e.stopPropagation(); onSpeak(item.audio || item.word, lang.voiceLang); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <Ic icon={Volume2} size={13} color="var(--primary3)" />
            </button>
            <div dir={lang.rtl ? 'rtl' : 'ltr'} style={{ fontWeight: 700, fontSize: 'var(--t-sm)', color: 'var(--text)', minWidth: 80 }}>{item.word}</div>
            {item.pinyin && <div style={{ color: 'var(--primary3)', fontSize: 'var(--t-xs)' }}>{item.pinyin}</div>}
            <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', flex: 1 }}>{item.translation}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-full" onClick={onDone}>
        Continue to Grammar →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRAMMAR PHASE
// ─────────────────────────────────────────────────────────────────────────────
function GrammarPhase({ grammar, onDone }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      <div className="card-raised" style={{ borderLeft: '4px solid var(--emerald)' }}>
        <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)', marginBottom: 10 }}>{grammar.title}</div>
        <div style={{ color: 'var(--text2)', fontSize: 'var(--t-sm)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{grammar.explanation}</div>
      </div>
      {grammar.examples?.length > 0 && (
        <div className="card">
          <div style={{ fontWeight: 700, color: 'var(--text3)', fontSize: 'var(--t-xs)', marginBottom: 10 }}>EXAMPLES</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {grammar.examples.map((ex, i) => (
              <div key={i} style={{ padding: '10px 12px', background: 'var(--primary)12', border: '1px solid var(--primary)33', borderRadius: 8 }}>
                <div style={{ fontWeight: 700, color: 'var(--primary3)', fontSize: 'var(--t-sm)', marginBottom: 3 }}>{ex.es}</div>
                <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{ex.en}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="btn btn-primary btn-full" onClick={onDone}>Continue to Dialogue →</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIALOGUE PHASE
// ─────────────────────────────────────────────────────────────────────────────
function DialoguePhase({ lang, dialogue, onSpeak, speaking, onDone }) {
  const [showTrans, setShowTrans] = useState({});
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      <div style={{ fontWeight: 800, fontSize: 'var(--t-md)', color: 'var(--text)' }}>{dialogue.title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {dialogue.lines.map((line, i) => (
          <div key={i} style={{ background: 'var(--ink3)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <span style={{ fontWeight: 800, color: 'var(--primary3)', fontSize: 'var(--t-xs)' }}>{line.speaker}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => onSpeak(line.text, lang.voiceLang)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                  <Ic icon={Volume2} size={13} color="var(--primary3)" />
                </button>
                <button onClick={() => setShowTrans(s => ({ ...s, [i]: !s[i] }))}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--text3)', fontSize: 'var(--t-xs)', fontWeight: 700 }}>
                  {showTrans[i] ? 'Hide' : 'EN'}
                </button>
              </div>
            </div>
            <div dir={lang.rtl ? 'rtl' : 'ltr'} style={{ fontWeight: 600, color: 'var(--text)', fontSize: 'var(--t-sm)', lineHeight: 1.5 }}>
              {line.text}
              {line.pinyin && <span style={{ color: 'var(--primary3)', fontWeight: 400, fontSize: 'var(--t-xs)', marginLeft: 8 }}>({line.pinyin})</span>}
            </div>
            {showTrans[i] && (
              <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 5, paddingTop: 5, borderTop: '1px solid var(--border)', fontStyle: 'italic' }}>
                {line.translation}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn btn-primary btn-full" onClick={onDone}>Continue to Exercises →</button>
    </div>
  );
}

// ── SPEAK EXERCISE COMPONENT ────────────────────────────────────────────────
function SpeakExercise({ ex, lang, onSpeak, speaking, onResult, revealed, result }) {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sttErr, setSttErr] = useState('');
  const [permDenied, setPermDenied] = useState(false);

  function startRecording() {
    setSttErr(''); setTranscript('');
    if (!STT.supported) {
      setSttErr('Speech recognition is not supported in this browser. Try Chrome on Android or desktop.');
      return;
    }
    setRecording(true);
    STT.start({
      lang: lang.voiceLang || 'en-US',
      onResult: (results) => {
        setRecording(false);
        const best = results[0]?.transcript || '';
        setTranscript(best);
        const evalResult = STT.evaluate(ex.target || ex.q, best, lang.id);
        onResult(best, evalResult.score, { missing: evalResult.missing });
      },
      onError: (msg) => {
        setRecording(false);
        if (msg.includes('denied') || msg.includes('not-allowed')) setPermDenied(true);
        setSttErr(msg);
      },
      onEnd: () => setRecording(false),
    });
  }

  function stopRecording() {
    STT.stop();
    setRecording(false);
  }

  const scoreColor = result?.score >= 80 ? 'var(--emerald)' : result?.score >= 50 ? '#d97706' : 'var(--red)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      {/* Prompt */}
      <div className="card-raised" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', fontWeight: 700, marginBottom: 5 }}>
          SPEAKING PRACTICE
        </div>
        <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-md)', lineHeight: 1.5 }}>
          {ex.q}
        </div>
        {ex.target && (
          <div dir={lang.rtl ? 'rtl' : 'ltr'} style={{ marginTop: 8, padding: '8px 12px', background: 'var(--primary)18', border: '1px solid var(--primary)33', borderRadius: 8, fontWeight: 800, fontSize: 'var(--t-lg)', color: 'var(--primary3)', lineHeight: 1.5 }}>
            {ex.target}
            {ex.pinyin && <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', fontWeight: 400 }}>{ex.pinyin}</div>}
          </div>
        )}
      </div>

      {/* Listen to model */}
      {ex.target && (
        <button onClick={() => onSpeak(ex.target, lang.voiceLang)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'var(--primary)18', border: '1px solid var(--primary)44', borderRadius: 10, cursor: 'pointer', color: 'var(--primary3)', fontWeight: 700, fontSize: 'var(--t-sm)' }}>
          <Ic icon={Volume2} size={16} color="var(--primary3)" />
          Listen to model pronunciation
        </button>
      )}

      {ex.tip && (
        <div style={{ padding: '10px 12px', background: 'var(--sky)11', border: '1px solid var(--sky)33', borderRadius: 8, color: 'var(--sky)', fontSize: 'var(--t-xs)', lineHeight: 1.6 }}>
          <Ic icon={Lightbulb} size={13} style={{ marginRight: 5 }} color="var(--sky)" />Tip: {ex.tip}
        </div>
      )}

      {/* STT not supported notice */}
      {!STT.supported && (
        <div style={{ padding: '10px 12px', background: '#d9770618', border: '1px solid #d97706', borderRadius: 8, color: '#d97706', fontSize: 'var(--t-xs)' }}>
          <Ic icon={Info} size={13} style={{ marginRight: 5 }} color="#d97706" />
          Speech recognition is not available in this browser. Use Chrome on Android or desktop for speaking practice. You can skip this exercise and still complete the lesson.
        </div>
      )}

      {/* Permission denied */}
      {permDenied && (
        <div style={{ padding: '10px 12px', background: 'var(--red)18', border: '1px solid var(--red)', borderRadius: 8, color: 'var(--red)', fontSize: 'var(--t-xs)' }}>
          Microphone permission was denied. Please allow microphone access in your browser settings and reload the page.
        </div>
      )}

      {/* Record button */}
      {!revealed && STT.supported && !permDenied && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={recording ? stopRecording : startRecording}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px', borderRadius: 12, cursor: 'pointer', fontWeight: 800, fontSize: 'var(--t-md)',
              background: recording ? 'var(--red)' : 'var(--primary)',
              border: `2px solid ${recording ? '#ef4444' : 'var(--primary2)'}`,
              color: '#fff', transition: 'all .2s',
              animation: recording ? 'pulse 1s infinite' : 'none' }}>
            <Ic icon={recording ? MicOff : Mic} size={20} color="#fff" />
            {recording ? 'Stop Recording' : 'Start Speaking'}
          </button>
        </div>
      )}

      {recording && (
        <div style={{ textAlign: 'center', color: 'var(--red)', fontSize: 'var(--t-xs)', fontWeight: 700, animation: 'pulse 1s infinite' }}>
          <span aria-hidden="true" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: 'var(--red)', marginRight: 6 }} />Recording. Speak clearly.
        </div>
      )}

      {/* Transcript */}
      {transcript && (
        <div style={{ padding: '10px 14px', background: 'var(--ink3)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginBottom: 4 }}>You said:</div>
          <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 'var(--t-sm)' }}>"{transcript}"</div>
        </div>
      )}

      {sttErr && !permDenied && (
        <div style={{ padding: '8px 12px', background: 'var(--red)18', border: '1px solid var(--red)33', borderRadius: 8, color: 'var(--red)', fontSize: 'var(--t-xs)' }}>{sttErr}</div>
      )}

      {/* Result */}
      {revealed && result && (
        <div style={{ padding: '12px 16px', background: result.score >= 70 ? 'var(--forest2)' : '#7f1d1d22', border: `1.5px solid ${scoreColor}`, borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: scoreColor, fontWeight: 800, fontSize: 'var(--t-lg)' }}>{result.score}%</span>
            <span style={{ color: scoreColor, fontSize: 'var(--t-sm)' }}>{result.score >= 80 ? 'Clearly recognised' : result.score >= 50 ? 'Partly recognised' : 'Not recognised'}</span>
          </div>
          <div style={{ color: 'var(--sky)', fontSize: 'var(--t-xs)', lineHeight: 1.6 }}>
            <Ic icon={Info} size={12} style={{ marginRight: 4 }} color="var(--sky)" />
            Note: This uses speech recognition for approximate feedback, not professional pronunciation scoring.
          </div>
          {result.answer?.missing?.length > 0 && <div style={{ color: 'var(--text2)', fontSize: 'var(--t-xs)', marginTop: 5 }}>Words not recognised: {result.answer.missing.join(', ')}</div>}
          {ex.target && <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 5 }}>Model: <span style={{ color: 'var(--text2)' }}>{ex.target}</span></div>}
        </div>
      )}

      {/* Skip option */}
      {!revealed && (
        <button onClick={() => onResult('(skipped)', 0, { skipped: true })}
          style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 'var(--t-xs)', cursor: 'pointer', textDecoration: 'underline', padding: 4 }}>
          Skip this speaking exercise
        </button>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// EXERCISES PHASE
// ─────────────────────────────────────────────────────────────────────────────
function ExercisesPhase({ exercises, exIdx, setExIdx, responses, revealed, onAnswer, onDone, lang, onSpeak, speaking }) {
  const ex = exercises[exIdx];
  const resp = responses[exIdx];
  const done = exIdx >= exercises.length;
  const [fillVal, setFillVal] = useState('');

  const allDone = exercises.every((_, i) => responses[i] !== undefined);
  const counted = exercises.map((_, i) => responses[i]).filter(r => r && !r.answer?.skipped);   // skipped speaking is not counted
  const score = allDone ? (counted.length ? Math.round(counted.reduce((n, r) => n + (r.score || 0), 0) / counted.length) : 0) : null;

  if (done) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 56 }}><Ic icon={score >= 60 ? Award : BookOpen} size={56} color="var(--primary3)" /></div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-2xl)', color: 'var(--text)', fontWeight: 900 }}>{score}%</div>
        <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)' }}>Practice complete — {exercises.length} exercises done</div>
        <button className="btn btn-primary btn-full" onClick={onDone}>Continue to Assessment →</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      {/* Progress */}
      <div style={{ display: 'flex', gap: 4 }}>
        {exercises.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: responses[i] !== undefined ? (responses[i].correct ? 'var(--emerald)' : 'var(--red)') : i === exIdx ? 'var(--primary)' : 'var(--border)' }} />
        ))}
      </div>

      {/* Exercise */}
      <div style={{ fontWeight: 700, color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>EXERCISE {exIdx + 1} / {exercises.length}</div>

      {/* MCQ */}
      {ex.type === 'mcq' && (
        <div>
          <div className="card-raised" style={{ marginBottom: 'var(--s-3)', borderLeft: '4px solid var(--sky)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-md)', lineHeight: 1.5 }}>{ex.q}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {ex.options.map((opt, oi) => {
              const isCorrect = oi === ex.answer;
              const isSelected = resp?.answer === oi;
              const isRevealed = !!revealed[exIdx];
              let bg = 'var(--ink3)', border = '1.5px solid var(--border)', color = 'var(--text)';
              if (isRevealed && isCorrect) { bg = 'var(--forest2)'; border = '1.5px solid var(--emerald)'; color = '#86efac'; }
              if (isRevealed && isSelected && !isCorrect) { bg = '#7f1d1d'; border = '1.5px solid var(--red)'; color = '#fca5a5'; }
              return (
                <button key={oi} disabled={isRevealed}
                  onClick={() => onAnswer(exIdx, oi)}
                  style={{ padding: '12px 14px', background: bg, border, borderRadius: 10, cursor: isRevealed ? 'default' : 'pointer', textAlign: 'left', color, fontWeight: 600, fontSize: 'var(--t-sm)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 6, background: isRevealed && isCorrect ? 'var(--emerald)' : isRevealed && isSelected ? 'var(--red)' : 'var(--ink2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, flexShrink: 0, color: isRevealed ? '#fff' : 'var(--text3)' }}>
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                  {isRevealed && isCorrect && <Ic icon={CheckCircle2} size={16} color="var(--emerald)" style={{ marginLeft: 'auto' }} />}
                  {isRevealed && isSelected && !isCorrect && <Ic icon={XCircle} size={16} color="var(--red)" style={{ marginLeft: 'auto' }} />}
                </button>
              );
            })}
          </div>
          {revealed[exIdx] && (
            <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--sky)11', border: '1px solid var(--sky)33', borderRadius: 8, color: 'var(--sky)', fontSize: 'var(--t-xs)', lineHeight: 1.6 }}>
              <Ic icon={Lightbulb} size={13} style={{ marginRight: 5 }} color="var(--sky)" />
              {resp?.feedback || ex.explanation}
            </div>
          )}
        </div>
      )}

      {/* Fill in blank */}
      {ex.type === 'fill' && (
        <div>
          <div className="card-raised" style={{ marginBottom: 'var(--s-3)', borderLeft: '4px solid var(--sky)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-md)', lineHeight: 1.5, marginBottom: 6 }}>{ex.q}</div>
            {ex.hint && <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>Hint: {ex.hint}</div>}
          </div>
          {!revealed[exIdx] ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" style={{ flex: 1 }} placeholder="Type your answer…" value={fillVal}
                onChange={e => setFillVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && fillVal.trim()) { onAnswer(exIdx, fillVal.trim()); setFillVal(''); } }} />
              <button className="btn btn-primary" onClick={() => { if (fillVal.trim()) { onAnswer(exIdx, fillVal.trim()); setFillVal(''); } }}>
                Check
              </button>
            </div>
          ) : (
            <div style={{ padding: '12px 14px', background: resp?.correct ? 'var(--forest2)' : '#7f1d1d', border: `1.5px solid ${resp?.correct ? 'var(--emerald)' : 'var(--red)'}`, borderRadius: 10, color: resp?.correct ? '#86efac' : '#fca5a5', fontWeight: 700, fontSize: 'var(--t-sm)' }}>
              {resp?.correct ? `Correct: "${ex.answer}"` : `Not quite. Correct answer: "${ex.answer}"`}
              <div style={{ color: 'var(--sky)', fontSize: 'var(--t-xs)', marginTop: 5, fontWeight: 400 }}>{ex.explanation}</div>
            </div>
          )}
        </div>
      )}

      {/* Match pairs */}
      {ex.type === 'match' && !revealed[exIdx] && (
        <MatchExercise ex={ex} onAnswer={(ans) => onAnswer(exIdx, ans)} />
      )}
      {ex.type === 'match' && revealed[exIdx] && (
        <div style={{ padding: 12, background: resp?.correct ? 'var(--forest2)' : '#431407', border: `1px solid ${resp?.correct ? 'var(--emerald)' : 'var(--red)'}`, borderRadius: 10 }}>
          <div style={{ color: resp?.correct ? '#86efac' : '#fca5a5', fontWeight: 700, fontSize: 'var(--t-sm)', marginBottom: 5 }}>
            {resp?.feedback}
          </div>
          <div style={{ color: 'var(--sky)', fontSize: 'var(--t-xs)' }}>{ex.explanation}</div>
        </div>
      )}

      {/* Speaking practice */}
      {ex.type === 'speak' && (
        <SpeakExercise
          ex={ex}
          lang={lang}
          onSpeak={onSpeak}
          speaking={speaking}
          onResult={(transcript, score, extra) => {
            onAnswer(exIdx, { transcript, score, ...extra });
          }}
          revealed={!!revealed[exIdx]}
          result={resp}
        />
      )}

      {/* Translate */}
      {ex.type === 'translate' && (
        <div>
          <div className="card-raised" style={{ marginBottom: 'var(--s-3)', borderLeft: '4px solid var(--sky)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-md)' }}>{ex.q}</div>
          </div>
          {!revealed[exIdx] ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" style={{ flex: 1 }} placeholder="Your translation…" value={fillVal}
                onChange={e => setFillVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && fillVal.trim()) { onAnswer(exIdx, fillVal.trim()); setFillVal(''); } }} />
              <button className="btn btn-primary" onClick={() => { if (fillVal.trim()) { onAnswer(exIdx, fillVal.trim()); setFillVal(''); } }}>Check</button>
            </div>
          ) : (
            <div style={{ padding: '12px 14px', background: resp?.correct ? 'var(--forest2)' : '#7f1d1d', border: `1.5px solid ${resp?.correct ? 'var(--emerald)' : 'var(--red)'}`, borderRadius: 10 }}>
              <div style={{ color: resp?.correct ? '#86efac' : '#fca5a5', fontWeight: 700 }}>{resp?.feedback}</div>
              {!resp?.correct && <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 4 }}>Model: {ex.answer}</div>}
            </div>
          )}
        </div>
      )}

      {/* Next/Done button */}
      {revealed[exIdx] && exIdx < exercises.length - 1 && (
        <button className="btn btn-primary btn-full" onClick={() => setExIdx(i => i + 1)}>
          Next Exercise →
        </button>
      )}
      {revealed[exIdx] && exIdx === exercises.length - 1 && (
        <button className="btn btn-primary btn-full" onClick={() => setExIdx(exercises.length)}>
          See practice summary
        </button>
      )}
    </div>
  );
}

// Simple matching exercise component
function MatchExercise({ ex, onAnswer }) {
  const lefts  = ex.pairs.map(p => p[0]);
  const rights = [...ex.pairs.map(p => p[1])].sort(() => Math.random() - 0.5);
  const [sel, setSel] = useState({});

  function handleLeft(l) { setSel(s => ({ ...s, _left: l })); }
  function handleRight(r) {
    if (!sel._left) return;
    setSel(s => {
      const next = { ...s, [s._left]: r };
      delete next._left;
      if (Object.keys(next).length === lefts.length) {
        onAnswer(lefts.map(l => next[l]));
      }
      return next;
    });
  }

  return (
    <div>
      <div style={{ fontWeight: 700, color: 'var(--text3)', fontSize: 'var(--t-xs)', marginBottom: 8 }}>Match each item on the left with its pair on the right:</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {lefts.map(l => (
            <button key={l} onClick={() => handleLeft(l)}
              style={{ padding: '10px 12px', background: sel._left === l ? 'var(--primary)33' : sel[l] ? 'var(--emerald)22' : 'var(--ink3)', border: `1.5px solid ${sel._left === l ? 'var(--primary2)' : sel[l] ? 'var(--emerald)' : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-sm)' }}>
              {l}
              {sel[l] && <div style={{ color: 'var(--emerald)', fontSize: 'var(--t-xs)', fontWeight: 400 }}>→ {sel[l]}</div>}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {rights.map(r => (
            <button key={r} onClick={() => handleRight(r)}
              style={{ padding: '10px 12px', background: Object.values(sel).includes(r) ? 'var(--emerald)22' : 'var(--ink3)', border: `1.5px solid ${Object.values(sel).includes(r) ? 'var(--emerald)' : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-sm)' }}>
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ASSESSMENT PHASE
// ─────────────────────────────────────────────────────────────────────────────
function AssessmentPhase({ assessment, assResp, assResult, onAnswer, onSubmit, onComplete, onRetry }) {
  const [fillVals, setFillVals] = useState({});

  if (assResult) {
    const { score, results, passed } = assResult;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
        <div style={{ textAlign: 'center', padding: 'var(--s-4)' }}>
          <div style={{ fontSize: 52, marginBottom: 8 }}><Ic icon={score >= 70 ? Award : BookOpen} size={52} color="var(--primary3)" /></div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-2xl)', fontWeight: 900, color: score >= 70 ? 'var(--emerald)' : 'var(--amber)', marginBottom: 4 }}>{score}%</div>
          <div style={{ color: 'var(--text3)', fontSize: 'var(--t-sm)', marginBottom: 'var(--s-4)' }}>
            {score >= 90 ? 'Outstanding! Lesson mastered.' : score >= 70 ? 'Well done! Lesson passed.' : 'Keep practising — aim for 70%.'}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {!passed && <button className="btn btn-ghost" onClick={onRetry}><Ic icon={RotateCcw} size={14} style={{ marginRight: 5 }} />Retry</button>}
            <button className="btn btn-primary" onClick={onComplete}>
              {passed ? 'Complete lesson' : 'Continue anyway'}
            </button>
          </div>
        </div>
        {/* Review wrong answers */}
        {results.filter(r => !r.correct).length > 0 && (
          <div>
            <div style={{ fontWeight: 700, color: 'var(--red)', fontSize: 'var(--t-sm)', marginBottom: 8 }}>Review Your Mistakes</div>
            {results.filter(r => !r.correct).map((r, i) => (
              <div key={i} style={{ padding: '10px 12px', background: '#7f1d1d22', border: '1px solid var(--red)33', borderRadius: 10, marginBottom: 6 }}>
                <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-sm)', marginBottom: 4 }}>{r.q}</div>
                <div style={{ color: '#fca5a5', fontSize: 'var(--t-xs)', marginBottom: 3 }}>Your answer: {r.type === 'mcq' ? r.options?.[r.studentAnswer] || '—' : r.studentAnswer || '—'}</div>
                <div style={{ color: '#86efac', fontSize: 'var(--t-xs)', marginBottom: 3 }}>Correct: {r.type === 'mcq' ? r.options?.[r.answer] || '—' : r.answer}</div>
                <div style={{ color: 'var(--sky)', fontSize: 'var(--t-xs)' }}>{r.explanation}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const allAnswered = assessment.every((_, i) => assResp[i] !== undefined || fillVals[i]?.trim());
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      <div style={{ background: 'var(--red)18', border: '1px solid var(--red)44', borderRadius: 10, padding: '10px 14px', color: 'var(--red)', fontWeight: 700, fontSize: 'var(--t-xs)' }}>
        <Ic icon={Target} size={13} style={{ marginRight: 6 }} />Final assessment: {assessment.length} questions. Score 70% or more to pass.
      </div>
      {assessment.map((q, qi) => (
        <div key={qi} className="card">
          <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-sm)', marginBottom: 10 }}>{qi + 1}. {q.q}</div>
          {q.type === 'mcq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {q.options.map((opt, oi) => (
                <button key={oi} onClick={() => onAnswer(qi, oi)}
                  style={{ padding: '10px 12px', background: assResp[qi] === oi ? 'var(--primary)33' : 'var(--ink3)', border: `1.5px solid ${assResp[qi] === oi ? 'var(--primary2)' : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', color: 'var(--text)', fontWeight: 600, fontSize: 'var(--t-sm)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: 4, background: assResp[qi] === oi ? 'var(--primary)' : 'var(--ink2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: assResp[qi] === oi ? '#fff' : 'var(--text3)', flexShrink: 0 }}>
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                  {assResp[qi] === oi && <Ic icon={CheckCircle2} size={14} color="var(--primary2)" style={{ marginLeft: 'auto' }} />}
                </button>
              ))}
            </div>
          )}
          {q.type === 'fill' && (
            <input className="input" placeholder="Your answer…"
              value={fillVals[qi] || ''}
              onChange={e => {
                const v = e.target.value;
                setFillVals(f => ({ ...f, [qi]: v }));
                onAnswer(qi, v.trim());
              }} />
          )}
        </div>
      ))}
      <button className="btn btn-primary btn-full btn-lg" onClick={onSubmit} disabled={!allAnswered}
        style={{ opacity: allAnswered ? 1 : .4 }}>
        Submit Assessment →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI TUTOR VIEW
// ─────────────────────────────────────────────────────────────────────────────
function AITutorView({ lang, enrolment, callOpenAI, onBack, onUsageBadge }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Welcome! I am your ${lang.name} tutor. I can help you with vocabulary, grammar, pronunciation, and practice. What would you like to work on today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const bottomRef = useRef(null);
  const usedToday = getTutorUsageToday();
  const limit = 20;
  const suggestions = getSuggestedPrompts(lang.id, 'this lesson');

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  async function sendMessage(text) {
    const msg = (text || input).trim();
    if (!msg) return;
    if (!canUseTutor()) { onUsageBadge(); return; }
    setInput('');
    setErr('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);
    recordTutorUsage();
    checkAchievements('tutor', 1);
    try {
      const reply = await askTutor({
        callOpenAI,
        langId: lang.id,
        langName: lang.name,
        lessonTitle: 'General Practice',
        level: enrolment.level,
        eduGroup: enrolment.eduGroup,
        messages: messages.slice(-6),
        userMessage: msg,
      });
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (e) {
      setErr(e.message || 'Tutor unavailable. Please try again.');
      setMessages(m => m.slice(0, -1));
    }
    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 160px)', padding: '0 var(--s-4)' }}>
      {/* Usage indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s-2)', padding: '6px 12px', background: 'var(--ink3)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ic icon={Bot} size={14} color="var(--primary3)" />
          <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 'var(--t-xs)' }}>{lang.name} AI Tutor</span>
        </div>
        <span style={{ color: usedToday >= limit ? 'var(--red)' : 'var(--text3)', fontSize: 'var(--t-xs)' }}>{usedToday}/{limit} today</span>
      </div>

      {/* Message thread */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 'var(--s-3)' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%', padding: '10px 14px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.role === 'user' ? 'var(--primary)' : 'var(--ink3)',
              border: `1px solid ${m.role === 'user' ? 'var(--primary2)' : 'var(--border)'}`,
              color: m.role === 'user' ? '#fff' : 'var(--text)', fontSize: 'var(--t-sm)', lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--ink3)', borderRadius: '14px 14px 14px 4px', border: '1px solid var(--border)', alignSelf: 'flex-start', width: 'fit-content' }}>
            <Ic icon={Loader2} size={14} color="var(--primary3)" style={{ animation: 'spin .7s linear infinite' }} />
            <span style={{ color: 'var(--primary3)', fontSize: 'var(--t-xs)', fontWeight: 700 }}>Thinking…</span>
          </div>
        )}
        {err && (
          <div style={{ padding: '8px 12px', background: 'var(--red)18', border: '1px solid var(--red)33', borderRadius: 10, color: 'var(--red)', fontSize: 'var(--t-xs)' }}>{err}</div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          {suggestions.slice(0, 4).map((s, i) => (
            <button key={i} onClick={() => sendMessage(s)}
              style={{ padding: '5px 10px', background: 'var(--primary)18', border: '1px solid var(--primary)33', borderRadius: 20, fontSize: 'var(--t-xs)', color: 'var(--primary3)', fontWeight: 600, cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input className="input" style={{ flex: 1 }} placeholder={`Ask about ${lang.name}…`} value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
          disabled={loading || usedToday >= limit} />
        <button className="btn btn-primary" onClick={() => sendMessage()} aria-label="Send message" disabled={!input.trim() || loading || usedToday >= limit}
          style={{ flexShrink: 0 }}>
          <Ic icon={ArrowRight} size={16} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function ProgressView({ enrolments, onSelectLang }) {
  const myLangs = LANGUAGES.filter(l => enrolments[l.id]);
  if (!myLangs.length) return (
    <div style={{ padding: 'var(--s-6)', textAlign: 'center', color: 'var(--text3)' }}>
      No languages enrolled yet. Go back and choose a language!
    </div>
  );
  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', fontWeight: 900, color: 'var(--text)' }}>My Progress</div>
      {myLangs.map(lang => {
        const stats = getStats(lang.id);
        if (!stats) return null;
        return (
          <button key={lang.id} onClick={() => onSelectLang(lang.id)}
            className="card-raised" style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}><span aria-hidden="true" style={{ fontWeight: 900, color: lang.color }}>{lang.glyph}</span></span>
              <div>
                <div style={{ fontWeight: 800, color: 'var(--text)' }}>{lang.name}</div>
                <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{enrolments[lang.id]?.level}</div>
              </div>
              <Ic icon={ChevronRight} size={16} color="var(--text3)" style={{ marginLeft: 'auto' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginBottom: 10 }}>
              {[
                { l: 'Total', v: stats.total, c: 'var(--primary3)' },
                { l: 'Mastered', v: stats.mastered, c: 'var(--emerald)' },
                { l: 'Avg', v: `${stats.avgScore}%`, c: '#d97706' },
                { l: 'XP', v: stats.xp, c: 'var(--primary3)' },
              ].map(({ l, v, c }) => (
                <div key={l} style={{ textAlign: 'center', background: 'var(--ink3)', borderRadius: 8, padding: '6px 4px' }}>
                  <div style={{ fontWeight: 900, color: c, fontSize: 'var(--t-lg)' }}>{v}</div>
                  <div style={{ color: 'var(--text3)', fontSize: 9 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${stats.total ? Math.round((stats.mastered / stats.total) * 100) : 0}%`, background: lang.color, transition: 'width .8s ease' }} />
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS VIEW
// ─────────────────────────────────────────────────────────────────────────────
function AchievementsView({ profile }) {
  const all = getAchievements();
  const earned = all.filter(a => a.earned);
  return (
    <div style={{ padding: '0 var(--s-4)', display: 'flex', flexDirection: 'column', gap: 'var(--s-4)' }}>
      <div>
        <div style={{ fontFamily: 'var(--display)', fontSize: 'var(--t-xl)', fontWeight: 900, color: 'var(--text)' }}>Achievements</div>
        <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', marginTop: 3 }}>{earned.length} of {all.length} unlocked</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {all.map(a => (
          <div key={a.id} style={{ padding: 'var(--s-3)', background: a.earned ? 'var(--primary)18' : 'var(--ink3)', border: `1.5px solid ${a.earned ? 'var(--primary)55' : 'var(--border)'}`, borderRadius: 14, opacity: a.earned ? 1 : 0.5 }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}><Ic icon={ACH_ICONS[a.icon] || Award} size={28} color="var(--primary3)" /></div>
            <div style={{ fontWeight: 800, color: 'var(--text)', fontSize: 'var(--t-sm)', marginBottom: 3 }}>{a.label}</div>
            <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', lineHeight: 1.4, marginBottom: 6 }}>{a.desc}</div>
            <div style={{ color: a.earned ? 'var(--primary3)' : 'var(--text3)', fontSize: 'var(--t-xs)', fontWeight: 700 }}>
              {a.earned ? `+${a.xp} XP earned` : `+${a.xp} XP`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


