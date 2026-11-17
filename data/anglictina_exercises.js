// Anglický jazyk 2. ročník – Notion AJ. Podklad: materialy/anglictina/zdroj/
window.ENGLISH_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Význam a použití', scenario: 'Věty v kontextu', multi: 'Význam a použití', match: 'Slovní zásoba', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', fill: 'Doplňování', spot: 'Najdi chybu', diagnostic: 'Najdi chybu', order: 'Stavba věty', number: 'Porozumění', text: 'Vlastní vyjádření' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `anj-${String(++seq).padStart(3, '0')}`, subject: 'Anglický jazyk', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['ANJ', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const k = (title, question, categories, items, solution, d = 3) => add('classification', title, question, { categories, items: items.map(([text, category], i) => ({ id: `i${i + 1}`, text, category })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const f = (title, question, answer, solution, d = 2) => add('fill', title, question, { answer, autoGrade: true }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);
  const g = (title, question, items, solution, d = 3) => add('diagnostic', title, question, { items: items.map(([label, bad, detail], i) => ({ id: `d${i + 1}`, label, detail, correct: bad })), answerIds: items.map(([, bad], i) => bad ? `d${i + 1}` : null).filter(Boolean) }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const t = (title, question, answer, d = 3) => add('text', title, question, { answer, autoGrade: false }, answer, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  topic = 'Předpony – význam';
  c('Prefix a preposition', 'Jaký je rozdíl mezi anglickým prefix a preposition?', ['Prefix je samostatné slovo, preposition část slova', 'Prefix je část slova, preposition samostatné slovo', 'Oba pojmy znamenají předložku', 'Prefix se používá jen u sloves'], 1, 'Prefix (předpona) se připojuje před základ slova a mění jeho význam. Preposition (předložka) je samostatné slovo, např. in, on, under.');
  p('Význam předpon', 'Přiřaď předponu k jejímu významu.', [
    ['co-', 'společně, spolu-'],
    ['mis-', 'chybně, špatně'],
    ['ex-', 'bývalý'],
    ['multi-', 'mnoho, více'],
    ['semi-', 'poloviční, částečný'],
    ['sub-', 'pod, nižší úroveň'],
    ['re-', 'znovu'],
    ['post-', 'po, následně'],
  ], 'co-worker, misunderstand, ex-wife, multipurpose, semi-final, submarine, re-evaluate, post-war.');
  c('Misunderstand', 'Co znamená sloveso misunderstand?', ['Špatně pochopit', 'Vůbec neposlouchat', 'Rozumět velmi dobře', 'Znovu vysvětlit'], 0, 'understand = rozumět → misunderstand = špatně pochopit; misunderstanding = nedorozumění.');
  c('Misfortune', 'Co znamená podstatné jméno misfortune?', ['Bohatství', 'Neštěstí, smůla', 'Chybný odhad', 'Bývalé jmění'], 1, 'fortune = štěstí → misfortune = neštěstí, smůla.');
  c('Mislead', 'Co znamená sloveso mislead?', ['Vést tým', 'Uvést v omyl', 'Ztratit vedení v zápase', 'Znovu převzít vedení'], 1, 'lead = vést → mislead = uvést v omyl; misleading = zavádějící.');
  p('Slova s předponou', 'Přiřaď anglické slovo k českému významu.', [
    ['co-host', 'spolumoderátor'],
    ['ex-convict', 'bývalý vězeň'],
    ['misplace', 'založit věc a nemoci ji najít'],
    ['mishear', 'přeslechnout se'],
    ['multipurpose', 'víceúčelový'],
    ['sub-zero', 'pod nulou'],
  ], 'Význam předpony pomáhá odhadnout slovo: co- spolu, ex- bývalý, mis- chybně, multi- více, sub- pod.');
  f('Underpaid', 'Doplň předponu tak, aby věta znamenala, že za svou práci dostává příliš málo peněz: She is ___paid.', 'under', 'She is underpaid. – under- = nedostatečně, příliš málo.');
  f('Oversleep', 'Napiš minulý čas slovesa oversleep (zaspat).', 'overslept', 'Nepravidelný tvar sleep → slept zůstává i s předponou: oversleep → overslept.');
  c('Postman', 'Proč slovo postman (pošťák) není příkladem předpony post- s významem „po události“?', ['Protože post zde znamená pošta', 'Protože post- se píše vždy se spojovníkem', 'Protože postman je přídavné jméno', 'Protože předpona post- v angličtině neexistuje'], 0, 'V postman (a poster) je post samostatný základ – pošta. Předpona post- znamená „po“, např. post-war.');
  c('Semi-final', 'Kolik účastníků obvykle zbývá v semifinále vyřazovacího turnaje?', ['Dva', 'Osm', 'Čtyři', 'Šestnáct'], 2, 'Semi-final = čtyři účastníci, dva vítězové postoupí do finále. Quarter-final = osm, round of 16 = šestnáct.');
  o('Kola turnaje', 'Seřaď kola vyřazovacího turnaje od největšího počtu účastníků po finále.', ['round of 32', 'round of 16', 'quarter-final', 'semi-final', 'final'], '32 → 16 (osmifinále) → 8 (čtvrtfinále) → 4 (semifinále) → 2 (finále).');
  c('Semi-retired', 'Co znamená, že je někdo semi-retired?', ['Je úplně nezaměstnaný', 'Odešel do důchodu před rokem', 'Pracuje méně, ale ještě úplně neskončil', 'Pracuje dvě práce najednou'], 2, 'semi- = částečný → semi-retired = částečně v důchodu.');
  v('Over- a under-', 'Rozhodni, zda význam vyjadřuje předpona over-, nebo under-.', 'over- (příliš)', 'under- (nedostatečně)', [
    ['Přisoudit něčemu příliš vysokou hodnotu', 'left'],
    ['Dostávat za práci příliš málo peněz', 'right'],
    ['Spát déle, než měl – zaspat', 'left'],
    ['Podcenit soupeře', 'right'],
  ], 'overvalue / overestimate, oversleep × underpaid, underestimate.');
  c('Postgraduate', 'Co označuje postgraduate studies?', ['Studium po získání prvního vysokoškolského titulu', 'Studium na střední škole před maturitou', 'Kurzy celoživotního vzdělávání pro seniory', 'Studium bez jakýchkoli přijímacích zkoušek'], 0, 'Jde o studium navazující na první vysokoškolský titul – může to být i navazující magisterské studium.');
  c('Multifaceted', 'Co je multifaceted problem?', ['Problém, který se opakuje', 'Problém s jediným řešením', 'Mnohostranný problém s více aspekty', 'Problém, který nikoho nezajímá'], 2, 'multi- = mnoho; multifaceted = mnohostranný, lze k němu přistupovat z různých úhlů.');
  z('Předpony ve větách', 'Doplň do vět správnou předponu.', 'My {{a}}wife lives in Prague. I {{b}}spelled your name, sorry. The company had to {{c}}advertise the job. He is the {{d}}founder of the startup.', [
    { id: 'a', options: ['ex-', 'co-', 'sub-'], answer: 'ex-' },
    { id: 'b', options: ['re', 'mis', 'sub'], answer: 'mis' },
    { id: 'c', options: ['re-', 'ex-', 'sub-'], answer: 're-' },
    { id: 'd', options: ['ex-', 'co-', 'mis-'], answer: 'co-' },
  ], 'ex-wife (bývalá manželka), misspelled (napsal špatně), re-advertise (znovu inzerovat), co-founder (spoluzakladatel).');
  x('Předpona a spojovník', 'Najdi chybná tvrzení.', ['Předpona je', 'samostatné slovo ve větě.', 'Spojovník (hyphen)', 'je totéž co pomlčka.', 'Re-evaluate znamená', 'přehodnotit.'], [1, 3], { 1: 'součást slova.', 3: 'není totéž co pomlčka.' }, 'Předpona je součástí slova. Spojovník (-) spojuje části slova, pomlčka (–) odděluje části věty.');
  c('Re-evaluate', 'Které sloveso znamená „znovu posoudit, přehodnotit“?', ['overvalue', 're-evaluate', 'undervalue', 'misvalue'], 1, 're- = znovu → re-evaluate. Overvalue znamená přeceňovat.');
  c('Mini- a micro-', 'Jaký je rozdíl mezi předponami mini- a micro-?', ['Mini- znamená velký, micro- malý', 'Žádný – micro- se nikdy nepoužívá', 'Obě znamenají malý, micro- obvykle velmi malý', 'Micro- označuje jen elektroniku'], 2, 'Obě vyjadřují malou velikost; micro- obvykle velmi malou (minibus × microchip).');

  topic = 'Předpony v kontextu';
  c('Underachiever', 'Kdo je underachiever?', ['Člověk, který vždy a ve všem vyhrává', 'Člověk s horšími výsledky, než na jaké má', 'Člověk, který vůbec nechodí do školy', 'Člověk, který pravidelně pracuje přesčas'], 1, 'Underachieve = dosahovat horších výsledků, než odpovídá schopnostem nebo očekávání. Opak: overachiever.');
  c('Micromanage', 'Co znamená sloveso micromanage?', ['Řídit malou rodinnou firmu', 'Přehnaně kontrolovat i drobnosti', 'Pracovat s mikroskopem v laboratoři', 'Rozdělovat úkoly mezi členy týmu'], 1, 'micro- zde odkazuje na drobné detaily. Micromanager je obvykle kritické označení šéfa.');
  c('Undermine', 'Co znamená undermine someone\'s authority?', ['Podkopávat něčí autoritu', 'Posílit něčí autoritu', 'Převzít něčí autoritu', 'Podceňovat něčí výdělek'], 0, 'undermine = podkopávat, oslabovat pozici, důvěru nebo šanci na úspěch.');
  s('Šéf a e-maily', 'Vedoucí týmu kontroluje každý e-mail podřízených, než ho odešlou, a určuje jim i velikost písma v dokumentech.', 'Které sloveso jeho chování nejlépe vystihuje?', ['He overachieves.', 'He micromanages.', 'He undermines.', 'He misbehaves.'], 1, 'Přehnané řízení a kontrola drobností = micromanage.');
  s('Odhad', 'Odhadl jsi, že na koncert přijde 500 lidí. Přišlo jich 650.', 'Jak anglicky popíšeš svůj odhad?', ['I overshot the number.', 'I undershot the number.', 'I overreacted.', 'I mistyped the number.'], 1, 'Odhad zůstal pod skutečnou hodnotou – undershoot → undershot. Opak: overshoot.');
  f('Misspeak', 'Napiš minulý čas slovesa misspeak (přeřeknout se), tvar pro větu: Yesterday I ___ during the presentation.', 'misspoke', 'misspeak → misspoke → misspoken.');
  f('Co-write', 'Doplň třetí tvar slovesa: co-write → co-wrote → ___', 'co-written', 'Předpona nemění nepravidelné tvary: write → wrote → written, tedy co-written.');
  c('Old friend', 'Co vyjadřuje anglické old friend?', ['Bývalý přítel, se kterým už se nestýkáme', 'Dlouholetý přítel, přátelství trvá dál', 'Starší člověk, kterého vůbec neznáme', 'Bývalý spolužák ze základní školy'], 1, 'Old friend = dlouholetý přítel. Bývalého spolužáka označuje ex-classmate / former classmate.');
  c('Unfortunate', 'Jaké je běžné přídavné jméno k misfortune (neštěstí)?', ['misfortunate', 'unfortunate', 'disfortunate', 'nonfortunate'], 1, 'Podstatné jméno má předponu mis-, přídavné jméno un-: misfortune × unfortunate.');
  p('Slova z textu', 'Přiřaď výrazy z textu o filmové kariéře k jejich významu.', [
    ['pre-match interview', 'rozhovor před zápasem'],
    ['post-industrial', 'po období převahy průmyslu'],
    ['resale', 'další prodej'],
    ['drop out of university', 'zanechat studia před dokončením'],
    ['shipwreck', 'vrak lodi'],
  ], 'pre- = před, post- = po, re- = znovu; drop out = odejít ze školy; shipwreck = vrak.');
  k('Méně, nebo víc?', 'Zařaď slovesa podle toho, zda vyjadřují méně, nebo víc, než je potřeba či očekáváno.', ['Méně, než je potřeba', 'Víc, než je potřeba'], [
    ['underperform', 'Méně, než je potřeba'],
    ['overachieve', 'Víc, než je potřeba'],
    ['undercook', 'Méně, než je potřeba'],
    ['overreact', 'Víc, než je potřeba'],
    ['underappreciate', 'Méně, než je potřeba'],
    ['overshoot', 'Víc, než je potřeba'],
  ], 'under- = nedostatečně (underperform, undercook, underappreciate), over- = přehnaně (overachieve, overreact, overshoot).');
  c('Mistype', 'Jak přeložíš větu I mistyped your name?', ['Chybně jsem napsal tvé jméno.', 'Úplně jsem zapomněl tvé jméno.', 'Napsal jsem tvé jméno ještě jednou.', 'Špatně jsem slyšel tvé jméno.'], 0, 'mistype = napsat chybně na klávesnici.');

  topic = 'První podmínková věta';
  c('Kdy první podmínku', 'Kdy používáme first conditional?', ['Pro reálně možnou budoucí situaci', 'Pro nereálnou situaci v přítomnosti', 'Pro děj, který se stal v minulosti', 'Jen pro obecné pravdy a vědecká fakta'], 0, 'First conditional popisuje budoucí situaci, kterou považujeme za reálně možnou: If I get the job, I\'ll move.');
  c('Vzorec', 'Jak se tvoří první podmínková věta?', ['if + will, will + základní tvar', 'if + past simple, would + základní tvar', 'if + present simple, will + základní tvar', 'if + present perfect, would have'], 2, 'Po if je přítomný čas, v hlavní větě will / won\'t + základní tvar slovesa.');
  f('If I have time', 'Doplň správný tvar slovesa have: If I ___ time tomorrow, I\'ll call you.', 'have', 'Po if v první podmínce používáme přítomný čas, ne will: If I have time…');
  f('She becomes', 'Doplň správný tvar slovesa become: She\'ll earn a lot of money if she ___ a solicitor.', 'becomes', 'Přítomný čas po if, u she koncovka -s: if she becomes.');
  z('Won\'t', 'Doplň zápor do první podmínkové věty.', 'We {{a}} go skiing if there {{b}} enough snow.', [
    { id: 'a', options: ['won\'t', 'don\'t', 'wouldn\'t'], answer: 'won\'t' },
    { id: 'b', options: ['isn\'t', 'won\'t be', 'wasn\'t'], answer: 'isn\'t' },
  ], 'won\'t = will not. V hlavní větě je will / won\'t, ve větě s if přítomný čas (isn\'t).');
  c('Čárka', 'Která věta má správnou interpunkci?', ['If you text me I\'ll reply immediately.', 'I\'ll reply immediately, if you text me.', 'If you text me, I\'ll reply immediately.', 'If, you text me I\'ll reply immediately.'], 2, 'Podmínka na začátku → čárka za větou s if. Podmínka na konci → před if čárku nepíšeme.');
  x('Will po if', 'Najdi chybu ve větě o studiu na univerzitě.', ['If', 'she', 'will want', 'to go to university,', 'she', 'will have to', 'work very hard.'], [2], { 2: 'wants' }, 'Ve větě s if používáme přítomný čas: If she wants to go to university, she will have to work very hard.');
  x('Čárka před if', 'Najdi chybu ve větě o zvýšení platu.', ['I\'ll quit,', 'if', 'I don\'t get', 'a pay rise.'], [0], { 0: 'I\'ll quit' }, 'Když je podmínka na konci, před if se čárka nepíše: I\'ll quit if I don\'t get a pay rise.');
  v('První a druhá podmínka', 'Rozhodni, zda jde o první, nebo druhou podmínkovou větu.', 'First conditional', 'Second conditional', [
    ['If I get the job, I\'ll move.', 'left'],
    ['If I got the job, I would move.', 'right'],
    ['If it rains, we\'ll stay at home.', 'left'],
    ['If I were rich, I would buy a boat.', 'right'],
    ['Reálná budoucí možnost', 'left'],
    ['Hypotetická, méně pravděpodobná situace', 'right'],
  ], 'První podmínka: if + přítomný čas, will. Druhá: if + minulý tvar, would – hypotetická situace (minulý tvar neznamená minulost).');
  c('Otázka v hlavní větě', 'Co platí pro větu If you have time tomorrow, can you call me?', ['Je chybná, protože v hlavní větě chybí will', 'Hlavní věta smí být otázka, will tu není nutné', 'Po if mělo správně být will have', 'Jde o druhou podmínkovou větu s can'], 1, 'Hlavní věta může být otázkou nebo pokynem (get in touch); věta s if si ponechává přítomný čas.');
  o('Stavba věty', 'Seřaď části tak, aby vznikla správná podmínková věta začínající podmínkou.', ['If', 'you come home late,', 'your parents', 'will worry.'], 'If you come home late, your parents will worry. – podmínka, čárka, výsledek s will.');
  c('Překlad', 'Který překlad věty „Pokud nebude dost sněhu, nepůjdeme lyžovat.“ je správný?', ['We won\'t go skiing if there won\'t be enough snow.', 'We won\'t go skiing if there isn\'t enough snow.', 'We don\'t go skiing if there wasn\'t enough snow.', 'We wouldn\'t go skiing if there isn\'t enough snow.'], 1, 'Ve větě s if je přítomný čas (isn\'t), v hlavní větě won\'t.');
  z('Univerzita', 'Doplň slovesa do první podmínkové věty.', 'If she {{a}} to go to university, she {{b}} have to work very hard.', [
    { id: 'a', options: ['wants', 'will want', 'want'], answer: 'wants' },
    { id: 'b', options: ['will', 'would', 'is'], answer: 'will' },
  ], 'If she wants…, she will have to… – přítomný čas s -s po if, will v hlavní větě.');
  t('Vlastní věta', 'Napiš dvě vlastní věty v první podmínce o tom, co uděláš po maturitě – jednu s podmínkou na začátku a jednu na konci.', 'Např.: If I pass my exams, I\'ll go to university. I\'ll look for a job if I don\'t get into university. – Po if přítomný čas, ve výsledku will; čárka jen když je if na začátku.');

  topic = 'Spojovací výrazy';
  k('Funkce spojovacích výrazů', 'Zařaď spojovací výrazy podle jejich funkce.', ['Kontrast', 'Doplnění', 'Názor', 'Příklad', 'Přeformulování'], [
    ['however', 'Kontrast'],
    ['moreover', 'Doplnění'],
    ['in my opinion', 'Názor'],
    ['for instance', 'Příklad'],
    ['in other words', 'Přeformulování'],
    ['nevertheless', 'Kontrast'],
    ['what is more', 'Doplnění'],
    ['as I see it', 'Názor'],
    ['for example', 'Příklad'],
    ['what I mean is', 'Přeformulování'],
  ], 'Nejdřív urči vztah mezi myšlenkami: kontrast, doplnění, názor, příklad, nebo přeformulování.', 4);
  c('Although', 'Co následuje po although / even though?', ['Pouze podstatné jméno', 'Tvar slovesa na -ing', 'Věta s podmětem a slovesem', 'Předložka of'], 2, 'Although it was raining, we went out. – po although je celá věta.');
  c('Despite', 'Co může následovat po despite / in spite of?', ['Podstatné jméno, zájmeno nebo tvar na -ing', 'Pouze celá věta s podmětem a slovesem', 'Vždy předložka of a pak sloveso', 'Pouze sloveso v minulém čase'], 0, 'Despite the rain / despite being tired. Despite se používá bez of, in spite of s of.');
  x('Despite of', 'Najdi chybu ve větě o procházce v dešti.', ['Despite of', 'the rain,', 'we went for a walk.'], [0], { 0: 'Despite' }, 'Despite se používá bez of: Despite the rain… (nebo In spite of the rain…).');
  z('Although nebo despite', 'Doplň spojovací výrazy.', '{{a}} it was raining, we went for a walk. {{b}} the rain, we enjoyed the trip.', [
    { id: 'a', options: ['Although', 'Despite', 'However'], answer: 'Although' },
    { id: 'b', options: ['Although', 'Despite', 'Even though'], answer: 'Despite' },
  ], 'Although + věta (it was raining), despite + podstatné jméno (the rain).');
  c('However a čárka', 'Která dvojice vět má se slovem however správnou interpunkci?', ['The job is well paid, however it is stressful.', 'The job is well paid. However, it is stressful.', 'The job is well paid however, it is stressful.', 'The job is well paid. However it, is stressful.'], 1, 'However na začátku samostatné věty oddělíme čárkou. Samotná čárka mezi dvěma hlavními větami nestačí.');
  c('Formální názor', 'Který výraz pro vyjádření názoru je méně vhodný do formálního psaní?', ['In my opinion', 'From my point of view', 'For me', 'As I see it'], 2, 'For me je pro formální psaní méně vhodné; lepší je in my opinion, from my perspective, as I see it.');
  s('Fotografové', 'Photographers often travel around a lot, ___ some of them work in a studio.', 'Který výraz doplníš do věty o fotografech?', ['although', 'despite', 'moreover', 'for instance'], 0, 'Jde o kontrast mezi dvěma větami s podmětem a slovesem → although.');
  s('Trenér', 'Being a sports coach isn\'t that well paid. ___, it can be very rewarding.', 'Který výraz doplníš?', ['In other words', 'On the other hand', 'For example', 'What is more'], 1, 'Druhá věta stojí v kontrastu k první → On the other hand.');
  p('Překlad výrazů', 'Přiřaď spojovací výraz k jeho českému významu.', [
    ['however', 'avšak'],
    ['nevertheless', 'přesto'],
    ['moreover', 'kromě toho'],
    ['in other words', 'jinými slovy'],
    ['for instance', 'například'],
  ], 'Kontrast: however, nevertheless. Doplnění: moreover. Přeformulování: in other words. Příklad: for instance.');
  m('Po výrazu podstatné jméno', 'Po kterých výrazech může přímo následovat podstatné jméno nebo tvar na -ing?', ['despite', 'although', 'in spite of', 'even though', 'however'], [0, 2], 'Despite / in spite of + podstatné jméno nebo -ing. Although / even though + věta. However spojuje věty.');
  g('Kontrastní věty', 'Označ všechny chybné věty.', [
    ['Despite being tired, she finished the report.', false, 'Správně: despite + -ing.'],
    ['Although the bad weather, we played the match.', true, 'Chyba: although potřebuje větu – Although the weather was bad…'],
    ['In spite of the traffic, we arrived on time.', false, 'Správně: in spite of + podstatné jméno.'],
    ['Even though it was late, he kept working.', false, 'Správně: even though + věta.'],
    ['Despite it was cold, we went swimming.', true, 'Chyba: despite nemůže uvádět větu – Despite the cold… / Although it was cold…'],
  ], 'Although / even though + věta; despite / in spite of + podstatné jméno nebo -ing.');

  topic = 'Proměny povolání a automatizace';
  p('Povolání minulosti', 'Přiřaď povolání k jeho popisu.', [
    ['lamplighter', 'rozsvěcel a zhasínal pouliční lampy'],
    ['cooper', 'vyráběl a opravoval dřevěné sudy'],
    ['telephone operator', 'ručně propojoval telefonní linky'],
    ['lift operator', 'obsluhoval výtah'],
    ['toll booth attendant', 'vybíral poplatky v mýtné budce'],
    ['estate agent', 'zprostředkovává prodej a pronájem nemovitostí'],
  ], 'Technický vývoj některé činnosti nahradil (automatické ústředny, výtahy, elektronické mýto), jiné povolání se proměnila.');
  c('Lift a elevator', 'Jaký je rozdíl mezi lift a elevator?', ['Lift je nákladní, elevator osobní výtah', 'Lift je britské, elevator americké označení výtahu', 'Elevator je eskalátor, lift výtah', 'Lift je sloveso, elevator podstatné jméno'], 1, 'Lift = britská angličtina, elevator = americká; lift operator / elevator operator = obsluha výtahu.');
  c('Newsagent\'s', 'Co v britské angličtině označuje newsagent\'s?', ['Roznašeče novin', 'Redakci zpravodajství', 'Prodejnu novin a časopisů', 'Tiskovou agenturu'], 2, 'Newsagent je prodejce novin, newsagent\'s jeho prodejna. Roznašeč novin je paper delivery boy / girl.');
  c('Solicitor', 'Kdo je v britském kontextu solicitor?', ['Právník, který radí a sepisuje dokumenty', 'Prodejce, který obchází domácnosti', 'Úředník na úřadu práce v Londýně', 'Učitel na britské univerzitě'], 0, 'Solicitor poskytuje právní rady a připravuje právní dokumenty.');
  c('Lay off', 'Co znamená lay somebody off?', ['Povýšit zaměstnance na vedoucího', 'Propustit kvůli nedostatku práce', 'Poslat zaměstnance na školení', 'Převést zaměstnance na jinou práci'], 1, 'Lay off = propustit, obvykle kvůli nedostatku práce nebo peněz. Převedení na jinou práci je be transferred to another job.');
  f('Laid off', 'Doplň minulý tvar slovesa lay: The company ___ off 200 workers last year.', 'laid', 'lay → laid → laid; be laid off = být propuštěn.');
  c('Názor o budoucnosti', 'Co vyjadřuje věta I think some jobs are likely to change because of automation?', ['Jistý a ověřený fakt o budoucnosti', 'Názor a odhad pravděpodobného vývoje', 'Příkaz adresovaný zaměstnavateli', 'Popis události, která už proběhla'], 1, 'I think + be likely to vyjadřuje názor a pravděpodobnost, nikoli jistotu.');
  v('Překlad a tlumočení', 'Rozhodni, zda tvrzení patří k překladu, nebo k tlumočení.', 'Translation (překlad)', 'Interpreting (tlumočení)', [
    ['Práce s psaným textem', 'left'],
    ['Převod mluveného projevu do jiného jazyka', 'right'],
    ['Text lze opakovaně kontrolovat a upravovat', 'left'],
    ['Probíhá přímo během komunikace', 'right'],
  ], 'Translator pracuje s textem, interpreter s mluveným slovem v reálném čase.');
  v('Konsekutivní a simultánní', 'Rozhodni, ke kterému způsobu tlumočení tvrzení patří.', 'Consecutive', 'Simultaneous', [
    ['Mluvčí pronese část projevu, pak teprve mluví tlumočník', 'left'],
    ['Tlumočník mluví souběžně s krátkým odstupem', 'right'],
    ['Tlumočník si často dělá poznámky', 'left'],
    ['Na konferenci se používá kabina, sluchátka a mikrofon', 'right'],
  ], 'Consecutive = následné tlumočení po částech; simultaneous = souběžné, typicky z kabiny.');
  s('Konference', 'Na mezinárodní konferenci sedí tlumočnice ve zvukotěsné kabině. Do mikrofonu mluví česky jen s krátkým zpožděním za anglickým řečníkem a posluchači ji slyší ve sluchátkách.', 'O jaký způsob jde?', ['Consecutive interpreting', 'Simultaneous interpreting', 'Written translation', 'Machine translation'], 1, 'Souběžné tlumočení z kabiny = simultaneous interpreting.');
  c('Enslaved people', 'Proč se v současném historickém výkladu používá výraz enslaved people?', ['Je to gramaticky jediný správný tvar', 'Klade důraz na člověka, ne na otroctví', 'Je kratší a jednodušší než slave', 'Označuje jen lidi z 21. století'], 1, 'Nejde o gramatický zákaz slova slave; výraz klade důraz na člověka a na to, že mu byla svoboda vzata.');
  p('Digitalizace', 'Přiřaď výrazy k digitalizaci k jejich významu.', [
    ['hard copy', 'tištěná podoba'],
    ['no longer', 'už ne'],
    ['subscribe to newspapers', 'předplácet si noviny'],
    ['automated telephone system', 'automatizovaný telefonní systém'],
    ['guidebook', 'tištěný průvodce'],
  ], 'If this trend continues, travel agents will probably become unnecessary. – podmíněná předpověď v první podmínce.');
  x('Popisy povolání', 'Najdi chybný popis povolání.', ['A cooper', 'makes wooden barrels.', 'A lamplighter', 'repaired telephone lines.', 'An estate agent', 'sells and rents houses.'], [3], { 3: 'lit and put out street lamps.' }, 'Lamplighter rozsvěcel a zhasínal pouliční lampy; telefonní linky propojoval telephone operator.');

  topic = 'Studium, nebo práce';
  c('In the long run', 'Co znamená in the long run?', ['Při dlouhém běhu', 'Z dlouhodobého hlediska', 'Za velmi krátkou dobu', 'Na konci studia'], 1, 'In the long run, you are likely to have a better career and better pay.');
  k('Výhody a nevýhody studia', 'Zařaď výrazy podle toho, zda popisují spíše výhodu, nebo nevýhodu vysoké školy.', ['Výhoda', 'Nevýhoda'], [
    ['gain knowledge', 'Výhoda'],
    ['get qualifications', 'Výhoda'],
    ['end up in debt', 'Nevýhoda'],
    ['have a good social life', 'Výhoda'],
    ['pay high tuition fees', 'Nevýhoda'],
    ['have better career prospects', 'Výhoda'],
    ['get stressed and feel pressure', 'Nevýhoda'],
  ], 'Výhody jsou možné přínosy, ne záruka. Nevýhodou mohou být náklady, dluhy a stres.');
  p('Náklady na studium', 'Přiřaď výrazy o financování studia k jejich významu.', [
    ['tuition fees', 'školné'],
    ['scholarship', 'stipendium'],
    ['student loan', 'studentská půjčka'],
    ['repay a loan', 'splatit půjčku'],
    ['grade average', 'studijní průměr'],
    ['accommodation', 'bydlení'],
  ], 'Školné není jediný náklad – patří sem i bydlení, strava a knihy.');
  c('Stipendium', 'Co platí o scholarship?', ['Vždy pokryje úplně všechny náklady', 'Rozsah a podmínky se liší podle školy', 'Je to půjčka, kterou je nutné splatit', 'Dostane ho každý student automaticky'], 1, 'Rozsah stipendia a podmínky se liší; u sportovního stipendia mohou být důležité i studijní výsledky.');
  c('It depends', 'Jak přeložíš It depends on what you do?', ['Záleží na tom, co děláš.', 'Je to tvoje chyba.', 'Dělej, co chceš.', 'Nevím, co děláš.'], 0, 'Užitečná fráze při porovnávání studia a práce.');
  z('Dlouhodobě', 'Doplň slova do věty o výhodách studia.', 'In the long {{a}}, you are {{b}} to have a better career and better pay.', [
    { id: 'a', options: ['run', 'time', 'way'], answer: 'run' },
    { id: 'b', options: ['likely', 'like', 'probably'], answer: 'likely' },
  ], 'in the long run = z dlouhodobého hlediska; be likely to + sloveso = pravděpodobně.');
  c('Unemployed', 'Kdo se ve statistice počítá mezi nezaměstnané (unemployed)?', ['Každý, kdo zrovna nemá práci', 'Každý student střední či vysoké školy', 'Kdo nemá práci, hledá ji a může nastoupit', 'Kdo pracuje jen na částečný úvazek'], 2, 'Nestačí nemít práci – člověk ji musí hledat a být k dispozici. Student tedy automaticky nezaměstnaný není.');
  c('Rovnou do práce', 'Co znamená go straight into a job?', ['Nastoupit do práce bez dalšího studia', 'Chodit do práce každý den pěšky', 'Dostat výpověď hned první den', 'Pracovat jen během letních prázdnin'], 0, 'go to university × go straight into a job / go straight to work.');

  topic = 'Poslechy o práci';
  n('52 zaměstnání', 'Kolik různých zaměstnání vystřídal Sean Aiken během jednoho roku v projektu One Week Job?', 52, 'Každý týden jiné zaměstnání – 52 týdnů, 52 prací.');
  c('Otcova rada', 'Jakou radu dal Seanu Aikenovi otec, když po studiu nevěděl, co dělat?', ['Vzít první práci, kterou najde', 'Věnovat se něčemu, pro co je zapálený', 'Jít studovat znovu', 'Přestěhovat se do zahraničí'], 1, 'to be passionate about something = být pro něco zapálený.');
  c('Mzda', 'Co dělal Sean Aiken s výdělkem z týdenních prací?', ['Šetřil na dům', 'Daroval ho na charitu', 'Investoval do firmy', 'Utratil za cestování'], 1, 'Mzdu daroval na charitu, proto byl často short of money.');
  c('Nejtěžší práce', 'Která práce byla pro Seana nejnáročnější?', ['Rozhlasový DJ', 'Učitel jógy', 'Práce na farmě', 'Novinář'], 2, 'Na farmě vstával v pět ráno a práce byla fyzicky vyčerpávající.');
  m('Seanova zaměstnání', 'Která zaměstnání Sean během projektu vyzkoušel?', ['Rozhlasový DJ', 'Hasič', 'Pilot letadla', 'Pekař', 'Zubař', 'Učitel jógy'], [0, 1, 3, 5], 'Pracoval mimo jiné jako DJ, hasič, novinář, učitel jógy a pekař.');
  p('Slovní zásoba k práci', 'Přiřaď výrazy z poslechu o projektu One Week Job k jejich významu.', [
    ['rewarding', 'uspokojující, dávající smysl'],
    ['physically demanding', 'fyzicky náročný'],
    ['paramedic', 'zdravotnický záchranář'],
    ['be short of money', 'mít nedostatek peněz'],
    ['get on with somebody', 'vycházet s někým'],
    ['come up with an idea', 'přijít s nápadem'],
  ], 'Slovní zásoba z poslechu o projektu 52 zaměstnání.');
  c('Sally a kadeřnictví', 'Proč Sally Stone nepokračovala v přípravě na povolání kadeřnice?', ['Neudělala přijímací zkoušky do kurzu', 'Byla to špatně placená a nudná práce', 'Kurz byl kvůli nezájmu zrušen', 'Odstěhovala se do jiného města'], 1, 'Kadeřnictví ji nelákalo kvůli nízkému výdělku (badly paid) a chtěla něco challenging.');
  c('Kvalifikace', 'Je Sally qualified hairdresser?', ['Ano, kurz dokončila s vyznamenáním', 'Ano, ale nikdy nepracovala v oboru', 'Ne, protože přípravu nedokončila', 'Ne, protože kurz nikdy nezačala'], 2, 'Rozlišuj chodit do kurzu a complete a course. Sally kurz nedokončila.');
  c('Lots of people fail', 'Co přesně znamená věta Lots of people fail the test?', ['Mnoho lidí u zkoušky neuspěje', 'Většina lidí u zkoušky neuspěje', 'Všichni u zkoušky neuspějí', 'Nikdo zkoušku nesloží napoprvé'], 0, 'Lots of = mnoho, ne většina. Pozor na přesnost při poslechu.');
  p('Řidička kamionu', 'Přiřaď výrazy z poslechu o řidičce kamionu k jejich významu.', [
    ['lorry', 'nákladní automobil (BrE)'],
    ['behind the wheel', 'za volantem'],
    ['traffic jam', 'dopravní zácpa'],
    ['a nine-to-five job', 'práce s pevnou pracovní dobou'],
    ['stare at somebody', 'upřeně na někoho hledět'],
    ['on the first attempt', 'na první pokus'],
  ], 'V americké angličtině truck / truck driver.');
  c('Get used to', 'Která věta s vazbou get used to je správně?', ['I got used to drive alone.', 'I got used to driving alone.', 'I got use to driving alone.', 'I got used driving alone.'], 1, 'get used to + podstatné jméno / -ing: to je zde předložka.');
  c('College', 'Proč nemusí být college v britském kontextu správně přeloženo jako „vysoká škola“?', ['Znamená jen studentskou kolej', 'Může jít i o odbornou přípravu', 'Používá se výhradně v USA', 'Označuje vždy základní školu'], 1, 'V poslechu o Sally šlo o přípravu na řemeslo, ne o vysokou školu.');
  c('Dobrý řidič', 'Jaké vlastnosti má podle Sally mít dobrý řidič?', ['Rychlost a odvahu riskovat', 'Opatrnost, trpělivost a klid', 'Hlavně velkou fyzickou sílu', 'Znalost několika cizích jazyků'], 1, 'Jezdit opatrně a bezpečně, být trpělivý a nerozčilovat se na ostatní řidiče.');

  topic = 'Hledání práce a inzeráty';
  o('Od inzerátu k nabídce', 'Seřaď kroky hledání práce podle logické návaznosti.', ['Look for a job', 'See a job advert', 'Fill in an application form and send it off', 'Go for an interview', 'Get a job offer'], 'Hledám práci → najdu inzerát → podám žádost (formulář, CV) → pohovor → nabídka práce.');
  c('Experience', 'Která věta je správně, když experience znamená praxi?', ['They wanted someone with more experiences.', 'They wanted someone with more experience.', 'They wanted someone with an experience.', 'They wanted someone with many experience.'], 1, 'Ve významu praxe je experience nepočitatelné: more experience, some experience.');
  v('Kvalifikace', 'Rozhodni, zda popis odpovídá výrazu underqualified, nebo overqualified.', 'Underqualified', 'Overqualified', [
    ['Na pozici nemá potřebné vzdělání', 'left'],
    ['Inženýr se hlásí na místo pokladního', 'right'],
    ['Chybí mu požadované osvědčení', 'left'],
    ['Má víc zkušeností, než práce vyžaduje', 'right'],
  ], 'Vyšší kvalifikace sama o sobě přijetí nezaručuje.');
  c('Jobseeker a applicant', 'Jaký je rozdíl mezi jobseeker a applicant?', ['Žádný, jde o úplná synonyma', 'Applicant už podal žádost o místo', 'Jobseeker už má stálou práci', 'Applicant je vždy zaměstnavatel'], 1, 'Jobseeker hledá práci, applicant se uchází o konkrétní místo. Jeden člověk může být obojí.');
  c('Výhoda, ne podmínka', 'Co znamená v inzerátu previous experience is an advantage?', ['Bez praxe se nelze ucházet', 'Praxe je výhodou, ale není nutná', 'Zaměstnavatel praxi nechce', 'Praxe bude zaplacena navíc'], 1, 'Rozlišuj požadavek (essential) a výhodu (an advantage).');
  p('Čtení inzerátu', 'Přiřaď výrazy z inzerátu k jejich významu.', [
    ['rate of pay', 'sazba odměny'],
    ['according to experience', 'podle zkušeností'],
    ['to start immediately', 's okamžitým nástupem'],
    ['full training will be given', 'bude poskytnuto zaškolení'],
    ['temporary position', 'dočasná pozice'],
    ['computer skills essential', 'počítačové dovednosti nezbytné'],
  ], 'Typické výrazy z pracovních inzerátů.');
  k('Co inzerát říká', 'Zařaď formulace z inzerátu.', ['Požadavek', 'Výhoda', 'Nabídka zaměstnavatele'], [
    ['Computer skills essential', 'Požadavek'],
    ['Previous experience is an advantage', 'Výhoda'],
    ['Full training will be given', 'Nabídka zaměstnavatele'],
    ['Must be hard-working and honest', 'Požadavek'],
    ['Salary according to experience', 'Nabídka zaměstnavatele'],
    ['Knowledge of German is an advantage', 'Výhoda'],
  ], 'Essential / must = podmínka; an advantage = výhoda; will be given / salary = co nabízí firma.');
  s('Marek a inzerát', 'Inzerát: „Shop assistant required. Previous experience is an advantage. Full training will be given.“ Marek nikdy v obchodě nepracoval.', 'Co platí?', ['Marek se nemůže ucházet, chybí mu praxe', 'Marek se může ucházet – praxe není podmínkou a zaškolí ho', 'Marek musí nejdřív absolvovat placený kurz', 'Inzerát je určen jen pro bývalé zaměstnance'], 1, 'Praxe je jen výhoda a firma nabízí úplné zaškolení.');
  c('HR', 'Co znamená zkratka HR v názvu HR department?', ['Hardware Repair – oprava techniky', 'Human Resources – personální oddělení', 'High Rate – oddělení vysokých platů', 'Home Rental – pronájem bytů'], 1, 'HR = human resources; pohovoru se může účastnit člověk z HR a budoucí nadřízený.');
  c('Résumé', 'Jak se v americké angličtině běžně nazývá pracovní životopis?', ['Résumé', 'Curriculum', 'Application', 'Vacancy'], 0, 'V USA se pro běžný životopis používá résumé / resume; CV tam existuje hlavně v akademickém prostředí.');
  c('Maternity a parental leave', 'Jaký je rozdíl mezi maternity leave a parental leave?', ['Je to starý a nový název téže věci', 'Maternity = mateřská, parental = rodičovská dovolená', 'Maternity je pro otce, parental pro matky', 'Parental leave je neplacené volno pro studenty'], 1, 'Jde o odlišné výrazy – parental leave může čerpat kterýkoli rodič.');
  c('Go into', 'Co znamená věta She wants to go into banking?', ['Chce vykrást banku', 'Chce začít pracovat v bankovnictví', 'Chce si otevřít účet', 'Chce jít do banky pro peníze'], 1, 'go into + obor = vstoupit do profesní oblasti.');
  c('Successful applicant', 'Kdo je successful applicant?', ['Uchazeč, který byl vybrán', 'Uchazeč s nejvyšším platem', 'Bývalý zaměstnanec firmy', 'Člověk, který inzerát napsal'], 0, 'Successful applicant = vybraný uchazeč, který dostane nabídku (be offered a job).');

  topic = 'Ztráta a formy zaměstnání';
  v('Fired a redundant', 'Rozhodni, který výraz situaci lépe odpovídá.', 'be fired / dismissed', 'be made redundant', [
    ['Opakovaně porušoval firemní pravidla', 'left'],
    ['Továrna se zavřela a místo už není potřeba', 'right'],
    ['Dlouhodobě nevyhovující pracovní výkon', 'left'],
    ['Nevyjadřuje žádné pochybení zaměstnance', 'right'],
  ], 'Fired / dismissed / sacked – často kvůli zaměstnanci; made redundant – zaměstnavatel místo nepotřebuje.');
  c('Sacked', 'Jaký je výraz be sacked?', ['Formální, používaný v úředních dopisech', 'Neformální, zejména britský – být vyhozen', 'Americký výraz pro odchod do důchodu', 'Odborný výraz pro dočasné volno'], 1, 'be sacked = neformálně být vyhozen (BrE).');
  c('The dole', 'Co znamená be on the dole?', ['Být na dlouhé dovolené', 'Pobírat podporu v nezaměstnanosti', 'Pracovat na noční směny', 'Být v pracovní neschopnosti'], 1, 'The dole = neformální britský výraz pro podporu v nezaměstnanosti.');
  c('Between jobs', 'Co vyjadřuje věta I\'m between jobs?', ['Často střídám zaměstnavatele', 'Mám dvě práce současně', 'Teď jsem dočasně bez práce', 'Pracuji na částečný úvazek'], 2, 'Mírnější způsob, jak říct, že je člověk nezaměstnaný – mezi dvěma zaměstnáními.');
  c('Welfare state', 'Jak se anglicky řekne sociální stát?', ['socialist state', 'social state', 'welfare state', 'benefit state'], 2, 'Ustálené spojení je welfare state. Socialist znamená socialistický – výrazy nejsou zaměnitelné.');
  c('Redundant v technice', 'Co znamená redundant v technice, např. redundant power supply?', ['Rozbitý a nepoužitelný', 'Záložní, duplicitní součást zvyšující odolnost', 'Starý model určený k likvidaci', 'Součást, která spotřebovává moc energie'], 1, 'Technická redundance chrání proti výpadku, nemusí být zbytečná.');
  p('Nezaměstnanost a dávky', 'Přiřaď výrazy o nezaměstnanosti a dávkách k jejich významu.', [
    ['unemployment benefit', 'podpora v nezaměstnanosti'],
    ['child benefit', 'přídavek na dítě'],
    ['job centre', 'úřad práce'],
    ['welfare benefits', 'sociální dávky'],
    ['out of work', 'bez práce'],
  ], 'unemployed / jobless / out of work = bez práce; face unemployment = čelit nezaměstnanosti.');
  c('Brigáda', 'Jak správně přeložíš „Přes léto jsem měl brigádu“?', ['I had a brigade over the summer.', 'I had a temporary job over the summer.', 'I had a holiday job brigade.', 'I was a brigadier over the summer.'], 1, 'České brigáda nepřekládej jako brigade – použij temporary job, summer job nebo part-time job.');
  c('Temporary job', 'Co platí o výrazu temporary job?', ['Je vždy jen na částečný úvazek', 'Trvá omezenou dobu, úvazek může být plný', 'Znamená vždy práci z domova', 'Je to vždy práce bez smlouvy'], 1, 'Full-time / part-time = rozsah pracovní doby; temporary = trvání.');
  c('Freelance', 'Jaký je vztah mezi work freelance a be self-employed?', ['Jsou to dva přesné protiklady', 'Freelance je druh práce na vlastní účet', 'Self-employed znamená zaměstnanec firmy', 'Freelance znamená práci zadarmo'], 1, 'Freelancer pracuje na jednotlivých zakázkách; self-employed = jakákoli práce na vlastní účet.');
  c('Employee a employer', 'Kdo je employer?', ['Zaměstnanec', 'Zaměstnavatel', 'Uchazeč o práci', 'Personalista'], 1, 'Employer = zaměstnavatel, employee = zaměstnanec. Vedoucí týmu může být také employee.');
  x('Brigade', 'Najdi chybný výraz ve větě o letní práci.', ['I had', 'a brigade', 'in a café', 'over the summer.'], [1], { 1: 'a temporary job' }, 'Brigade je vojenská brigáda. Letní práce = temporary job / summer job.');
  f('Made redundant', 'Doplň chybějící slovo: The factory closed, so the workers were made ___.', 'redundant', 'be made redundant = být propuštěn pro nadbytečnost; redundant je přídavné jméno.');
  s('Úbytek zakázek', 'Firma přišla o velkou zakázku a kvůli nedostatku práce musela propustit 50 pracovníků z výroby. Nikdo z nich nic neporušil.', 'Který výraz nejlépe popisuje, co se pracovníkům stalo?', ['They were laid off.', 'They were sacked for bad behaviour.', 'They were promoted.', 'They went freelance.'], 0, 'Lay off = propustit kvůli nedostatku práce či omezení provozu.');

  topic = 'Žádost o zaměstnání';
  c('Neznámý adresát', 'Jak tradičně zakončíš britský formální dopis, který začíná Dear Sir or Madam?', ['Yours sincerely,', 'Yours faithfully,', 'Love and kisses,', 'See you soon,'], 1, 'Neznámé jméno: Dear Sir or Madam → Yours faithfully.');
  c('Známý adresát', 'Jak tradičně zakončíš britský formální dopis, který začíná Dear Mr Brown?', ['Yours faithfully,', 'Cheers,', 'Yours sincerely,', 'Best wishes, mate'], 2, 'Konkrétní příjemce: Dear Mr Brown → Yours sincerely.');
  o('Odstavce žádosti', 'Seřaď obsah odstavců žádosti o zaměstnání podle logické návaznosti.', ['Důvod psaní – o jaké místo žádám a kde jsem ho viděl', 'Představení a zájem o práci', 'Vhodnost pro pozici – zkušenosti a vlastnosti', 'Praktické údaje – příloha, pohovor, nástup', 'Závěr – očekávaná odpověď'], 'Každý hlavní bod patří do samostatného odstavce.');
  c('Look forward to', 'Která věta s vazbou look forward to je správně?', ['I look forward to hear from you.', 'I look forward to hearing from you.', 'I look forward hearing from you.', 'I am look forward to hear from you.'], 1, 'Ve vazbě look forward to je to předložka → následuje -ing.');
  x('Formální dopis', 'Najdi chybné řádky ve formální žádosti.', ['Dear Sir or Madam,', 'I\'m writing to apply for the position of IT assistant.', 'I have some experience of working in a hotel.', 'I look forward to hear from you.', 'Yours faithfully,'], [1, 3], { 1: 'I am writing to apply for the position of IT assistant.', 3: 'I look forward to hearing from you.' }, 'Ve formálním dopise plné tvary (I am); look forward to + -ing.', 3);
  c('Re:', 'Co znamená Re: v předmětu obchodního dopisu?', ['Odpověď na reklamaci', 'Ve věci / ohledně', 'Opakované odeslání', 'Doporučeně'], 1, 'Re: uvádí téma dopisu. V e-mailu ho navíc doplňuje poštovní program u odpovědí.');
  c('Zkušenosti v dopise', 'Která věta je ve formální žádosti správně?', ['I have an experience of work in hotel.', 'I have some experience of working in a hotel.', 'I have the experiences in working at hotel.', 'I have experiences of to work in a hotel.'], 1, 'experience je nepočitatelné, have experience of + -ing (nebo experience in + obor).');
  c('To whom it may concern', 'Kdy použiješ oslovení To whom it may concern?', ['Když píšeš kamarádovi', 'Když nevíš přesně, komu je dopis určen', 'Když znáš křestní jméno příjemce', 'Jen v soukromých e-mailech'], 1, 'Formální oslovení pro neznámého adresáta; celá fráze začíná To.');
  m('Části dopisu', 'Co patří do papírového formálního dopisu?', ['Adresa odesílatele', 'Datum', 'Emoji na konci', 'Oslovení', 'Podpis nad napsaným jménem', 'Slangový pozdrav'], [0, 1, 3, 4], 'Adresa odesílatele, datum, adresát, oslovení, předmět, text, rozloučení, podpis a čitelné jméno.');
  c('Formální styl', 'Co platí pro jazyk školního formálního dopisu?', ['Používáme zkratky I\'m a don\'t', 'Používáme plné tvary I am, do not', 'Přidáváme slang, aby byl dopis přátelský', 'Píšeme jen v přítomném průběhovém čase'], 1, 'Plné tvary, žádný slang; své možnosti formuluj přímo a kladně.');
  c('Furthermore', 'Co znamená furthermore ve formální žádosti?', ['Avšak, ale', 'Dále, kromě toho', 'Proto, tudíž', 'Nakonec, zkrátka'], 1, 'Furthermore přidává další argument.');
  z('Oslovení a rozloučení', 'Doplň oslovení a rozloučení do dopisu neznámému adresátovi.', 'Dear {{a}}, I am writing to apply for the position of IT Support Assistant. … I look forward to hearing from you. Yours {{b}},', [
    { id: 'a', options: ['Sir or Madam', 'friend', 'Mr Sir'], answer: 'Sir or Madam' },
    { id: 'b', options: ['faithfully', 'sincerely', 'lovely'], answer: 'faithfully' },
  ], 'Neznámý adresát: Dear Sir or Madam … Yours faithfully.');
  s('Dostupnost', 'Věta v žádosti: „If successful, I will be available to start in November.“', 'Co tím uchazeč sděluje?', ['Že v listopadu odchází z firmy', 'Že pokud bude vybrán, může nastoupit v listopadu', 'Že se v listopadu zúčastní pohovoru', 'Že chce začít pracovat až po úspěšném listopadu'], 1, 'If successful = pokud budu vybrán.');
  t('Úvod žádosti', 'Napiš anglicky první odstavec žádosti o místo IT Support Assistant: proč píšeš a kde ses o místě dozvěděl.', 'Např.: Dear Sir or Madam, I am writing to apply for the position of IT Support Assistant, which I recently saw advertised online. – plné tvary, formální styl.');

  return list;
})();
