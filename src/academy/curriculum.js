import { INTERMEDIATE_MODULES } from './curriculum_intermediate.js';
import { ADVANCED_MODULES, EXPERT_MODULES } from './curriculum_advanced.js';

const LANGUAGES = [
  {
    id: 'es', name: 'Spanish', nativeName: 'Español', glyph: 'Ñ',
    script: 'Latin', rtl: false,
    intro: 'The world\'s second most spoken native language. Used across Latin America and Spain.',
    color: '#dc2626', bg: '#fef2f2',
    levels: ['Beginner','Intermediate','Advanced','Expert'],
    voiceLang: 'es-ES',
    characteristics: ['Latin script','Phonetic spelling','Gendered nouns','Verb conjugations'],
  },
  {
    id: 'zh', name: 'Mandarin', nativeName: '普通话', glyph: '汉',
    script: 'Chinese characters + Pinyin', rtl: false,
    intro: 'The most spoken language in the world. Official language of China and Taiwan.',
    color: '#d97706', bg: '#fffbeb',
    levels: ['Beginner','Intermediate','Advanced','Expert'],
    voiceLang: 'zh-CN',
    characteristics: ['Chinese characters (汉字)','Tone-marked Pinyin','4 tones + neutral','Measure words'],
  },
  {
    id: 'fr', name: 'French', nativeName: 'Français', glyph: 'Fr',
    script: 'Latin', rtl: false,
    intro: 'Spoken on 5 continents. An official language of the United Nations and African Union.',
    color: '#2563eb', bg: '#eff6ff',
    levels: ['Beginner','Intermediate','Advanced','Expert'],
    voiceLang: 'fr-FR',
    characteristics: ['Latin script','Nasal vowels','Silent letters','Liaison in speech','Gendered nouns'],
  },
  {
    id: 'ar', name: 'Arabic', nativeName: 'العربية', glyph: 'ع',
    script: 'Arabic (right-to-left)', rtl: true,
    intro: 'Spoken by 400 million people. Language of the Quran and Islamic scholarship.',
    color: '#16a34a', bg: '#f0fdf4',
    levels: ['Beginner','Intermediate','Advanced','Expert'],
    voiceLang: 'ar-SA',
    characteristics: ['Arabic script (right-to-left)','Modern Standard Arabic','Root-based morphology','28 letters'],
  },
];

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     cefr: 'A1–A2', desc: 'Start from zero. Greetings, basics, simple conversations.' },
  { id: 'intermediate', label: 'Intermediate',  cefr: 'B1–B2', desc: 'Expand vocabulary. Real conversations on everyday topics.' },
  { id: 'advanced',     label: 'Advanced',      cefr: 'C1',    desc: 'Complex grammar, professional communication, long texts.' },
  { id: 'expert',       label: 'Expert',        cefr: 'C2',    desc: 'Near-mastery. Academic writing, debate, nuanced language.' },
];

