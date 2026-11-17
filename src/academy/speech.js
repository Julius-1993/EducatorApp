// ── TEXT TO SPEECH (Vercel / production-safe)
const TTS = {
  get supported() {
    return (
      typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      typeof SpeechSynthesisUtterance !== "undefined"
    );
  },

  speak(text, lang = "en-US", rate = 0.9, onEnd = null) {
    if (!this.supported || !text) {
      console.warn("Speech synthesis is unavailable.");
      return false;
    }

    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(String(text));

    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Select a matching voice if the device has one installed.
    const voices = synth.getVoices();
    const languageCode = lang.toLowerCase().split("-")[0];

    const matchingVoice =
      voices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
      voices.find(v =>
        v.lang.toLowerCase().startsWith(languageCode)
      );

    if (matchingVoice) {
      utterance.voice = matchingVoice;
      console.log("Using voice:", matchingVoice.name, matchingVoice.lang);
    } else {
      console.warn(
        "No installed voice found for:",
        lang,
        "Available voices:",
        voices.map(v => v.lang)
      );
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      if (onEnd) onEnd();
    };

    // Speak immediately. Do not wait for voiceschanged.
    synth.resume();
    synth.speak(utterance);

    return true;
  },

  stop() {
    if (this.supported) {
      window.speechSynthesis.cancel();
    }
  },

  getVoices(lang) {
    if (!this.supported) return [];

    const voices = window.speechSynthesis.getVoices();

    if (!lang) return voices;

    return voices.filter(v =>
      v.lang.toLowerCase().startsWith(lang.toLowerCase().split("-")[0])
    );
  }
};



//  SPEECH RECOGNITION 
const SpeechRecognition = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null;

const STT = {
  supported: !!SpeechRecognition,
  _instance: null,

  start({ lang = 'en-US', onResult, onError, onEnd }) {
    if (!this.supported) {
      onError?.('Speech recognition is not supported in this browser. Try Chrome on Android or desktop.');
      return false;
    }
    this.stop();
    const r = new SpeechRecognition();
    r.lang = lang;
    r.continuous = false;
    r.interimResults = false;
    r.maxAlternatives = 3;

    r.onresult = (e) => {
      const results = Array.from(e.results[0]).map(alt => ({
        transcript: alt.transcript,
        confidence: alt.confidence,
      }));
      onResult?.(results);
    };
    r.onerror = (e) => {
      const msg = e.error === 'no-speech' ? 'No speech detected. Please try again.'
        : e.error === 'audio-capture' ? 'Microphone not available.'
        : e.error === 'not-allowed' ? 'Microphone permission denied.'
        : e.error === 'network' ? 'Network error. Speech recognition needs internet.'
        : `Recognition error: ${e.error}`;
      onError?.(msg);
    };
    r.onend = () => { this._instance = null; onEnd?.(); };

    this._instance = r;
    try {
      r.start();
      return true;
    } catch (err) {
      onError?.('Could not start recording: ' + err.message);
      return false;
    }
  },

  stop() {
    if (this._instance) {
      try { this._instance.stop(); } catch {}
      this._instance = null;
    }
  },

  // Approximate comparison of what the browser heard against the target text.
  // This is NOT pronunciation scoring: it only shows whether the right words were recognised.
  evaluate(expected, recognized, lang = 'en') { return evaluateSpeech(expected, recognized, lang); },
};



// ── Speech comparison (pure functions, unit-tested) ─────────────────────────
// Accents/diacritics (Spanish, French, Arabic harakat), punctuation and case are ignored.
// Arabic letter variants are unified. Chinese is compared per character (it has no spaces).
export function normalizeForSpeech(text, lang = 'en') {
  let t = String(text || '').normalize('NFD').replace(/\p{M}+/gu, '').toLowerCase();
  if (lang === 'ar') t = t.replace(/[\u0622\u0623\u0625]/g, '\u0627').replace(/\u0649/g, '\u064A').replace(/\u0629/g, '\u0647').replace(/\u0640/g, '');
  if (lang === 'zh') return Array.from(t.replace(/[^\p{Script=Han}]/gu, ''));
  return t.replace(/[\p{P}\p{S}]/gu, ' ').split(/\s+/).filter(Boolean);
}
function lcsLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length];
}
export function evaluateSpeech(expected, recognized, lang = 'en') {
  const exp = normalizeForSpeech(expected, lang);
  const rec = normalizeForSpeech(recognized, lang);
  if (!exp.length) return { score: 0, missing: [], feedback: 'Nothing to compare.', approximate: true };
  if (!rec.length) return { score: 0, missing: exp, feedback: 'No speech was recognised. Try again in a quiet place.', approximate: true };
  const score = Math.round((lcsLength(exp, rec) / exp.length) * 100);
  const missing = exp.filter(w => !rec.includes(w));
  const feedback = score >= 90 ? 'The words were recognised clearly.'
    : score >= 70 ? 'Most words were recognised. Listen to the model and try once more.'
    : score >= 40 ? 'Some words were not recognised. Listen to the model, then repeat slowly.'
    : 'Few words were recognised. Try again slowly and clearly.';
  return { score, missing, feedback, recognized, approximate: true };
}

export { TTS, STT };
