// ─────────────────────────────────────────────────────────────────────────────
// INTERMEDIATE CURRICULUM — B1–B2 draft content (not yet human-reviewed)
// 3 lessons per language. Advanced/Expert levels use AI generation
// every lesson is a draft until a teacher records a review
// ─────────────────────────────────────────────────────────────────────────────

export const INTERMEDIATE_MODULES = {

  // ═══════════════════════════════════════════════════════════════════════════
  // SPANISH INTERMEDIATE
  // ═══════════════════════════════════════════════════════════════════════════
  es: [
    {
      moduleId: 'es-i-m1', title: 'Daily Life & Routines', order: 1,
      lessons: [
        {
          id: 'es-i-m1-l1', title: 'Daily Routines — La rutina diaria', order: 1,
          objectives: ['Describe daily routines using reflexive verbs','Use present tense correctly','Talk about time and schedules'],
          vocab: [
            { word: 'despertarse', pinyin: null, translation: 'to wake up (reflexive)', example: 'Me despierto a las seis.', audio: 'despertarse' },
            { word: 'ducharse', pinyin: null, translation: 'to shower (reflexive)', example: 'Me ducho cada mañana.', audio: 'ducharse' },
            { word: 'desayunar', pinyin: null, translation: 'to have breakfast', example: 'Desayuno arroz y plátano.', audio: 'desayunar' },
            { word: 'ir al trabajo / a la escuela', pinyin: null, translation: 'to go to work / school', example: 'Voy a la escuela en autobús.', audio: 'ir a la escuela' },
            { word: 'almorzar (o→ue)', pinyin: null, translation: 'to have lunch (stem-changing)', example: 'Almuerzo a las dos.', audio: 'almorzar' },
            { word: 'acostarse (o→ue)', pinyin: null, translation: 'to go to bed (reflexive, stem-changing)', example: 'Me acuesto a las diez.', audio: 'acostarse' },
            { word: 'a las... / a las... y media', pinyin: null, translation: 'at ... / at ... thirty', example: 'Me despierto a las seis y media.', audio: 'a las seis y media' },
            { word: 'por la mañana / tarde / noche', pinyin: null, translation: 'in the morning / afternoon / evening', example: 'Estudio por la noche.', audio: 'por la mañana' },
          ],
          grammar: {
            title: 'Reflexive Verbs — Verbos reflexivos',
            explanation: 'Reflexive verbs show that the subject performs an action on themselves. They always use reflexive pronouns:\n\n• me (I → myself)\n• te (you → yourself)\n• se (he/she/you formal → himself/herself/yourself)\n• nos (we → ourselves)\n• os (you all → yourselves — Spain)\n• se (they/you all → themselves/yourselves)\n\nThe reflexive pronoun goes BEFORE the conjugated verb:\n• Me despierto = I wake (myself) up\n• Te duchas = You shower (yourself)\n• Se acuesta = He/She goes to bed\n\nStem-changing verbs also change their vowel in all forms except nosotros/vosotros:\n• almorzar: almuerzo, almuerzas, almuerza, almorzamos, almorzáis, almuerzan',
            examples: [
              { es: 'Todos los días me levanto a las seis.', en: 'Every day I get up at six.' },
              { es: '¿A qué hora te acuestas normalmente?', en: 'What time do you normally go to bed?' },
              { es: 'Mi hermana se peina antes de desayunar.', en: 'My sister combs her hair before having breakfast.' },
            ],
          },
          dialogue: {
            title: 'Morning Routines',
            lines: [
              { speaker: 'Amaka', text: '¿A qué hora te despiertas los días de escuela?', translation: 'What time do you wake up on school days?' },
              { speaker: 'Chidi', text: 'Me despierto a las cinco y media. Me ducho, desayuno y salgo a las seis y cuarto.', translation: 'I wake up at five thirty. I shower, have breakfast and leave at a quarter past six.' },
              { speaker: 'Amaka', text: '¡Qué temprano! Yo me despierto a las seis. El autobús llega a las siete.', translation: 'How early! I wake up at six. The bus arrives at seven.' },
              { speaker: 'Chidi', text: 'Y por la noche, ¿a qué hora te acuestas?', translation: 'And in the evening, what time do you go to bed?' },
              { speaker: 'Amaka', text: 'Me acuesto a las diez, después de estudiar.', translation: 'I go to bed at ten, after studying.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Choose the correct reflexive pronoun: "_____ despierto a las siete."', options: ['Te','Me','Se','Nos'], answer: 1, explanation: '"Me" is the first-person singular reflexive pronoun. "Me despierto" = I wake up.' },
            { type: 'mcq', q: '"Almorzar" is a stem-changing verb (o→ue). How do you say "She has lunch"?', options: ['Ella almuerza','Ella almorza','Ella almorzas','Ella almuerzo'], answer: 0, explanation: '"Almorzar" stem changes o→ue in all forms except nosotros/vosotros: almuerzo, almuerzas, almuerza, almorzamos, almorzáis, almuerzan.' },
            { type: 'fill', q: 'Complete: "¿A qué hora _____ acuestas?" (What time do you go to bed?)', answer: 'te', explanation: '"Te acuestas" = you go to bed. Reflexive pronoun "te" for the tú form.' },
            { type: 'translate', q: 'Translate: "We shower every morning."', answer: 'Nos duchamos todas las mañanas.', alt: ['Nos duchamos cada mañana.'], explanation: '"Ducharse" reflexive: nos duchamos (we shower ourselves). "Todas las mañanas" = every morning.' },
            { type: 'speak', q: 'Say this sentence about your routine.', target: 'Me levanto a las seis y media', tip: 'Stress the middle of "levanto" (le-VAN-to). In Spanish, v and b sound the same.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Which sentence uses a reflexive verb correctly?', options: ['Me despierto tarde los sábados.','Yo despierto tarde los sábados.','Te despierto tarde los sábados.','Despierto me tarde los sábados.'], answer: 0, explanation: '"Me despierto" is correct. The reflexive pronoun "me" goes BEFORE the verb.' },
            { type: 'mcq', q: 'The stem-changing verb "acostarse" (o→ue) in the "ella" form is:', options: ['ella acosta','ella acueste','ella acuesta','ella se acosta'], answer: 2, explanation: '"Acostarse" with o→ue change: me acuesto, te acuestas, se acuesta, nos acostamos, os acostáis, se acuestan.' },
            { type: 'fill', q: 'Complete: "Mis padres _____ acuestan a las once." (My parents go to bed at eleven.)', answer: 'se', explanation: '"Se" is the third-person plural reflexive pronoun. "Se acuestan" = they go to bed.' },
          ],
        },
        {
          id: 'es-i-m1-l2', title: 'Shopping & Money — Las compras', order: 2,
          objectives: ['Shop in Spanish','Ask prices and quantities','Use demonstrative pronouns'],
          vocab: [
            { word: '¿Cuánto cuesta/cuestan?', pinyin: null, translation: 'How much does it/do they cost?', example: '¿Cuánto cuesta este libro?', audio: '¿Cuánto cuesta?' },
            { word: 'Me gustaría...', pinyin: null, translation: 'I would like...', example: 'Me gustaría comprar esto.', audio: 'Me gustaría' },
            { word: 'demasiado caro/cara', pinyin: null, translation: 'too expensive', example: 'Es demasiado caro para mí.', audio: 'demasiado caro' },
            { word: '¿Tiene...?', pinyin: null, translation: 'Do you have...?', example: '¿Tiene talla grande?', audio: '¿Tiene?' },
            { word: 'el precio', pinyin: null, translation: 'the price', example: '¿Cuál es el precio?', audio: 'el precio' },
            { word: 'el descuento', pinyin: null, translation: 'the discount', example: 'Hay un descuento del diez por ciento.', audio: 'el descuento' },
            { word: 'el cambio', pinyin: null, translation: 'the change (money returned)', example: 'Aquí está su cambio.', audio: 'el cambio' },
            { word: 'la talla / el tamaño', pinyin: null, translation: 'the size', example: '¿Tiene este en talla mediana?', audio: 'la talla' },
          ],
          grammar: {
            title: 'Demonstrative Adjectives and Pronouns',
            explanation: 'Demonstratives show which item you are referring to based on distance:\n\n• este/esta/estos/estas — this/these (near me)\n• ese/esa/esos/esas — that/those (near you)\n• aquel/aquella/aquellos/aquellas — that/those (far from both)\n\nThey agree in gender and number with the noun.\nAs pronouns (standalone, without a noun): éste, ése, aquél (add accent — now optional in modern Spanish)\n\nExamples:\n• este libro = this book\n• esa camisa = that shirt (near you)\n• ¿Cuánto cuesta éste? = How much does this one cost?',
            examples: [
              { es: 'Este vestido es bonito pero ese es más barato.', en: 'This dress is pretty but that one is cheaper.' },
              { es: '¿Tiene estas sandalias en talla 38?', en: 'Do you have these sandals in size 38?' },
            ],
          },
          dialogue: {
            title: 'At the Market',
            lines: [
              { speaker: 'Customer', text: '¿Cuánto cuesta esta tela?', translation: 'How much does this fabric cost?' },
              { speaker: 'Vendor', text: 'Dos mil nairas por metro, señora.', translation: 'Two thousand naira per metre, ma\'am.' },
              { speaker: 'Customer', text: '¡Es demasiado caro! ¿Me puede dar un descuento?', translation: 'That\'s too expensive! Can you give me a discount?' },
              { speaker: 'Vendor', text: 'Le doy un diez por ciento de descuento. Mil ochocientas nairas.', translation: 'I\'ll give you a ten percent discount. One thousand eight hundred naira.' },
              { speaker: 'Customer', text: 'De acuerdo. Me llevo tres metros.', translation: 'Agreed. I\'ll take three metres.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Which demonstrative is used for something near the speaker?', options: ['aquel/aquella','ese/esa','este/esta','todos/todas'], answer: 2, explanation: '"Este/esta" = this (near me). "Ese/esa" = that (near you). "Aquel/aquella" = that over there (far from both).' },
            { type: 'fill', q: '¿Cuánto _____ esas naranjas? (How much do those oranges cost?)', answer: 'cuestan', explanation: '"Cuestan" is the plural of "cuesta" (costar). "Esas naranjas" is plural, so the verb must be plural too.' },
          {"type": "fill", "q": "_____ camisa es más barata que esa. (This shirt is cheaper than that one.)", "answer": "Esta", "explanation": "\"Camisa\" is feminine singular and near the speaker, so the demonstrative is \"esta\"."},
        ],
          assessment: [
            { type: 'mcq', q: '"Me gustaría" is equivalent to:', options: ['I like','I would like','I want','I need'], answer: 1, explanation: '"Me gustaría" = I would like (conditional form of "gustar"). More polite than "quiero" (I want).' },
            { type: 'mcq', q: 'Fill in: "_____ pantalones son más baratos que _____ chaqueta."', options: ['Este / esta','Estos / esa','Esta / este','Esas / estos'], answer: 1, explanation: '"Pantalones" is masculine plural → "estos". "Chaqueta" is feminine singular → "esa".' },
          ],
        },
        {
          id: 'es-i-m1-l3', title: 'Past Experiences — El pretérito', order: 3,
          objectives: ['Form the preterite (past) tense','Talk about completed actions','Use time expressions with the past'],
          vocab: [
            { word: 'ayer', pinyin: null, translation: 'yesterday', example: 'Ayer fui al mercado.', audio: 'ayer' },
            { word: 'la semana pasada', pinyin: null, translation: 'last week', example: 'La semana pasada visité a mi abuela.', audio: 'la semana pasada' },
            { word: 'el año pasado', pinyin: null, translation: 'last year', example: 'El año pasado aprendí español.', audio: 'el año pasado' },
            { word: 'hace dos días / semanas', pinyin: null, translation: 'two days / weeks ago', example: 'Hace dos días llegué a Lagos.', audio: 'hace dos días' },
            { word: 'visitar', pinyin: null, translation: 'to visit', example: 'Visité Abuja el mes pasado.', audio: 'visitar' },
            { word: 'comer', pinyin: null, translation: 'to eat (preterite: comí)', example: 'Comí jollof rice ayer.', audio: 'comer' },
            { word: 'ir (preterite: fui)', pinyin: null, translation: 'to go (irregular preterite)', example: 'Fui a la escuela ayer.', audio: 'fui' },
            { word: 'ser (preterite: fue)', pinyin: null, translation: 'to be (irregular — same as ir)', example: 'La fiesta fue el sábado.', audio: 'fue' },
          ],
          grammar: {
            title: 'The Preterite Tense — El pretérito indefinido',
            explanation: 'The preterite is used for completed actions in the past. Think of it as "snapped photos" — specific moments that are finished.\n\nRegular -AR endings: -é, -aste, -ó, -amos, -asteis, -aron\n  hablar → hablé, hablaste, habló, hablamos, hablasteis, hablaron\n\nRegular -ER/-IR endings: -í, -iste, -ió, -imos, -isteis, -ieron\n  comer → comí, comiste, comió, comimos, comisteis, comieron\n\nIrregular verbs (must memorize):\n  ir/ser → fui, fuiste, fue, fuimos, fuisteis, fueron\n  tener → tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron\n  hacer → hice, hiciste, hizo, hicimos, hicisteis, hicieron\n\nNote: Note: "ir" and "ser" have identical preterite forms — context tells them apart.',
            examples: [
              { es: 'Ayer comí suya y bebí zobo.', en: 'Yesterday I ate suya and drank zobo.' },
              { es: 'Ella fue a Abuja la semana pasada.', en: 'She went to Abuja last week.' },
              { es: '¿Qué hiciste el fin de semana?', en: 'What did you do at the weekend?' },
            ],
          },
          dialogue: {
            title: 'Talking About the Weekend',
            lines: [
              { speaker: 'Tunde', text: '¿Qué hiciste el fin de semana?', translation: 'What did you do at the weekend?' },
              { speaker: 'Ngozi', text: 'El sábado fui al mercado con mi madre. Compramos tela y comida.', translation: 'On Saturday I went to the market with my mother. We bought fabric and food.' },
              { speaker: 'Tunde', text: '¿Y el domingo?', translation: 'And on Sunday?' },
              { speaker: 'Ngozi', text: 'El domingo descansé y estudié para el examen de matemáticas.', translation: 'On Sunday I rested and studied for the maths exam.' },
              { speaker: 'Tunde', text: 'Yo también estudié. El examen fue muy difícil, ¿verdad?', translation: 'I also studied. The exam was very difficult, right?' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'The preterite of "hablar" (yo) is:', options: ['hablé','hablo','hablaba','hablaré'], answer: 0, explanation: 'The yo preterite of -AR verbs adds -é: hablé, comí, viví.' },
            { type: 'mcq', q: '"Fui" is the preterite form of:', options: ['only "ir"','only "ser"','both "ir" and "ser"','neither'], answer: 2, explanation: '"Ir" and "ser" share identical preterite forms: fui, fuiste, fue, fuimos, fuisteis, fueron. Context determines meaning.' },
            { type: 'fill', q: 'Ayer _____ (comer, yo) arroz con pollo. (Yesterday I ate rice with chicken.)', answer: 'comí', explanation: '"Comer" is an -ER verb. Preterite yo form: comí.' },
          ],
          assessment: [
            { type: 'mcq', q: 'What is the preterite of "hacer" (ellos)?', options: ['hacieron','hicieron','hiçieron','haceron'], answer: 1, explanation: '"Hacer" is irregular: hice, hiciste, hizo, hicimos, hicisteis, hicieron. Note the spelling change c→z in "hizo" (él/ella).' },
            { type: 'fill', q: 'La semana pasada (visitar, nosotros) _____ la mezquita. (Last week we visited the mosque.)', answer: 'visitamos', explanation: 'The nosotros preterite of -AR verbs is the same as present: visitamos. Context (+ "la semana pasada") shows it\'s past.' },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // MANDARIN INTERMEDIATE
  // ═══════════════════════════════════════════════════════════════════════════
  zh: [
    {
      moduleId: 'zh-i-m1', title: 'Daily Life — 日常生活', order: 1,
      lessons: [
        {
          id: 'zh-i-m1-l1', title: 'Talking About Family — 家庭', order: 1,
          objectives: ['Name family members in Mandarin','Use measure words correctly','Describe family relationships'],
          vocab: [
            { word: '家庭', pinyin: 'jiātíng', translation: 'family', example: '我的家庭很大。', exampleEn: 'My family is large.', audio: '家庭' },
            { word: '父亲 / 爸爸', pinyin: 'fùqīn / bàba', translation: 'father / dad', example: '我爸爸是老师。', exampleEn: 'My dad is a teacher.', audio: '爸爸' },
            { word: '母亲 / 妈妈', pinyin: 'mǔqīn / māma', translation: 'mother / mum', example: '我妈妈在市场工作。', exampleEn: 'My mum works at the market.', audio: '妈妈' },
            { word: '哥哥 / 弟弟', pinyin: 'gēge / dìdi', translation: 'older brother / younger brother', example: '我有一个哥哥。', exampleEn: 'I have one older brother.', audio: '哥哥弟弟' },
            { word: '姐姐 / 妹妹', pinyin: 'jiějie / mèimei', translation: 'older sister / younger sister', example: '我妹妹是学生。', exampleEn: 'My younger sister is a student.', audio: '姐姐妹妹' },
            { word: '祖父 / 爷爷', pinyin: 'zǔfù / yéye', translation: 'grandfather (paternal)', example: '爷爷住在拉各斯。', exampleEn: 'Grandpa lives in Lagos.', audio: '爷爷' },
            { word: '有', pinyin: 'yǒu', translation: 'to have / there is', example: '我有两个妹妹。', exampleEn: 'I have two younger sisters.', audio: '有' },
            { word: '个', pinyin: 'gè', translation: 'general measure word (for people)', example: '三个同学。', exampleEn: 'Three classmates.', audio: '个' },
          ],
          grammar: {
            title: 'Measure Words — 量词 (liàngcí)',
            explanation: 'In Mandarin, when you count nouns you MUST use a measure word between the number and the noun. There is no plural marker (no -s like in English).\n\nThe most common measure word is 个 (gè) — used for people and general items:\n• 一个人 (yī gè rén) = one person\n• 三个学生 (sān gè xuésheng) = three students\n\nOther important measure words:\n• 本 (běn) — for books: 两本书 = two books\n• 张 (zhāng) — for flat things: 一张纸 = one piece of paper\n• 只 (zhī) — for animals: 三只猫 = three cats\n• 条 (tiáo) — for long, flexible things: 一条鱼 = one fish\n\nNote: In Chinese, relatives are named differently depending on which side of the family (father\'s side vs mother\'s side) and birth order (older vs younger). This is more specific than English!',
            examples: [
              { es: '我有一个哥哥和两个妹妹。', en: 'Wǒ yǒu yī gè gēge hé liǎng gè mèimei — I have one older brother and two younger sisters.' },
              { es: '她家有四口人。', en: 'Tā jiā yǒu sì kǒu rén — Her family has four people. (口 kǒu = measure word for family members)' },
            ],
          },
          dialogue: {
            title: 'Describing Your Family',
            lines: [
              { speaker: 'Wei', text: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', translation: 'How many people are in your family?' },
              { speaker: 'Emeka', text: '我家有五口人。爸爸、妈妈、两个姐姐和我。', pinyin: 'Wǒ jiā yǒu wǔ kǒu rén. Bàba, māma, liǎng gè jiějie hé wǒ.', translation: 'My family has five people. Father, mother, two older sisters and me.' },
              { speaker: 'Wei', text: '你姐姐们做什么工作？', pinyin: 'Nǐ jiějiemen zuò shénme gōngzuò?', translation: 'What do your sisters do for work?' },
              { speaker: 'Emeka', text: '大姐是护士，二姐在大学读书。', pinyin: 'Dà jiě shì hùshi, èr jiě zài dàxué dúshū.', translation: 'My eldest sister is a nurse, my second sister is studying at university.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Which measure word is used for books (本 běn, 张 zhāng, or 个 gè)?', options: ['个 (gè)','本 (běn)','张 (zhāng)','只 (zhī)'], answer: 1, explanation: '本 (běn) is the measure word for books, notebooks and bound items. "两本书" = two books.' },
            { type: 'mcq', q: '"Older sister" in Mandarin is:', options: ['妹妹 (mèimei)','姐姐 (jiějie)','妈妈 (māma)','女儿 (nǚ\'ér)'], answer: 1, explanation: '姐姐 (jiějie) = older sister. 妹妹 (mèimei) = younger sister. Mandarin distinguishes age in sibling terms.' },
            { type: 'fill', q: '我有三___朋友。(I have three friends.) [measure word]', answer: '个', explanation: '个 (gè) is the general/default measure word used for people, friends, and many general objects.' },
            { type: 'speak', q: 'Say: I have an older brother.', target: '我有一个哥哥', pinyin: 'Wǒ yǒu yí gè gēge', tip: '一 is said "yí" before a fourth tone (一个). The second ge in 哥哥 is light (neutral tone).', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: '我家有___口人 — which number means "four"?', options: ['三','四','五','六'], answer: 1, explanation: '四 (sì) = four. Note: 四 is considered unlucky in some Chinese cultures because it sounds like 死 (sǐ = death).' },
            { type: 'mcq', q: 'The measure word for animals (like cats and dogs) is:', options: ['个 (gè)','本 (běn)','只 (zhī)','条 (tiáo)'], answer: 2, explanation: '只 (zhī) is used for small animals like cats, birds, and some dogs. 条 is used for fish and other long flexible things.' },
          ],
        },
        {
          id: 'zh-i-m1-l2', title: 'Food & Ordering — 点餐', order: 2,
          objectives: ['Order food in a restaurant','Use "want" and "would like"','Describe food using adjectives'],
          vocab: [
            { word: '我要.../ 我想要...', pinyin: 'Wǒ yào... / Wǒ xiǎng yào...', translation: 'I want... / I would like...', example: '我要一碗米饭。', exampleEn: 'I want a bowl of rice.', audio: '我要' },
            { word: '好吃', pinyin: 'hǎochī', translation: 'delicious (lit. "good eat")', example: '这个菜很好吃！', exampleEn: 'This dish is delicious!', audio: '好吃' },
            { word: '辣', pinyin: 'là', translation: 'spicy', example: '这个太辣了。', exampleEn: 'This is too spicy.', audio: '辣' },
            { word: '一碗', pinyin: 'yī wǎn', translation: 'one bowl (measure word 碗 for bowls)', example: '一碗汤。', exampleEn: 'One bowl of soup.', audio: '一碗' },
            { word: '服务员', pinyin: 'fúwùyuán', translation: 'waiter / server', example: '服务员，买单！', exampleEn: 'Waiter, the bill please!', audio: '服务员' },
            { word: '买单 / 结账', pinyin: 'mǎi dān / jié zhàng', translation: 'to pay the bill', example: '我们买单吧。', exampleEn: 'Let\'s pay the bill.', audio: '买单' },
            { word: '多少钱？', pinyin: 'Duōshao qián?', translation: 'How much money? / What\'s the price?', example: '这碗面多少钱？', exampleEn: 'How much is this bowl of noodles?', audio: '多少钱' },
          ],
          grammar: {
            title: 'The particle 了 (le) — completed action',
            explanation: '了 (le) has two main uses:\n\n1. After a verb to show an action is completed:\n   • 我吃了。(Wǒ chī le) — I have eaten / I ate.\n   • 他来了。(Tā lái le) — He has arrived.\n\n2. At the end of a sentence to show a changed situation:\n   • 天气热了。(Tiānqì rè le) — The weather has become hot. (change)\n   • 我懂了。(Wǒ dǒng le) — I understand now. (new state)\n\nNote: 了 does NOT equal English "past tense". Mandarin has no tense in the English sense — time is shown by words like 昨天 (yesterday), 已经 (already), 刚才 (just now).\n\nNegation: use 没 (méi) instead of 了:\n• 我没吃。(Wǒ méi chī) — I didn\'t eat. (NOT 我不吃了)',
            examples: [
              { es: '我已经吃了。', en: 'Wǒ yǐjīng chī le — I have already eaten.' },
              { es: '服务员来了。', en: 'Fúwùyuán lái le — The waiter has come.' },
            ],
          },
          dialogue: {
            title: 'Ordering at a Restaurant',
            lines: [
              { speaker: 'Server', text: '欢迎，请问几位？', pinyin: 'Huānyíng, qǐng wèn jǐ wèi?', translation: 'Welcome, how many people?' },
              { speaker: 'Kemi', text: '两位，谢谢。', pinyin: 'Liǎng wèi, xièxie.', translation: 'Two, thank you.' },
              { speaker: 'Server', text: '请看菜单，想要点什么？', pinyin: 'Qǐng kàn càidān, xiǎng yào diǎn shénme?', translation: 'Please look at the menu, what would you like to order?' },
              { speaker: 'Kemi', text: '我要一碗炒饭和一杯水。不要太辣。', pinyin: 'Wǒ yào yī wǎn chǎofàn hé yī bēi shuǐ. Bù yào tài là.', translation: 'I want one bowl of fried rice and one cup of water. Not too spicy.' },
              { speaker: 'Server', text: '好的，马上来。', pinyin: 'Hǎo de, mǎshàng lái.', translation: 'OK, it will come right away.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: '了 (le) after a verb indicates:', options: ['future tense','a question','a completed action','politeness'], answer: 2, explanation: '了 after a verb shows completion. 我吃了 = I ate / I have eaten. It is NOT a past tense marker — time context matters.' },
            { type: 'mcq', q: 'The correct negative of 我吃了 (I ate) is:', options: ['我不吃了','我没吃','我吃没了','我不了吃'], answer: 1, explanation: 'To negate a completed action, use 没 (méi) WITHOUT 了: 我没吃 (wǒ méi chī) = I didn\'t eat.' },
          {"type": "fill", "q": "他来___。(He has arrived.) [particle]", "answer": "了", "explanation": "了 (le) after the verb or at the end of the sentence marks a completed action or a new situation."},
        ],
          assessment: [
            { type: 'mcq', q: '多少钱 (duōshao qián) means:', options: ['very expensive','How much money?','I want to pay','no money'], answer: 1, explanation: '多少 (duōshao) = how much/many, 钱 (qián) = money. "多少钱？" is the standard way to ask a price.' },
            { type: 'fill', q: '服务员，我要一___炒饭。(Waiter, I want one bowl of fried rice.)', answer: '碗', explanation: '碗 (wǎn) is the measure word for bowls. 一碗炒饭 = one bowl of fried rice. 碗 is also the word for "bowl" as a noun.' },
          ],
        },
        {
          id: 'zh-i-m1-l3', title: 'Directions — 问路', order: 3,
          objectives: ['Ask for and give directions','Use location words','Understand "how far" and "how long"'],
          vocab: [
            { word: '请问，...在哪里？', pinyin: 'Qǐng wèn, ... zài nǎlǐ?', translation: 'Excuse me, where is...?', example: '请问，厕所在哪里？', exampleEn: 'Excuse me, where is the toilet?', audio: '请问在哪里' },
            { word: '左边 / 右边', pinyin: 'zuǒbiān / yòubiān', translation: 'left side / right side', example: '银行在左边。', exampleEn: 'The bank is on the left.', audio: '左边右边' },
            { word: '前面 / 后面', pinyin: 'qiánmiàn / hòumiàn', translation: 'in front / behind', example: '超市在学校前面。', exampleEn: 'The supermarket is in front of the school.', audio: '前面后面' },
            { word: '直走', pinyin: 'zhí zǒu', translation: 'go straight', example: '一直走，然后右转。', exampleEn: 'Go straight, then turn right.', audio: '直走' },
            { word: '转弯', pinyin: 'zhuǎn wān', translation: 'to turn', example: '在红灯左转。', exampleEn: 'Turn left at the traffic light.', audio: '转弯' },
            { word: '多远？/ 多长时间？', pinyin: 'Duō yuǎn? / Duō cháng shíjiān?', translation: 'How far? / How long (time)?', example: '从这里到车站多远？', exampleEn: 'How far is it from here to the station?', audio: '多远多长时间' },
          ],
          grammar: {
            title: 'Location Words — 在 + Place',
            explanation: 'In Mandarin, to say where something IS, use:\n\nSubject + 在 (zài) + Place\n• 图书馆在学校里面。(The library is inside the school.)\n• 我在家。(I am at home.)\n\nLocation words (place words) come AFTER the main noun, unlike English:\n• 桌子上面 (zhuōzi shàngmiàn) = on top of the table (lit: "table above")\n• 书包里面 (shūbāo lǐmiàn) = inside the schoolbag (lit: "schoolbag inside")\n\nCommon location words:\n• 上面 (shàngmiàn) = above / on top\n• 下面 (xiàmiàn) = below / under\n• 里面 (lǐmiàn) = inside\n• 外面 (wàimiàn) = outside\n• 旁边 (pángbiān) = beside / next to\n• 对面 (duìmiàn) = opposite / across from',
            examples: [
              { es: '超市在银行旁边。', en: 'Chāoshì zài yínháng pángbiān — The supermarket is next to the bank.' },
              { es: '书在桌子上面。', en: 'Shū zài zhuōzi shàngmiàn — The book is on top of the table.' },
            ],
          },
          dialogue: {
            title: 'Asking for Directions',
            lines: [
              { speaker: 'Temi', text: '请问，最近的药店在哪里？', pinyin: 'Qǐng wèn, zuìjìn de yàodiàn zài nǎlǐ?', translation: 'Excuse me, where is the nearest pharmacy?' },
              { speaker: 'Passer-by', text: '一直走，过了邮局右转，药店就在你左边。', pinyin: 'Yīzhí zǒu, guòle yóujú yòu zhuǎn, yàodiàn jiù zài nǐ zuǒbiān.', translation: 'Go straight, pass the post office and turn right, the pharmacy is on your left.' },
              { speaker: 'Temi', text: '从这里走多长时间？', pinyin: 'Cóng zhèlǐ zǒu duō cháng shíjiān?', translation: 'How long does it take to walk from here?' },
              { speaker: 'Passer-by', text: '大概五分钟。不远。', pinyin: 'Dàgài wǔ fēnzhōng. Bù yuǎn.', translation: 'About five minutes. Not far.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: '在 (zài) is used to express:', options: ['time','location/existence at a place','possession','comparison'], answer: 1, explanation: '在 (zài) = to be at/in/on a location. 我在家 = I am at home. 书在桌子上 = The book is on the table.' },
            { type: 'mcq', q: '"On top of the table" in Chinese is:', options: ['桌子里面','桌子旁边','桌子上面','桌子下面'], answer: 2, explanation: '上面 (shàngmiàn) = above/on top. Location words come AFTER the reference noun in Chinese: 桌子上面 = table-above = on the table.' },
          {"type": "mcq", "q": "Which phrase means \"go straight\"?", "options": ["左转", "右转", "一直走", "后面"], "answer": 2, "explanation": "一直走 (yīzhí zǒu) = go straight. 左转 = turn left; 右转 = turn right; 后面 = behind."},
        ],
          assessment: [
            { type: 'fill', q: '图书馆在学校_____。(The library is inside the school.)', answer: '里面', explanation: '里面 (lǐmiàn) = inside. Chinese location words follow the reference noun: 学校里面 = inside the school.' },
            { type: 'mcq', q: 'To ask "How far is it?" in Chinese:', options: ['多长时间？','多远？','在哪里？','怎么走？'], answer: 1, explanation: '多远 (duō yuǎn) = how far. 多长时间 (duō cháng shíjiān) = how long (time). 在哪里 = where is it. 怎么走 = how do I get there.' },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH INTERMEDIATE
  // ═══════════════════════════════════════════════════════════════════════════
  fr: [
    {
      moduleId: 'fr-i-m1', title: 'Daily Life — La vie quotidienne', order: 1,
      lessons: [
        {
          id: 'fr-i-m1-l1', title: 'Talking About the Past — Le passé composé', order: 1,
          objectives: ['Form the passé composé (French past tense)','Choose between avoir and être as auxiliary','Use past participles correctly'],
          vocab: [
            { word: 'j\'ai mangé', pinyin: null, translation: 'I ate / I have eaten', example: 'J\'ai mangé du jollof hier.', audio: "j'ai mangé" },
            { word: 'je suis allé(e)', pinyin: null, translation: 'I went', example: 'Je suis allée au marché.', audio: 'je suis allé' },
            { word: 'hier', pinyin: null, translation: 'yesterday', example: 'Hier, j\'ai étudié toute la journée.', audio: 'hier' },
            { word: 'la semaine dernière', pinyin: null, translation: 'last week', example: 'La semaine dernière, nous sommes allés à l\'église.', audio: 'la semaine dernière' },
            { word: 'déjà', pinyin: null, translation: 'already', example: 'J\'ai déjà fini mes devoirs.', audio: 'déjà' },
            { word: 'ne...pas encore', pinyin: null, translation: 'not yet', example: 'Je n\'ai pas encore mangé.', audio: 'pas encore' },
          ],
          grammar: {
            title: 'Le Passé Composé — French Past Tense',
            explanation: 'The passé composé is the main past tense in spoken French. It is formed with:\n\nAuxiliary verb (avoir OR être, in present tense) + past participle\n\n1. Most verbs use AVOIR:\n   • j\'ai parlé (I spoke), tu as mangé (you ate), il a fini (he finished)\n   • Past participles: -ER → -é (parler→parlé), -IR → -i (finir→fini), -RE → -u (vendre→vendu)\n\n2. 17 "movement/state" verbs use ÊTRE (remember with DR MRS VANDERTRAMP):\n   aller (allé), venir (venu), partir (parti), arriver (arrivé), naître (né), mourir (mort), rester (resté), tomber (tombé), etc.\n\nNote: With ÊTRE verbs, the past participle AGREES with the subject:\n   • Il est allé (he went)\n   • Elle est allée (she went) ← adds -e\n   • Ils sont allés (they went, masculine/mixed) ← adds -s\n   • Elles sont allées (they went, all female) ← adds -es\n\nNegation: ne...pas goes around the auxiliary:\n   • Je n\'ai pas mangé (I didn\'t eat)\n   • Elle n\'est pas venue (She didn\'t come)',
            examples: [
              { es: 'Hier, j\'ai visité le marché.', en: 'Yesterday I visited the market.' },
              { es: 'Ma sœur est arrivée ce matin.', en: 'My sister arrived this morning. (être + agreement)' },
              { es: 'Nous n\'avons pas encore fini.', en: 'We haven\'t finished yet.' },
            ],
          },
          dialogue: {
            title: 'What did you do yesterday?',
            lines: [
              { speaker: 'Amara', text: 'Qu\'est-ce que tu as fait hier?', translation: 'What did you do yesterday?' },
              { speaker: 'Kemi', text: 'Le matin, je suis allée à l\'école. L\'après-midi, j\'ai étudié à la bibliothèque.', translation: 'In the morning, I went to school. In the afternoon, I studied at the library.' },
              { speaker: 'Amara', text: 'Et le soir? Tu as regardé la télé?', translation: 'And in the evening? Did you watch TV?' },
              { speaker: 'Kemi', text: 'Non, je n\'ai pas regardé la télé. J\'ai aidé ma mère à préparer le dîner.', translation: 'No, I didn\'t watch TV. I helped my mother prepare dinner.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'The passé composé of "manger" (je) is:', options: ['je mangeais','j\'ai mangé','j\'ai manger','je mange'], answer: 1, explanation: '"Manger" uses AVOIR. Past participle: mangé. So: j\'ai mangé (I ate).' },
            { type: 'mcq', q: 'Which verb uses ÊTRE in the passé composé?', options: ['manger','parler','aller','finir'], answer: 2, explanation: '"Aller" (to go) is one of the DR MRS VANDERTRAMP verbs that uses ÊTRE. Je suis allé(e) = I went.' },
            { type: 'fill', q: 'Elle _____ partie tôt. (She left early.) [auxiliary verb]', answer: 'est', explanation: '"Partir" uses ÊTRE. "Elle est partie" — note the -e agreement because the subject is feminine.' },
            { type: 'speak', q: 'Say: I ate bread yesterday.', target: 'J\'ai mangé du pain hier', tip: '"é" in "mangé" is a closed "ay" sound. "pain" has a nasal vowel with no n sound.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'mcq', q: 'Why does "elle est arrivée" have an extra "e" on arrivée?', options: ['because "arriver" is irregular','because the subject is feminine and the verb uses être','because it\'s a question','because of the final -er ending'], answer: 1, explanation: 'With ÊTRE verbs in passé composé, the past participle agrees with the subject. Feminine subject → add -e. "Elle est arrivée" vs "Il est arrivé".' },
            { type: 'fill', q: 'Hier, nous _____ allés au cinéma. (Yesterday we went to the cinema.)', answer: 'sommes', explanation: '"Aller" uses ÊTRE. "Nous sommes allés" — auxiliary "sommes" (we are) + "allés" (past participle, masculine plural agreement).' },
          ],
        },
        {
          id: 'fr-i-m1-l2', title: 'Food and Restaurants — La nourriture', order: 2,
          objectives: ['Order food in French','Describe tastes and preferences','Use partitive articles (du, de la, des)'],
          vocab: [
            { word: 'je voudrais...', pinyin: null, translation: 'I would like...', example: 'Je voudrais une table pour deux, s\'il vous plaît.', audio: 'je voudrais' },
            { word: 'l\'addition, s\'il vous plaît', pinyin: null, translation: 'The bill, please', example: 'Garçon! L\'addition, s\'il vous plaît.', audio: "l'addition s'il vous plaît" },
            { word: 'C\'est délicieux!', pinyin: null, translation: 'It\'s delicious!', example: 'Ce riz est délicieux!', audio: "C'est délicieux" },
            { word: 'du / de la / des', pinyin: null, translation: 'some (partitive article)', example: 'Je mange du pain et de la soupe.', audio: 'du de la des' },
            { word: 'sans gluten / végétarien', pinyin: null, translation: 'gluten-free / vegetarian', example: 'Avez-vous des plats végétariens?', audio: 'végétarien' },
          ],
          grammar: {
            title: 'Partitive Articles — du, de la, de l\', des',
            explanation: 'Partitive articles express "some" of an uncountable noun. In French you cannot say "I eat bread" without an article — you must say "I eat SOME bread".\n\nRules:\n• du (+ masculine noun): Je mange du riz. (I eat some rice.)\n• de la (+ feminine noun): Je bois de la limonade. (I drink some lemonade.)\n• de l\' (+ noun starting with vowel): Je mange de l\'igname. (I eat some yam.)\n• des (+ plural noun): Je mange des légumes. (I eat some vegetables.)\n\nAfter NEGATION, all partitives become simply "de" (or d\' before vowel):\n• Je ne mange pas de riz. (I don\'t eat rice.)\n• Elle ne boit pas de lait. (She doesn\'t drink milk.)\n\nNote: This is a common mistake for English speakers who don\'t use articles with uncountable nouns!',
            examples: [
              { es: 'Je veux du jus d\'orange.', en: 'I want some orange juice.' },
              { es: 'Tu manges de la viande?', en: 'Do you eat meat?' },
              { es: 'Non, je ne mange pas de viande.', en: 'No, I don\'t eat meat. (de after negation)' },
            ],
          },
          dialogue: {
            title: 'At a Restaurant',
            lines: [
              { speaker: 'Server', text: 'Bonsoir! Vous avez réservé?', translation: 'Good evening! Do you have a reservation?' },
              { speaker: 'Customer', text: 'Non, mais est-ce qu\'il y a une table de libre?', translation: 'No, but is there a free table?' },
              { speaker: 'Server', text: 'Oui, bien sûr. Vous désirez?', translation: 'Yes, of course. What would you like?' },
              { speaker: 'Customer', text: 'Je voudrais du poulet et des légumes. Et de l\'eau minérale, s\'il vous plaît.', translation: 'I would like some chicken and some vegetables. And some mineral water, please.' },
              { speaker: 'Server', text: 'Parfait! Et comme dessert?', translation: 'Perfect! And for dessert?' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Fill in: "Je mange _____ pain." (I eat some bread.)', options: ['du','de la','des','de'], answer: 0, explanation: '"Pain" (bread) is masculine in French. So partitive = "du". "Je mange du pain." After negation it becomes: "Je ne mange pas de pain."' },
            { type: 'mcq', q: 'After a negative verb, partitive articles become:', options: ['du/de la/des','de/d\'','le/la/les','un/une'], answer: 1, explanation: 'After negation, all partitive articles (du, de la, des) become simply "de" (or "d\'" before vowel): "Je ne bois pas de café."' },
          {"type": "mcq", "q": "Je bois _____ eau. (I drink some water.)", "options": ["du", "de la", "de l'", "des"], "answer": 2, "explanation": "\"Eau\" starts with a vowel sound, so the partitive article becomes \"de l'\"."},
        ],
          assessment: [
            { type: 'fill', q: 'Je ne mange pas _____ viande. (I don\'t eat meat.)', answer: 'de', explanation: 'After negation (ne...pas), all partitive articles change to "de". Je ne mange pas de viande.' },
            { type: 'mcq', q: '"Je voudrais" is more polite than "je veux" because:', options: ['it uses the past tense','it uses the conditional mood','it uses the subjunctive','it is a different verb'], answer: 1, explanation: '"Voudrais" is the conditional of "vouloir" = I would like. The conditional is more polite than the present "je veux" (I want). Always use "je voudrais" in restaurants and formal situations.' },
          ],
        },
        {
          id: 'fr-i-m1-l3', title: 'Travel & Transport — Les transports', order: 3,
          objectives: ['Discuss transport options','Buy tickets in French','Use futur proche (near future)'],
          vocab: [
            { word: 'un billet', pinyin: null, translation: 'a ticket', example: 'Je voudrais un billet pour Abuja.', audio: 'un billet' },
            { word: 'aller-retour / aller simple', pinyin: null, translation: 'return / one-way', example: 'Un aller-retour Lagos-Abuja, s\'il vous plaît.', audio: 'aller-retour' },
            { word: 'le vol', pinyin: null, translation: 'the flight', example: 'Le vol part à dix heures.', audio: 'le vol' },
            { word: 'en retard / à l\'heure', pinyin: null, translation: 'late / on time', example: 'Le bus est en retard de vingt minutes.', audio: 'en retard à l\'heure' },
            { word: 'aller + infinitif', pinyin: null, translation: 'going to (near future)', example: 'Je vais voyager demain.', audio: 'je vais voyager' },
          ],
          grammar: {
            title: 'Le Futur Proche — Going to (Near Future)',
            explanation: 'The futur proche expresses what is going to happen soon. It is formed with:\n\naller (conjugated in present) + infinitive\n\n• je vais partir — I am going to leave\n• tu vas prendre — you are going to take\n• il/elle va arriver — he/she is going to arrive\n• nous allons voyager — we are going to travel\n• vous allez attendre — you are going to wait\n• ils/elles vont payer — they are going to pay\n\nNegation: ne...pas goes around "aller":\n• Je ne vais pas partir. — I am not going to leave.\n\nThis is the most common way to talk about near-future plans in spoken French — more common than the formal "futur simple".',
            examples: [
              { es: 'Demain, je vais prendre l\'avion pour Abuja.', en: 'Tomorrow I am going to take the plane to Abuja.' },
              { es: 'Nous n\'allons pas rater le bus!', en: 'We are not going to miss the bus!' },
            ],
          },
          dialogue: {
            title: 'At the Bus Station',
            lines: [
              { speaker: 'Traveller', text: 'Bonjour. Je voudrais un billet pour Abuja.', translation: 'Hello. I would like a ticket to Abuja.' },
              { speaker: 'Agent', text: 'Aller simple ou aller-retour?', translation: 'One way or return?' },
              { speaker: 'Traveller', text: 'Aller-retour, s\'il vous plaît. Le prochain bus part à quelle heure?', translation: 'Return, please. What time does the next bus leave?' },
              { speaker: 'Agent', text: 'Le bus va partir à quatorze heures. Il arrive à Abuja à dix-neuf heures.', translation: 'The bus is going to leave at 14:00. It arrives in Abuja at 19:00.' },
              { speaker: 'Traveller', text: 'Parfait, merci. Combien ça coûte?', translation: 'Perfect, thank you. How much does it cost?' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'Futur proche is formed with:', options: ['avoir + infinitive','être + past participle','aller + infinitive','vouloir + infinitive'], answer: 2, explanation: 'Futur proche = aller (present) + infinitive. "Je vais manger" = I am going to eat.' },
            { type: 'fill', q: 'Nous _____ voyager demain. (We are going to travel tomorrow.)', answer: 'allons', explanation: '"Aller" conjugated for "nous" = "allons". Futur proche: nous allons voyager.' },
          {"type": "mcq", "q": "Choose the near future of \"je mange\":", "options": ["je vais manger", "j'ai mangé", "je mangerai", "je mangeais"], "answer": 0, "explanation": "Futur proche = aller (present) + infinitive: je vais manger."},
        ],
          assessment: [
            { type: 'mcq', q: '"Elle ne va pas partir" means:', options: ['She is not going to leave','She didn\'t leave','She should leave','She left'], answer: 0, explanation: 'Ne...pas around "va" negates the futur proche: "Elle ne va pas partir" = She is not going to leave.' },
            { type: 'mcq', q: '"Aller-retour" means:', options: ['one way','return ticket','platform number','delay'], answer: 1, explanation: '"Aller-retour" = return (there and back). "Aller simple" = one way (one direction only).' },
          ],
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // ARABIC INTERMEDIATE
  // ═══════════════════════════════════════════════════════════════════════════
  ar: [
    {
      moduleId: 'ar-i-m1', title: 'الحياة اليومية — Daily Life', order: 1,
      lessons: [
        {
          id: 'ar-i-m1-l1', title: 'الأسرة والمنزل — Family & Home', order: 1,
          objectives: ['Describe your family in Arabic','Use dual and plural forms','Understand masculine/feminine agreement'],
          vocab: [
            { word: 'الأب / الأم', pinyin: 'al-ab / al-umm', translation: 'the father / the mother', example: 'أبي مدرس وأمي طبيبة.', exampleEn: 'My father is a teacher and my mother is a doctor.', audio: 'الأب الأم' },
            { word: 'الأخ / الأخت', pinyin: 'al-akh / al-ukht', translation: 'the brother / the sister', example: 'لدي أخ وأختان.', exampleEn: 'I have one brother and two sisters.', audio: 'الأخ الأخت' },
            { word: 'لدي / عندي', pinyin: 'ladayya / ʿindī', translation: 'I have', example: 'لدي أسرة كبيرة.', exampleEn: 'I have a large family.', audio: 'لدي' },
            { word: 'كبير / صغير', pinyin: 'kabīr / ṣaghīr', translation: 'big / small (m)', example: 'أخي الكبير طالب جامعي.', exampleEn: 'My older brother is a university student.', audio: 'كبير صغير' },
            { word: 'يسكن / تسكن في', pinyin: 'yaskunu / taskunu fī', translation: 'he/she lives in', example: 'تسكن أسرتي في لاغوس.', exampleEn: 'My family lives in Lagos.', audio: 'يسكن في' },
            { word: 'المنزل / البيت', pinyin: 'al-manzil / al-bayt', translation: 'the house / home', example: 'بيتنا كبير وجميل.', exampleEn: 'Our home is big and beautiful.', audio: 'المنزل' },
          ],
          grammar: {
            title: 'Dual and Plural in Arabic',
            explanation: 'Arabic has THREE number categories: singular, dual (exactly 2), and plural (3+).\n\nDual: add ـان (-ān) to the noun (for subjects/nominative case):\n• أخ (brother) → أخان (two brothers)\n• أخت (sister) → أختان (two sisters)\n• كتاب (book) → كتابان (two books)\n\nPlural: Arabic has "broken plurals" — the word itself changes internally (like English "man/men"):\n• كتاب → كتب (books)\n• مدرس → مدرسون (male teachers) / مدرسات (female teachers)\n• طالب → طلاب (male students) / طالبات (female students)\n\nFeminine agreement:\nAdjectives must agree with the noun in gender AND number:\n• مدرس كبير (a senior male teacher)\n• مدرسة كبيرة (a senior female teacher) ← add ة\n• مدرسون كبار (senior male teachers) ← broken plural adjective',
            examples: [
              { es: 'لديَّ أختان كبيرتان.', en: 'Ladayya ukhtān kabīratān — I have two older sisters. (dual noun + dual adjective)' },
              { es: 'في صفي عشرون طالباً وطالبةً.', en: 'Fī ṣaffī ʿishrūna ṭāliban wa ṭālibatan — In my class there are twenty male and female students.' },
            ],
          },
          dialogue: {
            title: 'Describing Your Family',
            lines: [
              { speaker: 'Ali', text: 'هل عندك إخوة؟', pinyin: 'Hal ʿindaka ikhwa?', translation: 'Do you have siblings?' },
              { speaker: 'Fatima', text: 'نعم، لديَّ أخ واحد وأختان. أخي يسكن في أبوجا.', pinyin: 'Naʿam, ladayya akhun wāḥidun wa ukhtān. Akhī yaskunu fī Abūjā.', translation: 'Yes, I have one brother and two sisters. My brother lives in Abuja.' },
              { speaker: 'Ali', text: 'وأختاك؟', pinyin: 'Wa ukhtāki?', translation: 'And your (two) sisters?' },
              { speaker: 'Fatima', text: 'الكبيرة طبيبة، والصغيرة طالبة في المدرسة الثانوية.', pinyin: 'Al-kabīra ṭabība, wa al-ṣaghīra ṭāliba fī al-madrasa al-thānawiyya.', translation: 'The older one is a doctor, and the younger is a student in secondary school.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'The dual of أخ (brother) is:', options: ['أخان','أخون','إخوة','أخين'], answer: 0, explanation: 'The nominative dual adds ـان: أخ → أخان (two brothers). The accusative/genitive dual adds ـين: أخين.' },
            { type: 'mcq', q: 'Arabic has _____ number categories:', options: ['two (singular/plural)','three (singular/dual/plural)','four','only singular'], answer: 1, explanation: 'Arabic has THREE numbers: singular (1), dual (exactly 2), and plural (3+). The dual is a special feature not found in English.' },
          {"type": "fill", "q": "The dual of كتاب (book) is _____ (nominative).", "answer": "كتابان", "explanation": "The nominative dual adds ـان. After a preposition or as an object it is كتابين.", "alt": ["كتابين"]},
        ],
          assessment: [
            { type: 'mcq', q: '"لديَّ" (ladayya) means:', options: ['you have','he has','I have','they have'], answer: 2, explanation: '"لديَّ" = I have. "لديك" = you have (m). "لديه" = he has. "لديها" = she has. Alternative: "عندي" (ʿindī) = I have.' },
            { type: 'fill', q: 'Fill in: "في المدرسة مدرسون وـ_____." (In the school there are male and female teachers.)', answer: 'مدرسات', explanation: 'مدرسون = male teachers (sound masculine plural). مدرسات = female teachers (sound feminine plural, add ـات). Both are "sound plurals" — the singular form stays intact.' },
          ],
        },
        {
          id: 'ar-i-m1-l2', title: 'في السوق — At the Market', order: 2,
          objectives: ['Shop in Arabic','Negotiate prices','Use numbers 11–100'],
          vocab: [
            { word: 'بكم هذا؟', pinyin: 'Bikam hādhā?', translation: 'How much is this? (m)', example: 'بكم هذا الكتاب؟', exampleEn: 'How much is this book?', audio: 'بكم هذا' },
            { word: 'غالٍ / رخيص', pinyin: 'ghālin / rakhīṣ', translation: 'expensive / cheap', example: 'هذا غالٍ جداً. هل عندك شيء أرخص؟', exampleEn: 'This is very expensive. Do you have something cheaper?', audio: 'غالٍ رخيص' },
            { word: 'أريد / أريدين', pinyin: 'urīdu / urīdīna', translation: 'I want (m/f)', example: 'أريد ثلاثة أمتار من هذه القماش.', exampleEn: 'I want three metres of this fabric.', audio: 'أريد' },
            { word: 'خصم', pinyin: 'khaṣm', translation: 'discount', example: 'هل يوجد خصم؟', exampleEn: 'Is there a discount?', audio: 'خصم' },
            { word: 'الأرقام ١١–١٠٠', pinyin: '11–100 in Arabic', translation: 'Numbers 11–100', example: 'عشرون، ثلاثون، أربعون...', exampleEn: 'Twenty, thirty, forty...', audio: 'الأرقام' },
          ],
          grammar: {
            title: 'Arabic Numbers 11–100',
            explanation: 'Arabic numbers above ten follow specific patterns:\n\n11–19 (teens): reverse the units! Number + عشر/عشرة\n• 11 = أحد عشر (aḥad ʿashar) — lit: one-ten\n• 12 = اثنا عشر (ithnā ʿashar)\n• 13 = ثلاثة عشر (thalāthat ʿashar)\n\nTens: 20–90 use ـون/-ين ending (sound masculine plural pattern)\n• 20 = عشرون (ʿishrūn)\n• 30 = ثلاثون (thalāthūn)\n• 40 = أربعون (arbaʿūn)\n• 50 = خمسون (khamsūn)\n• 100 = مئة (miʾa)\n\nCompounds (21, 35, etc.): units + و + tens\n• 21 = واحد وعشرون (wāḥid wa-ʿishrūn) = one and twenty\n• 45 = خمسة وأربعون (khamsa wa-arbaʿūn)\n\nNote: Arabic number-gender is complex: 3–10 take the OPPOSITE gender of the counted noun. This is advanced — for now, focus on the number words themselves.',
            examples: [
              { es: 'الثمن خمسة وعشرون ناييرا.', en: 'Al-thaman khamsa wa-ʿishrūn nāyīrā — The price is twenty-five naira.' },
              { es: 'اشتريت ثلاثين كتاباً.', en: 'Ishtaraytu thalāthīn kitāban — I bought thirty books.' },
            ],
          },
          dialogue: {
            title: 'Bargaining at the Market',
            lines: [
              { speaker: 'Customer', text: 'بكم هذا القميص؟', pinyin: 'Bikam hādhā l-qamīṣ?', translation: 'How much is this shirt?' },
              { speaker: 'Vendor', text: 'بألف وخمسمئة نايرا.', pinyin: 'Bi-alf wa-khamsmiʾa nāyīrā.', translation: 'One thousand five hundred naira.' },
              { speaker: 'Customer', text: 'هذا غالٍ. أعطني خصماً.', pinyin: 'Hādhā ghālin. Aʿṭinī khaṣman.', translation: 'That\'s expensive. Give me a discount.' },
              { speaker: 'Vendor', text: 'حسناً، بألف ومئتين. هذا أقل ما يمكن.', pinyin: 'Ḥasanan, bi-alf wa-miʾatayn. Hādhā aqall mā yumkin.', translation: 'OK, one thousand two hundred. That\'s the minimum.' },
              { speaker: 'Customer', text: 'اتفقنا. هذا عدلٌ.', pinyin: 'Ittafaqnā. Hādhā ʿadlun.', translation: 'Agreed. That\'s fair.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: 'How do you say "fifty" in Arabic?', options: ['خمسة','خمسون','خمسة عشر','خمس مئة'], answer: 1, explanation: 'خمسون (khamsūn) = fifty. The tens in Arabic use the pattern of sound masculine plurals: عشرون (20), ثلاثون (30), أربعون (40), خمسون (50)...' },
            { type: 'mcq', q: '"بكم هذا؟" means:', options: ['How much is this?','Where is this?','What is this?','Is this yours?'], answer: 0, explanation: '"بكم" (bikam) = how much. "هذا" (hādhā) = this (m). "بكم هذا؟" = How much is this? For feminine nouns: "بكم هذه؟"' },
          {"type": "mcq", "q": "How do you say \"twenty\" in Arabic?", "options": ["عشرة", "عشرون", "ثلاثون", "مئة"], "answer": 1, "explanation": "عشرون (ʿishrūn) = 20. عشرة = 10; ثلاثون = 30; مئة = 100."},
        ],
          assessment: [
            { type: 'fill', q: 'Fill the number: الثمن ثلاثة وـ_____ نايرا. (The price is forty-three naira.)', answer: 'أربعون', explanation: '43 = ثلاثة وأربعون (thalātha wa-arbaʿūn). Arabic compounds: units + و (and) + tens.' },
            { type: 'mcq', q: '"غالٍ" (ghālin) means:', options: ['cheap','free','expensive','discount'], answer: 2, explanation: '"غالٍ" (ghālin) = expensive. "رخيص" (rakhīṣ) = cheap/inexpensive. Note: "غالٍ" has tanwīn kasra (ـٍ) because it is in indefinite form.' },
          ],
        },
        {
          id: 'ar-i-m1-l3', title: 'الوقت والمناسبات — Time & Occasions', order: 3,
          objectives: ['Tell the time in Arabic','Discuss events and schedules','Use "when" and time expressions'],
          vocab: [
            { word: 'كم الساعة؟', pinyin: 'Kam al-sāʿa?', translation: 'What time is it?', example: 'كم الساعة الآن؟', exampleEn: 'What time is it now?', audio: 'كم الساعة' },
            { word: 'الساعة...', pinyin: 'Al-sāʿa...', translation: 'It is... o\'clock', example: 'الساعة الثانية وربع.', exampleEn: 'It is a quarter past two.', audio: 'الساعة الثانية' },
            { word: 'صباحاً / مساءً', pinyin: 'ṣabāḥan / masāʾan', translation: 'in the morning / in the evening', example: 'الدرس الساعة الثامنة صباحاً.', exampleEn: 'The lesson is at eight in the morning.', audio: 'صباحاً مساءً' },
            { word: 'الآن / بعد قليل', pinyin: 'al-ān / baʿda qalīl', translation: 'now / in a little while', example: 'سأذهب بعد قليل.', exampleEn: 'I will go in a little while.', audio: 'الآن بعد قليل' },
            { word: 'متى؟', pinyin: 'matā?', translation: 'When?', example: 'متى يبدأ الاجتماع؟', exampleEn: 'When does the meeting start?', audio: 'متى' },
          ],
          grammar: {
            title: 'Telling Time in Arabic',
            explanation: 'Telling time in Arabic uses ordinal numbers for the hours:\n\n• الساعة الواحدة (al-sāʿa al-wāḥida) = 1 o\'clock\n• الساعة الثانية (al-sāʿa al-thāniya) = 2 o\'clock\n• الساعة الثالثة (al-sāʿa al-thālitha) = 3 o\'clock\n• الساعة العاشرة (al-sāʿa al-ʿāshira) = 10 o\'clock\n\nQuarter and half:\n• وربع (wa-rubʿ) = and a quarter\n• ونصف (wa-niṣf) = and a half\n• إلا ربع (illā rubʿ) = quarter to (lit: "except a quarter")\n\nExamples:\n• الساعة الثالثة ونصف = 3:30\n• الساعة الرابعة وربع = 4:15\n• الساعة الخامسة إلا ربع = 4:45 (quarter to five)\n\nAM/PM:\n• صباحاً (ṣabāḥan) = AM\n• ظهراً (ẓuhran) = noon\n• مساءً (masāʾan) = PM',
            examples: [
              { es: 'الساعة السابعة والنصف صباحاً.', en: 'Al-sāʿa al-sābiʿa wa-l-niṣf ṣabāḥan — It is 7:30 AM.' },
              { es: 'الدرس يبدأ الساعة الثامنة إلا ربع.', en: 'Al-dars yabdaʾ al-sāʿa al-thāmina illā rubʿ — The lesson starts at a quarter to eight (7:45).' },
            ],
          },
          dialogue: {
            title: 'What time is it?',
            lines: [
              { speaker: 'Student', text: 'عفواً، كم الساعة؟', pinyin: 'ʿAfwan, kam al-sāʿa?', translation: 'Excuse me, what time is it?' },
              { speaker: 'Teacher', text: 'الساعة الثامنة وعشر دقائق صباحاً.', pinyin: 'Al-sāʿa al-thāmina wa-ʿashr daqāʾiq ṣabāḥan.', translation: 'It is ten past eight in the morning.' },
              { speaker: 'Student', text: 'متى يبدأ الدرس؟', pinyin: 'Matā yabdaʾ al-dars?', translation: 'When does the lesson start?' },
              { speaker: 'Teacher', text: 'يبدأ الآن! تفضل، ادخل.', pinyin: 'Yabdaʾ al-ān! Tafaḍḍal, udkhul.', translation: 'It starts now! Please, come in.' },
            ],
          },
          exercises: [
            { type: 'mcq', q: '"الساعة الثالثة ونصف" means:', options: ['3:15','3:30','3:45','2:30'], answer: 1, explanation: '"ونصف" (wa-niṣf) = and a half. "الساعة الثالثة ونصف" = three and a half = 3:30.' },
            { type: 'mcq', q: '"متى؟" (matā) means:', options: ['Where?','Who?','When?','What?'], answer: 2, explanation: '"متى؟" = When? Arabic question words: من (man) = who, ما/ماذا (mā/mādhā) = what, أين (ayna) = where, متى (matā) = when, لماذا (limādhā) = why, كيف (kayfa) = how.' },
            { type: 'speak', q: 'Ask what time it is.', target: 'كم الساعة الآن', pinyin: 'Kam as-sāʿa al-ān', tip: 'Hold long vowels (ā) about twice as long as short ones. Practise the ع in الساعة.', explanation: 'Speech recognition checks which words were heard. It is an approximate check, not a pronunciation score.' },
          ],
          assessment: [
            { type: 'fill', q: 'الساعة الحادية عشرة _____. (It is 10:45 — quarter to eleven.)', answer: 'إلا ربع', explanation: '10:45 = quarter to eleven = الساعة الحادية عشرة إلا ربع. "إلا ربع" (illā rubʿ) = except a quarter — one quarter-hour before the next full hour.' },
            { type: 'mcq', q: 'صباحاً (ṣabāḥan) means:', options: ['in the evening','at noon','in the morning','at night'], answer: 2, explanation: 'صباحاً = in the morning (AM). مساءً (masāʾan) = in the evening (PM). ظهراً (ẓuhran) = at noon. ليلاً (laylan) = at night.' },
          ],
        },
      ],
    },
  ],
};
