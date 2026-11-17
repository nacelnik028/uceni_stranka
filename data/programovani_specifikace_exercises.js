// Programování 2. ročník – Notion PRG, Specifikace počítače. Podklad: materialy/programovani/zdroj/notion-specifikace-pocitace.md
window.PRG_SPEC_EXERCISES = (() => {
  const list = [];
  const topic = 'Specifikace počítače';
  let seq = 0;
  const SUB = { choice: 'Součásti a parametry', scenario: 'Čtení ze Správce úloh', multi: 'Součásti a parametry', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', number: 'Výpočty', text: 'Vlastní vyjádření' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `prg-spec-${String(++seq).padStart(3, '0')}`, subject: 'Programování', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['PRG', 'Správce úloh'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections, layout: 'lines' }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);

  c('Kde najdu parametry', 'Kde ve Windows rychle zjistíš model procesoru, velikost RAM, typ disku a grafické karty včetně aktuálního vytížení?', ['Ve Správci úloh na kartě Výkon', 'V Ovládacích panelech v části Písma', 'V Průzkumníku souborů v Rychlém přístupu', 'V nastavení tapety plochy'], 0, 'Správce úloh (Ctrl + Shift + Esc) → karta Výkon ukazuje CPU, paměť, disky, síť i GPU.');
  s('Jádra a vlákna', 'Správce úloh u procesoru Intel Core i7-13700 ukazuje: Jádra 16, Logické procesory 24.', 'Proč je logických procesorů víc než jader?', ['Část jader zvládá díky Hyper-Threadingu dvě vlákna najednou', 'Windows chybně počítá i jádra grafické karty', 'Každý paměťový modul přidává osm logických procesorů', 'Logické procesory jsou jádra v druhém soketu'], 0, 'i7-13700 má 8 výkonných jader s Hyper-Threadingem (8 × 2 = 16 vláken) a 8 úsporných jader bez něj (8 vláken). Celkem 24 logických procesorů.');
  n('Výpočet vláken', 'Procesor má 8 výkonných jader s Hyper-Threadingem (2 vlákna na jádro) a 8 úsporných jader bez Hyper-Threadingu. Kolik logických procesorů ukáže Správce úloh?', 24, '8 × 2 + 8 × 1 = 24 logických procesorů.');
  c('Základní rychlost', 'Co udává údaj „Základní rychlost: 2,10 GHz“ u procesoru?', ['Kapacitu mezipaměti L3', 'Rychlost přenosu dat po síti', 'Základní takt jádra procesoru', 'Počet operací disku za sekundu'], 2, 'GHz je frekvence – kolik miliard taktů za sekundu jádro zvládá. Při zátěži může procesor takt zvýšit (Turbo Boost).');
  o('Mezipaměti', 'Seřaď mezipaměti procesoru od nejmenší a nejrychlejší po největší a nejpomalejší.', ['L1', 'L2', 'L3'], 'L1 je nejblíž jádru, nejmenší a nejrychlejší; L3 je největší a sdílená mezi jádry. U i7-13700: L1 1,4 MB, L2 24 MB, L3 30 MB.');
  c('Virtualizace', 'Co znamená údaj „Virtualizace: Povoleno“ ve Správci úloh?', ['Počítač nemá žádný fyzický procesor', 'CPU podporuje běh virtuálních počítačů', 'Windows běží v cloudu místo na disku', 'Je zapnutá virtuální klávesnice na obrazovce'], 1, 'Hardwarová virtualizace (Intel VT-x) umožňuje efektivně provozovat virtuální stroje, např. v Hyper-V nebo VirtualBoxu.');
  n('Volné sloty', 'Správce úloh ukazuje u paměti „Použité sloty: 2 z 4“. Kolik paměťových slotů zbývá volných?', 2, 'Ze čtyř slotů jsou obsazené dva, volné jsou 2 – RAM lze rozšířit bez výměny stávajících modulů.');
  c('MT/s', 'Co znamená jednotka MT/s u rychlosti paměti DDR5 (např. 4400 MT/s)?', ['Megabajty za sekundu na disk', 'Milióny teplotních měření za sekundu', 'Megabity za sekundu v síti', 'Milióny přenosů dat za sekundu'], 3, 'MT/s = megatransfers per second. DDR přenáší data dvakrát za takt, proto se uvádí počet přenosů, ne MHz.');
  c('DIMM', 'Údaj „Parametry: DIMM“ u paměti říká, že jde o…', ['Paměťové moduly pro stolní počítače', 'Paměť zabudovaná přímo v procesoru', 'Úložiště typu SSD v rozhraní M.2', 'Malé moduly určené pro notebooky'], 0, 'DIMM je formát modulů pro desktopy; notebooky používají menší SO-DIMM.');
  c('Kapacita disku', 'Proč Windows obvykle ukazují u disku menší kapacitu, než uvádí výrobce na krabici?', ['Část kapacity je vždy fyzicky vadná', 'Windows počítají v binárních jednotkách', 'Výrobce záměrně uvádí nepravdivé údaje', 'Disk se při formátování fyzicky zmenší'], 1, 'Výrobce počítá 1 GB = 10⁹ B, Windows 1 GiB = 2³⁰ B. Proto se 1 TB zobrazí přibližně jako 931 GB.');
  c('Stránkovací soubor', 'Disk C má u položky „Stránkovací soubor“ hodnotu Ano. Co to znamená?', ['Na disku je uložen soubor s webovými stránkami', 'Disk nelze používat pro data uživatele', 'Disk je rozdělen na stránky po 4 kB jen pro tisk', 'Část disku slouží jako rozšíření operační paměti'], 3, 'Stránkovací soubor (pagefile.sys) je virtuální paměť – Windows na něj odkládají data, když RAM nestačí.');
  c('Privátní adresa', 'Počítač má IPv4 adresu 10.11.25.111. Jaký je to typ adresy?', ['Veřejná adresa dostupná z internetu', 'Privátní adresa pro vnitřní síť', 'Adresa loopback pro testování', 'Multicastová adresa'], 1, 'Rozsah 10.0.0.0/8 je privátní (RFC 1918) – používá se ve školních a firemních sítích za NATem.');
  c('Link-local IPv6', 'IPv6 adresa začíná fe80::. O jakou adresu jde?', ['Globální adresu přidělenou poskytovatelem', 'Adresu výchozí brány v síti školy', 'Link-local adresu platnou jen v místní síti', 'Adresu DNS serveru poskytovatele'], 2, 'Adresy fe80::/10 jsou link-local – každé rozhraní si ji vytvoří samo a směrovače ji dál nepředávají.');
  v('Dvě grafiky', 'Počítač má NVIDIA T1000 8GB a Intel UHD Graphics 770. Rozhodni, ke které grafice tvrzení patří.', 'NVIDIA T1000', 'Intel UHD Graphics 770', [
    ['Má vlastní vyhrazenou paměť 8 GB', 'left'],
    ['Je integrovaná přímo v procesoru', 'right'],
    ['Je to samostatná karta na sběrnici PCI 1', 'left'],
    ['Používá jako grafickou paměť sdílenou RAM', 'right'],
  ], 'T1000 je dedikovaná karta s vlastní pamětí; UHD 770 je integrovaná grafika procesoru i7-13700 a sdílí operační paměť.');
  c('DirectX', 'U obou grafik je uvedeno „Verze rozhraní DirectX: 12“. Co je DirectX?', ['Ovladač síťové karty od Intelu', 'Typ grafického konektoru na kartě', 'Výrobce grafických čipů pro notebooky', 'Rozhraní (API) pro grafiku a multimédia'], 3, 'DirectX je sada rozhraní pro hry a multimédia; FL 12.1 je podporovaná úroveň funkcí.');
  p('Součást a parametr', 'Přiřaď součást počítače k údaji, který k ní patří.', [
    ['Procesor', '16 jader, 24 logických procesorů'],
    ['Operační paměť', '32 GB DDR5, 4400 MT/s'],
    ['Disk C:', 'SSD, systémový disk'],
    ['Síťový adaptér', 'Intel I219-LM, IPv4 10.11.25.111'],
    ['Dedikovaná grafika', 'NVIDIA T1000 8GB'],
  ], 'Každá karta ve Správci úloh popisuje jednu součást: CPU, paměť, disk, síť a GPU.');
  x('Chybný popis sestavy', 'Spolužák popsal sestavu podle Správce úloh (i7-13700, 16 jader / 24 logických procesorů, RAM 2 z 4 slotů, SSD, NVIDIA T1000 + Intel UHD 770). Najdi chybné řádky.', [
    'Procesor: 16 jader a 24 logických procesorů',
    'Paměť: 32 GB DDR5, obsazené všechny čtyři sloty',
    'Disk C: SSD, je to systémový disk',
    'Intel UHD 770: samostatná karta s vlastní pamětí 8 GB',
  ], [1, 3], { 1: 'Paměť: 32 GB DDR5, obsazené 2 ze 4 slotů', 3: 'Intel UHD 770: integrovaná grafika procesoru' }, 'Volné jsou dva sloty a vlastní paměť 8 GB má NVIDIA T1000, ne integrovaná Intel UHD 770.');
  z('Údaje o procesoru', 'Doplň pojmy k procesoru a jeho mezipaměti.', 'Procesor se vkládá do {{a}} na základní desce. Fyzických {{b}} je 16, ale díky Hyper-Threadingu vidí systém 24 {{c}}. Nejrychlejší mezipamětí je {{d}}.', [
    { id: 'a', options: ['soketu', 'slotu DIMM', 'portu USB'], answer: 'soketu' },
    { id: 'b', options: ['jader', 'slotů', 'disků'], answer: 'jader' },
    { id: 'c', options: ['logických procesorů', 'grafických karet', 'paměťových modulů'], answer: 'logických procesorů' },
    { id: 'd', options: ['L1', 'L2', 'L3'], answer: 'L1' },
  ], 'Soket = patice procesoru; jádra vs. logické procesory (vlákna); L1 je nejblíž jádru a nejrychlejší.');

  return list;
})();
