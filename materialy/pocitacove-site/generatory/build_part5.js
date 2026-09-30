const path = require('path');
const fs = require('fs');

const exercises = [
  // Další doplňující otázky pokrývající zbývající detaily z canvasu
  {
    subject: 'Počítačové sítě',
    topic: 'Základy a rozdělení sítí',
    subtopic: 'Definice a rozlehlost',
    id: 'ps-zaklady-021',
    type: 'choice',
    title: 'Typické přenosové rychlosti v LAN',
    question: 'V jakém řádu se dnes nejčastěji pohybují přenosové rychlosti v moderních lokálních sítích LAN?',
    choices: [
      'V řádu gigabitů za sekundu (1 Gb/s až 10 Gb/s)',
      'V řádu jednotek bitů za hodinu',
      'Přísně maximálně 128 kb/s',
      'V rychlosti zvuku v mědi (340 m/s)'
    ],
    answer: 'V řádu gigabitů za sekundu (1 Gb/s až 10 Gb/s)',
    solution: 'Běžné současné sítě LAN pracují s gigabitovým Ethernetem (1 Gb/s) na koncových stanicích a 10 Gb/s či více na páteřních spojích.',
    tags: ['LAN', 'Rychlost']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Topologie a prvky sítí',
    subtopic: 'Topologie sítí',
    id: 'ps-topologie-013',
    type: 'choice',
    title: 'Terminátor u sběrnicové topologie',
    question: 'K čemu slouží zakončovací odpor (terminátor) na obou koncích kabelu ve sběrnicové topologii?',
    choices: [
      'Pohlcuje elektrický signál na konci vedení a brání jeho nežádoucímu odrazu zpět do kabelu',
      'Zvyšuje rychlost internetu zdvojnásobením frekvence',
      'Chrání síťové karty před napadením počítačovým virem',
      'Slouží jako bezdrátová anténa pro příjem mobilního signálu'
    ],
    answer: 'Pohlcuje elektrický signál na konci vedení a brání jeho nežádoucímu odrazu zpět do kabelu',
    solution: 'Terminátor (odpor typicky 50 ohmů u koaxiálu) pohltí energii signálu na konci vedení, čímž zabrání odrazu vlnění (reflexi), které by zničilo probíhající komunikaci ostatních stanic.',
    tags: ['Topologie', 'Sběrnice', 'Terminátor']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Přenosová média a kabeláž',
    subtopic: 'Zapojení RJ-45 a patch cordy',
    id: 'ps-media-018',
    type: 'choice',
    title: 'Prohozené páry mezi T-568A a T-568B',
    question: 'Které konkrétní dva barevné páry vodičů jsou prohozeny na pinech 1, 2 a 3, 6 mezi standardy T-568A a T-568B?',
    choices: [
      'Zelený pár a oranžový pár',
      'Modrý pár a hnědý pár',
      'Zelený pár a hnědý pár',
      'Oranžový pár a modrý pár'
    ],
    answer: 'Zelený pár a oranžový pár',
    solution: 'T-568A používá na pinech 1, 2 zelený pár a na 3, 6 oranžový pár. T-568B to má přesně naopak: na pinech 1, 2 je oranžový pár a na 3, 6 zelený pár. Modrý (piny 4, 5) a hnědý pár (piny 7, 8) zůstávají beze změny.',
    tags: ['Kabeláž', 'T-568A', 'T-568B']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Přenosová média a kabeláž',
    subtopic: 'Koaxiální a optické kabely',
    id: 'ps-media-019',
    type: 'choice',
    title: 'Jednovidové vs mnohovidové optické vlákno',
    question: 'Jaký je rozdíl mezi jednovidovým (Single-Mode) a mnohovidovým (Multi-Mode) optickým vláknem?',
    choices: [
      'Jednovidové vlákno má velmi tenké jádro (cca 9 µm), šíří se v něm jediný světelný paprsek (laser) a je určeno pro dlouhé trasy; mnohovidové má tlustší jádro (50/62,5 µm) pro kratší trasy',
      'Jednovidové vlákno přenáší pouze černobílý obraz, mnohovidové plnobarevný',
      'Jednovidové vlákno funguje pouze ve vakuu, mnohovidové pouze pod vodou',
      'Jednovidové vlákno má elektrické vodiče, mnohovidové nemá žádné'
    ],
    answer: 'Jednovidové vlákno má velmi tenké jádro (cca 9 µm), šíří se v něm jediný světelný paprsek (laser) a je určeno pro dlouhé trasy; mnohovidové má tlustší jádro (50/62,5 µm) pro kratší trasy',
    solution: 'Single-Mode (SM) vlákno má úzké jádro (cca 9 mikrometrů), v němž nedochází k modální disperzi – je ideální pro páteřní a telekomunikační sítě na kilometry až desítky kilometrů. Multi-Mode (MM) má jádro širší a používá se na kratší vzdálenosti v budovách a serverovnách.',
    tags: ['Optika', 'Single-Mode', 'Multi-Mode']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Přenosová média a kabeláž',
    subtopic: 'PoE technologie',
    id: 'ps-media-020',
    type: 'choice',
    title: 'Standard PoE+ (IEEE 802.3at)',
    question: 'Jaký maximální výkon na portu nabízí standard PoE+ (IEEE 802.3at)?',
    choices: [
      'Až 30 W (dodává cca 25,5 W pro napájené koncové zařízení)',
      'Maximálně 1 W',
      'Přes 5000 W (vhodné pro elektrické trouby)',
      'Pouze 5 V při 100 mA jako USB 1.0'
    ],
    answer: 'Až 30 W (dodává cca 25,5 W pro napájené koncové zařízení)',
    solution: 'Standard IEEE 802.3at (PoE+) zvýšil maximální dodávaný výkon ze switche z původních 15,4 W (u 802.3af) až na 30 W na port (cca 25,5 W na straně spotřebiče), což stačí i pro otočné PTZ kamery či výkonná Wi-Fi AP.',
    tags: ['PoE', 'PoE+', '802.3at']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Síťové modely',
    subtopic: 'Model ISO/OSI',
    id: 'ps-modely-012',
    type: 'choice',
    title: 'Synchronizační body na relační vrstvě (L5)',
    question: 'K čemu slouží kontrolní body (checkpoints) vkládané relační vrstvou (L5) během dlouhého přenosu dat?',
    choices: [
      'Při přerušení spojení umožňují navázat na přenos od posledního kontrolního bodu bez nutnosti posílat celý velký soubor znovu od začátku',
      'Měří teplotu procesoru v průběhu stahování',
      'Zastaví přenos dat při vyčerpání FUP limitu',
      'Automaticky vymažou historii v prohlížeči'
    ],
    answer: 'Při přerušení spojení umožňují navázat na přenos od posledního kontrolního bodu bez nutnosti posílat celý velký soubor znovu od začátku',
    solution: 'Relační vrstva (Session Layer) synchronizuje dialog a vkládá do dlouhých přenosů kontrolní body (checkpoints). Dojde-li k pádu spojení v 90 % přenosu, komunikace naváže od posledního kontrolního bodu.',
    tags: ['ISO/OSI', 'Relační vrstva', 'Checkpoints']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Síťové modely',
    subtopic: 'Model ISO/OSI',
    id: 'ps-modely-013',
    type: 'choice',
    title: 'Manchester kódování na 1. vrstvě',
    question: 'Co je to Manchester kódování (Manchester coding) na fyzické vrstvě v klasickém Ethernetu?',
    choices: [
      'Způsob kódování binárních dat elektrickým signálem, kde každý bit má hranu (změnu napětí) přesně uprostřed bitového intervalu pro synchronizaci hodin',
      'Šifrovací algoritmus vyvinutý univerzitou v Manchesteru pro bankovní převody',
      'Název konektoru pro připojení monitoru',
      'Metoda komprese textových dokumentů'
    ],
    answer: 'Způsob kódování binárních dat elektrickým signálem, kde každý bit má hranu (změnu napětí) přesně uprostřed bitového intervalu pro synchronizaci hodin',
    solution: 'Manchester kódování zajišťuje přenos hodin (synchronizaci) přímo v datovém signálu: logická 0 a 1 jsou reprezentovány přechodem z nízké na vysokou úroveň nebo naopak uprostřed každého bitového taktu.',
    tags: ['Fyzická vrstva', 'Manchester coding']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Adresace a konfigurace',
    subtopic: 'IPv4 adresa a CIDR',
    id: 'ps-adresace-018',
    type: 'choice',
    title: 'Historické třídy IPv4 adres (Classful)',
    question: 'Jaké výchozí masky podsítě měly původní historické třídy IPv4 adres A, B a C před zavedením CIDR?',
    choices: [
      'Třída A: 255.0.0.0 (/8), Třída B: 255.255.0.0 (/16), Třída C: 255.255.255.0 (/24)',
      'Třída A: 255.255.255.255, Třída B: 0.0.0.0, Třída C: 127.0.0.1',
      'Všechny třídy měly identickou masku 255.255.0.0',
      'Třídy se lišily pouze tím, zda končily lichým nebo sudým číslem'
    ],
    answer: 'Třída A: 255.0.0.0 (/8), Třída B: 255.255.0.0 (/16), Třída C: 255.255.255.0 (/24)',
    solution: 'Původní adresace (classful) dělila prostor na pevné třídy: Třída A měla 8 bitů pro síť (maska 255.0.0.0), třída B 16 bitů (255.255.0.0) a třída C 24 bitů (255.255.255.0). CIDR toto pevné dělení zrušil.',
    tags: ['IPv4', 'Třídy', 'Maska']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Adresace a konfigurace',
    subtopic: 'IPv4 adresa a CIDR',
    id: 'ps-adresace-019',
    type: 'number',
    title: 'Počet IP adres v podsíti /24',
    question: 'Kolik celkových IPv4 adres (včetně adresy sítě a broadcastu) obsahuje podsíť s maskou /24 (255.255.255.0)?',
    answer: '256',
    solution: 'Maska /24 ponechává pro hosty 8 bitů (32 - 24 = 8). Počet adres je 2^8 = 256 (z toho 1 adresa sítě a 1 broadcast, pro použitelná koncová zařízení tedy zbývá 254 adres).',
    hint: 'Dva na osmou (2^8).',
    tags: ['IPv4', 'CIDR', 'Výpočet']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Adresace a konfigurace',
    subtopic: 'Výchozí brána a konfigurace',
    id: 'ps-adresace-020',
    type: 'choice',
    title: 'Zjištění MAC adresy v GUI Windows',
    question: 'Kde lze v grafickém rozhraní (GUI) Windows najít MAC adresu síťového adaptéru?',
    choices: [
      'V Centrum síťových připojení -> Zobrazit připojení -> Podrobnosti (Fyzická adresa) nebo v Nastavení -> Síť a internet -> Vlastnosti',
      'Pouze v koši mezi smazanými soubory',
      'V programu Malování pod položkou Vložit text',
      'V internetovém bankovnictví v záložce Moje platby'
    ],
    answer: 'V Centrum síťových připojení -> Zobrazit připojení -> Podrobnosti (Fyzická adresa) nebo v Nastavení -> Síť a internet -> Vlastnosti',
    solution: 'Ve Windows lze MAC adresu v GUI najít přes: Ovládací panely -> Síť a internet -> Centrum síťových připojení -> Podrobnosti (položka Fyzická adresa), nebo v moderním Nastavení -> Síť a internet -> Vlastnosti hardwaru, případně v aplikaci Systémové informace.',
    tags: ['Windows', 'GUI', 'MAC']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-019',
    type: 'choice',
    title: 'Co je FQDN (Fully Qualified Domain Name)',
    question: 'Co v systému DNS znamená pojem FQDN (Fully Qualified Domain Name)?',
    choices: [
      'Plně kvalifikované (jednoznačné) doménové jméno obsahující všechny úrovně domén až po kořen (např. mail.spssol.cz.)',
      'Heslo pro přístup k routeru přes Wi-Fi',
      'Formát komprese souborů typu ZIP',
      'Označení pro optický kabel v podmořském vedení'
    ],
    answer: 'Plně kvalifikované (jednoznačné) doménové jméno obsahující všechny úrovně domén až po kořen (např. mail.spssol.cz.)',
    solution: 'FQDN (Fully Qualified Domain Name) jednoznačně a bez pochyb specifikuje konkrétní uzel v hierarchii DNS (včetně hostitele a všech nadřazených domén až ke kořenové tečce).',
    tags: ['DNS', 'FQDN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-020',
    type: 'choice',
    title: 'DNS a geografická poloha hostitele',
    question: 'Vypovídá příslušnost dvou zařízení ke stejné doméně DNS něco o jejich skutečném geografickém umístění?',
    choices: [
      'Ne, DNS je logická databáze – dvě zařízení ve stejné doméně mohou být na opačných koncích planety a mít zcela odlišné sítě',
      'Ano, zařízení ve stejné doméně musí být fyzicky v téže místnosti a propojena jedním kabelem',
      'Ano, doména přesně určuje GPS souřadnice budovy',
      'Platí to pouze pro domény s koncovkou .org'
    ],
    answer: 'Ne, DNS je logická databáze – dvě zařízení ve stejné doméně mohou být na opačných koncích planety a mít zcela odlišné sítě',
    solution: 'Jak zdůrazňuje studijní materiál: DNS je distribuovaná databáze jmen. Neříká nic o zeměpisné poloze hosta – 2 zařízení mohou patřit do stejné domény, ale geograficky se nacházet na opačných stranách zeměkoule a v různých IP podsítích.',
    tags: ['DNS', 'Teorie']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-021',
    type: 'fill',
    title: 'Původní telefonní síť PSTN',
    question: 'Jaká 4písmenná zkratka označuje tradiční veřejnou přepojovanou telefonní síť (Public Switched Telephone Network)?',
    answer: 'PSTN',
    solution: 'PSTN (Public Switched Telephone Network) je celosvětová veřejná telekomunikační síť s přepojováním okruhů původně budovaná pro analogové telefonní hovory.',
    hint: 'Začíná P a končí N (Public Switched...).',
    tags: ['Historie', 'Telefonie', 'PSTN']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Transportní protokoly TCP a UDP',
    id: 'ps-sluzby-022',
    type: 'choice',
    title: 'Trojcestný handshake (Three-way handshake) u TCP',
    question: 'Jakým mechanismem navazuje protokol TCP spolehlivé spojení před zahájením přenosu dat?',
    choices: [
      'Trojcestným navázáním spojení: SYN -> SYN-ACK -> ACK',
      'Odesláním jednoho náhodného pingu bez čekání na odpověď',
      'Vypnutím a zapnutím síťového adaptéru',
      'Vytočením telefonního čísla ústředny'
    ],
    answer: 'Trojcestným navázáním spojení: SYN -> SYN-ACK -> ACK',
    solution: 'Protokol TCP navazuje spojení pomocí 3 zpráv (Three-way handshake): 1. Klient pošle SYN, 2. Server odpoví SYN-ACK, 3. Klient potvrdí zprávou ACK. Teprve poté začíná bezpečný přenos dat.',
    tags: ['TCP', 'Handshake', 'Spojení']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Transportní protokoly TCP a UDP',
    id: 'ps-sluzby-023',
    type: 'choice',
    title: 'Čísla portů na transportní vrstvě',
    question: 'K čemu slouží čísla síťových portů (např. port 80 pro HTTP nebo 443 pro HTTPS) na transportní vrstvě?',
    choices: [
      'K jednoznačné identifikaci konkrétní běžící aplikace nebo služby na daném zařízení',
      'K označení pořadového čísla počítače v řadě na stole',
      'K nastavení hlasitosti reproduktorů připojeného počítače',
      'K určení tloušťky optického kabelu v milimetrech'
    ],
    answer: 'K jednoznačné identifikaci konkrétní běžící aplikace nebo služby na daném zařízení',
    solution: 'Port je číslo od 0 do 65535, které určuje, které konkrétní aplikaci či procesu na cílovém počítači data patří (např. port 80 = nešifrovaný web HTTP, port 443 = šifrovaný web HTTPS, port 53 = DNS).',
    tags: ['Porty', 'Transportní vrstva']
  }
];

console.log('Prepared part 5:', exercises.length);
fs.writeFileSync(path.join(__dirname, '..', 'vystupy', 'exercises_part5.json'), JSON.stringify(exercises, null, 2), 'utf8');
