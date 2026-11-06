// Lekce 6 – Mein Tagesablauf. Podklady a vymezení pokrytí: materialy/nemcina/zdroj/.
window.GERMAN_EXERCISES = (() => {
  const exercises = [];
  let topic = 'Slovní zásoba – lekce 6';
  let sequence = 0;
  const add = (type, title, question, fields, solution, difficulty = 2, subtopic = 'Procvičování') => exercises.push({
    id: `nej-${String(++sequence).padStart(3, '0')}`, subject: 'Němčina', topic, subtopic,
    type, title, question, ...fields, solution, difficulty, tags: ['lekce 6'],
  });
  const c = (title, question, choices, correct, solution, difficulty = 2, subtopic) => add('choice', title, question, { choices, answer: choices[correct] }, solution, difficulty, subtopic);
  const f = (title, question, answer, solution, difficulty = 2, subtopic) => add('fill', title, question, { answer, autoGrade: true }, solution, difficulty, subtopic);
  const p = (title, question, pairs, solution, difficulty = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, difficulty, 'Souvislosti');
  const m = (title, question, choices, correct, solution, difficulty = 3) => add('multi', title, question, { choices, answers: correct.map(index => choices[index]) }, solution, difficulty);
  const s = (title, scenario, question, choices, correct, solution) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, 3, 'Praktické situace');
  const t = (title, question, answer, difficulty = 3) => add('text', title, question, { answer, autoGrade: false }, answer, difficulty, 'Vlastní vyjádření');
  const vocabulary = [
  [
    "die Freizeitaktivität, -en",
    "volnočasová aktivita",
    "Denní režim a domácnost"
  ],
  [
    "die Morgenroutine, -n",
    "ranní rutina",
    "Denní režim a domácnost"
  ],
  [
    "jobben, er jobbt",
    "mít brigádu, přivydělávat si",
    "Denní režim a domácnost"
  ],
  [
    "die Pflicht, -en",
    "povinnost",
    "Denní režim a domácnost"
  ],
  [
    "am liebsten",
    "nejraději",
    "Denní režim a domácnost"
  ],
  [
    "anfangen, er fängt an",
    "začít, začínat",
    "Denní režim a domácnost"
  ],
  [
    "anmachen, er macht an",
    "zapnout, pustit",
    "Denní režim a domácnost"
  ],
  [
    "anrufen, er ruft an (j-n, 4. p.)",
    "zavolat někomu",
    "Denní režim a domácnost"
  ],
  [
    "(sich) anziehen, er zieht (sich) an",
    "obléknout (se)",
    "Denní režim a domácnost"
  ],
  [
    "aufräumen, er räumt auf",
    "uklízet",
    "Denní režim a domácnost"
  ],
  [
    "aufstehen, er steht auf",
    "vstávat",
    "Denní režim a domácnost"
  ],
  [
    "aufwachen, er wacht auf",
    "probudit se",
    "Denní režim a domácnost"
  ],
  [
    "ausleeren, er leert aus",
    "vysypat, vyprázdnit",
    "Denní režim a domácnost"
  ],
  [
    "ausräumen, er räumt aus",
    "vyklidit, vyndat věci",
    "Denní režim a domácnost"
  ],
  [
    "aussehen, er sieht aus",
    "vypadat",
    "Denní režim a domácnost"
  ],
  [
    "das Bad, Bäder",
    "koupelna",
    "Denní režim a domácnost"
  ],
  [
    "das Badezimmer, -",
    "koupelna",
    "Denní režim a domácnost"
  ],
  [
    "das Bild, -er",
    "obrázek, obraz",
    "Denní režim a domácnost"
  ],
  [
    "dabei",
    "přitom",
    "Denní režim a domácnost"
  ],
  [
    "drehen, er dreht",
    "natáčet",
    "Denní režim a domácnost"
  ],
  [
    "duschen, er duscht",
    "sprchovat se",
    "Denní režim a domácnost"
  ],
  [
    "einkaufen, er kauft ein",
    "nakupovat",
    "Denní režim a domácnost"
  ],
  [
    "einschlafen, er schläft ein",
    "usnout",
    "Denní režim a domácnost"
  ],
  [
    "das Ende, -n",
    "konec",
    "Denní režim a domácnost"
  ],
  [
    "endlich",
    "konečně",
    "Denní režim a domácnost"
  ],
  [
    "fernsehen, er sieht fern",
    "dívat se na televizi",
    "Denní režim a domácnost"
  ],
  [
    "fertig",
    "hotový",
    "Denní režim a domácnost"
  ],
  [
    "halb",
    "půl",
    "Denní režim a domácnost"
  ],
  [
    "der Horror",
    "horor",
    "Denní režim a domácnost"
  ],
  [
    "Hurra!",
    "Hurá!",
    "Denní režim a domácnost"
  ],
  [
    "die Kamera, -s",
    "kamera, fotoaparát",
    "Denní režim a domácnost"
  ],
  [
    "klingeln, er klingelt",
    "zvonit",
    "Denní režim a domácnost"
  ],
  [
    "das Lieblingsfach, Lieblingsfächer",
    "oblíbený předmět",
    "Denní režim a domácnost"
  ],
  [
    "mitnehmen, er nimmt mit",
    "vzít s sebou",
    "Denní režim a domácnost"
  ],
  [
    "müde",
    "unavený",
    "Denní režim a domácnost"
  ],
  [
    "der Mülleimer, -",
    "odpadkový koš",
    "Denní režim a domácnost"
  ],
  [
    "putzen, er putzt",
    "(vy)čistit, mýt",
    "Denní režim a domácnost"
  ],
  [
    "saugen, er saugt",
    "vysávat",
    "Denní režim a domácnost"
  ],
  [
    "schlafen, er schläft",
    "spát",
    "Denní režim a domácnost"
  ],
  [
    "(sich) schminken, sie schminkt (sich)",
    "líčit se",
    "Denní režim a domácnost"
  ],
  [
    "die Spülmaschine, -n",
    "myčka nádobí",
    "Denní režim a domácnost"
  ],
  [
    "der Staub (j. č.)",
    "prach",
    "Denní režim a domácnost"
  ],
  [
    "der Unterricht (j. č.)",
    "vyučování",
    "Denní režim a domácnost"
  ],
  [
    "das/der Viertel, -",
    "čtvrt",
    "Denní režim a domácnost"
  ],
  [
    "vloggen, er vloggt",
    "natáčet vlog",
    "Denní režim a domácnost"
  ],
  [
    "(sich) vorbereiten, er bereitet (sich) vor",
    "připravovat (se)",
    "Denní režim a domácnost"
  ],
  [
    "der Wecker, -",
    "budík",
    "Denní režim a domácnost"
  ],
  [
    "zeigen, er zeigt",
    "ukázat",
    "Denní režim a domácnost"
  ],
  [
    "zubereiten, er bereitet zu",
    "připravit jídlo, uvařit",
    "Denní režim a domácnost"
  ],
  [
    "zurückkommen, er kommt zurück",
    "vrátit se",
    "Denní režim a domácnost"
  ],
  [
    "ausschalten, er schaltet aus (etw., 4. p.)",
    "vypnout něco",
    "Denní režim a domácnost"
  ],
  [
    "einschalten, er schaltet ein (etw., 4. p.)",
    "zapnout něco",
    "Denní režim a domácnost"
  ],
  [
    "wen",
    "koho",
    "Denní režim a domácnost"
  ],
  [
    "die Uhrzeit, -en",
    "(přesný) čas",
    "Čas a pravidelnost"
  ],
  [
    "das Bett, -en",
    "postel",
    "Volný čas a média"
  ],
  [
    "ins Bett gehen",
    "jít do postele",
    "Volný čas a média"
  ],
  [
    "der Blogger, -",
    "bloger",
    "Volný čas a média"
  ],
  [
    "entdecken, er entdeckt",
    "objevit, najít",
    "Volný čas a média"
  ],
  [
    "(sich) entschuldigen, er entschuldigt (sich)",
    "omluvit (se)",
    "Volný čas a média"
  ],
  [
    "erzählen, er erzählt (über + 4. p.; von + 3. p.)",
    "vyprávět",
    "Volný čas a média"
  ],
  [
    "kommentieren, er kommentiert",
    "komentovat",
    "Volný čas a média"
  ],
  [
    "liken, er likt",
    "lajkovat",
    "Volný čas a média"
  ],
  [
    "posten, er postet",
    "postovat, zveřejňovat příspěvky",
    "Volný čas a média"
  ],
  [
    "der Trend, -s",
    "trend",
    "Volný čas a média"
  ],
  [
    "verbringen, er verbringt",
    "strávit (čas)",
    "Volný čas a média"
  ],
  [
    "vergessen, er vergisst",
    "zapomenout",
    "Volný čas a média"
  ],
  [
    "weiter",
    "dál, dále",
    "Volný čas a média"
  ],
  [
    "wissen, er weiß",
    "vědět",
    "Volný čas a média"
  ],
  [
    "dienstags",
    "každé úterý",
    "Čas a pravidelnost"
  ],
  [
    "donnerstags",
    "každý čtvrtek",
    "Čas a pravidelnost"
  ],
  [
    "freitags",
    "každý pátek",
    "Čas a pravidelnost"
  ],
  [
    "der Kanal, Kanäle",
    "program, kanál",
    "Čas a pravidelnost"
  ],
  [
    "Lieblings- (např. Lieblingskanal)",
    "oblíbený (např. oblíbený kanál)",
    "Čas a pravidelnost"
  ],
  [
    "die Mitternacht, Mitternächte",
    "půlnoc",
    "Čas a pravidelnost"
  ],
  [
    "um Mitternacht",
    "o půlnoci",
    "Čas a pravidelnost"
  ],
  [
    "mittwochs",
    "každou středu",
    "Čas a pravidelnost"
  ],
  [
    "montags",
    "každé pondělí",
    "Čas a pravidelnost"
  ],
  [
    "morgens",
    "každé ráno",
    "Čas a pravidelnost"
  ],
  [
    "der Nachmittag, -e",
    "odpoledne",
    "Čas a pravidelnost"
  ],
  [
    "am Nachmittag",
    "odpoledne (kdy?)",
    "Čas a pravidelnost"
  ],
  [
    "nachmittags",
    "každé odpoledne",
    "Čas a pravidelnost"
  ],
  [
    "samstags",
    "každou sobotu",
    "Čas a pravidelnost"
  ],
  [
    "sonntags",
    "každou neděli",
    "Čas a pravidelnost"
  ],
  [
    "das Training, -s",
    "trénink",
    "Čas a pravidelnost"
  ],
  [
    "der Vormittag, -e",
    "dopoledne",
    "Čas a pravidelnost"
  ],
  [
    "am Vormittag",
    "dopoledne (kdy?)",
    "Čas a pravidelnost"
  ],
  [
    "vormittags",
    "každé dopoledne",
    "Čas a pravidelnost"
  ],
  [
    "die Weltmeisterschaft, -en",
    "mistrovství světa",
    "Čas a pravidelnost"
  ],
  [
    "durch",
    "přes, skrz",
    "Místa, vztahy a předložky"
  ],
  [
    "die Ecke, -n",
    "roh",
    "Místa, vztahy a předložky"
  ],
  [
    "gegen",
    "proti (v časovém významu také „kolem“)",
    "Místa, vztahy a předložky"
  ],
  [
    "lieb",
    "milý, milovaný",
    "Místa, vztahy a předložky"
  ],
  [
    "das Mädchen, -",
    "dívka",
    "Místa, vztahy a předložky"
  ],
  [
    "ohne",
    "bez",
    "Místa, vztahy a předložky"
  ],
  [
    "der Park, -s",
    "park",
    "Místa, vztahy a předložky"
  ],
  [
    "der Schatz, Schätze",
    "poklad, zlatíčko",
    "Místa, vztahy a předložky"
  ],
  [
    "der Stress, -e",
    "stres",
    "Místa, vztahy a předložky"
  ],
  [
    "die Berufsschule, -n",
    "učňovská škola",
    "Škola a setkávání"
  ],
  [
    "dumm",
    "hloupý",
    "Škola a setkávání"
  ],
  [
    "die Fachschule, -n",
    "odborná škola",
    "Škola a setkávání"
  ],
  [
    "abholen, er holt ab (j-n, 4. p.)",
    "vyzvednout někoho",
    "Škola a setkávání"
  ],
  [
    "der Kindergarten, Kindergärten",
    "mateřská škola",
    "Škola a setkávání"
  ],
  [
    "das Krankenhaus, Krankenhäuser",
    "nemocnice",
    "Škola a setkávání"
  ],
  [
    "sich treffen, er trifft sich",
    "setkat se",
    "Škola a setkávání"
  ],
  [
    "der Tagesablauf",
    "denní režim",
    "Další výrazy lekce"
  ],
  [
    "die Minute, -n",
    "minuta",
    "Další výrazy lekce"
  ],
  [
    "die Stunde, -n",
    "hodina",
    "Další výrazy lekce"
  ],
  [
    "die Uhr, -en",
    "hodiny",
    "Další výrazy lekce"
  ],
  [
    "die Schule, -n",
    "škola",
    "Další výrazy lekce"
  ],
  [
    "das Frühstück",
    "snídaně",
    "Další výrazy lekce"
  ],
  [
    "das Abendessen",
    "večeře",
    "Další výrazy lekce"
  ],
  [
    "am Morgen",
    "ráno",
    "Další výrazy lekce"
  ],
  [
    "am Abend",
    "večer",
    "Další výrazy lekce"
  ],
  [
    "in der Nacht",
    "v noci",
    "Další výrazy lekce"
  ],
  [
    "Viertel nach",
    "čtvrt po",
    "Další výrazy lekce"
  ],
  [
    "Viertel vor",
    "tři čtvrtě na / čtvrt do",
    "Další výrazy lekce"
  ],
  [
    "für",
    "pro",
    "Další výrazy lekce"
  ],
  [
    "um (Uhrzeit)",
    "v (určitou hodinu)",
    "Další výrazy lekce"
  ],
  [
    "bis",
    "do",
    "Další výrazy lekce"
  ],
  [
    "gern / gerne",
    "rád",
    "Další výrazy lekce"
  ],
  [
    "das Geschenk, -e",
    "dárek",
    "Další výrazy lekce"
  ],
  [
    "feiern",
    "slavit",
    "Další výrazy lekce"
  ],
  [
    "hd(l)",
    "Hab dich lieb. — mám tě rád/a",
    "Zkratky ve zprávách"
  ],
  [
    "ida",
    "Ich dich auch. — já tebe taky",
    "Zkratky ve zprávách"
  ],
  [
    "gn8",
    "Gute Nacht! — dobrou noc",
    "Zkratky ve zprávách"
  ],
  [
    "omg",
    "Oh mein Gott! — ó můj bože",
    "Zkratky ve zprávách"
  ],
  [
    "ka",
    "Keine Ahnung. — nemám tušení",
    "Zkratky ve zprávách"
  ],
  [
    "Wie spät ist es? / Wie viel Uhr ist es?",
    "Kolik je hodin?",
    "Další výrazy lekce"
  ],
  [
    "Wann?",
    "Kdy?",
    "Další výrazy lekce"
  ],
  [
    "Wer?",
    "Kdo?",
    "Další výrazy lekce"
  ],
  [
    "Wo?",
    "Kde?",
    "Další výrazy lekce"
  ],
  [
    "Was?",
    "Co?",
    "Další výrazy lekce"
  ],
  [
    "wmd?",
    "Was machst du? — co děláš?",
    "Zkratky ve zprávách"
  ]
];

  const kind = de => /^(der |die |das |das\/der )/.test(de) ? 'noun'
    : /, (er|sie) |^(feiern|ins Bett gehen|sich treffen)/.test(de) ? 'verb'
    : /^(hd\(l\)|ida|wmd\?|gn8|omg|ka)$/.test(de) ? 'message' : 'other';
  // Synonyma nesmějí být navzájem nesprávnou možností (Bad/Badezimmer, anmachen/einschalten).
  const meaning = cs => cs.replace(/\\([^)]*\\)/g, '').replace(/[!?,.]/g, '').replace(/\\s+/g, ' ').trim()
    .replace(/^zapnout.*$/, 'zapnout');
  vocabulary.forEach(([de, cs, subtopic], index) => {
    const pool = vocabulary.filter(([otherDe, otherCs]) => kind(otherDe) === kind(de) && meaning(otherCs) !== meaning(cs));
    const wrong = [];
    for (let offset = 0; wrong.length < 3 && offset < pool.length; offset++) {
      const candidate = pool[(index * 7 + offset) % pool.length][1];
      if (!wrong.some(value => meaning(value) === meaning(candidate))) wrong.push(candidate);
    }
    const choices = wrong.slice();
    const correct = index % 4;
    choices.splice(correct, 0, cs);
    c('Význam slova nebo výrazu', `Vyber český význam výrazu **${de}**.`, choices, correct, `${de} = ${cs}.`, 1, subtopic);
  });

  p('Domácí práce v souvislostech', 'Přiřaď německou činnost k českému významu.', [
    ['den Mülleimer ausleeren', 'vysypat koš'], ['die Spülmaschine ausräumen', 'vyklidit myčku'],
    ['das Zimmer aufräumen', 'uklidit pokoj'], ['Staub saugen', 'vysávat prach'],
  ], 'ausleeren = vyprázdnit; ausräumen = vyklidit; aufräumen = uklidit; Staub saugen = vysávat prach.');
  p('Ráno a večer', 'Spoj činnosti denního režimu s jejich překlady.', [
    ['Zähne putzen', 'čistit si zuby'], ['sich anziehen', 'oblékat se'],
    ['frühstücken', 'snídat'], ['ins Bett gehen', 'jít do postele'],
  ], 'Ich putze mir die Zähne. Ich ziehe mich an. Ich frühstücke. Ich gehe ins Bett.');
  p('Média a volný čas', 'Přiřaď činnosti s médii k jejich významu.', [
    ['fernsehen', 'sledovat televizi'], ['vloggen', 'natáčet vlog'],
    ['posten', 'zveřejňovat příspěvky'], ['kommentieren', 'komentovat'],
  ], 'fernsehen má odlučitelnou předponu: er sieht fern. Ostatní zde uvedená slovesa se časují bez oddělování předpony.');
  p('Škola a místa', 'Spoj názvy míst s českými významy.', [
    ['die Berufsschule', 'učňovská škola'], ['die Fachschule', 'odborná škola'],
    ['der Kindergarten', 'mateřská škola'], ['das Krankenhaus', 'nemocnice'],
  ], 'Členy: die Berufsschule, die Fachschule, der Kindergarten, das Krankenhaus.');
  p('Zprávy mezi kamarády', 'Přiřaď zkratky ze zpráv k jejich německému rozvinutí.', [
    ['hd(l)', 'Hab dich lieb.'], ['ida', 'Ich dich auch.'], ['wmd?', 'Was machst du?'],
    ['gn8', 'Gute Nacht!'], ['ka', 'Keine Ahnung.'],
  ], 'Jde o neformální zkratky do zpráv: mám tě rád/a; já tebe taky; co děláš; dobrou noc; nemám tušení.');
  const nouns = [
    ['Mülleimer', 'der', 'odpadkový koš'], ['Spülmaschine', 'die', 'myčka nádobí'],
    ['Bett', 'das', 'postel'], ['Unterricht', 'der', 'vyučování'],
    ['Pflicht', 'die', 'povinnost'], ['Mädchen', 'das', 'dívka'],
    ['Krankenhaus', 'das', 'nemocnice'], ['Wecker', 'der', 'budík'],
  ];
  nouns.forEach(([noun, article, cs]) => c('Člen podstatného jména', `Doplň člen v 1. pádě jednotného čísla: **___ ${noun}** (${cs}).`,
    ['der', 'die', 'das'], ['der', 'die', 'das'].indexOf(article), `${article} ${noun} = ${cs}.`, 2, 'Členy'));
  [
    ['das Bad', 'Bäder'], ['das Lieblingsfach', 'Lieblingsfächer'], ['der Kanal', 'Kanäle'],
    ['der Kindergarten', 'Kindergärten'], ['das Krankenhaus', 'Krankenhäuser'], ['der Schatz', 'Schätze'],
  ].forEach(([singular, plural]) => f('Množné číslo', `Napiš množné číslo slova **${singular}**, bez členu.`, plural,
    `Množné číslo je die ${plural}. Všimni si změny samohlásky a koncovky.`, 3, 'Množné číslo'));

  topic = 'Čas a časové výrazy';
  [
    ['sechs Uhr', '6:00'], ['fünf nach sechs', '6:05'], ['Viertel nach sechs', '6:15'],
    ['halb sieben', '6:30'], ['Viertel vor sieben', '6:45'], ['zehn vor sieben', '6:50'],
    ['sechs Uhr fünfundzwanzig', '6:25'], ['halb acht', '7:30'], ['Viertel vor acht', '7:45'],
    ['zehn vor acht', '7:50'], ['halb vier', '3:30'],
  ].forEach(([expression, time]) => f('Čas číslicemi', `Převeď **${expression}** na číslice. Použij formát H:MM a 12hodinový zápis bez úvodní nuly.`,
    time, `${expression} = ${time}. „nach“ znamená po, „vor“ před; „halb“ odkazuje k následující hodině.`, 2, 'Určování času'));
  c('Půl osmé', 'Který výraz běžně označuje čas **7:30**?', ['halb sieben', 'halb acht', 'acht Uhr dreißig', 'Viertel nach sieben'], 1,
    'halb acht = půl osmé = 7:30. halb sieben je 6:30.', 2, 'Určování času');
  c('Čtvrt na sedm', 'Jak vyjádříš **6:15** pomocí „Viertel“?', ['Viertel vor sechs', 'Viertel nach sieben', 'Viertel nach sechs', 'Viertel vor sieben'], 2,
    'Viertel nach sechs znamená čtvrt hodiny po šesté, tedy 6:15.', 2, 'Určování času');
  c('Tři čtvrtě na sedm', 'Který výraz s „Viertel“ odpovídá českému „tři čtvrtě na sedm“?', ['Viertel vor sieben', 'Viertel nach sieben', 'Viertel vor sechs', 'Viertel nach sechs'], 0,
    '6:45 je Viertel vor sieben: do sedmé zbývá čtvrt hodiny.', 2, 'Určování času');
  [
    ['Ich stehe ___ sieben Uhr auf.', 'um', 'Před přesným hodinovým časem stojí um.'],
    ['Wir treffen uns ___ Montag.', 'am', 'Před názvem dne stojí am.'],
    ['Ich mache ___ Nachmittag Hausaufgaben.', 'am', 'Říkáme am Nachmittag.'],
    ['Ich schlafe ___ der Nacht.', 'in', 'Celý výraz je in der Nacht.'],
    ['Ich komme ___ fünf Uhr. (kolem páté)', 'gegen', 'gegen označuje přibližný čas.'],
    ['Der Unterricht dauert von acht ___ dreizehn Uhr.', 'bis', 'Rozmezí vyjadřuje von … bis …'],
    ['Ich schlafe ___ Mitternacht noch nicht.', 'um', 'O půlnoci se řekne um Mitternacht.'],
  ].forEach(([sentence, answer, solution]) => f('Časová předložka', `Doplň jedno chybějící slovo: **${sentence}**`, answer, solution, 2, 'Časové předložky'));
  const days = [
    ['pondělí', 'Montag', 'montags'], ['úterý', 'Dienstag', 'dienstags'], ['středu', 'Mittwoch', 'mittwochs'],
    ['čtvrtek', 'Donnerstag', 'donnerstags'], ['pátek', 'Freitag', 'freitags'],
    ['sobotu', 'Samstag', 'samstags'], ['neděli', 'Sonntag', 'sonntags'],
  ];
  days.forEach(([cs, day, recurring]) => f('Pravidelně každý týden',
    `Převeď **am ${day}** na jednoslovný výraz pro pravidelné opakování (každé/každý ${cs}).`,
    recurring, `am ${day} = v konkrétní den; ${recurring} = pravidelně každý týden.`, 2, 'Pravidelnost'));
  c('Odpoledne opakovaně', 'Který výraz výslovně vyjadřuje **každé odpoledne / pravidelně odpoledne**?',
    ['um Nachmittag', 'am Montag', 'nachmittags', 'um Mitternacht'], 2, 'nachmittags zdůrazňuje pravidelnost; am Nachmittag znamená odpoledne.', 2, 'Pravidelnost');
  p('Časové vztahy', 'Spoj časové výrazy s významy.', [
    ['um acht Uhr', 'v osm hodin'], ['gegen acht Uhr', 'kolem osmé'], ['von acht bis zehn Uhr', 'od osmi do deseti'],
    ['am Vormittag', 'dopoledne'], ['vormittags', 'každé dopoledne'],
  ], 'um = přesný čas; gegen = přibližný čas; von … bis … = rozmezí; -s u těchto příslovcí vyjadřuje pravidelnost.');
  t('Vysvětlení časového omylu', 'Kamarád přeložil „halb acht“ jako 8:30. Oprav ho a vysvětli, jak poznáš správnou hodinu.',
    'halb acht je 7:30, česky půl osmé. Jde o polovinu cesty k osmé hodině. 8:30 je halb neun.');

  topic = 'Odlučitelná slovesa a časování';
  [
    ['Ich ___ um sechs Uhr auf. (aufstehen)', 'stehe', 'Ich stehe um sechs Uhr auf.'],
    ['Du ___ um sieben Uhr auf. (aufstehen)', 'stehst', 'Du stehst um sieben Uhr auf.'],
    ['Er ___ am Morgen auf. (aufstehen)', 'steht', 'Er steht am Morgen auf.'],
    ['Ich ___ um acht Uhr an. (anfangen)', 'fange', 'Ich fange um acht Uhr an.'],
    ['Du ___ um acht Uhr an. (anfangen)', 'fängst', 'Du fängst um acht Uhr an.'],
    ['Der Unterricht ___ um acht Uhr an. (anfangen)', 'fängt', 'Der Unterricht fängt um acht Uhr an.'],
    ['Ich ___ am Abend fern. (fernsehen)', 'sehe', 'Ich sehe am Abend fern.'],
    ['Du ___ am Abend fern. (fernsehen)', 'siehst', 'Du siehst am Abend fern.'],
    ['Er ___ oft fern. (fernsehen)', 'sieht', 'Er sieht oft fern.'],
    ['Du ___ mich an. (anrufen)', 'rufst', 'Du rufst mich an.'],
    ['Er ___ alles ein. (einkaufen)', 'kauft', 'Er kauft alles ein.'],
    ['Du ___ das Geschenk mit. (mitnehmen)', 'nimmst', 'Du nimmst das Geschenk mit.'],
    ['Er ___ das Geschenk mit. (mitnehmen)', 'nimmt', 'Er nimmt das Geschenk mit.'],
    ['Du ___ lange. (schlafen)', 'schläfst', 'Du schläfst lange.'],
    ['Er ___ lange. (schlafen)', 'schläft', 'Er schläft lange.'],
    ['Er ___ die Hausaufgaben. (vergessen)', 'vergisst', 'Er vergisst die Hausaufgaben.'],
    ['Er ___ die Uhrzeit. (wissen)', 'weiß', 'Er weiß die Uhrzeit.'],
    ['Sie ___ das Abendessen zu. (zubereiten; ona)', 'bereitet', 'Sie bereitet das Abendessen zu.'],
  ].forEach(([sentence, answer, complete]) => f('Časovaný tvar slovesa', `Doplň pouze chybějící časovaný tvar: **${sentence}**`,
    answer, complete, 2, 'Časování'));
  [
    ['Ich räume mein Zimmer ___. (aufräumen)', 'auf', 'Ich räume mein Zimmer auf.'],
    ['Sie leert den Mülleimer ___. (ausleeren)', 'aus', 'Sie leert den Mülleimer aus.'],
    ['Sie räumt die Spülmaschine ___. (ausräumen)', 'aus', 'Sie räumt die Spülmaschine aus.'],
    ['Sie schaltet die Kamera ___. (einschalten)', 'ein', 'Sie schaltet die Kamera ein.'],
    ['Sie schaltet die Kamera ___. (ausschalten)', 'aus', 'Sie schaltet die Kamera aus.'],
    ['Ich bereite mich auf den Test ___. (sich vorbereiten)', 'vor', 'Ich bereite mich auf den Test vor.'],
    ['Sie bereiten das Abendessen ___. (zubereiten)', 'zu', 'Sie bereiten das Abendessen zu.'],
    ['Ich hole dich um acht Uhr ___. (abholen)', 'ab', 'Ich hole dich um acht Uhr ab.'],
    ['Er kommt am Abend ___. (zurückkommen)', 'zurück', 'Er kommt am Abend zurück.'],
  ].forEach(([sentence, answer, complete]) => f('Předpona na konci', `Doplň pouze odlučitelnou předponu: **${sentence}**`,
    answer, complete, 2, 'Odlučitelné předpony'));
  c('Sloveso s modálním slovesem', 'Která věta správně říká „Musím brzy vstávat“?',
    ['Ich muss früh stehe auf.', 'Ich muss früh aufstehen.', 'Ich auf muss früh stehen.', 'Ich muss auf früh stehen.'], 1,
    'Po muss stojí na konci celý infinitiv aufstehen; předpona se v tomto infinitivu neodděluje.', 3);
  m('Rozpoznání odlučitelných sloves', 'Vyber všechna slovesa, která v hlavní oznamovací větě oddělují předponu.',
    ['aufstehen', 'vergessen', 'fernsehen', 'entdecken', 'mitnehmen'], [0, 2, 4],
    'aufstehen → steht auf; fernsehen → sieht fern; mitnehmen → nimmt mit. vergessen a entdecken zde předponu neoddělují.');
  m('Kontrola tvarů', 'Vyber všechny gramaticky správné věty.',
    ['Du fängst um acht Uhr an.', 'Er seht am Abend fern.', 'Er nimmt das Geschenk mit.', 'Du schlafst lange.'], [0, 2],
    'Správně: du fängst an; er sieht fern; er nimmt mit; du schläfst.');
  t('Oprava věty s předponou', 'Oprav větu „Ich aufstehe um sieben Uhr.“ a krátce vysvětli opravu.',
    'Ich stehe um sieben Uhr auf. Časované sloveso stehe stojí na druhé pozici a odlučitelná předpona auf na konci hlavní věty.');

  topic = 'Denní režim a slovosled';
  c('Čas na začátku věty', 'Vyber správnou větu začínající časovým údajem „Um sieben Uhr“.',
    ['Um sieben Uhr ich frühstücke.', 'Um sieben Uhr frühstücke ich.', 'Um sieben Uhr frühstücken ich.', 'Um sieben Uhr ich frühstücken.'], 1,
    'Celý časový údaj tvoří první větný člen, časované sloveso frühstücke je druhé a podmět ich následuje za ním.', 2);
  c('Odpolední úkoly', 'Která věta správně vyjadřuje „Odpoledne dělám domácí úkoly“?',
    ['Am Nachmittag ich mache Hausaufgaben.', 'Am Nachmittag mache Hausaufgaben ich.', 'Am Nachmittag mache ich Hausaufgaben.', 'Am Nachmittag machen ich Hausaufgaben.'], 2,
    'Am Nachmittag mache ich Hausaufgaben. Po časovém údaji stojí časované sloveso, potom podmět.', 2);
  c('Sledování televize', 'Vyber správný slovosled věty se začátkem „Am Abend“ a slovesem fernsehen.',
    ['Am Abend ich sehe fern.', 'Am Abend fernsehe ich.', 'Am Abend sehe fern ich.', 'Am Abend sehe ich fern.'], 3,
    'Am Abend sehe ich fern. Časované sehe je na druhém místě, fern zůstává na konci.', 2);
  c('Začátek vyučování', 'Která věta znamená „Vyučování začíná v osm hodin“?',
    ['Der Unterricht fängt um acht Uhr an.', 'Der Unterricht fängt am acht Uhr an.', 'Der Unterricht anfangen um acht Uhr.', 'Der Unterricht fangen um acht Uhr an.'], 0,
    'Der Unterricht je jednotné číslo: fängt an. Před hodinou je um.', 2);
  c('Konec vyučování', 'Jak řekneš „Vyučování končí ve 13 hodin“?',
    ['Der Unterricht ist um 13 Uhr zu Ende.', 'Der Unterricht ist am 13 Uhr zu Ende.', 'Der Unterricht zu Ende ist um 13 Uhr.', 'Der Unterricht ist um 13 Uhr anfangen.'], 0,
    'Der Unterricht ist um 13 Uhr zu Ende. zu Ende sein znamená být u konce.', 2);
  c('Probouzení a vstávání', 'Která dvojice správně rozlišuje „probudit se“ a „vstát z postele“?',
    ['aufstehen / aufwachen', 'einschlafen / aufräumen', 'aufwachen / aufstehen', 'schlafen / einkaufen'], 2,
    'aufwachen = probudit se; aufstehen = vstávat. Člověk se může probudit dříve, než vstane.', 1);
  p('Věty o mém dni', 'Přiřaď věty k jejich českému významu.', [
    ['Ich wache um sechs Uhr auf.', 'Probouzím se v šest.'],
    ['Ich stehe um halb sieben auf.', 'Vstávám v půl sedmé.'],
    ['Um halb acht gehe ich zur Schule.', 'V 7:30 jdu do školy.'],
    ['Um zehn Uhr gehe ich ins Bett.', 'V deset jdu do postele.'],
  ], 'aufwachen a aufstehen mají na konci auf; „halb“ se vztahuje k následující hodině.');
  t('Překlad s časovým údajem', 'Přelož do němčiny „V půl osmé vstávám.“',
    'Například: Um halb acht stehe ich auf. Správně je také Ich stehe um halb acht auf. Zkontroluj čas 7:30, tvar stehe a předponu auf na konci.');
  t('Ranní rutina', 'Přelož do němčiny „Potom se sprchuji a oblékám.“',
    'Dann dusche ich und ziehe mich an. Zkontroluj časované dusche / ziehe, zvratné mich a předponu an.');
  t('Čištění zubů', 'Přelož do němčiny „Musím si ještě vyčistit zuby.“',
    'Ich muss noch Zähne putzen. Možná je také varianta Ich muss mir noch die Zähne putzen. Po muss je infinitiv putzen na konci.');
  t('Můj den', 'Napiš německy 8–10 vět o svém běžném dni. Zahrň vstávání, školu, domácí úkoly, volný čas a spánek; alespoň dvě věty začni časovým údajem.',
    'Vzor: Ich wache um sechs Uhr auf. Ich stehe um halb sieben auf. Dann dusche ich und ziehe mich an. Um sieben Uhr frühstücke ich. Um halb acht gehe ich zur Schule. Der Unterricht fängt um acht Uhr an. Am Nachmittag mache ich Hausaufgaben. Dann räume ich mein Zimmer auf. Am Abend sehe ich fern. Um zehn Uhr gehe ich ins Bett. Vlastní časy a činnosti mohou být jiné; kontroluj časování, slovosled a předpony.', 4);

  topic = 'Osobní zájmena a 4. pád';
  [
    ['Ich sehe ___. (ty)', 'dich', 'Ich sehe dich. — Vidím tě.'],
    ['Du rufst ___ an. (já)', 'mich', 'Du rufst mich an. — Voláš mi. Německé anrufen vyžaduje 4. pád.'],
    ['Ich rufe ___ an. (on)', 'ihn', 'Ich rufe ihn an. — Volám mu.'],
    ['Kannst du ___ abholen? (my)', 'uns', 'Kannst du uns abholen? — Můžeš nás vyzvednout?'],
    ['Ich habe ein Geschenk für ___. (vy, kamarádi)', 'euch', 'Ich habe ein Geschenk für euch. — Mám pro vás dárek.'],
    ['Ich gehe ohne ___. (ty)', 'dich', 'Ich gehe ohne dich. — Jdu bez tebe.'],
    ['Das Geschenk ist für ___. (já)', 'mich', 'Das Geschenk ist für mich. — Dárek je pro mě.'],
    ['Ich sehe ___. (ona)', 'sie', 'Ich sehe sie. — Vidím ji.'],
    ['Ich sehe ___. (ono)', 'es', 'Ich sehe es. — Vidím to.'],
    ['Ich sehe ___. (oni)', 'sie', 'Ich sehe sie. — Vidím je.'],
  ].forEach(([sentence, answer, solution]) => f('Zájmeno ve 4. pádě', `Doplň německé osobní zájmeno ve 4. pádě: **${sentence}**`,
    answer, solution, 2, 'Osobní zájmena'));
  p('Základní a předmětné tvary', 'Přiřaď zájmena v 1. pádě k tvarům ve 4. pádě.', [
    ['ich', 'mich'], ['du', 'dich'], ['er', 'ihn'], ['wir', 'uns'], ['ihr', 'euch'],
  ], 'ich → mich; du → dich; er → ihn; wir → uns; ihr → euch.');
  m('Předložky se 4. pádem', 'Vyber všechny předložky, které zde patří do skupiny se 4. pádem.',
    ['durch', 'für', 'gegen', 'ohne', 'um', 'mit', 'von'], [0, 1, 2, 3, 4],
    'durch, für, gegen, ohne a um se pojí se 4. pádem; mit a von do této skupiny nepatří.');
  c('Český a německý pád', 'Doplň „Volám mu“: **Ich rufe ___ an.** Mluvíš o Petrovi.',
    ['ihm', 'er', 'ihn', 'sein'], 2, 'Německé anrufen se pojí se 4. pádem: ihn. Český překlad „mu“ nás nesmí svést k ihm.', 3);
  c('Cesta parkem', 'Vyber správné doplnění: **Wir gehen durch ___ Park.**',
    ['der', 'den', 'dem', 'des'], 1, 'durch vyžaduje 4. pád; der Park → durch den Park.', 3);
  c('Dárek pro kamarády', 'Která věta znamená „Mám pro vás dárek“, když mluvíš se skupinou kamarádů?',
    ['Ich habe ein Geschenk für ihr.', 'Ich habe ein Geschenk für uns.', 'Ich habe ein Geschenk für dich.', 'Ich habe ein Geschenk für euch.'], 3,
    'ihr (vy) má ve 4. pádě tvar euch. für euch = pro vás.', 2);
  t('Vyzvednutí kamaráda', 'Přelož do němčiny „Vyzvednu tě v osm hodin.“',
    'Ich hole dich um acht Uhr ab. Správně také Um acht Uhr hole ich dich ab. Kontroluj dich (4. pád), um a odlučitelné ab.');

  topic = 'Přivlastňovací zájmena';
  [
    ['Das ist ___ Bruder. (můj)', 'mein', 'mein Bruder — mužský rod v 1. pádě.'],
    ['Das ist ___ Schwester. (moje)', 'meine', 'meine Schwester — ženský rod v 1. pádě.'],
    ['Das ist ___ Zimmer. (moje)', 'mein', 'mein Zimmer — střední rod v 1. pádě.'],
    ['Ich sehe ___ Bruder. (mého)', 'meinen', 'meinen Bruder — mužský rod ve 4. pádě má koncovku -en.'],
    ['Das ist ___ Bruder. (tvůj)', 'dein', 'du → dein-: dein Bruder.'],
    ['Das ist ___ Zimmer. (jeho; on)', 'sein', 'er → sein-: sein Zimmer.'],
    ['Das ist ___ Zimmer. (její)', 'ihr', 'sie (ona) → ihr-: ihr Zimmer.'],
    ['Das ist ___ Zimmer. (naše)', 'unser', 'wir → unser-: unser Zimmer.'],
    ['Das ist ___ Zimmer. (vaše; vy kamarádi)', 'euer', 'ihr → euer-: euer Zimmer.'],
    ['Das ist ___ Zimmer. (jejich)', 'ihr', 'sie (oni/ony) → ihr-: ihr Zimmer.'],
  ].forEach(([sentence, answer, solution]) => f('Tvar přivlastňovacího zájmena', `Doplň přivlastňovací zájmeno podle české nápovědy: **${sentence}**`,
    answer, solution, 2, 'Tvary v kontextu'));
  c('Přivlastnění při vykání', 'Jak doplníš „To je Vaše postel“, když jedné osobě vykáš? **Das ist ___ Bett.**',
    ['ihr', 'euer', 'Ihr', 'sein'], 2,
    'Při vykání se přivlastňovací Ihr píše s velkým I: Ihr Bett. Malé ihr by zde znamenalo její/jejich.', 3);
  p('Kdo je vlastníkem', 'Přiřaď vlastníka k přivlastňovacímu základu.', [
    ['ich', 'mein-'], ['du', 'dein-'], ['er / es', 'sein-'],
    ['wir', 'unser-'], ['ihr', 'euer-'], ['Sie (vykání)', 'Ihr-'],
  ], 'sie (ona) i sie (oni/ony) používají ihr-. Vykání Sie používá velké Ihr-.');
  c('Bratra vidím', 'Vyber správné doplnění: **Ich sehe ___ Bruder.** (můj bratr)',
    ['mein', 'meine', 'meinem', 'meinen'], 3, 'sehen zde vyžaduje 4. pád. Mužský rod: meinen Bruder.', 3);
  t('Dva významy stejného tvaru', 'Vysvětli, proč může „ihr Zimmer“ podle situace znamenat „její pokoj“ i „jejich pokoj“. Jak se odliší vykání?',
    'ihr- patří jak k sie (ona), tak k sie (oni/ony). Vlastníka určuje kontext. Vykání se píše s velkým I: Ihr Zimmer.');

  topic = 'Domlouvání schůzky a volný čas';
  p('Domluva s kamarádem', 'Přiřaď otázky a reakce k českým významům.', [
    ['Hast du am Samstag Zeit?', 'Máš v sobotu čas?'], ['Was hast du vor?', 'Co máš v plánu?'],
    ['Kommst du mit?', 'Půjdeš s námi?'], ['Das passt mir gut.', 'To mi vyhovuje.'],
    ['Ich habe leider keine Zeit.', 'Bohužel nemám čas.'],
  ], 'Čas a aktivitu domlouváme otázkami Hast du … Zeit?, Was hast du vor? a Kommst du mit?');
  s('Čas setkání', 'Kamarád souhlasí, že půjdete do parku. Potřebuješ se teď zeptat na přesnou hodinu schůzky.',
    'Kterou otázku mu položíš?', ['Was hast du vor?', 'Um wie viel Uhr treffen wir uns?', 'Wo ist der Park?', 'Wer kommt mit?'], 1,
    'Um wie viel Uhr treffen wir uns? = V kolik se sejdeme? Ostatní otázky se ptají na plán, místo nebo účastníky.');
  s('Nemáš volno', 'Kamarád tě zve ven, ale máš povinnosti a potřebuješ zdvořile odmítnout.',
    'Která reakce vyjadřuje, že bohužel nemáš čas?', ['Klar, gerne!', 'Das passt mir gut.', 'Ich habe leider keine Zeit.', 'Wir treffen uns um fünf Uhr.'], 2,
    'Ich habe leider keine Zeit. = Bohužel nemám čas.');
  s('Dohodnutá půl čtvrtá', 'Ve zprávě stojí „Wir treffen uns um halb vier.“ Chceš dorazit na dohodnutý čas odpoledne.',
    'Kdy máš dorazit?', ['ve 14:30', 'v 15:30', 'v 16:30', 'v 16:15'], 1,
    'halb vier je 3:30, při odpolední schůzce 15:30.');
  s('Každé úterý', 'Chceš kamarádovi napsat, že máš trénink pravidelně každé úterý.',
    'Která věta vyjadřuje pravidelnost přímo časovým příslovcem?', ['Ich habe um Dienstag Training.', 'Ich habe dienstags Training.', 'Ich habe gegen Dienstag Training.', 'Ich habe bis Dienstag Training.'], 1,
    'dienstags = každé úterý. Před hodinou je um, ale před názvem dne používáme am nebo příslovce dienstags.');
  c('Souhlas s pozváním', 'Jak přirozeně vyjádříš „Jasně, rád/a!“ jako reakci na pozvání?',
    ['Keine Ahnung.', 'Leider keine Zeit.', 'Klar, gerne!', 'Gute Nacht!'], 2, 'Klar, gerne! je souhlasná reakce na pozvání.', 1);
  c('Plány na odpoledne', 'Která otázka znamená „Co děláš odpoledne“?',
    ['Was machst du am Nachmittag?', 'Wann ist Nachmittag?', 'Wer kommt am Nachmittag?', 'Wo bist du am Nachmittag?'], 0,
    'Was machst du am Nachmittag? se ptá na činnost; wann na čas, wer na osobu a wo na místo.', 2);
  t('Zítřejší povinnosti', 'Přelož do němčiny „Zítra nemám čas.“',
    'Ich habe morgen keine Zeit. Možné je také Morgen habe ich keine Zeit. U časového údaje na začátku kontroluj habe na druhé pozici.');
  t('Den a hodina', 'Přelož do němčiny „V úterý v osm hodin.“',
    'am Dienstag um acht Uhr. Den má předložku am a přesná hodina um.');
  t('Krátký dialog', 'Napiš německy krátký dialog: zeptej se kamaráda na volný čas, navrhni park a domluvte konkrétní hodinu. Použij alespoň čtyři repliky.',
    'Vzor: A: Hast du morgen Zeit? B: Ja, am Nachmittag. Was hast du vor? A: Gehen wir in den Park? B: Gerne! Um wie viel Uhr? A: Um halb vier. B: Super, bis morgen! Přijatelné jsou jiné časy i jiné správné formulace.', 4);

  return exercises;
})();