const EDU_GROUPS = [
  { id: 'primary',    label: 'Primary School',   ages: '6–11' },
  { id: 'jss',        label: 'Junior Secondary',  ages: '11–14',  icon: 'BookOpen' },
  { id: 'sss',        label: 'Senior Secondary',  ages: '14–18' },
  { id: 'tertiary',   label: 'Tertiary',          ages: '18+' },
  { id: 'adult',      label: 'Adult / Independent',ages: 'Any' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEED CURRICULUM — 3 modules × 3 lessons per language at Beginner level
// Draft content. Teachers can record their review in the Teacher Portal.
// ─────────────────────────────────────────────────────────────────────────────

const CURRICULUM = {

  // ══════════════════════════════════════════════════════════════════════════
  // SPANISH
  // ══════════════════════════════════════════════════════════════════════════
  es: {
    beginner: [
      {
        moduleId: 'es-b-m1', title: 'Greetings & Introductions', order: 1,
        lessons: [
          {
            id: 'es-b-m1-l1', title: 'Hello and Goodbye', order: 1,
            objectives: ['Say hello and goodbye','Ask how someone is','Reply to greetings'],
            vocab: [
              { word: 'Hola', pinyin: null, translation: 'Hello', example: 'Hola, ¿cómo estás?', audio: 'Hola' },
              { word: 'Adiós', pinyin: null, translation: 'Goodbye', example: 'Adiós, hasta luego.', audio: 'Adiós' },
              { word: 'Buenos días', pinyin: null, translation: 'Good morning', example: 'Buenos días, señora.', audio: 'Buenos días' },
              { word: 'Buenas tardes', pinyin: null, translation: 'Good afternoon', example: 'Buenas tardes, señor.', audio: 'Buenas tardes' },
              { word: 'Buenas noches', pinyin: null, translation: 'Good night / Good evening', example: 'Buenas noches a todos.', audio: 'Buenas noches' },
              { word: '¿Cómo estás?', pinyin: null, translation: 'How are you? (informal)', example: '¡Hola! ¿Cómo estás?', audio: '¿Cómo estás?' },
              { word: 'Bien, gracias', pinyin: null, translation: 'Fine, thank you', example: 'Estoy bien, gracias.', audio: 'Bien, gracias' },
              { word: 'Hasta luego', pinyin: null, translation: 'See you later', example: 'Hasta luego, amigo.', audio: 'Hasta luego' },
            ],
            grammar: {
              title: 'Formal vs Informal Greetings',
              explanation: 'In Spanish, how you greet someone depends on whether you know them well.\n\n• Use "tú" (informal) with friends, family, and children — e.g. "¿Cómo estás?"\n• Use "usted" (formal) with teachers, elders, and strangers — e.g. "¿Cómo está usted?"\n\nIn Nigerian schools, you would use the formal "usted" when speaking to a teacher.',
              examples: [
                { es: '¿Cómo estás?', en: 'How are you? (to a friend)' },
                { es: '¿Cómo está usted?', en: 'How are you? (to a teacher or elder)' },
              ],
            },
            dialogue: {
              title: 'First Day at School',
              lines: [
                { speaker: 'Amara', text: 'Buenos días. Me llamo Amara.', translation: 'Good morning. My name is Amara.' },
                { speaker: 'Carlos', text: 'Hola, Amara. Me llamo Carlos. ¿Cómo estás?', translation: 'Hello, Amara. My name is Carlos. How are you?' },
                { speaker: 'Amara', text: 'Estoy bien, gracias. ¿Y tú?', translation: 'I am fine, thank you. And you?' },
                { speaker: 'Carlos', text: 'Muy bien, gracias. Hasta luego.', translation: 'Very well, thank you. See you later.' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'How do you say "Good morning" in Spanish?', options: ['Buenas noches','Buenos días','Buenas tardes','Hola'], answer: 1, explanation: '"Buenos días" literally means "good days" and is used until midday. "Buenas noches" is evening/night, "buenas tardes" is afternoon.' },
              { type: 'mcq', q: 'Which greeting is appropriate for a teacher?', options: ['¿Cómo estás?','¿Qué tal?','¿Cómo está usted?','Hola, tío'], answer: 2, explanation: '"¿Cómo está usted?" uses the formal "usted" form, appropriate for teachers and elders.' },
              { type: 'fill', q: 'Complete: "_____ días, señora García."', answer: 'Buenos', hint: 'Morning greeting', explanation: '"Buenos días" = Good morning. "Señora" = Mrs/Ma\'am.' },
              { type: 'match', pairs: [['Hola','Hello'],['Adiós','Goodbye'],['Gracias','Thank you'],['Bien','Fine/Well']], explanation: 'These are the four most common beginner Spanish words.' },
              { type: 'translate', q: 'Translate to Spanish: "See you later, friend."', answer: 'Hasta luego, amigo.', alt: ['Hasta luego amigo','Hasta luego, amiga.'], explanation: '"Hasta luego" = see you later. "Amigo" = male friend, "amiga" = female friend.' },
              { type: 'speak', q: 'Say this greeting aloud.', target: 'Buenos días, ¿cómo estás?', tip: 'Spanish vowels are short and pure: a, e, i, o, u never glide into another sound. Stress the last syllable of "estás".', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
            ],
            assessment: [
              { type: 'mcq', q: '"Buenas noches" means:', options: ['Good morning','Good afternoon','Good night','Goodbye'], answer: 2, explanation: '"Buenas noches" is used in the evening and at night.' },
              { type: 'mcq', q: 'How do you reply to "¿Cómo estás?"', options: ['Adiós','Me llamo Carlos','Bien, gracias','Buenos días'], answer: 2, explanation: 'The natural reply to "How are you?" is "Bien, gracias" — Fine, thank you.' },
              { type: 'fill', q: 'To say goodbye formally, say "_____ luego."', answer: 'Hasta', explanation: '"Hasta luego" means "until later" — a common farewell.' },
              { type: 'mcq', q: 'Which is the informal "you" in Spanish?', options: ['usted','ustedes','tú','él'], answer: 2, explanation: '"Tú" is informal (friends). "Usted" is formal (teachers, elders).' },
            ],
          },
          {
            id: 'es-b-m1-l2', title: 'Introducing Yourself', order: 2,
            objectives: ['Say your name','Ask someone\'s name','State your age','Say where you are from'],
            vocab: [
              { word: 'Me llamo...', pinyin: null, translation: 'My name is...', example: 'Me llamo Amara.', audio: 'Me llamo Amara' },
              { word: '¿Cómo te llamas?', pinyin: null, translation: 'What is your name?', example: '¿Cómo te llamas?', audio: '¿Cómo te llamas?' },
              { word: 'Tengo... años', pinyin: null, translation: 'I am ... years old', example: 'Tengo doce años.', audio: 'Tengo doce años' },
              { word: 'Soy de...', pinyin: null, translation: 'I am from...', example: 'Soy de Nigeria.', audio: 'Soy de Nigeria' },
              { word: 'Soy nigeriano/a', pinyin: null, translation: 'I am Nigerian', example: 'Soy nigeriano.', audio: 'Soy nigeriano' },
              { word: 'Mucho gusto', pinyin: null, translation: 'Nice to meet you', example: 'Mucho gusto, señor.', audio: 'Mucho gusto' },
              { word: 'Igualmente', pinyin: null, translation: 'Likewise / Same to you', example: 'Igualmente, señorita.', audio: 'Igualmente' },
            ],
            grammar: {
              title: 'The verb "ser" — to be',
              explanation: '"Ser" is one of two Spanish verbs meaning "to be". It is used for permanent characteristics like nationality, name, and identity.\n\nKey forms:\n• Yo soy — I am\n• Tú eres — You are (informal)\n• Él/Ella es — He/She is\n• Usted es — You are (formal)\n\nRemember: gender matters in Spanish. A boy says "soy nigeriano" but a girl says "soy nigeriana".',
              examples: [
                { es: 'Yo soy de Lagos.', en: 'I am from Lagos.' },
                { es: 'Ella es estudiante.', en: 'She is a student.' },
                { es: 'Tú eres mi amigo.', en: 'You are my friend.' },
              ],
            },
            dialogue: {
              title: 'Meeting a New Student',
              lines: [
                { speaker: 'Teacher', text: '¿Cómo te llamas?', translation: 'What is your name?' },
                { speaker: 'Emeka', text: 'Me llamo Emeka. Soy de Abuja.', translation: 'My name is Emeka. I am from Abuja.' },
                { speaker: 'Teacher', text: '¿Cuántos años tienes?', translation: 'How old are you?' },
                { speaker: 'Emeka', text: 'Tengo catorce años.', translation: 'I am fourteen years old.' },
                { speaker: 'Teacher', text: 'Mucho gusto, Emeka.', translation: 'Nice to meet you, Emeka.' },
                { speaker: 'Emeka', text: 'Igualmente, señora.', translation: 'Likewise, ma\'am.' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'How do you say "My name is Kemi" in Spanish?', options: ['Soy Kemi','Me llamo Kemi','Tengo Kemi','Llamo Kemi'], answer: 1, explanation: '"Me llamo" literally means "I call myself". It is the most natural way to introduce yourself in Spanish.' },
              { type: 'fill', q: '"_____ de Nigeria." means "I am from Nigeria."', answer: 'Soy', explanation: '"Soy" is the first-person form of "ser". "Soy de Nigeria" = I am from Nigeria.' },
              { type: 'mcq', q: 'A Nigerian girl introduces herself. She says:', options: ['Soy nigeriano','Soy nigeriana','Es nigeriana','Eres nigeriana'], answer: 1, explanation: 'In Spanish, adjectives agree with gender. A girl is "nigeriana" (feminine), a boy is "nigeriano" (masculine).' },
            ],
            assessment: [
              { type: 'mcq', q: '"¿Cómo te llamas?" means:', options: ['How old are you?','Where are you from?','What is your name?','How are you?'], answer: 2, explanation: '"¿Cómo te llamas?" literally "How do you call yourself?" — asking for the name.' },
              { type: 'fill', q: '"Tengo quince _____." I am fifteen years old.', answer: 'años', explanation: '"Años" means years. "Tengo quince años" = I have fifteen years (= I am fifteen).' },
              { type: 'mcq', q: 'The polite response to "Mucho gusto" is:', options: ['Buenos días','Adiós','Igualmente','Me llamo'], answer: 2, explanation: '"Igualmente" means "likewise" — the standard reply to "nice to meet you".' },
            ],
          },
          {
            id: 'es-b-m1-l3', title: 'Numbers 1–20', order: 3,
            objectives: ['Count from 1 to 20','Use numbers in sentences','Say your age and phone digits'],
            vocab: [
              { word: 'uno, dos, tres', pinyin: null, translation: 'one, two, three', example: 'Uno, dos, tres — ¡vamos!', audio: 'uno dos tres' },
              { word: 'cuatro, cinco, seis', pinyin: null, translation: 'four, five, six', example: 'Tengo seis libros.', audio: 'cuatro cinco seis' },
              { word: 'siete, ocho, nueve', pinyin: null, translation: 'seven, eight, nine', example: 'Son las ocho.', audio: 'siete ocho nueve' },
              { word: 'diez', pinyin: null, translation: 'ten', example: 'Tengo diez dedos.', audio: 'diez' },
              { word: 'once, doce, trece', pinyin: null, translation: 'eleven, twelve, thirteen', example: 'Tengo doce años.', audio: 'once doce trece' },
              { word: 'catorce, quince', pinyin: null, translation: 'fourteen, fifteen', example: 'Son las quince.', audio: 'catorce quince' },
              { word: 'dieciséis, diecisiete', pinyin: null, translation: 'sixteen, seventeen', example: 'Dieciséis estudiantes.', audio: 'dieciséis diecisiete' },
              { word: 'dieciocho, diecinueve, veinte', pinyin: null, translation: 'eighteen, nineteen, twenty', example: 'Veinte estudiantes en clase.', audio: 'dieciocho diecinueve veinte' },
            ],
            grammar: {
              title: 'Using numbers with nouns',
              explanation: 'In Spanish, numbers from 1–20 do not change for gender, except "uno" which becomes "una" before feminine nouns and "un" before masculine nouns.\n\n• un libro (one book — masculine)\n• una mesa (one table — feminine)\n• dos libros (two books)\n\nNotice that numbers 16–19 are written as one word: dieciséis, diecisiete, dieciocho, diecinueve.',
              examples: [
                { es: 'Tengo un hermano y una hermana.', en: 'I have one brother and one sister.' },
                { es: 'Hay veinte estudiantes en clase.', en: 'There are twenty students in class.' },
              ],
            },
            dialogue: {
              title: 'Counting at the Market',
              lines: [
                { speaker: 'Vendor', text: '¿Cuántas naranjas quieres?', translation: 'How many oranges do you want?' },
                { speaker: 'Customer', text: 'Quiero diez naranjas, por favor.', translation: 'I want ten oranges, please.' },
                { speaker: 'Vendor', text: 'Son cinco nairas.', translation: 'That is five naira.' },
                { speaker: 'Customer', text: 'Aquí tienes. ¡Gracias!', translation: 'Here you go. Thank you!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'What is "twelve" in Spanish?', options: ['Once','Doce','Trece','Catorce'], answer: 1, explanation: 'once=11, doce=12, trece=13, catorce=14.' },
              { type: 'fill', q: '"Tengo _____ años." (I am fifteen years old.)', answer: 'quince', explanation: 'quince = fifteen. Numbers in Spanish are fully spelled out.' },
              { type: 'mcq', q: 'How do you say "one table" (feminine) in Spanish?', options: ['Un mesa','Una mesa','Uno mesa','Unos mesa'], answer: 1, explanation: '"Mesa" (table) is feminine. Use "una" before feminine nouns. "Un" is used before masculine nouns.' },
            ],
            assessment: [
              { type: 'mcq', q: 'What comes after "diecinueve" (19)?', options: ['Veinte','Dieciocho','Veintiuno','Once'], answer: 0, explanation: 'diecinueve (19) → veinte (20). The sequence: ...diecisiete, dieciocho, diecinueve, veinte.' },
              { type: 'mcq', q: '"Hay siete días en una semana." means:', options: ['There are seven months in a year','There are seven days in a week','I have seven books','Seven students are here'], answer: 1, explanation: '"Hay" = there are/is. "Siete días" = seven days. "Semana" = week.' },
            ],
          },
        ],
      },
    ],
    intermediate: [], advanced: [], expert: [],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MANDARIN CHINESE
  // ══════════════════════════════════════════════════════════════════════════
  zh: {
    beginner: [
      {
        moduleId: 'zh-b-m1', title: 'Greetings & Introductions', order: 1,
        lessons: [
          {
            id: 'zh-b-m1-l1', title: 'Basic Greetings', order: 1,
            objectives: ['Say hello and goodbye in Mandarin','Understand the 4 tones','Use basic polite expressions'],
            vocab: [
              { word: '你好', pinyin: 'Nǐ hǎo', translation: 'Hello', example: '你好！欢迎。', exampleEn: 'Hello! Welcome.', audio: '你好' },
              { word: '您好', pinyin: 'Nín hǎo', translation: 'Hello (formal/respectful)', example: '您好，老师。', exampleEn: 'Hello, teacher (respectful).', audio: '您好' },
              { word: '再见', pinyin: 'Zài jiàn', translation: 'Goodbye', example: '再见，明天见。', exampleEn: 'Goodbye, see you tomorrow.', audio: '再见' },
              { word: '谢谢', pinyin: 'Xiè xie', translation: 'Thank you', example: '谢谢你的帮助。', exampleEn: 'Thank you for your help.', audio: '谢谢' },
              { word: '不客气', pinyin: 'Bù kèqì', translation: 'You\'re welcome', example: '不客气，这是我的责任。', exampleEn: 'You\'re welcome, it\'s my duty.', audio: '不客气' },
              { word: '对不起', pinyin: 'Duì bu qǐ', translation: 'Sorry / Excuse me', example: '对不起，我来晚了。', exampleEn: 'Sorry, I am late.', audio: '对不起' },
              { word: '没关系', pinyin: 'Méi guān xi', translation: 'No problem / It\'s OK', example: '没关系，请坐。', exampleEn: 'No problem, please sit.', audio: '没关系' },
            ],
            grammar: {
              title: 'The Four Tones of Mandarin',
              explanation: 'Mandarin Chinese is a tonal language. The same syllable with a different tone has a completely different meaning. There are 4 tones plus a neutral tone:\n\n• 1st tone (ā): High and level — like saying "aah" at the doctor\n• 2nd tone (á): Rising — like asking "What?" in surprise\n• 3rd tone (ǎ): Dipping (falls then rises) — the hardest tone\n• 4th tone (à): Sharp falling — like giving a firm command\n• Neutral tone: Short and light\n\nExample: mā (mother) / má (hemp) / mǎ (horse) / mà (to scold)\n\nNote: Getting tones wrong changes the meaning completely. Practice carefully!',
              examples: [
                { es: 'nǐ (你) — you [3rd tone]', en: 'The tone mark ǐ dips down then rises' },
                { es: 'hǎo (好) — good [3rd tone]', en: 'Nǐ hǎo = you good = Hello' },
                { es: 'nín (您) — you (respectful) [2nd tone]', en: 'Rising tone — more polite form' },
              ],
            },
            dialogue: {
              title: 'Meeting a Classmate',
              lines: [
                { speaker: 'Emeka', text: '你好！', pinyin: 'Nǐ hǎo!', translation: 'Hello!' },
                { speaker: 'Li Wei', text: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi?', translation: 'Hello! What is your name?' },
                { speaker: 'Emeka', text: '我叫Emeka。你呢？', pinyin: 'Wǒ jiào Emeka. Nǐ ne?', translation: 'My name is Emeka. And you?' },
                { speaker: 'Li Wei', text: '我叫李伟。很高兴认识你！', pinyin: 'Wǒ jiào Lǐ Wěi. Hěn gāoxìng rènshi nǐ!', translation: 'My name is Li Wei. Nice to meet you!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'What does "谢谢" (xiè xie) mean?', options: ['Hello','Goodbye','Thank you','Sorry'], answer: 2, explanation: '"谢谢" (xiè xie) means "thank you". The polite reply is "不客气" (bù kèqì) — you\'re welcome.' },
              { type: 'mcq', q: 'Which tone is a HIGH, LEVEL tone (like a flat line)?', options: ['1st tone','2nd tone','3rd tone','4th tone'], answer: 0, explanation: 'The 1st tone (ā) is high and level, represented by a flat line above the vowel.' },
              { type: 'mcq', q: '"您好" is more formal than "你好". When do you use it?', options: ['With friends','With younger students','With teachers and elders','When you are angry'], answer: 2, explanation: '"您" (nín) is the respectful form of "you". Use it with teachers, elders, and people you want to show respect to.' },
              { type: 'match', pairs: [['你好','Hello'],['再见','Goodbye'],['谢谢','Thank you'],['对不起','Sorry']], explanation: 'These four expressions are essential for any Mandarin conversation.' },
              { type: 'speak', q: 'Say hello in Mandarin.', target: '你好', pinyin: 'Nǐ hǎo', tip: 'Two third tones in a row: the first one is said as a rising second tone, so it sounds like "ní hǎo".', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
            ],
            assessment: [
              { type: 'mcq', q: 'Mandarin Chinese has how many main tones?', options: ['2','3','4','5'], answer: 2, explanation: 'Mandarin has 4 main tones (plus a neutral/light tone). Tones are essential — the same syllable with different tones means completely different things.' },
              { type: 'mcq', q: '"再见" (zài jiàn) means:', options: ['Hello','Good morning','Goodbye','Thank you'], answer: 2, explanation: '"再见" literally means "see again" — a farewell greeting.' },
              { type: 'mcq', q: 'The reply to "谢谢" (thank you) is:', options: ['你好','对不起','没关系','再见'], answer: 2, explanation: '"没关系" (méi guān xi) or "不客气" (bù kèqì) both mean "no problem / you\'re welcome".' },
            ],
          },
          {
            id: 'zh-b-m1-l2', title: 'Introducing Yourself', order: 2,
            objectives: ['Say your name in Mandarin','State your nationality','Ask and answer age questions'],
            vocab: [
              { word: '我叫...', pinyin: 'Wǒ jiào...', translation: 'My name is...', example: '我叫Amara。', exampleEn: 'My name is Amara.', audio: '我叫' },
              { word: '我是...人', pinyin: 'Wǒ shì... rén', translation: 'I am a ... person (nationality)', example: '我是尼日利亚人。', exampleEn: 'I am Nigerian.', audio: '我是尼日利亚人' },
              { word: '我今年...岁', pinyin: 'Wǒ jīnnián... suì', translation: 'I am ... years old this year', example: '我今年十四岁。', exampleEn: 'I am fourteen this year.', audio: '我今年十四岁' },
              { word: '你多大？', pinyin: 'Nǐ duō dà?', translation: 'How old are you?', example: '你今年多大？', exampleEn: 'How old are you this year?', audio: '你多大' },
              { word: '很高兴认识你', pinyin: 'Hěn gāoxìng rènshi nǐ', translation: 'Nice to meet you', example: '很高兴认识你，朋友。', exampleEn: 'Nice to meet you, friend.', audio: '很高兴认识你' },
              { word: '我来自...', pinyin: 'Wǒ lái zì...', translation: 'I come from...', example: '我来自拉各斯。', exampleEn: 'I come from Lagos.', audio: '我来自拉各斯' },
            ],
            grammar: {
              title: 'Subject-Verb-Object in Mandarin',
              explanation: 'Good news: Mandarin sentence structure is similar to English! The basic order is:\n\nSubject + Verb + Object\n\n• 我 (I) + 叫 (am called) + Amara = My name is Amara\n• 我 (I) + 是 (am) + 尼日利亚人 (Nigerian) = I am Nigerian\n\nHowever, Mandarin has NO verb conjugation. "是" (shì = to be) stays the same for all subjects:\n• 我是 (I am), 你是 (you are), 他是 (he is) — the verb never changes.',
              examples: [
                { es: '我是学生。', en: 'I am a student. (Wǒ shì xuésheng)' },
                { es: '她是老师。', en: 'She is a teacher. (Tā shì lǎoshī)' },
                { es: '你是尼日利亚人吗？', en: 'Are you Nigerian? (Nǐ shì Nírizìlìyǎ rén ma?)' },
              ],
            },
            dialogue: {
              title: 'Self-Introduction in Class',
              lines: [
                { speaker: 'Teacher', text: '请你自我介绍一下。', pinyin: 'Qǐng nǐ zìwǒ jièshào yīxià.', translation: 'Please introduce yourself.' },
                { speaker: 'Kemi', text: '大家好！我叫Kemi。', pinyin: 'Dàjiā hǎo! Wǒ jiào Kemi.', translation: 'Hello everyone! My name is Kemi.' },
                { speaker: 'Kemi', text: '我是尼日利亚人，来自阿布贾。', pinyin: 'Wǒ shì Nírizìlìyǎ rén, lái zì Ābùjiǎ.', translation: 'I am Nigerian, from Abuja.' },
                { speaker: 'Kemi', text: '我今年十六岁。很高兴认识大家！', pinyin: 'Wǒ jīnnián shíliù suì. Hěn gāoxìng rènshi dàjiā!', translation: 'I am sixteen this year. Nice to meet everyone!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'How do you say "My name is Tolu" in Mandarin?', options: ['你叫Tolu','我是Tolu','我叫Tolu','叫Tolu我'], answer: 2, explanation: '"我叫Tolu" (Wǒ jiào Tolu) — "我" = I, "叫" = am called. Word order: Subject first, then verb.' },
              { type: 'mcq', q: 'In Mandarin, "是" (shì) means:', options: ['have','go','am/is/are','like'], answer: 2, explanation: '"是" (shì) is the verb "to be" in Mandarin. Unlike English, it never changes — no am/is/are/was — just "是" for all.' },
          {"type": "mcq", "q": "How do you say \"I am sixteen years old\" in Mandarin?", "options": ["我今年十六岁", "我是十六今年", "我岁十六今年", "十六今年我岁"], "answer": 0, "explanation": "Word order: 我 (I) + 今年 (this year) + 十六 (sixteen) + 岁 (years old)."},
        ],
            assessment: [
              { type: 'mcq', q: '"我今年十五岁" means:', options: ['I like fifteen things','I am fifteen years old','My name is fifteen','There are fifteen students'], answer: 1, explanation: '"我今年十五岁" = I this-year fifteen years-old. "今年" = this year, "十五" = fifteen, "岁" = years old.' },
              { type: 'fill', q: 'Complete: "我___尼日利亚人。" (I am Nigerian.)', answer: '是', explanation: '"是" (shì) = to be. "我是尼日利亚人" = I am Nigerian.' },
            ],
          },
          {
            id: 'zh-b-m1-l3', title: 'Numbers 1–20', order: 3,
            objectives: ['Count from 1 to 20 in Mandarin','Understand the logical pattern of Chinese numbers','Use numbers in simple sentences'],
            vocab: [
              { word: '一二三', pinyin: 'yī èr sān', translation: 'one two three', example: '一、二、三——开始！', exampleEn: 'One, two, three — start!', audio: '一二三' },
              { word: '四五六', pinyin: 'sì wǔ liù', translation: 'four five six', example: '我有五本书。', exampleEn: 'I have five books.', audio: '四五六' },
              { word: '七八九十', pinyin: 'qī bā jiǔ shí', translation: 'seven eight nine ten', example: '十个学生。', exampleEn: 'Ten students.', audio: '七八九十' },
              { word: '十一、十二...', pinyin: 'shí yī, shí èr...', translation: 'eleven, twelve...', example: '十一月是十一月份。', exampleEn: 'The 11th month is November.', audio: '十一十二' },
              { word: '二十', pinyin: 'èr shí', translation: 'twenty', example: '二十个苹果。', exampleEn: 'Twenty apples.', audio: '二十' },
            ],
            grammar: {
              title: 'The Logic of Chinese Numbers',
              explanation: 'Chinese numbers follow a beautifully logical pattern:\n\n• 1–10: 一(yī) 二(èr) 三(sān) 四(sì) 五(wǔ) 六(liù) 七(qī) 八(bā) 九(jiǔ) 十(shí)\n\n• 11 = 十一 (shí yī) — literally "ten-one"\n• 12 = 十二 (shí èr) — "ten-two"\n• 13 = 十三 (shí sān) — "ten-three"\n• 20 = 二十 (èr shí) — "two-ten"\n\nOnce you learn 1–10, numbers up to 99 are logical!\n\nFor counting objects, add a measure word:\n• 一本书 (yī běn shū) — one book ("běn" = measure word for books)\n• 一个学生 (yī gè xuésheng) — one student ("gè" = general measure word)',
              examples: [
                { es: '我有三本书。', en: 'I have three books. (Wǒ yǒu sān běn shū)' },
                { es: '班里有二十个学生。', en: 'There are twenty students in class.' },
              ],
            },
            dialogue: {
              title: 'Buying at the Market',
              lines: [
                { speaker: 'Vendor', text: '你要几个苹果？', pinyin: 'Nǐ yào jǐ gè píngguǒ?', translation: 'How many apples do you want?' },
                { speaker: 'Customer', text: '我要十个，谢谢。', pinyin: 'Wǒ yào shí gè, xiè xie.', translation: 'I want ten, thank you.' },
                { speaker: 'Vendor', text: '一共二十元。', pinyin: 'Yīgòng èrshí yuán.', translation: 'That is twenty yuan in total.' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'How do you write "fifteen" in Chinese?', options: ['十五','五十','一五','五十一'], answer: 0, explanation: '十五 (shí wǔ) = 10 + 5 = fifteen. Chinese numbers are built logically: ten-five = fifteen.' },
              { type: 'mcq', q: 'What is 二十 (èr shí)?', options: ['12','20','22','2'], answer: 1, explanation: '二 (èr) = two, 十 (shí) = ten. 二十 = two-ten = twenty.' },
          {"type": "mcq", "q": "What number is 十八 (shí bā)?", "options": ["8", "18", "80", "81"], "answer": 1, "explanation": "十 (ten) + 八 (eight) = 18. Eighty would be 八十."},
        ],
            assessment: [
              { type: 'mcq', q: '"十三" (shí sān) means:', options: ['30','13','31','3'], answer: 1, explanation: '十 (ten) + 三 (three) = 十三 = thirteen.' },
              { type: 'fill', q: 'Write the Chinese characters for "twelve": 十___', answer: '二', explanation: '十二 (shí èr) = twelve = ten-two.' },
            ],
          },
        ],
      },
    ],
    intermediate: [], advanced: [], expert: [],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FRENCH
  // ══════════════════════════════════════════════════════════════════════════
  fr: {
    beginner: [
      {
        moduleId: 'fr-b-m1', title: 'Greetings & Introductions', order: 1,
        lessons: [
          {
            id: 'fr-b-m1-l1', title: 'Bonjour! — Greetings', order: 1,
            objectives: ['Use French greetings appropriately','Distinguish formal and informal address','Ask and answer "How are you?"'],
            vocab: [
              { word: 'Bonjour', pinyin: null, translation: 'Hello / Good morning', example: 'Bonjour, madame.', audio: 'Bonjour' },
              { word: 'Bonsoir', pinyin: null, translation: 'Good evening', example: 'Bonsoir, comment allez-vous?', audio: 'Bonsoir' },
              { word: 'Au revoir', pinyin: null, translation: 'Goodbye', example: 'Au revoir, à demain!', audio: 'Au revoir' },
              { word: 'Salut', pinyin: null, translation: 'Hi / Bye (informal)', example: 'Salut, ça va?', audio: 'Salut' },
              { word: 'Comment allez-vous?', pinyin: null, translation: 'How are you? (formal)', example: 'Bonjour, comment allez-vous?', audio: 'Comment allez-vous' },
              { word: 'Comment tu vas? / Ça va?', pinyin: null, translation: 'How are you? (informal)', example: 'Salut! Ça va?', audio: 'Ça va' },
              { word: 'Je vais bien, merci', pinyin: null, translation: 'I am fine, thank you', example: 'Je vais bien, merci. Et vous?', audio: 'Je vais bien merci' },
              { word: 'S\'il vous plaît / S\'il te plaît', pinyin: null, translation: 'Please (formal / informal)', example: 'Un café, s\'il vous plaît.', audio: "S'il vous plaît" },
              { word: 'Merci', pinyin: null, translation: 'Thank you', example: 'Merci beaucoup, madame.', audio: 'Merci' },
              { word: 'De rien', pinyin: null, translation: 'You\'re welcome', example: 'De rien, c\'est normal.', audio: 'De rien' },
            ],
            grammar: {
              title: 'Tu vs Vous — Formal and Informal Address',
              explanation: 'French has two ways to say "you":\n\n• "Tu" — informal singular. Use with friends, family, children, and people your age.\n• "Vous" — formal singular OR plural. Use with teachers, elders, strangers, and in professional settings.\n\nThis affects verbs and questions:\n• Tu vas bien? (informal — to a friend)\n• Vous allez bien? (formal — to a teacher)\n\nIn Nigerian schools, always use "vous" with your teacher.\n\nNote: Using "tu" with a stranger or teacher can seem rude in French culture!',
              examples: [
                { es: 'Comment tu t\'appelles? (informal)', en: 'What is your name? (to a classmate)' },
                { es: 'Comment vous appelez-vous? (formal)', en: 'What is your name? (to a teacher)' },
              ],
            },
            dialogue: {
              title: 'At School',
              lines: [
                { speaker: 'Aisha', text: 'Bonjour, Fatima!', translation: 'Hello, Fatima!' },
                { speaker: 'Fatima', text: 'Bonjour, Aisha! Ça va?', translation: 'Hello, Aisha! How are you?' },
                { speaker: 'Aisha', text: 'Je vais bien, merci. Et toi?', translation: 'I am fine, thank you. And you?' },
                { speaker: 'Fatima', text: 'Très bien, merci! Au revoir!', translation: 'Very well, thanks! Goodbye!' },
                { speaker: 'Aisha', text: 'Au revoir, à bientôt!', translation: 'Goodbye, see you soon!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'Which greeting is appropriate for the evening?', options: ['Bonjour','Salut','Bonsoir','Au revoir'], answer: 2, explanation: '"Bonsoir" is the evening greeting. "Bonjour" is for daytime (morning/afternoon). "Au revoir" means goodbye.' },
              { type: 'mcq', q: 'How do you say "You\'re welcome" in French?', options: ['Merci','S\'il vous plaît','De rien','Pardon'], answer: 2, explanation: '"De rien" = "it\'s nothing" = you\'re welcome. Another option is "Je vous en prie" (more formal).' },
              { type: 'mcq', q: 'When speaking to your French teacher, you should use:', options: ['tu','vous','salut','ça va'], answer: 1, explanation: '"Vous" is the formal/polite form for teachers, elders, and strangers. Using "tu" with a teacher is considered impolite.' },
              { type: 'match', pairs: [['Bonjour','Hello/Good morning'],['Au revoir','Goodbye'],['Merci','Thank you'],['Bonsoir','Good evening']], explanation: 'These are the four essential French greetings.' },
              { type: 'speak', q: 'Say this polite greeting.', target: 'Bonjour, comment allez-vous', tip: 'Nasal vowels: in "bon" and "comment" do not pronounce the n. "-ez" in "allez" sounds like "ay".', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
            ],
            assessment: [
              { type: 'mcq', q: '"Comment allez-vous?" is the _____ way to ask "How are you?"', options: ['informal','formal','plural only','wrong'], answer: 1, explanation: '"Allez-vous" uses "vous" (formal). The informal version is "Comment tu vas?" or simply "Ça va?"' },
              { type: 'mcq', q: '"Salut" can mean:', options: ['only Hello','only Goodbye','both Hi and Bye (informal)','Good morning only'], answer: 2, explanation: '"Salut" is informal and can mean both "hi" and "bye" among friends.' },
              { type: 'fill', q: 'Complete: "Je vais bien, _____, et vous?" (I am fine, thank you, and you?)', answer: 'merci', explanation: '"Merci" = thank you. The full sentence: "Je vais bien, merci, et vous?" — a polite, formal exchange.' },
            ],
          },
          {
            id: 'fr-b-m1-l2', title: 'Je m\'appelle... — Introductions', order: 2,
            objectives: ['Introduce yourself in French','State your name, age, and nationality','Ask someone their name politely'],
            vocab: [
              { word: 'Je m\'appelle...', pinyin: null, translation: 'My name is...', example: 'Je m\'appelle Emeka.', audio: 'Je m\'appelle' },
              { word: 'J\'ai ... ans', pinyin: null, translation: 'I am ... years old', example: 'J\'ai quinze ans.', audio: "J'ai quinze ans" },
              { word: 'Je suis nigérian(e)', pinyin: null, translation: 'I am Nigerian', example: 'Je suis nigériane, de Lagos.', audio: 'Je suis nigériane' },
              { word: 'Je viens de...', pinyin: null, translation: 'I come from...', example: 'Je viens d\'Abuja.', audio: "Je viens d'Abuja" },
              { word: 'Enchanté(e)', pinyin: null, translation: 'Nice to meet you', example: 'Enchanté, monsieur.', audio: 'Enchanté' },
              { word: 'Monsieur / Madame / Mademoiselle', pinyin: null, translation: 'Mr / Mrs / Miss', example: 'Bonjour, monsieur le professeur.', audio: 'Monsieur Madame' },
            ],
            grammar: {
              title: 'Gender in French — Masculine and Feminine',
              explanation: 'Every French noun is either masculine (m) or feminine (f). This affects the adjectives that follow.\n\nFor nationality adjectives, women add an "e" to the masculine form:\n• Un élève nigérian (masculine — a Nigerian student)\n• Une élève nigériane (feminine — a Nigerian student)\n\nOther examples:\n• Français → Française (French)\n• Sénégalais → Sénégalaise (Senegalese)\n\nFor "Enchanté" (nice to meet you), a woman says "Enchantée" (with an extra e).\n\nNote: Many French adjectives follow this pattern. Learning the gender of each noun is important from the start!',
              examples: [
                { es: 'Je suis nigérian. (said by a man)', en: 'I am Nigerian.' },
                { es: 'Je suis nigériane. (said by a woman)', en: 'I am Nigerian.' },
              ],
            },
            dialogue: {
              title: 'Introduction in French Class',
              lines: [
                { speaker: 'Prof. Dupont', text: 'Comment vous appelez-vous?', translation: 'What is your name?' },
                { speaker: 'Ngozi', text: 'Je m\'appelle Ngozi. Je suis nigériane.', translation: 'My name is Ngozi. I am Nigerian.' },
                { speaker: 'Prof. Dupont', text: 'Quel âge avez-vous, Ngozi?', translation: 'How old are you, Ngozi?' },
                { speaker: 'Ngozi', text: 'J\'ai seize ans, monsieur.', translation: 'I am sixteen years old, sir.' },
                { speaker: 'Prof. Dupont', text: 'Enchantée, Ngozi. Bienvenue!', translation: 'Nice to meet you, Ngozi. Welcome!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'A girl says she is Nigerian in French:', options: ['Je suis nigérian','Je suis nigériane','Je suis nigérianne','Je nigériane'], answer: 1, explanation: 'Feminine nationality: "nigériane" (add -e). Masculine: "nigérian". This pattern applies to most French nationality adjectives.' },
              { type: 'fill', q: '"J\'ai _____ ans." (I am fourteen years old.)', answer: 'quatorze', explanation: '"J\'ai quatorze ans" = I am fourteen years old. French uses "avoir" (to have) for age: literally "I have fourteen years".' },
          {"type": "mcq", "q": "How do you say \"My name is Amara\"?", "options": ["Je m'appelle Amara", "Je suis appelle Amara", "Mon nom Amara", "J'ai Amara"], "answer": 0, "explanation": "\"Je m'appelle\" literally means \"I call myself\". It is the standard way to give your name."},
        ],
            assessment: [
              { type: 'mcq', q: 'How do you ask "What is your name?" formally in French?', options: ['Tu t\'appelles comment?','Quel est ton nom?','Comment vous appelez-vous?','Salut, c\'est quoi ton nom?'], answer: 2, explanation: '"Comment vous appelez-vous?" uses "vous" (formal). In an exam or with a teacher, this is the expected formal question.' },
              { type: 'mcq', q: '"Enchanté" is said by:', options: ['a man only','a woman only','both, but women say Enchantée','teachers only'], answer: 2, explanation: 'Both men and women say "Enchanté/Enchantée" but women add an extra -e. The pronunciation is almost the same.' },
            ],
          },
          {
            id: 'fr-b-m1-l3', title: 'Les Nombres — Numbers 1–20', order: 3,
            objectives: ['Count 1–20 in French','Note irregular numbers 11–17','Use numbers in simple sentences'],
            vocab: [
              { word: 'un, deux, trois', pinyin: null, translation: 'one, two, three', example: 'Un, deux, trois — partez!', audio: 'un deux trois' },
              { word: 'quatre, cinq, six', pinyin: null, translation: 'four, five, six', example: 'J\'ai cinq livres.', audio: 'quatre cinq six' },
              { word: 'sept, huit, neuf, dix', pinyin: null, translation: 'seven, eight, nine, ten', example: 'Il y a dix élèves.', audio: 'sept huit neuf dix' },
              { word: 'onze à seize', pinyin: null, translation: 'eleven to sixteen', example: 'J\'ai seize ans.', audio: 'onze douze treize quatorze quinze seize' },
              { word: 'dix-sept à vingt', pinyin: null, translation: 'seventeen to twenty', example: 'Vingt élèves dans ma classe.', audio: 'dix-sept dix-huit dix-neuf vingt' },
            ],
            grammar: {
              title: 'French Numbers — The Irregular Teens',
              explanation: 'French numbers 1–10 must be memorized. Numbers 11–16 are also unique:\n\n• 11: onze\n• 12: douze\n• 13: treize\n• 14: quatorze\n• 15: quinze\n• 16: seize\n\nThen from 17, a pattern appears:\n• 17: dix-sept (ten-seven)\n• 18: dix-huit (ten-eight)\n• 19: dix-neuf (ten-nine)\n• 20: vingt\n\nNote: Note: In French, numbers are connected by hyphens from 17 onward: dix-sept, dix-huit, dix-neuf.\n\nFrench age: "J\'ai + number + ans" (I have X years)',
              examples: [
                { es: 'Il y a vingt élèves.', en: 'There are twenty students.' },
                { es: 'J\'ai quinze ans.', en: 'I am fifteen years old.' },
              ],
            },
            dialogue: {
              title: 'Counting Students',
              lines: [
                { speaker: 'Teacher', text: 'Combien d\'élèves y a-t-il?', translation: 'How many students are there?' },
                { speaker: 'Amara', text: 'Il y a vingt élèves, madame.', translation: 'There are twenty students, ma\'am.' },
                { speaker: 'Teacher', text: 'Très bien! Et dans la classe de M. Dupont?', translation: 'Very good! And in Mr Dupont\'s class?' },
                { speaker: 'Amara', text: 'Il y a dix-huit élèves.', translation: 'There are eighteen students.' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'What is "seventeen" in French?', options: ['Sept-dix','Dix-sept','Septième','Dix-sept-un'], answer: 1, explanation: 'From 17, French uses a compound: dix (ten) + sept (seven) = dix-sept. Always written with a hyphen.' },
              { type: 'mcq', q: '"J\'ai quatorze ans" means:', options: ['I am forty years old','I have fourteen books','I am fourteen years old','There are fourteen students'], answer: 2, explanation: '"J\'ai quatorze ans" — J\'ai (I have) + quatorze (fourteen) + ans (years) = I am fourteen years old. Note: French uses "avoir" (to have) for age.' },
          {"type": "mcq", "q": "What number is \"quinze\"?", "options": ["5", "15", "50", "14"], "answer": 1, "explanation": "Quinze = 15. Cinq = 5; cinquante = 50; quatorze = 14."},
        ],
            assessment: [
              { type: 'mcq', q: 'Which number is irregular (not built from a pattern)?', options: ['dix-sept (17)','dix-huit (18)','quinze (15)','dix-neuf (19)'], answer: 2, explanation: '17, 18, 19 all follow the pattern dix-X (ten + number). But 15 is "quinze" — a unique word that must be memorized.' },
              { type: 'fill', q: 'Complete: "Il y a _____ élèves." (There are twenty students.)', answer: 'vingt', explanation: '"Vingt" = twenty. "Il y a" = there are/is. "Élèves" = students.' },
            ],
          },
        ],
      },
    ],
    intermediate: [], advanced: [], expert: [],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ARABIC
  // ══════════════════════════════════════════════════════════════════════════
  ar: {
    beginner: [
      {
        moduleId: 'ar-b-m1', title: 'التحيات والمقدمات — Greetings & Introductions', order: 1,
        lessons: [
          {
            id: 'ar-b-m1-l1', title: 'السلام عليكم — Greetings', order: 1,
            objectives: ['Use Arabic greetings','Understand the Islamic greeting','Respond appropriately to greetings'],
            vocab: [
              { word: 'السَّلَامُ عَلَيْكُمْ', pinyin: 'As-salāmu ʿalaykum', translation: 'Peace be upon you (greeting)', example: 'السلام عليكم، كيف حالكم؟', exampleEn: 'Peace be upon you, how are you?', audio: 'السلام عليكم' },
              { word: 'وَعَلَيْكُمُ السَّلَام', pinyin: 'Wa ʿalaykumu s-salām', translation: 'And upon you peace (response)', example: 'وعليكم السلام، أهلاً وسهلاً.', exampleEn: 'And upon you peace, welcome.', audio: 'وعليكم السلام' },
              { word: 'مَرْحَبًا', pinyin: 'Marḥaban', translation: 'Hello / Welcome', example: 'مرحباً، أهلاً بك.', exampleEn: 'Hello, welcome.', audio: 'مرحباً' },
              { word: 'أَهْلاً وَسَهْلاً', pinyin: 'Ahlan wa sahlan', translation: 'Welcome / Hello (warm greeting)', example: 'أهلاً وسهلاً في مدرستنا.', exampleEn: 'Welcome to our school.', audio: 'أهلاً وسهلاً' },
              { word: 'مَعَ السَّلَامَة', pinyin: 'Maʿa s-salāma', translation: 'Goodbye (go safely)', example: 'مع السلامة، إلى اللقاء.', exampleEn: 'Goodbye, until we meet.', audio: 'مع السلامة' },
              { word: 'شُكْرًا', pinyin: 'Shukran', translation: 'Thank you', example: 'شكراً جزيلاً، يا أستاذ.', exampleEn: 'Thank you very much, teacher.', audio: 'شكراً' },
              { word: 'عَفْوًا', pinyin: 'ʿAfwan', translation: 'You\'re welcome / Excuse me / Sorry', example: 'عفواً، هل يمكنك المساعدة؟', exampleEn: 'Excuse me, can you help?', audio: 'عفواً' },
              { word: 'كَيْفَ حَالُكَ؟', pinyin: 'Kayfa ḥāluka? (m) / Kayfa ḥāluki? (f)', translation: 'How are you?', example: 'كيف حالك؟ بخير؟', exampleEn: 'How are you? Are you well?', audio: 'كيف حالك' },
              { word: 'بِخَيْر، شُكْرًا', pinyin: 'Bikhair, shukran', translation: 'Fine, thank you', example: 'أنا بخير، شكراً لك.', exampleEn: 'I am fine, thank you.', audio: 'بخير شكراً' },
            ],
            grammar: {
              title: 'Arabic Script Basics — Right to Left',
              explanation: 'Arabic is written from RIGHT to LEFT. This is one of the first things to learn.\n\nThe Arabic alphabet has 28 letters. Most letters change shape depending on their position in a word:\n• At the beginning\n• In the middle\n• At the end\n• Alone\n\nExample: the letter ب (bā) — which makes the "b" sound:\n• Beginning: بـ (ba...)\n• Middle: ـبـ (...ba...)\n• End: ـب (...b)\n\nArabic short vowels (called harakat/diacritics) are often not written in everyday text. Beginners use them to help read correctly.\n\nNote: This course uses Modern Standard Arabic (MSA / الفصحى al-fuṣḥā) — the formal written Arabic used in education, news, and official settings across all Arabic-speaking countries.',
              examples: [
                { es: 'مرحباً → م + ر + ح + ب + ا', en: 'marḥaban = m+r+ḥ+b+ā — each letter connects to the next' },
                { es: 'شكراً (shukran)', en: 'Thank you — 5 letters: ش+ك+ر+ا+ن' },
              ],
            },
            dialogue: {
              title: 'At School — في المدرسة',
              lines: [
                { speaker: 'Amara', text: 'السلام عليكم، يا أستاذة!', pinyin: 'As-salāmu ʿalaykum, ya ustādha!', translation: 'Peace be upon you, teacher!' },
                { speaker: 'Teacher', text: 'وعليكم السلام، أهلاً يا أمارا!', pinyin: "Wa ʿalaykumu s-salām, ahlan yā Amara!", translation: 'And upon you peace, hello Amara!' },
                { speaker: 'Amara', text: 'كيف حالك، يا أستاذة؟', pinyin: 'Kayfa ḥāluki, ya ustādha?', translation: 'How are you, teacher?' },
                { speaker: 'Teacher', text: 'أنا بخير، شكراً. وأنتِ؟', pinyin: 'Anā bikhair, shukran. Wa anti?', translation: 'I am fine, thank you. And you?' },
                { speaker: 'Amara', text: 'بخير أيضاً، شكراً لك!', pinyin: 'Bikhair ayḍan, shukran laki!', translation: 'Fine also, thank you!' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'What is the correct response to "السلام عليكم"?', options: ['مرحباً','شكراً','وعليكم السلام','مع السلامة'], answer: 2, explanation: '"وعليكم السلام" (Wa ʿalaykumu s-salām) is the traditional response to the Islamic greeting "السلام عليكم". It means "And upon you peace".' },
              { type: 'mcq', q: 'Arabic is written from which direction?', options: ['Left to right','Right to left','Top to bottom','Bottom to top'], answer: 1, explanation: 'Arabic is written and read from RIGHT to LEFT. This is the opposite of English. The binding of an Arabic book is on the right side.' },
              { type: 'mcq', q: '"شكراً" (shukran) means:', options: ['Hello','Goodbye','Thank you','You\'re welcome'], answer: 2, explanation: '"شكراً" = thank you. The reply is "عفواً" (ʿafwan) = you\'re welcome.' },
              { type: 'match', pairs: [['السلام عليكم','Peace be upon you'],['شكراً','Thank you'],['مرحباً','Hello'],['مع السلامة','Goodbye']], explanation: 'These are the four essential Arabic greetings for beginners.' },
              { type: 'speak', q: 'Say the Islamic greeting (Modern Standard Arabic).', target: 'السلام عليكم', pinyin: 'As-salāmu ʿalaykum', tip: 'ع (ʿayn) is a deep throat sound, not a vowel. In "as-salām" the ل of "al-" merges into س.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
            ],
            assessment: [
              { type: 'mcq', q: '"مع السلامة" (maʿa s-salāma) means:', options: ['Hello','How are you?','Thank you','Goodbye / Go in safety'], answer: 3, explanation: '"مع السلامة" literally means "with safety/peace" — a farewell meaning "go safely".' },
              { type: 'mcq', q: 'Modern Standard Arabic is used in:', options: ['Street conversations only','Education, news, and formal settings','Egypt only','Nigeria only'], answer: 1, explanation: 'Modern Standard Arabic (MSA) is the formal written language used across all Arabic-speaking countries in education, government, news, and official communication.' },
              { type: 'mcq', q: '"عفواً" (ʿafwan) can mean:', options: ['Thank you only','Goodbye only','You\'re welcome OR excuse me','Hello'], answer: 2, explanation: '"عفواً" (ʿafwan) has multiple uses: "you\'re welcome" (response to shukran), "excuse me" (to get attention), or "sorry" (mild apology).' },
            ],
          },
          {
            id: 'ar-b-m1-l2', title: 'أنا... — Introducing Yourself', order: 2,
            objectives: ['Say your name in Arabic','State your nationality','Use basic personal pronouns'],
            vocab: [
              { word: 'اسْمِي...', pinyin: 'Ismī...', translation: 'My name is...', example: 'اسمي أمارا.', exampleEn: 'My name is Amara.', audio: 'اسمي' },
              { word: 'أَنَا', pinyin: 'Anā', translation: 'I / I am', example: 'أنا طالب.', exampleEn: 'I am a student.', audio: 'أنا' },
              { word: 'أَنَا مِنْ نِيجِيرِيَا', pinyin: 'Anā min Nījīriyā', translation: 'I am from Nigeria', example: 'أنا من نيجيريا، من لاغوس.', exampleEn: 'I am from Nigeria, from Lagos.', audio: 'أنا من نيجيريا' },
              { word: 'أَنَا نِيجِيرِيٌّ / نِيجِيرِيَّة', pinyin: 'Anā Nījīrīyy (m) / Nījīrīyya (f)', translation: 'I am Nigerian (m/f)', example: 'أنا نيجيريٌّ من أبوجا.', exampleEn: 'I am Nigerian from Abuja.', audio: 'أنا نيجيري' },
              { word: 'طَالِب / طَالِبَة', pinyin: 'Ṭālib (m) / Ṭāliba (f)', translation: 'Student (male/female)', example: 'أنا طالبة في الصف العاشر.', exampleEn: 'I am a female student in grade ten.', audio: 'طالب طالبة' },
              { word: 'يَسُرُّنِي', pinyin: 'Yasurrūnī', translation: 'I am pleased (to meet you)', example: 'يسرني التعرف عليك.', exampleEn: 'I am pleased to meet you.', audio: 'يسرني' },
            ],
            grammar: {
              title: 'Arabic Has No Verb "To Be" in Present Tense',
              explanation: 'In Arabic, the present tense of "to be" (am/is/are) is OMITTED. You simply put the subject and the predicate next to each other.\n\nIn English: I AM a student.\nIn Arabic: أنا طالب — literally "I student" (no "am")\n\nExamples:\n• أنا طالب — I (am a) student (male)\n• أنا طالبة — I (am a) student (female)\n• اسمي أمارا — My name (is) Amara\n\nThis is called the "nominal sentence" in Arabic.\n\nNote: Gender matters in Arabic! Almost every noun, adjective, and verb changes for masculine (مذكر) and feminine (مؤنث). Feminine words usually end in ة (tā marbūṭa).',
              examples: [
                { es: 'أنا طالب. (boy)', en: 'I am a student. — "ṭālib" is masculine' },
                { es: 'أنا طالبة. (girl)', en: 'I am a student. — "ṭāliba" is feminine (note the ة ending)' },
                { es: 'اسمي كيمي.', en: 'My name is Kemi. — no verb needed!' },
              ],
            },
            dialogue: {
              title: 'Self-Introduction',
              lines: [
                { speaker: 'Teacher', text: 'من أنت؟ عرِّف بنفسك.', pinyin: 'Man anta? ʿArrif bi-nafsik.', translation: 'Who are you? Introduce yourself.' },
                { speaker: 'Tunde', text: 'اسمي توندي. أنا طالب.', pinyin: 'Ismī Tunde. Anā ṭālib.', translation: 'My name is Tunde. I am a student.' },
                { speaker: 'Tunde', text: 'أنا من نيجيريا، من كانو.', pinyin: 'Anā min Nījīriyā, min Kānū.', translation: 'I am from Nigeria, from Kano.' },
                { speaker: 'Teacher', text: 'أهلاً بك يا توندي! يسرنا وجودك.', pinyin: 'Ahlan bika ya Tunde! Yasurruna wujūdak.', translation: 'Welcome, Tunde! We are pleased to have you.' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'In Arabic, how do you say "My name is Emeka"?', options: ['أنا اسم إيميكا','اسمي إيميكا','اسمه إيميكا','إيميكا اسم'], answer: 1, explanation: '"اسمي إيميكا" = My name (is) Emeka. "اسمي" = my name. No verb needed in Arabic present tense!' },
              { type: 'mcq', q: 'A girl student in Arabic is called:', options: ['طالب','طلاب','طالبة','مدرس'], answer: 2, explanation: '"طالبة" (ṭāliba) = female student. The ة (tā marbūṭa) at the end marks feminine gender. "طالب" = male student.' },
          {"type": "mcq", "q": "How does a girl say \"I am a student\"?", "options": ["أنا طالب", "أنا طالبة", "أنت طالبة", "هي طالب"], "answer": 1, "explanation": "The feminine noun طالبة ends in ة. أنا = I."},
        ],
            assessment: [
              { type: 'mcq', q: '"أنا من نيجيريا" means:', options: ['My name is Nigeria','I am Nigerian','I am from Nigeria','Nigeria is my home'], answer: 2, explanation: '"أنا من نيجيريا" = I (am) from Nigeria. "من" (min) = from. No verb "to be" needed.' },
              { type: 'mcq', q: 'In Arabic nominal sentences (present tense), the verb "to be" is:', options: ['always written','sometimes written','never written','replaced by ة'], answer: 2, explanation: 'In Arabic present tense, the verb "to be" (am/is/are) is omitted. "أنا طالب" = I student = I am a student.' },
            ],
          },
          {
            id: 'ar-b-m1-l3', title: 'الأرقام — Numbers 1–10', order: 3,
            objectives: ['Count 1–10 in Arabic','Write Arabic numerals','Use numbers in simple phrases'],
            vocab: [
              { word: 'وَاحِد، اثْنَان، ثَلَاثَة', pinyin: 'Wāḥid, ithnān, thalātha', translation: 'one, two, three', example: 'واحد، اثنان، ثلاثة...', audio: 'واحد اثنان ثلاثة' },
              { word: 'أَرْبَعَة، خَمْسَة، سِتَّة', pinyin: 'Arbaʿa, khamsa, sitta', translation: 'four, five, six', example: 'عندي خمسة كتب.', exampleEn: 'I have five books.', audio: 'أربعة خمسة ستة' },
              { word: 'سَبْعَة، ثَمَانِيَة، تِسْعَة، عَشَرَة', pinyin: 'Sabʿa, thamāniya, tisʿa, ʿashara', translation: 'seven, eight, nine, ten', example: 'في الصف عشرة طلاب.', exampleEn: 'There are ten students in class.', audio: 'سبعة ثمانية تسعة عشرة' },
              { word: 'Arabic numerals: ١٢٣٤٥٦٧٨٩٠', pinyin: '1,2,3,4,5,6,7,8,9,0', translation: 'Arabic-Indic numerals (used in Arabic text)', example: 'عندي ٥ كتب.', exampleEn: 'I have 5 books.', audio: 'أرقام' },
            ],
            grammar: {
              title: 'Arabic Numerals — Two Number Systems',
              explanation: 'There are TWO sets of numerals associated with Arabic:\n\n1. Arabic-Indic numerals (used in Arabic text):\n   ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩\n   (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)\n\n2. Western numerals (what you already know):\n   0 1 2 3 4 5 6 7 8 9\n\nBoth are used in the Arab world. Scientific texts and modern media often use Western numerals.\n\nNote: Interesting fact: What the West calls "Arabic numerals" (1,2,3...) were actually developed in India and transmitted to Europe through Arab scholars. The numerals actually used in Arabic text look different!\n\nIn Arabic, the number gender (masculine/feminine) matters and affects how numbers are used with nouns — we will cover this more in intermediate level.',
              examples: [
                { es: '٣ طلاب = 3 students', en: 'Three (thalātha) students — Arabic-Indic numeral' },
                { es: 'عشرة (ten) = ١٠', en: 'ʿashara — the word for ten' },
              ],
            },
            dialogue: {
              title: 'Counting in Class',
              lines: [
                { speaker: 'Teacher', text: 'كم طالباً في الصف؟', pinyin: 'Kam ṭāliban fi aṣ-ṣaff?', translation: 'How many students are in class?' },
                { speaker: 'Aisha', text: 'في الصف عشرة طلاب، يا أستاذة.', pinyin: 'Fī aṣ-ṣaff ʿashara ṭullāb.', translation: 'There are ten students in class, teacher.' },
                { speaker: 'Teacher', text: 'أحسنت! واحد، اثنان، ثلاثة...', pinyin: 'Aḥsanta! Wāḥid, ithnān, thalātha...', translation: 'Well done! One, two, three...' },
              ],
            },
            exercises: [
              { type: 'mcq', q: 'What is "five" in Arabic?', options: ['ستة','أربعة','خمسة','ثلاثة'], answer: 2, explanation: '"خمسة" (khamsa) = five. The sequence: واحد(1), اثنان(2), ثلاثة(3), أربعة(4), خمسة(5).' },
              { type: 'mcq', q: 'The Arabic-Indic numeral ٧ represents:', options: ['4','7','9','1'], answer: 1, explanation: '٧ = seven. The Arabic-Indic numerals: ١(1), ٢(2), ٣(3), ٤(4), ٥(5), ٦(6), ٧(7), ٨(8), ٩(9), ٠(0).' },
          {"type": "mcq", "q": "What number is ثلاثة?", "options": ["2", "3", "4", "5"], "answer": 1, "explanation": "ثلاثة (thalātha) = three. اثنان = two; أربعة = four; خمسة = five."},
        ],
            assessment: [
              { type: 'mcq', q: '"عشرة" (ʿashara) means:', options: ['seven','eight','nine','ten'], answer: 3, explanation: '"عشرة" = ten. It is the base for numbers 11 onward: أحد عشر (11), اثنا عشر (12), etc.' },
              { type: 'mcq', q: 'Which numeral system is typically used in Arabic books?', options: ['Western numerals only','Arabic-Indic numerals (١٢٣)','Roman numerals','Both systems are used'], answer: 3, explanation: 'Both systems appear in Arabic-language materials. Academic texts often use Arabic-Indic (١٢٣), while many modern publications use Western (123) numerals.' },
            ],
          },
        ],
      },
    ],
    intermediate: [], advanced: [], expert: [],
  },
};


for (const lang of Object.keys(CURRICULUM)) {
  CURRICULUM[lang].intermediate = INTERMEDIATE_MODULES[lang] || [];
  CURRICULUM[lang].advanced     = ADVANCED_MODULES[lang]     || [];
  CURRICULUM[lang].expert       = EXPERT_MODULES[lang]       || [];
}

// ─────────────────────────────────────────────────────────────────────────────
// Achievement definitions
// ─────────────────────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  { id: 'first_lesson',  label: 'First Step',       desc: 'Complete your first language lesson', icon: 'Sprout', xp: 50 },
  { id: 'perfect_score', label: 'Perfectionist',    desc: 'Score 100% on an assessment',          icon: 'Target', xp: 100 },
  { id: 'streak_3',      label: '3-Day Streak',      desc: 'Learn for 3 days in a row',            icon: 'Flame', xp: 75 },
  { id: 'streak_7',      label: 'Week Champion',     desc: 'Learn for 7 days in a row',            icon: 'Trophy', xp: 200 },
  { id: 'bilingual',     label: 'Multilingual',      desc: 'Start learning 2 languages',           icon: 'Globe', xp: 150 },
  { id: 'module_done',   label: 'Module Master',     desc: 'Complete a full module',               icon: 'BookOpen', xp: 200 },
  { id: 'vocab_10',      label: 'Word Collector',    desc: 'Master 10 vocabulary items',           icon: 'ClipboardList', xp: 100 },
  { id: 'tutor_chat',    label: 'Ask the Tutor',     desc: 'Use the AI tutor for the first time',  icon: 'Bot', xp: 25 },
];



export { LANGUAGES, LEVELS, EDU_GROUPS, CURRICULUM, ACHIEVEMENTS };
