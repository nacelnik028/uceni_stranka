// Databáze 2. ročník – Notion ZDB, MS SQL Server. Podklad: materialy/databaze/zdroj/notion-ms-sql-server.md
window.DATABASE_2_EXERCISES = (() => {
  const list = [];
  const topic = 'MS SQL Server';
  let seq = 0;
  const SUB = { choice: 'Pojmy', scenario: 'Praktické situace', multi: 'Pojmy', match: 'Souvislosti', classification: 'Třídění', compare: 'Porovnání', cloze: 'Doplňování', spot: 'Najdi chybu', number: 'Hodnoty' };
  const add = (type, title, question, fields, solution, difficulty = 2) => list.push({
    id: `zdb2-${String(++seq).padStart(3, '0')}`, subject: 'Databáze', topic, subtopic: SUB[type] || 'Procvičování',
    type, title, question, ...fields, solution, difficulty, tags: ['ZDB', 'zápisy z Notionu'],
  });
  const c = (title, question, choices, correct, solution, d = 2) => add('choice', title, question, { choices, answer: choices[correct] }, solution, d);
  const s = (title, scenario, question, choices, correct, solution, d = 3) => add('scenario', title, question, { scenario, choices, answer: choices[correct] }, solution, d);
  const m = (title, question, choices, correct, solution, d = 3) => add('multi', title, question, { choices, answers: correct.map(i => choices[i]) }, solution, d);
  const p = (title, question, pairs, solution, d = 2) => add('match', title, question, { pairs: pairs.map(([left, right]) => ({ left, right })) }, solution, d);
  const v = (title, question, leftLabel, rightLabel, criteria, solution, d = 2) => add('compare', title, question, { leftLabel, rightLabel, criteria: criteria.map(([text, answer], i) => ({ id: `k${i + 1}`, text, answer })) }, solution, d);
  const x = (title, question, segments, wrong, corrections, solution, d = 3) => add('spot', title, question, { segments, wrong, corrections }, solution, d);
  const n = (title, question, answer, solution, d = 2) => add('number', title, question, { answer: String(answer) }, solution, d);

  c('RDBMS', 'Čím je Microsoft SQL Server?', ['Tabulkovým procesorem jako Excel', 'Systémem řízení relační databáze', 'Webovým prohlížečem pro SQL', 'Samostatným programovacím jazykem'], 1, 'Umožňuje správu dat, analýzy a business intelligence.');
  m('Konkurence', 'Které systémy jsou konkurenty MS SQL Serveru?', ['Oracle Database', 'PostgreSQL', 'Microsoft Excel', 'MySQL', 'Adobe Photoshop'], [0, 1, 3], 'Oracle, PostgreSQL i MySQL jsou relační databázové systémy.');
  p('Edice SQL Serveru', 'Přiřaď edici SQL Serveru k jejímu určení.', [
    ['Express', 'bezplatná, pro výuku a malé aplikace'],
    ['Standard', 'vyvážený výkon a zabezpečení pro firmy'],
    ['Web', 'pro webhostingy a webové aplikace'],
    ['Developer', 'plné funkce, jen pro vývoj a testování'],
    ['Enterprise', 'prémiová, nejvyšší zátěž, neomezená virtualizace'],
  ], 'Express má i odlehčenou variantu LocalDB.', 3);
  s('Produkce s Developer', 'Firma chce na ostrém serveru s daty zákazníků provozovat edici Developer, protože má všechny funkce Enterprise zdarma.', 'Je to v pořádku?', ['Ano, Developer je určená pro produkci', 'Ne, licence Developer je jen pro vývoj a testování', 'Ano, pokud má méně než 10 uživatelů', 'Ne, Developer nemá žádné funkce'], 1, 'Developer obsahuje funkce Enterprise, ale licence nepovoluje produkční prostředí.');
  c('LocalDB', 'Co je SQL Server Express LocalDB?', ['Placená cloudová edice', 'Odlehčená verze edice Express', 'Záložní služba Agentu', 'Systémová databáze'], 1, 'Hodí se pro vývojáře a malé lokální aplikace.');
  c('Database Engine', 'Která služba je pro SQL Server nezbytná – bez ní databázová instance nefunguje?', ['SQL Server Agent', 'SQL Server Database Engine', 'SQL Server Browser', 'SQL Server Reporting'], 1, 'Database Engine ukládá, spravuje, dotazuje a zabezpečuje databáze.');
  c('SQL Server Agent', 'K čemu slouží služba SQL Server Agent?', ['K ukládání dat do tabulek', 'K plánování záloh a údržby', 'K překladu SQL do Pythonu', 'K připojení serveru k Wi-Fi'], 1, 'Agent musí běžet, pokud chceš plánovat jobs; informace ukládá do msdb.');
  n('Port Browseru', 'Na kterém UDP portu naslouchá služba SQL Server Browser?', 1434, 'Browser pomáhá klientům najít port pojmenované instance. Database Engine výchozí instance používá 1433/TCP.');
  m('Kdy je Browser potřeba', 'Ve kterých situacích je služba SQL Server Browser potřeba?', ['Při použití pojmenovaných instancí (named instances)', 'Při dynamických portech instancí', 'Když klienti nemají port nastavený ručně', 'Když používáš jen výchozí instanci na pevném portu se zadaným portem', 'Pro ukládání dat do tabulek'], [0, 1, 2], 'Browser poskytuje informace o dostupných instancích a jejich portech.');
  p('Přípony souborů', 'Přiřaď příponu k typu souboru databáze SQL Serveru.', [
    ['.mdf', 'primární datový soubor'],
    ['.ndf', 'sekundární datový soubor'],
    ['.ldf', 'soubor transakčního logu'],
  ], 'Datové soubory .mdf a .ndf, log .ldf.', 3);
  p('Systémové databáze', 'Přiřaď systémovou databázi k její úloze.', [
    ['master', 'konfigurace instance, loginy a seznam databází'],
    ['model', 'šablona pro nově vytvářené databáze'],
    ['tempdb', 'dočasné tabulky a mezivýsledky dotazů'],
    ['msdb', 'úlohy Agentu a historie záloh'],
  ], 'Trvalá aplikační data patří do uživatelských databází.', 3);
  c('Bez master', 'Co se stane, když není dostupná databáze master?', ['Nic, SQL Server ji nepotřebuje', 'Instance SQL Serveru se nespustí', 'Zmizí jen dočasné tabulky', 'Nefungují pouze zálohy'], 1, 'master obsahuje informace potřebné ke spuštění instance.');
  s('Upravená šablona', 'Správce přidá do databáze model tabulku Log a pak vytvoří příkazem CREATE DATABASE novou databázi Sklad.', 'Co bude obsahovat databáze Sklad?', ['Nic, model se nepoužívá', 'Také tabulku Log převzatou z model', 'Kopii všech dat z master', 'Jen dočasné tabulky z tempdb'], 1, 'Nová databáze vychází z model – úpravy se projeví v později vytvořených databázích.');
  c('tempdb po restartu', 'Co se stane s obsahem tempdb po restartu instance?', ['Zůstane beze změny', 'Vytvoří se znovu, data zmizí', 'Přesune se do databáze master', 'Automaticky se zazálohuje'], 1, 'Zálohování a obnova tempdb nejsou podporovány.');
  v('Zálohovat?', 'Rozhodni, zda systémová databáze patří do plánu zálohování.', 'Zálohovat', 'Nezálohuje se', [
    ['master', 'left'],
    ['model', 'left'],
    ['msdb', 'left'],
    ['tempdb', 'right'],
  ], 'tempdb je znovu vytvářený dočasný prostor, proto se nezálohuje.');
  c('Login a uživatel', 'Jaký je rozdíl mezi loginem a databázovým uživatelem?', ['Žádný, jde o totéž', 'Login = instance, uživatel = databáze', 'Uživatel se ukládá do tempdb', 'Login platí jen pro jednu tabulku'], 1, 'Loginy jsou v master; databázový uživatel bývá navázaný na login.');
  x('Tvrzení o SQL Serveru', 'Najdi chybná tvrzení o SQL Serveru.', ['Edice Developer', 'je určená pro produkční provoz.', 'tempdb', 'se po restartu znovu vytvoří.', 'SQL Server Browser', 'naslouchá na TCP portu 1433.'], [1, 5], { 1: 'je jen pro vývoj a testování.', 5: 'naslouchá na UDP portu 1434.' }, '1433/TCP je výchozí port Database Engine, Browser používá 1434/UDP.');
  c('Služba', 'Proč SQL Server běží jako služba?', ['Aby šel spustit jen ručně', 'Aby trvale běžel na pozadí', 'Aby nepotřeboval žádnou paměť', 'Aby fungoval bez operačního systému'], 1, 'Služby běží 24/7 a aplikace je využívají bez vlastní implementace.');

  return list;
})();
