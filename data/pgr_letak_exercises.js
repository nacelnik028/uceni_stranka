// Počítačová grafika 2. ročník – Notion PGR, Tiskový leták v Affinity. Podklad: materialy/pocitacova-grafika/zdroj/notion-tiskovy-letak.md
window.PC_GRAPHICS_2_EXERCISES = (() => {
  const list = [];
  const topic = 'Tiskový leták v Affinity';
  let seq = 0;
  const SUB = { choice: 'Tisková příprava', scenario: 'Praktické situace', multi: 'Tisková příprava', compare: 'Porovnání', cloze: 'Nastavení dokumentu', spot: 'Najdi chybu', order: 'Postupy', number: 'Hodnoty', match: 'Souvislosti' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `pgr2-${String(++seq).padStart(3, '0')}`, subject: 'Počítačová grafika', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['PGR', 'Affinity', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  v('Margin a bleed', 'Rozhodni, zda tvrzení patří k ochrannému okraji (margin), nebo ke spadávce (bleed).', 'Margin', 'Bleed / spadávka', [
    ['Leží uvnitř konečného formátu', 'left'],
    ['Přesahuje za konečný formát', 'right'],
    ['Drží důležité texty dál od kraje', 'left'],
    ['Zabrání bílému proužku po ořezu', 'right'],
  ], 'Margin je vnitřní pomocný okraj, spadávka je přesah pozadí za hranu pro ořez.');
  n('Spadávka ve cvičení', 'Kolik milimetrů spadávky se nastavuje na každé straně v procvičovaném letáku v Affinity?', 2, 'Ve cvičení 2 mm. Skutečnou hodnotu ale určuje tiskárna (často 3 nebo 5 mm).');
  n('Ochranný okraj', 'Kolik milimetrů má vnitřní ochranný okraj (Margins) nastavený ve cvičení s letákem?', 10, 'Důležité texty a prvky drž uvnitř okraje 10 mm.');
  c('Proč spadávka', 'Proč musí pozadí letáku přesahovat až do spadávky?', ['Aby byl výsledný soubor menší', 'Aby po ořezu nezůstal bílý proužek', 'Aby šel text v PDF upravovat', 'Aby po tisku fungoval QR kód'], 1, 'Pozadí a obrázky u kraje musí pokračovat i za konečný formát.');
  c('Ořezové značky', 'Co označují ořezové značky (crop marks) v PDF pro tisk?', ['Vyhrazené místo pro QR kód', 'Konečný formát pro řezání', 'Hranici ochranného okraje', 'Barevný profil dokumentu'], 1, 'Ořezové značky nenahrazují spadávku ani přesah barevného pozadí.');
  v('Fonty v PDF', 'Rozhodni, zda tvrzení platí pro Text as Curves, nebo pro vložení fontů (All Fonts).', 'Text as Curves', 'All Fonts', [
    ['Převede text na vektorové tvary', 'left'],
    ['Vloží písma přímo do PDF', 'right'],
    ['Text už nejde v PDF upravit jako text', 'left'],
    ['Text v PDF zůstane textem', 'right'],
  ], 'Obě volby zajistí zobrazení bez instalace fontu; co použít, určuje tiskárna. Cvičení vyžaduje Text as Curves.', 3);
  z('Nastavení letáku', 'Doplň nastavení dokumentu pro tiskový leták ze cvičení.', 'Formát {{a}} na výšku, rozlišení {{b}} DPI a barevný režim {{c}}, jednotky v milimetrech.', [
    { id: 'a', options: ['A5', 'A3', 'Full HD'], answer: 'A5' },
    { id: 'b', options: ['300', '96', '72'], answer: '300' },
    { id: 'c', options: ['CMYK', 'RGB', 'HSL'], answer: 'CMYK' },
  ], 'Webový návrh pracoval s RGB a 96 DPI; tisk A5, 300 DPI, CMYK (A4 je ve cvičení také přípustný).');
  c('Režim a profil', 'Jaký je vztah mezi barevným režimem (CMYK) a barevným profilem?', ['Je to přesně totéž', 'Různé údaje, profil upřesňuje barvy', 'Profil určuje velikost papíru', 'Režim určuje použité písmo'], 1, 'Režim říká, jakým modelem barvy popisujeme; profil, jak se mají konkrétně interpretovat.');
  o('QR kód v Affinity', 'Seřaď kroky vytvoření QR kódu v Affinity podle logické návaznosti.', ['Vybrat QR Code Tool ve skupině tvarů', 'Tažením vytvořit čtverec s kódem', 'V Data zvolit URL a zadat adresu', 'Nastavit výplň kontrastní k pozadí', 'Načíst kód mobilem a ověřit cíl'], 'Po každé další grafické úpravě kontrolu načtení zopakuj.');
  c('Ikona sociální sítě', 'Na letáku je jen ikona Instagramu bez dalšího textu. V čem je problém?', ['Ikony nejdou vůbec vytisknout', 'Na papír nejde kliknout, chybí adresa', 'Ikona musí být uložená v RGB', 'Ikona je moc malá pro 300 DPI'], 1, 'Přidej čitelnou adresu nebo QR kód s konkrétním cílem.');
  c('Klávesa X', 'Co dělá v Affinity klávesa X při práci s barvami objektu?', ['Smaže vybraný objekt', 'Přepne výplň a obrys', 'Exportuje dokument do PDF', 'Zrcadlí objekt vodorovně'], 1, 'Užitečné při nastavení výplně obdélníku pozadí a vypnutí obrysu.');
  c('Pozadí pod textem', 'Barevný obdélník pozadí zakrývá text letáku. Jak to opravíš?', ['Zvětším písmo na 72 bodů', 'V Layers dám pozadí pod text', 'Přepnu dokument do RGB', 'Vypnu ořezové značky'], 1, 'Pořadí vrstev určuje, co co překrývá.');
  c('Dva druhy zarovnání', 'Jak vycentruješ text uvnitř textového rámečku?', ['Panelem Alignment vůči plátnu', 'Zarovnáním odstavce', 'Klávesou X', 'Volbou Include bleed'], 1, 'Alignment zarovnává objekty (Align To), zarovnání odstavce řeší text uvnitř rámečku.');
  m('Export pro tisk', 'Které volby zkontroluješ při exportu letáku do PDF pro tisk podle cvičení?', ['Include bleed', 'Crop marks', 'Barevný režim RGB', 'Text as Curves', 'Rasterizace 300 DPI', 'Rozlišení 72 DPI'], [0, 1, 3, 4], 'File → Export → PDF (for print), vybrat správný artboard, zapnout spadávku a ořezové značky, fonty jako křivky.');
  s('Požadavek tiskárny', 'Tiskárna v podkladech uvádí: „Spadávka 3 mm na každé straně, fonty vložit do PDF.“', 'Jak upravíš nastavení ze cvičení?', ['Nechám 2 mm a křivky, cvičení platí vždy', 'Nastavím 3 mm a vložím fonty podle tiskárny', 'Spadávku vypnu úplně', 'Nastavím 10 mm, větší je lepší'], 1, 'Skutečné požadavky určuje tiskárna. Zbytečně velký přesah zvětšuje výstup.');
  c('Web a leták', 'Co je potřeba udělat s obsahem webového návrhu při tvorbě letáku?', ['Přenést vše včetně tlačítek a animací', 'Zjednodušit ho pro papír a zachovat vizuální styl', 'Použít úplně jiné barvy a písmo', 'Vložit JavaScript do PDF'], 1, 'Interaktivní prvky se na papíře neuplatní; značka má být poznat z letáku i webu.');
  c('Velikost textu', 'S jakou velikostí běžného textu se v ukázce letáku orientačně pracuje?', ['Kolem 6 bodů', 'Kolem 12 bodů', 'Kolem 48 bodů', 'Velikost nehraje roli'], 1, 'Menší text může být hůř čitelný; záleží i na písmu a velikosti tisku.');
  x('Tisková příprava', 'Najdi chybná tvrzení o tiskové přípravě.', ['Spadávka', 'leží uvnitř ochranného okraje.', 'Ořezové značky', 'plně nahrazují spadávku.', 'QR kód po grafických úpravách', 'je nutné znovu ověřit načtením.'], [1, 3], { 1: 'přesahuje za konečný formát.', 3: 'spadávku nenahrazují.' }, 'Spadávka je vně formátu, ochranný okraj uvnitř. Ořezové značky jen označují formát.');

  return list;
})();
