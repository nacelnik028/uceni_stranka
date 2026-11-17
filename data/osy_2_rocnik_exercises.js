// Operační systémy 2. ročník – Notion OSY (CMD, účty, PowerShell v praxi, Mark of the Web). Podklad: materialy/operacni-systemy/zdroj/notion-osy-2-rocnik.md
window.OPERATING_SYSTEMS_2_EXERCISES = (() => {
  const list = [];
  let topic = '';
  let seq = 0;
  const SUB = { choice: 'Příkazy a pojmy', scenario: 'Praktické situace', multi: 'Příkazy a pojmy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', order: 'Postupy', number: 'Hodnoty' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `osy2-${String(++seq).padStart(3, '0')}`, subject: 'Operační systémy', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['OSY', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const z = (title, question, cloze, gaps, solution, d = 2) => add('cloze', title, question, { cloze, gaps }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections, layout: 'lines' }, solution, d);
  const o = (title, question, order, solution, d = 2) => add('order', title, question, { order }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  topic = 'Příkazy CMD';
  p('Příkazy CMD', 'Přiřaď příkaz CMD k jeho funkci.', [
    ['tree', 'zobrazí strukturu složek'],
    ['tree /f', 'zobrazí strukturu včetně souborů'],
    ['rmdir slozka /S', 'smaže složku i s podsložkami'],
    ['del soubor', 'smaže soubor'],
    ['copy soubor cil', 'zkopíruje soubor'],
    ['xcopy zdroj cil /e', 'zkopíruje celou strukturu včetně prázdných složek'],
  ], 'xcopy /e kopíruje i podsložky (včetně prázdných), copy pracuje se soubory.', 3);
  s('Kopie projektu', 'Potřebuješ zkopírovat složku projektu se všemi podsložkami, i prázdnými, na flash disk.', 'Který příkaz CMD použiješ?', ['copy projekt E:\\projekt /y', 'xcopy projekt E:\\projekt /e', 'tree projekt E:\\projekt /f', 'del projekt E:\\projekt /q'], 1, 'xcopy s přepínačem /e kopíruje celou strukturu adresářů.');
  c('Smazání složky', 'Který příkaz v CMD smaže složku Stare včetně všech podsložek a souborů?', ['del Stare', 'rmdir Stare /S', 'tree Stare /f', 'copy Stare nul'], 1, 'rmdir (rd) s /S odstraní i obsah. del maže soubory.');
  c('Nový uživatel v CMD', 'Jak v CMD (jako správce) vytvoříš místního uživatele pepa se skrytým zadáním hesla?', ['net user pepa /add *', 'net user pepa * /add', 'user add pepa', 'net localgroup pepa /add'], 1, 'Hvězdička místo hesla vyvolá skrytou výzvu; pořadí je jméno, heslo, /add.');
  c('Výpis proudů', 'Který příkaz CMD zobrazí ve výpisu složky i alternativní datové proudy souborů?', ['dir /s', 'dir /r', 'tree /a', 'attrib /d'], 1, 'dir /r ukáže např. soubor.xlsx:Zone.Identifier:$DATA.');

  topic = 'Místní a doménové účty';
  c('SAM', 'Kde Windows uchovávají údaje místních uživatelských účtů?', ['V textovém souboru hesla.txt', 'V databázi SAM', 'V adresáři Active Directory', 'V klíči HKEY_CURRENT_USER'], 1, 'Soubor bývá v C:\\Windows\\System32\\config\\SAM; spravuje se nástroji Windows, ne ruční úpravou.');
  v('Místní a doménový účet', 'Rozhodni, zda tvrzení platí pro místní, nebo doménový účet.', 'Místní účet', 'Doménový účet', [
    ['Je definovaný na konkrétním počítači', 'left'],
    ['Je uložený v Active Directory Domain Services', 'right'],
    ['Údaje drží databáze SAM', 'left'],
    ['Ověřuje ho doménový řadič', 'right'],
  ], 'Místní a doménový účet se stejným jménem jsou různé identity.');
  c('Přihlášení místním účtem', 'Jak se na počítači v doméně přihlásíš místním účtem pepa?', ['pepa@domena.cz', '.\\pepa', 'domena/pepa', '//pepa'], 1, 'Tečka označuje místní počítač, následuje zpětné lomítko. Lze také NAZEV_PC\\pepa.');
  c('Entra ID', 'Co je Microsoft Entra ID?', ['Jiný název pro místní databázi SAM', 'Cloudová služba pro správu identit', 'Nová verze CMD', 'Typ souborového systému'], 1, 'Entra ID není totéž jako místní doména AD DS.');
  c('Replikace AD', 'Jak pracuje replikace v současném Active Directory?', ['Jen jeden řadič zapisuje, ostatní jsou záložní', 'Zapisovat může více řadičů, kromě zvláštních operací', 'Replikace v AD neexistuje', 'Řadiče se replikují jen ručně na flash disku'], 1, 'Role PDC emulator není totéž co historické rozdělení na primární a záložní řadiče.');
  c('lusrmgr.msc', 'Co otevře příkaz lusrmgr.msc?', ['Správu disků a oddílů', 'Místní uživatele a skupiny', 'Editor registru systému', 'Prohlížeč událostí Windows'], 1, 'Stejný nástroj je i ve Správě počítače → Místní uživatelé a skupiny.');
  o('Vlastní konzole MMC', 'Seřaď kroky vytvoření vlastní konzole MMC se správou uživatelů.', ['Spustit mmc', 'Soubor → Přidat nebo odebrat modul snap-in', 'Vybrat Místní uživatelé a skupiny a přidat', 'Zvolit místní počítač a potvrdit', 'Uložit konzoli jako soubor .msc'], 'MMC je prázdné prostředí; funkce dodávají moduly snap-in.');
  v('Právo a oprávnění', 'Rozhodni, zda jde o uživatelské právo, nebo oprávnění k objektu.', 'Právo', 'Oprávnění', [
    ['Povolení přihlásit se k počítači', 'left'],
    ['Čtení souboru ve sdílené složce', 'right'],
    ['Možnost vypnout systém', 'left'],
    ['Zápis do konkrétní složky', 'right'],
  ], 'Právo určuje povolenou činnost, oprávnění přístup k objektu (soubor, složka).');
  c('Skupina', 'Proč se oprávnění přidělují raději skupinám než jednotlivým uživatelům?', ['Skupiny nemají žádné heslo', 'Spravují se hromadně na jednom místě', 'Uživatelům oprávnění přidělit nejde', 'Skupiny zrychlují přihlášení'], 1, 'Např. skupina učitelů a skupina žáků s rozdílným přístupem.');

  topic = 'Účty v příkazovém řádku a PowerShellu';
  v('net localgroup a net group', 'Rozhodni, ke kterému nástroji tvrzení patří.', 'net localgroup', 'net group', [
    ['Spravuje místní skupiny počítače', 'left'],
    ['Spravuje doménové skupiny', 'right'],
    ['net … Administrators pepa /add přidá místního správce', 'left'],
    ['Vyžaduje prostředí domény', 'right'],
  ], 'Pro místní skupiny používej net localgroup.');
  z('Přidání správce', 'Doplň příkaz, který přidá existujícího uživatele pepa do místní skupiny Administrators.', 'net {{a}} Administrators {{b}} /add', [
    { id: 'a', options: ['localgroup', 'group', 'user'], answer: 'localgroup' },
    { id: 'b', options: ['pepa', '*', '/domain'], answer: 'pepa' },
  ], 'Pořadí: název skupiny, existující účet, /add. Vytvoření účtu a přidání do skupiny jsou dvě operace.');
  c('Struktura cmdletu', 'Co platí pro názvy cmdletů jako New-LocalUser?', ['Jsou ve tvaru podstatné jméno-sloveso', 'Jsou ve tvaru sloveso-podstatné jméno', 'Začínají vždy znakem $', 'Musí se psát velkými písmeny'], 1, 'Get- získává, Set- mění, New- vytváří.');
  c('Parametr -Password', 'Jaký typ hodnoty očekává parametr -Password u New-LocalUser?', ['Obyčejný řetězec v uvozovkách', 'Objekt SecureString', 'Číslo PIN', 'Hash MD5 hesla'], 1, 'Běžný text se převede přes ConvertTo-SecureString, nebo se načte Read-Host -AsSecureString.');
  c('SecureString', 'Je SecureString totéž co hash hesla?', ['Ano, SecureString je jednosměrný hash', 'Ne, jde o typ chráněné hodnoty předávané příkazu', 'Ano, ukládá se přímo do SAM', 'Ne, SecureString je šifrovaný soubor'], 1, 'Heslo zapsané přímo v příkazu zůstává čitelné ve skriptu i historii; -Force to neřeší.');
  c('Skryté zadání hesla', 'Kterým příkazem bezpečně načteš heslo od uživatele jako SecureString?', ['$heslo = Get-Password -Hidden', '$heslo = Read-Host -AsSecureString', '$heslo = \'Heslo123\' -Secure', '$heslo = Write-Host -Secure'], 1, 'Read-Host -AsSecureString zobrazí skrytý vstup.');
  v('Smazání účtu', 'Rozhodni, ke kterému nástroji patří zápis.', 'PowerShell', 'net user', [
    ['Remove-LocalUser -Name \'pepa\'', 'left'],
    ['net user pepa /delete', 'right'],
    ['Účet se určuje parametrem -Name', 'left'],
    ['Účet se maže přepínačem /delete', 'right'],
  ], 'Oba způsoby odstraní místní účet; jsou to alternativy.');
  c('-NoPassword', 'Co udělá New-LocalUser -Name \'pepa\' -NoPassword?', ['Vytvoří účet s náhodným heslem', 'Vytvoří účet bez hesla', 'Smaže heslo existujícímu účtu', 'Vytvoří doménový účet'], 1, 'Použitelnost přihlášení dál závisí na bezpečnostních zásadách systému.');
  p('Vlastnosti Get-LocalUser', 'Přiřaď vlastnost objektu místního účtu k jejímu významu.', [
    ['Enabled', 'zda je účet povolený'],
    ['PasswordLastSet', 'čas posledního nastavení hesla'],
    ['AccountExpires', 'datum vypršení účtu'],
    ['SID', 'bezpečnostní identifikátor účtu'],
    ['ObjectClass', 'druh objektu (User, Group)'],
  ], 'Get-LocalUser -Name \'pepa\' | Format-List * vypíše všechny vlastnosti.', 3);
  n('RID Administratora', 'Jaký RID (koncovou část SID) má vestavěný uživatelský účet Administrator?', 500, 'Administrator = 500, Guest = 501. Předcházející část SID závisí na počítači nebo doméně.', 3);
  v('Administrator a Administrators', 'Rozhodni, zda tvrzení platí pro účet Administrator, nebo skupinu Administrators.', 'Administrator', 'Administrators', [
    ['Je to uživatelský účet', 'left'],
    ['Je to skupina místních správců', 'right'],
    ['RID je 500, zbytek SID se liší podle počítače', 'left'],
    ['Má všude stejné SID S-1-5-32-544', 'right'],
  ], 'Pevné známé SID skupiny umožní najít ji i v jinak lokalizovaných Windows: Get-LocalGroup -SID \'S-1-5-32-544\'.', 3);
  s('Znovuvytvořený účet', 'Správce omylem smaže účet pepa a hned vytvoří nový účet se stejným jménem.', 'Co platí pro nový účet?', ['Má stejné SID i oprávnění jako dřív', 'Má jiné SID a původní oprávnění automaticky nezíská', 'Převezme heslo původního účtu', 'Nelze ho vytvořit, jméno je blokované'], 1, 'Nový účet je nová bezpečnostní identita s jiným SID.');
  c('Sysprep', 'K čemu slouží Sysprep s operací generalize před zachycením obrazu Windows?', ['Zrychlí start nového systému', 'Odstraní SID a údaje počítače', 'Zašifruje disk BitLockerem', 'Vytvoří zálohu uživatelských dat'], 1, 'Nové SID vznikne při následné fázi nastavení na cílovém počítači.');
  c('Členové skupiny', 'Kterým cmdletem vypíšeš členy místní skupiny Administrators?', ['Get-LocalGroup -Name \'Administrators\'', 'Get-LocalGroupMember -Group \'Administrators\'', 'Get-LocalUser -Group \'Administrators\'', 'net user Administrators'], 1, 'Get-LocalGroup vrací skupinu, Get-LocalGroupMember její členy.');
  z('Přidání člena', 'Doplň cmdlet, který přidá místní účet pepa do skupiny Administrators.', '{{a}} -Group \'Administrators\' -Member (Get-LocalUser -Name \'pepa\')', [
    { id: 'a', options: ['Add-LocalGroupMember', 'New-LocalGroup', 'Set-LocalUser'], answer: 'Add-LocalGroupMember' },
  ], 'Výraz v závorce vrátí objekt místního účtu a odliší ho od stejnojmenného doménového.');
  x('Skript pro účet', 'Najdi chybné řádky ve skriptu, který má vytvořit místní účet a přidat ho mezi správce.', [
    '$heslo = Read-Host \'Heslo\' -AsSecureString',
    'New-LocalUser -Name \'pepa\' -Password \'Heslo123\'',
    'Add-LocalGroupMember -Group \'Administrators\' -Member \'pepa\'',
    'Get-LocalUser -Group \'Administrators\'',
  ], [1, 3], { 1: 'New-LocalUser -Name \'pepa\' -Password $heslo', 3: 'Get-LocalGroupMember -Group \'Administrators\'' }, '-Password potřebuje SecureString ($heslo); členy skupiny vypíše Get-LocalGroupMember.');

  topic = 'PowerShell v praxi';
  c('Spuštění jako správce', 'Kdy je potřeba spustit Windows PowerShell jako správce?', ['Vždy, i pro pouhé Get-Help', 'Při změnách nastavení systému', 'Nikdy, PowerShell práva nepotřebuje', 'Jen při psaní komentářů do skriptu'], 1, 'Čtení údajů (Get-NetAdapter) obvykle stačí bez správce, změny ne.');
  p('PowerShell v praxi', 'Přiřaď příkaz k jeho účelu.', [
    ['Disable-NetAdapter Ethernet', 'vypne adaptér Ethernet'],
    ['Enable-NetAdapter Ethernet', 'zapne adaptér Ethernet'],
    ['Get-Help Get-NetAdapter', 'zobrazí nápovědu k příkazu'],
    ['Update-Help', 'stáhne místní nápovědu'],
    ['Get-BitLockerVolume', 'zobrazí stav BitLockeru'],
    ['manage-bde -status', 'stav šifrování disku z příkazového řádku'],
  ], 'Disable-NetAdapter vyžaduje oprávnění správce a potvrzení.', 3);
  c('Tabulátor', 'K čemu slouží klávesa Tab v konzoli PowerShellu?', ['Odsadí aktuální řádek', 'Doplní rozepsaný příkaz', 'Spustí celý skript', 'Ukončí konzoli PowerShellu'], 1, 'Opakovaný stisk prochází možná pokračování.');
  c('Roura na české klávesnici', 'Jak napíšeš znak roury | na české klávesnici?', ['Shift + 7', 'Pravý Alt + W', 'Ctrl + P', 'Alt + 124 vždy'], 1, 'Pravý Alt (AltGr) + W.');
  s('Vypnutý adaptér', 'Správce na vzdáleném počítači připojeném jen kabelem spustí Disable-NetAdapter Ethernet a potvrdí ho.', 'Co se stane?', ['Nic, příkaz jen vypíše adaptér', 'Přeruší se síťové spojení', 'Adaptér se jen krátce restartuje', 'Vypne se pouze Wi-Fi adaptér'], 1, 'Po zakázání používaného adaptéru síť nefunguje – vzdáleně ho pak znovu nezapneš.');
  c('BitLocker výstup', 'Které vlastnosti sleduješ ve výstupu Get-BitLockerVolume | Format-List?', ['CPU, WorkingSet a Handles', 'LockStatus a ProtectionStatus', 'MacAddress a LinkSpeed', 'SID, RID a ObjectClass'], 1, 'Ukazují stav šifrování, uzamčení a ochranné prvky disku.');
  c('Rozšíření VS Code', 'Co přidá do VS Code rozšíření PowerShell od Microsoftu?', ['Nový operační systém do editoru', 'Doplňování, zvýraznění a ladění', 'Antivirovou kontrolu skriptů', 'Správu disků a oddílů'], 1, 'Terminál a rozšíření editoru plní různé úlohy.');
  p('Klávesy ve VS Code', 'Přiřaď klávesu k akci při práci se skriptem PowerShellu ve VS Code.', [
    ['F5', 'spuštění s laděním'],
    ['Ctrl+F5', 'spuštění bez ladění'],
    ['F8', 'spuštění označeného kódu'],
  ], 'Skripty se ukládají s příponou .ps1.');
  c('PowerShell ISE', 'Co Microsoft doporučuje pro psaní nových skriptů PowerShellu místo ISE?', ['Poznámkový blok s příponou .ps1', 'VS Code s rozšířením PowerShell', 'Microsoft Word s makry', 'Příkazový řádek CMD'], 1, 'ISE dostává jen bezpečnostní opravy a podporuje Windows PowerShell do 5.1.');

  topic = 'Hromadné účty a CSV';
  c('Spojení v Excelu', 'V A2 je příjmení, v B2 jméno. Který vzorec vytvoří přihlašovací jméno ve tvaru prijmeni.jmeno?', ['=A2+"."+B2', '=A2&"."&B2', '=SUM(A2;B2)', '=A2.B2'], 1, '& je operátor zřetězení, "." vloží tečku. Diakritiku vzorec neodstraní.');
  c('Počáteční hesla', 'Proč má každý nový účet dostat jiné počáteční heslo?', ['Kvůli rychlejšímu importu CSV', 'Jinak jde otevřít cizí účet', 'Windows stejná hesla neuloží', 'Kvůli menší velikosti CSV'], 1, 'Dokud si uživatel heslo nezmění, mohl by jeho účet zneužít kdokoli, kdo zná společné heslo.');
  c('Zkušební data', 'Proč se při vývoji skriptu pro hromadné účty používají fiktivní osoby?', ['Fiktivní jména jsou kratší', 'Kvůli ochraně údajů skutečných žáků', 'Skripty skutečná jména neumí', 'Kvůli vyšší rychlosti Excelu'], 1, 'Např. Fake Name Generator (Bulk) s českými jmény; vygenerovaná hesla nepoužívej pro skutečné účty.');
  c('Oddělovač CSV', 'Co musíš při uložení tabulky jako CSV zkontrolovat kvůli následnému importu?', ['Barvu a ohraničení buněk', 'Oddělovač a české znaky', 'Šířku jednotlivých sloupců', 'Název listu v sešitu'], 1, 'CSV ukládá jen řádky a pole, ne formátování sešitu.');
  s('Diakritika', 'Vzorec =A2&"."&B2 spojil Novák a Petr.', 'Jaký bude výsledek?', ['novak.petr', 'Novák.Petr', 'NovakPetr', 'Novák Petr'], 1, 'Zřetězení zachová přesné znaky včetně velkých písmen a diakritiky; úpravu je nutné řešit zvlášť.');

  topic = 'Mark of the Web';
  c('ADS', 'Co jsou alternativní datové proudy (ADS) v NTFS?', ['Zálohy souborů v cloudu', 'Další pojmenovaná data souboru', 'Stínové kopie celého disku', 'Šifrované oddíly disku'], 1, 'Soubor může mít kromě hlavního obsahu i pojmenované proudy, např. Zone.Identifier.');
  c('Zone.Identifier', 'Co ukládají Windows do proudu Zone.Identifier staženého souboru?', ['Heslo pro otevření souboru', 'Zónu původu (Mark of the Web)', 'Původní velikost souboru', 'Podpis antivirové kontroly'], 1, 'Může obsahovat i adresu zdroje, ale není zárukou celé historie souboru.');
  c('dir v PowerShellu', 'Proč příkaz dir /r nefunguje stejně v PowerShellu?', ['PowerShell vůbec neumí číst NTFS', 'dir je tam alias Get-ChildItem', 'Příkaz funguje jen v Linuxu', 'Vyžaduje vždy práva správce'], 1, 'Zápis dir /r patří do CMD.');
  o('Odblokování souboru', 'Seřaď kroky odblokování důvěryhodného souboru staženého z internetu.', ['Pravým tlačítkem otevřít Vlastnosti souboru', 'Na kartě Obecné zaškrtnout Odblokovat', 'Potvrdit Použít / OK', 'Ověřit dir /r, že Zone.Identifier zmizel'], 'Odblokování odstraní označení původu, ale nepotvrzuje, že soubor je bezpečný.');
  c('Chráněné zobrazení', 'Proč Excel otevře tabulku staženou z internetu v chráněném zobrazení?', ['Soubor je poškozený', 'Soubor nese Mark of the Web', 'Excel nemá platnou licenci', 'Soubor je příliš velký'], 1, 'U souborů s makry může původ z internetu vést i k zablokování maker.');
  c('Odblokování a bezpečnost', 'Co odblokování souboru ve Vlastnostech skutečně udělá?', ['Prověří soubor antivirem', 'Odstraní označení původu', 'Zašifruje obsah souboru', 'Přesune soubor do karantény'], 1, 'Neříká nic o tom, zda soubor neobsahuje škodlivý obsah.');

  return list;
})();
