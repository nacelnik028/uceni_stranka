// Otázky z OrgPadu KYBEZ 2. ročník. Podklad a rozsah: materialy/kyberneticka-bezpecnost/zdroj/README.md.
// Pomocné funkce pouze sjednocují metadata; výsledkem je běžné pole objektů úloh.
window.CYBERSECURITY_EXERCISES = (() => {
  const exercises = [];
  let topic = '';
  let sequence = 0;
  const add = (type, title, question, fields, solution, difficulty = 2) => {
    exercises.push({
      id: `kybez-${String(++sequence).padStart(3, '0')}`,
      subject: 'Kybernetická bezpečnost', topic,
      subtopic: type === 'scenario' ? 'Praktické situace' : type === 'text' ? 'Vysvětlení' : type === 'choice' ? 'Pojmy a příkazy' : 'Souvislosti',
      type, title, question, ...fields, solution, difficulty,
      tags: ['KYBEZ 2. ročník'],
    });
  };
  const choice = (title, question, choices, answer, solution, difficulty = 2) =>
    add('choice', title, question, { choices, answer }, solution, difficulty);
  const scenario = (title, prompt, choices, answer, solution, difficulty = 3) => {
    const boundary = prompt.lastIndexOf('. ');
    const context = prompt.slice(0, boundary + 1);
    const question = prompt.slice(boundary + 2);
    add('scenario', title, question, { scenario: context, choices, answer }, solution, difficulty);
  };
  const multi = (title, question, choices, answers, solution) =>
    add('multi', title, question, { choices, answers }, solution, 3);
  const match = (title, question, pairs, solution) =>
    add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, 3);
  const text = (title, question, answer) =>
    add('text', title, question, { answer, autoGrade: false }, answer, 3);

  topic = 'Identity a řízení přístupu';
  choice('Digitální identita', 'Co označuje digitální identita uživatele?',
    ['Soubor atributů, kterými je uživatel rozpoznáván v systému', 'Síťový profil, který používá každý připojený počítač', 'Seznam programů, které jsou nainstalované na disku', 'Záložní kopii všech souborů jednoho uživatele'],
    'Soubor atributů, kterými je uživatel rozpoznáván v systému', 'Identita umožňuje rozpoznat subjekt; jeho přístup se dále řídí ověřením a oprávněními.');
  choice('Ověření a přístup', 'Která dvojice správně rozlišuje autentizaci a autorizaci?',
    ['Autentizace určuje práva, autorizace ověřuje identitu', 'Autentizace ověřuje identitu, autorizace určuje práva', 'Obě znamenají pouze zašifrování přenášených dat', 'Obě znamenají pouze vytvoření záložní kopie'],
    'Autentizace ověřuje identitu, autorizace určuje práva', 'Autentizace odpovídá na otázku kdo jsi; autorizace na otázku co smíš dělat.');
  scenario('Přístup k dokumentům', 'Účetní potřebuje číst a upravovat faktury, ale nespravuje servery. Které nastavení odpovídá principu minimálních oprávnění?',
    ['Přidělit mu správu všech serverů pro případ potřeby', 'Přidělit mu stejná práva jako správci oddělení IT', 'Přidělit mu potřebná práva jen k účetním dokumentům', 'Zablokovat mu veškerý přístup k účetním dokumentům'],
    'Přidělit mu potřebná práva jen k účetním dokumentům', 'PoLP přiděluje práva potřebná pro úkol, bez zbytečných oprávnění i bez blokování potřebné práce.');
  choice('Model rolí', 'Jak se v modelu RBAC typicky přidělují přístupová oprávnění?',
    ['Každému zařízení podle jeho síťové adresy', 'Uživatelům prostřednictvím jejich pracovních rolí', 'Všem přihlášeným uživatelům vždy stejně', 'Pouze podle délky přihlašovacího hesla'],
    'Uživatelům prostřednictvím jejich pracovních rolí', 'Role sdružuje oprávnění a uživatel je získává přiřazením k roli.');
  scenario('Změna pracovní pozice', 'Zaměstnanec přechází z financí do podpory. Co je vhodné udělat s jeho přístupy?',
    ['Ponechat všechny staré přístupy a přidat nové', 'Sdílet s ním účet předchozího pracovníka podpory', 'Zrušit auditování jeho přístupů během přechodu', 'Odebrat nepotřebné role a přidělit nové potřebné role'],
    'Odebrat nepotřebné role a přidělit nové potřebné role', 'Práva se mají měnit s pracovními úkoly, aby se dlouhodobě nehromadila.');
  choice('Vnitřní síť', 'Jak model Zero Trust přistupuje k zařízení uvnitř firemní sítě?',
    ['Jeho důvěryhodnost musí ověřovat stejně jako u dalších přístupů', 'Automaticky mu povolí přístup ke všem firemním aplikacím', 'Považuje jeho síťovou adresu za náhradu ověření identity', 'Umožní mu přístup bez kontroly, pokud je připojeno kabelem'],
    'Jeho důvěryhodnost musí ověřovat stejně jako u dalších přístupů', 'Umístění v interní síti samo o sobě nezakládá důvěru; ověřuje se identita, oprávnění i kontext.');
  multi('Práce s oprávněními', 'Která opatření omezují dopad zneužití účtu? Vyber všechny správné možnosti.',
    ['Časově omezený privilegovaný přístup', 'Pravidelná kontrola přidělených oprávnění', 'Jeden sdílený účet správce pro celý tým', 'Oddělení běžného a administrátorského účtu'],
    ['Časově omezený privilegovaný přístup', 'Pravidelná kontrola přidělených oprávnění', 'Oddělení běžného a administrátorského účtu'], 'Dočasnost, audit práv a oddělené účty snižují rozsah zneužití. Sdílený účet zhoršuje dohledatelnost.');
  choice('Oddělení povinností', 'Proč má kritickou operaci schvalovat jiná osoba než ta, která ji provádí?',
    ['Aby bylo možné vypnout ověřování přihlášení', 'Aby se všechny změny prováděly bez záznamu', 'Aby jediná osoba nemohla sama zneužít celý postup', 'Aby všichni schvalovatelé získali plná práva správce'],
    'Aby jediná osoba nemohla sama zneužít celý postup', 'Separation of Duties rozděluje kritické pravomoci mezi více osob.');
  text('Segmentace sítě', 'Vysvětli, jak segmentace sítě omezuje dopad kompromitace jedné stanice.',
    'Síť je rozdělena do částí s řízenou komunikací. Napadená stanice nemá automaticky přístup ke všem ostatním systémům, což omezuje laterální pohyb útočníka.');
  match('Principy přístupu', 'Přiřaď bezpečnostní princip k jeho hlavnímu významu.',
    [['PoLP', 'Jen oprávnění nezbytná k úkolu'], ['RBAC', 'Oprávnění přidělovaná pomocí rolí'], ['Zero Trust', 'Žádná automatická důvěra jen kvůli umístění v síti'], ['Audit přístupů', 'Zaznamenávání a vyhodnocování použití oprávnění']],
    'PoLP omezuje rozsah práv, RBAC organizuje jejich přidělování, Zero Trust vyžaduje ověřování a audit poskytuje dohledatelnost.');

  topic = 'Účty a služby ve Windows';
  choice('Lokální účet', 'Kde se spravuje identita běžného lokálního účtu Windows?',
    ['V databázi účtů konkrétního počítače', 'Výhradně na řadiči Active Directory', 'Výhradně v konfiguraci síťového přepínače', 'V seznamu pravidel internetového routeru'],
    'V databázi účtů konkrétního počítače', 'Lokální účet patří danému počítači; doménový účet je spravován v doméně.');
  choice('Identifikátor účtu', 'Který identifikátor Windows používá při řízení přístupu uživatelů a skupin?',
    ['UID', 'GID', 'SID', 'PID'], 'SID', 'Windows přiřazuje bezpečnostním objektům SID, který se používá například v ACL.');
  scenario('Přejmenování účtu', 'Správce přejmenuje existující účet Windows, ale účet nesmaže ani nevytvoří znovu. Co se stane s jeho SID?',
    ['Změní se podle nového uživatelského jména', 'Zůstane stejný, protože jde o tentýž účet', 'Převezme SID právě přihlášeného správce', 'Nahradí se adresou počítače v síti'],
    'Zůstane stejný, protože jde o tentýž účet', 'SID identifikuje účet nezávisle na jeho zobrazovaném názvu.');
  choice('Výpis místních uživatelů', 'Který příkaz PowerShellu vypíše místní uživatelské účty?',
    ['Get-Service', 'Get-Process', 'Get-NetAdapter', 'Get-LocalUser'], 'Get-LocalUser', 'Get-LocalUser vrací místní účty včetně jejich stavu a popisu.');
  choice('Aktuální identita', 'Který příkaz Windows zobrazí SID aktuálně přihlášeného uživatele?',
    ['whoami /user', 'ipconfig /all', 'netstat -an', 'gpupdate /force'], 'whoami /user', 'whoami /user zobrazí jméno a SID aktuálního účtu.');
  choice('Správa služeb', 'Kterou konzoli otevřeš pro místní správu služeb Windows?',
    ['gpmc.msc', 'services.msc', 'wf.msc', 'regedit.exe'], 'services.msc', 'Konzole Služby umožňuje sledovat stav a upravovat vlastnosti služeb.');
  scenario('Každodenní práce správce', 'Správce prohlíží web a čte e-mail. Jaký účet je pro tyto činnosti vhodnější?',
    ['Doménový administrátor pro všechny činnosti', 'Sdílený servisní účet s neomezenými právy', 'Běžný účet, administrátorský jen pro správu', 'Local System používaný jako osobní účet'],
    'Běžný účet, administrátorský jen pro správu', 'Běžné činnosti nemají probíhat pod privilegovaným účtem, aby případné napadení nezískalo zbytečně vysoká práva.');
  choice('Účet služby', 'Proč není vhodné spouštět každou službu pod účtem Local System?',
    ['Každá taková služba přestane mít vlastní proces', 'Každá taková služba se automaticky připojí do domény', 'Tento účet dovoluje pouze čtení veřejných dokumentů', 'Tento účet má velmi vysoká místní oprávnění'],
    'Tento účet má velmi vysoká místní oprávnění', 'Kompromitace služby pod Local System může dát útočníkovi vysoká práva v počítači.');
  multi('Bezpečný provoz služeb', 'Která opatření patří k bezpečné správě služeb operačního systému?',
    ['Vypnutí nepotřebných služeb', 'Používání účtu s potřebným minimem práv', 'Pravidelné aktualizace a kontrola logů', 'Povolení změny konfigurace služby všem uživatelům'],
    ['Vypnutí nepotřebných služeb', 'Používání účtu s potřebným minimem práv', 'Pravidelné aktualizace a kontrola logů'], 'Omezuje se počet napadnutelných služeb, jejich oprávnění a známé zranitelnosti; logy umožňují sledovat problémy.');
  text('Osobní a servisní účet', 'Proč je nevhodné provozovat firemní službu pod osobním účtem zaměstnance?',
    'Služba se váže na životní cyklus osobního účtu. Změna hesla, odebrání oprávnění nebo odchod zaměstnance může narušit její provoz. Vhodnější je samostatná spravovaná identita s právy potřebnými pro službu.');

  topic = 'Active Directory a zásady skupiny';
  choice('Úloha adresářové služby', 'K čemu slouží Active Directory v doménové síti?',
    ['Pouze k filtrování paketů na síťové bráně', 'K centrální správě identit a prostředků domény', 'Pouze ke komprimaci uživatelských dokumentů', 'K náhradě souborového systému na stanicích'],
    'K centrální správě identit a prostředků domény', 'AD ukládá objekty jako uživatele, skupiny a počítače a podporuje ověřování a správu doménového prostředí.');
  choice('Řadič domény', 'Jakou roli má řadič domény v Active Directory?',
    ['Ukládá adresářová data a poskytuje doménové služby', 'Pouze předává tiskové úlohy na místní tiskárnu', 'Nahrazuje všechny síťové adaptéry pracovních stanic', 'Pouze převádí uživatelské soubory na archiv ZIP'],
    'Ukládá adresářová data a poskytuje doménové služby', 'Domain Controller poskytuje služby AD, například ověřování; více řadičů si replikuje adresářová data.');
  scenario('Jednotné nastavení stanic', 'Škola potřebuje v doméně centrálně nastavit bezpečnostní zásady počítačů jedné organizační jednotky. Co použije?',
    ['Samostatné ruční přepsání každého uživatelského profilu', 'Přidělení práv doménového administrátora všem žákům', 'GPO propojený s příslušnou organizační jednotkou', 'Zveřejnění přihlašovacích hesel v síťovém sdílení'],
    'GPO propojený s příslušnou organizační jednotkou', 'Group Policy umožňuje centrální konfiguraci; propojení GPO určuje její rozsah.');
  choice('Aktualizace zásad', 'Který příkaz vynutí obnovení zásad skupiny na klientovi Windows?',
    ['whoami /user', 'net user', 'Get-LocalUser', 'gpupdate /force'], 'gpupdate /force', 'gpupdate /force vynutí aktualizaci zásad skupiny.');
  choice('Rozšíření schématu', 'Která FSMO role spravuje definice objektů a atributů v celé struktuře AD?',
    ['RID Master', 'Schema Master', 'PDC Emulator', 'Infrastructure Master'], 'Schema Master', 'Schema Master je role pro změny schématu na úrovni celé struktury.');
  choice('Názvy domén', 'Která FSMO role odpovídá za přidávání a odstraňování domén ve struktuře AD?',
    ['Domain Naming Master', 'RID Master', 'Schema Master', 'PDC Emulator'], 'Domain Naming Master', 'Domain Naming Master řídí změny domén a jejich názvů v rámci struktury.');
  choice('Relativní identifikátory', 'Která FSMO role přiděluje řadičům domény bloky RID?',
    ['Infrastructure Master', 'Schema Master', 'RID Master', 'Domain Naming Master'], 'RID Master', 'RID Master přiděluje bloky relativních identifikátorů používaných při vytváření bezpečnostních objektů.');
  choice('Čas v doméně', 'Která FSMO role má důležitou úlohu v hierarchii synchronizace času domény?',
    ['Schema Master', 'Domain Naming Master', 'Infrastructure Master', 'PDC Emulator'], 'PDC Emulator', 'PDC Emulator je významný pro časovou synchronizaci a zpracování změn hesel.');
  multi('Úpravy zásad', 'Které postupy jsou vhodné před nasazením změny GPO do produkce?',
    ['Zálohovat dosavadní GPO', 'Ověřit změnu v testovací OU', 'Zkontrolovat rozsah a delegovaná oprávnění', 'Propojit neověřenou změnu ihned s celou doménou'],
    ['Zálohovat dosavadní GPO', 'Ověřit změnu v testovací OU', 'Zkontrolovat rozsah a delegovaná oprávnění'], 'Záloha usnadní návrat, testování ověří dopad a kontrola rozsahu zabrání nechtěnému plošnému nasazení.');
  text('Více řadičů domény', 'Jaký význam má replikace adresářových dat mezi řadiči domény?',
    'Řadiče si předávají změny adresářových objektů, aby mohly poskytovat služby s odpovídajícími daty. Více řadičů zvyšuje dostupnost, ale replikace sama není náhradou zálohy.');

  topic = 'Ověřování a útoky na doménu';
  choice('Čas a přihlášení', 'Proč je časová synchronizace důležitá pro Kerberos?',
    ['Určuje rozlišení obrazovky doménových uživatelů', 'Nahrazuje heslo časem spuštění počítače', 'Ověřování využívá časové údaje a platnost tiketů', 'Zajišťuje automatické smazání všech logů'],
    'Ověřování využívá časové údaje a platnost tiketů', 'Výrazný rozdíl hodin může způsobit odmítnutí Kerberos ověřování.');
  choice('Zneužitý otisk hesla', 'Který útok využívá odcizený NTLM hash bez nutnosti znát původní heslo?',
    ['Pass-the-Hash', 'Kerberoasting', 'Golden Ticket', 'NTLM Relay'], 'Pass-the-Hash', 'Při Pass-the-Hash se zneužívá hash pro ověření; heslo se nemusí nejprve prolomit.');
  choice('Předané ověření', 'Který útok přeposílá NTLM ověřovací komunikaci oběti jinému serveru?',
    ['Golden Ticket', 'NTLM Relay', 'Kerberoasting', 'Pass-the-Hash'], 'NTLM Relay', 'Relay předává ověřovací komunikaci skutečné služby; nejde o totéž jako použití předem ukradeného hashe.');
  choice('Tiket služby', 'Na co se zaměřuje Kerberoasting?',
    ['Na změnu adresy síťové brány uživatele', 'Na přepsání časového pásma všech stanic', 'Na vypnutí žurnálování diskových oddílů', 'Na offline hádání hesla servisního účtu z dat tiketu'],
    'Na offline hádání hesla servisního účtu z dat tiketu', 'Kerberoasting zneužívá data servisního Kerberos tiketu k offline hádání hesla účtu služby.');
  choice('Padělaný přihlašovací tiket', 'Jakou kompromitaci typicky předpokládá útok Golden Ticket?',
    ['Únik veřejné IP adresy webového serveru', 'Získání soukromé složky běžného uživatele', 'Získání klíče nebo hashe doménového účtu krbtgt', 'Přečtení veřejného seznamu lokálních skupin'],
    'Získání klíče nebo hashe doménového účtu krbtgt', 'Klíč účtu krbtgt umožňuje padělat TGT, proto jde o závažnou kompromitaci domény.');
  scenario('Slabé heslo služby', 'Účet služby má krátké heslo a vysoká doménová oprávnění. Jaké opatření přímo snižuje riziko Kerberoastingu?',
    ['Silné spravované heslo a omezení práv účtu služby', 'Přidání účtu do dalších administrátorských skupin', 'Použití stejného krátkého hesla u všech služeb', 'Vypnutí logování požadavků na servisní tikety'],
    'Silné spravované heslo a omezení práv účtu služby', 'Silné heslo ztěžuje offline hádání a omezená práva snižují dopad případné kompromitace.');
  scenario('Pohyb útočníka', 'Útočník po napadení jedné stanice používá získané přihlašovací údaje k přístupu na další počítače. Jak se tomuto pohybu říká?',
    ['Žurnálování', 'Laterální pohyb', 'Replikace schématu', 'Automatické zálohování'],
    'Laterální pohyb', 'Lateral movement znamená šíření přístupu útočníka mezi systémy v prostředí.');
  match('Rozlišení doménových útoků', 'Přiřaď útok k charakteristickému principu.',
    [['Pass-the-Hash', 'Použití odcizeného NTLM hashe'], ['NTLM Relay', 'Přeposlání ověřovací komunikace'], ['Kerberoasting', 'Offline hádání hesla servisního účtu'], ['Golden Ticket', 'Padělání TGT s klíčem krbtgt']],
    'Tyto útoky zneužívají různé části ověřování; stejný název neoznačuje pouhé hádání hesla při přihlášení.');
  multi('Ochrana doménových účtů', 'Která opatření snižují riziko zneužití doménových přihlašovacích údajů?',
    ['Omezování použití privilegovaných účtů', 'Sledování neobvyklých autentizačních událostí', 'Unikátní hesla lokálních správců', 'Sdílení doménového administrátorského účtu mezi uživateli'],
    ['Omezování použití privilegovaných účtů', 'Sledování neobvyklých autentizačních událostí', 'Unikátní hesla lokálních správců'], 'Omezená práva, monitoring a unikátní lokální hesla snižují pravděpodobnost nebo dopad šíření útoku.');
  text('Útoky a obrana', 'Proč samotné dlouhé uživatelské heslo nezabrání útoku Pass-the-Hash?',
    'Útočník s již odcizeným použitelným NTLM hashem nemusí původní heslo hádat. Důležité je chránit přihlašovací materiál, omezit privilegované přihlášení a podle možností omezovat NTLM.');

  topic = 'LAPS a lokální administrátoři';
  choice('Účel LAPS', 'Jaký problém řeší LAPS?',
    ['Rozdílné časové zóny všech počítačů', 'Neaktuální definice antiviru na stanicích', 'Sdílená a nespravovaná hesla lokálních správců', 'Chybné názvy diskových oddílů na serverech'],
    'Sdílená a nespravovaná hesla lokálních správců', 'LAPS automatizuje vytváření, změny a bezpečné ukládání hesel lokálních administrátorských účtů.');
  scenario('Stejné heslo na stanicích', 'V učebně má lokální administrátor stejné heslo na všech počítačích. Co má zavedení LAPS změnit?',
    ['Zavést unikátní spravované heslo pro jednotlivé počítače', 'Nahradit heslo číslem učebny na všech počítačích', 'Odstranit hesla ze všech administrátorských účtů', 'Zapsat společné heslo do veřejné síťové složky'],
    'Zavést unikátní spravované heslo pro jednotlivé počítače', 'Unikátní hesla omezují možnost použít přihlašovací údaje z jedné stanice na další.');
  choice('Uložení spravovaných hesel', 'Kam může Windows LAPS podle konfigurace zálohovat spravované heslo?',
    ['Jen do veřejné složky na ploše', 'Do Active Directory nebo Microsoft Entra ID', 'Jen do seznamu síťových pravidel firewallu', 'Do nechráněného souboru společného všem žákům'],
    'Do Active Directory nebo Microsoft Entra ID', 'Windows LAPS podporuje zálohování do AD nebo Entra ID; přístup k údajům musí být řízený.');
  choice('Rozsah správy', 'Jaká hesla jsou hlavním předmětem správy LAPS na pracovních stanicích?',
    ['Hesla všech webových účtů v prohlížeči', 'Hesla všech bezdrátových sítí v budově', 'Hesla všech osobních e-mailových schránek', 'Hesla vybraných lokálních administrátorských účtů'],
    'Hesla vybraných lokálních administrátorských účtů', 'LAPS není univerzální správce všech hesel uživatele.');
  choice('Interval změn', 'Jak se určuje interval automatické změny hesla spravovaného pomocí LAPS?',
    ['Podle nastavené politiky správy', 'Vždy pevně jednou za hodinu', 'Podle počtu souborů na disku', 'Vždy až po přeinstalování systému'],
    'Podle nastavené politiky správy', 'Doba platnosti hesla je konfigurovatelná; příklad z výkladu není univerzální pevná hodnota.');
  scenario('Kdo může heslo přečíst', 'Technik potřebuje pro servis získat lokální administrátorské heslo ze správy LAPS. Jak nastavit přístup?',
    ['Umožnit čtení všem doménovým uživatelům', 'Zveřejnit heslo v popisu počítače bez omezení', 'Delegovat čtení pouze oprávněné servisní skupině', 'Posílat hesla celé třídě při každé změně'],
    'Delegovat čtení pouze oprávněné servisní skupině', 'Bezpečné uložení musí doplnit omezené oprávnění ke čtení; heslo je citlivý údaj.');
  multi('Přínosy správy hesel', 'Které vlastnosti patří k bezpečné správě lokálních administrátorských hesel pomocí LAPS?',
    ['Náhodně generovaná unikátní hesla', 'Automatická obměna podle politiky', 'Řízený přístup k uloženým heslům', 'Trvalé používání společného hesla pro celou síť'],
    ['Náhodně generovaná unikátní hesla', 'Automatická obměna podle politiky', 'Řízený přístup k uloženým heslům'], 'LAPS omezuje sdílení hesel a ruční správu; přístup k záloze hesla zůstává omezený.');
  choice('LAPS a aktualizace', 'Které tvrzení o nasazení LAPS je správné?',
    ['Po nasazení již není potřeba žádný firewall', 'Omezuje sdílená hesla, ale nenahrazuje další ochrany', 'Po nasazení lze vypnout všechny bezpečnostní aktualizace', 'Zaručí, že žádný lokální účet nemůže být napaden'],
    'Omezuje sdílená hesla, ale nenahrazuje další ochrany', 'LAPS řeší konkrétní problém správy hesel a doplňuje další vrstvy zabezpečení.');
  text('Dopad kompromitace stanice', 'Jak unikátní lokální administrátorská hesla omezují dopad krádeže přihlašovacích údajů z jedné stanice?',
    'Ukradené heslo nebo hash lokálního účtu z jedné stanice se nedá jednoduše využít k přihlášení ke stejnému lokálnímu účtu na všech dalších stanicích, protože používají jiná hesla.');
  text('Kontrola nasazení', 'Uveď tři věci, které je třeba zkontrolovat při nasazení LAPS v doméně.',
    'Například: nastavenou politiku správy hesel, oprávnění počítačů zapisovat zálohu hesla a oprávnění servisních pracovníků ji číst. Dále ověřit skutečnou obměnu a úspěšné uložení hesel na testovacích počítačích.');

  topic = 'Zabezpečení Windows';
  choice('Bezpečnostní aktualizace', 'Proč je dlouhodobé vypnutí aktualizací bezpečnostním rizikem?',
    ['Známé zranitelnosti mohou zůstat neopravené', 'Zranitelnosti se automaticky opraví při restartu', 'Signatury antiviru samy opraví chyby systému', 'Firewall automaticky opraví chyby síťových služeb'],
    'Známé zranitelnosti mohou zůstat neopravené', 'Bezpečnostní záplaty opravují známé chyby; jejich odkládání prodlužuje dobu vystavení riziku.');
  choice('Detekce známého malwaru', 'Na čem je založena signaturní antivirová detekce?',
    ['Na porovnání hesla s názvem uživatelského účtu', 'Na počítání všech aktivních síťových adaptérů', 'Na porovnání obsahu se známými vzory malwaru', 'Na zablokování každého souboru většího než 1 MB'],
    'Na porovnání obsahu se známými vzory malwaru', 'Signatury jsou vzory známých hrozeb; databáze musí být průběžně aktualizována.');
  choice('Podezřelé chování', 'Co je cílem heuristické a behaviorální detekce?',
    ['Povolit program, pokud má dostatečně krátký název', 'Rozpoznávat podezřelé vzorce kódu nebo chování', 'Považovat všechny soubory bez podpisu za bezpečné', 'Nahradit veškeré řízení přístupu k souborům'],
    'Rozpoznávat podezřelé vzorce kódu nebo chování', 'Analýza může zachytit i nové varianty hrozeb, ale může mít falešné poplachy.');
  scenario('Neznámý program', 'Antivirus označil interní nástroj jako podezřelý. Jak má správce postupovat?',
    ['Trvale vypnout ochranu na všech stanicích', 'Automaticky považovat varování za neškodné', 'Poslat nástroj všem uživatelům bez ověření', 'Prověřit původ, chování a nález před povolením'],
    'Prověřit původ, chování a nález před povolením', 'Heuristika může mít falešný poplach, ale varování se nemá ignorovat ani řešit plošným vypnutím ochrany.');
  choice('Ochrana při práci', 'Jaký je účel antivirové ochrany v reálném čase?',
    ['Kontrolovat činnost a soubory průběžně během provozu', 'Provádět kontrolu pouze při každoroční inventuře', 'Převádět všechny otevřené soubory na zálohy', 'Povolit všechny programy po prvním přihlášení'],
    'Kontrolovat činnost a soubory průběžně během provozu', 'Ochrana v reálném čase reaguje na probíhající činnost, nejde pouze o ručně vyvolaný sken.');
  choice('Citlivé složky', 'Jaký je účel řízeného přístupu ke složkám v ochraně Windows?',
    ['Zrychlit stahování všech dokumentů z internetu', 'Dát každé aplikaci plné právo měnit dokumenty', 'Omezit neautorizované změny chráněných souborů', 'Zrušit potřebu záloh všech firemních dat'],
    'Omezit neautorizované změny chráněných souborů', 'Řízený přístup ke složkám pomáhá chránit soubory například proti ransomwaru; nenahrazuje zálohy.');
  choice('Systémový registr', 'Co převážně ukládá registr Windows?',
    ['Pouze obsah všech dokumentů uživatelů', 'Konfigurační údaje systému, aplikací a uživatelů', 'Pouze síťové pakety zachycené firewallem', 'Pouze kopie celého operačního systému'],
    'Konfigurační údaje systému, aplikací a uživatelů', 'Registr je hierarchická databáze konfigurace; změny citlivých klíčů mohou ovlivnit zabezpečení.');
  scenario('Změna registru', 'Správce potřebuje změnit citlivou hodnotu registru na pracovních stanicích. Který postup je vhodný?',
    ['Přepsat přímo všechny soubory v System32 bez zálohy', 'Dát všem uživatelům plná práva ke všem klíčům', 'Vymazat auditní záznamy ještě před změnou', 'Zálohovat nastavení a ověřit změnu na testovací stanici'],
    'Zálohovat nastavení a ověřit změnu na testovací stanici', 'Záloha a test snižují riziko nechtěné změny; pro plošnou správu lze použít zásady skupiny.');
  multi('Vrstvy ochrany stanice', 'Která opatření patří k zabezpečení pracovní stanice Windows?',
    ['Aktualizovaný systém a ochrana proti malwaru', 'Omezení místních administrátorských práv', 'Zapnutý a vhodně nastavený firewall', 'Trvalé vypnutí logování kvůli menšímu počtu záznamů'],
    ['Aktualizovaný systém a ochrana proti malwaru', 'Omezení místních administrátorských práv', 'Zapnutý a vhodně nastavený firewall'], 'Jednotlivé ochrany se doplňují. Logy jsou důležité pro rozpoznání incidentů a dohledatelnost.');
  text('Ochrana a záloha', 'Proč samotný antivirus nenahrazuje zálohování dat?',
    'Antivirus může hrozbu přehlédnout a neřeší všechny příčiny ztráty dat, například poruchu disku nebo chybu uživatele. Záloha umožňuje obnovu; musí být chráněná a její obnova ověřená.');

  topic = 'Linux: účty a zvýšení oprávnění';
  choice('Identifikace v Linuxu', 'Čím Linux identifikuje uživatele při vlastnictví souborů a procesů?',
    ['Názvem domovského adresáře', 'Číselným UID', 'Výhradně zobrazovaným jménem', 'Číslem síťového portu'], 'Číselným UID', 'Uživatelské jméno je čitelný název; systém při řízení přístupu používá UID.');
  choice('Privilegovaný identifikátor', 'Jaké UID má v běžném linuxovém systému účet root?',
    ['1000', '1', '65534', '0'], '0', 'UID 0 označuje superuživatele s velmi vysokými oprávněními.');
  choice('Databáze účtů', 'Co běžně obsahuje soubor `/etc/passwd` v systému používajícím shadow hesla?',
    ['Základní atributy účtů včetně UID, GID a shellu', 'Čitelná hesla všech uživatelů systému', 'Pouze aktuální firewallová pravidla', 'Pouze seznam nainstalovaných balíčků'],
    'Základní atributy účtů včetně UID, GID a shellu', '/etc/passwd uvádí identitu a atributy účtu; v poli hesla bývá x, hash je uložen odděleně.');
  choice('Citlivá databáze hesel', 'Který soubor uchovává hashe místních hesel a údaje o jejich platnosti v běžném Linuxu?',
    ['/etc/hosts', '/etc/fstab', '/etc/shadow', '/etc/sudoers'], '/etc/shadow', '/etc/shadow obsahuje hashe a údaje o stárnutí hesel a vyžaduje omezený přístup.');
  choice('Čtení atributů účtu', 'V záznamu `pavel:x:1001:1002:Pavel:/home/pavel:/bin/bash` je číslo 1002 jakým údajem?',
    ['Číslem portu shellu', 'GID primární skupiny', 'Velikostí domovské složky', 'UID uživatele'], 'GID primární skupiny', 'Po uživatelském jménu a poli hesla následuje UID a potom GID primární skupiny.', 3);
  choice('Zjištění identity', 'Který příkaz Linuxu zobrazí UID, GID a členství uživatele ve skupinách?',
    ['ls -l student', 'chmod student', 'mount student', 'id student'], 'id student', 'id vypíše číselné identifikátory uživatele a jeho skupin.');
  scenario('Jednorázová správa', 'Uživatel potřebuje provést jednu povolenou administrátorskou operaci. Co odpovídá omezenému zvýšení oprávnění?',
    ['Použít sudo pro daný povolený příkaz', 'Změnit UID svého účtu trvale na 0', 'Používat root účet pro všechnu běžnou práci', 'Nastavit všechny systémové soubory na 777'],
    'Použít sudo pro daný povolený příkaz', 'sudo umožňuje řízené zvýšení práv pro konkrétní operaci podle konfigurace.');
  choice('Bezpečná editace sudo', 'Který nástroj je určený pro editaci sudoers s kontrolou syntaxe?',
    ['journalctl', 'systemctl', 'visudo', 'regedit'], 'visudo', 'visudo provádí kontrolu syntaxe a zamyká soubor během editace.');
  choice('Konfigurace zvýšení práv', 'Kde se typicky definují pravidla, kdo smí používat sudo?',
    ['/etc/passwd a /home', '/etc/sudoers a /etc/sudoers.d/', '/var/log a /tmp', '/etc/hosts a /etc/fstab'],
    '/etc/sudoers a /etc/sudoers.d/', 'Pravidla sudo definují povolené uživatele, příkazy a cílovou identitu.');
  text('Systémové účty', 'Proč mají linuxové služby často vlastní systémový účet bez běžného interaktivního přihlášení?',
    'Samostatná identita umožňuje oddělit služby, přiřadit jim jen potřebná práva a sledovat jejich činnost. Zakázání běžného přihlašovacího shellu omezuje nepotřebné interaktivní použití účtu.');

  topic = 'Linux: soubory a oprávnění';
  choice('Tři skupiny práv', 'Pro které tři třídy se zapisují základní unixová oprávnění souboru?',
    ['Správce, antivirus a firewall', 'Proces, služba a síť', 'Vlastník, skupina a ostatní', 'Disk, oddíl a složka'],
    'Vlastník, skupina a ostatní', 'Základní model rozlišuje vlastníka souboru, jeho skupinu a ostatní uživatele.');
  match('Zápis oprávnění', 'Přiřaď symbol oprávnění k jeho významu u běžného souboru.',
    [['r', 'Čtení obsahu'], ['w', 'Zápis a změna obsahu'], ['x', 'Spuštění souboru']],
    'U běžného souboru r znamená čtení, w zápis a x spuštění. U adresářů mají tato práva odlišný kontext.');
  choice('Číselné vyjádření práv', 'Která číselná hodnota odpovídá oprávnění `r-x`?',
    ['5', '6', '3', '7'], '5', 'Čtení má hodnotu 4 a spuštění 1; 4 + 1 = 5.');
  choice('Převod celého zápisu', 'Jaký číselný zápis odpovídá právům `rwxr-xr--`?',
    ['755', '745', '644', '754'], '754', 'Vlastník rwx = 7, skupina r-x = 5, ostatní r-- = 4.', 3);
  scenario('Soukromý soubor', 'Soubor `hesla.txt` má smět číst a měnit jen vlastník. Předpokládej běžná unixová práva bez dalších ACL. Které nastavení zvolíš?',
    ['chmod 644 hesla.txt', 'chmod 600 hesla.txt', 'chmod 666 hesla.txt', 'chmod 755 hesla.txt'],
    'chmod 600 hesla.txt', '600 dává vlastníkovi čtení a zápis; skupině a ostatním žádná práva. Privilegovaný správce není tímto vyloučen.', 3);
  scenario('Spustitelný skript', 'Skript má vlastník číst, měnit a spouštět; skupina i ostatní ho mají jen číst a spouštět. Která práva odpovídají požadavku?',
    ['600', '644', '755', '777'], '755', 'Vlastník má 7 = rwx, skupina a ostatní 5 = r-x.', 3);
  choice('Přidání práva', 'Co u běžného souboru provede `chmod u+x skript.sh`?',
    ['Přidá vlastníkovi právo spuštění', 'Odebere skupině právo zápisu', 'Převede vlastníka na uživatele root', 'Povolí všem uživatelům zápis'],
    'Přidá vlastníkovi právo spuštění', 'u označuje vlastníka a +x přidává právo spuštění.');
  choice('Změna vlastníka', 'Který příkaz je určen ke změně vlastníka souboru v Linuxu?',
    ['chmod', 'ls', 'journalctl', 'chown'], 'chown', 'chown mění vlastnictví, zatímco chmod mění oprávnění.');
  choice('Práva všem', 'Proč je plošné používání `chmod 777` pro citlivé soubory rizikové?',
    ['Zakáže čtení vlastníkovi všech souborů', 'Dává čtení, zápis a spuštění všem třídám uživatelů', 'Přepíše všechny hashe v databázi hesel', 'Automaticky zašifruje obsah bez klíče'],
    'Dává čtení, zápis a spuštění všem třídám uživatelů', '777 odstraňuje běžná omezení přístupu a umožňuje nechtěné změny dat.');
  text('SUID a bezpečnost', 'Vysvětli bezpečnostní riziko zbytečných SUID programů.',
    'SUID program se spouští s efektivní identitou svého vlastníka, často roota. Chyba v takovém programu může umožnit zvýšení oprávnění. Nepotřebné SUID programy proto zvyšují riziko.');

  topic = 'Linux: služby a správa systému';
  choice('Proces na pozadí', 'Co v Linuxu označuje pojem daemon?',
    ['Pouze soubor s uloženým heslem', 'Proces poskytující služby na pozadí', 'Každého uživatele s UID větším než 1000', 'Povinné rozšíření názvu spustitelného souboru'],
    'Proces poskytující služby na pozadí', 'Daemon bývá proces běžící na pozadí, například server vzdáleného připojení.');
  choice('Správce služeb', 'Který nástroj se používá k ovládání služeb na systému se systemd?',
    ['chmod', 'visudo', 'systemctl', 'chown'], 'systemctl', 'systemctl spravuje systemd jednotky, například spouští a zastavuje služby.');
  choice('Stav služby', 'Na systému s jednotkou `ssh.service` chceš zjistit její stav. Který příkaz použiješ?',
    ['systemctl status ssh', 'systemctl start ssh', 'systemctl stop ssh', 'systemctl enable ssh'],
    'systemctl status ssh', 'status ukáže aktuální stav; start, stop a enable provádějí jiné operace.');
  choice('Restart služby', 'Který příkaz restartuje existující službu `ssh.service`?',
    ['sudo systemctl disable ssh', 'sudo systemctl enable ssh', 'sudo systemctl daemon-reload', 'sudo systemctl restart ssh'],
    'sudo systemctl restart ssh', 'restart službu zastaví a znovu spustí; enable mění vazbu pro automatické spouštění.');
  scenario('Spuštění po startu', 'Služba nyní běží, ale po restartu systému se má spouštět automaticky. Která operace nastaví její povolení při startu?',
    ['systemctl status ssh', 'sudo systemctl enable ssh', 'sudo systemctl stop ssh', 'journalctl -u ssh'],
    'sudo systemctl enable ssh', 'enable nastavuje automatické spuštění jednotky podle její instalace. Samotné enable nemusí službu okamžitě spustit.');
  choice('Zákaz automatického startu', 'Co typicky udělá `sudo systemctl disable ssh` bez dalších přepínačů?',
    ['Okamžitě odinstaluje veškeré SSH programy', 'Smaže všechny záznamy služby ze žurnálu', 'Zakáže automatické spuštění, běžící službu tím nezastaví', 'Změní heslo účtu, pod kterým služba běží'],
    'Zakáže automatické spuštění, běžící službu tím nezastaví', 'Změna povolení při startu a aktuální stav běhu jsou odlišné operace.', 3);
  choice('Záznamy konkrétní služby', 'Který příkaz zobrazí záznamy systemd žurnálu pro službu `ssh.service`?',
    ['journalctl -u ssh', 'systemctl enable ssh', 'id ssh', 'chmod -u ssh'],
    'journalctl -u ssh', 'Přepínač -u filtruje záznamy podle systemd jednotky.');
  choice('Změněná jednotka', 'Správce upravil definici systemd jednotky na disku. Který příkaz načte změny definic do správce služeb?',
    ['sudo systemctl stop ssh', 'sudo systemctl enable ssh', 'journalctl -f', 'sudo systemctl daemon-reload'],
    'sudo systemctl daemon-reload', 'daemon-reload znovu načte definice jednotek; službu samotnou nerestartuje.', 3);
  match('Operace se službou', 'Přiřaď operaci systemctl k jejímu účelu.',
    [['start', 'Spustit službu nyní'], ['stop', 'Zastavit službu nyní'], ['enable', 'Povolit automatický start'], ['status', 'Zobrazit aktuální stav']],
    'Aktuální běh služby a nastavení jejího automatického spouštění jsou dvě odlišné věci.');
  text('Účet webového serveru', 'Proč je vhodné, aby webová služba běžela pod vlastním účtem s omezenými právy?',
    'Pokud útočník službu zneužije, získá jen práva jejího účtu. Služba má mít přístup k potřebným datům, ale nemá například číst databázi hesel nebo měnit nesouvisející systémovou konfiguraci.');

  topic = 'Firewall a vzdálený přístup';
  choice('Úloha síťové ochrany', 'Co je hlavní úlohou firewallu?',
    ['Ukládat hashe uživatelských hesel', 'Opravovat všechny napadené soubory', 'Řídit síťovou komunikaci pomocí pravidel', 'Přidělovat UID novým uživatelům'],
    'Řídit síťovou komunikaci pomocí pravidel', 'Firewall povoluje nebo blokuje komunikaci podle pravidel; nenahrazuje všechny další ochrany.');
  choice('Směr komunikace', 'Co řídí příchozí pravidlo hostového firewallu?',
    ['Komunikaci přicházející k chráněnému počítači', 'Výhradně komunikaci odesílanou z počítače', 'Přidělování práv k lokálním dokumentům', 'Vytváření a mazání místních uživatelů'],
    'Komunikaci přicházející k chráněnému počítači', 'Příchozí a odchozí pravidla se rozlišují podle směru vzhledem k chráněnému zařízení.');
  scenario('Veřejná bezdrátová síť', 'Notebook se připojil k Wi-Fi v kavárně. Jaké nastavení je vhodné?',
    ['Důvěřovat všem připojeným zařízením jako v doméně', 'Použít veřejný profil a omezit příchozí komunikaci', 'Vypnout firewall, aby se připojení nezpomalovalo', 'Povolit sdílení souborů všem okolním uživatelům'],
    'Použít veřejný profil a omezit příchozí komunikaci', 'Veřejná síť není automaticky důvěryhodná; notebook má omezovat nevyžádaný příchozí provoz.');
  choice('Konzole firewallu', 'Který příkaz otevře pokročilou konzoli firewallu Windows?',
    ['services.msc', 'gpmc.msc', 'regedit', 'wf.msc'], 'wf.msc', 'wf.msc otevírá Windows Firewall s pokročilým zabezpečením.');
  choice('Pravidla Linuxu', 'K čemu slouží nftables?',
    ['K editaci pravidel sudo', 'K výpisu lokálních hesel', 'K filtrování a řízení síťových paketů', 'K vytváření záloh registru Windows'],
    'K filtrování a řízení síťových paketů', 'nftables je linuxový subsystém a nástroj pro správu pravidel síťového filtrování.');
  choice('Jednodušší správa firewallu', 'Co představuje UFW v Linuxu?',
    ['Jednodušší rozhraní pro konfiguraci firewallu', 'Databázi hashů hesel všech uživatelů', 'Nástroj pro obnovu doménového řadiče', 'Editor systemd žurnálu a servisních logů'],
    'Jednodušší rozhraní pro konfiguraci firewallu', 'UFW zjednodušuje nastavování pravidel. Konkrétní technická implementace závisí na systému.');
  choice('Šifrovaná správa', 'Který protokol je vhodný pro šifrované vzdálené připojení k linuxovému serveru?',
    ['Telnet', 'HTTP', 'FTP', 'SSH'], 'SSH', 'SSH poskytuje šifrované vzdálené spojení; Telnet přenáší komunikaci nešifrovaně.');
  scenario('Opakované pokusy o přihlášení', 'Log serveru ukazuje opakovaná neúspěšná SSH přihlášení ze stejné IP adresy. Který nástroj může podle logů zavést dočasnou blokaci?',
    ['chmod', 'Fail2Ban', 'visudo', 'Get-LocalUser'], 'Fail2Ban', 'Fail2Ban sleduje logy a podle nastavených pravidel může blokovat zdrojové IP. Samotná blokace nenahrazuje bezpečné ověřování.');
  multi('Omezení vzdálené správy', 'Která opatření patří k zabezpečení SSH přístupu?',
    ['Použití vhodně chráněných SSH klíčů', 'Omezení přístupu firewallem', 'Zákaz nepotřebného přímého přihlášení roota', 'Zveřejnění soukromého SSH klíče pro celý tým'],
    ['Použití vhodně chráněných SSH klíčů', 'Omezení přístupu firewallem', 'Zákaz nepotřebného přímého přihlášení roota'], 'Soukromý klíč se nesdílí; omezený síťový přístup a kontrolované zvýšení práv snižují riziko.');
  text('Výchozí zákaz', 'Co znamená strategie firewallu „deny by default“ a proč potřebuje výjimky?',
    'Komunikace je výchozím pravidlem zakázaná a povolují se jen potřebné výjimky. Výjimky musejí odpovídat skutečným službám, zdrojům a směrům komunikace, aby systém mohl plnit svou úlohu bez zbytečně širokého přístupu.');

  topic = 'Linux: základ systému a souborové systémy';
  choice('Jádro systému', 'Jaká je hlavní úloha jádra operačního systému?',
    ['Spravovat hardware a prostředky pro běžící procesy', 'Ukládat výhradně osobní fotografie uživatelů', 'Nahrazovat všechny aplikační programy', 'Sloužit pouze jako editor textových dokumentů'],
    'Spravovat hardware a prostředky pro běžící procesy', 'Jádro zprostředkovává přístup k hardwaru a spravuje například procesy a paměť.');
  choice('Distribuce Linuxu', 'Co označuje linuxová distribuce?',
    ['Libovolný běžící proces s právy root', 'Výhradně jednu složku s dokumenty', 'Sestavu jádra, nástrojů a softwaru pro používání systému', 'Výhradně identifikátor uživatele v systému'],
    'Sestavu jádra, nástrojů a softwaru pro používání systému', 'Distribuce sestavuje jádro a další součásti do použitelného systému s vlastní správou softwaru.');
  choice('Uspořádání adresářů', 'K čemu slouží Filesystem Hierarchy Standard (FHS)?',
    ['K výpočtu hashe přihlašovacího hesla', 'K popisu standardního uspořádání adresářů', 'K vytvoření tiketu pro doménovou službu', 'K nastavení rozlišení grafického prostředí'],
    'K popisu standardního uspořádání adresářů', 'FHS popisuje účel a organizaci adresářů unixových systémů.');
  choice('Kořen stromu', 'Co označuje cesta `/` v linuxovém souborovém systému?',
    ['Domovský adresář právě přihlášeného uživatele', 'Výhradně soubor s pravidly pro root účet', 'Příponu všech spustitelných programů', 'Kořen jednotného adresářového stromu'],
    'Kořen jednotného adresářového stromu', 'Adresářový strom začíná v /; další souborové systémy se do něj připojují.');
  choice('Účel žurnálu', 'K čemu slouží žurnálování souborového systému?',
    ['K usnadnění obnovy konzistence po přerušené operaci', 'K úplnému nahrazení záloh všech dokumentů', 'K ukládání čitelných hesel všech uživatelů', 'K automatickému odstranění všech přístupových práv'],
    'K usnadnění obnovy konzistence po přerušené operaci', 'Žurnál zaznamenává operace nebo jejich metadata. Pomáhá obnovit konzistenci, ale negarantuje obnovu všech dat a nenahrazuje zálohy.');
  choice('Linuxový disk', 'Který z nabízených souborových systémů je běžně používaný v Linuxu a podporuje žurnálování?',
    ['FAT16', 'ISO 9660', 'ext4', 'FAT12'], 'ext4', 'ext4 je linuxový žurnálovací souborový systém.');
  choice('Dodatečné bezpečnostní politiky', 'Jakou úlohu mají SELinux nebo AppArmor?',
    ['Zpřístupnit každý systémový soubor všem uživatelům', 'Omezovat činnost programů dalšími bezpečnostními pravidly', 'Nahradit všechna uživatelská hesla názvem počítače', 'Automaticky zrušit potřebu síťového firewallu'],
    'Omezovat činnost programů dalšími bezpečnostními pravidly', 'Tyto mechanismy doplňují běžná oprávnění o další řízení přístupu aplikací.');
  scenario('Logy po incidentu', 'Správce chce po podezřelém přihlášení prověřit záznamy linuxového systému. Který zdroj je relevantní?',
    ['Pouze aktuální tapeta přihlášeného uživatele', 'Pouze názvy tiskáren v kanceláři', 'Pouze počet ikon na ploše správce', 'Systémový žurnál a odpovídající soubory v /var/log'],
    'Systémový žurnál a odpovídající soubory v /var/log', 'Žurnál a souborové logy podle konfigurace obsahují události potřebné pro audit a analýzu incidentu.');
  multi('Bezpečnost linuxového systému', 'Která opatření snižují riziko kompromitace linuxového serveru?',
    ['Aktualizace systému a provozovaných služeb', 'Omezení nepotřebných síťových služeb', 'Kontrola práv citlivých souborů', 'Běžná práce pod účtem s UID 0 bez omezení'],
    ['Aktualizace systému a provozovaných služeb', 'Omezení nepotřebných síťových služeb', 'Kontrola práv citlivých souborů'], 'Bezpečný systém potřebuje opravy, omezenou plochu útoku a řízený přístup. Běžná práce s UID 0 zvyšuje dopad chyb.');
  text('Operační systémy a bezpečnost', 'Proč samotná volba Linuxu místo Windows nezaručí bezpečnost serveru?',
    'Bezpečnost závisí na konfiguraci, aktualizacích, účtech, právech a provozovaných službách. Chybná konfigurace nebo zranitelná aplikace může ohrozit systém bez ohledu na značku operačního systému.');

  return exercises;
})();
