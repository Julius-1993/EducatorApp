import { useState } from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { Ic } from '../components/Icon.jsx';
import { LANGUAGES, CURRICULUM } from './curriculum.js';
import { getLessonReview, setLessonReview } from './engine.js';

// Teachers record that they have checked a language lesson. Records are stored on this device only
// (the app has no accounts), so this is a visible, advisory label, not an access control.
export function LanguageReviewTab() {
  const [reviewer, setReviewer] = useState('');
  const [, force] = useState(0);
  const refresh = () => force(n => n + 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
      <div className="callout callout-warn" role="note" style={{ padding: 12 }}>
        All language lessons are AI-drafted and have not been checked by a human specialist. Review a lesson, then mark it here so students no longer see the draft notice.
        Reviews are saved on this device only.
      </div>
      <div>
        <label className="label" htmlFor="reviewer-name">Your name (recorded with each review)</label>
        <input id="reviewer-name" className="input" value={reviewer} onChange={e => setReviewer(e.target.value)} placeholder="e.g. Mrs Adeyemi" maxLength={60} />
      </div>
      {LANGUAGES.map(lang => (
        <div key={lang.id} className="card">
          <div style={{ fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>{lang.name}</div>
          {['beginner', 'intermediate', 'advanced', 'expert'].map(level => (
            <div key={level} style={{ marginBottom: 8 }}>
              <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)', textTransform: 'capitalize', marginBottom: 4 }}>{level}</div>
              {CURRICULUM[lang.id][level].flatMap(m => m.lessons).map(lesson => {
                const rec = getLessonReview(lesson.id);
                return (
                  <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderTop: '1px solid var(--border)' }}>
                    <Ic icon={rec ? ShieldCheck : ShieldAlert} size={16} color={rec ? 'var(--emerald)' : '#fbbf24'} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: 'var(--text)', fontSize: 'var(--t-sm)' }}>{lesson.title}</div>
                      <div style={{ color: 'var(--text3)', fontSize: 'var(--t-xs)' }}>{rec ? `Reviewed by ${rec.reviewer} on ${new Date(rec.at).toLocaleDateString()}` : 'Draft: not reviewed'}</div>
                    </div>
                    {rec
                      ? <button className="btn btn-ghost btn-sm" onClick={() => { setLessonReview(lesson.id, ''); refresh(); }}>Remove review</button>
                      : <button className="btn btn-primary btn-sm" disabled={!reviewer.trim()} onClick={() => { setLessonReview(lesson.id, reviewer); refresh(); }}>Mark reviewed</button>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
