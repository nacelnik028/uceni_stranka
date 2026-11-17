# Operační systémy – 2. ročník (Notion OSY)

Podklad: Notion, Zápisy 2.D (2026/2027) → [OSY](https://app.notion.com/p/3e4bceb1e41380dcab38cf918ed3e8d8). Načteno 17. 11. 2026. Původní modul z OrgPadu zůstává v `data/operacni_systemy_exercises.js`.

Runtime: `data/osy_2_rocnik_exercises.js`, pole `OPERATING_SYSTEMS_2_EXERCISES`, předmět **Operační systémy**.

| Stránka v Notionu | Téma v procvičovně |
|---|---|
| CMD – příkazy | Příkazy CMD |
| Uživatelské účty a skupiny → Místní a doménové účty, SAM; Správa v MMC | Místní a doménové účty |
| net user a net localgroup; Správa účtů v PowerShellu (New-LocalUser, SID, místní skupiny) | Účty v příkazovém řádku a PowerShellu |
| PowerShell – praxe a příkazy; PowerShell ve VS Code | PowerShell v praxi |
| Hromadné zakládání účtů – Excel a CSV | Hromadné účty a CSV |
| Soubory z internetu – NTFS a Mark of the Web | Mark of the Web |

Stránku „PowerShell – teorie a objekty“ pokrývá už stávající modul (témata Shell a objektový PowerShell, Pipeline, CSV a nápověda).

## Klíčové body

- CMD: tree, tree /f, rmdir /S, del, copy, xcopy /e, net user jmeno * /add, dir /r.
- Účty: místní (SAM, C:\Windows\System32\config\SAM) × doménové (AD DS, doménový řadič); přihlášení `.\uzivatel`; Entra ID je cloud; lusrmgr.msc, MMC a snap-in, uložení .msc; právo × oprávnění.
- net localgroup (místní) × net group (doména); New-LocalUser (sloveso-podstatné jméno), -Password = SecureString (ConvertTo-SecureString / Read-Host -AsSecureString), -NoPassword; Remove-LocalUser × net user /delete.
- Get-LocalUser | Format-List * (Enabled, PasswordLastSet, AccountExpires, SID, ObjectClass); SID/RID: Administrator 500, Guest 501, nové účty 1000+; skupina Administrators S-1-5-32-544; Sysprep generalize; Get-LocalGroupMember, Add-LocalGroupMember.
- PowerShell: spouštět jako správce pro změny, Tab doplňování, roura = pravý Alt + W, Disable/Enable-NetAdapter, Get-Help, Update-Help, Get-BitLockerVolume, manage-bde -status; VS Code + rozšíření PowerShell, .ps1, F5 / Ctrl+F5 / F8; ISE jen opravy.
- Hromadné účty: =A2&"."&B2, individuální počáteční hesla, fiktivní data (Fake Name Generator), CSV a oddělovač.
- Mark of the Web: ADS, Zone.Identifier, dir /r (CMD), chráněné zobrazení, Vlastnosti → Odblokovat.
