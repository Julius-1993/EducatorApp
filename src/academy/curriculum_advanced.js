// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED + EXPERT CURRICULUM — C1 / C2 level
// Status: AI-assisted draft. Marked __reviewed:false until a subject expert
// has verified each lesson. Teachers can approve via the Teacher Portal.
// 2 modules × 2 lessons per language per level = 16 lessons total
// ─────────────────────────────────────────────────────────────────────────────

export const ADVANCED_MODULES = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SPANISH ADVANCED (C1)
  // ═══════════════════════════════════════════════════════════════════════════
  es: [
    {
      moduleId: 'es-a-m1', title: 'Complex Grammar & Discourse', order: 1,
      lessons: [
        {
          id: 'es-a-m1-l1', title: 'The Subjunctive — El subjuntivo', order: 1, __reviewed: false,
          objectives: [
            'Form the present subjunctive correctly for regular and irregular verbs',
            'Identify when to use subjunctive vs indicative',
            'Use subjunctive in wish, doubt, emotion, and impersonal expressions',
          ],
          vocab: [
            { word: 'querer que + subj.', pinyin: null, translation: 'to want (someone else) to...', example: 'Quiero que estudies más.', audio: 'querer que' },
            { word: 'esperar que', pinyin: null, translation: 'to hope that', example: 'Espero que vengas a la fiesta.', audio: 'esperar que' },
            { word: 'es importante que', pinyin: null, translation: 'it is important that', example: 'Es importante que practiques cada día.', audio: 'es importante que' },
            { word: 'dudar que', pinyin: null, translation: 'to doubt that', example: 'Dudo que lleguen a tiempo.', audio: 'dudar que' },
            { word: 'aunque', pinyin: null, translation: 'although / even if (triggers subj. when uncertain)', example: 'Aunque llueva, iremos.', audio: 'aunque' },
            { word: 'a menos que', pinyin: null, translation: 'unless', example: 'Te llamo a menos que estés durmiendo.', audio: 'a menos que' },
            { word: 'para que', pinyin: null, translation: 'so that / in order that', example: 'Te explico para que entiendas.', audio: 'para que' },
            { word: 'ojalá (que)', pinyin: null, translation: 'I hope / would that (always subjunctive)', example: 'Ojalá que apruebe el examen.', audio: 'ojalá' },
          ],
          grammar: {
            title: 'The Subjunctive Mood — Forming and Using el subjuntivo',
            explanation: 'The subjunctive is a mood (not a tense) expressing subjectivity: wishes, doubts, emotions, hypotheticals. It is one of the most complex but essential aspects of advanced Spanish.\n\n**Formation (present subjunctive):**\n-AR verbs: drop -o from yo present, add -e endings: hable, hables, hable, hablemos, habléis, hablen\n-ER/-IR verbs: drop -o from yo present, add -a endings: coma, comas, coma, comamos, comáis, coman\n\n**Key irregular forms:**\nsea (ser), esté (estar), haya (haber), vaya (ir), sepa (saber), dé (dar)\n\n**WEIRDO triggers (subjunctive required):**\n• **W**ishes: querer que, desear que, ojalá\n• **E**motion: alegrase de que, temer que, sorprender que\n• **I**mpersonal: es necesario que, es probable que\n• **R**ecommendation: recomendar que, sugerir que\n• **D**oubt/denial: dudar que, no creer que\n• **O**jalá (always subjunctive)\n\n**When NOT to use subjunctive:**\nIf both clauses share the same subject, use infinitive instead:\n• Quiero estudiar. (I want to study — same subject)\n• Quiero que estudies. (I want you to study — different subject)',
            examples: [
              { es: 'Espero que Nigeria gane la Copa Africana.', en: 'I hope Nigeria wins the African Cup. (esperar + que → subjunctive)' },
              { es: 'Es crucial que los estudiantes practiquen todos los días.', en: 'It is crucial that students practise every day. (impersonal + que → subjunctive)' },
              { es: 'No creo que sea tan difícil.', en: 'I don\'t think it\'s that difficult. (doubt → subjunctive)' },
              { es: 'Llámame cuando llegues.', en: 'Call me when you arrive. (future uncertainty → subjunctive after cuando)' },
            ],
          },
          dialogue: {
            title: 'Discussing Plans and Hopes',
            lines: [
              { speaker: 'Chidi', text: 'Ojalá que el profesor no ponga examen mañana.', translation: 'I hope the teacher doesn\'t give an exam tomorrow.' },
              { speaker: 'Amaka', text: 'Dudo que lo cancele. Es importante que repasemos el tema esta noche.', translation: 'I doubt he\'ll cancel it. It\'s important that we review the topic tonight.' },
              { speaker: 'Chidi', text: 'Tienes razón. ¿Estudias conmigo para que podamos ayudarnos?', translation: 'You\'re right. Will you study with me so that we can help each other?' },
              { speaker: 'Amaka', text: 'Claro, aunque esté cansada, vale la pena. A menos que tengas otro compromiso.', translation: 'Of course, even if I\'m tired, it\'s worth it. Unless you have another commitment.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Choose the correct form: "Quiero que ella _____ (venir) mañana."', options: ['viene','venga','vendrá','vino'], answer: 1, explanation: '"Quiero que" is a wish trigger → subjunctive. "Venir" yo-form: vengo → subjunctive stem: veng- → venga.' },
            { type: 'mcq', q: '"Ojalá" always requires:', options: ['indicative','infinitive','subjunctive','conditional'], answer: 2, explanation: '"Ojalá" (from Arabic "law shā Allāh" = if God wills) always triggers subjunctive. "Ojalá que llueva" = I hope it rains.' },
            { type: 'fill', q: '"Es necesario que los alumnos _____ (leer) el texto." Complete with subjunctive.', answer: 'lean', explanation: '"Leer" → yo leo → stem le- → subjunctive: lea, leas, lea, leamos, leáis, lean. Impersonal "es necesario que" triggers subjunctive.' },
            { type: 'translate', q: 'Translate: "I doubt that he knows the answer."', answer: 'Dudo que sepa la respuesta.', alt: ['Dudo que él sepa la respuesta.'], explanation: '"Dudar que" triggers subjunctive. "Saber" irregular subjunctive: sepa (from yo sé → irregular).' },
            { type: 'speak', q: 'Say this sentence with the subjunctive.', target: 'Espero que vengas a la fiesta', tip: 'Say "vengas" as VEN-gas; the g is hard, as in "go".', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Which sentence correctly uses subjunctive?', options: ['Espero que ella viene.','Espero que ella venga.','Espero ella venga.','Espero que ella vendrá.'], answer: 1, explanation: '"Espero que" (I hope that) is a wish verb → subjunctive. "Venir" → subjunctive: venga. Never use future or indicative after wish triggers.' },
            { type: 'mcq', q: '"Cuando llegues al aeropuerto, llámame." The subjunctive is used because:', options: ['it is a past event','the arrival hasn\'t happened yet (future uncertainty)','llegar is irregular','cuando always takes indicative'], answer: 1, explanation: 'After "cuando" referring to a FUTURE event, Spanish requires subjunctive. After "cuando" referring to habitual/past events, use indicative.' },
            { type: 'fill', q: '"Para que nosotros _____ (entender), el profesor habla despacio."', answer: 'entendamos', explanation: '"Para que" (so that) always triggers subjunctive. "Entender" e→ie stem-changer: entiendo in present, but subjunctive: entienda, entiendas... BUT nosotros/vosotros keep original stem: entendamos.' },
          ],
        },
        {
          id: 'es-a-m1-l2', title: 'Academic & Professional Writing', order: 2, __reviewed: false,
          objectives: [
            'Write formal essays with structured arguments',
            'Use discourse markers for cohesion',
            'Employ register-appropriate vocabulary',
          ],
          vocab: [
            { word: 'sin embargo', pinyin: null, translation: 'however / nevertheless', example: 'Es eficaz; sin embargo, tiene desventajas.', audio: 'sin embargo' },
            { word: 'asimismo / además', pinyin: null, translation: 'likewise / furthermore', example: 'Asimismo, cabe destacar que...', audio: 'asimismo' },
            { word: 'por lo tanto', pinyin: null, translation: 'therefore / consequently', example: 'Por lo tanto, concluimos que...', audio: 'por lo tanto' },
            { word: 'cabe destacar', pinyin: null, translation: 'it is worth noting', example: 'Cabe destacar que los resultados varían.', audio: 'cabe destacar' },
            { word: 'en cuanto a', pinyin: null, translation: 'regarding / as for', example: 'En cuanto a la economía, los datos indican...', audio: 'en cuanto a' },
            { word: 'a pesar de (que)', pinyin: null, translation: 'despite / in spite of', example: 'A pesar de las dificultades, logramos el objetivo.', audio: 'a pesar de' },
            { word: 'conviene subrayar', pinyin: null, translation: 'it is worth underlining', example: 'Conviene subrayar la importancia de la educación.', audio: 'conviene subrayar' },
          ],
          grammar: {
            title: 'Formal Writing: Register, Cohesion, and Argumentation',
            explanation: 'Advanced Spanish writing requires mastery of register (formal vs informal) and cohesive devices.\n\n**Essay structure:**\n• Introducción: Present thesis — "El presente ensayo analiza..."\n• Desarrollo: Arguments with evidence — "En primer lugar... En segundo lugar... Por otro lado..."\n• Conclusión: Synthesize — "En conclusión, se puede afirmar que..."\n\n**Formal register markers:**\n• Use usted/ustedes (not tú)\n• Prefer passive or impersonal: "Se observa que..." / "Cabe mencionar..."\n• Avoid contractions and colloquialisms\n• Use nominalization: "el crecimiento" (the growth) instead of "crecer" (to grow)\n\n**Cohesive devices by function:**\n• Addition: además, asimismo, también, igualmente\n• Contrast: sin embargo, no obstante, a pesar de que, aunque\n• Cause/effect: por lo tanto, en consecuencia, de ahí que\n• Exemplification: por ejemplo, tal como, a modo de ilustración\n• Concession: si bien es cierto que, aunque hay que reconocer que',
            examples: [
              { es: 'Se ha demostrado que la educación bilingüe mejora el rendimiento cognitivo.', en: 'It has been shown that bilingual education improves cognitive performance. (passive "se ha demostrado")' },
              { es: 'En cuanto a las limitaciones del estudio, cabe señalar que la muestra es reducida.', en: 'Regarding the limitations of the study, it should be noted that the sample is small.' },
            ],
          },
          dialogue: { title: 'Essay Planning Discussion',
            lines: [
              { speaker: 'Professor', text: '¿Cuál es la tesis de su ensayo sobre la globalización?', translation: 'What is the thesis of your essay on globalisation?' },
              { speaker: 'Ngozi', text: 'Sostengo que, a pesar de sus beneficios económicos, la globalización ha acentuado las desigualdades sociales en los países en desarrollo.', translation: 'I argue that, despite its economic benefits, globalisation has intensified social inequalities in developing countries.' },
              { speaker: 'Professor', text: 'Bien planteado. Conviene subrayar que debe respaldar esa afirmación con datos empíricos.', translation: 'Well argued. It is worth underlining that you must support that claim with empirical data.' },
              {"speaker": "Ngozi", "text": "Además, incluiré un apartado metodológico para justificar la selección de las fuentes.", "translation": "In addition, I will include a methodology section to justify the selection of sources."},
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Which discourse marker introduces a contrasting idea?', options: ['asimismo','por lo tanto','sin embargo','además'], answer: 2, explanation: '"Sin embargo" = however/nevertheless — introduces contrast. "Asimismo" = likewise (addition). "Por lo tanto" = therefore (consequence). "Además" = furthermore (addition).' },
            { type: 'fill', q: '"_____ a las dificultades económicas, el proyecto siguió adelante." (Despite the economic difficulties...)', answer: 'A pesar de', explanation: '"A pesar de" = despite + noun. "A pesar de que" = despite the fact that + clause.' },
          {"type": "mcq", "q": "Which sentence is the most formal?", "options": ["No hay pasta, así que no podemos hacerlo.", "Dado que no se dispone de recursos, resulta inviable llevarlo a cabo.", "No tenemos plata, no se puede.", "Como no hay dinero, ni modo."], "answer": 1, "explanation": "Formal register uses \"dado que\", the impersonal \"se dispone de\" and \"resulta inviable\". \"Pasta\", \"plata\" and \"ni modo\" are colloquial or regional."},
        ],
          assessment: [
            { type: 'mcq', q: '"Se observa que..." is an example of:', options: ['active voice','impersonal passive (se pasivo)','reflexive verb','future tense'], answer: 1, explanation: '"Se + verb in 3rd person" = impersonal/passive construction. Preferred in formal academic writing: "Se observa" = It is observed / One observes.' },
            { type: 'translate', q: 'Express formally: "We can say that technology has transformed education."', answer: 'Se puede afirmar que la tecnología ha transformado la educación.', alt: ['Cabe afirmar que la tecnología ha transformado la educación.'], explanation: 'Formal alternatives: "Se puede afirmar" (it can be stated) or "Cabe afirmar" (it is fitting to state) — both avoid first-person "podemos decir".' },
          {"type": "mcq", "q": "\"Por lo tanto\" introduces:", "options": ["a contrast", "a consequence", "an example", "a concession"], "answer": 1, "explanation": "\"Por lo tanto\" means \"therefore\", so it introduces a consequence. Contrast: sin embargo. Example: por ejemplo. Concession: aunque, a pesar de."},
        ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // MANDARIN ADVANCED (C1)
  // ═══════════════════════════════════════════════════════════════════════════
  zh: [
    {
      moduleId: 'zh-a-m1', title: 'Complex Sentence Structures', order: 1,
      lessons: [
        {
          id: 'zh-a-m1-l1', title: 'Expressing Conditions and Concessions', order: 1, __reviewed: false,
          objectives: [
            'Use conditional patterns 如果…就, 只有…才, 即使…也',
            'Express concession with 虽然…但是 and 尽管…还是',
            'Build complex sentences appropriate for academic Chinese',
          ],
          vocab: [
            { word: '如果…就', pinyin: 'rúguǒ…jiù', translation: 'if…then', example: '如果你努力，就会成功。', exampleEn: 'If you work hard, you will succeed.', audio: '如果就' },
            { word: '只有…才', pinyin: 'zhǐyǒu…cái', translation: 'only if…only then', example: '只有练习，才能进步。', exampleEn: 'Only by practising can one improve.', audio: '只有才' },
            { word: '即使…也', pinyin: 'jíshǐ…yě', translation: 'even if…still', example: '即使很难，我也要坚持。', exampleEn: 'Even if it\'s very difficult, I will still persist.', audio: '即使也' },
            { word: '虽然…但是', pinyin: 'suīrán…dànshì', translation: 'although…but', example: '虽然很累，但是我继续学习。', exampleEn: 'Although very tired, I continue studying.', audio: '虽然但是' },
            { word: '尽管…还是', pinyin: 'jǐnguǎn…háishi', translation: 'despite…still', example: '尽管有困难，他还是完成了任务。', exampleEn: 'Despite the difficulties, he still completed the task.', audio: '尽管还是' },
            { word: '除非…否则', pinyin: 'chúfēi…fǒuzé', translation: 'unless…otherwise', example: '除非你请假，否则必须出席。', exampleEn: 'Unless you take leave, you must attend.', audio: '除非否则' },
            { word: '不管…都', pinyin: 'bùguǎn…dōu', translation: 'no matter what/how…always', example: '不管天气怎样，我都去跑步。', exampleEn: 'No matter what the weather, I always go running.', audio: '不管都' },
          ],
          grammar: {
            title: 'Paired Conjunctions in Mandarin',
            explanation: 'Advanced Mandarin uses paired conjunctions (关联词 guānliáncí) that always come in pairs — one in each clause.\n\n**Condition:**\n• 如果 A，(那么/就) B — If A, then B (most common)\n• 只有 A，才 B — Only if A, then B (stricter condition)\n• 除非 A，否则 B — Unless A, otherwise B\n\n**Concession:**\n• 虽然 A，但是/可是 B — Although A, but B (Note: do NOT use "but" in English translation — it sounds odd)\n• 尽管 A，还是/仍然 B — Despite A, still B (stronger emphasis)\n• 即使 A，也 B — Even if A, still B (hypothetical)\n\n**Universal:**\n• 不管/无论 A，都 B — No matter A, always B\n\n**Word order rule:** In Mandarin, the conjunction often appears at the START of the clause (before the subject), unlike English where conjunctions typically follow the subject.\n\nNote: 虽然…但是: Never say "虽然A，但是B" and translate as "Although A, but B" — English does not combine "although" and "but". Choose one: "Although A, B" or "A, but B".',
            examples: [
              { es: '如果明天下雨，我们就取消野餐。', en: 'If it rains tomorrow, we will cancel the picnic.' },
              { es: '只有坚持不懈，才能达到目标。', en: 'Only through perseverance can one achieve one\'s goals.' },
              { es: '即使面临挑战，我们也要继续前进。', en: 'Even when facing challenges, we must continue moving forward.' },
            ],
          },
          dialogue: {
            title: 'Academic Discussion',
            lines: [
              { speaker: 'Professor', text: '你认为经济发展和环境保护能同时实现吗？', pinyin: 'Nǐ rènwéi jīngjì fāzhǎn hé huánjìng bǎohù néng tóngshí shíxiàn ma?', translation: 'Do you think economic development and environmental protection can be achieved simultaneously?' },
              { speaker: 'Tunde', text: '虽然两者存在矛盾，但是只要政策合理，就可以平衡发展。', pinyin: 'Suīrán liǎng zhě cúnzài máodùn, dànshì zhǐyào zhèngcè hélǐ, jiù kěyǐ pínghéng fāzhǎn.', translation: 'Although there are contradictions between the two, as long as policies are reasonable, development can be balanced.' },
              { speaker: 'Professor', text: '不管面临什么挑战，都必须将可持续发展列为优先事项。', pinyin: 'Bùguǎn miànlín shénme tiǎozhàn, dōu bìxū jiāng kě chíxù fāzhǎn liè wèi yōuxiān shìxiàng.', translation: 'No matter what challenges arise, sustainable development must always be listed as a priority.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Complete: "_____ 你练习，_____ 能提高。" (Only if you practise, can you improve.)', options: ['如果/就','只有/才','虽然/但是','即使/也'], answer: 1, explanation: '"只有…才" expresses a NECESSARY condition: only by doing A can B happen. "如果…就" is a regular "if-then" condition without the same strong exclusivity.' },
            { type: 'mcq', q: '"即使很冷，他也去游泳。" means:', options: ['Because it\'s cold, he goes swimming','Even if it\'s cold, he still goes swimming','If it\'s cold, he won\'t swim','Although cold, but he swims'], answer: 1, explanation: '"即使…也" = even if…still. This is a HYPOTHETICAL concession — even in the extreme case of cold weather, he still swims.' },
            { type: 'fill', q: '"_____ 天气好坏，她 _____ 每天跑步。" (No matter the weather, she always runs daily.)', answer: '不管 / 都', explanation: '"不管…都" = no matter what…always. This pattern is used for universal statements regardless of circumstances.' },
            { type: 'speak', q: 'Say this concession sentence.', target: '虽然很累，但是我继续学习', pinyin: 'Suīrán hěn lèi, dànshì wǒ jìxù xuéxí', tip: 'Keep 虽 (suī) high and level, and make the falling fourth tones in lèi, dàn and jì short and sharp.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Which pattern expresses "unless"?', options: ['虽然…但是','如果…就','除非…否则','即使…也'], answer: 2, explanation: '"除非…否则" = unless…otherwise. "除非你早点来，否则会错过演讲。" = Unless you come early, you will miss the lecture.' },
            { type: 'translate', q: 'Translate: "Although the task is difficult, I will still complete it."', answer: '虽然任务很难，但是我还是会完成它。', alt: ['虽然任务困难，我还是会完成。','尽管任务很难，我还是要完成它。'], explanation: '"虽然…但是/还是" = although…but/still. Note: in English we say "although A, B" — we do NOT say "although A, but B". In Chinese, "虽然…但是" is standard.' },
          {"type": "mcq", "q": "Which pattern means \"only if\"?", "options": ["如果…就", "只有…才", "即使…也", "不管…都"], "answer": 1, "explanation": "\"只有…才\" (zhǐyǒu…cái) states a necessary condition: only if A, then B. \"如果…就\" is an ordinary if-then."},
        ],
        },
        {
          id: 'zh-a-m1-l2', title: 'Reading Comprehension & Chinese Media', order: 2, __reviewed: false,
          objectives: [
            'Read authentic Chinese news and opinion articles',
            'Identify formal written Chinese patterns',
            'Analyse rhetorical structure in Chinese prose',
          ],
          vocab: [
            { word: '据…报道', pinyin: 'jù…bàodào', translation: 'according to (reports from)...', example: '据新华社报道，会议已结束。', exampleEn: 'According to Xinhua News Agency, the meeting has concluded.', audio: '据报道' },
            { word: '对此', pinyin: 'duì cǐ', translation: 'regarding this / in response to this', example: '对此，专家表示...', exampleEn: 'Regarding this, experts say...', audio: '对此' },
            { word: '值得注意的是', pinyin: 'zhídé zhùyì de shì', translation: 'it is worth noting that', example: '值得注意的是，数据显示增长趋势。', exampleEn: 'It is worth noting that the data shows a growth trend.', audio: '值得注意的是' },
            { word: '为此', pinyin: 'wèi cǐ', translation: 'for this purpose / to this end', example: '为此，政府出台了新政策。', exampleEn: 'To this end, the government introduced new policies.', audio: '为此' },
            { word: '与此同时', pinyin: 'yǔ cǐ tóngshí', translation: 'at the same time / meanwhile', example: '与此同时，企业也面临挑战。', exampleEn: 'At the same time, businesses also face challenges.', audio: '与此同时' },
          ],
          grammar: {
            title: 'Formal Written Chinese — 书面语 (Shūmiànyǔ)',
            explanation: 'Written Chinese (书面语 shūmiànyǔ) differs significantly from spoken Chinese (口语 kǒuyǔ). Formal written Chinese:\n\n**Uses classical 4-character expressions (成语 chéngyǔ):**\n• 一石二鸟 (yī shí èr niǎo) = kill two birds with one stone\n• 实事求是 (shíshì qiúshì) = seek truth from facts\n\n**Prefers concise formal connectors:**\n• Spoken: 然后 (then) → Written: 继而, 随后\n• Spoken: 但是 (but) → Written: 然而, 却\n• Spoken: 因为 (because) → Written: 由于, 鉴于\n\n**Uses formal reporting patterns:**\n• 据…报道/了解/悉 = According to (reports/understanding/knowledge)\n• 如…所示 = As shown by...\n• 有分析人士指出 = Some analysts point out\n\n**Passive/impersonal patterns:**\n• 被 (bèi) passive: 该法案已被通过。= The bill has been passed.\n• 受到 (shòudào): 受到广泛关注 = received wide attention',
            examples: [
              { es: '鉴于目前形势，委员会决定推迟会议。', en: 'Jìnyú mùqián xíngshì, wěiyuánhuì juédìng tuīchí huìyì — In view of the current situation, the committee decided to postpone the meeting.' },
              { es: '此举受到了社会各界的广泛关注。', en: 'This move received wide attention from all sectors of society.' },
            ],
          },
          dialogue: {
            title: 'Analysing a News Article',
            lines: [
              { speaker: 'Student', text: '老师，这篇报道里"据悉"是什么意思？', pinyin: 'Lǎoshī, zhè piān bàodào lǐ "jùxī" shì shénme yìsi?', translation: 'Teacher, what does "jùxī" mean in this news report?' },
              { speaker: 'Teacher', text: '"据悉"是"据了解"的书面语缩写，意思是"according to what is known"。新闻里常用。', pinyin: '"Jùxī" shì "jù liǎojiě" de shūmiànyǔ suōxiě, yìsi shì "according to what is known". Xīnwén lǐ cháng yòng.', translation: '"Jùxī" is the written abbreviation of "jù liǎojiě", meaning "according to what is known". It is commonly used in news.' },
              {"speaker": "Teacher", "text": "注意，新闻中的\"此举\"指的是前文提到的措施，不是新的内容。", "pinyin": "Zhùyì, xīnwén zhōng de \"cǐ jǔ\" zhǐ de shì qiánwén tí dào de cuòshī, bú shì xīn de nèiróng.", "translation": "Note that \"cǐ jǔ\" (this move) in news refers to the measure mentioned earlier, not to something new."},
            ],
          },
          exercises: [
            { type: 'mcq', q: '"然而" in formal Chinese corresponds to which spoken word?', options: ['因为','虽然','但是','如果'], answer: 2, explanation: '"然而" (rán\'ér) = however/but — the formal written equivalent of "但是". Formal: "然而" | Spoken: "但是".' },
            { type: 'fill', q: '"_____ 该报告，污染程度有所下降。" (According to the report, pollution levels have decreased.)', answer: '据', explanation: '"据" (jù) = according to. "据该报告" = according to the report. Full pattern: 据…报道/了解/悉.' },
          {"type": "mcq", "q": "\"值得注意的是\" introduces:", "options": ["a joke", "a point worth noting", "a question", "an apology"], "answer": 1, "explanation": "\"值得注意的是\" (zhídé zhùyì de shì) = \"it is worth noting that\", common in formal and news writing."},
        ],
          assessment: [
            { type: 'mcq', q: 'Which is the formal written equivalent of 因为 (because)?', options: ['然而','由于','虽然','所以'], answer: 1, explanation: '"由于" (yóuyú) = due to / because of — the formal written equivalent of "因为". "由于天气原因，活动取消。" = Due to weather conditions, the event was cancelled.' },
            { type: 'mcq', q: '"受到广泛关注" means:', options: ['caused widespread concern','received wide attention','was criticised widely','was widely published'], answer: 1, explanation: '"受到" (shòudào) = received / was subject to. "广泛" (guǎngfàn) = wide/extensive. "关注" (guānzhù) = attention/concern. Together: received wide attention.' },
          {"type": "fill", "q": "_____此，政府出台了新政策。(To this end, the government introduced new policies.)", "answer": "为", "explanation": "\"为此\" (wèi cǐ) = to this end / for this reason."},
        ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH ADVANCED (C1)
  // ═══════════════════════════════════════════════════════════════════════════
  fr: [
    {
      moduleId: 'fr-a-m1', title: 'Grammar Maîtrisée & Expression Écrite', order: 1,
      lessons: [
        {
          id: 'fr-a-m1-l1', title: 'Le Subjonctif — The Subjunctive', order: 1, __reviewed: false,
          objectives: [
            'Form and use the present subjunctive correctly',
            'Identify subjunctive triggers (emotion, doubt, obligation, concession)',
            'Distinguish subjunctive from indicative in context',
          ],
          vocab: [
            { word: 'il faut que + subj.', pinyin: null, translation: 'it is necessary that', example: 'Il faut que tu sois à l\'heure.', audio: 'il faut que' },
            { word: 'bien que + subj.', pinyin: null, translation: 'although (always subjunctive)', example: 'Bien qu\'il soit fatigué, il travaille.', audio: 'bien que' },
            { word: 'pour que + subj.', pinyin: null, translation: 'so that / in order that', example: 'Je t\'explique pour que tu comprennes.', audio: 'pour que' },
            { word: 'avant que + subj.', pinyin: null, translation: 'before (always subjunctive)', example: 'Pars avant qu\'il (ne) pleuve.', audio: 'avant que' },
            { word: 'à condition que + subj.', pinyin: null, translation: 'provided that', example: 'Je viens à condition que tu m\'invites.', audio: 'à condition que' },
            { word: 'douter que + subj.', pinyin: null, translation: 'to doubt that', example: 'Je doute qu\'il vienne.', audio: 'douter que' },
            { word: 'vouloir que + subj.', pinyin: null, translation: 'to want (someone) to', example: 'Je veux que vous fassiez vos devoirs.', audio: 'vouloir que' },
          ],
          grammar: {
            title: 'Le Subjonctif Présent — Formation and Triggers',
            explanation: '**Formation:** Take the 3rd person plural (ils/elles) present indicative, remove -ent, add: -e, -es, -e, -ions, -iez, -ent\n\nparler → ils parlent → parl- → que je parle, tu parles, il parle, nous parlions, vous parliez, ils parlent\n\nNote: nous/vous forms = imperfect forms!\n\n**Irregular subjunctives (must memorise):**\n• être → sois, sois, soit, soyons, soyez, soient\n• avoir → aie, aies, ait, ayons, ayez, aient\n• aller → aille, ailles, aille, allions, alliez, aillent\n• faire → fasse, fasses, fasse, fassions, fassiez, fassent\n• pouvoir → puisse / savoir → sache / vouloir → veuille\n\n**TRIGGER categories:**\n• **Necessity/obligation:** il faut que, il est nécessaire que, il est important que\n• **Emotion:** être content(e) que, regretter que, avoir peur que\n• **Doubt/possibility:** douter que, il est possible que (NOT: il est probable que → indicative!)\n• **Concession/time:** bien que, quoique, avant que, jusqu\'à ce que\n• **Purpose:** pour que, afin que\n• **Condition:** à condition que, pourvu que, à moins que\n\n**Key distinction:** "il est possible que" + SUBJ but "il est probable que" + INDICATIVE.',
            examples: [
              { es: 'Il faut que nous finissions ce projet avant vendredi.', en: 'We must finish this project before Friday. (obligation → subjunctive)' },
              { es: 'Bien qu\'elle soit brillante, elle doit encore travailler.', en: 'Although she is brilliant, she still has to work. (concession → subjunctive)' },
              { es: 'Je doute qu\'il ait raison.', en: 'I doubt he is right. (doubt → subjunctive)' },
            ],
          },
          dialogue: {
            title: 'Planning a School Project',
            lines: [
              { speaker: 'Kemi', text: 'Il faut que nous décidions du sujet avant que le professeur ne nous impose quelque chose.', translation: 'We need to decide on the topic before the teacher imposes something on us.' },
              { speaker: 'Tolu', text: 'Je propose qu\'on choisisse un sujet africain, bien que certains élèves préfèrent un thème international.', translation: 'I propose we choose an African topic, although some students prefer an international theme.' },
              { speaker: 'Kemi', text: 'D\'accord, pourvu que chacun contribue équitablement. Je veux que le travail soit réparti de façon juste.', translation: 'OK, provided everyone contributes equally. I want the work to be distributed fairly.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: '"Il est possible que..." requires:', options: ['indicative','subjunctive','conditional','infinitive'], answer: 1, explanation: '"Il est possible que" → SUBJUNCTIVE. But "Il est probable que" → INDICATIVE. This distinction is a classic advanced French test point.' },
            { type: 'fill', q: '"Bien qu\'il _____ (être) malade, il est venu." (Although he is ill, he came.)', answer: 'soit', explanation: '"Bien que" always triggers subjunctive. "Être" irregular subjunctive: sois, sois, soit, soyons, soyez, soient.' },
            { type: 'speak', q: 'Say this sentence with the subjunctive.', target: 'Il faut que nous finissions', tip: 'The final t in "faut" and the final s in "nous" are silent. "ss" in "finissions" is an s sound.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Which sentence is grammatically correct?', options: ['Je veux que tu viens.','Je veux que tu viennes.','Je veux que tu venais.','Je veux tu viennes.'], answer: 1, explanation: '"Vouloir que" triggers subjunctive. "Venir" subjunctive: vienne, viennes, vienne, venions, veniez, viennent. Never use indicative or imperfect after subjunctive triggers.' },
            { type: 'fill', q: '"Il faut que vous _____ (faire) vos devoirs ce soir."', answer: 'fassiez', explanation: '"Faire" irregular subjunctive: fasse, fasses, fasse, fassions, fassiez, fassent. "Il faut que" is an obligation trigger → always subjunctive.' },
          {"type": "fill", "q": "Il faut que tu _____ (être) à l'heure.", "answer": "sois", "explanation": "\"Il faut que\" triggers the subjunctive. Subjunctive of \"être\": sois, sois, soit, soyons, soyez, soient."},
        ],
        },
        {
          id: 'fr-a-m1-l2', title: 'Argumentation & Essai Critique', order: 2, __reviewed: false,
          objectives: [
            'Write a structured argumentative essay (pour/contre)',
            'Use sophisticated concession and refutation',
            'Command formal French register and academic vocabulary',
          ],
          vocab: [
            { word: 'certes…mais', pinyin: null, translation: 'admittedly…but', example: 'Certes, le progrès est rapide, mais ses effets sont inégaux.', audio: 'certes mais' },
            { word: 'force est de constater', pinyin: null, translation: 'one cannot deny / it must be acknowledged', example: 'Force est de constater que l\'inégalité persiste.', audio: 'force est de constater' },
            { word: 'à cet égard', pinyin: null, translation: 'in this regard / in this respect', example: 'À cet égard, les politiques publiques ont échoué.', audio: 'à cet égard' },
            { word: 'il convient de', pinyin: null, translation: 'it is appropriate to / one should', example: 'Il convient de nuancer cette affirmation.', audio: 'il convient de' },
            { word: 'en dépit de', pinyin: null, translation: 'in spite of / despite', example: 'En dépit des progrès, des défis subsistent.', audio: 'en dépit de' },
            { word: 'en définitive', pinyin: null, translation: 'ultimately / in the final analysis', example: 'En définitive, la question reste ouverte.', audio: 'en définitive' },
          ],
          grammar: {
            title: 'The French Critical Essay — Dissertation',
            explanation: 'The French dissertation (critical essay) follows a strict structure:\n\n**Standard structure — dialectique (thesis/antithesis/synthesis):**\n\nI. Thèse — Arguments FOR the proposition\n   • Premier argument + exemple + développement\n   • Deuxième argument + exemple\n\nII. Antithèse — Arguments AGAINST / Nuances\n   • Certes… mais…\n   • Il convient toutefois de nuancer…\n\nIII. Synthèse — Your balanced conclusion\n   • En définitive…\n   • La question mérite donc d\'être envisagée sous plusieurs angles…\n\n**Useful transitions by function:**\n• Introduce: "Dans un premier temps…", "Il convient tout d\'abord de…"\n• Add: "De plus…", "Par ailleurs…", "En outre…"\n• Contrast: "Cependant…", "Néanmoins…", "Or…"\n• Concede: "Certes…", "Il est vrai que…", "Bien que…"\n• Conclude: "En somme…", "Au terme de cette analyse…", "En définitive…"\n\n**Register:** Always use "on" or passive instead of "je/nous" in academic essays.',
            examples: [
              { es: 'En dépit des avancées technologiques, force est de constater que l\'accès à l\'éducation demeure inégal.', en: 'Despite technological advances, one cannot deny that access to education remains unequal.' },
              { es: 'Certes, la mondialisation favorise la croissance économique, mais elle engendre également des inégalités.', en: 'Admittedly, globalisation promotes economic growth, but it also generates inequalities.' },
            ],
          },
          dialogue: {
            title: 'Essay Feedback from Professor',
            lines: [
              { speaker: 'Prof. Martin', text: 'Votre argumentation est solide, mais il vous manque une véritable antithèse. Certes, vous défendez bien votre thèse, mais il convient de présenter des contre-arguments avant de les réfuter.', translation: 'Your argumentation is solid, but you lack a true antithesis. Admittedly, you defend your thesis well, but one should present counterarguments before refuting them.' },
              { speaker: 'Amara', text: 'Je vois. En définitive, la dissertation doit montrer que j\'ai considéré plusieurs perspectives, pas seulement la mienne.', translation: 'I see. Ultimately, the essay must show that I have considered several perspectives, not just my own.' },
              {"speaker": "Prof. Martin", "text": "Exactement. Et n'oubliez pas que la conclusion doit ouvrir une perspective, pas seulement résumer.", "translation": "Exactly. And do not forget that the conclusion must open a perspective, not just summarise."},
            ],
          },
          exercises: [
            { type: 'mcq', q: '"Certes… mais…" is used to:', options: ['agree completely','introduce a concession then counter-argue','conclude an essay','give an example'], answer: 1, explanation: '"Certes… mais…" = Admittedly… but… — a classic concession-refutation structure. You acknowledge a valid point then introduce a more important counter-point.' },
            { type: 'fill', q: '"_____ des difficultés économiques, le gouvernement a maintenu son engagement." (Despite economic difficulties...)', answer: 'En dépit', explanation: '"En dépit de" = despite / in spite of + noun. Compare: "Bien que" + subjunctive = although + clause.' },
          {"type": "mcq", "q": "Which connector introduces a concession?", "options": ["En outre", "Certes", "Donc", "Par exemple"], "answer": 1, "explanation": "\"Certes\" = admittedly. \"En outre\" = moreover; \"donc\" = therefore; \"par exemple\" = for example."},
        ],
          assessment: [
            { type: 'mcq', q: 'In a formal French essay, which pronoun is preferred?', options: ['je','nous','on or passive','tu'], answer: 2, explanation: 'French academic writing avoids first person (je/nous). Use "on" (one) or passive constructions: "On peut affirmer que..." or "Il a été démontré que..."' },
            { type: 'translate', q: 'Express academically: "We cannot ignore the social impact of this phenomenon."', answer: 'Il serait impossible de négliger l\'impact social de ce phénomène.', alt: ['On ne saurait ignorer l\'impact social de ce phénomène.','Force est de constater l\'impact social de ce phénomène.'], explanation: '"On ne saurait" (one could not) is an elegant formal expression using the conditional of "savoir". "Il serait impossible de" is another formal alternative.' },
          {"type": "mcq", "q": "In a dissertation, the \"antithèse\" presents:", "options": ["the conclusion", "arguments against, or nuances to, the thesis", "a list of sources", "the introduction"], "answer": 1, "explanation": "The dialectic structure is thèse, antithèse, synthèse. The antithèse challenges or qualifies the thesis."},
        ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ARABIC ADVANCED (C1)
  // ═══════════════════════════════════════════════════════════════════════════
  ar: [
    {
      moduleId: 'ar-a-m1', title: 'التعبير الكتابي والقراءة المتقدمة', order: 1,
      lessons: [
        {
          id: 'ar-a-m1-l1', title: 'الجملة الفعلية والجملة الاسمية — Verbal and Nominal Sentences', order: 1, __reviewed: false,
          objectives: [
            'Distinguish between verbal sentences (جملة فعلية) and nominal sentences (جملة اسمية)',
            'Use إنَّ and its sisters correctly',
            'Form complex sentences with relative clauses',
          ],
          vocab: [
            { word: 'إنَّ / أنَّ', pinyin: 'inna / anna', translation: 'indeed/verily (emphasises subject)', example: 'إنَّ التعليمَ أساسُ التقدُّم.', exampleEn: 'Indeed, education is the foundation of progress.', audio: 'إنَّ' },
            { word: 'لكنَّ', pinyin: 'lākinna', translation: 'but / however (sister of إنَّ)', example: 'النجاحُ صعبٌ لكنَّه ممكنٌ.', exampleEn: 'Success is difficult but it is possible.', audio: 'لكنَّ' },
            { word: 'الذي / التي / الذين', pinyin: 'alladhī / allatī / alladhīna', translation: 'who/which/that (relative pronouns)', example: 'الطالبُ الذي يجتهدُ ينجحُ.', exampleEn: 'The student who works hard succeeds.', audio: 'الذي التي' },
            { word: 'حيثُ', pinyin: 'ḥaythu', translation: 'where / whereas (formal)', example: 'ذهبتُ إلى المدرسة حيثُ يدرسُ أخي.', exampleEn: 'I went to the school where my brother studies.', audio: 'حيثُ' },
            { word: 'إذ / إذا', pinyin: 'idh / idhā', translation: 'since (past) / if (future)', example: 'إذ كانَ الطقسُ جيداً، خرجنا.', exampleEn: 'Since the weather was good, we went out.', audio: 'إذ إذا' },
          ],
          grammar: {
            title: 'إنَّ وأخواتها — Inna and Its Sisters',
            explanation: 'إنَّ (inna) and its sisters are particles that introduce nominal sentences and cause the subject (اسم إنَّ) to take the accusative case (منصوب), while the predicate (خبر إنَّ) remains nominative.\n\n**The sisters of إنَّ:**\n• إنَّ (inna) — indeed, verily (emphasis)\n• أنَّ (anna) — that (in indirect speech/subordinate clauses)\n• كأنَّ (kaʾanna) — as if\n• لكنَّ (lākinna) — but\n• ليتَ (layta) — would that / if only (wish)\n• لعلَّ (laʿalla) — perhaps\n\n**Effect on case:**\n• Normal nominal sentence: التعليمُ أساسٌ (nominative both)\n• With إنَّ: إنَّ التعليمَ أساسٌ (accusative subject, nominative predicate)\n\n**Relative pronouns:**\n• الذي (masc. sg.) — who/which/that\n• التي (fem. sg.) — who/which/that\n• الذين (masc. pl.) — who\n• اللواتي / اللاتي (fem. pl.) — who\n• ما (for non-humans) — what/that\n\nThe relative clause must match the antecedent in gender and number.',
            examples: [
              { es: 'إنَّ اللغةَ العربيةَ من أغنى لغات العالم.', en: 'Inna l-lughat al-ʿarabiyyata min aghná lughāt al-ʿālam — Indeed, Arabic is among the richest languages in the world.' },
              { es: 'الطالبةُ التي تجتهدُ في دراستها ستنجحُ بإذن الله.', en: 'The female student who works hard in her studies will succeed, God willing.' },
            ],
          },
          dialogue: {
            title: 'Academic Essay Discussion',
            lines: [
              { speaker: 'Dr. Hassan', text: 'لاحظتُ في مقالتكَ أنَّكَ استخدمتَ الجملة الفعلية كثيراً. هل تعرفُ الفرقَ بينها وبين الجملة الاسمية؟', pinyin: 'Lāḥaẓtu fī maqālatika annaka istaʿmaltat al-jumla al-fiʿliyya kathīran. Hal taʿrifu al-farqa baynahā wa bayna al-jumla al-ismiyya?', translation: 'I noticed in your essay that you used verbal sentences a lot. Do you know the difference between it and nominal sentences?' },
              { speaker: 'Emeka', text: 'نعم، يا دكتور. الجملةُ الفعليةُ تبدأُ بفعلٍ، بينما الجملةُ الاسميةُ تبدأُ باسمٍ. إنَّ لكلٍّ منهما دلالةً مختلفةً.', pinyin: 'Naʿam, yā duktūr. Al-jumla al-fiʿliyya tabdaʾ bi-fiʿlin, baynamā al-jumla al-ismiyya tabdaʾ bi-ism. Inna li-kullin minhumā dalālatan mukhtalifatan.', translation: 'Yes, Doctor. The verbal sentence begins with a verb, while the nominal sentence begins with a noun. Indeed, each has a different connotation.' },
              {"speaker": "Dr. Hassan", "text": "أحسنتَ. وما إعرابُ كلمة \"الطالبَ\" في جملة \"إنَّ الطالبَ مجتهدٌ\"؟", "pinyin": "Aḥsanta. Wa mā iʿrābu kalimati \"aṭ-ṭāliba\" fī jumlati \"inna ṭ-ṭāliba mujtahidun\"?", "translation": "Well done. And what is the grammatical case of the word \"aṭ-ṭāliba\" in \"Indeed, the student is diligent\"?"},
              {"speaker": "Emeka", "text": "منصوبٌ لأنه اسمُ إنَّ.", "pinyin": "Manṣūbun li-annahu ismu inna.", "translation": "It is accusative because it is the subject of inna."},
            ],
          },
          exercises: [
            { type: 'mcq', q: 'إنَّ causes the subject to take which case?', options: ['nominative (مرفوع)','accusative (منصوب)','genitive (مجرور)','no change'], answer: 1, explanation: 'إنَّ and its sisters cause the subject (اسم إنَّ) to take the accusative case (منصوب — fatḥa or its equivalent). This is called "عمل إنَّ" (the governance of inna).' },
            { type: 'fill', q: 'Complete: "_____ الطالبَ المجتهدَ سينجحُ." (Indeed, the hardworking student will succeed.)', answer: 'إنَّ', explanation: 'إنَّ introduces the nominal sentence with emphasis. Note: الطالبَ is now accusative (منصوب) after إنَّ.' },
            { type: 'speak', q: 'Read this formal sentence aloud.', target: 'إنَّ التعليمَ أساسُ التقدُّم', pinyin: 'Inna t-taʿlīma asāsu t-taqaddum', tip: 'The shadda (ّ) doubles a consonant: hold the نّ in إنَّ and the دّ in التقدّم a little longer.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Which relative pronoun refers to a masculine plural human noun?', options: ['الذي','التي','الذين','ما'], answer: 2, explanation: 'الذين (alladhīna) is the masculine plural relative pronoun for humans: "الطلابُ الذين يجتهدون" = the students who work hard. "ما" is for non-humans.' },
            { type: 'mcq', q: '"ليتَ" (layta) expresses:', options: ['certainty','a wish or longing','doubt','contrast'], answer: 1, explanation: '"ليتَ" (layta) expresses a wish or longing, often for something impossible or unlikely: "ليتَ الشبابَ يعودُ" = Would that youth would return (lamenting lost youth).' },
          {"type": "mcq", "q": "Which particle means \"but\" and is one of the sisters of إنَّ?", "options": ["كأنَّ", "لكنَّ", "ليتَ", "لعلَّ"], "answer": 1, "explanation": "لكنَّ (lākinna) = but. كأنَّ = as if; ليتَ = would that; لعلَّ = perhaps."},
        ],
        },
        {
          id: 'ar-a-m1-l2', title: 'الكتابة الأدبية والبلاغة — Literary Writing and Rhetoric', order: 2, __reviewed: false,
          objectives: [
            'Identify and use key Arabic rhetorical figures',
            'Analyse a short literary passage',
            'Write a paragraph in elevated formal Arabic',
          ],
          vocab: [
            { word: 'التشبيه', pinyin: 'al-tashbīh', translation: 'simile (comparing two things)', example: 'العلمُ كالنورِ يُضيءُ الدرب.', exampleEn: 'Knowledge is like light that illuminates the path.', audio: 'التشبيه' },
            { word: 'الاستعارة', pinyin: 'al-istiʿāra', translation: 'metaphor', example: 'العلمُ نورٌ. (Knowledge is light — metaphor)', exampleEn: 'Knowledge is light.', audio: 'الاستعارة' },
            { word: 'الجناس', pinyin: 'al-jinās', translation: 'paronomasia (wordplay with similar sounds)', example: 'جدَّ مَن جَدَّ وَكسِلَ مَن كسِلَ.', exampleEn: 'He who strove, succeeded; he who was lazy, failed.', audio: 'الجناس' },
            { word: 'السجع', pinyin: 'al-sajʿ', translation: 'rhymed prose', example: 'مَن طلبَ العُلا سهِرَ الليالي.', exampleEn: 'Whoever seeks glory endures sleepless nights.', audio: 'السجع' },
            { word: 'المبالغة', pinyin: 'al-mubālagha', translation: 'hyperbole', example: 'فلانٌ يأكلُ كالجبل.', exampleEn: 'So-and-so eats like a mountain.', audio: 'المبالغة' },
          ],
          grammar: {
            title: 'Arabic Rhetorical Figures — علم البيان',
            explanation: 'Arabic has a rich tradition of rhetoric (بلاغة balāgha) dating back to pre-Islamic poetry. Key figures:\n\n**التشبيه (simile):** Uses كَ (like) or مثل (like):\n• العلمُ كالسيفِ = Knowledge is like a sword\n• Structure: مشبَّه (thing compared) + أداة التشبيه (like) + مشبَّه به (thing compared to)\n\n**الاستعارة (metaphor):** Omits the comparison tool:\n• "زَرعتُ في قلبِه الأمل" = I planted hope in his heart (planted = metaphor)\n\n**الكناية (metonymy):** Reference by association:\n• "طويلُ النجاد" = long sword-belt → tall (refers to height indirectly)\n\n**التضاد (antithesis):** Contrasting ideas in one sentence:\n• "الليلُ مهما طالَ لا بدَّ أن يُعقِبَه نهار" = No matter how long the night, day must follow\n\nThese devices are examined in Arabic literature courses and university entrance exams across the Arab world.',
            examples: [
              { es: 'البيانُ سِحرٌ حلالٌ. (قول نبوي)', en: 'Eloquence is lawful magic. (Prophetic saying — استعارة: calling eloquence "magic")' },
              { es: 'هو بحرٌ من العلم.', en: 'He is an ocean of knowledge. (استعارة: a person described as an ocean)' },
            ],
          },
          dialogue: {
            title: 'Literature Class Discussion',
            lines: [
              { speaker: 'Teacher', text: 'ما نوعُ الصورة البيانية في قول الشاعر: "العلمُ نورٌ والجهلُ ظلامٌ"؟', pinyin: 'Mā nawʿ al-ṣūra al-bayāniyya fī qawl al-shāʿir: "Al-ʿilm nūr wa-l-jahl ẓalām"?', translation: 'What type of rhetorical figure is in the poet\'s saying: "Knowledge is light and ignorance is darkness"?' },
              { speaker: 'Fatima', text: 'هذا استعارةٌ تصريحيةٌ، يا أستاذ. شبَّهَ العلمَ بالنور والجهلَ بالظلام دون استخدام أداة التشبيه.', pinyin: 'Hādhā istiʿāra taṣrīḥiyya, yā ustādh. Shabbaha al-ʿilma bi-l-nūr wa-l-jahla bi-l-ẓalām dūna istikhdam adat al-tashbīh.', translation: 'This is a declarative metaphor, teacher. He compared knowledge to light and ignorance to darkness without using a comparison tool.' },
              {"speaker": "Teacher", "text": "أحسنتِ. والآن، اكتبي جملةً فيها تشبيهٌ عن العلم.", "pinyin": "Aḥsanti. Wa-l-ān, uktubī jumlatan fīhā tashbīhun ʿani l-ʿilm.", "translation": "Well done. Now write a sentence containing a simile about knowledge."},
            ],
          },
          exercises: [
            { type: 'mcq', q: '"العلمُ كالنورِ" is an example of:', options: ['استعارة (metaphor)','تشبيه (simile)','كناية (metonymy)','جناس (paronomasia)'], answer: 1, explanation: '"العلمُ كالنورِ" uses the preposition كَ (like) — this makes it a تشبيه (simile). If the كَ were omitted and we said "العلمُ نورٌ", it would become استعارة (metaphor).' },
            { type: 'fill', q: 'A rhetorical figure that compares two things WITHOUT using a comparison tool is called: _____', answer: 'الاستعارة', explanation: 'الاستعارة (al-istiʿāra) = metaphor — comparison without using كَ, مثل, or similar words. "هو أسدٌ في المعركة" = He is a lion in battle.' },
          {"type": "mcq", "q": "Which sentence is a metaphor (استعارة)?", "options": ["العلمُ كالنور", "العلمُ نورٌ", "العلمُ مثلُ النور", "العلمُ يشبهُ النور"], "answer": 1, "explanation": "\"العلمُ نورٌ\" states the comparison directly with no comparison word, so it is a metaphor. The others use كـ, مثل or يشبه, which makes them similes."},
        ],
          assessment: [
            { type: 'mcq', q: 'التضاد (al-taḍādd) in rhetoric means:', options: ['simile','repetition','antithesis (contrasting opposites)','rhymed prose'], answer: 2, explanation: 'التضاد = antithesis — placing opposite concepts together for effect: "الليلُ والنهار", "الغنى والفقر". It creates balance and emphasis.' },
            { type: 'mcq', q: 'Which describes السجع (al-sajʿ)?', options: ['metaphor','simile','rhymed prose','paronomasia'], answer: 2, explanation: 'السجع (al-sajʿ) = rhymed prose — sentences ending with similar sounds, like poetry but in prose. Used in the Quran and classical Arabic literature.' },
          {"type": "mcq", "q": "\"العلمُ مثلُ النور\" is an example of:", "options": ["استعارة (metaphor)", "تشبيه (simile)", "كناية (metonymy)", "سجع (rhymed prose)"], "answer": 1, "explanation": "The word مثل (like) is a comparison tool, so this is a تشبيه."},
        ],
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPERT CURRICULUM (C2) — 1 module × 2 lessons per language
// Status: AI-assisted draft. __reviewed:false until expert verification.
// ─────────────────────────────────────────────────────────────────────────────
export const EXPERT_MODULES = {
  es: [{
    moduleId: 'es-e-m1', title: 'Dominio Lingüístico Avanzado', order: 1,
    lessons: [
      {
        id: 'es-e-m1-l1', title: 'Estilo y Registro: Del Coloquial al Culto', order: 1, __reviewed: false,
        objectives: ['Command the full range of Spanish registers','Use sophisticated idiomatic and literary language','Translate nuanced texts between Spanish and English'],
        vocab: [
          { word: 'no obstante', pinyin: null, translation: 'nevertheless / notwithstanding (formal)', example: 'Los datos son prometedores; no obstante, se requiere más investigación.', audio: 'no obstante' },
          { word: 'cabe señalar', pinyin: null, translation: 'it should be noted', example: 'Cabe señalar que este fenómeno no es nuevo.', audio: 'cabe señalar' },
          { word: 'en aras de', pinyin: null, translation: 'in the interest of / for the sake of', example: 'En aras de la transparencia, publicamos todos los datos.', audio: 'en aras de' },
          { word: 'dar cuenta de', pinyin: null, translation: 'to account for / to explain', example: 'Este modelo no da cuenta de todas las variables.', audio: 'dar cuenta de' },
          { word: 'si bien', pinyin: null, translation: 'although / even though (formal)', example: 'Si bien es cierto que mejoraron las condiciones, persisten los desafíos.', audio: 'si bien' },
        ],
        grammar: {
          title: 'Register Variation and Stylistic Choice',
          explanation: 'C2 mastery requires conscious control of register. The same idea in different registers:\n\n**Coloquial:** "La cosa es que no hay pasta."\n**Estándar:** "El problema es que no hay dinero."\n**Formal:** "La cuestión radica en la insuficiencia de recursos financieros."\n**Culto/académico:** "La problemática subyacente se vincula a la escasez de recursos económicos disponibles."\n\n**Nominalization** (turning verbs into nouns) is a hallmark of formal Spanish:\n• crecer → el crecimiento\n• implementar → la implementación\n• reducir → la reducción\n• desarrollar → el desarrollo\n\n**Passive and impersonal constructions:**\n• "Se constata que..." (It is noted that...)\n• "Ha quedado demostrado que..." (It has been demonstrated that...)\n• "Es de suponer que..." (It is to be supposed that...)',
          examples: [
            { es: 'Si bien se han logrado avances significativos, cabe señalar que la brecha digital sigue siendo un obstáculo para el desarrollo equitativo.', en: 'Although significant advances have been achieved, it should be noted that the digital divide remains an obstacle to equitable development.' },
          ],
        },
        dialogue: { title: 'Academic Conference', lines: [
          { speaker: 'Researcher', text: 'En aras de la objetividad científica, cabe reconocer que nuestros hallazgos no dan cuenta de todas las variables implicadas en este fenómeno complejo.', translation: 'In the interest of scientific objectivity, one must acknowledge that our findings do not account for all the variables involved in this complex phenomenon.' },
              {"speaker": "Moderator", "text": "Si bien el planteamiento es sólido, ¿podría precisar qué variables quedaron fuera del análisis?", "translation": "Although the approach is sound, could you specify which variables were left out of the analysis?"},
              {"speaker": "Researcher", "text": "Por supuesto. Cabe señalar que no se midió el factor socioeconómico, lo cual constituye una limitación del estudio.", "translation": "Of course. It should be noted that the socioeconomic factor was not measured, which is a limitation of the study."},
            ]},
        exercises: [
          { type: 'mcq', q: '"No obstante" belongs to which register?', options: ['colloquial','standard','formal/academic','slang'], answer: 2, explanation: '"No obstante" = nevertheless/notwithstanding — a formal connector. Colloquial equivalent: "pero" or "igual". Used in academic papers, formal reports, and serious journalism.' },
          { type: 'translate', q: 'Translate formally: "The problem is that the budget is insufficient."', answer: 'La problemática radica en la insuficiencia presupuestaria.', alt: ['El problema subyace en los recursos presupuestarios insuficientes.'], explanation: 'Formal Spanish prefers nominalization: "insuficiencia presupuestaria" (budget insufficiency) over "el presupuesto es insuficiente". "Radicar en" = to lie in / to be rooted in.' },
          { type: 'speak', q: 'Read this formal sentence aloud.', target: 'Cabe señalar que el fenómeno no es nuevo', tip: 'ñ sounds like "ny" in "canyon". Stress: se-ña-LAR and fe-NÓ-me-no.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
        ],
        assessment: [
          { type: 'mcq', q: 'Which is the most formal expression?', options: ['porque no hay dinero','dado que los recursos son limitados','ya que no hay plata','como no hay fondos'], answer: 1, explanation: '"Dado que los recursos son limitados" = Given that resources are limited — formal subordinate causal clause. "Porque" is neutral; "ya que no hay plata" is informal (plata = money, informal).' },
          { type: 'translate', q: 'Nominalize the verb: "The government failed to implement the policy." → Use the noun form.', answer: 'El fracaso del gobierno en la implementación de la política fue evidente.', explanation: 'Nominalization: "failed" → "el fracaso" (the failure); "implement" → "la implementación". This is a key feature of formal academic Spanish.' },
          {"type": "mcq", "q": "\"En aras de\" means:", "options": ["in spite of", "for the sake of", "instead of", "because of"], "answer": 1, "explanation": "\"En aras de la transparencia\" = for the sake of transparency. \"A pesar de\" = in spite of; \"en lugar de\" = instead of; \"debido a\" = because of."},
        ],
      },
      {
        id: 'es-e-m1-l2', title: 'Interpretación y Traducción', order: 2, __reviewed: false,
        objectives: ['Translate complex texts between Spanish and English','Interpret nuance, tone, and cultural connotation','Recognise and handle untranslatable concepts'],
        vocab: [
          { word: 'sobremesa', pinyin: null, translation: 'time spent at the table after eating (no English equivalent)', example: 'La sobremesa puede durar horas en España.', audio: 'sobremesa' },
          { word: 'madrugada', pinyin: null, translation: 'the early hours (1–5 AM) — more specific than English "night"', example: 'Llegaron a las tres de la madrugada.', audio: 'madrugada' },
          { word: 'tutear', pinyin: null, translation: 'to address someone using "tú" (no English equivalent)', example: '¿Le puedo tutear o prefiere que le trate de usted?', audio: 'tutear' },
          { word: 'trasnochar', pinyin: null, translation: 'to stay up all night', example: 'Trasnochamos estudiando para el examen.', audio: 'trasnochar' },
        ],
        grammar: {
          title: 'Translation as Interpretation: Untranslatable Concepts',
          explanation: 'Expert translation requires understanding that languages encode culture differently. Some Spanish concepts have no direct English equivalent:\n\n• **Sobremesa** — the pleasant conversation that happens after a meal, while still seated at the table. English requires a full phrase: "post-meal table conversation".\n\n• **Madrugada** — the small hours of the morning (roughly midnight to dawn). English "night" conflates evening and early morning.\n\n• **Vergüenza ajena** — the embarrassment you feel on behalf of someone else. English needs: "second-hand embarrassment" or "vicarious embarrassment".\n\n• **Estrenar** — to use/wear/show something for the first time. English has no single verb.\n\n**Translation principles:**\n1. Translate meaning, not words\n2. Preserve register (formal/informal)\n3. Maintain tone (ironic, sincere, academic)\n4. When a concept is untranslatable, use a cultural gloss\n5. Back-translate to check accuracy',
          examples: [
            { es: '"Tenemos que hablar" — the dread those four words in Spanish create.', en: 'We need to talk — the cultural weight is similar in both languages, but the emotional register may differ.' },
          ],
        },
        dialogue: { title: 'Translation Workshop', lines: [
          { speaker: 'Instructor', text: '¿Cómo traduciría "sobremesa" al inglés?', translation: 'How would you translate "sobremesa" into English?' },
          { speaker: 'Student', text: 'No hay una palabra exacta. Diría "the lingering conversation after a meal" o explicaría el concepto cultural entre paréntesis.', translation: 'There\'s no exact word. I would say "the lingering conversation after a meal" or explain the cultural concept in parentheses.' },
              {"speaker": "Instructor", "text": "Exacto. Una buena traducción conserva el significado y el tono, no solo las palabras.", "translation": "Exactly. A good translation preserves meaning and tone, not just the words."},
            ]},
        exercises: [
          { type: 'mcq', q: '"Madrugada" most precisely means:', options: ['midnight exactly','evening (6–10 PM)','the early hours (roughly midnight to dawn)','all of night-time'], answer: 2, explanation: '"Madrugada" specifically refers to the hours between roughly midnight and dawn (la madrugada = the small hours). "Noche" covers evening through night. "Medianoche" = midnight exactly.' },
          {"type": "fill", "q": "\"Tutear\" means to address someone using the informal pronoun \"_____\".", "answer": "tú", "explanation": "\"Tutear\" comes from \"tú\". The formal pronoun is \"usted\"."},
          {"type": "mcq", "q": "Which English phrase best conveys \"vergüenza ajena\"?", "options": ["jealousy", "second-hand embarrassment", "anger at oneself", "shyness"], "answer": 1, "explanation": "\"Vergüenza ajena\" is the embarrassment you feel on behalf of someone else. Shyness would be \"timidez\"."},
        ],
        assessment: [
          { type: 'mcq', q: 'When a Spanish concept has no English equivalent, a good translator should:', options: ['leave the Spanish word untranslated always','omit the concept','use a phrase or cultural gloss to convey the meaning','translate the closest similar word'], answer: 2, explanation: 'Expert translation uses a "cultural gloss" — a brief explanatory phrase that conveys the meaning and cultural context of an untranslatable concept. Example: "sobremesa (the leisurely post-meal table conversation)".' },
          {"type": "mcq", "q": "\"Estrenar\" means:", "options": ["to repair something", "to use or wear something for the first time", "to return something", "to borrow something"], "answer": 1, "explanation": "\"Estrenar un vestido\" = to wear a dress for the first time. English has no single verb for this."},
          {"type": "fill", "q": "Complete: \"Llegaron a las tres de la _____.\" (They arrived at three in the early hours.)", "answer": "madrugada", "explanation": "\"Madrugada\" is the period from about midnight to dawn."},
        ],
      },
    ],
  }],

  zh: [{
    moduleId: 'zh-e-m1', title: '高级汉语表达与文化', order: 1,
    lessons: [
      {
        id: 'zh-e-m1-l1', title: '成语与惯用语 — Chéngyǔ and Idioms', order: 1, __reviewed: false,
        objectives: ['Use common 成语 (4-character idioms) correctly','Understand the classical stories behind key idioms','Apply 成语 appropriately in context'],
        vocab: [
          { word: '一石二鸟', pinyin: 'yī shí èr niǎo', translation: 'kill two birds with one stone', example: '这个方案一石二鸟，既省钱又省时。', exampleEn: 'This plan kills two birds with one stone — saving both money and time.', audio: '一石二鸟' },
          { word: '半途而废', pinyin: 'bàn tú ér fèi', translation: 'to give up halfway', example: '做事不能半途而废。', exampleEn: 'One must not give up halfway.', audio: '半途而废' },
          { word: '马到成功', pinyin: 'mǎ dào chéng gōng', translation: 'immediate success (used as blessing)', example: '祝你马到成功！', exampleEn: 'Wishing you immediate success!', audio: '马到成功' },
          { word: '实事求是', pinyin: 'shí shì qiú shì', translation: 'seek truth from facts (Mao-era slogan)', example: '我们要实事求是地分析问题。', exampleEn: 'We must analyse problems by seeking truth from facts.', audio: '实事求是' },
          { word: '一帆风顺', pinyin: 'yī fān fēng shùn', translation: 'smooth sailing (all goes well)', example: '希望你一帆风顺！', exampleEn: 'I hope everything goes smoothly for you!', audio: '一帆风顺' },
        ],
        grammar: {
          title: '成语 Chéngyǔ — 4-Character Classical Idioms',
          explanation: '成语 (chéngyǔ) are fixed 4-character expressions derived from classical Chinese literature, history, or philosophy. They are ubiquitous in formal writing and educated speech.\n\n**Structure:** Most are exactly 4 characters. They cannot be modified or paraphrased — they function as fixed units.\n\n**Learning approach:**\n1. Learn the literal meaning of each character\n2. Learn the classical story (典故 diǎngù) behind it\n3. Understand the figurative meaning\n4. Practise in context\n\n**Example — 守株待兔 (shǒu zhū dài tù):**\n• 守 = guard, 株 = tree stump, 待 = wait for, 兔 = rabbit\n• Story: A farmer saw a rabbit run into a tree stump and die. He then waited by the stump for another rabbit — and starved.\n• Meaning: To wait passively for luck to repeat / to be rigidly set in one\'s ways\n\n**Usage note:** 成语 are used in written Chinese, formal speeches, and literature. Using them correctly signals high language proficiency; using them incorrectly is very noticeable.',
          examples: [
            { es: '我们要实事求是，不能半途而废。', en: 'Wǒmen yào shíshì qiúshì, bù néng bàntú ér fèi — We must seek truth from facts and must not give up halfway.' },
          ],
        },
        dialogue: { title: 'Using 成语 in Conversation', lines: [
          { speaker: 'Professor', text: '你能用"一石二鸟"造一个句子吗？', pinyin: 'Nǐ néng yòng "yī shí èr niǎo" zào yī gè jùzi ma?', translation: 'Can you make a sentence using "yī shí èr niǎo" (kill two birds with one stone)?' },
          { speaker: 'Amara', text: '可以。学语言不但能提高就业竞争力，还能拓展视野，真是一石二鸟。', pinyin: 'Kěyǐ. Xué yǔyán bùdàn néng tígāo jiùyè jìngzhēnglì, hái néng tuòzhǎn shìyě, zhēnshì yī shí èr niǎo.', translation: 'Sure. Learning a language not only improves employment competitiveness but also broadens horizons — it truly kills two birds with one stone.' },
              {"speaker": "Professor", "text": "很好。\"半途而废\"的反义词是什么？", "pinyin": "Hěn hǎo. \"Bàn tú ér fèi\" de fǎnyìcí shì shénme?", "translation": "Very good. What is the opposite of \"bàn tú ér fèi\"?"},
              {"speaker": "Amara", "text": "是\"持之以恒\"，意思是坚持不懈。", "pinyin": "Shì \"chí zhī yǐ héng\", yìsi shì jiānchí bù xiè.", "translation": "It is \"chí zhī yǐ héng\", meaning to persevere without letting up."},
            ]},
        exercises: [
          { type: 'mcq', q: '"半途而废" (bàn tú ér fèi) means:', options: ['to start something new','to give up halfway','to work twice as hard','to succeed eventually'], answer: 1, explanation: '"半途" = halfway, "而废" = and give up/abandon. The idiom means to abandon an effort before completion. Opposite: 持之以恒 (chí zhī yǐ héng) = to persevere.' },
          { type: 'speak', q: 'Say this idiom.', target: '实事求是', pinyin: 'shíshì qiúshì', tip: 'Four-character idioms are usually read in a 2 + 2 rhythm: shíshì | qiúshì.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          {"type": "mcq", "q": "Which idiom means \"smooth sailing\"?", "options": ["一石二鸟", "一帆风顺", "半途而废", "实事求是"], "answer": 1, "explanation": "\"一帆风顺\" (yī fān fēng shùn) literally means \"one sail, a favourable wind\"."},
        ],
        assessment: [
          { type: 'mcq', q: '"马到成功" is typically used:', options: ['to describe failure','as a blessing wishing someone success','to criticise someone\'s approach','in academic papers only'], answer: 1, explanation: '"马到成功" (mǎ dào chéng gōng) = "when the horse arrives, success comes" — used as a congratulatory blessing, similar to "wishing you every success". Common in greetings cards and well-wishes.' },
          {"type": "mcq", "q": "\"一石二鸟\" literally means:", "options": ["one stone, two birds", "one bird, two stones", "two stones, one bird", "one stone, one bird"], "answer": 0, "explanation": "一 = one, 石 = stone, 二 = two, 鸟 = bird. The idiom means achieving two goals with one action."},
          {"type": "fill", "q": "Complete the idiom: 半途而___ (give up halfway).", "answer": "废", "explanation": "\"半途而废\" (bàn tú ér fèi): 废 means to abandon."},
        ],
      },
      {
        id: 'zh-e-m1-l2', title: '中国文化与跨文化交流 — Cross-cultural Communication', order: 2, __reviewed: false,
        objectives: ['Navigate Chinese cultural concepts in communication','Understand face (面子 miànzi) and its role','Communicate effectively in formal Chinese contexts'],
        vocab: [
          { word: '面子', pinyin: 'miànzi', translation: 'face (social prestige, dignity)', example: '给他留点面子。', exampleEn: 'Leave him some face / Don\'t embarrass him.', audio: '面子' },
          { word: '关系', pinyin: 'guānxi', translation: 'relationships/connections (social network)', example: '在中国，关系很重要。', exampleEn: 'In China, relationships (guanxi) are very important.', audio: '关系' },
          { word: '客气', pinyin: 'kèqi', translation: 'polite/modest (to be overly polite)', example: '别客气，随便吃！', exampleEn: 'Don\'t be polite/formal — help yourself!', audio: '客气' },
          { word: '含蓄', pinyin: 'hánxù', translation: 'implicit/indirect (Chinese communication style)', example: '中国人的表达方式比较含蓄。', exampleEn: 'Chinese people\'s expression style is relatively indirect.', audio: '含蓄' },
        ],
        grammar: {
          title: '面子 and Indirect Communication in Chinese Culture',
          explanation: '**面子 (miànzi) — Face:**\nFace is one of the most important concepts in Chinese social interaction. It involves social prestige, dignity, and reputation.\n\n• Giving face (给面子): praising someone in public, respecting their status\n• Losing face (丢面子): being publicly embarrassed or contradicted\n• Saving face (保全面子): allowing someone to exit a difficult situation gracefully\n\nIn practice: A Chinese speaker may say "这个有点困难" (this is a bit difficult) when they mean "no" or "impossible" — direct refusal would cause loss of face.\n\n**含蓄 (hánxù) — Indirect Communication:**\nChinese communication is typically high-context and indirect. Understanding what is NOT said is as important as what IS said.\n\n• "还行" (hái xíng) literally = "still OK" but may mean "not great"\n• "考虑一下" (kǎolǜ yīxià) = "let me consider it" often means "no"\n• Excessive praise at the start of feedback may signal criticism to follow\n\nFor Nigerian learners: this indirectness contrasts with the directness common in many Nigerian cultural contexts.',
          examples: [
            { es: '"你做得不错" vs "你做得很好"', en: '"You did not bad" (含蓄 — polite understatement) vs "You did very well" (direct praise). The indirect form is often more culturally appropriate in formal Chinese settings.' },
          ],
        },
        dialogue: { title: 'Business Meeting', lines: [
          { speaker: 'Chinese Partner', text: '您的提案很有创意，我们需要回去好好研究一下。', pinyin: 'Nín de tí\'àn hěn yǒu chuàngyì, wǒmen xūyào huíqù hǎohǎo yánjiū yīxià.', translation: 'Your proposal is very creative, we need to go back and study it carefully.' },
          { speaker: 'Narrator (analysis)', text: '【这可能意味着他们对提案不满意，但不想直接拒绝，以保全双方的面子。】', pinyin: '(This may mean they are not satisfied with the proposal but do not want to refuse directly, in order to preserve both parties\' face.)', translation: '(This may mean they are not satisfied with the proposal but do not want to refuse directly — preserving face for both sides.)' },
              {"speaker": "Foreign Partner", "text": "我明白了。那我们下周再联系，谢谢您的时间。", "pinyin": "Wǒ míngbai le. Nà wǒmen xià zhōu zài liánxì, xièxie nín de shíjiān.", "translation": "I understand. Then we will be in touch again next week; thank you for your time."},
            ]},
        exercises: [
          { type: 'mcq', q: '"考虑一下" as a response to a business proposal often means:', options: ['definite yes','I will consider it seriously','a polite indirect refusal','I need more information'], answer: 2, explanation: 'In Chinese business culture, "考虑一下" (let me consider it) is often an indirect way of saying no, especially when followed by silence. Direct "no" (不) can cause loss of face.' },
          {"type": "mcq", "q": "Why might a Chinese colleague say \"这个有点困难\" instead of \"不行\"?", "options": ["They do not know the word 不行", "To avoid a direct refusal and save face", "Because it is the formal word for yes", "Because they want a discount"], "answer": 1, "explanation": "Indirect wording protects 面子 (face) for both sides. \"有点困难\" often signals a polite refusal."},
          {"type": "fill", "q": "给他留点_____。(Leave him some face.)", "answer": "面子", "explanation": "\"面子\" (miànzi) = face, social dignity. \"给面子\" = to show respect; \"丢面子\" = to lose face."},
        ],
        assessment: [
          { type: 'mcq', q: '面子 (miànzi) is best described as:', options: ['money','personal pride and social prestige','physical appearance','business connections'], answer: 1, explanation: '面子 (miànzi) = face — a complex social concept involving dignity, prestige, and respect. It governs much of Chinese social interaction. Losing face is deeply shameful; giving face is an important social gift.' },
          {"type": "mcq", "q": "\"含蓄\" (hánxù) describes communication that is:", "options": ["loud and direct", "indirect and implicit", "very fast", "written only"], "answer": 1, "explanation": "含蓄 means reserved or implicit: meaning is carried by context and tone rather than stated directly."},
          {"type": "fill", "q": "The network of personal relationships in Chinese social life is called _____ (pinyin, no tone marks).", "answer": "guanxi", "explanation": "关系 (guānxi) = relationships and connections.", "alt": ["guānxi", "关系"]},
        ],
      },
    ],
  }],

  fr: [{
    moduleId: 'fr-e-m1', title: 'Maîtrise de la Langue et de la Culture', order: 1,
    lessons: [
      {
        id: 'fr-e-m1-l1', title: 'Le Conditionnel et l\'Hypothèse', order: 1, __reviewed: false,
        objectives: ['Master conditional and hypothetical structures','Use si-clauses at all complexity levels','Command the conditional for hypothesis, reported speech and polite requests'],
        vocab: [
          { word: 'si + imparfait → conditionnel', pinyin: null, translation: 'If (unlikely condition) + would', example: 'Si j\'avais de l\'argent, je voyagerais.', audio: 'si imparfait conditionnel' },
          { word: 'si + plus-que-parfait → conditionnel passé', pinyin: null, translation: 'If (impossible past) + would have', example: 'Si j\'avais su, je serais venu.', audio: 'si plus-que-parfait' },
          { word: 'au cas où + conditionnel', pinyin: null, translation: 'in case (always conditional)', example: 'Prends un parapluie au cas où il pleuvrait.', audio: 'au cas où' },
          { word: 'quand bien même + conditionnel', pinyin: null, translation: 'even if (formal concession)', example: 'Quand bien même il insisterait, je refuserais.', audio: 'quand bien même' },
        ],
        grammar: {
          title: 'Hypothetical Structures — The Full Si-Clause System',
          explanation: '**Three si-clause types:**\n\n1. **Open condition** (likely/possible):\n   si + présent → présent/futur\n   "Si tu travailles, tu réussiras." (If you work, you will succeed.)\n\n2. **Unlikely condition** (hypothetical, unreal present/future):\n   si + imparfait → conditionnel présent\n   "Si j\'étais riche, je voyagerais." (If I were rich, I would travel.)\n\n3. **Impossible condition** (unreal past — it didn\'t happen):\n   si + plus-que-parfait → conditionnel passé\n   "Si j\'avais étudié, j\'aurais réussi." (If I had studied, I would have passed.)\n\n**Mixed conditionals** (past cause, present result):\n"Si j\'avais dormi, je ne serais pas fatigué maintenant."\n= If I had slept [past], I wouldn\'t be tired now [present].\n\n**Note:** "au cas où" always takes the conditional (never "si"):\n"Au cas où tu ne pourrais pas venir, préviens-moi."\n= In case you can\'t come, let me know.',
          examples: [
            { es: 'Si l\'Afrique avait eu accès à plus de ressources éducatives, son développement aurait été plus rapide.', en: 'If Africa had had access to more educational resources, its development would have been faster. (impossible past condition)' },
          ],
        },
        dialogue: { title: 'Philosophical Discussion', lines: [
          { speaker: 'Ngozi', text: 'Si tu pouvais changer une chose dans le monde, qu\'est-ce que tu changerais?', translation: 'If you could change one thing in the world, what would you change?' },
          { speaker: 'Kemi', text: 'Si j\'avais le pouvoir, j\'assurerais que chaque enfant ait accès à une éducation de qualité, quand bien même cela coûterait cher à mettre en place.', translation: 'If I had the power, I would ensure every child has access to quality education, even if it were expensive to implement.' },
              {"speaker": "Ngozi", "text": "Moi, je voudrais voyager davantage, mais si j'avais plus de temps, je commencerais par le Sénégal.", "translation": "I would like to travel more, but if I had more time, I would start with Senegal."},
            ]},
        exercises: [
          { type: 'mcq', q: '"Si j\'avais su, je _____venu." (impossible past condition)', options: ['serais','suis','serai','étais'], answer: 0, explanation: 'Impossible past: si + plus-que-parfait → conditionnel passé. "Je serais venu" = conditionnel passé of "venir" (être + past participle with être verb).' },
          { type: 'fill', q: '"Au cas où il _____ (pleuvoir), prenez un parapluie."', answer: 'pleuvrait', explanation: '"Au cas où" always requires the conditional. "Pleuvoir" conditional: il pleuvrait. Never use subjunctive after "au cas où".' },
          { type: 'speak', q: 'Say this hypothetical sentence.', target: 'Si j\'avais su, je serais venu', tip: 'French stresses the last syllable of a phrase, not each word. Keep the rhythm even.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
        ],
        assessment: [
          { type: 'mcq', q: 'Which sentence expresses an unlikely/hypothetical present condition?', options: ['Si tu étudies, tu réussiras.','Si tu étudiais, tu réussirais.','Si tu avais étudié, tu aurais réussi.','Étudie et tu réussiras.'], answer: 1, explanation: '"Si + imparfait → conditionnel présent" = hypothetical/unlikely present condition. Type 1 (likely): si + présent → futur. Type 3 (impossible past): si + plus-que-parfait → conditionnel passé.' },
          {"type": "mcq", "q": "Si j'avais étudié, j'_____ réussi.", "options": ["aurais", "avais", "ai", "aie"], "answer": 0, "explanation": "Impossible past condition: si + plus-que-parfait, then conditionnel passé in the main clause: j'aurais réussi."},
          {"type": "fill", "q": "Si tu _____ (pouvoir), tu viendrais avec nous.", "answer": "pouvais", "explanation": "Unlikely present condition: si + imparfait, then conditionnel présent: si tu pouvais, tu viendrais."},
        ],
      },
      {
        id: 'fr-e-m1-l2', title: 'La Francophonie — French Beyond France', order: 2, __reviewed: false,
        objectives: ['Understand the diversity of French-speaking world','Recognise major regional varieties of French','Appreciate French-speaking African culture and literature'],
        vocab: [
          { word: 'la Francophonie', pinyin: null, translation: 'the French-speaking world / community', example: 'Le Nigéria n\'est pas membre de la Francophonie mais partage des frontières avec des pays francophones.', audio: 'la Francophonie' },
          { word: 'le français africain', pinyin: null, translation: 'African French (regional variety)', example: 'Le français ivoirien a ses propres expressions et son rythme particulier.', audio: 'le français africain' },
          { word: 'le métissage culturel', pinyin: null, translation: 'cultural mixing / hybridity', example: 'La littérature africaine francophone illustre un riche métissage culturel.', audio: 'le métissage culturel' },
          { word: 'la négritude', pinyin: null, translation: 'Négritude movement (Senghor, Césaire)', example: 'Le mouvement de la Négritude a célébré les valeurs et la culture africaines.', audio: 'la négritude' },
        ],
        grammar: {
          title: 'The Francophonie — French as a World Language',
          explanation: 'French is spoken by approximately 300 million people on five continents, making it one of the most geographically widespread languages in the world.\n\n**French-speaking Africa (Afrique francophone):**\nOver 30 African countries use French as an official or co-official language, including: Côte d\'Ivoire, Sénégal, Cameroun, République Démocratique du Congo (largest French-speaking population), Niger, and Nigeria\'s neighbours.\n\n**African French features:**\n• Loanwords from local languages: "le maquis" (Côte d\'Ivoire: a local restaurant)\n• Different prosody/rhythm from European French\n• Some different vocabulary: "le taxi-brousse" (bush taxi)\n\n**La Négritude:**\nA literary and intellectual movement founded by Aimé Césaire (Martinique), Léopold Sédar Senghor (Sénégal), and Léon-Gontran Damas (Guiana) in the 1930s. It celebrated African cultural identity and rejected assimilation into European culture.\n\nFor Nigerian students: Nigeria borders Francophone countries (Bénin, Niger, Cameroun). French proficiency opens significant regional and international opportunities.',
          examples: [
            { es: '"Je suis un fleuve qui ne retourne pas à sa source." — Léopold Sédar Senghor', en: 'A famous line from Senghor — "I am a river that does not return to its source" — exploring African identity and cultural flow.' },
          ],
        },
        dialogue: { title: 'Discussing African Literature', lines: [
          { speaker: 'Student', text: 'Madame, pourquoi étudions-nous Senghor dans notre cours de français?', translation: 'Ma\'am, why do we study Senghor in our French class?' },
          { speaker: 'Teacher', text: 'Parce que Senghor incarne la richesse de la Francophonie. Il était à la fois président du Sénégal, poète majeur, et le premier Africain élu à l\'Académie française. Sa littérature nous rappelle que le français est aussi une langue africaine.', translation: 'Because Senghor embodies the richness of the Francophonie. He was simultaneously President of Senegal, a major poet, and the first African elected to the Académie française. His literature reminds us that French is also an African language.' },
              {"speaker": "Student", "text": "Donc le français que l'on parle à Abidjan est aussi légitime que celui de Paris?", "translation": "So the French spoken in Abidjan is as legitimate as that of Paris?"},
            ]},
        exercises: [
          { type: 'mcq', q: 'La Négritude was a movement that:', options: ['promoted French colonialism','celebrated African cultural identity and resisted assimilation','taught standard French grammar','originated in West Africa'], answer: 1, explanation: 'La Négritude celebrated African cultural values, aesthetics, and identity. It was a response to French colonial assimilation policies. Founded in Paris in the 1930s by Césaire, Senghor, and Damas.' },
          {"type": "mcq", "q": "A \"taxi-brousse\" is:", "options": ["a luxury taxi", "a bush taxi (shared transport between towns)", "a taxi driver", "a taxi stand"], "answer": 1, "explanation": "\"Taxi-brousse\" is a widely used term in francophone Africa for shared road transport between towns."},
          {"type": "fill", "q": "Le mouvement de la _____ a célébré les valeurs africaines.", "answer": "Négritude", "explanation": "Négritude was founded in the 1930s by Césaire, Senghor and Damas.", "alt": ["negritude", "négritude"]},
        ],
        assessment: [
          { type: 'mcq', q: 'Which country has the largest French-speaking population?', options: ['France','Canada','République Démocratique du Congo','Belgium'], answer: 2, explanation: 'The DRC (Democratic Republic of Congo) has an estimated 70–80 million French speakers, surpassing France\'s ~68 million. This makes sub-Saharan Africa home to the majority of the world\'s French speakers.' },
          {"type": "mcq", "q": "Who was the first African elected to the Académie française?", "options": ["Aimé Césaire", "Léopold Sédar Senghor", "Léon-Gontran Damas", "Frantz Fanon"], "answer": 1, "explanation": "Léopold Sédar Senghor, poet and first president of Senegal, was elected in 1983."},
          {"type": "mcq", "q": "Roughly how many people speak French worldwide?", "options": ["30 million", "300 million", "3 billion", "3 million"], "answer": 1, "explanation": "Estimates are around 300 million speakers across five continents."},
        ],
      },
    ],
  }],

  ar: [{
    moduleId: 'ar-e-m1', title: 'الفصاحة والإتقان اللغوي', order: 1,
    lessons: [
      {
        id: 'ar-e-m1-l1', title: 'الإعراب والنحو المتقدم — Advanced Arabic Grammar', order: 1, __reviewed: false,
        objectives: ['Understand Arabic case endings (الإعراب) systematically','Apply case rules to complex sentences','Recognise case changes in formal written Arabic'],
        vocab: [
          { word: 'الإعراب', pinyin: 'al-iʿrāb', translation: 'Arabic grammatical case system', example: 'الإعرابُ أساسُ النحو العربي.', exampleEn: 'Case inflection is the foundation of Arabic grammar.', audio: 'الإعراب' },
          { word: 'مرفوع / منصوب / مجرور', pinyin: 'marfūʿ / manṣūb / majrūr', translation: 'nominative / accusative / genitive', example: 'الطالبُ (مرفوع) يقرأُ كتاباً (منصوب).', exampleEn: 'The student (nominative) reads a book (accusative).', audio: 'مرفوع منصوب مجرور' },
          { word: 'الفاعل / المفعول به', pinyin: 'al-fāʿil / al-mafʿūl bih', translation: 'subject / direct object', example: 'قرأَ الطالبُ الكتابَ.', exampleEn: 'The student read the book.', audio: 'الفاعل المفعول به' },
          { word: 'المضاف والمضاف إليه', pinyin: 'al-muḍāf wa-l-muḍāf ilayh', translation: 'the construct state (iḍāfa)', example: 'كتابُ الطالبِ (book of the student)', exampleEn: 'The student\'s book.', audio: 'المضاف إليه' },
        ],
        grammar: {
          title: 'Arabic Case System — الإعراب',
          explanation: 'Arabic is a fully inflected language with three grammatical cases expressed through vowel endings:\n\n**الرفع (nominative — ـُ damm):** Used for subjects of verbs and nominal sentences\n• كتبَ الطالبُ الدرسَ = The student wrote the lesson (الطالبُ = subject)\n\n**النصب (accusative — ـَ fatḥa):** Used for direct objects, adverbs, and after certain particles\n• قرأتُ الكتابَ = I read the book (الكتابَ = direct object)\n• إنَّ الطالبَ مجتهدٌ = The student is diligent (إنَّ causes accusative)\n\n**الجر (genitive — ـِ kasra):** Used after prepositions and in the iḍāfa (construct) second term\n• ذهبتُ إلى المدرسةِ = I went to the school (بعد حرف الجر)\n• كتابُ الأستاذِ = the professor\'s book (الأستاذِ = second term of iḍāfa)\n\n**الإضافة (Construct State / iḍāfa):**\nThe first noun (المضاف) loses its tanwīn and definite article.\nThe second noun (المضاف إليه) takes genitive (kasra):\n• كتابُ الطالبِ (not كتابٌ الطالبِ) = the student\'s book',
          examples: [
            { es: 'يدرسُ الطلابُ في المكتبةِ كلَّ يومٍ.', en: 'Yadrisu l-ṭullābu fī l-maktabati kulla yawmin — The students study in the library every day. (الطلابُ = subject/nominative; المكتبةِ = after في/genitive; كلَّ يومٍ = adverbial/accusative)' },
          ],
        },
        dialogue: { title: 'Grammar Class', lines: [
          { speaker: 'Student', text: 'أستاذ، لماذا نقول "ذهبتُ إلى المدرسةِ" بالكسرة؟', pinyin: 'Ustādh, limādhā naqūl "Dhahabtu ilā l-madrasa" bi-l-kasra?', translation: 'Teacher, why do we say "I went to the school" with a kasra (ـِ)?' },
          { speaker: 'Teacher', text: 'لأن "المدرسة" مجرورة بعد حرف الجر "إلى". كل اسم يأتي بعد حرف جر يكون في حالة الجر.', pinyin: 'Li-anna "al-madrasa" majrūra baʿda ḥarf al-jarr "ilā". Kull ism yaʾtī baʿda ḥarf jarr yakūn fī ḥālat al-jarr.', translation: 'Because "al-madrasa" is in the genitive case after the preposition "ilā" (to). Every noun that comes after a preposition is in the genitive case.' },
              {"speaker": "Student", "text": "وماذا عن \"كتابُ الطالبِ\"؟ لماذا الكسرةُ على الباء؟", "pinyin": "Wa-mādhā ʿan \"kitābu ṭ-ṭālibi\"? Limādhā l-kasra ʿalā l-bāʾ?", "translation": "And what about \"the student's book\"? Why is there a kasra on the last letter?"},
              {"speaker": "Teacher", "text": "لأن \"الطالب\" مضافٌ إليه، والمضاف إليه مجرورٌ دائماً.", "pinyin": "Li-anna \"aṭ-ṭālib\" muḍāfun ilayhi, wa-l-muḍāfu ilayhi majrūrun dāʾiman.", "translation": "Because \"aṭ-ṭālib\" is the second term of the construct, and the second term is always genitive."},
            ]},
        exercises: [
          { type: 'mcq', q: 'In "قرأَ الطالبُ الكتابَ", what case is الطالبُ?', options: ['accusative (منصوب)','nominative (مرفوع)','genitive (مجرور)','no case (مبني)'], answer: 1, explanation: 'الطالبُ (with ḍamma ـُ) is the subject (الفاعل) and therefore nominative (مرفوع). The direct object الكتابَ (with fatḥa ـَ) is accusative (منصوب).' },
          {"type": "mcq", "q": "In \"ذهبتُ إلى المدرسةِ\", why does المدرسةِ end in kasra?", "options": ["It is the subject", "It follows the preposition إلى", "It follows إنَّ", "It is a verb"], "answer": 1, "explanation": "A noun after a preposition (حرف جر) is genitive (مجرور), shown here by the kasra."},
          {"type": "fill", "q": "In \"قرأتُ الكتابَ\", the direct object is in the case called _____ (Arabic term).", "answer": "منصوب", "explanation": "The direct object (المفعول به) is accusative: منصوب, shown by fatḥa.", "alt": ["النصب", "manṣūb"]},
        ],
        assessment: [
          { type: 'mcq', q: 'In "كتابُ الطالبِ", the word الطالبِ is in the genitive because:', options: ['it follows a verb','it is the subject','it is the second term of إضافة (construct state)','it follows إنَّ'], answer: 2, explanation: 'In the iḍāfa (construct state), the second noun (المضاف إليه) always takes the genitive case (مجرور with kasra ـِ). This applies even without a preposition.' },
          {"type": "mcq", "q": "Which vowel mark shows the accusative on a singular noun?", "options": ["ضمة ـُ", "فتحة ـَ", "كسرة ـِ", "سكون ـْ"], "answer": 1, "explanation": "Accusative (منصوب) = fatḥa ـَ. Nominative = ḍamma ـُ. Genitive = kasra ـِ."},
          {"type": "mcq", "q": "In \"يدرسُ الطالبُ\", الطالبُ is nominative because it is:", "options": ["the direct object", "the subject (الفاعل)", "after a preposition", "the second term of iḍāfa"], "answer": 1, "explanation": "The doer of a verb (الفاعل) is nominative (مرفوع), shown by ḍamma."},
        ],
      },
      {
        id: 'ar-e-m1-l2', title: 'الخطابة والكتابة الرسمية — Oratory and Formal Writing', order: 2, __reviewed: false,
        objectives: ['Write a formal Arabic essay or speech','Use rhetorical devices and elevated vocabulary','Understand Arabic discourse conventions'],
        vocab: [
          { word: 'أيها الحضور الكرام', pinyin: 'ayyuhā l-ḥuḍūr al-kirām', translation: 'Ladies and gentlemen (formal address)', example: 'أيها الحضور الكرام، يسعدني...', exampleEn: 'Distinguished guests, it is my pleasure...', audio: 'أيها الحضور الكرام' },
          { word: 'وختاماً', pinyin: 'wa-khitāman', translation: 'and in conclusion', example: 'وختاماً، أودُّ أن أشكر...', exampleEn: 'And in conclusion, I would like to thank...', audio: 'وختاماً' },
          { word: 'يُشرِّفني', pinyin: 'yusharrifunī', translation: 'it honours me / it is my honour', example: 'يُشرِّفني أن أتحدث إليكم اليوم.', exampleEn: 'It is my honour to speak to you today.', audio: 'يشرفني' },
          { word: 'أودُّ أن أُنوِّه', pinyin: 'awaddu an unawwiha', translation: 'I would like to draw attention to', example: 'أودُّ أن أُنوِّه بأهمية هذا الموضوع.', exampleEn: 'I would like to draw attention to the importance of this subject.', audio: 'أود أن أنوه' },
        ],
        grammar: {
          title: 'Formal Arabic Discourse — خطاب رسمي',
          explanation: 'Formal Arabic speech and writing follow conventions quite different from everyday spoken Arabic.\n\n**Speech opening formulas:**\n• بسم الله الرحمن الرحيم (In the name of God, the Most Gracious, the Most Merciful) — for Islamic contexts\n• أيها الحضور الكرام (Distinguished guests) — for mixed audiences\n• السادة الحضور / السيدات والسادة (Ladies and gentlemen)\n\n**Formal essay structure:**\n• المقدمة (Introduction): Define the topic, state its importance\n• صلب الموضوع (Body): Main arguments with evidence\n• الخاتمة (Conclusion): Summary and recommendations\n\n**Elevated vocabulary in formal writing:**\n• يتضح من خلال ذلك أن... = It becomes clear from this that...\n• في ضوء ما سبق... = In light of the foregoing...\n• مما لا شك فيه أن... = There is no doubt that...\n• تجدر الإشارة إلى أن... = It is worth noting that...\n\n**Avoid in formal Arabic:**\n• Colloquial (عامية) expressions\n• Mixing dialects with MSA\n• Short, simple sentences (too informal)',
          examples: [
            { es: 'تجدر الإشارة إلى أن التعليم يُعدُّ حجرَ الأساسِ في بناء المجتمعات المتقدمة.', en: 'Tajdur al-ishāra ilā anna l-taʿlīm yuʿaddu ḥajara l-asāsi fī bināʾ al-mujtamaʿāt al-mutaqaddima — It is worth noting that education is considered the cornerstone in building advanced societies.' },
          ],
        },
        dialogue: { title: 'Preparing a Speech', lines: [
          { speaker: 'Student', text: 'أستاذة، هل يمكنني أن أبدأ خطابي بـ"مرحباً"؟', pinyin: 'Ustādha, hal yumkinunī an abdaʾa khaṭābī bi-"marḥaban"?', translation: 'Teacher, can I start my speech with "marḥaban" (hello)?' },
          { speaker: 'Teacher', text: 'لا، "مرحباً" غير رسمية في الخطابات. ابدأ بـ"أيها الحضور الكرام" أو "السادة والسيدات". ويُفضَّل أن تبدأ بالبسملة إذا كان الجمهور مسلماً.', pinyin: 'Lā, "marḥaban" ghayr rasmiyya fī l-khaṭābāt. Ibdaʾ bi-"ayyuhā l-ḥuḍūr al-kirām" aw "al-sāda wa-l-sayyidāt". Wa-yufaḍḍal an tabdaʾ bi-l-basmala idhā kāna l-jumhūr musliman.', translation: 'No, "marḥaban" is informal for speeches. Start with "Distinguished guests" or "Ladies and gentlemen". It is preferred to begin with the basmala if the audience is Muslim.' },
              {"speaker": "Teacher", "text": "ممتاز. وفي الختام، لا تنسَ أن تشكر الحضور.", "pinyin": "Mumtāz. Wa-fī l-khitām, lā tansa an tashkura l-ḥuḍūr.", "translation": "Excellent. And at the end, do not forget to thank the audience."},
            ]},
        exercises: [
          { type: 'mcq', q: '"وختاماً" in a formal Arabic speech means:', options: ['furthermore','however','and in conclusion','in the beginning'], answer: 2, explanation: '"وختاماً" = and in conclusion — used to signal the closing of a speech or essay. Equivalent to "en conclusion" (French) or "en conclusión" (Spanish).' },
          { type: 'speak', q: 'Open a formal speech.', target: 'أيها الحضور الكرام', pinyin: 'Ayyuhā l-ḥuḍūr al-kirām', tip: 'ح (ḥ) is a breathy sound from the throat; it is softer than خ (kh).', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          {"type": "mcq", "q": "\"يُشرِّفني أن أتحدث إليكم\" is used to:", "options": ["end a speech", "express honour at speaking to the audience", "ask a question", "apologise"], "answer": 1, "explanation": "يُشرِّفني = it honours me. It is a typical formal opening line."},
        ],
        assessment: [
          { type: 'mcq', q: 'Which opening is most appropriate for a formal Arabic speech to a general audience?', options: ['مرحباً بالجميع!','هلا والله!','أيها الحضور الكرام','سلام عليكم'], answer: 2, explanation: '"أيها الحضور الكرام" (Distinguished guests) is the standard formal opening for Arabic speeches. "مرحباً" is too informal. "هلا والله" is Gulf dialect. "السلام عليكم" is appropriate for Muslim audiences as an Islamic greeting.' },
          {"type": "mcq", "q": "Which phrase signals the conclusion of a speech?", "options": ["وختاماً", "أيها الحضور", "في البداية", "على سبيل المثال"], "answer": 0, "explanation": "وختاماً = and in conclusion. أيها الحضور opens a speech; في البداية = at the beginning; على سبيل المثال = for example."},
          {"type": "mcq", "q": "Why avoid \"مرحباً\" to open a formal speech?", "options": ["It is grammatically wrong", "It is too informal for formal oratory", "It is only used in writing", "It is a dialect word"], "answer": 1, "explanation": "\"مرحباً\" is a casual greeting. Formal speeches open with \"أيها الحضور الكرام\" or similar."},
        ],
      },
    ],
  }],
};
