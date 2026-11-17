// Ekonomika 2. ročník – Notion EKO. Podklad: materialy/ekonomika/zdroj/notion-reprodukcni-proces.md
window.ECONOMICS_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Pojmy', scenario: 'Praktické situace', multi: 'Pojmy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', text: 'Vlastní vyjádření' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `eko-${String(++seq).padStart(3, '0')}`, subject: 'Ekonomika', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['EKO', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const k = (title, question, categories, items, solution, d = 3) => add('classification', title, question, { categories, items: items.map(([text, category], i) => ({ id: `i${i + 1}`, text, category })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const t = (title, question, answer, d = 3) => add('text', title, question, { answer, autoGrade: false }, answer, d);

  topic = 'Výroba, zboží a výrobní činitelé';
  c('Zboží', 'Kdy se výrobek stává zbožím?', ['Když je hmotný a vyrobený v továrně', 'Když je určený k prodeji', 'Když ho vyrobil stroj bez lidské práce', 'Když ho výrobce používá sám pro sebe'], 1, 'Zboží je výrobek určený k prodeji. Výrobek pro vlastní použití zbožím být nemusí.');
  c('Stříhání vlasů', 'Jak ekonomicky označíme ostříhání vlasů v kadeřnictví?', ['Jako službu', 'Jako hmotný výrobek', 'Jako výrobní činitel', 'Jako barter'], 0, 'Kadeřník nevytváří hmotný předmět, ale poskytuje službu.');
  c('Software', 'Čím je z pohledu výroby mobilní aplikace?', ['Výrobním prostorem', 'Přírodním zdrojem', 'Nehmotným produktem', 'Formou směny'], 2, 'Výsledek práce může být hmotný i nehmotný; aplikace nebo software jsou nehmotné produkty.');
  c('Výroba', 'Co dělá výroba se vstupy, jako jsou suroviny, stroje a práce?', ['Pouze je přerozděluje mezi občany', 'Mění je přímo na peníze bez výrobku', 'Spotřebovává je bez dalšího výsledku', 'Kombinuje je a vytváří z nich výrobky'], 3, 'Výroba využívá a kombinuje vstupy k vytváření výrobků; hospodářská činnost zahrnuje také služby.');
  c('Obecné výrobní faktory', 'Které tři výrobní faktory používá obecné ekonomické členění?', ['Nabídka, poptávka a cena', 'Práce, přírodní zdroje a kapitál', 'Výroba, směna a spotřeba', 'Peníze, reklama a zákazníci'], 1, 'Obecné členění výrobních faktorů je práce, přírodní zdroje a kapitál. Praktické členění podniku mluví o materiálu, strojích, lidech a prostorech.');
  k('Výrobek, zboží, nebo služba', 'Zařaď každý příklad do správné kategorie.', ['Zboží', 'Služba', 'Produkt, který není zbožím'], [
    ['Aplikace prodávaná zákazníkům v obchodě', 'Zboží'],
    ['Ostříhání vlasů', 'Služba'],
    ['Aplikace sdílená zdarma mezi přáteli', 'Produkt, který není zbožím'],
    ['Dort upečený pro vlastní oslavu', 'Produkt, který není zbožím'],
    ['Chléb, který pekárna vyrobí k prodeji', 'Zboží'],
    ['Oprava kola v cykloservisu', 'Služba'],
  ], 'Zboží je výrobek určený k prodeji. Činnost pro zákazníka bez hmotného výsledku je služba. Výrobek pro vlastní potřebu nebo rozdaný zdarma zbožím není.');
  k('Vstupy kavárny', 'Zařaď vstupy kavárny k výrobním činitelům.', ['Materiál', 'Stroje a vybavení', 'Pracovní síla', 'Nemovitosti a prostory'], [
    ['Kávová zrna a mléko', 'Materiál'],
    ['Kávovar', 'Stroje a vybavení'],
    ['Barista', 'Pracovní síla'],
    ['Pronajatá provozovna', 'Nemovitosti a prostory'],
    ['Účetní kavárny', 'Pracovní síla'],
    ['Mlýnek na kávu', 'Stroje a vybavení'],
  ], 'Suroviny jsou materiál, přístroje patří do strojů a vybavení, lidé (i účetní) jsou pracovní síla a provozovna patří k nemovitostem a prostorům.');
  p('Vstupy kadeřnictví', 'Přiřaď každou položku kadeřnictví k výrobnímu činiteli.', [
    ['Provozovna v pasáži', 'Nemovitosti a prostory'],
    ['Nůžky a fén', 'Stroje a vybavení'],
    ['Šampon a barva na vlasy', 'Materiál'],
    ['Kadeřnice', 'Pracovní síla'],
  ], 'I služba potřebuje vstupy: prostory, vybavení, spotřebovávaný materiál a práci lidí.');
  m('Pracovní síla', 'Které položky patří v podniku do pracovní síly?', ['Obsluha výrobní linky', 'Účetní', 'Plastový granulát', 'Ředitel', 'Výrobní hala', 'Marketingový pracovník'], [0, 1, 3, 5], 'Pracovní síla zahrnuje všechny lidi, kteří zajišťují výrobu i podpůrné činnosti – obsluhu, účetní, ředitele i marketing. Granulát je materiál, hala je prostor.');
  s('Robotická linka', 'Výrobce lahví nahradí ruční balení robotickou linkou a dva pracovníky přeřadí na kontrolu kvality.', 'Co se z ekonomického pohledu změnilo?', ['Výrobek se změnil na službu', 'Firma už nepotřebuje žádnou pracovní sílu', 'Změnila se kombinace vstupů – část práce nahradil stroj', 'Provoz je od této chvíle zaručeně bez poruch'], 2, 'Automatizace mění kombinaci výrobních vstupů. Lidé jsou stále potřeba a bezporuchový provoz nikdo nezaručí.');
  s('Plastová láhev', 'Firma vyrábí plastové láhve na vodu.', 'Která položka NENÍ vstupem výroby?', ['Plastový granulát pro výrobu', 'Vyfukovací stroj na láhve', 'Zákazník, který láhev koupí', 'Výrobní hala s linkou'], 2, 'Zákazník láhev kupuje – je součástí směny a spotřeby, ne vstupem výroby.');
  z('Výrobek a zboží', 'Doplň pojmy o zboží, službách a nehmotných produktech.', '{{a}} je výrobek určený k prodeji. Ostříhání vlasů je {{b}}. Software je {{c}} produkt.', [
    { id: 'a', options: ['Zboží', 'Služba', 'Kapitál'], answer: 'Zboží' },
    { id: 'b', options: ['zboží', 'služba', 'materiál'], answer: 'služba' },
    { id: 'c', options: ['hmotný', 'nehmotný', 'přírodní'], answer: 'nehmotný' },
  ], 'Zboží je výrobek pro prodej, ostříhání je služba, software je nehmotný produkt.');
  x('Tvrzení o výrobě', 'Najdi chybná tvrzení o výrobě.', ['Zboží je výrobek', 'určený pro vlastní spotřebu výrobce.', 'Ostříhání vlasů je služba.', 'Automatizace nahrazuje část rutinní práce', 'a zaručuje bezporuchový provoz.'], [1, 4], { 1: 'určený k prodeji.', 4: 'ale bezporuchový provoz nezaručuje.' }, 'Zboží je určeno k prodeji. Automatizace mění kombinaci vstupů, ale poruchám nezabrání.');
  v('Výrobek a služba', 'Rozhodni, zda je výsledkem hmotný výrobek, nebo služba.', 'Hmotný výrobek', 'Služba', [
    ['Židle z truhlárny', 'left'],
    ['Doučování matematiky', 'right'],
    ['Láhev minerální vody', 'left'],
    ['Výměna oleje v autoservisu', 'right'],
    ['Upečený dort na prodej', 'left'],
  ], 'Hmotný výrobek si zákazník odnese jako předmět, služba je činnost provedená pro zákazníka.');
  t('Výrobek a zboží', 'Vysvětli na vlastním příkladu rozdíl mezi výrobkem a zbožím.', 'Každé zboží je výrobek, ale ne každý výrobek je zboží. Zboží je výrobek určený k prodeji. Např. dort upečený pro vlastní oslavu je výrobek, dort upečený cukrárnou k prodeji je zboží.');

  topic = 'Reprodukční proces, trh a spotřeba';
  o('Fáze reprodukčního procesu', 'Seřaď fáze reprodukčního procesu podle jejich logické návaznosti.', ['Výroba', 'Rozdělování', 'Směna', 'Spotřeba'], 'Výroba → rozdělování → směna → spotřeba. Spotřeba vyvolává nové potřeby, a proces se proto opakuje.');
  c('Opakování procesu', 'Proč se hospodářské činnosti neustále opakují?', ['Protože to nařizuje stát', 'Protože uspokojení potřeb vyvolává další potřeby', 'Protože výrobky se nedají spotřebovat', 'Protože peníze ztrácejí hodnotu každý den'], 1, 'Potřeby se po uspokojení obnovují a vznikají nové, proto se výroba, rozdělování, směna i spotřeba opakují.');
  p('Typy reprodukce', 'Přiřaď typ reprodukce k tomu, jak se mění rozsah výroby.', [
    ['Prostá reprodukce', 'Rozsah zůstává stejný'],
    ['Rozšířená reprodukce', 'Rozsah roste'],
    ['Zúžená reprodukce', 'Rozsah klesá'],
  ], 'Prostá = stejný rozsah, rozšířená = roste, zúžená = klesá.');
  s('Pekárna bez mouky', 'Pekárna kvůli nedostatku mouky letos upeče o čtvrtinu méně rohlíků než loni.', 'O jaký typ reprodukce jde?', ['Prostou', 'Rozšířenou', 'Zúženou', 'Přerozdělovací'], 2, 'Rozsah výroby klesá, jde tedy o zúženou reprodukci.');
  s('Druhá linka', 'Firma otevře druhou výrobní linku a vyrobí výrazně víc výrobků než v předchozím roce.', 'Jak se nazývá reprodukce, při které se rozsah výroby zvětšuje?', ['Zúžená', 'Rozšířená', 'Prostá', 'Barterová'], 1, 'Rozsah výroby roste – rozšířená reprodukce.');
  c('Rozdělování', 'Co se děje ve fázi rozdělování?', ['Výsledky výroby a příjmy se rozdělují mezi ekonomické subjekty', 'Zákazník používá výrobek k uspokojení potřeby', 'Výrobek se mění za jiný výrobek bez peněz', 'Podnik nakupuje suroviny a stroje'], 0, 'Při rozdělování dostávají účastníci výroby odměnu za své vstupy (mzdu, zisk, nájem…).');
  c('Přerozdělování', 'K čemu slouží přerozdělování prostřednictvím státu?', ['K nákupu surovin pro soukromé firmy', 'Ke zrušení všech peněžních směn', 'K určení ceny každého výrobku', 'K financování veřejných a sociálních účelů'], 3, 'Stát část prostředků (např. z daní) přerozděluje na veřejné a sociální účely.');
  c('Barter', 'Co je barter?', ['Bezhotovostní platba kartou', 'Přímá směna bez použití peněz', 'Prodej zboží na elektronickém trhu', 'Půjčka peněz za úrok'], 1, 'Barter je přímá výměna výrobku nebo služby za jiný výrobek či službu, bez peněz.');
  s('Pronájem za aktovky', 'Majitel prostor je pronajme výrobci a místo nájemného dostane školní aktovky pro své děti.', 'Jaký druh směny proběhl?', ['Peněžní směna v hotovosti', 'Bezhotovostní nákup', 'Barter – služba za výrobky', 'Přerozdělování státem'], 2, 'Pronájem (služba) byl vyměněn za výrobky bez použití peněz – barter.');
  c('Trh', 'Jak je definován trh?', ['Pouze fyzická tržnice na náměstí', 'Prostředí, kde se setkává nabídka a poptávka', 'Seznam cen stanovený státem', 'Sklad, kde výrobce uchovává zboží'], 1, 'Trh nemusí být fyzické místo – patří sem i elektronický trh. Podstatné je setkání nabídky a poptávky.');
  m('Tvrzení o trhu', 'Která tvrzení o trhu a nákupu jsou pravdivá?', ['Trh může být i elektronický', 'Vyšší cena vždy zvýší poptávku', 'Poptávka je zájem kupujících spojený s možností koupit', 'O nákupu rozhoduje výhradně cena', 'Na nákup mají vliv i emoce a preference'], [0, 2, 4], 'Trh může být i online. Poptávka = zájem + ochota a možnost koupit. Rozhodnutí ovlivňuje cena, potřeba, kvalita, preference, motivace i emoce.');
  v('Nabídka a poptávka', 'Rozhodni, zda situace popisuje nabídku, nebo poptávku.', 'Nabídka', 'Poptávka', [
    ['Prodávající vystaví jablka na stánku', 'left'],
    ['Zákazník chce jablka koupit a má na ně peníze', 'right'],
    ['E-shop zařadí do sortimentu nová sluchátka', 'left'],
    ['Studenti shánějí levná sluchátka do školy', 'right'],
  ], 'Nabídku tvoří produkty prodávajících, poptávku zájem kupujících spojený s možností koupit.');
  k('Druhy spotřeby', 'Zařaď příklady podle druhu spotřeby.', ['Jednorázová spotřeba', 'Opakované používání'], [
    ['Snědení rohlíku', 'Jednorázová spotřeba'],
    ['Plnění vlastní láhve na vodu', 'Opakované používání'],
    ['Vypití kávy', 'Jednorázová spotřeba'],
    ['Nošení zimní bundy', 'Opakované používání'],
    ['Jízda do školy na vlastním kole', 'Opakované používání'],
    ['Použití jednorázové vstupenky', 'Jednorázová spotřeba'],
  ], 'Některé statky se spotřebují jednou (jídlo, vstupenka), jiné slouží opakovaně (láhev, bunda, kolo).');
  s('Další tričko', 'Jakub má plnou skříň oblečení, ale koupí si další tričko, protože se mu líbí jeho barva a styl.', 'Co nejlépe vysvětluje jeho nákup?', ['Šlo o barter, protože tričko vyměnil', 'Rozhodly preference a emoce, ne jen cena', 'Tričko bylo jediné zboží na celém trhu', 'Šlo o přerozdělování příjmů státem'], 1, 'Nákupní rozhodnutí nevysvětluje pouze cena nebo nutná potřeba – roli hrají i preference a emoce.');
  z('Hospodářský proces', 'Doplň fáze hospodářského procesu.', 'Proces začíná {{a}}. Výsledky se potom {{b}} mezi účastníky. Při {{c}} se výrobek mění za peníze nebo jiný produkt a nakonec dochází ke {{d}}.', [
    { id: 'a', options: ['výrobou', 'spotřebou', 'směnou'], answer: 'výrobou' },
    { id: 'b', options: ['spotřebují', 'rozdělují', 'vyrábějí'], answer: 'rozdělují' },
    { id: 'c', options: ['výrobě', 'spotřebě', 'směně'], answer: 'směně' },
    { id: 'd', options: ['spotřebě', 'výrobě', 'směně'], answer: 'spotřebě' },
  ], 'Výroba → rozdělování → směna → spotřeba.');
  x('Trh a směna', 'Najdi chybná tvrzení o trhu, barteru a ceně.', ['Trh je prostředí,', 'kde se setkává nabídka s poptávkou.', 'Barter je směna', 'za peníze v hotovosti.', 'Vyšší cena', 'vždy zvýší poptávku.'], [3, 5], { 3: 'bez použití peněz.', 5: 'sama o sobě vyšší poptávku nezaručí.' }, 'Barter probíhá bez peněz. Cena je jen jeden z faktorů – vyšší cena poptávku obvykle nezvyšuje.');
  t('Celý proces na příkladu', 'Popiš na příkladu kavárny všechny čtyři fáze reprodukčního procesu.', 'Výroba: barista z kávy, mléka a pomocí kávovaru připraví nápoj. Rozdělování: z tržeb dostanou zaměstnanci mzdu, majitel zisk, pronajímatel nájem, stát daně. Směna: zákazník zaplatí za kávu penězi. Spotřeba: zákazník kávu vypije a uspokojí svou potřebu.');

  return list;
})();
