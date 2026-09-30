const path = require('path');
const fs = require('fs');

const exercises = [
  // ============================================================
  // TÉMA 6: Služby a protokoly
  // ============================================================
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-001',
    type: 'choice',
    title: 'Hlavní účel služby DNS',
    question: 'Co je hlavním úkolem systému DNS (Domain Name System)?',
    choices: [
      'Překládat srozumitelná textová doménová jména (např. spssol.cz) na číselné IP adresy a naopak',
      'Šifrovat hesla uživatelů při přihlašování do operačního systému',
      'Přidělovat dynamické IP adresy počítačům v lokální síti',
      'Generovat náhodná čísla pro Wi-Fi šifrovací klíče'
    ],
    answer: 'Překládat srozumitelná textová doménová jména (např. spssol.cz) na číselné IP adresy a naopak',
    solution: 'DNS (Domain Name System) je celosvětově distribuovaná databáze, která zajišťuje překlad doménových jmen (např. `www.google.com`) na odpovídající IP adresy počítačů a serverů, aby spolu mohly navázat spojení.',
    tags: ['DNS', 'Účel']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-002',
    type: 'choice',
    title: 'Hierarchická struktura domén',
    question: 'Jak je organizována hierarchie doménových jmen v DNS?',
    choices: [
      'Jako stromová struktura: na vrcholu je kořenová doména (tečka .), následují domény nejvyššího řádu (TLD jako .cz, .com), domény 2. řádu a subdomény',
      'Všechna doménová jména na světě jsou uložena v jednom textovém souboru v abecedním pořadí',
      'Každý stát má svou oddělenou síť bez jakéhokoliv společného kořene',
      'Domény se řadí výhradně podle data jejich zakoupení'
    ],
    answer: 'Jako stromová struktura: na vrcholu je kořenová doména (tečka .), následují domény nejvyššího řádu (TLD jako .cz, .com), domény 2. řádu a subdomény',
    solution: 'Hierarchie DNS má stromovou strukturu s kořenovou zónou (.) na samém vrcholu. Pod ní jsou domény 1. řádu (TLD, např. `.cz`, `.org`), dále domény 2. řádu (např. `spssol`), 3. řádu (např. `mail`) atd.',
    tags: ['DNS', 'Hierarchie', 'TLD']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-003',
    type: 'number',
    title: 'Počet kořenových DNS identit (Root Servers)',
    question: 'Kolik základních identit (písmen A až M) autoritativních kořenových serverů (Root Servers) obsluhuje kořenovou zónu celosvětového DNS?',
    answer: '13',
    solution: 'Kořenovou DNS zónu spravuje 13 kořenových serverových identit (označených písmeny `a.root-servers.net` až `m.root-servers.net`). Fyzicky jsou díky technologii Anycast replikovány na stovkách míst po celém světě.',
    hint: 'Číslo třináct.',
    tags: ['DNS', 'Root servers']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-004',
    type: 'choice',
    title: 'Autoritativní vs rekurzivní DNS server',
    question: 'Jaký je rozdíl mezi autoritativním a rekurzivním (caching) DNS serverem?',
    choices: [
      'Autoritativní server má originální data své domény/zóny; rekurzivní server vyhledává odpovědi u autoritativních serverů a ukládá je do cache',
      'Autoritativní server funguje pouze na Linuxu, rekurzivní pouze na Windows',
      'Autoritativní server spravuje výhradně hesla k e-mailu, rekurzivní šifruje web',
      'Mezi těmito servery není žádný technický rozdíl'
    ],
    answer: 'Autoritativní server má originální data své domény/zóny; rekurzivní server vyhledává odpovědi u autoritativních serverů a ukládá je do cache',
    solution: 'Autoritativní server je definitivním správcem zóny a zná oficiální záznamy dané domény. Rekurzivní resolver (poskytovaný např. ISP nebo Google 8.8.8.8) se ptá v hierarchii za klienta a výsledek si po dobu TTL pamatuje v mezipaměti.',
    tags: ['DNS', 'Servery', 'Cache']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS - systém doménových jmen',
    id: 'ps-sluzby-005',
    type: 'fill',
    title: 'Platnost DNS záznamu v mezipaměti (TTL)',
    question: 'Jaká třípísmenná zkratka (Time To Live) udává v DNS záznamu čas v sekundách, po který si rekurzivní servery smí výsledek ponechat v mezipaměti?',
    answer: 'TTL',
    solution: 'TTL (Time To Live) je časový údaj určující platnost DNS záznamu v mezipaměti (cache) předtím, než se server musí znovu dotázat autoritativního serveru.',
    hint: 'Zkratka Time To Live.',
    tags: ['DNS', 'TTL']
  },

  // Subtopic: DNS záznamy
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS záznamy',
    id: 'ps-sluzby-006',
    type: 'choice',
    title: 'A záznam v DNS',
    question: 'K čemu slouží základní DNS záznam typu A (Address Record)?',
    choices: [
      'Překládá název domény na 32bitovou adresu protokolu IPv4',
      'Překládá doménové jméno na poštovní směrovací číslo města',
      'Nastavuje heslo pro přístup k administraci webhostingu',
      'Překládá doménové jméno na 128bitovou adresu IPv6'
    ],
    answer: 'Překládá název domény na 32bitovou adresu protokolu IPv4',
    solution: 'Záznam typu A (Address Record) mapuje doménové jméno hostitele přímo na IPv4 adresu (např. `example.com` -> `93.184.216.34`).',
    tags: ['DNS', 'Záznamy', 'A record']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS záznamy',
    id: 'ps-sluzby-007',
    type: 'fill',
    title: 'Záznam pro IPv6 adresu',
    question: 'Jaké čtyřpísmenné označení má DNS záznam, který přiřazuje doménovému jménu 128bitovou adresu protokolu IPv6?',
    answer: 'AAAA',
    solution: 'Záznam typu AAAA (tzv. „Quad-A“) překládá doménové jméno na adresu novějšího protokolu IPv6.',
    hint: 'Čtyři stejná písmena A za sebou.',
    tags: ['DNS', 'IPv6', 'AAAA']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS záznamy',
    id: 'ps-sluzby-008',
    type: 'choice',
    title: 'Kanonický název – CNAME záznam',
    question: 'K čemu v DNS slouží záznam typu CNAME (Canonical Name)?',
    choices: [
      'Definuje alias (zástupné jméno) pro jiné doménové jméno (např. www.seznam.cz jako alias pro seznam.cz)',
      'Blokuje přístup k nebezpečným serverům v cizích zemích',
      'Překládá doménové jméno na číslo mobilního telefonu',
      'Slouží k zálohování zdrojového kódu webu do cloudu'
    ],
    answer: 'Definuje alias (zástupné jméno) pro jiné doménové jméno (např. www.seznam.cz jako alias pro seznam.cz)',
    solution: 'CNAME záznam (Canonical Name) vytváří přezdívku (alias) odkazující na jiné doménové jméno (kanonický název). Používá se pro nasměrování více subdomén na jeden cíl.',
    tags: ['DNS', 'CNAME']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'DNS záznamy',
    id: 'ps-sluzby-009',
    type: 'choice',
    title: 'MX záznam a priorita',
    question: 'K čemu slouží DNS záznam typu MX (Mail Exchanger) a co znamená jeho hodnota priority?',
    choices: [
      'Určuje poštovní servery pro příjem e-mailů dané domény; čím nižší číslo priority, tím vyšší má server přednost',
      'Měří rychlost odesílání e-mailů v bajtech za sekundu',
      'Ukládá texty všech doručených zpráv za posledních 30 dní',
      'Určuje, který uživatel v doméně smí odesílat hromadné zprávy'
    ],
    answer: 'Určuje poštovní servery pro příjem e-mailů dané domény; čím nižší číslo priority, tím vyšší má server přednost',
    solution: 'Záznam MX (Mail Exchanger) specifikuje poštovní servery obsluhující e-maily pro danou doménu. Parametr preference/priority určuje pořadí: odesílající server zkouší nejdříve stroj s nejnižším číslem (nejvyšší prioritou).',
    tags: ['DNS', 'MX', 'E-mail']
  },

  // Subtopic: Hlasové a datové služby
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-010',
    type: 'choice',
    title: 'Podstata technologie VoIP',
    question: 'Co je podstatou technologie VoIP (Voice over IP)?',
    choices: [
      'Přenos digitalizovaného a komprimovaného hlasu v podobě datových paketů přes IP sítě (zejména internet)',
      'Přenos zvuku pomocí mechanického vlnění v podzemních ocelových trubkách',
      'Vysílání rádia pouze přes ultrakrátké vlny na frekvenci 100 MHz',
      'Nahrávání hlasových zpráv na magnetofonový pásek a jejich poštovní rozesílání'
    ],
    answer: 'Přenos digitalizovaného a komprimovaného hlasu v podobě datových paketů přes IP sítě (zejména internet)',
    solution: 'VoIP (Voice over IP) digitalizuje analogový hlasový signál, komprimuje jej, zabalí do IP paketů a odesílá přes datovou síť (např. v aplikacích MS Teams, WhatsApp, Zoom či podnikových VoIP ústřednách PBX).',
    tags: ['Hlasové služby', 'VoIP']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-011',
    type: 'choice',
    title: 'Protokoly SIP a RTP u VoIP',
    question: 'Které dva protokoly se klíčově doplňují při realizaci VoIP hovorů?',
    choices: [
      'SIP (navázání, řízení a ukončení hovoru) a RTP (přenos samotných hlasových dat v reálném čase)',
      'HTTP (načítání stylů) a CSS (formátování zvuku)',
      'POP3 (stahování hlasu) a SMTP (odesílání ticha)',
      'BNC (krimpování) a ODF (optická vana)'
    ],
    answer: 'SIP (navázání, řízení a ukončení hovoru) a RTP (přenos samotných hlasových dat v reálném čase)',
    solution: 'SIP (Session Initiation Protocol) slouží jako signalizační protokol pro sestavení, správu a zavěšení hovoru. Samotný proud digitalizovaného audia pak v reálném čase přenáší protokol RTP (Real-time Transport Protocol).',
    tags: ['VoIP', 'SIP', 'RTP']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-012',
    type: 'choice',
    title: 'Výhody technologie VoLTE',
    question: 'Co přináší technologie VoLTE (Voice over LTE) v mobilních 4G sítích?',
    choices: [
      'Současný přenos hlasu i vysokorychlostních dat bez přepínání na 2G/3G, rychlejší sestavení spojení a vyšší kvalitu zvuku HD Voice',
      'Nutnost odpojit internet v mobilu během každého hovoru',
      'Placení hovorů podle počtu vyslovených slov',
      'Omezení délky každého hovoru na maximálně 60 sekund'
    ],
    answer: 'Současný přenos hlasu i vysokorychlostních dat bez přepínání na 2G/3G, rychlejší sestavení spojení a vyšší kvalitu zvuku HD Voice',
    solution: 'VoLTE přenáší hovory přímo přes datovou LTE síť s využitím IMS infrastruktury a širokopásmového kodeku AMR-WB (HD Voice). Telefon nemusí přepínat do starších sítí, hovor se spojí za 1-2 sekundy a během volání fungují data plnou rychlostí.',
    tags: ['Mobilní sítě', 'VoLTE', 'LTE']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-013',
    type: 'fill',
    title: 'Hlasová technologie pro sítě 5G',
    question: 'Jaká zkratka (Voice over New Radio) označuje technologii přenosu hlasu nativně vyvinutou pro moderní sítě 5G?',
    answer: 'VoNR',
    solution: 'VoNR (Voice over New Radio) je nativní technologie hlasových služeb pro mobilní sítě 5G. Poskytuje ultra nízkou latenci a vysokou kvalitu zvuku.',
    hint: 'Začíná Vo a končí NR.',
    tags: ['5G', 'VoNR']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-014',
    type: 'choice',
    title: 'Kanály ISDN BRI',
    question: 'Jaké kanály a v jakém počtu tvoří základní digitální telefonní přípojku ISDN BRI (Basic Rate Interface)?',
    choices: [
      '2 B-kanály (přenos hlasu/dat, každý 64 kb/s) + 1 D-kanál (signalizace, 16 kb/s)',
      '10 B-kanálů a 5 D-kanálů',
      'Pouze 1 společný analogový kanál s proměnlivou rychlostí',
      '30 kanálů pro video a žádný kanál pro signalizaci'
    ],
    answer: '2 B-kanály (přenos hlasu/dat, každý 64 kb/s) + 1 D-kanál (signalizace, 16 kb/s)',
    solution: 'Přípojka ISDN BRI (2B+D) pro domácnosti nabízela 2 nezávislé hovorové B-kanály (Bearer, po 64 kb/s) a jeden signalizační D-kanál (Delta, 16 kb/s). Umožňovala současně volat a používat internet rychlostí až 128 kb/s.',
    tags: ['ISDN', 'BRI']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Hlasové a datové služby',
    id: 'ps-sluzby-015',
    type: 'number',
    title: 'Počet B-kanálů u ISDN PRI (linka E1)',
    question: 'Kolik hovorových B-kanálů (po 64 kb/s) nabízí primární digitální přípojka ISDN PRI na evropské lince E1?',
    answer: '30',
    solution: 'Evropská přípojka ISDN PRI (linka E1) se skládá ze 30 B-kanálů a 1 D-kanálu (30B + D), s celkovou přenosovou kapacitou 2,048 Mb/s.',
    hint: 'Třicet hovorových linek najednou.',
    tags: ['ISDN', 'PRI', 'E1']
  },

  // Subtopic: Transportní protokoly TCP a UDP
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Transportní protokoly TCP a UDP',
    id: 'ps-sluzby-016',
    type: 'choice',
    title: 'Vlastnosti protokolu TCP',
    question: 'Které vlastnosti vystihují transportní protokol TCP (Transmission Control Protocol)?',
    choices: [
      'Spojovaný a spolehlivý přenos – navazuje spojení (handshake), potvrzuje doručení dat (ACK), řídí tok a ztracené pakety posílá znovu',
      'Nespojovaný a nezaručený přenos – data posílá bez jakéhokoliv potvrzení za účelem maximální rychlosti',
      'Hardware v základní desce, který se stará o chlazení grafické karty',
      'Protokol určený výhradně pro vysílání rozhlasu po drátě'
    ],
    answer: 'Spojovaný a spolehlivý přenos – navazuje spojení (handshake), potvrzuje doručení dat (ACK), řídí tok a ztracené pakety posílá znovu',
    solution: 'TCP je spolehlivý spojovaný protokol. Zajišťuje, že data dorazí kompletní a ve správném pořadí (využívá se pro HTTP/HTTPS, e-mail SMTP/IMAP, FTP, SSH).',
    tags: ['TCP', 'Transport', 'Spolehlivost']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Transportní protokoly TCP a UDP',
    id: 'ps-sluzby-017',
    type: 'choice',
    title: 'Vlastnosti protokolu UDP',
    question: 'Které vlastnosti vystihují transportní protokol UDP (User Datagram Protocol)?',
    choices: [
      'Nespojovaný (connectionless) a rychlý protokol bez záruky doručení a bez potvrzování, vhodný pro aplikace citlivé na zpoždění',
      'Vysoká režie, trojcestné navazování spojení a automatické šifrování',
      'Protokol pro fyzické propojování kabelů v rozvaděči',
      'Výhradně zálohovací protokol pro páskové mechaniky'
    ],
    answer: 'Nespojovaný (connectionless) a rychlý protokol bez záruky doručení a bez potvrzování, vhodný pro aplikace citlivé na zpoždění',
    solution: 'UDP posílá datagramy bez předchozího navazování spojení a bez potvrzování. Má minimální zpoždění a režii, což je ideální pro streamování zvuku/videa, online hraní her, VoIP a rychlé DNS dotazy.',
    tags: ['UDP', 'Transport', 'Rychlost']
  },
  {
    subject: 'Počítačové sítě',
    topic: 'Služby a protokoly',
    subtopic: 'Transportní protokoly TCP a UDP',
    id: 'ps-sluzby-018',
    type: 'choice',
    title: 'Proč DNS dotazy běžně používají protokol UDP?',
    question: 'Z jakého důvodu běžné klientské dotazy na DNS server standardně využívají protokol UDP namísto TCP?',
    choices: [
      'Protože dotaz i odpověď se typicky vejdou do jednoho paketu a UDP ušetří čas potřebný na zdlouhavé navazování TCP spojení',
      'Protože protokol TCP neumí přenášet písmena z doménových jmen',
      'Protože v síti internet je protokol TCP od roku 2020 zakázán',
      'Protože UDP servery jsou zdarma, zatímco za TCP se platí měsíční poplatek'
    ],
    answer: 'Protože dotaz i odpověď se typicky vejdou do jednoho paketu a UDP ušetří čas potřebný na zdlouhavé navazování TCP spojení',
    solution: 'Běžný DNS dotaz je krátký. Při použití UDP proběhne celá transakce během jednoho dotazu a jedné odpovědi (1 RTT), zatímco u TCP by se muselo nejdřív navazovat a pak ukončovat spojení.',
    tags: ['DNS', 'UDP', 'Optimalizace']
  }
];

console.log('Prepared part 4:', exercises.length);
fs.writeFileSync(path.join(__dirname, '..', 'vystupy', 'exercises_part4.json'), JSON.stringify(exercises, null, 2), 'utf8');
