// ─────────────────────────────────────────────────────────────────────────────
// AI TUTOR — Language-specific tutoring via OpenAI GPT-4o-mini
// Reuses callOpenAI from App.jsx (passed as prop)
// Rate-limited: max 20 calls/day per user
// Student messages treated as UNTRUSTED DATA (prompt injection protection)
// The tutor system prompt is built on the server (server.js buildSystemPrompt); clients send only context.
function validateTutorResponse(text) {
  if (!text || text.trim().length < 2) throw new Error('Empty response from AI tutor.');
  return text.length > 3000 ? text.slice(0, 3000) + '\n\n[Response truncated]' : text;
}

async function askTutor({ callOpenAI, langId, langName, lessonTitle, level, eduGroup, messages, userMessage, signal }) {
  if (!callOpenAI) throw new Error('AI tutor not configured.');
  const history = (messages || []).slice(-6).filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: String(m.content).slice(0, 600) }));
  const res = await callOpenAI({
    operation: 'tutor',
    context: { lang: langId, level, eduGroup, lessonTitle },
    messages: [...history, { role: 'user', content: String(userMessage).slice(0, 600) }],
  }, signal);
  const data = await res.json();
  if (!res.ok || data.error) throw new Error((data.error && data.error.message) || 'AI tutor unavailable.');
  return validateTutorResponse(data.choices?.[0]?.message?.content || '');
}

// Suggested prompts — language-specific starting points
function getSuggestedPrompts(langId, lessonTitle) {
  const base = [
    'Explain this vocabulary word with an example',
    'Give me a simple dialogue to practise',
    'What is the grammar rule for this lesson?',
    'Give me five practice questions',
    'Translate this phrase for me',
    'Why is my answer incorrect?',
    'Explain this in simpler English',
  ];
  const langSpecific = {
    zh: ['Explain the tones of this word', 'Show me the stroke order concept', 'What is the measure word for this?'],
    ar: ['Help me read this Arabic word', 'Explain right-to-left writing', 'What is the root of this word?'],
    fr: ['Explain the gender rule', 'When do I use tu vs vous?', 'What is the liaison rule?'],
    es: ['Explain verb conjugation', 'What is the difference between ser and estar?', 'Explain grammatical gender'],
  };
  return [...base, ...(langSpecific[langId] || [])];
}



export { askTutor, getSuggestedPrompts, validateTutorResponse };
