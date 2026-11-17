// Počítačové sítě 2. ročník – Notion PSI. Podklad: materialy/pocitacove-site/zdroj/notion-psi-2-rocnik.md
window.NETWORK_2_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Principy', scenario: 'Praktické situace', multi: 'Principy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', number: 'Výpočty a hodnoty', text: 'Vysvětlení' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `psi2-${String(++seq).padStart(3, '0')}`, subject: 'Počítačové sítě', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['PSI', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const k = (title, question, categories, items, solution, d = 3) => add('classification', title, question, { categories, items: items.map(([text, category], i) => ({ id: `i${i + 1}`, text, category })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3, layout) => add('spot', title, question, { segments, wrong, corrections, ...(layout ? { layout } : {}) }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  topic = 'Ethernetový rámec';
  o('Pole rámce', 'Seřaď části přenosu ethernetového rámce Ethernet II tak, jak jdou po sobě na kabelu.', ['Preambule', 'SFD', 'Cílová MAC adresa', 'Zdrojová MAC adresa', 'EtherType', 'Data (payload)', 'FCS'], 'Preambule (7 B) → SFD (1 B) → cílová MAC (6 B) → zdrojová MAC (6 B) → EtherType (2 B) → data 46–1500 B → FCS (4 B).', 3);
  p('Velikosti polí', 'Přiřaď části ethernetového přenosu k jejich velikosti.', [
    ['Preambule', '7 B (56 bitů)'],
    ['SFD', '1 B (8 bitů)'],
    ['MAC adresa', '6 B (48 bitů)'],
    ['EtherType', '2 B (16 bitů)'],
    ['FCS', '4 B (32 bitů)'],
    ['Data + padding', '46–1500 B'],
  ], 'Dvě MAC adresy po 6 B, EtherType 2 B, data 46–1500 B, FCS 4 B. Preambule a SFD se posílají před MAC rámcem.', 3);
  c('Preambule', 'K čemu slouží preambule ethernetového přenosu?', ['K adresování cílového počítače', 'K synchronizaci příjemce', 'K určení protokolu v datech', 'Ke kontrole chyb rámce'], 1, 'Preambule je 56 střídajících se bitů pro synchronizaci; za ní následuje SFD 10101011, které označí začátek rámce.');
  c('FCS', 'Co je FCS na konci ethernetového rámce?', ['Adresa výchozí brány routeru', 'Číslo VLAN, do které rámec patří', 'Kontrolní hodnota CRC rámce', 'Délka datového pole v bajtech'], 2, 'Frame Check Sequence (4 B) slouží k odhalení poškozeného rámce.');
  s('Poškozený rámec', 'Switch přijme rámec, u kterého spočítaná hodnota CRC nesouhlasí s polem FCS.', 'Co se s rámcem typicky stane?', ['FCS chybu opraví a rámec pošle dál', 'Rámec se zahodí, opakování řeší vyšší protokol', 'Switch požádá odesílatele o nový rámec', 'Rámec se doručí, jen se zapíše varování'], 1, 'FCS chyby jen odhaluje. Poškozený rámec se zahodí a případné opakování zajistí např. TCP.');
  p('Hodnoty EtherType', 'Přiřaď hodnotu EtherType k protokolu.', [
    ['0x0800', 'IPv4'],
    ['0x0806', 'ARP'],
    ['0x86DD', 'IPv6'],
    ['0x8100', 'VLAN tag IEEE 802.1Q'],
    ['0x8863', 'PPPoE – fáze Discovery'],
  ], 'EtherType určuje protokol v datové části rámce Ethernet II (registr IANA).', 3);
  c('Délka nebo typ', 'Co znamená dvoubajtové pole Type/Length s hodnotou 0–1500?', ['Délku datového pole (IEEE 802.3)', 'Typ protokolu IPv4 v datech', 'Číslo VLAN podle 802.1Q', 'Kontrolní součet celého rámce'], 0, 'Hodnoty 0–1500 vyjadřují délku (IEEE 802.3), hodnoty od 1536 (0x0600) EtherType.');
  n('Maximální rámec', 'Jakou maximální délku v bajtech má běžný MAC rámec Ethernet II bez VLAN tagu (včetně FCS, bez preambule a SFD)?', 1518, '6 + 6 + 2 + 1500 + 4 = 1518 B. Minimum je 64 B.', 3);
  n('Padding', 'Ethernet II nese ARP zprávu o velikosti 28 B. Kolik bajtů výplně (padding) musí rámec doplnit, aby splnil minimum datového pole?', 18, 'Minimum datového pole je 46 B: 46 − 28 = 18 B paddingu.', 3);
  n('Mezera mezi rámci', 'Kolik bitových intervalů trvá inter-frame gap (IFG) mezi dvěma ethernetovými rámci?', 96, 'IFG = 96 bitových intervalů; je to časová mezera, ne pole rámce.', 3);
  c('VLAN tag', 'Kam se vkládá 4bajtový VLAN tag IEEE 802.1Q?', ['Na úplný začátek preambule', 'Za zdrojovou MAC, před Type/Length', 'Až za pole FCS na konec rámce', 'Do hlavičky IPv4 paketu'], 1, 'Tag (začíná hodnotou 0x8100) se vkládá za zdrojovou MAC; původní EtherType následuje za tagem.');
  c('Ping a EtherType', 'Jakou hodnotu EtherType bude mít rámec, který nese ping (ICMP) přes IPv4?', ['0x0806', '0x8100', '0x0800', 'EtherType pro ping'], 2, 'Ethernet označuje jen protokol v datech – IPv4 (0x0800). ICMP se pozná až z IP hlavičky (Protocol = 1).');
  c('PoE', 'Co umožňuje PoE (Power over Ethernet)?', ['Šifrovat data na kabelu', 'Přenášet data i napájení jedním kabelem', 'Zvýšit dosah kabelu na 1 km', 'Spojit dva switche bez kabelu'], 1, 'Napájení dodává kompatibilní switch nebo injektor; kabel RJ-45 má 8 vodičů ve 4 kroucených párech.');
  c('PPPoE', 'Co je PPPoE?', ['Protokol pro napájení po Ethernetu', 'PPP přenášené přes Ethernet (DSL)', 'Typ optického konektoru SFP', 'Šifrování bezdrátové sítě Wi-Fi'], 1, 'Point-to-Point Protocol over Ethernet; ne každá DSL přípojka ho ale používá.');
  x('Tvrzení o rámci', 'Najdi chybná tvrzení o ethernetovém rámci.', ['Preambule a SFD', 'se započítávají do délky MAC rámce.', 'FCS', 'poškozený rámec automaticky opraví.', 'EtherType 0x0806', 'označuje ARP.'], [1, 3], { 1: 'se do délky MAC rámce nepočítají.', 3: 'chybu jen odhalí, neopraví ji.' }, 'Preambule a SFD jdou před MAC rámcem. FCS slouží jen k detekci chyb.');

  topic = 'ARP';
  c('Účel ARP', 'K čemu slouží protokol ARP?', ['Přiděluje IP adresy klientům v síti', 'Zjišťuje MAC adresu k místní IPv4', 'Překládá doménová jména na IP adresy', 'Šifruje veškerý provoz v místní síti'], 1, 'Ethernet potřebuje pro doručení rámce MAC adresu. ARP ji zjistí podle IPv4.');
  s('Vzdálený server', 'Počítač 192.168.1.20/24 chce poslat paket na server 8.8.8.8 na internetu.', 'MAC adresu kterého zařízení zjistí pomocí ARP?', ['Serveru 8.8.8.8', 'Výchozí brány v místní síti', 'DNS serveru poskytovatele', 'Žádnou, mimo LAN se MAC nepoužívá'], 1, 'Mimo místní podsíť se rámec posílá dalšímu kroku – typicky výchozí bráně. MAC vzdáleného počítače se přes internet nezjišťuje.');
  c('ARP Request', 'Na jakou cílovou MAC adresu se posílá běžný ARP Request?', ['00:00:00:00:00:00', 'Na MAC výchozí brány', 'FF:FF:FF:FF:FF:FF', 'Na MAC DHCP serveru'], 2, 'Dotaz „Kdo má tuto IPv4?“ jde jako broadcast; odpověď (Reply) obvykle přímo tazateli.');
  p('ARP v praxi', 'Přiřaď položky k jejich významu.', [
    ['Operation = 1', 'ARP Request'],
    ['Operation = 2', 'ARP Reply'],
    ['arp -a', 'výpis ARP cache'],
    ['arp -d 10.11.51.101', 'smazání záznamu z cache (správce)'],
  ], 'Dotaz a odpověď se rozliší podle pole Operation, ne podle EtherType (ten je vždy 0x0806).');
  c('arp -a', 'Co přesně vypíše příkaz arp -a ve Windows?', ['Všechna zařízení připojená do sítě', 'Aktuální ARP cache (IPv4 → MAC)', 'Tabulku směrování počítače', 'MAC tabulku nejbližšího switche'], 1, 'Záznamy vznikají a zanikají podle komunikace; nejde o úplný seznam zařízení v síti.');
  c('Gratuitous ARP', 'Co je gratuitous ARP?', ['Povinná odpověď na každý ARP dotaz', 'Nevyžádané oznámení vazby IP–MAC', 'Útok, který vždy zahltí celou síť', 'Zpráva, kterou posílá DHCP server'], 1, 'Používá se např. při změně konfigurace nebo převzetí adresy. Sám o sobě není důkazem útoku.');
  s('Podvržená brána', 'Útočník v LAN rozesílá ARP odpovědi, že IPv4 adresa výchozí brány patří jeho MAC adrese. Provoz obětí pak prochází jeho počítačem a on ho předává dál.', 'O jaký útok jde?', ['ARP spoofing vedoucí k MITM', 'DHCP starvation (vyčerpání poolu)', 'Distribuovaný útok DDoS z internetu', 'Phishing pomocí falešného e-mailu'], 0, 'ARP spoofing / poisoning podvrhuje vazbu IP–MAC. Útočník uprostřed (MITM) provoz čte a přeposílá.');
  v('ARP cache a MAC tabulka', 'Rozhodni, zda tvrzení patří k ARP cache, nebo k MAC tabulce switche.', 'ARP cache stanice', 'MAC tabulka switche', [
    ['Váže IPv4 adresu na MAC adresu', 'left'],
    ['Váže MAC adresu na port v dané VLAN', 'right'],
    ['Vypíše se příkazem arp -a', 'left'],
    ['Vypíše se příkazem show mac address-table', 'right'],
  ], 'ARP cache hledá MAC podle IPv4, MAC tabulka hledá port podle MAC a VLAN.');
  c('TLS a ARP útok', 'Proti čemu ochrání správně použité TLS při ARP spoofingu?', ['Proti zahazování provozu útočníkem', 'Proti čtení a změně obsahu komunikace', 'Proti podvržení ARP záznamu', 'Proti fyzickému přístupu ke switchi'], 1, 'TLS chrání důvěrnost a integritu obsahu, ale nezabrání útočníkovi provoz zahodit (DoS).');
  m('Omezení rizika', 'Která opatření snižují riziko podvržení ARP v LAN?', ['Šifrovaná a ověřovaná komunikace (TLS)', 'Omezení fyzického přístupu k síti', 'Vypnutí nepoužívaných portů switche', 'Zkrácení platnosti cache, které útok zcela vyřeší', 'Port security na switchi'], [0, 1, 2, 4], 'Kratší platnost cache znamená jen víc provozu – útok neřeší. MAC lze podvrhnout, proto se opatření kombinují.');
  c('Obsah rámce ARP', 'Co nese datová část ethernetového rámce s EtherType 0x0806?', ['IPv4 paket s ARP uvnitř', 'Zprávu ARP', 'UDP datagram', 'Segment TCP'], 1, 'ARP se balí přímo do Ethernetu, nikoli do IPv4.');

  topic = 'Zapouzdření a ping ve Wiresharku';
  o('Zapouzdření DHCP', 'Seřaď zapouzdření od aplikační zprávy po rámec na kabelu.', ['Zpráva DHCP', 'UDP datagram', 'IPv4 paket', 'Ethernetový rámec'], 'Odesílatel data postupně zapouzdřuje, příjemce je dekapsuluje v opačném pořadí.');
  p('Vrstvy a adresy', 'Přiřaď vrstvu k jednotce a adresování.', [
    ['2. vrstva', 'rámec a MAC adresy'],
    ['3. vrstva', 'paket a IP adresy'],
    ['4. vrstva', 'segment/datagram a čísla portů'],
  ], 'MAC adresa, IP adresa a port označují různé části komunikace.');
  c('Dekapsulace', 'Co je dekapsulace?', ['Šifrování dat před odesláním', 'Postupné rozbalování vrstev u příjemce', 'Rozdělení zprávy na rámce switchem', 'Přidání VLAN tagu'], 1, 'Příjemce zpracovává vrstvy od rámce po aplikační zprávu.');
  c('Ping a porty', 'Který protokol používá příkaz ping a jaké má porty?', ['TCP, cílový port 7', 'UDP, cílový port 53', 'ICMP, porty nepoužívá', 'ARP, cílový port 0'], 2, 'Ping posílá ICMP Echo Request a čeká na Echo Reply. ICMP je přímo v IPv4 paketu a nemá porty.');
  p('Rozbor pingu', 'Přiřaď hodnotu k jejímu významu při rozboru pingu.', [
    ['ICMP Type 8', 'Echo Request'],
    ['ICMP Type 0', 'Echo Reply'],
    ['IPv4 Protocol = 1', 'ICMP v datech paketu'],
    ['EtherType 0x0800', 'IPv4 v datech rámce'],
  ], 'Požadavek a odpověď rozliší až typ ICMP, ne EtherType ani Protocol.', 3);
  c('Filtr ICMP a ARP', 'Jaký zobrazovací filtr ve Wiresharku ukáže současně ICMP i ARP rámce?', ['icmp and arp', 'icmp or arp', 'icmp + arp', 'arp > icmp'], 1, 'OR (||) zobrazí pakety s jedním nebo druhým protokolem. AND by vyžadovalo oba v tomtéž paketu.');
  c('Hex adresa', 'Jak vypadá IPv4 adresa 10.11.51.101 v hexadecimálním výpisu bajtů?', ['0A 0B 33 65', '10 11 51 101', 'A0 B0 33 56', '0A 0B 51 65'], 0, '10 = 0A, 11 = 0B, 51 = 33, 101 = 65.', 3);
  c('ping -l', 'Co změní příkaz ping -l 64 10.11.51.101?', ['Velikost celého rámce na 64 B', 'Velikost dat ICMP na 64 B', 'Počet odeslaných pingů na 64', 'Hodnotu TTL paketu na 64'], 1, 'Windows ping posílá výchozí 32 B dat; -l mění jen jejich délku, hlavičky se přidávají navíc.');
  s('Server neodpovídá', 'Na ping na webový server nepřichází odpověď, ale web se v prohlížeči normálně načte.', 'Co je nejpravděpodobnější vysvětlení?', ['Server je úplně vypnutý', 'Firewall blokuje ICMP Echo Request', 'Server nemá přidělenou IP adresu', 'Kabel k serveru je přerušený'], 1, 'Nedostupná odpověď na ping nedokazuje vypnutý server – pravidlo může ICMP blokovat.');
  s('První ping', 'Správce smaže příkazem arp -d záznam pro 10.11.51.101, spustí Wireshark s filtrem icmp or arp a pošle ping na tuto stanici ve stejné podsíti.', 'Co uvidí ve Wiresharku jako první?', ['ICMP Echo Reply od cíle', 'ARP Request a ARP Reply', 'DHCP Discover od klienta', 'TCP SYN na port 80'], 1, 'Bez záznamu v cache musí stanice nejdřív zjistit MAC cíle přes ARP, teprve potom pošle ICMP.');
  c('Zobrazovací filtr', 'Co dělá zobrazovací filtr ve Wiresharku?', ['Blokuje ostatní provoz v celé síti', 'Jen omezuje, co se zobrazí', 'Mění obsah zachycených dat', 'Zrychluje síťové připojení PC'], 1, 'Display filter nic neblokuje ani nemění – jen filtruje zobrazení.');
  c('Výchozí data pingu', 'Kolik bajtů testovacích dat posílá ve výchozím nastavení ping ve Windows?', ['8 B', '32 B', '64 B', '1500 B'], 1, 'Windows ping posílá 32 B dat (abcdefgh…). Znaky v datech nejsou označením protokolu.');

  topic = 'DHCP';
  c('Co DHCP předává', 'Které údaje typicky získá klient od DHCP serveru?', ['MAC adresu a název počítače', 'IPv4 adresu, masku, bránu a DNS', 'Pouze IPv6 adresu bez masky', 'Heslo k Wi-Fi a název sítě SSID'], 1, 'DHCP automaticky poskytuje síťovou konfiguraci v modelu klient–server.');
  o('DORA', 'Seřaď zprávy prvotního přidělení adresy DHCP.', ['Discover', 'Offer', 'Request', 'Acknowledgement'], 'DORA: klient hledá server → server nabídne → klient požádá → server potvrdí.');
  p('DHCP Discover', 'Přiřaď údaje prvotní zprávy DHCP Discover.', [
    ['Zdrojová IP', '0.0.0.0'],
    ['Cílová IP', '255.255.255.255'],
    ['Cílová MAC', 'FF:FF:FF:FF:FF:FF'],
    ['Zdrojový port UDP', '68'],
    ['Cílový port UDP', '67'],
  ], 'Klient zatím nemá IP, proto 0.0.0.0, a hledá server broadcastem. Server poslouchá na 67, klient na 68.', 3);
  c('Porty DHCP', 'Jaké porty používá DHCP pro IPv4?', ['TCP 67 a 68', 'UDP 53', 'UDP: server 67, klient 68', 'UDP: server 68, klient 67'], 2, 'DHCP běží nad UDP; serverový port 67, klientský 68.');
  p('ipconfig', 'Přiřaď parametr příkazu ipconfig k jeho funkci.', [
    ['/all', 'zobrazí úplnou konfiguraci včetně DHCP'],
    ['/release', 'uvolní adresu přidělenou DHCP'],
    ['/renew', 'požádá DHCP o obnovení konfigurace'],
  ], 'ipconfig bez parametru neukáže všechny údaje (např. DHCP povoleno).');
  c('Statické adresy', 'Jak správně naložit s pevnými adresami routeru, serveru a tiskárny v síti s DHCP?', ['Nechat je v dynamickém rozsahu, server je pozná', 'Umístit je mimo rozsah nebo je v DHCP vyloučit', 'Přidělovat je všem klientům', 'Nastavit je stejné jako adresa sítě'], 1, 'Server nemusí statické zařízení odhalit (může být vypnuté) a později vznikne konflikt IP adres.');
  n('Konec rozsahu', 'DHCP pool začíná adresou 192.168.10.101 a obsahuje 100 adres. Jaký je poslední oktet poslední adresy v rozsahu?', 200, '101 + 100 − 1 = 200 → rozsah 192.168.10.101–192.168.10.200.', 3);
  n('Adresy v /24', 'Kolik adres lze v síti 192.168.10.0/24 přidělit stanicím?', 254, '256 adres − adresa sítě (.0) − broadcast (.255) = 254.');
  s('Konflikt tiskárny', 'Tiskárna má ručně nastavenou adresu 192.168.10.150. DHCP pool je 192.168.10.101–192.168.10.200 a adresu .150 nevylučuje. Tiskárna byla týden vypnutá.', 'Co může nastat po jejím zapnutí?', ['Nic, DHCP tiskárně adresu změní', 'Konflikt IP adres, pokud .150 mezitím dostal klient', 'Tiskárna dostane IPv6 místo IPv4', 'Switch tiskárnu automaticky odpojí'], 1, 'Dvě zařízení se stejnou IP v jedné podsíti narušují komunikaci. Statické adresy vyčleň z poolu.');
  c('Pronájem', 'Na jak dlouho klient dostává adresu při dynamickém přidělení DHCP?', ['Navždy', 'Na dobu pronájmu (lease)', 'Jen do prvního restartu routeru', 'Na jeden den vždy'], 1, 'Adresa je zapůjčená na dobu pronájmu; obnovení může začít přímo zprávou DHCPREQUEST.');
  c('Služba DHCP Client', 'Ve Windows běží služba DHCP Client. Co z toho plyne?', ['Adaptér určitě používá DHCP adresu', 'Sama o sobě nic nedokazuje', 'Počítač funguje jako DHCP server', 'DHCP je v celé síti vypnuté'], 1, 'Konfiguraci adaptéru ověř v ipconfig /all (DHCP povoleno). Službu kvůli statické adrese nevypínej – má i další funkce.');
  m('Kontrola při selhání', 'Co zkontroluješ, když klienti nedostávají adresu z DHCP?', ['Zapnutí serveru a služby DHCP', 'Kabely a stav portů', 'Pool a dostatek volných adres', 'Barvu ethernetových kabelů', 'Shodu masky a podsítě', 'Rozlišení monitoru klienta'], [0, 1, 2, 4], 'Kontroluj i překryv rozsahu se statickými adresami a nastavení DHCP na klientovi.');
  c('Packet Tracer – server', 'Kde se v Packet Traceru zapíná DHCP služba na serveru?', ['Desktop → Command Prompt', 'Services → DHCP', 'Config → Settings → Gateway', 'Physical → Modules'], 1, 'V Services → DHCP nastavíš Pool Name, Default Gateway, DNS Server, Start IP Address, Subnet Mask a Maximum Number of Users.');
  c('Packet Tracer – klient', 'Jak v Packet Traceru nastavíš počítač, aby získal adresu z DHCP?', ['Services → DHCP → On', 'Desktop → IP Configuration → DHCP', 'Config → FastEthernet → Static', 'Desktop → Web Browser'], 1, 'Na klientovi zvol DHCP v IP Configuration a ověř přidělenou adresu, masku, bránu a DNS.');
  z('Adresní plán', 'Doplň údaje adresního plánu sítě 192.168.10.0/24.', 'Prefix /24 odpovídá masce {{a}}. Adresu {{b}} nelze přidělit stanici, protože je to adresa sítě, a {{c}} je broadcast.', [
    { id: 'a', options: ['255.255.255.0', '255.255.0.0', '255.0.0.0'], answer: '255.255.255.0' },
    { id: 'b', options: ['192.168.10.0', '192.168.10.1', '192.168.10.10'], answer: '192.168.10.0' },
    { id: 'c', options: ['192.168.10.255', '192.168.10.254', '255.255.255.255'], answer: '192.168.10.255' },
  ], '/24 = 24 bitů síťové části = 255.255.255.0; první adresa je adresa sítě, poslední broadcast.');

  topic = 'Domácí síť a vzdálená pomoc';
  c('DSL', 'Jak přenáší data přípojka DSL?', ['Po optickém vlákně', 'Po metalickém telefonním vedení', 'Bezdrátově přes satelit', 'Po koaxiálním kabelu televize'], 1, 'DSL využívá telefonní vedení; hlas a data se při souběhu oddělují filtrem nebo splitterem.');
  c('MAC filtering', 'Proč samotný MAC filtering na Wi-Fi není spolehlivé zabezpečení?', ['Funguje jen pro kabelová zařízení', 'Povolenou MAC adresu lze podvrhnout', 'Zpomaluje síť na polovinu', 'Blokuje všechna zařízení Apple'], 1, 'MAC spoofing napodobí povolenou adresu. MAC filtr nenahrazuje šifrování a ověřování Wi-Fi.');
  c('Síť pro hosty', 'K čemu slouží guest network na domácím routeru?', ['Ke zrychlení hlavní domácí sítě', 'K internetu odděleně od hlavní sítě', 'K připojení tiskárny přes USB', 'K vypnutí šifrování pro návštěvy'], 1, 'Návštěva dostane vlastní heslo a internet bez přístupu k domácím zařízením.');
  c('Jiný název Wi-Fi', 'Zaručí samotný jiný název (SSID) sítě pro hosty oddělení od domácích zařízení?', ['Ano, vždy a na každém routeru', 'Ne, zákaz přístupu do LAN je nutné ověřit', 'Ano, pokud má síť pro hosty heslo', 'Ne, sítě pro hosty nikdy oddělené nejsou'], 1, 'Chování závisí na routeru; některé mají volbu „Allow guests to access my local network“, kterou je třeba vypnout.');
  s('Návštěva', 'Přijdou kamarádi a chtějí se připojit k Wi-Fi. Doma máš NAS se zálohami a chytrou televizi.', 'Co je nejvhodnější?', ['Dát jim heslo k hlavní Wi-Fi síti', 'Zapnout síť pro hosty bez přístupu do LAN', 'Vypnout šifrování, ať se připojí snadno', 'Přidat jejich MAC adresy do filtru'], 1, 'Síť pro hosty lze zapnout jen na dobu návštěvy a heslo potom změnit; heslo hlavní sítě nesdílej.');
  c('Počet klientů', 'V administraci routeru vidíš 12 připojených klientů. Co z toho plyne?', ['Síť je určitě napadená', 'Síť je určitě bezpečná', 'Nic – neznámá zařízení ale prověř', 'Router je přetížený a musí se vyměnit'], 2, 'Sleduj seznam klientů a záznamy událostí; neznámé zařízení prověř a zkontroluj pravidla.');
  v('Sdílení a ovládání', 'Rozhodni, zda tvrzení patří ke sdílení obrazovky, nebo k převzetí ovládání ve vzdálené pomoci.', 'Sdílení obrazovky', 'Převzetí ovládání', [
    ['Pomocník jen vidí obrazovku', 'left'],
    ['Pomocník může používat myš a klávesnici', 'right'],
    ['Stačí, když pomocník jen radí slovy', 'left'],
    ['Uživatel musí žádost potvrdit zvlášť, i když už sdílí obrazovku', 'right'],
  ], 'Sdílení obrazovky a ovládání jsou rozdílná oprávnění.');
  o('Postup vzdálené pomoci', 'Seřaď kroky vzdálené pomoci ve Windows podle logické návaznosti.', ['Obě strany otevřou aplikaci pro vzdálenou pomoc', 'Pomocník zvolí poskytnutí pomoci a získá dočasný kód', 'Uživatel zadá kód a schválí sdílení obrazovky', 'Pomocník požádá o ovládání a uživatel ho potvrdí', 'Po vyřešení se spojení ukončí'], 'Přístup uděluj jen známému a důvěryhodnému člověku.');
  c('Kód', 'Co platí o kódu pro vzdálenou pomoc (např. Quick Assist)?', ['Je to trvalé heslo uživatele', 'Je dočasný a platí jen pro dané spojení', 'Je stejný pro všechny počítače', 'Uděluje automaticky ovládání počítače'], 1, 'Kód naváže spojení; ovládání musí uživatel ještě zvlášť povolit.');
  s('Telefonát z „podpory“', 'Neznámý člověk volá, že je z technické podpory Microsoftu, a chce, abys mu ve vzdálené pomoci zadal kód a povolil ovládání.', 'Jak se zachováš?', ['Kód zadám, podpora je důvěryhodná', 'Nic nezadám, nevím, kdo volá', 'Zadám kód, ale ovládání nepovolím', 'Pošlu mu raději rovnou své heslo'], 1, 'Vzdálený přístup uděluj pouze známému a důvěryhodnému člověku – i sdílení obrazovky může prozradit citlivé údaje.');
  c('RDP a bezpečnost', 'Co platí o tvrzení „vše, co používá RDP, je nebezpečné“?', ['Je pravdivé vždy a všude', 'Zjednodušení – záleží na zabezpečení', 'Je pravdivé jen ve Windows 11', 'RDP se dnes už nikde nepoužívá'], 1, 'Např. Quick Assist používá RDP přes vzdálenou službu a komunikaci chrání TLS.');

  topic = 'Síťové adaptéry ve Windows';
  c('Get-NetAdapter', 'Co vrací cmdlet Get-NetAdapter v PowerShellu?', ['Textový soubor s nastavením', 'Objekty síťových adaptérů', 'Seznam Wi-Fi sítí v okolí', 'Tabulku směrování'], 1, 'Výchozí zobrazení je tabulka; s objekty lze dál pracovat v rouře.');
  c('Format-List', 'Co udělá Get-NetAdapter | Format-List?', ['Uloží adaptéry do souboru', 'Zobrazí vlastnosti adaptérů pod sebou', 'Vypne všechny adaptéry', 'Seřadí adaptéry podle rychlosti'], 1, 'Format-List mění jen uspořádání výpisu, nepřidává chybějící údaje.');
  c('Get-Member', 'Co zjistíš příkazem Get-NetAdapter | Get-Member?', ['Vlastnosti a metody objektů adaptérů', 'Kteří uživatelé jsou právě přihlášení', 'Jakou rychlost má připojení k internetu', 'Které porty jsou na počítači otevřené'], 0, 'Get-Member vypíše členy objektu. Samotný výpis metody nespouští.');
  v('Vlastnost a metoda', 'Rozhodni, zda tvrzení patří k vlastnosti (property), nebo k metodě (method) objektu.', 'Vlastnost', 'Metoda', [
    ['Nese údaj o objektu', 'left'],
    ['Představuje operaci, kterou objekt umí provést', 'right'],
    ['Příklad: MacAddress', 'left'],
    ['Výpis Get-Member ji zobrazí, ale nespustí', 'right'],
  ], 'Property = údaj (Name, Status, MacAddress, LinkSpeed); method = operace.');
  c('LinkSpeed', 'Co znamená hodnota LinkSpeed = 1 Gbps u adaptéru?', ['Naměřenou rychlost připojení k internetu', 'Rychlost linky k připojenému zařízení', 'Rychlost zápisu na systémový disk', 'Maximální rychlost Wi-Fi sítí v okolí'], 1, 'LinkSpeed je rychlost linky, ne rychlost připojení k internetu.');
  c('Loopback', 'Co je adresa 127.0.0.1?', ['Adresa výchozí brány v síti', 'Loopback – zpětná smyčka počítače', 'Veřejná adresa domácího routeru', 'Adresa DHCP serveru poskytovatele'], 1, '127.0.0.1 (localhost) se hodí např. k testování aplikací.');
  p('Prefix a maska', 'Přiřaď délku prefixu k masce.', [
    ['/8', '255.0.0.0'],
    ['/16', '255.255.0.0'],
    ['/24', '255.255.255.0'],
  ], 'PrefixLength je počet bitů síťové části adresy.');
  p('Příkazy pro adaptéry', 'Přiřaď příkaz k tomu, co zobrazí.', [
    ['getmac /v', 'MAC adresy s podrobnostmi o připojení'],
    ['netsh interface show interface', 'povolení a stav připojení rozhraní'],
    ['Get-NetIPConfiguration', 'IP adresy, výchozí bránu a DNS rozhraní'],
    ['Get-NetIPAddress -AddressFamily IPv4', 'jen přiřazené IPv4 adresy'],
    ['ipconfig /all', 'podrobný textový výpis včetně DHCP'],
  ], 'Výpisy popisují různé stránky adaptéru; konfiguraci nemění.', 3);
  c('Metrika', 'Co vyjadřuje metrika rozhraní nebo trasy ve Windows?', ['Rychlost rozhraní v Mb/s', 'Preferenci – nižší je výhodnější', 'Počet připojených zařízení', 'Velikost MTU v bajtech'], 1, 'Mezi stejně specifickými trasami vyhrává nižší celková metrika (trasa + rozhraní).');
  s('Kabel a Wi-Fi', 'Notebook je připojen kabelem (metrika rozhraní 100) i přes Wi-Fi (metrika 1). Ostatní podmínky tras jsou stejné.', 'Které připojení Windows upřednostní?', ['Ethernet, protože kabel je vždy první', 'Wi-Fi, protože má nižší metriku', 'Obě rovnoměrně', 'Žádné, vznikne konflikt'], 1, 'Nižší metrika = vyšší priorita. Rozhoduje ale nejdřív nejdelší shoda prefixu cíle.');
  c('Výběr trasy', 'Podle čeho Windows při výběru trasy rozhodují nejdřív?', ['Podle nejnižší metriky', 'Podle nejdelší shody cílového prefixu', 'Podle abecedního názvu rozhraní', 'Podle rychlosti linky'], 1, 'Nejprve nejspecifičtější trasa (longest prefix match), mezi stejně specifickými pak metrika.');
  c('MTU', 'Co znamená NlMtu = 1500 B u ethernetového rozhraní?', ['Celková délka ethernetového rámce', 'Max. velikost IP paketu s hlavičkou', 'Rychlost linky v Mb/s', 'Velikost pole FCS v bajtech'], 1, 'Celý rámec je větší – navíc má linkovou hlavičku a FCS.');
  c('Původ adresy', 'Get-NetIPAddress ukazuje u adresy PrefixOrigin = Dhcp. Co to znamená?', ['Adresu nastavil ručně správce', 'Adresa pochází z DHCP', 'Adresa je loopback', 'Adresa je IPv6'], 1, 'Manual = ruční nastavení, Dhcp = přidělení serverem DHCP.');
  c('Stav Up', 'Adaptér má Status = Up. Co to zaručuje?', ['Funkční připojení k internetu', 'Aktivní linku, ne správnou IP', 'Správnou IP adresu i DNS server', 'Že v síti běží DHCP server'], 1, 'Stav adaptéru a IP konfiguraci rozlišuj – připojená karta sama nezaručuje správnou adresu ani internet.');

  topic = 'Porty a sockety';
  c('Port', 'Co je port u TCP a UDP?', ['Fyzický konektor na síťové kartě', 'Číslo 0–65535 určující službu', 'Adresa síťového rozhraní', 'Typ ethernetového kabelu'], 1, 'Port je logický identifikátor transportní vrstvy. TCP a UDP mají oddělené prostory portů.');
  p('Rozsahy portů', 'Přiřaď rozsah portů k jeho označení.', [
    ['0–1023', 'system / well-known ports'],
    ['1024–49151', 'user / registered ports'],
    ['49152–65535', 'dynamic / private ports'],
  ], 'Rozsahy podle IANA; skutečný rozsah efemerálních portů závisí na systému.');
  p('Služby a porty', 'Přiřaď službu k portu a protokolu.', [
    ['HTTP', '80/TCP'],
    ['HTTPS', '443/TCP'],
    ['SSH', '22/TCP'],
    ['FTP (řízení)', '21/TCP'],
    ['SMTP', '25/TCP'],
    ['SMB', '445/TCP'],
    ['IMAPS', '993/TCP'],
  ], 'Známé číslo portu napovídá službu, ale nezaručuje skutečný obsah provozu.', 3);
  c('Socket', 'Čím je popsán socket pro IP komunikaci?', ['MAC adresou a číslem VLAN', 'IP adresou, portem a protokolem', 'Jen názvem běžící aplikace', 'Maskou podsítě a výchozí bránou'], 1, 'Socket je koncový bod komunikace aplikace.');
  c('Efemerální port', 'Co je efemerální port?', ['Pevný port serveru pro HTTPS', 'Dočasný port přidělený klientovi', 'Port pro konzolovou správu switche', 'Port trvale zakázaný ve firewallu'], 1, 'Klient: dočasný port → server:443; odpověď se vrací na stejný dočasný port.');
  c('Identifikace spojení', 'Co jednoznačně rozlišuje TCP spojení?', ['Pouze cílová IP adresa serveru', 'Zdrojová a cílová IP a oba porty', 'Jen MAC adresa klienta', 'Číslo procesu PID na serveru'], 1, 'S protokolem jde o pětici (5-tuple). Jedna IP s jedním portem je jen jeden konec spojení.');
  s('Web na 8080', 'Webový server běží v síti školy na adrese 10.0.0.5 s HTTP na portu 8080.', 'Jakou adresu zadáš do prohlížeče?', ['http://10.0.0.5/', 'http://10.0.0.5:8080/', 'https://10.0.0.5/', 'http://8080.10.0.0.5/'], 1, 'Nestandardní port je nutné uvést za dvojtečkou.');
  c('HTTP na 443', 'Správce přesune HTTP na port 443. Je teď web šifrovaný?', ['Ano, port 443 šifruje automaticky', 'Ne, HTTPS potřebuje TLS a certifikát', 'Ano, ale jen v prohlížeči Chrome', 'Ne, port 443 slouží jen pro e-mail'], 1, 'Číslo portu šifrování nezapne. Změna portu také není spolehlivé zabezpečení – službu lze dohledat.');
  c('Firewall a služba', 'Jaký je rozdíl mezi zablokováním portu ve firewallu a vypnutím služby?', ['Žádný, je to totéž', 'Služba při blokaci dál běží', 'Vypnutí služby zablokuje internet', 'Firewall službu rovnou odinstaluje'], 1, 'Dostupný port předpokládá naslouchající službu i povolenou cestu. Povolení ve firewallu službu nespustí.');
  p('SQL Server', 'Přiřaď port k jeho použití u Microsoft SQL Serveru.', [
    ['1433/TCP', 'výchozí instance databázového serveru'],
    ['1434/UDP', 'SQL Server Browser – zjištění portu instance'],
  ], 'Nejde o zaměnitelné porty pro tutéž službu; port instance lze v konfiguraci změnit.');
  k('Typy socketů', 'Zařaď popis k typu socketu.', ['Stream (TCP)', 'Datagram (UDP)', 'Raw'], [
    ['Spolehlivý proud dat se zajištěným pořadím', 'Stream (TCP)'],
    ['Samostatné zprávy bez záruky doručení', 'Datagram (UDP)'],
    ['Přístup k IP/ICMP paketům na nižší úrovni', 'Raw'],
    ['Web a e-mail', 'Stream (TCP)'],
    ['Spolehlivost musí řešit aplikace', 'Datagram (UDP)'],
  ], 'Raw socket není běžný TCP/UDP socket s portem služby.');
  p('Přepínače netstat', 'Přiřaď přepínač příkazu netstat -ano k jeho významu.', [
    ['-a', 'aktivní spojení i naslouchající porty'],
    ['-n', 'adresy a porty číselně'],
    ['-o', 'PID procesu'],
  ], 'PID dohledáš ve Správci úloh → Podrobnosti.');
  p('Stavy TCP', 'Přiřaď stav TCP k jeho významu.', [
    ['LISTENING', 'čeká na nové spojení'],
    ['ESTABLISHED', 'navázané spojení'],
    ['SYN_SENT', 'odeslán požadavek SYN'],
    ['TIME_WAIT', 'po ukončení odděluje staré segmenty'],
  ], 'Samotná existence TIME_WAIT je normální.', 3);
  n('Počet dynamických portů', 'Windows používají pro dynamické TCP porty rozsah 49152–65535. Kolik portů to je?', 16384, '65535 − 49152 + 1 = 16 384. Ověření: netsh int ipv4 show dynamicport tcp.', 3);
  c('ss -tulnp', 'Co vypíše v Linuxu příkaz ss -tulnp?', ['Všechna aktivní klientská spojení', 'Naslouchající TCP/UDP sockety a procesy', 'Tabulku směrování jádra', 'Seznam síťových adaptérů a jejich MAC'], 1, '-t TCP, -u UDP, -l naslouchající, -n číselně, -p procesy.');
  c('Neplatná adresa', 'Která IPv4 adresa je neplatná?', ['192.168.1.254', '10.0.0.1', '172.16.275.3', '8.8.4.4'], 2, 'Každý oktet je v rozsahu 0–255; 275 je mimo rozsah.');
  s('Podezřelé spojení', 'netstat -ano ukazuje ESTABLISHED spojení na neznámou IP adresu s PID 4820.', 'Jak zjistíš, která aplikace spojení používá?', ['Restartuji domácí router', 'Najdu PID 4820 ve Správci úloh', 'Smažu celou ARP cache', 'Spustím ipconfig /release'], 1, 'PID propojí spojení s procesem. Samotná cizí adresa ještě nedokazuje napadení.');
  x('Tabulka portů', 'Najdi chybné řádky v tabulce služeb.', ['HTTPS – 443/TCP', 'SSH – 23/TCP', 'DHCP server – 67/UDP', 'SMTP – 25/TCP', 'DHCP klient – 69/UDP'], [1, 4], { 1: 'SSH – 22/TCP', 4: 'DHCP klient – 68/UDP' }, 'SSH = 22/TCP (23 je Telnet), DHCP klient = 68/UDP.', 3, 'lines');

  topic = 'Switche, VLAN a MAC tabulka';
  c('Vrstva switche', 'Podle čeho běžný switch přepíná ethernetové rámce?', ['Podle IP adres na 3. vrstvě', 'Podle MAC adres na 2. vrstvě', 'Podle čísel portů TCP', 'Podle názvů počítačů'], 1, 'Switch udržuje MAC tabulku – vazby MAC adres na porty.');
  c('Učení MAC', 'Odkud se switch učí dynamické záznamy MAC tabulky?', ['Ze zdrojové MAC přijatého rámce', 'Z cílové MAC adresy rámce', 'Z odpovědí DHCP serveru', 'Ze speciální učicí zprávy'], 0, 'Zdrojová MAC říká, za kterým portem je odesílatel. Cílovou MAC switch hledá v tabulce.');
  c('Neznámý unicast', 'Co udělá switch s rámcem, jehož cílovou MAC nemá v tabulce?', ['Zahodí ho bez dalšího zpracování', 'Floodne ho do portů své VLAN', 'Vrátí ho zpět odesílateli', 'Pošle ho do všech VLAN na switchi'], 1, 'Flooding probíhá jen v rámci příslušné VLAN.');
  o('Zpracování rámce', 'Seřaď kroky, které switch provede s přijatým rámcem.', ['Přijme rámec na portu', 'Uloží zdrojovou MAC a port do tabulky', 'Vyhledá cílovou MAC v tabulce dané VLAN', 'Odešle rámec na port, nebo ho floodne'], 'Učení ze zdrojové MAC, rozhodování podle cílové MAC.');
  n('Délka kabelu', 'Do jaké délky kanálu (v metrech) se počítá u běžného metalického Ethernetu po kroucené dvojlince?', 100, 'Kanál do 100 m včetně připojovacích kabelů – počítej skutečnou trasu, ne vzdušnou vzdálenost.');
  s('Dlouhá trasa', 'Mezi dvěma učebnami je vzdušně 60 m, ale kabel vedený podél stěn a chodbou by měřil asi 130 m.', 'Co platí pro kabeláž mezi učebnami?', ['Stačí metalika, rozhoduje vzdušná vzdálenost', 'Trasa má přes 100 m, metalika nestačí', 'Stačí použít kratší patch kabely', 'Stačí na switchi zapnout PoE'], 1, 'Rozhoduje délka vedení po celé trase. Pro delší spoje se navrhuje např. optika nebo další switch.');
  c('Dva významy portu', 'Jaký je rozdíl mezi portem switche a portem TCP/UDP?', ['Žádný, oba jsou totéž', 'Fyzické rozhraní × číslo aplikace', 'Port switche je číslo 0–65535', 'TCP port je konektor RJ-45'], 1, 'Slovo port má v sítích dva různé významy.');
  c('Port security', 'Co dělá port security na řízeném switchi?', ['Šifruje veškerý provoz na portu', 'Omezuje povolené MAC adresy', 'Zvyšuje přenosovou rychlost portu', 'Přiděluje stanicím IP adresy'], 1, 'MAC lze podvrhnout, proto se port security doplňuje fyzickou ochranou.');
  p('Režimy porušení', 'Přiřaď režim violation u port security k chování.', [
    ['shutdown', 'zablokuje port do stavu err-disabled'],
    ['protect', 'zahazuje nepovolený provoz bez hlášení'],
    ['restrict', 'zahazuje provoz, hlásí a zvyšuje čítač'],
  ], 'Znovuzapnutí portu: no shutdown v konfiguraci rozhraní.', 3);
  c('Sticky', 'Co dělá switchport port-security mac-address sticky?', ['Trvale zablokuje port', 'Uloží naučené MAC do running-config', 'Smaže celou MAC tabulku', 'Přepne port do režimu trunk'], 1, 'Při učení musí být připojená oprávněná stanice a konfiguraci je nutné uložit do startup-config.');
  c('Uložení konfigurace', 'Proč se po změně nastavení switche spouští copy running-config startup-config?', ['Aby se změny projevily okamžitě', 'Aby změny přetrvaly restart zařízení', 'Aby se vymazala MAC tabulka', 'Aby se switch restartoval'], 1, 'Running config platí hned, startup config se načte po restartu. Platí i pro sticky MAC.');
  c('VLAN', 'Co je VLAN?', ['Bezdrátová síť bez kabelů', 'Logická síť na fyzickém switchi', 'Typ kroucené dvojlinky', 'Virtuální počítač na serveru'], 1, 'Např. učebna 1 ve VLAN 10, učebna 2 ve VLAN 20 – na stejném switchi.');
  c('Mezi VLAN', 'Co zajistí komunikaci mezi VLAN 10 a VLAN 20?', ['Běžný switch na 2. vrstvě', 'Router nebo L3 switch', 'Pasivní patch panel', 'Trunk sám o sobě'], 1, 'Trunk jen přenáší oddělený provoz více VLAN; směrování mezi nimi dělá 3. vrstva.');
  v('Access a trunk', 'Rozhodni, zda tvrzení patří k access, nebo trunk portu.', 'Access port', 'Trunk port', [
    ['Připojuje koncovou stanici do jedné VLAN', 'left'],
    ['Přenáší provoz více VLAN jedním spojem', 'right'],
    ['Stanice posílá netagované rámce', 'left'],
    ['Rámce se rozlišují tagem IEEE 802.1Q', 'right'],
  ], 'Access = jedna VLAN pro počítač či tiskárnu; trunk typicky mezi switchi nebo ke routeru.');
  c('Uplink a trunk', 'Jsou uplink a trunk synonyma?', ['Ano, vždy jde o totéž', 'Ne, uplink je role, trunk více VLAN', 'Ano, ale jen u optických spojů', 'Ne, trunk je vždy bezdrátový'], 1, 'Jeden spoj může být obojí. Uplink mívá vyšší kapacitu, protože sdružuje provoz.');
  c('Patch panel', 'Jakou funkci má patch panel?', ['Přepíná rámce podle MAC', 'Ukončuje pevnou kabeláž ze zásuvek', 'Přiděluje IP adresy', 'Napájí zařízení přes PoE'], 1, 'Patch panel je pasivní; se switchem ho propojují krátké patch kabely.');
  c('Konzolový port', 'K čemu slouží console port switche?', ['K připojení počítačů do LAN', 'K místní správě a nastavení', 'K napájení celého switche', 'K propojení dvou různých VLAN'], 1, 'I když má konektor RJ-45, nejde o ethernetové připojení; potřebuješ konzolový kabel.');
  c('Aging time', 'Jaká je u řady Cisco Catalyst výchozí doba stárnutí dynamických záznamů MAC tabulky?', ['30 sekund', '300 sekund', '1 hodina', 'Záznamy nestárnou'], 1, '300 s není univerzální hodnota pro všechny switche; nový provoz záznam obnovuje.');
  c('Statický záznam', 'Co platí pro statický záznam v MAC tabulce?', ['Zadává ho správce a automaticky nestárne', 'Učí se z provozu', 'Smaže ho příkaz clear mac address-table dynamic', 'Nahrazuje port security'], 0, 'Při změně MAC, portu nebo VLAN ho musí správce upravit a změnu dokumentovat.');
  c('MAC flooding', 'Co je útok MAC flooding?', ['Zahlcení switche velkým pingem', 'Zaplnění MAC tabulky falešnými MAC', 'Podvržení ARP vazby výchozí brány', 'Vzdálené vypnutí portu switche'], 1, 'Switch pak floodne neznámý unicast. Ochranou je omezení počtu MAC na portu (port security).');
  z('Access VLAN v IOS', 'Doplň příkazy Cisco IOS pro zařazení portu do VLAN 10 a uložení.', 'interface FastEthernet0/1 → switchport mode {{a}} → switchport access {{b}} 10 → end → copy running-config {{c}}', [
    { id: 'a', options: ['access', 'trunk', 'console'], answer: 'access' },
    { id: 'b', options: ['vlan', 'port', 'mac'], answer: 'vlan' },
    { id: 'c', options: ['startup-config', 'running-config', 'flash-config'], answer: 'startup-config' },
  ], 'switchport mode access, switchport access vlan 10, uložení copy running-config startup-config.', 3);
  c('Vymazání tabulky', 'Co udělá příkaz clear mac address-table dynamic?', ['Smaže statické i dynamické záznamy', 'Smaže jen dynamické záznamy', 'Restartuje celý switch', 'Vypne všechny porty switche'], 1, 'Statická mapování zůstanou.');

  return list;
})();
