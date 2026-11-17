# Počítačové sítě – 2. ročník (Notion PSI)

Podklad: Notion, Zápisy 2.D (2026/2027) → [PSI](https://app.notion.com/p/3d6bceb1e41380c98e65f535e1b94f00). Načteno 17. 11. 2026. Původní moduly sítí (1. ročník, canvas) zůstávají v `data/network_exercises.js`.

Runtime: `data/site_2_rocnik_exercises.js`, pole `NETWORK_2_EXERCISES`, předmět **Počítačové sítě**.

| Stránka v Notionu (včetně podstránek) | Téma v procvičovně |
|---|---|
| Síťové vrstvy a Ethernet; Ethernet – EtherType, VLAN tag, FCS a PoE | Ethernetový rámec |
| ARP – komunikace, cache a podvržení | ARP |
| Čtení Ethernetu, IPv4 a UDP na příkladu DHCP; Ping ve Wiresharku | Zapouzdření a ping ve Wiresharku |
| DHCP – adresní plán a konfigurace; Simulace DHCP a diagnostika klienta | DHCP |
| Domácí síť – připojení, Wi-Fi a síť pro hosty; Vzdálená pomoc ve Windows | Domácí síť a vzdálená pomoc |
| Síťové adaptéry a IP konfigurace ve Windows; IP rozhraní – metrika a MTU | Síťové adaptéry ve Windows |
| Porty a sockety; Diagnostika spojení a efemerálních portů | Porty a sockety |
| Switche – propojení LAN a zabezpečení portů; VLAN a porty; MAC tabulka | Switche, VLAN a MAC tabulka |

Podstránky s HEX výpisy (72 B / 64 B) slouží jako ukázky; otázky z nich přebírají jen principy (pole rámce, převod IPv4 do hex).

## Klíčové hodnoty

- Ethernet II: preambule 7 B, SFD 1 B (10101011), MAC 6+6 B, EtherType 2 B, data 46–1500 B, FCS 4 B; MAC rámec 64–1518 B; IFG 96 bitových intervalů.
- EtherType: 0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6, 0x8100 VLAN tag, 0x8863/0x8864 PPPoE. Hodnota ≤ 1500 = délka (802.3), ≥ 1536 = EtherType.
- ARP: Request broadcast FF:FF:FF:FF:FF:FF, Operation 1/2; `arp -a`, `arp -d`; gratuitous ARP; ARP spoofing → MITM/DoS; TLS chrání obsah, ne dostupnost.
- Ping: ICMP Echo Request (type 8) / Reply (type 0), IPv4 Protocol 1, Windows 32 B dat, `-l` mění velikost dat; filtr `icmp or arp`.
- DHCP: DORA, UDP 67 server / 68 klient, Discover 0.0.0.0 → 255.255.255.255; `ipconfig /all /release /renew`; statické adresy mimo pool; příklad 192.168.10.0/24, pool .101–.200.
- Adaptéry: Get-NetAdapter, Format-List, Get-Member, Get-NetIPConfiguration, Get-NetIPAddress, getmac /v, netsh; metrika (nižší = preferovaná, nejdřív longest prefix), MTU 1500 = IP paket; 127.0.0.1 loopback.
- Porty: 0–1023 / 1024–49151 / 49152–65535; HTTP 80, HTTPS 443, SSH 22, FTP 21, SMTP 25, SMB 445, IMAPS 993, SQL Server 1433/TCP a Browser 1434/UDP; socket, efemerální port, 4-/5-tuple; `netstat -ano`, stavy TCP, `ss -tulnp`; Windows 16 384 dynamických portů.
- Switche: učení ze zdrojové MAC, flooding neznámého unicastu ve VLAN, aging 300 s (Cisco), port security (maximum, sticky, shutdown/protect/restrict), running × startup config, access × trunk × uplink, VLAN = broadcastová doména, mezi VLAN router/L3 switch, metalika do 100 m.
