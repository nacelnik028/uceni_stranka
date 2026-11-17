# Databáze – MS SQL Server (Notion ZDB)

Podklad: Notion, Zápisy 2.D (2026/2027) → ZDB → [MS SQL Server](https://app.notion.com/p/3edbceb1e4138067b658f732ef45c88f) a podstránka Systémové databáze SQL Serveru. Načteno 17. 11. 2026.

Runtime: `data/zdb_sql_server_exercises.js`, pole `DATABASE_2_EXERCISES`, předmět **Databáze**, téma *MS SQL Server*.

Stránka „Základy databází a SQL“ odpovídá stávajícímu podkladu `zdb.md` a jeho 35 úlohám (téma Základy databází). V zápisu v Notionu je u DML uvedeno „GRANT, REVOKE“ – tyto příkazy patří do **DCL**; DML jsou INSERT, UPDATE, DELETE. Úlohy používají správné rozdělení.

## Klíčové body

- SQL Server je RDBMS (systém řízení báze dat); konkurence Oracle, PostgreSQL, MySQL.
- Edice: Express (bezplatná, výuka a malé aplikace; LocalDB je odlehčená), Standard (firmy), Web (webhosting), Developer (funkce Enterprise, jen vývoj a testování), Enterprise (prémiová, neomezená virtualizace).
- Služby: Database Engine (nezbytná; soubory .mdf, .ndf, log .ldf), SQL Server Agent (plánované úlohy – zálohy, údržba), SQL Server Browser (UDP 1434, pojmenované instance a dynamické porty). Database Engine výchozí instance 1433/TCP.
- Systémové databáze: master (konfigurace instance, loginy, seznam databází – bez ní se instance nespustí), model (šablona pro CREATE DATABASE), tempdb (dočasné objekty, po restartu znovu vytvořena, nezálohuje se), msdb (úlohy Agentu, historie záloh).
- Login (přihlášení k instanci) × databázový uživatel (přístup do databáze).
