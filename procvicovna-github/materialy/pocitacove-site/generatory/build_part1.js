const path = require('path');
// Generator of Computer Networks exercises based on "Počítačové sítě - 1. ročník.canvas"
const fs = require('fs');

const exercises = [
  // ============================================================
  // TÉMA 1: Základy a rozdělení sítí
  // ============================================================
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-001',
    type: 'choice',
    title: 'Co je to počítačová síť?',
    question: 'Jaká je správná definice počítačové (datové/komunikační) sítě podle studijních materiálů?',
    choices: [
      'Skupina zařízení propojených tak, aby mezi sebou komunikovala a sdílela prostředky podle stanovených pravidel',
      'Pouze propojení počítačů a serverů pomocí metalického ethernetového kabelu v jedné místnosti',
      'Systém výhradně pro dálkové bezdrátové ovládání domácích spotřebičů bez možnosti sdílení dat',
      'Programové vybavení počítače, které řídí běh aplikací v operačním systému'
    ],
    answer: 'Skupina zařízení propojených tak, aby mezi sebou komunikovala a sdílela prostředky podle stanovených pravidel',
    solution: 'Počítačová síť je skupina zařízení (počítačů, tiskáren, mobilních telefonů, tabletů, smart TV apod.) vzájemně propojených tak, aby mohla mezi sebou komunikovat a využívat vzájemně svých prostředků (HW, data, aplikace) podle předem stanovených pravidel.',
    hint: 'Zahrnuje jak hardware a data, tak komunikaci podle pravidel.',
    tags: ['Základy', 'Definice']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-002',
    type: 'choice',
    title: 'Důvody pro budování počítačových sítí',
    question: 'Které z následujících důvodů jsou hlavními důvody existence počítačových sítí?',
    choices: [
      'Sdílení HW prostředků (disky, tiskárny), sdílení dat/aplikací a vzájemná komunikace uživatelů',
      'Pouze možnost zrychlení taktovací frekvence procesoru na koncovém počítači',
      'Pouze instalace operačního systému bez nutnosti jakéhokoliv úložiště',
      'Výhradně chlazení síťových karet proudícím signálem'
    ],
    answer: 'Sdílení HW prostředků (disky, tiskárny), sdílení dat/aplikací a vzájemná komunikace uživatelů',
    solution: 'Hlavní přínosy sítí jsou: sdílení hardwarových prostředků (tiskárny, diskový prostor, výpočetní výkon serverů), sdílení dat a programů (data jsou uložena 1× a změny se projeví všude) a komunikace (e-mail, zprávy, web).',
    tags: ['Základy', 'Účel sítě']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-003',
    type: 'choice',
    title: 'Osobní síť (PAN)',
    question: 'Jak se označuje síť s dosahem v bezprostřední blízkosti jedné osoby (např. propojení mobilu, sluchátek či hodinek přes Bluetooth nebo USB)?',
    choices: [
      'PAN (Personal Area Network)',
      'LAN (Local Area Network)',
      'MAN (Metropolitan Area Network)',
      'WAN (Wide Area Network)'
    ],
    answer: 'PAN (Personal Area Network)',
    solution: 'PAN (Personal Area Network) pokrývá prostor v dosahu jedné osoby (jednotky metrů). K propojení využívá technologie jako Bluetooth, USB nebo FireWire.',
    hint: 'Zkratka vychází z anglického „Personal Area Network“.',
    tags: ['Dělení sítí', 'Rozlehlost', 'PAN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-004',
    type: 'choice',
    title: 'Lokální síť (LAN)',
    question: 'Co je charakteristické pro lokální síť (LAN)?',
    choices: [
      'Pokrývá budovu nebo areál (stovky metrů až jednotky km), bývá v soukromé správě a dosahuje rychlostí řádově Gb/s',
      'Pokrývá celý kontinent a využívá výhradně satelitní spoje',
      'Je omezena pouze na dosah jednoho metru od počítače',
      'Spojuje výhradně telekomunikační ústředny různých států'
    ],
    answer: 'Pokrývá budovu nebo areál (stovky metrů až jednotky km), bývá v soukromé správě a dosahuje rychlostí řádově Gb/s',
    solution: 'LAN (Local Area Network) funguje na vzdálenost stovek metrů až jednotek km (např. škola, firma, domov), má vysoké rychlosti (Gb/s) a bývá spravována jednou organizací či majitelem.',
    tags: ['Dělení sítí', 'LAN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-005',
    type: 'fill',
    title: 'Metropolitní síť (zkratka)',
    question: 'Jaká třípísmenná zkratka označuje metropolitní síť, která pokrývá město nebo aglomeraci a její páteř tvoří zpravidla optické kabely?',
    answer: 'MAN',
    solution: 'MAN (Metropolitan Area Network) je metropolitní síť pokrývající město či aglomeraci. Vyznačuje se vysokými rychlostmi a optickými páteřními trasami.',
    hint: 'M jako Metropolitan.',
    tags: ['Dělení sítí', 'MAN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-006',
    type: 'choice',
    title: 'Rozlehlá síť (WAN)',
    question: 'Který typ sítě pokrývá velká území mezi městy, státy či kontinenty a propojuje jednotlivé sítě LAN a MAN?',
    choices: [
      'WAN (Wide Area Network)',
      'LAN (Local Area Network)',
      'PAN (Personal Area Network)',
      'SAN (Storage Area Network)'
    ],
    answer: 'WAN (Wide Area Network)',
    solution: 'WAN (Wide Area Network) pokrývá velké geografické plochy (státy, kontinenty, globální internet). Využívá páteřní broadband technologie, podmořské kabely i satelitní spoje.',
    tags: ['Dělení sítí', 'WAN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-007',
    type: 'choice',
    title: 'Přenosová média v sítích',
    question: 'Jaká tři základní fyzikální prostředí (přenosová média) se v počítačových sítích používají pro šíření signálu?',
    choices: [
      'Kov (metalické kabely), vzduch/vakuum (elektromagnetické vlny) a sklo/plast (optická vlákna)',
      'Pouze měděné dráty a vodní paprsek',
      'Výhradně vzduch a infračervený plyn',
      'Pouze optické kabely a koaxiální vodiče bez možnosti bezdrátového přenosu'
    ],
    answer: 'Kov (metalické kabely), vzduch/vakuum (elektromagnetické vlny) a sklo/plast (optická vlákna)',
    solution: 'Přenosová média dělíme podle prostředí na: kov / metalické kabely (elektrický proud), vzduch / vakuum (elektromagnetické vlny v bezdrátových sítích) a sklo / plast (světelné pulzy v optických vláknech).',
    tags: ['Média', 'Fyzika sítí']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-008',
    type: 'choice',
    title: 'Bezdrátové sítě pro IoT',
    question: 'Které z následujících bezdrátových technologií jsou v materiálu uvedeny jako sítě pro IoT (Internet věcí)?',
    choices: [
      'ZigBee, RFID/NFC, NB-IoT, LoRaWAN, SigFox',
      'Pouze optický kabel s konektorem SC/APC',
      'Výhradně metalický kabel Cat 5e s konektorem RJ-45',
      'BNC konektory a terminátory 50 ohmů'
    ],
    answer: 'ZigBee, RFID/NFC, NB-IoT, LoRaWAN, SigFox',
    solution: 'Pro internet věcí (IoT) a senzory s nízkou spotřebou se využívají bezdrátové sítě jako ZigBee, RFID/NFC, NB-IoT (Narrowband IoT), LoRaWAN a SigFox.',
    tags: ['IoT', 'Bezdrátové sítě']
  },

  // Subtopic: Typy vysílání a přenosové módy
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-009',
    type: 'choice',
    title: 'Vysílání typu Unicast',
    question: 'Co charakterizuje vysílání typu Unicast?',
    choices: [
      'Komunikace 1:1 – data putují z jednoho zdroje k jednomu konkrétnímu příjemci',
      'Komunikace 1:všichni – data obdrží každé zařízení v dosahu bez výjimky',
      'Komunikace 1:n – data jsou doručena pouze vybrané skupině odběratelů',
      'Přenášení dat výhradně v analogové podobě bez adresace'
    ],
    answer: 'Komunikace 1:1 – data putují z jednoho zdroje k jednomu konkrétnímu příjemci',
    solution: 'Unicast je přímá komunikace mezi dvěma uzly (1:1), např. prohlížení webu mezi klientem a serverem nebo běžný telefonní hovor. Představuje nízkou zbytečnou zátěž pro ostatní stanice v síti.',
    tags: ['Vysílání', 'Unicast']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-010',
    type: 'choice',
    title: 'Vysílání typu Multicast',
    question: 'Co charakterizuje vysílání typu Multicast (komunikace 1:n)?',
    choices: [
      'Data jsou odeslána ze zdroje jednou a doručena pouze zařízením, která jsou součástí dané skupiny (např. videokonference)',
      'Data jsou odesílána každému účastníkovi v síti bez možnosti odhlášení',
      'Data smí přijímat vždy pouze jediné zařízení na světě',
      'Data mohou proudit pouze jedním kabelem bez větvení'
    ],
    answer: 'Data jsou odeslána ze zdroje jednou a doručena pouze zařízením, která jsou součástí dané skupiny (např. videokonference)',
    solution: 'Multicast (1:n) šetří šířku pásma: zdroj odešle paket pouze jednou a kopie se vytvoří až v místech, kde se cesty ke členům skupiny rozdělují. Příkladem jsou videokonference, IPTV nebo hromadné chaty.',
    tags: ['Vysílání', 'Multicast']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-011',
    type: 'choice',
    title: 'Vysílání typu Broadcast',
    question: 'Jak funguje broadcastové vysílání v síti?',
    choices: [
      'Data jsou odeslána z jednoho zdroje všem zařízením v síti (komunikace 1:všichni)',
      'Data jsou přísně šifrována tak, aby je mohl přečíst pouze jeden vybraný uzel',
      'Data putují pouze mezi sousedními dvěma zásuvkami',
      'Data se posílají pouze v noci při nízkém zatížení'
    ],
    answer: 'Data jsou odeslána z jednoho zdroje všem zařízením v síti (komunikace 1:všichni)',
    solution: 'Broadcast představuje všesměrové vysílání (1:všichni). Všechna zařízení v broadcastové doméně data přijmou a zpracují (např. ARP dotaz „Kdo má tuto IP adresu?“). Vytváří vyšší zátěž sítě.',
    tags: ['Vysílání', 'Broadcast']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-012',
    type: 'choice',
    title: 'Simplexní přenos',
    question: 'Který příklad nejlépe vystihuje simplexní režim přenosu (Simplex)?',
    choices: [
      'Tradiční televizní a rozhlasové vysílání, kde data proudí pouze od vysílače k přijímači bez jakékoliv zpětné vazby',
      'Telefonní hovor dvou lidí mluvících současně přes sebe',
      'Komunikace pomocí vysílaček, kde se po domluvení stiskne tlačítko pro přepnutí',
      'Obousměrné kopírování souborů mezi dvěma servery přes Ethernet'
    ],
    answer: 'Tradiční televizní a rozhlasové vysílání, kde data proudí pouze od vysílače k přijímači bez jakékoliv zpětné vazby',
    solution: 'V simplexním přenosu mohou data proudit pouze jedním směrem – od vysílače k přijímači. Přijímač nemůže odesílat žádnou odpověď ani potvrzení.',
    tags: ['Přenosové módy', 'Simplex']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-013',
    type: 'choice',
    title: 'Poloduplexní přenos (Half-Duplex)',
    question: 'Co je podstatou poloduplexního (Half-Duplex) přenosu?',
    choices: [
      'Obousměrná komunikace, ale v jednom okamžiku pouze jedním směrem (např. vysílačky walkie-talkie)',
      'Komunikace pouze jedním směrem napořád bez možnosti odpovědi',
      'Současné nezávislé vysílání i příjem dat oběma stanicemi naráz',
      'Přenášení pouze poloviny každého datového paketu'
    ],
    answer: 'Obousměrná komunikace, ale v jednom okamžiku pouze jedním směrem (např. vysílačky walkie-talkie)',
    solution: 'Half-duplex umožňuje komunikaci v obou směrech, ale střídavě. Pokud jedna stanice vysílá, druhá musí čekat na ukončení přenosu (např. vysílačky, starý sběrnicový Ethernet s kolizemi).',
    tags: ['Přenosové módy', 'Half-Duplex']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Typy vysílání a přenosové módy',
    id: 'ps-zaklady-014',
    type: 'choice',
    title: 'Plně duplexní přenos (Full-Duplex)',
    question: 'Jak funguje plně duplexní přenos (Full-Duplex) v moderních sítích?',
    choices: [
      'Obě zařízení mohou současně vysílat i přijímat data bez vzájemného čekání a kolizí',
      'Zařízení smí vysílat pouze o víkendech v plném provozu',
      'Signál se v kabelu odráží tam a zpět s dvojnásobným napětím',
      'Přenos je omezen pouze na jeden bajt za sekundu'
    ],
    answer: 'Obě zařízení mohou současně vysílat i přijímat data bez vzájemného čekání a kolizí',
    solution: 'Full-duplex umožňuje simultánní obousměrnou komunikaci (např. moderní přepínaný Ethernet přes samostatné páry pro TX a RX, telefonní hovory, Wi-Fi s moderními standardy).',
    tags: ['Přenosové módy', 'Full-Duplex']
  },

  // Subtopic: Historie a vývoj
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-015',
    type: 'number',
    title: 'Vznik sítě ARPANET',
    question: 'Ve kterém roce vzniklo první čtyřuzlové propojení (UCLA, Stanford, UCSB a University of Utah) sítě ARPANET?',
    answer: '1969',
    solution: 'Roku 1969 vzniklo první propojení 4 uzlů v rámci projektu ARPANET financovaného americkou vládní agenturou ARPA.',
    hint: 'Konec 60. let 20. století (rok přistání na Měsíci).',
    tags: ['Historie', 'ARPANET']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-016',
    type: 'choice',
    title: 'Paketový přenos vs přepojování okruhů',
    question: 'Jaký klíčový koncept nahradil tradiční přepojování okruhů (circuit switching) používané v telefonních sítích?',
    choices: [
      'Balíčkově orientovaná komunikace (packet switching) – data se dělí na pakety putující sítí nezávisle',
      'Přenášení celé zprávy pouze v jednom kuse bez jakéhokoliv dělení',
      'Použití analogových pásek zasílaných poštovní službou',
      'Zrušení adresace a posílání signálu náhodně do všech kabelů'
    ],
    answer: 'Balíčkově orientovaná komunikace (packet switching) – data se dělí na pakety putující sítí nezávisle',
    solution: 'Paul Baran (USA) a Donald Davies (Velká Británie) navrhli rozdělení dat na menší části – pakety (packet switching), které putují sítí nezávisle na sobě, což zajišťuje odolnost i při výpadku části sítě.',
    tags: ['Historie', 'Packet switching']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-017',
    type: 'choice',
    title: 'Autoři protokolů TCP a IP',
    question: 'Kteří dva vědci v roce 1974 publikovali práci, která definovala základní principy protokolů TCP a IP?',
    choices: [
      'Vint Cerf a Bob Kahn',
      'Steve Jobs a Steve Wozniak',
      'Bill Gates a Paul Allen',
      'Linus Torvalds a Richard Stallman'
    ],
    answer: 'Vint Cerf a Bob Kahn',
    solution: 'Vint Cerf a Bob Kahn publikovali v roce 1974 návrh protokolů TCP a IP, které se staly základem dnešního internetu.',
    tags: ['Historie', 'TCP/IP', 'Osobnosti']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-018',
    type: 'fill',
    title: 'Flag Day 1983',
    question: 'Jak se v historii internetu označuje den 1. ledna 1983, kdy ARPANET oficiálně přešel ze starého protokolu NCP na TCP/IP?',
    answer: 'Flag Day',
    solution: '1. ledna 1983 nastal tzv. „Flag Day“, kdy došlo k plnému přechodu sítě ARPANET z protokolu NCP na sadu TCP/IP. Tento den je považován za vznik internetu v moderním slova smyslu.',
    hint: 'Anglicky „den vlajky“.',
    tags: ['Historie', 'Flag Day']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-019',
    type: 'choice',
    title: 'Vznik World Wide Web (WWW)',
    question: 'Kdo v roce 1991 zveřejnil systém hypertextových dokumentů, který dal vzniknout službě World Wide Web (WWW)?',
    choices: [
      'Tim Berners-Lee',
      'Alan Turing',
      'Dennis Ritchie',
      'Ada Lovelace'
    ],
    answer: 'Tim Berners-Lee',
    solution: 'Tim Berners-Lee v CERNu navrhl a v roce 1991 zveřejnil systém World Wide Web (WWW), včetně prvního webového serveru a protokolu HTTP.',
    tags: ['Historie', 'WWW']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Historie a vývoj',
    id: 'ps-zaklady-020',
    type: 'number',
    title: 'Zavedení systému DNS',
    question: 'Ve kterém roce byl zaveden systém DNS (Domain Name System), který nahradil přímé používání číselných IP adres doménovými jmény?',
    answer: '1983',
    solution: 'Systém DNS byl vyvinut a zaveden v roce 1983 (RFC 882/883), aby umožnil přívětivé vyhledávání pomocí doménových jmen místo číselných IP adres.',
    hint: 'Tentýž rok jako Flag Day.',
    tags: ['Historie', 'DNS']
  }
];

console.log('Prepared initial set:', exercises.length);
fs.writeFileSync(path.join(__dirname, '..', 'vystupy', 'exercises_part1.json'), JSON.stringify(exercises, null, 2), 'utf8');
