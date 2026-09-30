// ============================================================
// ÚLOHY VYTVOŘENÉ PODLE MATERIÁLU "Počítačové sítě - 1. ročník.canvas"
// 110 úloh: základy, topologie, kabeláž, modely, adresace, služby
// ============================================================

window.NETWORK_EXERCISES = [
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-001",
    "type": "choice",
    "title": "Co je to počítačová síť?",
    "question": "Jaká je správná definice počítačové (datové/komunikační) sítě podle studijních materiálů?",
    "choices": [
      "Skupina zařízení propojených tak, aby mezi sebou komunikovala a sdílela prostředky podle stanovených pravidel",
      "Pouze propojení počítačů a serverů pomocí metalického ethernetového kabelu v jedné místnosti",
      "Systém výhradně pro dálkové bezdrátové ovládání domácích spotřebičů bez možnosti sdílení dat",
      "Programové vybavení počítače, které řídí běh aplikací v operačním systému"
    ],
    "answer": "Skupina zařízení propojených tak, aby mezi sebou komunikovala a sdílela prostředky podle stanovených pravidel",
    "solution": "Počítačová síť je skupina zařízení (počítačů, tiskáren, mobilních telefonů, tabletů, smart TV apod.) vzájemně propojených tak, aby mohla mezi sebou komunikovat a využívat vzájemně svých prostředků (HW, data, aplikace) podle předem stanovených pravidel.",
    "hint": "Zahrnuje jak hardware a data, tak komunikaci podle pravidel.",
    "tags": [
      "Základy",
      "Definice"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-002",
    "type": "choice",
    "title": "Důvody pro budování počítačových sítí",
    "question": "Které z následujících důvodů jsou hlavními důvody existence počítačových sítí?",
    "choices": [
      "Sdílení HW prostředků (disky, tiskárny), sdílení dat/aplikací a vzájemná komunikace uživatelů",
      "Pouze možnost zrychlení taktovací frekvence procesoru na koncovém počítači",
      "Pouze instalace operačního systému bez nutnosti jakéhokoliv úložiště",
      "Výhradně chlazení síťových karet proudícím signálem"
    ],
    "answer": "Sdílení HW prostředků (disky, tiskárny), sdílení dat/aplikací a vzájemná komunikace uživatelů",
    "solution": "Hlavní přínosy sítí jsou: sdílení hardwarových prostředků (tiskárny, diskový prostor, výpočetní výkon serverů), sdílení dat a programů (data jsou uložena 1× a změny se projeví všude) a komunikace (e-mail, zprávy, web).",
    "tags": [
      "Základy",
      "Účel sítě"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-003",
    "type": "choice",
    "title": "Osobní síť (PAN)",
    "question": "Jak se označuje síť s dosahem v bezprostřední blízkosti jedné osoby (např. propojení mobilu, sluchátek či hodinek přes Bluetooth nebo USB)?",
    "choices": [
      "PAN (Personal Area Network)",
      "LAN (Local Area Network)",
      "MAN (Metropolitan Area Network)",
      "WAN (Wide Area Network)"
    ],
    "answer": "PAN (Personal Area Network)",
    "solution": "PAN (Personal Area Network) pokrývá prostor v dosahu jedné osoby (jednotky metrů). K propojení využívá technologie jako Bluetooth, USB nebo FireWire.",
    "hint": "Zkratka vychází z anglického „Personal Area Network“.",
    "tags": [
      "Dělení sítí",
      "Rozlehlost",
      "PAN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-004",
    "type": "choice",
    "title": "Lokální síť (LAN)",
    "question": "Co je charakteristické pro lokální síť (LAN)?",
    "choices": [
      "Pokrývá budovu nebo areál (stovky metrů až jednotky km), bývá v soukromé správě a dosahuje rychlostí řádově Gb/s",
      "Pokrývá celý kontinent a využívá výhradně satelitní spoje",
      "Je omezena pouze na dosah jednoho metru od počítače",
      "Spojuje výhradně telekomunikační ústředny různých států"
    ],
    "answer": "Pokrývá budovu nebo areál (stovky metrů až jednotky km), bývá v soukromé správě a dosahuje rychlostí řádově Gb/s",
    "solution": "LAN (Local Area Network) funguje na vzdálenost stovek metrů až jednotek km (např. škola, firma, domov), má vysoké rychlosti (Gb/s) a bývá spravována jednou organizací či majitelem.",
    "tags": [
      "Dělení sítí",
      "LAN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-005",
    "type": "fill",
    "title": "Metropolitní síť (zkratka)",
    "question": "Jaká třípísmenná zkratka označuje metropolitní síť, která pokrývá město nebo aglomeraci a její páteř tvoří zpravidla optické kabely?",
    "answer": "MAN",
    "solution": "MAN (Metropolitan Area Network) je metropolitní síť pokrývající město či aglomeraci. Vyznačuje se vysokými rychlostmi a optickými páteřními trasami.",
    "hint": "M jako Metropolitan.",
    "tags": [
      "Dělení sítí",
      "MAN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-006",
    "type": "choice",
    "title": "Rozlehlá síť (WAN)",
    "question": "Který typ sítě pokrývá velká území mezi městy, státy či kontinenty a propojuje jednotlivé sítě LAN a MAN?",
    "choices": [
      "WAN (Wide Area Network)",
      "LAN (Local Area Network)",
      "PAN (Personal Area Network)",
      "SAN (Storage Area Network)"
    ],
    "answer": "WAN (Wide Area Network)",
    "solution": "WAN (Wide Area Network) pokrývá velké geografické plochy (státy, kontinenty, globální internet). Využívá páteřní broadband technologie, podmořské kabely i satelitní spoje.",
    "tags": [
      "Dělení sítí",
      "WAN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-007",
    "type": "choice",
    "title": "Přenosová média v sítích",
    "question": "Jaká tři základní fyzikální prostředí (přenosová média) se v počítačových sítích používají pro šíření signálu?",
    "choices": [
      "Kov (metalické kabely), vzduch/vakuum (elektromagnetické vlny) a sklo/plast (optická vlákna)",
      "Pouze měděné dráty a vodní paprsek",
      "Výhradně vzduch a infračervený plyn",
      "Pouze optické kabely a koaxiální vodiče bez možnosti bezdrátového přenosu"
    ],
    "answer": "Kov (metalické kabely), vzduch/vakuum (elektromagnetické vlny) a sklo/plast (optická vlákna)",
    "solution": "Přenosová média dělíme podle prostředí na: kov / metalické kabely (elektrický proud), vzduch / vakuum (elektromagnetické vlny v bezdrátových sítích) a sklo / plast (světelné pulzy v optických vláknech).",
    "tags": [
      "Média",
      "Fyzika sítí"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-008",
    "type": "choice",
    "title": "Bezdrátové sítě pro IoT",
    "question": "Které z následujících bezdrátových technologií jsou v materiálu uvedeny jako sítě pro IoT (Internet věcí)?",
    "choices": [
      "ZigBee, RFID/NFC, NB-IoT, LoRaWAN, SigFox",
      "Pouze optický kabel s konektorem SC/APC",
      "Výhradně metalický kabel Cat 5e s konektorem RJ-45",
      "BNC konektory a terminátory 50 ohmů"
    ],
    "answer": "ZigBee, RFID/NFC, NB-IoT, LoRaWAN, SigFox",
    "solution": "Pro internet věcí (IoT) a senzory s nízkou spotřebou se využívají bezdrátové sítě jako ZigBee, RFID/NFC, NB-IoT (Narrowband IoT), LoRaWAN a SigFox.",
    "tags": [
      "IoT",
      "Bezdrátové sítě"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-009",
    "type": "choice",
    "title": "Vysílání typu Unicast",
    "question": "Co charakterizuje vysílání typu Unicast?",
    "choices": [
      "Komunikace 1:1 – data putují z jednoho zdroje k jednomu konkrétnímu příjemci",
      "Komunikace 1:všichni – data obdrží každé zařízení v dosahu bez výjimky",
      "Komunikace 1:n – data jsou doručena pouze vybrané skupině odběratelů",
      "Přenášení dat výhradně v analogové podobě bez adresace"
    ],
    "answer": "Komunikace 1:1 – data putují z jednoho zdroje k jednomu konkrétnímu příjemci",
    "solution": "Unicast je přímá komunikace mezi dvěma uzly (1:1), např. prohlížení webu mezi klientem a serverem nebo běžný telefonní hovor. Představuje nízkou zbytečnou zátěž pro ostatní stanice v síti.",
    "tags": [
      "Vysílání",
      "Unicast"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-010",
    "type": "choice",
    "title": "Vysílání typu Multicast",
    "question": "Co charakterizuje vysílání typu Multicast (komunikace 1:n)?",
    "choices": [
      "Data jsou odeslána ze zdroje jednou a doručena pouze zařízením, která jsou součástí dané skupiny (např. videokonference)",
      "Data jsou odesílána každému účastníkovi v síti bez možnosti odhlášení",
      "Data smí přijímat vždy pouze jediné zařízení na světě",
      "Data mohou proudit pouze jedním kabelem bez větvení"
    ],
    "answer": "Data jsou odeslána ze zdroje jednou a doručena pouze zařízením, která jsou součástí dané skupiny (např. videokonference)",
    "solution": "Multicast (1:n) šetří šířku pásma: zdroj odešle paket pouze jednou a kopie se vytvoří až v místech, kde se cesty ke členům skupiny rozdělují. Příkladem jsou videokonference, IPTV nebo hromadné chaty.",
    "tags": [
      "Vysílání",
      "Multicast"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-011",
    "type": "choice",
    "title": "Vysílání typu Broadcast",
    "question": "Jak funguje broadcastové vysílání v síti?",
    "choices": [
      "Data jsou odeslána z jednoho zdroje všem zařízením v síti (komunikace 1:všichni)",
      "Data jsou přísně šifrována tak, aby je mohl přečíst pouze jeden vybraný uzel",
      "Data putují pouze mezi sousedními dvěma zásuvkami",
      "Data se posílají pouze v noci při nízkém zatížení"
    ],
    "answer": "Data jsou odeslána z jednoho zdroje všem zařízením v síti (komunikace 1:všichni)",
    "solution": "Broadcast představuje všesměrové vysílání (1:všichni). Všechna zařízení v broadcastové doméně data přijmou a zpracují (např. ARP dotaz „Kdo má tuto IP adresu?“). Vytváří vyšší zátěž sítě.",
    "tags": [
      "Vysílání",
      "Broadcast"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-012",
    "type": "choice",
    "title": "Simplexní přenos",
    "question": "Který příklad nejlépe vystihuje simplexní režim přenosu (Simplex)?",
    "choices": [
      "Tradiční televizní a rozhlasové vysílání, kde data proudí pouze od vysílače k přijímači bez jakékoliv zpětné vazby",
      "Telefonní hovor dvou lidí mluvících současně přes sebe",
      "Komunikace pomocí vysílaček, kde se po domluvení stiskne tlačítko pro přepnutí",
      "Obousměrné kopírování souborů mezi dvěma servery přes Ethernet"
    ],
    "answer": "Tradiční televizní a rozhlasové vysílání, kde data proudí pouze od vysílače k přijímači bez jakékoliv zpětné vazby",
    "solution": "V simplexním přenosu mohou data proudit pouze jedním směrem – od vysílače k přijímači. Přijímač nemůže odesílat žádnou odpověď ani potvrzení.",
    "tags": [
      "Přenosové módy",
      "Simplex"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-013",
    "type": "choice",
    "title": "Poloduplexní přenos (Half-Duplex)",
    "question": "Co je podstatou poloduplexního (Half-Duplex) přenosu?",
    "choices": [
      "Obousměrná komunikace, ale v jednom okamžiku pouze jedním směrem (např. vysílačky walkie-talkie)",
      "Komunikace pouze jedním směrem napořád bez možnosti odpovědi",
      "Současné nezávislé vysílání i příjem dat oběma stanicemi naráz",
      "Přenášení pouze poloviny každého datového paketu"
    ],
    "answer": "Obousměrná komunikace, ale v jednom okamžiku pouze jedním směrem (např. vysílačky walkie-talkie)",
    "solution": "Half-duplex umožňuje komunikaci v obou směrech, ale střídavě. Pokud jedna stanice vysílá, druhá musí čekat na ukončení přenosu (např. vysílačky, starý sběrnicový Ethernet s kolizemi).",
    "tags": [
      "Přenosové módy",
      "Half-Duplex"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Typy vysílání a přenosové módy",
    "id": "ps-zaklady-014",
    "type": "choice",
    "title": "Plně duplexní přenos (Full-Duplex)",
    "question": "Jak funguje plně duplexní přenos (Full-Duplex) v moderních sítích?",
    "choices": [
      "Obě zařízení mohou současně vysílat i přijímat data bez vzájemného čekání a kolizí",
      "Zařízení smí vysílat pouze o víkendech v plném provozu",
      "Signál se v kabelu odráží tam a zpět s dvojnásobným napětím",
      "Přenos je omezen pouze na jeden bajt za sekundu"
    ],
    "answer": "Obě zařízení mohou současně vysílat i přijímat data bez vzájemného čekání a kolizí",
    "solution": "Full-duplex umožňuje simultánní obousměrnou komunikaci (např. moderní přepínaný Ethernet přes samostatné páry pro TX a RX, telefonní hovory, Wi-Fi s moderními standardy).",
    "tags": [
      "Přenosové módy",
      "Full-Duplex"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-015",
    "type": "number",
    "title": "Vznik sítě ARPANET",
    "question": "Ve kterém roce vzniklo první čtyřuzlové propojení (UCLA, Stanford, UCSB a University of Utah) sítě ARPANET?",
    "answer": "1969",
    "solution": "Roku 1969 vzniklo první propojení 4 uzlů v rámci projektu ARPANET financovaného americkou vládní agenturou ARPA.",
    "hint": "Konec 60. let 20. století (rok přistání na Měsíci).",
    "tags": [
      "Historie",
      "ARPANET"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-016",
    "type": "choice",
    "title": "Paketový přenos vs přepojování okruhů",
    "question": "Jaký klíčový koncept nahradil tradiční přepojování okruhů (circuit switching) používané v telefonních sítích?",
    "choices": [
      "Balíčkově orientovaná komunikace (packet switching) – data se dělí na pakety putující sítí nezávisle",
      "Přenášení celé zprávy pouze v jednom kuse bez jakéhokoliv dělení",
      "Použití analogových pásek zasílaných poštovní službou",
      "Zrušení adresace a posílání signálu náhodně do všech kabelů"
    ],
    "answer": "Balíčkově orientovaná komunikace (packet switching) – data se dělí na pakety putující sítí nezávisle",
    "solution": "Paul Baran (USA) a Donald Davies (Velká Británie) navrhli rozdělení dat na menší části – pakety (packet switching), které putují sítí nezávisle na sobě, což zajišťuje odolnost i při výpadku části sítě.",
    "tags": [
      "Historie",
      "Packet switching"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-017",
    "type": "choice",
    "title": "Autoři protokolů TCP a IP",
    "question": "Kteří dva vědci v roce 1974 publikovali práci, která definovala základní principy protokolů TCP a IP?",
    "choices": [
      "Vint Cerf a Bob Kahn",
      "Steve Jobs a Steve Wozniak",
      "Bill Gates a Paul Allen",
      "Linus Torvalds a Richard Stallman"
    ],
    "answer": "Vint Cerf a Bob Kahn",
    "solution": "Vint Cerf a Bob Kahn publikovali v roce 1974 návrh protokolů TCP a IP, které se staly základem dnešního internetu.",
    "tags": [
      "Historie",
      "TCP/IP",
      "Osobnosti"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-018",
    "type": "fill",
    "title": "Flag Day 1983",
    "question": "Jak se v historii internetu označuje den 1. ledna 1983, kdy ARPANET oficiálně přešel ze starého protokolu NCP na TCP/IP?",
    "answer": "Flag Day",
    "solution": "1. ledna 1983 nastal tzv. „Flag Day“, kdy došlo k plnému přechodu sítě ARPANET z protokolu NCP na sadu TCP/IP. Tento den je považován za vznik internetu v moderním slova smyslu.",
    "hint": "Anglicky „den vlajky“.",
    "tags": [
      "Historie",
      "Flag Day"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-019",
    "type": "choice",
    "title": "Vznik World Wide Web (WWW)",
    "question": "Kdo v roce 1991 zveřejnil systém hypertextových dokumentů, který dal vzniknout službě World Wide Web (WWW)?",
    "choices": [
      "Tim Berners-Lee",
      "Alan Turing",
      "Dennis Ritchie",
      "Ada Lovelace"
    ],
    "answer": "Tim Berners-Lee",
    "solution": "Tim Berners-Lee v CERNu navrhl a v roce 1991 zveřejnil systém World Wide Web (WWW), včetně prvního webového serveru a protokolu HTTP.",
    "tags": [
      "Historie",
      "WWW"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Historie a vývoj",
    "id": "ps-zaklady-020",
    "type": "number",
    "title": "Zavedení systému DNS",
    "question": "Ve kterém roce byl zaveden systém DNS (Domain Name System), který nahradil přímé používání číselných IP adres doménovými jmény?",
    "answer": "1983",
    "solution": "Systém DNS byl vyvinut a zaveden v roce 1983 (RFC 882/883), aby umožnil přívětivé vyhledávání pomocí doménových jmen místo číselných IP adres.",
    "hint": "Tentýž rok jako Flag Day.",
    "tags": [
      "Historie",
      "DNS"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-001",
    "type": "choice",
    "title": "Sběrnicová topologie (Bus)",
    "question": "Jak jsou uspořádána zařízení ve sběrnicové topologii (Bus)?",
    "choices": [
      "Zařízení jsou zapojena za sebou na jediné společné přenosové médium (sběrnici/kabel)",
      "Každé zařízení je připojeno výhradně ke dvěma sousedům a tvoří uzavřený kruh",
      "Všechna zařízení jsou připojena do centrálního přepínače (switche)",
      "Zařízení komunikují výhradně prostřednictvím satelitu na oběžné dráze"
    ],
    "answer": "Zařízení jsou zapojena za sebou na jediné společné přenosové médium (sběrnici/kabel)",
    "solution": "Ve sběrnicové topologii (Bus) jsou všechny počítače připojeny k jednomu hlavnímu přenosovému kabelu (sběrnici), na jehož koncích musí být zakončovací odpory (terminátory).",
    "tags": [
      "Topologie",
      "Sběrnice",
      "Bus"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-002",
    "type": "choice",
    "title": "Hvězdicová topologie (Star)",
    "question": "Co je charakteristickým znakem hvězdicové topologie (Star Topology)?",
    "choices": [
      "Každé koncové zařízení je samostatným kabelem připojeno k centrálnímu síťovému prvku (např. switchi)",
      "Všechna zařízení jsou zapojena za sebou v jedné přímé linii bez jakéhokoliv aktivního prvku",
      "Data musí projít postupně všemi počítači v síti, než dorazí k cíli",
      "Každé zařízení má právě tolik kabelů, kolik je v síti zásuvek"
    ],
    "answer": "Každé koncové zařízení je samostatným kabelem připojeno k centrálnímu síťovému prvku (např. switchi)",
    "solution": "Hvězdicová topologie (Star) využívá centrální prvek (switch/hub), ke kterému vedou samostatné paprsky kabelů z jednotlivých stanic. Porucha jednoho kabelu vyřadí pouze jednu stanici.",
    "tags": [
      "Topologie",
      "Hvězda",
      "Star"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-003",
    "type": "fill",
    "title": "Slabina hvězdice – zkratka SPOF",
    "question": "Jaká 4písmenná zkratka označuje kritickou slabinu hvězdicové topologie, kdy při poruše centrálního prvku zkolabuje celá síť (Single Point of Failure)?",
    "answer": "SPOF",
    "solution": "SPOF (Single Point of Failure – jediný bod selhání) znamená, že selhání centrálního prvku (např. centrálního switche) vyřadí z provozu celou připojenou síť.",
    "hint": "Zkratka ze slov Single Point Of Failure.",
    "tags": [
      "Topologie",
      "SPOF"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-004",
    "type": "choice",
    "title": "Stromová topologie (Tree)",
    "question": "Co v počítačových sítích představuje stromová topologie (Tree Topology)?",
    "choices": [
      "Hierarchickou kombinaci – například jednotlivá patra budovy tvoří hvězdy propojené páteřní sběrnicí (backbone)",
      "Síť složenou výhradně z bezdrátových senzorů umístěných v korunách stromů",
      "Sběrnici, která nemá zakončovací terminátory a signál se volně šíří do vzduchu",
      "Zapojení, kde každý uzel funguje pouze v noci"
    ],
    "answer": "Hierarchickou kombinaci – například jednotlivá patra budovy tvoří hvězdy propojené páteřní sběrnicí (backbone)",
    "solution": "Stromová topologie (Tree) je hierarchická kombinace hvězdicových sítí propojených páteřní trasou (backbone). Je typická pro větší budovy, školy nebo firemní areály.",
    "tags": [
      "Topologie",
      "Strom",
      "Tree"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-005",
    "type": "choice",
    "title": "Plná MESH topologie (Full Mesh)",
    "question": "Co je typické pro plnou síťovou topologii (Full Mesh)?",
    "choices": [
      "Každé zařízení je přímo propojeno s každým dalším zařízením v síti",
      "Zařízení jsou propojena náhodně podle síly Wi-Fi signálu",
      "Všechna data se posílají přes jediný sdílený koaxiální kabel s T-konektorem",
      "Síť obsahuje pouze jediný kabel, který prochází všemi místnostmi dokola"
    ],
    "answer": "Každé zařízení je přímo propojeno s každým dalším zařízením v síti",
    "solution": "V plné MESH topologii má každý uzel přímou linku ke všem ostatním uzlům. Poskytuje nejvyšší možnou odolnost proti výpadkům a redundanci, ale počet spojů roste kvadraticky.",
    "tags": [
      "Topologie",
      "MESH"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-006",
    "type": "number",
    "title": "Výpočet spojení v plné MESH topologii",
    "question": "Podle vzorce pro plnou MESH topologii n * (n - 1) / 2, kolik přímých fyzických propojení je potřeba pro síť s 6 uzly?",
    "answer": "15",
    "solution": "Pro n = 6 uzlů je počet spojení: 6 * (6 - 1) / 2 = 6 * 5 / 2 = 30 / 2 = 15 propojení.",
    "hint": "Dosad do vzorce 6 * 5 / 2.",
    "tags": [
      "Topologie",
      "MESH",
      "Výpočet"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-007",
    "type": "choice",
    "title": "Využití MESH topologie v praxi",
    "question": "Kde se dnes princip MESH topologie nejčastěji využívá v běžné praxi?",
    "choices": [
      "V bezdrátových Wi-Fi Mesh sítích (pokrytí velkých domů) a v páteřních sítích poskytovatelů internetu (ISP)",
      "Výhradně v malých kancelářích se dvěma počítači a jednou tiskárnou",
      "Pouze při připojení starých jehličkových tiskáren přes paralelní port LPT",
      "U telefonních budek pro přenos mincí"
    ],
    "answer": "V bezdrátových Wi-Fi Mesh sítích (pokrytí velkých domů) a v páteřních sítích poskytovatelů internetu (ISP)",
    "solution": "Mesh se v praxi používá v bezdrátových Wi-Fi Mesh systémech (propojené satelity v domech a firmách), v páteřních trasách ISP routerů i ve vojenských sítích odolných proti poškození.",
    "tags": [
      "Topologie",
      "MESH",
      "Praxe"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Aktivní a pasivní prvky",
    "id": "ps-topologie-008",
    "type": "choice",
    "title": "Rozdíl mezi aktivními a pasivními prvky",
    "question": "Jaký je zásadní rozdíl mezi aktivními a pasivními síťovými prvky?",
    "choices": [
      "Aktivní prvky signál/data zpracovávají, upravují či směrují a potřebují napájení; pasivní prvky signál pouze přenášejí a napájení nepotřebují",
      "Aktivní prvky jsou vždy kovové kabely, pasivní prvky jsou výhradně softwarové programy",
      "Aktivní prvky fungují pouze v bezdrátových sítích, pasivní pouze v optických",
      "Pasivní prvky generují elektrickou energii a napájejí celou síť"
    ],
    "answer": "Aktivní prvky signál/data zpracovávají, upravují či směrují a potřebují napájení; pasivní prvky signál pouze přenášejí a napájení nepotřebují",
    "solution": "Aktivní prvky provádějí s daty/signálem aktivní činnost (zesílení, přepínání, směrování) a vyžadují napájení ze sítě. Pasivní prvky (kabely, konektory, zásuvky, patch panely) signál nijak nemění a napájení nepotřebují.",
    "tags": [
      "Síťové prvky",
      "Aktivní",
      "Pasivní"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Aktivní a pasivní prvky",
    "id": "ps-topologie-009",
    "type": "choice",
    "title": "Příklady aktivních prvků",
    "question": "Která z následujících skupin obsahuje výhradně aktivní síťové prvky?",
    "choices": [
      "Switch (přepínač), Router (směrovač), Repeater (opakovač), Access Point",
      "Datový kabel UTP, zásuvka RJ-45, patch panel a rozvaděč",
      "Krimpovací kleště, šroubovák, plastový stahovací pásek a lišta",
      "Pouze konektor RJ-45 a optická spojka"
    ],
    "answer": "Switch (přepínač), Router (směrovač), Repeater (opakovač), Access Point",
    "solution": "Mezi aktivní prvky patří: přepínač (switch), směrovač (router), opakovač (repeater), rozbočovač (hub), přístupový bod (AP), most (bridge), brána (gateway) a optopřevodníky.",
    "tags": [
      "Síťové prvky",
      "Aktivní prvky"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Aktivní a pasivní prvky",
    "id": "ps-topologie-010",
    "type": "choice",
    "title": "Příklady pasivních prvků",
    "question": "Které komponenty patří mezi pasivní prvky počítačové sítě?",
    "choices": [
      "Kabely, konektory, spojky, patch panely, zásuvky a rackové rozvaděče",
      "Routery, switche, Wi-Fi routery a síťové karty",
      "Pouze operační systémy Windows a Linux",
      "Výhradně webové prohlížeče a e-mailové klienty"
    ],
    "answer": "Kabely, konektory, spojky, patch panely, zásuvky a rackové rozvaděče",
    "solution": "Pasivní prvky pouze zprostředkovávají fyzické propojení: TP/optické kabely, konektory (RJ-45, BNC), datové zásuvky, patch panely a rackové skříně.",
    "tags": [
      "Síťové prvky",
      "Pasivní prvky"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Aktivní a pasivní prvky",
    "id": "ps-topologie-011",
    "type": "fill",
    "title": "Optopřevodník – modul SFP",
    "question": "Jaká třípísmenná zkratka označuje kompaktní zásuvný modul (Small Form-factor Pluggable) sloužící jako optopřevodník mezi metalickým a optickým vedením?",
    "answer": "SFP",
    "solution": "SFP modul (Small Form-factor Pluggable) je zásuvný transceiver do switchů a routerů, který převádí elektrický signál na optický a naopak.",
    "hint": "Zkratka ze slov Small Form-factor Pluggable.",
    "tags": [
      "Hardware",
      "SFP",
      "Optika"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Aktivní a pasivní prvky",
    "id": "ps-topologie-012",
    "type": "choice",
    "title": "Funkce patch panelu v racku",
    "question": "K čemu v datovém rozvaděči (racku) slouží patch panel (propojovací panel)?",
    "choices": [
      "K přehlednému a pevnému zakončení strukturované kabeláže z celého objektu a snadnému přepojování portů do switche",
      "K automatickému přidělování IP adres počítačům v síti",
      "K filtrování virů a blokování nebezpečných webových stránek",
      "K bezdrátovému vysílání Wi-Fi signálu s vysokým ziskem"
    ],
    "answer": "K přehlednému a pevnému zakončení strukturované kabeláže z celého objektu a snadnému přepojování portů do switche",
    "solution": "Patch panel je pasivní prvek instalovaný do 19\" racku. Ze zadní strany jsou napevno zařezány kabely ze zásuvek v budově, zepředu se pomocí krátkých patch cordů propojují do portů switche.",
    "tags": [
      "Hardware",
      "Patch panel"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Kroucená dvojlinka",
    "id": "ps-media-001",
    "type": "choice",
    "title": "Význam zkratky UTP",
    "question": "Co přesně znamená zkratka UTP u ethernetového síťového kabelu?",
    "choices": [
      "Unshielded Twisted Pair – nestíněná kroucená dvojlinka",
      "Universal Transmission Protocol – univerzální přenosový protokol",
      "Ultra Turbo Protection – kabel se zvýšenou pancéřovou ochranou",
      "Unified Telecommunication Port – sjednocený komunikační port"
    ],
    "answer": "Unshielded Twisted Pair – nestíněná kroucená dvojlinka",
    "solution": "UTP (Unshielded Twisted Pair) je nestíněná kroucená dvojlinka. Nemá žádné kovové stínění, je lehká a ohebná a hodí se do prostředí bez silného elektromagnetického rušení.",
    "tags": [
      "Kabeláž",
      "UTP",
      "Zkratky"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Kroucená dvojlinka",
    "id": "ps-media-002",
    "type": "choice",
    "title": "Konstrukce kabelu FTP",
    "question": "Jak je konstruován FTP (Foiled Twisted Pair) kabel?",
    "choices": [
      "Celý svazek všech 4 párů pod vnějším pláštěm je obalen jednou společnou hliníkovou fólií",
      "Každý jednotlivý vodič má vlastní ocelové opancéřování",
      "Kabel nemá žádnou izolaci a vodiče jsou volně uloženy ve vzduchu",
      "Kabel je vyroben z jednoho silného měděného drátu bez kroucení"
    ],
    "answer": "Celý svazek všech 4 párů pod vnějším pláštěm je obalen jednou společnou hliníkovou fólií",
    "solution": "FTP (Foiled Twisted Pair) kabel má pod vnějším pláštěm společné stínění fólií kolem všech párů dohromady, což zvyšuje odolnost proti vnějšímu rušení.",
    "tags": [
      "Kabeláž",
      "FTP"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Kroucená dvojlinka",
    "id": "ps-media-003",
    "type": "choice",
    "title": "Konstrukce kabelu STP",
    "question": "V čem se kabel STP (Shielded Twisted Pair) liší od UTP a FTP?",
    "choices": [
      "Každý jednotlivý kroucený pár vodičů má své vlastní stínění (fólií či opletením)",
      "Má pouze 2 vodiče místo obvyklých osmi",
      "Je určen výhradně pro napájení 230 V bez přenosu dat",
      "Kabel je naplněn gelem pro ochranu před mrazem, ale stínění nemá"
    ],
    "answer": "Každý jednotlivý kroucený pár vodičů má své vlastní stínění (fólií či opletením)",
    "solution": "STP (Shielded Twisted Pair) kabel má stíněný každý jednotlivý pár (případně i celý kabel). Nabízí maximální odolnost proti přeslechům a rušení, je však tužší a dražší.",
    "tags": [
      "Kabeláž",
      "STP"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Kroucená dvojlinka",
    "id": "ps-media-004",
    "type": "number",
    "title": "Počet vodičů v TP kabelu",
    "question": "Kolik jednotlivých izolovaných vodičů (tvořících 4 kroucené páry) se nachází ve standardním síťovém TP kabelu?",
    "answer": "8",
    "solution": "Standardní síťový kabel s kroucenou dvojlinkou obsahuje celkem 8 vodičů sdružených do 4 párů (zelený, oranžový, modrý a hnědý pár).",
    "hint": "Čtyři páry vodičů, tj. 4 × 2.",
    "tags": [
      "Kabeláž",
      "TP",
      "Struktura"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Kroucená dvojlinka",
    "id": "ps-media-005",
    "type": "choice",
    "title": "Proč jsou vodiče v TP kabelu kroucené?",
    "question": "Z jakého fyzikálního důvodu jsou vodiče v párech kroucené (Twisted Pair)?",
    "choices": [
      "Kroucení vodičů eliminuje elektromagnetické přeslechy mezi páry a tlumí vliv vnějšího rušení",
      "Kroucení slouží pouze tomu, aby byl kabel pružnější a dal se lépe vázat do uzlu",
      "Kroucení zpomaluje elektrony, aby nedošlo k přehřátí síťové karty",
      "Jde o čistě estetický prvek bez jakéhokoliv technického významu"
    ],
    "answer": "Kroucení vodičů eliminuje elektromagnetické přeslechy mezi páry a tlumí vliv vnějšího rušení",
    "solution": "Kroucením vodičů s definovaným stoupáním se dosahuje vzájemného vyrušení indukovaného elektromagnetického šumu v obou vodičích páru (diferenciální signál), což chrání přenášená data.",
    "tags": [
      "Kabeláž",
      "Kroucení",
      "Fyzika"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Zapojení RJ-45 a patch cordy",
    "id": "ps-media-006",
    "type": "fill",
    "title": "Označení 8pinového síťového konektoru",
    "question": "Jaké typové označení má 8pinový modulární konektor (zástrčka) běžně používaný na koncích síťových TP kabelů?",
    "answer": "RJ-45",
    "solution": "RJ-45 (Registered Jack 45) je standardizovaný 8pinový konektor pro kroucenou dvojlinku v Ethernetu.",
    "hint": "RJ pomlčka číslo.",
    "tags": [
      "Kabeláž",
      "RJ-45"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Zapojení RJ-45 a patch cordy",
    "id": "ps-media-007",
    "type": "choice",
    "title": "Barevné standardy T-568A a T-568B",
    "question": "Která norma a dva barevné standardy definují pořadí vodičů při krimpování konektoru RJ-45?",
    "choices": [
      "Norma ANSI/TIA-568 a standardy T-568A a T-568B",
      "Norma ISO-9001 a standardy USB-A a USB-C",
      "Norma IEEE 802.11 a standardy 2.4 GHz a 5 GHz",
      "Norma HTML5 a standardy UTF-8 a ASCII"
    ],
    "answer": "Norma ANSI/TIA-568 a standardy T-568A a T-568B",
    "solution": "Standardy T-568A a T-568B jsou definovány telekomunikační normou ANSI/TIA-568. V celé instalaci objektu je nutné dodržet jednotně jeden z těchto standardů.",
    "tags": [
      "Kabeláž",
      "TIA-568",
      "RJ-45"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Zapojení RJ-45 a patch cordy",
    "id": "ps-media-008",
    "type": "choice",
    "title": "Pořadí barev standardu T-568B",
    "question": "Jaké je správné pořadí barev vodičů od pinu 1 po pin 8 podle nejrozšířenějšího standardu T-568B?",
    "choices": [
      "1. bílo-oranžová, 2. oranžová, 3. bílo-zelená, 4. modrá, 5. bílo-modrá, 6. zelená, 7. bílo-hnědá, 8. hnědá",
      "1. bílo-zelená, 2. zelená, 3. bílo-oranžová, 4. modrá, 5. bílo-modrá, 6. oranžová, 7. bílo-hnědá, 8. hnědá",
      "1. černá, 2. červená, 3. modrá, 4. žlutá, 5. zelená, 6. šedá, 7. bílá, 8. hnědá",
      "1. hnědá, 2. bílo-hnědá, 3. modrá, 4. bílo-modrá, 5. zelená, 6. bílo-zelená, 7. oranžová, 8. bílo-oranžová"
    ],
    "answer": "1. bílo-oranžová, 2. oranžová, 3. bílo-zelená, 4. modrá, 5. bílo-modrá, 6. zelená, 7. bílo-hnědá, 8. hnědá",
    "solution": "Standard T-568B začíná oranžovým párem: bílo-oranžová, oranžová, bílo-zelená, modrá, bílo-modrá, zelená, bílo-hnědá, hnědá. U T-568A je na začátku zelený pár.",
    "tags": [
      "Kabeláž",
      "T-568B",
      "Barvy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Zapojení RJ-45 a patch cordy",
    "id": "ps-media-009",
    "type": "choice",
    "title": "Rozdíl mezi přímým a kříženým kabelem",
    "question": "V čem se konstrukčně liší přímý kabel (straight-through) a křížený kabel (crossover patch cord)?",
    "choices": [
      "Přímý kabel má na obou koncích stejný standard (např. T-568B na obou), křížený má na jednom konci T-568A a na druhém T-568B",
      "Přímý kabel je rovný, křížený se smí vést pouze za roh",
      "Přímý kabel přenáší pouze nuly, křížený kabel přenáší pouze jedničky",
      "Přímý kabel má konektory RJ-45, křížený má konektory USB-C"
    ],
    "answer": "Přímý kabel má na obou koncích stejný standard (např. T-568B na obou), křížený má na jednom konci T-568A a na druhém T-568B",
    "solution": "Přímý patch cord má oba konce zapojené identicky (např. T-568B na obou stranách). Křížený kabel má na jednom konci T-568A a na druhém T-568B (prohazují se vysílací a přijímací páry pro přímé propojení dvou PC bez switche).",
    "tags": [
      "Kabeláž",
      "Patch cord",
      "Crossover"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Koaxiální a optické kabely",
    "id": "ps-media-010",
    "type": "fill",
    "title": "Konektor pro koaxiální kabel",
    "question": "Jaký typ konektoru s bajonetovým otočným mechanismem se používal k zakončení tenkého koaxiálního ethernetového kabelu?",
    "answer": "BNC",
    "solution": "BNC (Bayonet Neill–Concelman) konektor je bajonetový konektor používaný u koaxiálních kabelů (např. v historickém standardu 10BASE2).",
    "hint": "Tři písmena začínající na B.",
    "tags": [
      "Koaxiál",
      "BNC",
      "Konektory"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Koaxiální a optické kabely",
    "id": "ps-media-011",
    "type": "choice",
    "title": "Vlastnosti optických kabelů",
    "question": "Které vlastnosti charakterizují optické datové kabely?",
    "choices": [
      "Přenos dat světlem ve skleněném/plastovém jádře, obrovské přenosové rychlosti (Gb/s až Tb/s) a naprostá imunita vůči elektromagnetickému rušení",
      "Přenos dat pomocí střídavého proudu 50 Hz po hliníkovém drátu s velkým elektrickým odporem",
      "Vysoká náchylnost k rušení bleskem a rádiovým vysíláním",
      "Neschopnost přenášet data na vzdálenost delší než 5 metrů"
    ],
    "answer": "Přenos dat světlem ve skleněném/plastovém jádře, obrovské přenosové rychlosti (Gb/s až Tb/s) a naprostá imunita vůči elektromagnetickému rušení",
    "solution": "Optické kabely využívají totální odraz světla ve skleněném či plastovém vlákně. Nabízejí extrémní šířku pásma, dosah desítek kilometrů a jsou absolutně netečné k elektromagnetickému rušení.",
    "tags": [
      "Optika",
      "Vlákna"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Koaxiální a optické kabely",
    "id": "ps-media-012",
    "type": "choice",
    "title": "Optická vana (ODF)",
    "question": "Co je to optická vana (ODF – Optical Distribution Frame)?",
    "choices": [
      "Pasivní rackové zařízení určené k bezpečnému uložení, ukončení a organizaci optických vláken a svarů",
      "Nádoba s chladicí kapalinou, do které se ponořují servery",
      "Speciální software pro zálohování souborů do cloudu",
      "Označení pro vnější plastový plášť venkovního koaxiálního kabelu"
    ],
    "answer": "Pasivní rackové zařízení určené k bezpečnému uložení, ukončení a organizaci optických vláken a svarů",
    "solution": "Optická vana (též optický patch panel či ODF) slouží k ukončení optických kabelů v racku, ochraně křehkých svárů vláken a vyvedení optických spojek pro připojení optických patch cordů.",
    "tags": [
      "Optika",
      "ODF",
      "Optická vana"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Koaxiální a optické kabely",
    "id": "ps-media-013",
    "type": "fill",
    "title": "Sdělovací kabel SYKFY",
    "question": "Jaké typové označení má telekomunikační sdělovací kabel s měděnými plnými vodiči a PVC pláštěm zmíněný v materiálu (např. pro domovní telefony a zabezpečovací systémy)?",
    "answer": "SYKFY",
    "solution": "Kabel SYKFY je tradiční vnitřní telekomunikační sdělovací kabel s měděnými vodiči, používaný pro pevnou telefonii, interkomy a EZS rozvody.",
    "hint": "Pět písmen začínajících na S a končících na Y.",
    "tags": [
      "Kabeláž",
      "SYKFY"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "PoE technologie",
    "id": "ps-media-014",
    "type": "fill",
    "title": "Co znamená zkratka PoE",
    "question": "Napiš anglický název technologie, kterou označuje zkratka PoE (napájení zařízení po datovém ethernetovém kabelu).",
    "answer": "Power over Ethernet",
    "solution": "PoE znamená Power over Ethernet – technologie umožňující přenášet elektrickou energii spolu s daty po jednom TP kabelu.",
    "hint": "Power ... Ethernet.",
    "tags": [
      "PoE",
      "Zkratky"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "PoE technologie",
    "id": "ps-media-015",
    "type": "choice",
    "title": "Komponenty PoE: PSE a PD",
    "question": "Co v systému PoE označují pojmy PSE a PD?",
    "choices": [
      "PSE je zdroj napájení (např. PoE switch či injektor); PD je napájené koncové zařízení (např. IP kamera či VoIP telefon)",
      "PSE je přenosný software; PD je pevný disk v počítači",
      "PSE je přístupové heslo k Wi-Fi; PD je personální oddělení",
      "PSE je optický kabel; PD je koaxiální redukce"
    ],
    "answer": "PSE je zdroj napájení (např. PoE switch či injektor); PD je napájené koncové zařízení (např. IP kamera či VoIP telefon)",
    "solution": "PSE (Power Sourcing Equipment) poskytuje napájení (PoE switch, PoE midspan injektor). PD (Powered Device) je spotřebič napájený z kabelu (kamera, Wi-Fi AP, VoIP telefon).",
    "tags": [
      "PoE",
      "PSE",
      "PD"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "PoE technologie",
    "id": "ps-media-016",
    "type": "fill",
    "title": "Standard PoE IEEE 802.3af",
    "question": "Jaké číselné označení má původní standard IEEE pro PoE (výkon do 15,4 W na portu)? Zapiš včetně tečky a písmen (např. 802.3xx).",
    "answer": "802.3af",
    "solution": "Standard IEEE 802.3af definoval základní PoE s napětím cca 48 V a maximálním výkonem 15,4 W na portu zdroje (cca 12,95 W u zařízení).",
    "hint": "Začíná 802.3 a končí dvěma písmeny na a.",
    "tags": [
      "PoE",
      "Standardy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "PoE technologie",
    "id": "ps-media-017",
    "type": "choice",
    "title": "PoE u Gigabit Ethernetu",
    "question": "Jakým způsobem se přenáší napájení PoE u Gigabit Ethernetu (1000BASE-T)?",
    "choices": [
      "Přes všechny 4 páry současně společně s daty (fantomové napájení), protože všechny páry se využívají i pro data",
      "Pouze po jednom zemnicím plášti, data jsou zcela odpojena",
      "Napájení se posílá bezdrátově vzduchem kolem konektoru",
      "U Gigabit Ethernetu není technologie PoE fyzikálně možná"
    ],
    "answer": "Přes všechny 4 páry současně společně s daty (fantomové napájení), protože všechny páry se využívají i pro data",
    "solution": "U 10/100 Mbps Ethernetu lze využít volné páry (4-5 a 7-8), ale u 1000BASE-T (Gigabit) přenášejí data všechny 4 páry, takže napájení probíhá přes středové odbočky transformátorů po všech párech současně.",
    "tags": [
      "PoE",
      "Gigabit"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-001",
    "type": "number",
    "title": "Počet vrstev modelu ISO/OSI",
    "question": "Kolik vrstev má standardní referenční model ISO/OSI?",
    "answer": "7",
    "solution": "Referenční model ISO/OSI se skládá ze 7 vrstev: 1. Fyzická, 2. Linková, 3. Síťová, 4. Transportní, 5. Relační, 6. Prezentační, 7. Aplikační.",
    "hint": "Číslo mezi 5 a 10.",
    "tags": [
      "ISO/OSI",
      "Vrstvy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-002",
    "type": "choice",
    "title": "Pořadí vrstev modelu ISO/OSI",
    "question": "Jaké je správné pořadí vrstev modelu ISO/OSI od nejnižší 1. po nejvyšší 7.?",
    "choices": [
      "1. Fyzická, 2. Linková, 3. Síťová, 4. Transportní, 5. Relační, 6. Prezentační, 7. Aplikační",
      "1. Aplikační, 2. Prezentační, 3. Relační, 4. Transportní, 5. Síťová, 6. Linková, 7. Fyzická",
      "1. Fyzická, 2. Internetová, 3. Transportní, 4. Aplikační, 5. Webová, 6. Poštovní, 7. Cloudová",
      "1. Kabelová, 2. Přepínací, 3. Směrovací, 4. Paketová, 5. Softwarová, 6. Hardwarová, 7. Uživatelská"
    ],
    "answer": "1. Fyzická, 2. Linková, 3. Síťová, 4. Transportní, 5. Relační, 6. Prezentační, 7. Aplikační",
    "solution": "Od vrstvy nejblíže médiu k vrstvě nejblíže uživateli: 1. Fyzická (Physical), 2. Linková (Data Link), 3. Síťová (Network), 4. Transportní (Transport), 5. Relační (Session), 6. Prezentační (Presentation), 7. Aplikační (Application).",
    "tags": [
      "ISO/OSI",
      "Pořadí vrstev"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-003",
    "type": "choice",
    "title": "PDU na linkové vrstvě (L2)",
    "question": "Jak se nazývá protokolová datová jednotka (PDU) na 2. vrstvě (linkové) modelu ISO/OSI?",
    "choices": [
      "Rámec (Frame)",
      "Paket (Packet)",
      "Segment (Segment)",
      "Bit (Bit)"
    ],
    "answer": "Rámec (Frame)",
    "solution": "Na 2. (linkové) vrstvě jsou data zapouzdřena do rámců (Frames), které obsahují zdrojovou a cílovou MAC adresu a kontrolní součet FCS.",
    "tags": [
      "ISO/OSI",
      "Linková vrstva",
      "PDU"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-004",
    "type": "choice",
    "title": "PDU na síťové vrstvě (L3)",
    "question": "Jak se označuje PDU na 3. vrstvě (síťové) modelu ISO/OSI?",
    "choices": [
      "Paket (Packet) / Datagram",
      "Rámec (Frame)",
      "Segment (Segment)",
      "Bitový tok (Bit stream)"
    ],
    "answer": "Paket (Packet) / Datagram",
    "solution": "Na 3. vrstvě (síťové) se data přenášejí v paketech (Packets), které nesou IP adresy odesílatele a příjemce pro směrování napříč sítěmi.",
    "tags": [
      "ISO/OSI",
      "Síťová vrstva",
      "PDU"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-005",
    "type": "choice",
    "title": "PDU na transportní vrstvě (L4)",
    "question": "Jak se nazývá PDU na 4. vrstvě (transportní) při použití protokolu TCP?",
    "choices": [
      "Segment",
      "Rámec",
      "Paket",
      "Elektrický impuls"
    ],
    "answer": "Segment",
    "solution": "Transportní vrstva dělí proud dat na menší bloky – segmenty (pro TCP) nebo datagramy (pro UDP), které opatřuje čísly portů.",
    "tags": [
      "ISO/OSI",
      "Transportní vrstva",
      "PDU"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-006",
    "type": "choice",
    "title": "Funkce routeru na 3. vrstvě",
    "question": "Na které vrstvě modelu ISO/OSI operuje běžný směrovač (router) a rozhoduje o cestě dat podle IP adres?",
    "choices": [
      "3. Síťová vrstva (Network Layer)",
      "1. Fyzická vrstva (Physical Layer)",
      "2. Linková vrstva (Data Link Layer)",
      "7. Aplikační vrstva (Application Layer)"
    ],
    "answer": "3. Síťová vrstva (Network Layer)",
    "solution": "Router je zařízení 3. vrstvy (síťové). Čte cílové IP adresy v hlavičkách paketů a podle své routovací tabulky určuje, kudy paket poslat do cílové sítě.",
    "tags": [
      "ISO/OSI",
      "Router",
      "L3"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-007",
    "type": "choice",
    "title": "Funkce switche na 2. vrstvě",
    "question": "Na které vrstvě modelu ISO/OSI pracuje standardní ethernetový přepínač (switch)?",
    "choices": [
      "2. Linková vrstva (Data Link Layer)",
      "1. Fyzická vrstva (Physical Layer)",
      "4. Transportní vrstva (Transport Layer)",
      "6. Prezentační vrstva (Presentation Layer)"
    ],
    "answer": "2. Linková vrstva (Data Link Layer)",
    "solution": "Běžný síťový přepínač (switch) pracuje na 2. vrstvě (linkové). Učí se MAC adresy připojených zařízení do své tabulky (CAM tabulky) a přeposílá rámce cíleně na konkrétní porty.",
    "tags": [
      "ISO/OSI",
      "Switch",
      "L2"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-008",
    "type": "choice",
    "title": "Úkol prezentační vrstvy (L6)",
    "question": "Jaké jsou hlavní úkoly 6. vrstvy (prezentační) modelu ISO/OSI?",
    "choices": [
      "Převod formátů dat, konverze kódování znaků (např. ASCII na UTF-8), komprese a šifrování dat",
      "Výroba optických konektorů a lisování pinů RJ-45",
      "Směrování paketů na základě čísla autonomního systému",
      "Napájení koncových zařízení přes ethernetový kabel"
    ],
    "answer": "Převod formátů dat, konverze kódování znaků (např. ASCII na UTF-8), komprese a šifrování dat",
    "solution": "Prezentační vrstva zajišťuje, aby data byla pro aplikace na obou stranách srozumitelná bez ohledu na operační systém a hardware. Provádí formátování, převody kódování (ASCII, UTF-8), kompresi a šifrování.",
    "tags": [
      "ISO/OSI",
      "Prezentační vrstva",
      "L6"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model TCP/IP a enkapsulace",
    "id": "ps-modely-009",
    "type": "number",
    "title": "Počet vrstev modelu TCP/IP",
    "question": "Kolik vrstev má základní síťový model TCP/IP vyvinutý původně v projektu ARPANET?",
    "answer": "4",
    "solution": "Model TCP/IP má 4 vrstvy: 1. Vrstva síťového přístupu (Network Access), 2. Internetová vrstva (Internet), 3. Transportní vrstva (Transport), 4. Aplikační vrstva (Application).",
    "hint": "O tři méně než ISO/OSI.",
    "tags": [
      "TCP/IP",
      "Vrstvy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model TCP/IP a enkapsulace",
    "id": "ps-modely-010",
    "type": "choice",
    "title": "Vrstvy modelu TCP/IP",
    "question": "Které vrstvy tvoří 4vrstvý model TCP/IP (od nejnižší k nejvyšší)?",
    "choices": [
      "Síťový přístup, Internetová vrstva, Transportní vrstva, Aplikační vrstva",
      "Fyzická vrstva, Linková vrstva, Síťová vrstva, Aplikační vrstva",
      "Hardware, Software, Operační systém, Uživatel",
      "Metalická vrstva, Optická vrstva, Wi-Fi vrstva, Satelitní vrstva"
    ],
    "answer": "Síťový přístup, Internetová vrstva, Transportní vrstva, Aplikační vrstva",
    "solution": "Čtyři vrstvy TCP/IP jsou: Síťový přístup (Network Access Layer – odpovídá L1+L2 OSI), Internetová (Internet Layer – odpovídá L3 OSI), Transportní (Transport Layer – odpovídá L4 OSI) a Aplikační (Application Layer – odpovídá L5 až L7 OSI).",
    "tags": [
      "TCP/IP",
      "Vrstvy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model TCP/IP a enkapsulace",
    "id": "ps-modely-011",
    "type": "choice",
    "title": "Princip enkapsulace dat",
    "question": "Co je to enkapsulace (zapouzdření) dat při odesílání ze zařízení?",
    "choices": [
      "Proces, při němž každá nižší vrstva obalí data z vyšší vrstvy svou vlastní řídicí hlavičkou (header) a předá je dál",
      "Smazání nepotřebných dat z pevného disku pro zrychlení internetu",
      "Zabalení ethernetového kabelu do ochranné plastové lišty na zdi",
      "Odstranění všech IP adres z paketu před odesláním do sítě"
    ],
    "answer": "Proces, při němž každá nižší vrstva obalí data z vyšší vrstvy svou vlastní řídicí hlavičkou (header) a předá je dál",
    "solution": "Při enkapsulaci postupují data od aplikační vrstvy dolů: transportní vrstva přidá hlavičku s porty (segment), internetová vrstva přidá IP hlavičku (paket), síťový přístup přidá MAC hlavičku a patičku FCS (rámec) a fyzická vrstva vyšle bity do média.",
    "tags": [
      "Enkapsulace",
      "PDU"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "MAC adresa",
    "id": "ps-adresace-001",
    "type": "number",
    "title": "Délka MAC adresy v bitech",
    "question": "Kolik bitů má fyzická MAC adresa síťového adaptéru?",
    "answer": "48",
    "solution": "Fyzická MAC adresa má délku přesně 48 bitů, což odpovídá 6 bajtům (oktetům).",
    "hint": "6 bajtů × 8 bitů.",
    "tags": [
      "MAC",
      "Adresace",
      "Bity"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "MAC adresa",
    "id": "ps-adresace-002",
    "type": "choice",
    "title": "Zápis MAC adresy",
    "question": "V jaké soustavě a formátu se MAC adresa standardně zapisuje?",
    "choices": [
      "V šestnáctkové (hexadecimální) soustavě jako šestice dvojic znaků oddělených dvojtečkami nebo pomlčkami (např. 00:1A:2B:3C:4D:5E)",
      "V desítkové soustavě jako čtyři čísla oddělená tečkami od 0 do 255",
      "Ve dvojkové soustavě jako 48 jedniček a nul bez mezer",
      "V textové podobě křestním jménem majitele počítače"
    ],
    "answer": "V šestnáctkové (hexadecimální) soustavě jako šestice dvojic znaků oddělených dvojtečkami nebo pomlčkami (např. 00:1A:2B:3C:4D:5E)",
    "solution": "MAC adresa se zapisuje hexadecimálně (číslice 0-9 a písmena A-F). Skládá se ze 6 bajtů, každý bajt je zapsán 2 hexadecimálními znaky (např. `00:1A:2B:3C:4D:5E` nebo `00-1A-2B-3C-4D-5E`).",
    "tags": [
      "MAC",
      "Hex"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "MAC adresa",
    "id": "ps-adresace-003",
    "type": "choice",
    "title": "Části MAC adresy: OUI a NIC",
    "question": "Z jakých dvou částí se skládá každá MAC adresa?",
    "choices": [
      "Prvních 24 bitů je OUI (kód výrobce) a druhých 24 bitů je unikátní číslo zařízení (NIC specific) přidělené výrobcem",
      "Prvních 16 bitů je stát a zbylých 32 bitů je telefonní číslo uživatele",
      "Celých 48 bitů generuje náhodně operační systém při každém restartu",
      "První polovina určuje rychlost v Mb/s a druhá polovina napájecí napětí"
    ],
    "answer": "Prvních 24 bitů je OUI (kód výrobce) a druhých 24 bitů je unikátní číslo zařízení (NIC specific) přidělené výrobcem",
    "solution": "MAC adresa se dělí na 2 poloviny (po 24 bitech / 3 bajtech): OUI (Organizationally Unique Identifier) identifikuje výrobce síťové karty (např. Intel, Cisco, Realtek), zbývající část (NIC) je unikátní sériové číslo daného kusu.",
    "tags": [
      "MAC",
      "OUI",
      "NIC"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "MAC adresa",
    "id": "ps-adresace-004",
    "type": "fill",
    "title": "Broadcastová MAC adresa",
    "question": "Jak vypadá speciální broadcastová MAC adresa v šestnáctkovém zápisu s dvojtečkami (určená všem zařízením v lokální síti)?",
    "answer": "FF:FF:FF:FF:FF:FF",
    "solution": "Broadcastová MAC adresa má všech 48 bitů nastavených na logickou 1, což v hexadecimálním zápisu představuje `FF:FF:FF:FF:FF:FF`.",
    "hint": "Šestkrát FF oddělených dvojtečkou.",
    "tags": [
      "MAC",
      "Broadcast"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-005",
    "type": "number",
    "title": "Délka IPv4 adresy v bitech",
    "question": "Kolik bitů má standardní IP adresa protokolu IPv4?",
    "answer": "32",
    "solution": "Adresa IPv4 má celkovou délku 32 bitů, což umožňuje adresovat teoreticky cca 4,3 miliardy zařízení (2^32).",
    "hint": "4 oktety × 8 bitů.",
    "tags": [
      "IPv4",
      "Bity"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-006",
    "type": "choice",
    "title": "Složení IP adresy",
    "question": "Z jakých dvou základních logických částí se skládá každá IP adresa?",
    "choices": [
      "Z adresy sítě (Network ID) a adresy konkrétního hosta/zařízení v síti (Host ID)",
      "Z křestního jména odesílatele a adresy bydliště příjemce",
      "Ze sériového čísla procesoru a kapacity operační paměti RAM",
      "Z názvu webové stránky a čísla bankovního účtu"
    ],
    "answer": "Z adresy sítě (Network ID) a adresy konkrétního hosta/zařízení v síti (Host ID)",
    "solution": "Každá IP adresa se skládá z adresy sítě (identifikuje celou podsíť) a adresy hosta (identifikuje konkrétní rozhraní zařízení v této síti). Hranici mezi nimi určuje maska podsítě.",
    "tags": [
      "IPv4",
      "Síť a host"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-007",
    "type": "choice",
    "title": "Význam notace CIDR",
    "question": "Co udává číslo za lomítkem v zápisu sítě pomocí notace CIDR (např. /24 v 192.168.1.100/24)?",
    "choices": [
      "Počet jedničkových bitů v masce podsítě zleva, které určují síťovou část adresy",
      "Maximální povolený počet uživatelů na daném počítači",
      "Přenosovou rychlost síťové karty v megabitech za sekundu",
      "Číslo síťové zásuvky na zdi v kanceláři"
    ],
    "answer": "Počet jedničkových bitů v masce podsítě zleva, které určují síťovou část adresy",
    "solution": "CIDR (Classless Inter-Domain Routing) nahradil staré třídy A, B, C. Prefix /24 znamená, že prvních 24 bitů z 32bitové IP adresy náleží síti (odpovídá dekadické masce 255.255.255.0) a zbylých 8 bitů zůstává pro adresování hostů.",
    "tags": [
      "CIDR",
      "IPv4",
      "Maska"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-008",
    "type": "fill",
    "title": "Maska pro prefix /24",
    "question": "Jaká je dekadická podoba masky sítě se 4 oktety pro CIDR zápis /24?",
    "answer": "255.255.255.0",
    "solution": "Prefix /24 znamená 24 jedniček a 8 nul v binárním zápisu: 11111111.11111111.11111111.00000000, což dekadicky odpovídá 255.255.255.0.",
    "hint": "Tři oktety s hodnotou 255 a poslední s 0.",
    "tags": [
      "CIDR",
      "Maska",
      "Výpočet"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-009",
    "type": "choice",
    "title": "Rozsahy privátních IP adres",
    "question": "Které tři rozsahy IPv4 adres jsou vyhrazeny pro privátní lokální sítě (nesměrují se do veřejného internetu)?",
    "choices": [
      "10.0.0.0/8, 172.16.0.0/12 a 192.168.0.0/16",
      "1.0.0.0/8, 8.8.8.0/24 a 100.0.0.0/16",
      "200.0.0.0/8, 220.0.0.0/16 a 240.0.0.0/24",
      "192.0.0.0/8, 193.0.0.0/8 a 194.0.0.0/8"
    ],
    "answer": "10.0.0.0/8, 172.16.0.0/12 a 192.168.0.0/16",
    "solution": "Dle RFC 1918 jsou pro privátní použití vyhrazeny tři rozsahy: 10.0.0.0 až 10.255.255.255 (třída A), 172.16.0.0 až 172.31.255.255 (třída B) a 192.168.0.0 až 192.168.255.255 (třída C).",
    "tags": [
      "IPv4",
      "Privátní adresy"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-010",
    "type": "fill",
    "title": "Adresa zpětné smyčky (Loopback)",
    "question": "Jaká je nejznámější IPv4 adresa lokální zpětné smyčky (Loopback / localhost), sloužící k testování síťového zásobníku na vlastním počítači?",
    "answer": "127.0.0.1",
    "solution": "Adresa 127.0.0.1 (z bloku 127.0.0.0/8) reprezentuje loopback adaptér (localhost). Pakety poslané na tuto adresu neopouštějí zařízení a testují funkčnost TCP/IP zásobníku.",
    "hint": "Začíná číslem 127.",
    "tags": [
      "IPv4",
      "Loopback",
      "Localhost"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Výchozí brána a konfigurace",
    "id": "ps-adresace-011",
    "type": "choice",
    "title": "Role výchozí brány (Default Gateway)",
    "question": "K čemu slouží výchozí brána (Default Gateway) v konfiguraci síťového adaptéru?",
    "choices": [
      "Je to IP adresa lokálního routeru, kterému počítač předává pakety určené pro zařízení v jiných (vzdálených) sítích a internetu",
      "Je to fyzická závora u vjezdu do areálu s optickými kabely",
      "Je to heslo správce počítače vyžadované pro přístup na sociální sítě",
      "Slouží výhradně k automatickému vypínání monitoru při nečinnosti"
    ],
    "answer": "Je to IP adresa lokálního routeru, kterému počítač předává pakety určené pro zařízení v jiných (vzdálených) sítích a internetu",
    "solution": "Pokud počítač zjistí, že cíl leží mimo jeho lokální podsíť (jiný prefix), odešle rámec na MAC adresu výchozí brány (Default Gateway). Brána (router) pak paket přepošle dál podle svých směrovacích tabulek.",
    "tags": [
      "Brána",
      "Gateway",
      "Router"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Výchozí brána a konfigurace",
    "id": "ps-adresace-012",
    "type": "fill",
    "title": "Protokol pro automatické přidělování IP adres",
    "question": "Jaký protokol zajišťuje automatickou (dynamickou) konfiguraci IP adresy, masky, brány a DNS serverů pro klientské stanice? (Zkratka)",
    "answer": "DHCP",
    "solution": "DHCP (Dynamic Host Configuration Protocol) automaticky zapůjčuje síťové parametry (IP, masku, bránu, DNS servery) připojeným zařízením z nastaveného fondu (poolu).",
    "hint": "Čtyři písmena začínající na D (Dynamic Host...).",
    "tags": [
      "DHCP",
      "Protokoly",
      "Zkratky"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Příkazy a diagnostika",
    "id": "ps-adresace-013",
    "type": "fill",
    "title": "Příkaz ipconfig ve Windows",
    "question": "Který příkaz s přepínačem vypíše v příkazovém řádku Windows podrobné informace o IP konfiguraci všech adaptérů včetně MAC adresy?",
    "answer": "ipconfig /all",
    "solution": "Příkaz `ipconfig /all` vypíše kompletní konfiguraci síťových adaptérů v systému Windows: fyzickou MAC adresu, přidělenou IPv4 a IPv6 adresu, masku podsítě, výchozí bránu, DHCP a DNS servery.",
    "hint": "ipconfig lomítko all.",
    "tags": [
      "CLI",
      "Windows",
      "ipconfig"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Příkazy a diagnostika",
    "id": "ps-adresace-014",
    "type": "fill",
    "title": "Příkaz getmac",
    "question": "Jaký jednoúčelový příkaz v příkazovém řádku Windows slouží přímo k rychlému zjištění MAC adres fyzických síťových adaptérů?",
    "answer": "getmac",
    "solution": "Příkaz `getmac` ve Windows rychle zjistí a zobrazí fyzické (MAC) adresy všech instalovaných síťových adaptérů v počítači.",
    "hint": "Složené ze slov get a mac.",
    "tags": [
      "CLI",
      "Windows",
      "getmac"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Příkazy a diagnostika",
    "id": "ps-adresace-015",
    "type": "fill",
    "title": "Diagnostický příkaz ping",
    "question": "Který univerzální diagnostický příkaz odesílá ICMP Echo Request pakety k ověření dostupnosti cílového zařízení a měření odezvy (latence)?",
    "answer": "ping",
    "solution": "Nástroj `ping` (využívající protokol ICMP) zjišťuje, zda je cílová IP adresa či doména dostupná, a měří čas odezvy (RTT – Round Trip Time) v milisekundách.",
    "hint": "Čtyři písmena, jako ping-pong.",
    "tags": [
      "CLI",
      "Diagnostika",
      "ping"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Příkazy a diagnostika",
    "id": "ps-adresace-016",
    "type": "choice",
    "title": "Zobrazení ARP tabulky (arp -a)",
    "question": "Co dělá příkaz `arp -a` spuštěný v příkazovém řádku Windows nebo v terminálu Linuxu?",
    "choices": [
      "Zobrazí obsah lokální ARP cache – tedy namapované IP adresy na odpovídající MAC adresy zařízení v lokální síti",
      "Okamžitě zformátuje pevný disk a restartuje počítač",
      "Změní MAC adresu síťové karty na náhodnou hodnotu",
      "Otestuje rychlost stahování souborů z internetu v Mb/s"
    ],
    "answer": "Zobrazí obsah lokální ARP cache – tedy namapované IP adresy na odpovídající MAC adresy zařízení v lokální síti",
    "solution": "Příkaz `arp -a` vypíše obsah vyrovnávací paměti protokolu ARP, kde jsou uloženy dvojice IP adresa a k ní příslušná MAC adresa nedávno komunikujících sousedních stanic.",
    "tags": [
      "CLI",
      "ARP",
      "Diagnostika"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Příkazy a diagnostika",
    "id": "ps-adresace-017",
    "type": "choice",
    "title": "PowerShell cmdlet pro sousedy v síti",
    "question": "Který cmdlet se v prostředí Windows PowerShell používá k zobrazení sousedních zařízení v lokální síti a jejich MAC adres (obdoba ARP tabulky)?",
    "choices": [
      "Get-NetNeighbor",
      "Set-WiFiPassword",
      "Remove-NetworkCable",
      "Format-LocalSubnet"
    ],
    "answer": "Get-NetNeighbor",
    "solution": "V PowerShellu slouží cmdlet `Get-NetNeighbor` k vypsání sousedních uzlů v síti ze směrovací/sousedské tabulky (pro IPv4 i IPv6).",
    "tags": [
      "PowerShell",
      "Windows",
      "Get-NetNeighbor"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-001",
    "type": "choice",
    "title": "Hlavní účel služby DNS",
    "question": "Co je hlavním úkolem systému DNS (Domain Name System)?",
    "choices": [
      "Překládat srozumitelná textová doménová jména (např. spssol.cz) na číselné IP adresy a naopak",
      "Šifrovat hesla uživatelů při přihlašování do operačního systému",
      "Přidělovat dynamické IP adresy počítačům v lokální síti",
      "Generovat náhodná čísla pro Wi-Fi šifrovací klíče"
    ],
    "answer": "Překládat srozumitelná textová doménová jména (např. spssol.cz) na číselné IP adresy a naopak",
    "solution": "DNS (Domain Name System) je celosvětově distribuovaná databáze, která zajišťuje překlad doménových jmen (např. `www.google.com`) na odpovídající IP adresy počítačů a serverů, aby spolu mohly navázat spojení.",
    "tags": [
      "DNS",
      "Účel"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-002",
    "type": "choice",
    "title": "Hierarchická struktura domén",
    "question": "Jak je organizována hierarchie doménových jmen v DNS?",
    "choices": [
      "Jako stromová struktura: na vrcholu je kořenová doména (tečka .), následují domény nejvyššího řádu (TLD jako .cz, .com), domény 2. řádu a subdomény",
      "Všechna doménová jména na světě jsou uložena v jednom textovém souboru v abecedním pořadí",
      "Každý stát má svou oddělenou síť bez jakéhokoliv společného kořene",
      "Domény se řadí výhradně podle data jejich zakoupení"
    ],
    "answer": "Jako stromová struktura: na vrcholu je kořenová doména (tečka .), následují domény nejvyššího řádu (TLD jako .cz, .com), domény 2. řádu a subdomény",
    "solution": "Hierarchie DNS má stromovou strukturu s kořenovou zónou (.) na samém vrcholu. Pod ní jsou domény 1. řádu (TLD, např. `.cz`, `.org`), dále domény 2. řádu (např. `spssol`), 3. řádu (např. `mail`) atd.",
    "tags": [
      "DNS",
      "Hierarchie",
      "TLD"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-003",
    "type": "number",
    "title": "Počet kořenových DNS identit (Root Servers)",
    "question": "Kolik základních identit (písmen A až M) autoritativních kořenových serverů (Root Servers) obsluhuje kořenovou zónu celosvětového DNS?",
    "answer": "13",
    "solution": "Kořenovou DNS zónu spravuje 13 kořenových serverových identit (označených písmeny `a.root-servers.net` až `m.root-servers.net`). Fyzicky jsou díky technologii Anycast replikovány na stovkách míst po celém světě.",
    "hint": "Číslo třináct.",
    "tags": [
      "DNS",
      "Root servers"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-004",
    "type": "choice",
    "title": "Autoritativní vs rekurzivní DNS server",
    "question": "Jaký je rozdíl mezi autoritativním a rekurzivním (caching) DNS serverem?",
    "choices": [
      "Autoritativní server má originální data své domény/zóny; rekurzivní server vyhledává odpovědi u autoritativních serverů a ukládá je do cache",
      "Autoritativní server funguje pouze na Linuxu, rekurzivní pouze na Windows",
      "Autoritativní server spravuje výhradně hesla k e-mailu, rekurzivní šifruje web",
      "Mezi těmito servery není žádný technický rozdíl"
    ],
    "answer": "Autoritativní server má originální data své domény/zóny; rekurzivní server vyhledává odpovědi u autoritativních serverů a ukládá je do cache",
    "solution": "Autoritativní server je definitivním správcem zóny a zná oficiální záznamy dané domény. Rekurzivní resolver (poskytovaný např. ISP nebo Google 8.8.8.8) se ptá v hierarchii za klienta a výsledek si po dobu TTL pamatuje v mezipaměti.",
    "tags": [
      "DNS",
      "Servery",
      "Cache"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-005",
    "type": "fill",
    "title": "Platnost DNS záznamu v mezipaměti (TTL)",
    "question": "Jaká třípísmenná zkratka (Time To Live) udává v DNS záznamu čas v sekundách, po který si rekurzivní servery smí výsledek ponechat v mezipaměti?",
    "answer": "TTL",
    "solution": "TTL (Time To Live) je časový údaj určující platnost DNS záznamu v mezipaměti (cache) předtím, než se server musí znovu dotázat autoritativního serveru.",
    "hint": "Zkratka Time To Live.",
    "tags": [
      "DNS",
      "TTL"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS záznamy",
    "id": "ps-sluzby-006",
    "type": "choice",
    "title": "A záznam v DNS",
    "question": "K čemu slouží základní DNS záznam typu A (Address Record)?",
    "choices": [
      "Překládá název domény na 32bitovou adresu protokolu IPv4",
      "Překládá doménové jméno na poštovní směrovací číslo města",
      "Nastavuje heslo pro přístup k administraci webhostingu",
      "Překládá doménové jméno na 128bitovou adresu IPv6"
    ],
    "answer": "Překládá název domény na 32bitovou adresu protokolu IPv4",
    "solution": "Záznam typu A (Address Record) mapuje doménové jméno hostitele přímo na IPv4 adresu (např. `example.com` -> `93.184.216.34`).",
    "tags": [
      "DNS",
      "Záznamy",
      "A record"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS záznamy",
    "id": "ps-sluzby-007",
    "type": "fill",
    "title": "Záznam pro IPv6 adresu",
    "question": "Jaké čtyřpísmenné označení má DNS záznam, který přiřazuje doménovému jménu 128bitovou adresu protokolu IPv6?",
    "answer": "AAAA",
    "solution": "Záznam typu AAAA (tzv. „Quad-A“) překládá doménové jméno na adresu novějšího protokolu IPv6.",
    "hint": "Čtyři stejná písmena A za sebou.",
    "tags": [
      "DNS",
      "IPv6",
      "AAAA"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS záznamy",
    "id": "ps-sluzby-008",
    "type": "choice",
    "title": "Kanonický název – CNAME záznam",
    "question": "K čemu v DNS slouží záznam typu CNAME (Canonical Name)?",
    "choices": [
      "Definuje alias (zástupné jméno) pro jiné doménové jméno (např. www.seznam.cz jako alias pro seznam.cz)",
      "Blokuje přístup k nebezpečným serverům v cizích zemích",
      "Překládá doménové jméno na číslo mobilního telefonu",
      "Slouží k zálohování zdrojového kódu webu do cloudu"
    ],
    "answer": "Definuje alias (zástupné jméno) pro jiné doménové jméno (např. www.seznam.cz jako alias pro seznam.cz)",
    "solution": "CNAME záznam (Canonical Name) vytváří přezdívku (alias) odkazující na jiné doménové jméno (kanonický název). Používá se pro nasměrování více subdomén na jeden cíl.",
    "tags": [
      "DNS",
      "CNAME"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS záznamy",
    "id": "ps-sluzby-009",
    "type": "choice",
    "title": "MX záznam a priorita",
    "question": "K čemu slouží DNS záznam typu MX (Mail Exchanger) a co znamená jeho hodnota priority?",
    "choices": [
      "Určuje poštovní servery pro příjem e-mailů dané domény; čím nižší číslo priority, tím vyšší má server přednost",
      "Měří rychlost odesílání e-mailů v bajtech za sekundu",
      "Ukládá texty všech doručených zpráv za posledních 30 dní",
      "Určuje, který uživatel v doméně smí odesílat hromadné zprávy"
    ],
    "answer": "Určuje poštovní servery pro příjem e-mailů dané domény; čím nižší číslo priority, tím vyšší má server přednost",
    "solution": "Záznam MX (Mail Exchanger) specifikuje poštovní servery obsluhující e-maily pro danou doménu. Parametr preference/priority určuje pořadí: odesílající server zkouší nejdříve stroj s nejnižším číslem (nejvyšší prioritou).",
    "tags": [
      "DNS",
      "MX",
      "E-mail"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-010",
    "type": "choice",
    "title": "Podstata technologie VoIP",
    "question": "Co je podstatou technologie VoIP (Voice over IP)?",
    "choices": [
      "Přenos digitalizovaného a komprimovaného hlasu v podobě datových paketů přes IP sítě (zejména internet)",
      "Přenos zvuku pomocí mechanického vlnění v podzemních ocelových trubkách",
      "Vysílání rádia pouze přes ultrakrátké vlny na frekvenci 100 MHz",
      "Nahrávání hlasových zpráv na magnetofonový pásek a jejich poštovní rozesílání"
    ],
    "answer": "Přenos digitalizovaného a komprimovaného hlasu v podobě datových paketů přes IP sítě (zejména internet)",
    "solution": "VoIP (Voice over IP) digitalizuje analogový hlasový signál, komprimuje jej, zabalí do IP paketů a odesílá přes datovou síť (např. v aplikacích MS Teams, WhatsApp, Zoom či podnikových VoIP ústřednách PBX).",
    "tags": [
      "Hlasové služby",
      "VoIP"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-011",
    "type": "choice",
    "title": "Protokoly SIP a RTP u VoIP",
    "question": "Které dva protokoly se klíčově doplňují při realizaci VoIP hovorů?",
    "choices": [
      "SIP (navázání, řízení a ukončení hovoru) a RTP (přenos samotných hlasových dat v reálném čase)",
      "HTTP (načítání stylů) a CSS (formátování zvuku)",
      "POP3 (stahování hlasu) a SMTP (odesílání ticha)",
      "BNC (krimpování) a ODF (optická vana)"
    ],
    "answer": "SIP (navázání, řízení a ukončení hovoru) a RTP (přenos samotných hlasových dat v reálném čase)",
    "solution": "SIP (Session Initiation Protocol) slouží jako signalizační protokol pro sestavení, správu a zavěšení hovoru. Samotný proud digitalizovaného audia pak v reálném čase přenáší protokol RTP (Real-time Transport Protocol).",
    "tags": [
      "VoIP",
      "SIP",
      "RTP"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-012",
    "type": "choice",
    "title": "Výhody technologie VoLTE",
    "question": "Co přináší technologie VoLTE (Voice over LTE) v mobilních 4G sítích?",
    "choices": [
      "Současný přenos hlasu i vysokorychlostních dat bez přepínání na 2G/3G, rychlejší sestavení spojení a vyšší kvalitu zvuku HD Voice",
      "Nutnost odpojit internet v mobilu během každého hovoru",
      "Placení hovorů podle počtu vyslovených slov",
      "Omezení délky každého hovoru na maximálně 60 sekund"
    ],
    "answer": "Současný přenos hlasu i vysokorychlostních dat bez přepínání na 2G/3G, rychlejší sestavení spojení a vyšší kvalitu zvuku HD Voice",
    "solution": "VoLTE přenáší hovory přímo přes datovou LTE síť s využitím IMS infrastruktury a širokopásmového kodeku AMR-WB (HD Voice). Telefon nemusí přepínat do starších sítí, hovor se spojí za 1-2 sekundy a během volání fungují data plnou rychlostí.",
    "tags": [
      "Mobilní sítě",
      "VoLTE",
      "LTE"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-013",
    "type": "fill",
    "title": "Hlasová technologie pro sítě 5G",
    "question": "Jaká zkratka (Voice over New Radio) označuje technologii přenosu hlasu nativně vyvinutou pro moderní sítě 5G?",
    "answer": "VoNR",
    "solution": "VoNR (Voice over New Radio) je nativní technologie hlasových služeb pro mobilní sítě 5G. Poskytuje ultra nízkou latenci a vysokou kvalitu zvuku.",
    "hint": "Začíná Vo a končí NR.",
    "tags": [
      "5G",
      "VoNR"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-014",
    "type": "choice",
    "title": "Kanály ISDN BRI",
    "question": "Jaké kanály a v jakém počtu tvoří základní digitální telefonní přípojku ISDN BRI (Basic Rate Interface)?",
    "choices": [
      "2 B-kanály (přenos hlasu/dat, každý 64 kb/s) + 1 D-kanál (signalizace, 16 kb/s)",
      "10 B-kanálů a 5 D-kanálů",
      "Pouze 1 společný analogový kanál s proměnlivou rychlostí",
      "30 kanálů pro video a žádný kanál pro signalizaci"
    ],
    "answer": "2 B-kanály (přenos hlasu/dat, každý 64 kb/s) + 1 D-kanál (signalizace, 16 kb/s)",
    "solution": "Přípojka ISDN BRI (2B+D) pro domácnosti nabízela 2 nezávislé hovorové B-kanály (Bearer, po 64 kb/s) a jeden signalizační D-kanál (Delta, 16 kb/s). Umožňovala současně volat a používat internet rychlostí až 128 kb/s.",
    "tags": [
      "ISDN",
      "BRI"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-015",
    "type": "number",
    "title": "Počet B-kanálů u ISDN PRI (linka E1)",
    "question": "Kolik hovorových B-kanálů (po 64 kb/s) nabízí primární digitální přípojka ISDN PRI na evropské lince E1?",
    "answer": "30",
    "solution": "Evropská přípojka ISDN PRI (linka E1) se skládá ze 30 B-kanálů a 1 D-kanálu (30B + D), s celkovou přenosovou kapacitou 2,048 Mb/s.",
    "hint": "Třicet hovorových linek najednou.",
    "tags": [
      "ISDN",
      "PRI",
      "E1"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Transportní protokoly TCP a UDP",
    "id": "ps-sluzby-016",
    "type": "choice",
    "title": "Vlastnosti protokolu TCP",
    "question": "Které vlastnosti vystihují transportní protokol TCP (Transmission Control Protocol)?",
    "choices": [
      "Spojovaný a spolehlivý přenos – navazuje spojení (handshake), potvrzuje doručení dat (ACK), řídí tok a ztracené pakety posílá znovu",
      "Nespojovaný a nezaručený přenos – data posílá bez jakéhokoliv potvrzení za účelem maximální rychlosti",
      "Hardware v základní desce, který se stará o chlazení grafické karty",
      "Protokol určený výhradně pro vysílání rozhlasu po drátě"
    ],
    "answer": "Spojovaný a spolehlivý přenos – navazuje spojení (handshake), potvrzuje doručení dat (ACK), řídí tok a ztracené pakety posílá znovu",
    "solution": "TCP je spolehlivý spojovaný protokol. Zajišťuje, že data dorazí kompletní a ve správném pořadí (využívá se pro HTTP/HTTPS, e-mail SMTP/IMAP, FTP, SSH).",
    "tags": [
      "TCP",
      "Transport",
      "Spolehlivost"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Transportní protokoly TCP a UDP",
    "id": "ps-sluzby-017",
    "type": "choice",
    "title": "Vlastnosti protokolu UDP",
    "question": "Které vlastnosti vystihují transportní protokol UDP (User Datagram Protocol)?",
    "choices": [
      "Nespojovaný (connectionless) a rychlý protokol bez záruky doručení a bez potvrzování, vhodný pro aplikace citlivé na zpoždění",
      "Vysoká režie, trojcestné navazování spojení a automatické šifrování",
      "Protokol pro fyzické propojování kabelů v rozvaděči",
      "Výhradně zálohovací protokol pro páskové mechaniky"
    ],
    "answer": "Nespojovaný (connectionless) a rychlý protokol bez záruky doručení a bez potvrzování, vhodný pro aplikace citlivé na zpoždění",
    "solution": "UDP posílá datagramy bez předchozího navazování spojení a bez potvrzování. Má minimální zpoždění a režii, což je ideální pro streamování zvuku/videa, online hraní her, VoIP a rychlé DNS dotazy.",
    "tags": [
      "UDP",
      "Transport",
      "Rychlost"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Transportní protokoly TCP a UDP",
    "id": "ps-sluzby-018",
    "type": "choice",
    "title": "Proč DNS dotazy běžně používají protokol UDP?",
    "question": "Z jakého důvodu běžné klientské dotazy na DNS server standardně využívají protokol UDP namísto TCP?",
    "choices": [
      "Protože dotaz i odpověď se typicky vejdou do jednoho paketu a UDP ušetří čas potřebný na zdlouhavé navazování TCP spojení",
      "Protože protokol TCP neumí přenášet písmena z doménových jmen",
      "Protože v síti internet je protokol TCP od roku 2020 zakázán",
      "Protože UDP servery jsou zdarma, zatímco za TCP se platí měsíční poplatek"
    ],
    "answer": "Protože dotaz i odpověď se typicky vejdou do jednoho paketu a UDP ušetří čas potřebný na zdlouhavé navazování TCP spojení",
    "solution": "Běžný DNS dotaz je krátký. Při použití UDP proběhne celá transakce během jednoho dotazu a jedné odpovědi (1 RTT), zatímco u TCP by se muselo nejdřív navazovat a pak ukončovat spojení.",
    "tags": [
      "DNS",
      "UDP",
      "Optimalizace"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Základy a rozdělení sítí",
    "subtopic": "Definice a rozlehlost",
    "id": "ps-zaklady-021",
    "type": "choice",
    "title": "Typické přenosové rychlosti v LAN",
    "question": "V jakém řádu se dnes nejčastěji pohybují přenosové rychlosti v moderních lokálních sítích LAN?",
    "choices": [
      "V řádu gigabitů za sekundu (1 Gb/s až 10 Gb/s)",
      "V řádu jednotek bitů za hodinu",
      "Přísně maximálně 128 kb/s",
      "V rychlosti zvuku v mědi (340 m/s)"
    ],
    "answer": "V řádu gigabitů za sekundu (1 Gb/s až 10 Gb/s)",
    "solution": "Běžné současné sítě LAN pracují s gigabitovým Ethernetem (1 Gb/s) na koncových stanicích a 10 Gb/s či více na páteřních spojích.",
    "tags": [
      "LAN",
      "Rychlost"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Topologie a prvky sítí",
    "subtopic": "Topologie sítí",
    "id": "ps-topologie-013",
    "type": "choice",
    "title": "Terminátor u sběrnicové topologie",
    "question": "K čemu slouží zakončovací odpor (terminátor) na obou koncích kabelu ve sběrnicové topologii?",
    "choices": [
      "Pohlcuje elektrický signál na konci vedení a brání jeho nežádoucímu odrazu zpět do kabelu",
      "Zvyšuje rychlost internetu zdvojnásobením frekvence",
      "Chrání síťové karty před napadením počítačovým virem",
      "Slouží jako bezdrátová anténa pro příjem mobilního signálu"
    ],
    "answer": "Pohlcuje elektrický signál na konci vedení a brání jeho nežádoucímu odrazu zpět do kabelu",
    "solution": "Terminátor (odpor typicky 50 ohmů u koaxiálu) pohltí energii signálu na konci vedení, čímž zabrání odrazu vlnění (reflexi), které by zničilo probíhající komunikaci ostatních stanic.",
    "tags": [
      "Topologie",
      "Sběrnice",
      "Terminátor"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Zapojení RJ-45 a patch cordy",
    "id": "ps-media-018",
    "type": "choice",
    "title": "Prohozené páry mezi T-568A a T-568B",
    "question": "Které konkrétní dva barevné páry vodičů jsou prohozeny na pinech 1, 2 a 3, 6 mezi standardy T-568A a T-568B?",
    "choices": [
      "Zelený pár a oranžový pár",
      "Modrý pár a hnědý pár",
      "Zelený pár a hnědý pár",
      "Oranžový pár a modrý pár"
    ],
    "answer": "Zelený pár a oranžový pár",
    "solution": "T-568A používá na pinech 1, 2 zelený pár a na 3, 6 oranžový pár. T-568B to má přesně naopak: na pinech 1, 2 je oranžový pár a na 3, 6 zelený pár. Modrý (piny 4, 5) a hnědý pár (piny 7, 8) zůstávají beze změny.",
    "tags": [
      "Kabeláž",
      "T-568A",
      "T-568B"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "Koaxiální a optické kabely",
    "id": "ps-media-019",
    "type": "choice",
    "title": "Jednovidové vs mnohovidové optické vlákno",
    "question": "Jaký je rozdíl mezi jednovidovým (Single-Mode) a mnohovidovým (Multi-Mode) optickým vláknem?",
    "choices": [
      "Jednovidové vlákno má velmi tenké jádro (cca 9 µm), šíří se v něm jediný světelný paprsek (laser) a je určeno pro dlouhé trasy; mnohovidové má tlustší jádro (50/62,5 µm) pro kratší trasy",
      "Jednovidové vlákno přenáší pouze černobílý obraz, mnohovidové plnobarevný",
      "Jednovidové vlákno funguje pouze ve vakuu, mnohovidové pouze pod vodou",
      "Jednovidové vlákno má elektrické vodiče, mnohovidové nemá žádné"
    ],
    "answer": "Jednovidové vlákno má velmi tenké jádro (cca 9 µm), šíří se v něm jediný světelný paprsek (laser) a je určeno pro dlouhé trasy; mnohovidové má tlustší jádro (50/62,5 µm) pro kratší trasy",
    "solution": "Single-Mode (SM) vlákno má úzké jádro (cca 9 mikrometrů), v němž nedochází k modální disperzi – je ideální pro páteřní a telekomunikační sítě na kilometry až desítky kilometrů. Multi-Mode (MM) má jádro širší a používá se na kratší vzdálenosti v budovách a serverovnách.",
    "tags": [
      "Optika",
      "Single-Mode",
      "Multi-Mode"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Přenosová média a kabeláž",
    "subtopic": "PoE technologie",
    "id": "ps-media-020",
    "type": "choice",
    "title": "Standard PoE+ (IEEE 802.3at)",
    "question": "Jaký maximální výkon na portu nabízí standard PoE+ (IEEE 802.3at)?",
    "choices": [
      "Až 30 W (dodává cca 25,5 W pro napájené koncové zařízení)",
      "Maximálně 1 W",
      "Přes 5000 W (vhodné pro elektrické trouby)",
      "Pouze 5 V při 100 mA jako USB 1.0"
    ],
    "answer": "Až 30 W (dodává cca 25,5 W pro napájené koncové zařízení)",
    "solution": "Standard IEEE 802.3at (PoE+) zvýšil maximální dodávaný výkon ze switche z původních 15,4 W (u 802.3af) až na 30 W na port (cca 25,5 W na straně spotřebiče), což stačí i pro otočné PTZ kamery či výkonná Wi-Fi AP.",
    "tags": [
      "PoE",
      "PoE+",
      "802.3at"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-012",
    "type": "choice",
    "title": "Synchronizační body na relační vrstvě (L5)",
    "question": "K čemu slouží kontrolní body (checkpoints) vkládané relační vrstvou (L5) během dlouhého přenosu dat?",
    "choices": [
      "Při přerušení spojení umožňují navázat na přenos od posledního kontrolního bodu bez nutnosti posílat celý velký soubor znovu od začátku",
      "Měří teplotu procesoru v průběhu stahování",
      "Zastaví přenos dat při vyčerpání FUP limitu",
      "Automaticky vymažou historii v prohlížeči"
    ],
    "answer": "Při přerušení spojení umožňují navázat na přenos od posledního kontrolního bodu bez nutnosti posílat celý velký soubor znovu od začátku",
    "solution": "Relační vrstva (Session Layer) synchronizuje dialog a vkládá do dlouhých přenosů kontrolní body (checkpoints). Dojde-li k pádu spojení v 90 % přenosu, komunikace naváže od posledního kontrolního bodu.",
    "tags": [
      "ISO/OSI",
      "Relační vrstva",
      "Checkpoints"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Síťové modely",
    "subtopic": "Model ISO/OSI",
    "id": "ps-modely-013",
    "type": "choice",
    "title": "Manchester kódování na 1. vrstvě",
    "question": "Co je to Manchester kódování (Manchester coding) na fyzické vrstvě v klasickém Ethernetu?",
    "choices": [
      "Způsob kódování binárních dat elektrickým signálem, kde každý bit má hranu (změnu napětí) přesně uprostřed bitového intervalu pro synchronizaci hodin",
      "Šifrovací algoritmus vyvinutý univerzitou v Manchesteru pro bankovní převody",
      "Název konektoru pro připojení monitoru",
      "Metoda komprese textových dokumentů"
    ],
    "answer": "Způsob kódování binárních dat elektrickým signálem, kde každý bit má hranu (změnu napětí) přesně uprostřed bitového intervalu pro synchronizaci hodin",
    "solution": "Manchester kódování zajišťuje přenos hodin (synchronizaci) přímo v datovém signálu: logická 0 a 1 jsou reprezentovány přechodem z nízké na vysokou úroveň nebo naopak uprostřed každého bitového taktu.",
    "tags": [
      "Fyzická vrstva",
      "Manchester coding"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-018",
    "type": "choice",
    "title": "Historické třídy IPv4 adres (Classful)",
    "question": "Jaké výchozí masky podsítě měly původní historické třídy IPv4 adres A, B a C před zavedením CIDR?",
    "choices": [
      "Třída A: 255.0.0.0 (/8), Třída B: 255.255.0.0 (/16), Třída C: 255.255.255.0 (/24)",
      "Třída A: 255.255.255.255, Třída B: 0.0.0.0, Třída C: 127.0.0.1",
      "Všechny třídy měly identickou masku 255.255.0.0",
      "Třídy se lišily pouze tím, zda končily lichým nebo sudým číslem"
    ],
    "answer": "Třída A: 255.0.0.0 (/8), Třída B: 255.255.0.0 (/16), Třída C: 255.255.255.0 (/24)",
    "solution": "Původní adresace (classful) dělila prostor na pevné třídy: Třída A měla 8 bitů pro síť (maska 255.0.0.0), třída B 16 bitů (255.255.0.0) a třída C 24 bitů (255.255.255.0). CIDR toto pevné dělení zrušil.",
    "tags": [
      "IPv4",
      "Třídy",
      "Maska"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "IPv4 adresa a CIDR",
    "id": "ps-adresace-019",
    "type": "number",
    "title": "Počet IP adres v podsíti /24",
    "question": "Kolik celkových IPv4 adres (včetně adresy sítě a broadcastu) obsahuje podsíť s maskou /24 (255.255.255.0)?",
    "answer": "256",
    "solution": "Maska /24 ponechává pro hosty 8 bitů (32 - 24 = 8). Počet adres je 2^8 = 256 (z toho 1 adresa sítě a 1 broadcast, pro použitelná koncová zařízení tedy zbývá 254 adres).",
    "hint": "Dva na osmou (2^8).",
    "tags": [
      "IPv4",
      "CIDR",
      "Výpočet"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Adresace a konfigurace",
    "subtopic": "Výchozí brána a konfigurace",
    "id": "ps-adresace-020",
    "type": "choice",
    "title": "Zjištění MAC adresy v GUI Windows",
    "question": "Kde lze v grafickém rozhraní (GUI) Windows najít MAC adresu síťového adaptéru?",
    "choices": [
      "V Centrum síťových připojení -> Zobrazit připojení -> Podrobnosti (Fyzická adresa) nebo v Nastavení -> Síť a internet -> Vlastnosti",
      "Pouze v koši mezi smazanými soubory",
      "V programu Malování pod položkou Vložit text",
      "V internetovém bankovnictví v záložce Moje platby"
    ],
    "answer": "V Centrum síťových připojení -> Zobrazit připojení -> Podrobnosti (Fyzická adresa) nebo v Nastavení -> Síť a internet -> Vlastnosti",
    "solution": "Ve Windows lze MAC adresu v GUI najít přes: Ovládací panely -> Síť a internet -> Centrum síťových připojení -> Podrobnosti (položka Fyzická adresa), nebo v moderním Nastavení -> Síť a internet -> Vlastnosti hardwaru, případně v aplikaci Systémové informace.",
    "tags": [
      "Windows",
      "GUI",
      "MAC"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-019",
    "type": "choice",
    "title": "Co je FQDN (Fully Qualified Domain Name)",
    "question": "Co v systému DNS znamená pojem FQDN (Fully Qualified Domain Name)?",
    "choices": [
      "Plně kvalifikované (jednoznačné) doménové jméno obsahující všechny úrovně domén až po kořen (např. mail.spssol.cz.)",
      "Heslo pro přístup k routeru přes Wi-Fi",
      "Formát komprese souborů typu ZIP",
      "Označení pro optický kabel v podmořském vedení"
    ],
    "answer": "Plně kvalifikované (jednoznačné) doménové jméno obsahující všechny úrovně domén až po kořen (např. mail.spssol.cz.)",
    "solution": "FQDN (Fully Qualified Domain Name) jednoznačně a bez pochyb specifikuje konkrétní uzel v hierarchii DNS (včetně hostitele a všech nadřazených domén až ke kořenové tečce).",
    "tags": [
      "DNS",
      "FQDN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "DNS - systém doménových jmen",
    "id": "ps-sluzby-020",
    "type": "choice",
    "title": "DNS a geografická poloha hostitele",
    "question": "Vypovídá příslušnost dvou zařízení ke stejné doméně DNS něco o jejich skutečném geografickém umístění?",
    "choices": [
      "Ne, DNS je logická databáze – dvě zařízení ve stejné doméně mohou být na opačných koncích planety a mít zcela odlišné sítě",
      "Ano, zařízení ve stejné doméně musí být fyzicky v téže místnosti a propojena jedním kabelem",
      "Ano, doména přesně určuje GPS souřadnice budovy",
      "Platí to pouze pro domény s koncovkou .org"
    ],
    "answer": "Ne, DNS je logická databáze – dvě zařízení ve stejné doméně mohou být na opačných koncích planety a mít zcela odlišné sítě",
    "solution": "Jak zdůrazňuje studijní materiál: DNS je distribuovaná databáze jmen. Neříká nic o zeměpisné poloze hosta – 2 zařízení mohou patřit do stejné domény, ale geograficky se nacházet na opačných stranách zeměkoule a v různých IP podsítích.",
    "tags": [
      "DNS",
      "Teorie"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Hlasové a datové služby",
    "id": "ps-sluzby-021",
    "type": "fill",
    "title": "Původní telefonní síť PSTN",
    "question": "Jaká 4písmenná zkratka označuje tradiční veřejnou přepojovanou telefonní síť (Public Switched Telephone Network)?",
    "answer": "PSTN",
    "solution": "PSTN (Public Switched Telephone Network) je celosvětová veřejná telekomunikační síť s přepojováním okruhů původně budovaná pro analogové telefonní hovory.",
    "hint": "Začíná P a končí N (Public Switched...).",
    "tags": [
      "Historie",
      "Telefonie",
      "PSTN"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Transportní protokoly TCP a UDP",
    "id": "ps-sluzby-022",
    "type": "choice",
    "title": "Trojcestný handshake (Three-way handshake) u TCP",
    "question": "Jakým mechanismem navazuje protokol TCP spolehlivé spojení před zahájením přenosu dat?",
    "choices": [
      "Trojcestným navázáním spojení: SYN -> SYN-ACK -> ACK",
      "Odesláním jednoho náhodného pingu bez čekání na odpověď",
      "Vypnutím a zapnutím síťového adaptéru",
      "Vytočením telefonního čísla ústředny"
    ],
    "answer": "Trojcestným navázáním spojení: SYN -> SYN-ACK -> ACK",
    "solution": "Protokol TCP navazuje spojení pomocí 3 zpráv (Three-way handshake): 1. Klient pošle SYN, 2. Server odpoví SYN-ACK, 3. Klient potvrdí zprávou ACK. Teprve poté začíná bezpečný přenos dat.",
    "tags": [
      "TCP",
      "Handshake",
      "Spojení"
    ]
  },
  {
    "subject": "Počítačové sítě",
    "topic": "Služby a protokoly",
    "subtopic": "Transportní protokoly TCP a UDP",
    "id": "ps-sluzby-023",
    "type": "choice",
    "title": "Čísla portů na transportní vrstvě",
    "question": "K čemu slouží čísla síťových portů (např. port 80 pro HTTP nebo 443 pro HTTPS) na transportní vrstvě?",
    "choices": [
      "K jednoznačné identifikaci konkrétní běžící aplikace nebo služby na daném zařízení",
      "K označení pořadového čísla počítače v řadě na stole",
      "K nastavení hlasitosti reproduktorů připojeného počítače",
      "K určení tloušťky optického kabelu v milimetrech"
    ],
    "answer": "K jednoznačné identifikaci konkrétní běžící aplikace nebo služby na daném zařízení",
    "solution": "Port je číslo od 0 do 65535, které určuje, které konkrétní aplikaci či procesu na cílovém počítači data patří (např. port 80 = nešifrovaný web HTTP, port 443 = šifrovaný web HTTPS, port 53 = DNS).",
    "tags": [
      "Porty",
      "Transportní vrstva"
    ]
  }
];
