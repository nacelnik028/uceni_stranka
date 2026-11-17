// Občanská nauka 2. ročník – Notion OBN. Podklad: materialy/obcanska-nauka/zdroj/notion-psychologie.md
window.CIVICS_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Pojmy', scenario: 'Praktické situace', multi: 'Pojmy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', text: 'Vlastní vyjádření' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `obn-${String(++seq).padStart(3, '0')}`, subject: 'Občanská nauka', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['OBN', 'zápisy z Notionu', 'psychologie'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const k = (title, question, categories, items, solution, d = 3) => add('classification', title, question, { categories, items: items.map(([text, category], i) => ({ id: `i${i + 1}`, text, category })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);
  const t = (title, question, answer, d = 3) => add('text', title, question, { answer, autoGrade: false }, answer, d);

  topic = 'Osobnost';
  c('Persona', 'Co původně znamenalo latinské slovo persona, od kterého je odvozen pojem osobnost?', ['Duše', 'Maska', 'Rod', 'Vůle'], 1, 'Persona = maska, kterou herci nosili v antickém divadle.');
  c('Osobnost', 'Která charakteristika osobnosti je správná?', ['Je neměnná od narození až do smrti', 'Je u všech členů rodiny úplně stejná', 'Je jedinečná, neopakovatelná a vyvíjí se', 'Je daná výhradně výchovou ve škole'], 2, 'Osobnost je souhrn biologických a psychických znaků – dynamický, jedinečný, neopakovatelný a vyvíjí se celý život.');
  c('Vývoj osobnosti', 'Jak dlouho se osobnost vyvíjí?', ['Po celý život', 'Jen do konce puberty', 'Jen v prvních třech letech', 'Pouze během školní docházky'], 0, 'Vývoj osobnosti probíhá po celý život.');
  k('Vlivy na osobnost', 'Zařaď vlivy na vývoj osobnosti.', ['Vnitřní (biologické) vlivy', 'Vnější (sociální) vlivy'], [
    ['Vrozené dispozice', 'Vnitřní (biologické) vlivy'],
    ['Výchova v rodině', 'Vnější (sociální) vlivy'],
    ['Prostředí, ve kterém člověk vyrůstá', 'Vnější (sociální) vlivy'],
    ['Dědičnost', 'Vnitřní (biologické) vlivy'],
    ['Kamarádi a spolužáci', 'Vnější (sociální) vlivy'],
  ], 'Vnitřní vlivy jsou vrozené (biologické), vnější vlivy přichází z prostředí – výchova, rodina, společnost.');
  c('Marshmallow experiment', 'Kdo provedl marshmallow experiment?', ['Carl Gustav Jung', 'Abraham Maslow', 'Ivan Petrovič Pavlov', 'Walter Mischel'], 3, 'Walter Mischel, Stanfordská univerzita, 70. léta.');
  s('Dva bonbony', 'Dítě dostane jeden marshmallow. Pokud ho nesní, dokud se dospělý nevrátí, dostane dva.', 'Co tento experiment zkoumá?', ['Inteligenci a krátkodobou paměť dítěte', 'Sebeovládání a odklad odměny', 'Chuťové preference malých dětí', 'Citový vztah dítěte k rodičům'], 1, 'Marshmallow experiment zkoumal sebeovládání (vůli) – zda dítě dokáže odložit okamžitou odměnu kvůli větší.');
  z('Experiment', 'Doplň údaje o marshmallow experimentu.', 'Experiment proběhl v {{a}} letech 20. století na {{b}} univerzitě a vedl ho {{c}}.', [
    { id: 'a', options: ['70.', '30.', '90.'], answer: '70.' },
    { id: 'b', options: ['Stanfordské', 'Karlově', 'Oxfordské'], answer: 'Stanfordské' },
    { id: 'c', options: ['Walter Mischel', 'Carl Gustav Jung', 'Abraham Maslow'], answer: 'Walter Mischel' },
  ], 'Walter Mischel, Stanfordská univerzita, 70. léta.');
  c('Jung', 'Které dva typy osobnosti rozlišil Carl Gustav Jung?', ['Optimista a pesimista', 'Extrovert a introvert', 'Vůdce a následovník', 'Cholerik a sangvinik'], 1, 'Jung rozlišil extroverta (zaměřen navenek) a introverta (zaměřen dovnitř).');
  v('Extrovert a introvert', 'Rozhodni, zda popis lépe sedí na extroverta, nebo introverta.', 'Extrovert', 'Introvert', [
    ['Energii načerpá ve společnosti lidí', 'left'],
    ['Po náročném dni potřebuje klid o samotě', 'right'],
    ['Rád mluví před velkou skupinou', 'left'],
    ['Nejdřív si věci promyslí v duchu', 'right'],
  ], 'Extrovert je zaměřen na vnější svět a lidi, introvert na vlastní vnitřní svět.');
  c('Rysy osobnosti', 'Co jsou rysy osobnosti?', ['Relativně stálé povahové vlastnosti', 'Okamžité nálady během dne', 'Fyzické znaky, jako je výška', 'Naučené školní znalosti'], 0, 'Rysy osobnosti jsou povahové vlastnosti s relativně stálým trváním.');
  m('Vlastnosti rysů', 'Které pojmy patří mezi vlastnosti rysů osobnosti?', ['Stálost', 'Náhodnost', 'Polarita', 'Hierarchie', 'Okamžitost', 'Hloubka'], [0, 2, 3, 5], 'Rysy mají individuálnost, stálost, univerzálnost, hierarchii, polaritu a hloubku.');
  t('Vnitřní a vnější vlivy', 'Uveď jeden vnitřní a jeden vnější vliv, který mohl ovlivnit tvou osobnost, a krátce je vysvětli.', 'Vnitřní vliv je vrozený (např. temperament, dědičné dispozice). Vnější vliv pochází z prostředí (např. výchova v rodině, kamarádi, škola).');

  topic = 'Motivace';
  c('Motivace', 'Co je motivace?', ['Vnitřní podněty, které vedou člověka k jednání', 'Pouze odměna od učitele', 'Soubor teoretických znalostí', 'Vrozený rys osobnosti, který se nemění'], 0, 'Motivace je hybná síla člověka – vnitřní podněty vedoucí k jednání.');
  c('Stimulace', 'Jak se nazývá vnější podnět, který člověka pobízí k činnosti?', ['Adaptace', 'Introverze', 'Stimulace', 'Kompetence'], 2, 'Stimulace = vnější podnět.');
  v('Vnitřní a vnější motivace', 'Rozhodni, zda jde o vnitřní, nebo vnější motivaci.', 'Vnitřní motivace', 'Vnější motivace', [
    ['Čtu knihu, protože mě baví', 'left'],
    ['Učím se, abych dostal od rodičů odměnu', 'right'],
    ['Trénuji, protože mě pohyb naplňuje', 'left'],
    ['Pracuji přesčas kvůli prémii', 'right'],
  ], 'Vnitřní motivace vychází ze zájmu a radosti z činnosti, vnější z odměny, trestu nebo tlaku okolí.');
  k('Pozitivní a negativní', 'Zařaď příklady motivace.', ['Pozitivní motivace', 'Negativní motivace'], [
    ['Pochvala za dobrou práci', 'Pozitivní motivace'],
    ['Hrozba poznámky', 'Negativní motivace'],
    ['Bonus za splněný cíl', 'Pozitivní motivace'],
    ['Strach z pokuty', 'Negativní motivace'],
  ], 'Pozitivní motivace láká odměnou, negativní působí hrozbou nebo strachem.');
  c('Maslow', 'Jak A. Maslow popsal vývoj člověka?', ['Jako řetězec voleb mezi jistotou a růstem', 'Jako proces řízený výhradně dědičností', 'Jako sled odměn a trestů od rodičů', 'Jako boj mezi introverzí a extroverzí'], 0, 'Podle Maslowa člověk neustále volí mezi jistotou a růstem.');
  c('Podmínka vývoje', 'Co je podle Maslowa podmínkou osobního vývoje?', ['Vyhýbání se jakékoli změně', 'Dostatek peněz a vlastního majetku', 'Ochota vykročit z komfortní zóny', 'Bezpodmínečná poslušnost autoritám'], 2, 'Vývoj podporuje radost z růstu a tendence vykročit z komfortní zóny.');
  p('Teorie sebedeterminace', 'Přiřaď potřeby teorie sebedeterminace k jejich významu.', [
    ['Autonomie', 'Být tvůrcem vlastního jednání'],
    ['Kompetence', 'Cítit se efektivní a schopný'],
    ['Sounáležitost', 'Potřeba někam patřit'],
  ], 'Teorie sebedeterminace pracuje se třemi základními potřebami: autonomie, kompetence, sounáležitost.');
  m('Tři potřeby', 'Které potřeby patří do teorie sebedeterminace?', ['Autonomie', 'Seberealizace', 'Kompetence', 'Bezpečí', 'Sounáležitost'], [0, 2, 4], 'Teorie sebedeterminace: autonomie, kompetence, sounáležitost. Bezpečí a seberealizace jsou pojmy z Maslowovy pyramidy potřeb.');
  s('Vlastní projekt', 'Učitel nechá studenty, aby si sami vybrali téma a postup ročníkového projektu. Studenti pracují s větším nasazením.', 'Kterou potřebu z teorie sebedeterminace učitel podpořil?', ['Sounáležitost', 'Autonomii', 'Kompetenci', 'Bezpečí'], 1, 'Možnost rozhodovat o vlastním jednání naplňuje potřebu autonomie.');
  s('Nováček v týmu', 'Nový hráč florbalového týmu chodí na všechny akce, protože chce, aby ho ostatní brali jako součást party.', 'Která potřeba ho motivuje nejvíc?', ['Kompetence', 'Autonomie', 'Sounáležitost', 'Stimulace'], 2, 'Potřeba někam patřit = sounáležitost.');
  t('Vlastní motivace', 'Popiš situaci, ve které tě pohání vnitřní motivace, a situaci, kde jde spíš o motivaci vnější.', 'Vnitřní: dělám činnost, protože mě baví nebo naplňuje (hraní na kytaru, programování vlastní hry). Vnější: dělám ji kvůli odměně nebo strachu z trestu (učení na písemku kvůli známce, brigáda kvůli penězům).');

  topic = 'Učení';
  c('Učení', 'Jak je definováno učení?', ['Jednorázové zapamatování faktů těsně před testem', 'Celoživotní osvojování znalostí, dovedností a hodnot', 'Pouze řízená výuka ve škole pod vedením učitele', 'Vrozená schopnost, kterou nelze nijak rozvíjet'], 1, 'Učení je celoživotní proces; jeho důsledkem jsou změny v jednání a myšlení.');
  c('Důsledek učení', 'Co je důsledkem učení?', ['Změny v jednání a myšlení', 'Změna temperamentu od narození', 'Pouze lepší známky', 'Ztráta návyků'], 0, 'Učení mění naše jednání a myšlení – je to přirozený mechanismus adaptace.');
  c('Adaptace', 'Proč se učení označuje jako přirozený mechanismus adaptace?', ['Probíhá výhradně ve školních lavicích', 'Řídí ho vždy a výhradně učitel', 'Pomáhá člověku přizpůsobit se okolí', 'Týká se pouze zvířat, ne lidí'], 2, 'Učením se přizpůsobujeme okolí a měnícím se podmínkám.');
  v('Záměrné a bezděčné učení', 'Rozhodni, zda jde o záměrné, nebo bezděčné učení.', 'Záměrné učení', 'Bezděčné učení', [
    ['Příprava na písemku z matematiky', 'left'],
    ['Zapamatuješ si melodii z reklamy', 'right'],
    ['Kurz programování v Pythonu', 'left'],
    ['Cestu do nové školy se naučíš tím, že jí chodíš', 'right'],
  ], 'Záměrné učení je úmyslné, bezděčné probíhá náhodně v každodenním životě.');
  p('Co si osvojujeme', 'Přiřaď pojmy k jejich významu.', [
    ['Vědomosti', 'Teoretické znalosti'],
    ['Dovednosti', 'Praktické znalosti – umět něco udělat'],
    ['Návyky', 'Činnosti zautomatizované opakováním'],
  ], 'Vědomosti = teorie, dovednosti = praxe, návyky vznikají opakováním.');
  k('Vědomost, dovednost, návyk', 'Zařaď příklady.', ['Vědomost', 'Dovednost', 'Návyk'], [
    ['Znát vzorec pro obsah kruhu', 'Vědomost'],
    ['Umět jezdit na kole', 'Dovednost'],
    ['Čistit si zuby každý večer', 'Návyk'],
    ['Vědět, kdy začala 1. světová válka', 'Vědomost'],
    ['Psát na klávesnici všemi deseti', 'Dovednost'],
    ['Automaticky se zout po příchodu domů', 'Návyk'],
  ], 'Vědomost je znalost, dovednost je schopnost něco udělat a návyk je opakováním zautomatizované jednání.');
  c('Vyučování', 'Co je vyučování?', ['Bezděčné učení v každodenním životě', 'Řízený proces učení', 'Učení výhradně pozorováním', 'Synonymum pro podmiňování'], 1, 'Vyučování je řízený proces učení.');
  m('Jak se učíme', 'Kterými způsoby se podle psychologie učíme?', ['Podmiňováním', 'Odměnami a tresty', 'Pozorováním', 'Pouhou dědičností', 'Výhradně ve spánku'], [0, 1, 2], 'Učíme se podmiňováním, prostřednictvím odměn a trestů a pozorováním.');
  c('Podmiňování', 'Co je podmiňování?', ['Učení výhradně z knih', 'Utváření spojů (asociací) mezi podněty', 'Zapomínání starých návyků', 'Napodobování chování idolů'], 1, 'Podmiňování vytváří asociace mezi podněty a pomáhá nám vyznat se v okolním světě.');
  s('Zvonek a jídlo', 'Pes dostával žrádlo vždy hned po zazvonění zvonku. Po čase začal slintat už při samotném zvuku zvonku.', 'Jakým způsobem se pes naučil reagovat?', ['Pozorováním', 'Podmiňováním', 'Vyučováním', 'Bezděčnou adaptací bez podnětu'], 1, 'Vzniklo spojení (asociace) mezi zvukem zvonku a jídlem – podmiňování.');
  s('Tkaničky', 'Malý Tomáš sleduje, jak si starší sestra zavazuje tkaničky, a za pár dní to zkusí sám stejným způsobem.', 'Jak se Tomáš učí?', ['Podmiňováním', 'Odměnou a trestem', 'Pozorováním', 'Vyučováním'], 2, 'Tomáš napodobuje chování, které viděl – učení pozorováním.');
  s('Uklizený pokoj', 'Lucie dostane pochvalu a kapesné navíc vždy, když má uklizený pokoj. Uklízí stále častěji.', 'Co její chování nejvíce ovlivňuje?', ['Odměny', 'Pozorování', 'Bezděčné učení', 'Introverze'], 0, 'Chování posilované odměnou se opakuje častěji.');
  x('Tvrzení o učení', 'Najdi chybná tvrzení o učení.', ['Učení je celoživotní proces.', 'Dovednosti jsou', 'teoretické znalosti.', 'Návyky vznikají opakováním.', 'Bezděčné učení je', 'vždy řízené učitelem.'], [2, 5], { 2: 'praktické znalosti.', 5: 'náhodné, probíhá v každodenním životě.' }, 'Dovednosti jsou praktické; bezděčné učení probíhá náhodně, řízené je vyučování.');

  return list;
})();
