// Aktivní otázky – společný katalog
window.EXERCISES = [
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-001",
    "type": "choice",
    "title": "První prvek seznamu",
    "question": "Měj seznam: `seznam = [\"Karel\", \"Frank\", \"Jana\"]`. Co vypíše `print(seznam[0])`?",
    "choices": [
      "Karel",
      "Frank",
      "Jana"
    ],
    "answer": "Karel",
    "tags": [
      "Python",
      "seznamy",
      "indexování"
    ],
    "solution": "Indexování začíná nulou, takže seznam[0] je první prvek Karel."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-002",
    "type": "choice",
    "title": "Poslední prvek pomocí záporného indexu",
    "question": "Měj seznam: `seznam = [\"Karel\", \"Frank\", \"Jana\"]`. Co vypíše `print(seznam[-1])`?",
    "choices": [
      "Karel",
      "Frank",
      "Jana"
    ],
    "answer": "Jana",
    "tags": [
      "Python",
      "seznamy",
      "záporné indexy"
    ],
    "solution": "Záporný index -1 označuje poslední prvek seznamu, zde Janu."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-003",
    "type": "choice",
    "title": "Záporný index -2",
    "question": "Měj seznam: `seznam = [\"Karel\", \"Frank\", \"Jana\"]`. Co vypíše `print(seznam[-2])`?",
    "choices": [
      "Karel",
      "Frank",
      "Jana"
    ],
    "answer": "Frank",
    "tags": [
      "Python",
      "seznamy",
      "záporné indexy"
    ],
    "solution": "Index -2 označuje předposlední prvek, zde Franka."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-004",
    "type": "spot",
    "title": "Index mimo rozsah",
    "question": "Program skončí chybou `IndexError`. Klikni na řádek, který ji způsobí.",
    "hint": "Podívej se, od jakého čísla indexování začíná.",
    "tags": [
      "Python",
      "seznamy",
      "indexování"
    ],
    "solution": "Tříprvkový seznam má platné indexy 0, 1 a 2 (případně −1 až −3). Index 3 neexistuje, proto vznikne IndexError. Záporný index −1 je v pořádku – znamená poslední prvek.",
    "layout": "lines",
    "segments": [
      "seznam = [\"Karel\", \"Frank\", \"Jana\"]",
      "print(seznam[0])",
      "print(seznam[-1])",
      "print(seznam[3])",
      "print(len(seznam))"
    ],
    "wrong": [
      3
    ],
    "corrections": {
      "3": "print(seznam[2])"
    }
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-005",
    "type": "code",
    "title": "Přidej Janu",
    "question": "Začni s programem `studenti = [\"Karel\", \"Frank\"]`. Pomocí `append()` přidej \"Jana\" a vypiš celý seznam pomocí `print()`.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Frank\"]\n# Doplň řešení\n",
    "expectedOutput": "['Karel', 'Frank', 'Jana']",
    "solution": "studenti = [\"Karel\", \"Frank\"]\nstudenti.append(\"Jana\")\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "append",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-006",
    "type": "code",
    "title": "Nahraď Franka",
    "question": "Začni s programem `studenti = [\"Karel\", \"Frank\"]`. Nahraď pomocí indexu hodnotu \"Frank\" za \"Tomas\" a vypiš seznam.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Frank\"]\n# Doplň řešení\n",
    "expectedOutput": "['Karel', 'Tomas']",
    "solution": "studenti = [\"Karel\", \"Frank\"]\nstudenti[1] = \"Tomas\"\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "indexování",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-007",
    "type": "code",
    "title": "Odstraň Karla",
    "question": "Začni s programem `studenti = [\"Karel\", \"Frank\"]`. Pomocí `remove()` odstraň \"Karel\" a vypiš seznam.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Frank\"]\n# Doplň řešení\n",
    "expectedOutput": "['Frank']",
    "solution": "studenti = [\"Karel\", \"Frank\"]\nstudenti.remove(\"Karel\")\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "remove",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-008",
    "type": "code",
    "title": "Odstraň první prvek pomocí pop()",
    "question": "Začni s programem `studenti = [\"Karel\", \"Frank\"]`. Pomocí `pop(0)` odstraň první prvek a vypiš seznam.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Frank\"]\n# Doplň řešení\n",
    "expectedOutput": "['Frank']",
    "solution": "studenti = [\"Karel\", \"Frank\"]\nstudenti.pop(0)\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "pop",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-009",
    "type": "code",
    "title": "Append a insert dohromady",
    "question": "Začni s `cisla = [3, 5]`. Přidej pomocí `append(2)` číslo 2 a potom pomocí `insert(1, 4)` vlož číslo 4 na pozici 1. Vypiš seznam.",
    "language": "python",
    "starterCode": "cisla = [3, 5]\n# Doplň řešení\n",
    "expectedOutput": "[3, 4, 5, 2]",
    "solution": "cisla = [3, 5]\ncisla.append(2)\ncisla.insert(1, 4)\nprint(cisla)",
    "tags": [
      "Python",
      "seznamy",
      "append",
      "insert",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-010",
    "type": "code",
    "title": "Seřaď seznam",
    "question": "Začni s `cisla = [3, 5, 2]`. Přidej 4 pomocí `append()`, pak pomocí `sort()` seznam seřaď a vypiš ho.",
    "language": "python",
    "starterCode": "cisla = [3, 5, 2]\n# Doplň řešení\n",
    "expectedOutput": "[2, 3, 4, 5]",
    "solution": "cisla = [3, 5, 2]\ncisla.append(4)\ncisla.sort()\nprint(cisla)",
    "tags": [
      "Python",
      "seznamy",
      "sort",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-011",
    "type": "code",
    "title": "Obrať pořadí",
    "question": "Začni s `cisla = [3, 5, 2]`. Použij `reverse()` a vypiš seznam.",
    "language": "python",
    "starterCode": "cisla = [3, 5, 2]\n# Doplň řešení\n",
    "expectedOutput": "[2, 5, 3]",
    "solution": "cisla = [3, 5, 2]\ncisla.reverse()\nprint(cisla)",
    "tags": [
      "Python",
      "seznamy",
      "reverse",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-012",
    "type": "choice",
    "title": "Co udělá insert(1, 4)?",
    "question": "Co udělá příkaz `cisla.insert(1, 4)` se seznamem `cisla = [3, 5]`?",
    "choices": [
      "Vloží 4 na pozici 1",
      "Nahrazuje prvek na pozici 1",
      "Přidá 4 vždy na konec seznamu",
      "Seznam seřadí"
    ],
    "answer": "Vloží 4 na pozici 1",
    "tags": [
      "Python",
      "seznamy",
      "insert"
    ],
    "solution": "insert(index, hodnota) vloží prvek před položku na zadaném indexu. Z [3, 5] vznikne [3, 4, 5]."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-013",
    "type": "choice",
    "title": "Co udělá reverse()?",
    "question": "Co udělá `cisla.reverse()`?",
    "choices": [
      "Seřadí čísla od nejmenšího po největší",
      "Obrátí pořadí prvků v seznamu",
      "Odstraní poslední prvek",
      "Spočítá délku seznamu"
    ],
    "answer": "Obrátí pořadí prvků v seznamu",
    "tags": [
      "Python",
      "seznamy",
      "reverse"
    ],
    "solution": "reverse() obrátí stávající pořadí. Neřadí podle velikosti; například z [3, 5, 2] vznikne [2, 5, 3]."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-014",
    "type": "code",
    "title": "Prohoď Karla a Lukase",
    "question": "Začni s `studenti = [\"Karel\", \"Tomas\", \"Lukas\"]`. Prohoď pomocí přiřazení první a poslední prvek tak, aby vznikl seznam `[\"Lukas\", \"Tomas\", \"Karel\"]`, a seznam vypiš.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\n# Doplň řešení\n",
    "expectedOutput": "['Lukas', 'Tomas', 'Karel']",
    "solution": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\nstudenti[0], studenti[2] = studenti[2], studenti[0]\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "indexování",
      "prohazování",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-015",
    "type": "code",
    "title": "Pozdrav každého studenta",
    "question": "Začni s `studenti = [\"Karel\", \"Tomas\", \"Lukas\"]`. Pomocí `for` a `range` vypiš každého studenta ve tvaru „Ahoj Karel“, „Ahoj Tomas“, „Ahoj Lukas“, každý na novém řádku.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\n# Doplň řešení\n",
    "expectedOutput": "Ahoj Karel\nAhoj Tomas\nAhoj Lukas",
    "solution": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\nfor i in range(0, 3):\n    print(\"Ahoj \" + studenti[i])",
    "hint": "Materiál používá `for i in range(0, 3)` a potom `studenti[i]`.",
    "tags": [
      "Python",
      "seznamy",
      "for",
      "range",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-016",
    "type": "spot",
    "title": "Najdi chybu v práci se seznamem",
    "question": "Program skončí chybou `ValueError`. Klikni na řádek, který ji způsobí.",
    "hint": "Ověř, jestli hodnota, kterou chceš odstranit, v seznamu opravdu je.",
    "tags": [
      "Python",
      "seznamy",
      "len"
    ],
    "solution": "remove() odstraní první výskyt zadané hodnoty. Hodnota 10 v seznamu není, a proto Python vyhodí ValueError. append() přidá na konec a insert(0, 8) vloží na začátek – obojí je v pořádku.",
    "layout": "lines",
    "segments": [
      "cisla = [5, 2, 9, 1, 7]",
      "cisla.append(4)",
      "cisla.insert(0, 8)",
      "cisla.remove(10)",
      "print(len(cisla))"
    ],
    "wrong": [
      3
    ],
    "corrections": {
      "3": "cisla.remove(9)"
    },
    "difficulty": 3
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-017",
    "type": "code",
    "title": "Zkontroluj, jestli je Jana v seznamu",
    "question": "Napiš program pro `studenti = [\"Karel\", \"Tomas\", \"Lukas\"]`, který pomocí `if` a `in` vypíše přesně „Jana je v seznamu“, pokud je Jana v seznamu, jinak „Jana není v seznamu“.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\n# Doplň řešení\n",
    "expectedOutput": "Jana není v seznamu",
    "solution": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\nif \"Jana\" in studenti:\n    print(\"Jana je v seznamu\")\nelse:\n    print(\"Jana není v seznamu\")",
    "tags": [
      "Python",
      "seznamy",
      "in",
      "if",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-018",
    "type": "code",
    "title": "Použij not in",
    "question": "Napiš program pro `studenti = [\"Karel\", \"Tomas\", \"Lukas\"]`, který pomocí `not in` vypíše „Jana není v seznamu“, protože Jana v seznamu není.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\n# Doplň řešení\n",
    "expectedOutput": "Jana není v seznamu",
    "solution": "studenti = [\"Karel\", \"Tomas\", \"Lukas\"]\nif \"Jana\" not in studenti:\n    print(\"Jana není v seznamu\")",
    "tags": [
      "Python",
      "seznamy",
      "not in",
      "if",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-019",
    "type": "code",
    "title": "Spočítej nuly",
    "question": "Začni s `cisla = [4, 0, 7, 0, 2]`. Pomocí `count()` zjisti počet nul a vypiš přesně „Počet nul: 2“.",
    "language": "python",
    "starterCode": "cisla = [4, 0, 7, 0, 2]\n# Doplň řešení\n",
    "expectedOutput": "Počet nul: 2",
    "solution": "cisla = [4, 0, 7, 0, 2]\npocet_nul = cisla.count(0)\nprint(\"Počet nul:\", pocet_nul)",
    "tags": [
      "Python",
      "seznamy",
      "count",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-020",
    "type": "choice",
    "title": "count(0)",
    "question": "Co vrátí `cisla.count(0)` pro seznam `cisla = [4, 0, 7, 0, 2]`?",
    "choices": [
      "0",
      "1",
      "2",
      "4"
    ],
    "answer": "2",
    "tags": [
      "Python",
      "seznamy",
      "count"
    ],
    "solution": "count(0) spočítá výskyty hodnoty 0. Nula se v [4, 0, 7, 0, 2] vyskytuje dvakrát."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-021",
    "type": "code",
    "title": "Ověř počet nul",
    "question": "Začni s `cisla = [4, 0, 7, 0, 2]`. Pomocí `count()` a `if` vypiš přesně „Dvě nuly jsou v seznamu“, pokud je počet nul roven 2.",
    "language": "python",
    "starterCode": "cisla = [4, 0, 7, 0, 2]\npocet_nul = cisla.count(0)\n# Doplň podmínku a výpis\n",
    "expectedOutput": "Dvě nuly jsou v seznamu",
    "solution": "cisla = [4, 0, 7, 0, 2]\npocet_nul = cisla.count(0)\nif pocet_nul == 2:\n    print(\"Dvě nuly jsou v seznamu\")",
    "tags": [
      "Python",
      "seznamy",
      "count",
      "if",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-022",
    "type": "number",
    "title": "Kolik prvků má cisla?",
    "question": "Pro `cisla = [5, 2, 9, 1, 7]` určete výsledek `len(cisla)`.",
    "answer": "5",
    "tags": [
      "Python",
      "seznamy",
      "len"
    ],
    "solution": "len(cisla) počítá prvky, nikoli jejich hodnoty. Seznam [5, 2, 9, 1, 7] má pět prvků."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-023",
    "type": "number",
    "title": "Součet seznamu",
    "question": "Pro `cisla = [5, 2, 9, 1, 7]` určete výsledek `sum(cisla)`.",
    "answer": "24",
    "tags": [
      "Python",
      "seznamy",
      "sum"
    ],
    "solution": "sum(cisla) sečte všechny hodnoty: 5 + 2 + 9 + 1 + 7 = 24."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-024",
    "type": "number",
    "title": "Nejmenší číslo",
    "question": "Pro `cisla = [5, 2, 9, 1, 7]` určete výsledek `min(cisla)`.",
    "answer": "1",
    "tags": [
      "Python",
      "seznamy",
      "min"
    ],
    "solution": "min(cisla) vrátí nejmenší hodnotu seznamu, tedy 1. Nejde o první položku, která má hodnotu 5."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-025",
    "type": "number",
    "title": "Největší číslo",
    "question": "Pro `cisla = [5, 2, 9, 1, 7]` určete výsledek `max(cisla)`.",
    "answer": "9",
    "tags": [
      "Python",
      "seznamy",
      "max"
    ],
    "solution": "max(cisla) vrátí největší hodnotu seznamu, tedy 9."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-026",
    "type": "code",
    "title": "Použij sorted()",
    "question": "Začni s `cisla = [5, 2, 9, 1, 7]`. Pomocí `sorted()` vypiš seznam seřazený od nejmenšího po největší.",
    "language": "python",
    "starterCode": "cisla = [5, 2, 9, 1, 7]\n# Doplň řešení\n",
    "expectedOutput": "[1, 2, 5, 7, 9]",
    "solution": "cisla = [5, 2, 9, 1, 7]\nprint(sorted(cisla))",
    "tags": [
      "Python",
      "seznamy",
      "sorted",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-027",
    "type": "code",
    "title": "Vypiš všechny základní funkce",
    "question": "Pro `cisla = [5, 2, 9, 1, 7]` napiš program, který vypíše délku seznamu, součet, nejmenší číslo, největší číslo a seřazený seznam.",
    "language": "python",
    "starterCode": "cisla = [5, 2, 9, 1, 7]\n# Doplň řešení\n",
    "expectedOutput": "5\n24\n1\n9\n[1, 2, 5, 7, 9]",
    "solution": "cisla = [5, 2, 9, 1, 7]\nprint(len(cisla))\nprint(sum(cisla))\nprint(min(cisla))\nprint(max(cisla))\nprint(sorted(cisla))",
    "hint": "Použij `len()`, `sum()`, `min()`, `max()` a `sorted()`.",
    "tags": [
      "Python",
      "seznamy",
      "len",
      "sum",
      "min",
      "max",
      "sorted",
      "kód"
    ]
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-028",
    "type": "choice",
    "title": "sort vs. sorted",
    "question": "Které tvrzení správně popisuje rozdíl mezi `sort()` a `sorted()`?",
    "choices": [
      "sorted() mění původní seznam, sort() vrátí nový seřazený seznam",
      "sort() mění původní seznam, sorted() vrátí nový seřazený seznam",
      "Obě funkce mění původní seznam, liší se jen způsobem zápisu",
      "Obě vrátí nový seznam, sort() ale vždy řadí sestupně"
    ],
    "answer": "sort() mění původní seznam, sorted() vrátí nový seřazený seznam",
    "tags": [
      "Python",
      "seznamy"
    ],
    "solution": "sort() mění původní seznam a vrací None. sorted(cisla) vytvoří nový seřazený seznam a původní pořadí ponechá."
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-029",
    "type": "cloze",
    "title": "Metody seznamů v Pythonu",
    "question": "Doplň ke každému popisu správnou metodu seznamu.",
    "hint": "Rozliš, které metody prvky přidávají, které odebírají a které jen zjišťují informaci.",
    "tags": [
      "Python",
      "seznamy",
      "opakování"
    ],
    "solution": "append() – přidá na konec; insert(i, x) – vloží na pozici i; remove(x) – smaže první výskyt x; pop() – odebere a vrátí (bez argumentu poslední) prvek; reverse() – obrátí pořadí; count(x) – počet výskytů x. Funkce len(), sum(), min(), max() a sorted() nejsou metody, volají se se seznamem jako argumentem.",
    "cloze": "{{append}} přidá prvek na konec seznamu, {{insert}} vloží prvek na zadanou pozici a {{remove}} odstraní první výskyt zadané hodnoty. {{pop}} odebere prvek a zároveň ho vrátí, {{reverse}} obrátí pořadí prvků a {{count}} spočítá, kolikrát se hodnota v seznamu vyskytuje.",
    "gaps": [
      {
        "id": "append",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "append()"
      },
      {
        "id": "insert",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "insert()"
      },
      {
        "id": "remove",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "remove()"
      },
      {
        "id": "pop",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "pop()"
      },
      {
        "id": "reverse",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "reverse()"
      },
      {
        "id": "count",
        "options": [
          "append()",
          "insert()",
          "remove()",
          "pop()",
          "reverse()",
          "count()"
        ],
        "answer": "count()"
      }
    ],
    "difficulty": 2
  },
  {
    "subject": "Programování",
    "topic": "Python",
    "subtopic": "Seznamy",
    "id": "seznamy-030",
    "type": "code",
    "title": "Miniúloha – uprav seznam",
    "question": "Začni s `studenti = [\"Karel\", \"Frank\"]`. Přidej Janu pomocí `append()`, nahraď Franka za Tomase, odeber Karla pomocí `remove()` a nakonec vypiš výsledný seznam.",
    "language": "python",
    "starterCode": "studenti = [\"Karel\", \"Frank\"]\n# Doplň postupně všechny kroky\n",
    "expectedOutput": "['Tomas', 'Jana']",
    "solution": "studenti = [\"Karel\", \"Frank\"]\nstudenti.append(\"Jana\")\nstudenti[1] = \"Tomas\"\nstudenti.remove(\"Karel\")\nprint(studenti)",
    "tags": [
      "Python",
      "seznamy",
      "append",
      "remove",
      "indexování",
      "kód"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-001",
    "type": "text",
    "autoGrade": true,
    "title": "Systém Windows a osobní počítače",
    "question": "Kdo je spoluzakladatelem Microsoftu a je spojen s vývojem osobních počítačů a systému Windows?",
    "answer": "Bill Gates",
    "solution": "01 Bill Gates — Microsoft — spoluzakladatel Microsoftu, zásadní osobnost osobních počítačů a systému Windows.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-002",
    "type": "text",
    "autoGrade": true,
    "title": "Vývoj Macu, iPodu a iPhonu",
    "question": "Která osobnost je spoluzakladatelem Applu a výrazně ovlivnila vývoj Macu, iPodu a iPhonu?",
    "answer": "Steve Jobs",
    "solution": "02 Steve Jobs — Apple — spoluzakladatel Applu, výrazně ovlivnil vývoj Macu, iPodu a iPhonu.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-003",
    "type": "text",
    "autoGrade": true,
    "title": "Technický tvůrce prvních počítačů Apple",
    "question": "Kdo je spoluzakladatelem Applu a technickým tvůrcem prvních počítačů Apple?",
    "answer": "Steve Wozniak",
    "solution": "03 Steve Wozniak — Apple — spoluzakladatel Applu a technický tvůrce prvních počítačů Apple.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-004",
    "type": "text",
    "autoGrade": true,
    "title": "Autor linuxového jádra",
    "question": "Kdo je autorem linuxového jádra, na kterém běží velká část serverů a dalších zařízení?",
    "answer": "Linus Torvalds",
    "solution": "04 Linus Torvalds — Linux — autor linuxového jádra, na kterém běží velká část serverů a dalších zařízení.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-005",
    "type": "text",
    "autoGrade": true,
    "title": "Základy webu (WWW, HTML a HTTP)",
    "question": "Kdo vytvořil základy webu, zejména WWW, HTML a HTTP?",
    "answer": "Tim Berners-Lee",
    "solution": "05 Tim Berners-Lee — World Wide Web — vytvořil základy webu, zejména WWW, HTML a HTTP.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-006",
    "type": "text",
    "autoGrade": true,
    "title": "Internetové vyhledávání a Google",
    "question": "Kdo je spoluzakladatelem Googlu a jednou z klíčových osobností internetového vyhledávání?",
    "answer": "Larry Page",
    "solution": "06 Larry Page — Google — spoluzakladatel Googlu a jedna z klíčových osobností internetového vyhledávání.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-007",
    "type": "text",
    "autoGrade": true,
    "title": "Zakladatel sociální sítě Facebook",
    "question": "Kdo je zakladatelem Facebooku, jedné z největších sociálních sítí?",
    "answer": "Mark Zuckerberg",
    "solution": "07 Mark Zuckerberg — Facebook / Meta — zakladatel Facebooku, jedné z největších sociálních sítí.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-008",
    "type": "text",
    "autoGrade": true,
    "title": "Zakladatel Amazonu a cloudu AWS",
    "question": "Kdo je zakladatelem Amazonu, přičemž AWS patří mezi největší cloudové platformy světa?",
    "answer": "Jeff Bezos",
    "solution": "08 Jeff Bezos — Amazon / AWS — zakladatel Amazonu; AWS patří mezi největší cloudové platformy světa.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-009",
    "type": "text",
    "autoGrade": true,
    "title": "Grafické karty a hardware pro AI",
    "question": "Kdo je spoluzakladatelem a šéfem firmy NVIDIA, která vyvíjí grafické procesory a technologie pro AI?",
    "answer": "Jensen Huang",
    "solution": "09 Jensen Huang — NVIDIA — spoluzakladatel a šéf NVIDIA, firmy zásadní pro grafické karty a dnešní AI.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-010",
    "type": "text",
    "autoGrade": true,
    "title": "Šéf OpenAI a tvůrce ChatGPT",
    "question": "Kdo je šéfem OpenAI, firmy stojící za ChatGPT a významnými modely generativní AI?",
    "answer": "Sam Altman",
    "solution": "10 Sam Altman — OpenAI — šéf OpenAI, firmy stojící za ChatGPT a významnými modely generativní AI.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-011",
    "type": "text",
    "autoGrade": true,
    "title": "Spoluzakladatel PayPalu a Palantiru",
    "question": "Kdo je spoluzakladatelem PayPalu a Palantiru (firmy vyvíjející software pro analýzu velkého množství dat)?",
    "answer": "Peter Thiel",
    "solution": "11 Peter Thiel — PayPal / Palantir — spoluzakladatel PayPalu a Palantiru; Palantir vyvíjí software pro analýzu velkého množství dat.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-012",
    "type": "text",
    "autoGrade": true,
    "title": "Elektromobily, kosmonautika a umělá inteligence",
    "question": "Který technologický podnikatel je spojený s elektromobily, kosmonautikou a umělou inteligencí (Tesla / SpaceX / xAI)?",
    "answer": "Elon Musk",
    "solution": "12 Elon Musk — Tesla / SpaceX / xAI — technologický podnikatel spojený s elektromobily, kosmonautikou a umělou inteligencí.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-013",
    "type": "text",
    "autoGrade": true,
    "title": "Tvůrce programovacího jazyka Python",
    "question": "Kdo je tvůrcem programovacího jazyka Python?",
    "answer": "Guido van Rossum",
    "solution": "13 Guido van Rossum — Python — tvůrce programovacího jazyka Python.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-014",
    "type": "text",
    "autoGrade": true,
    "title": "Hlavní autor programovacího jazyka Java",
    "question": "Kdo je hlavním autorem programovacího jazyka Java?",
    "answer": "James Gosling",
    "solution": "14 James Gosling — Java — hlavní autor programovacího jazyka Java.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-015",
    "type": "text",
    "autoGrade": true,
    "title": "Tvůrce jazyka JavaScript",
    "question": "Kdo je tvůrcem JavaScriptu, jednoho ze základních jazyků webu?",
    "answer": "Brendan Eich",
    "solution": "15 Brendan Eich — JavaScript — tvůrce JavaScriptu, jednoho ze základních jazyků webu.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-016",
    "type": "text",
    "autoGrade": true,
    "title": "Tvůrce jazyka C a spoluautor Unixu",
    "question": "Kdo je tvůrcem jazyka C a spoluautorem operačního systému Unix?",
    "answer": "Dennis Ritchie",
    "solution": "16 Dennis Ritchie — C / Unix — tvůrce jazyka C a spoluautor operačního systému Unix.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-017",
    "type": "text",
    "autoGrade": true,
    "title": "Teoretická informatika a Turingův test",
    "question": "Kdo je jedním ze zakladatelů moderní informatiky, známý Turingovým strojem a Turingovým testem?",
    "answer": "Alan Turing",
    "solution": "17 Alan Turing — teoretická informatika / AI — jeden ze zakladatelů moderní informatiky, známý Turingovým strojem a Turingovým testem.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-018",
    "type": "text",
    "autoGrade": true,
    "title": "První programátorka v historii",
    "question": "Která osobnost je často označována za první programátorku a popsala algoritmus pro Babbageův analytický stroj?",
    "answer": "Ada Lovelace",
    "solution": "18 Ada Lovelace — historie programování — často označována za první programátorku, popsala algoritmus pro Babbageův analytický stroj.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-019",
    "type": "text",
    "autoGrade": true,
    "title": "Architektura moderních počítačů",
    "question": "Kdo zásadně ovlivnil princip moderního počítače, kde jsou program i data uložené v paměti?",
    "answer": "John von Neumann",
    "solution": "19 John von Neumann — architektura počítačů — zásadně ovlivnil princip moderního počítače, kde jsou program i data uložené v paměti.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-020",
    "type": "text",
    "autoGrade": true,
    "title": "Český internetový portál Seznam.cz",
    "question": "Kdo založil Seznam.cz?",
    "answer": "Ivo Lukačovič",
    "solution": "20 Ivo Lukačovič — Seznam.cz — zakladatel Seznam.cz, jednoho z nejvýznamnějších českých internetových portálů.",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Osobnosti",
    "subtopic": "Přehled",
    "id": "osobnosti-021",
    "type": "text",
    "autoGrade": true,
    "title": "Vedení společnosti Anthropic (CEO)",
    "question": "Kdo je CEO společnosti Anthropic?",
    "answer": "Dario Amodei",
    "solution": "21 Dario Amodei - Anthropic CEO",
    "tags": [
      "Osobnosti"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – základy",
    "id": "vwa-header-001",
    "type": "choice",
    "title": "Co je header?",
    "question": "Co je header (záhlaví) webové stránky?",
    "choices": [
      "Horní část webové stránky, která se obvykle zobrazuje na všech podstránkách",
      "Dolní část webové stránky určená hlavně pro autorská práva",
      "Samostatná stránka s kontaktním formulářem",
      "Ikona stránky zobrazená v záložce prohlížeče"
    ],
    "answer": "Horní část webové stránky, která se obvykle zobrazuje na všech podstránkách",
    "solution": "Header je horní část webové stránky, která se obvykle zobrazuje na všech podstránkách a obsahuje důležité prvky pro orientaci uživatele.",
    "hint": "Je to záhlaví webu, nikoli patička.",
    "tags": [
      "header",
      "základy"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – základy",
    "id": "vwa-header-002",
    "type": "choice",
    "title": "Proč je header důležitý?",
    "question": "Proč má konzistentní header význam pro uživatelskou zkušenost?",
    "choices": [
      "Návštěvník ví, kde najde navigaci a jak se vrátit na úvodní stránku",
      "Zaručuje automaticky vyšší rychlost načítání webu",
      "Nahrazuje veškerý obsah jednotlivých podstránek",
      "Je nutný pouze kvůli zobrazení reklamy"
    ],
    "answer": "Návštěvník ví, kde najde navigaci a jak se vrátit na úvodní stránku",
    "solution": "Header zůstává konzistentní, takže uživatel vždy ví, kde najde navigaci nebo jak se vrátit na úvodní stránku. To podporuje orientaci a UX.",
    "hint": "Mysli na snadnou orientaci mezi stránkami.",
    "tags": [
      "header",
      "UX",
      "navigace"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-003",
    "type": "choice",
    "title": "Úloha loga v headeru",
    "question": "Jakou funkci má logo v headeru podle běžné webové konvence?",
    "choices": [
      "Slouží jako odkaz na úvodní stránku",
      "Vždy otevře vyhledávání",
      "Musí spouštět kontaktní formulář",
      "Nahrazuje hlavní navigaci"
    ],
    "answer": "Slouží jako odkaz na úvodní stránku",
    "solution": "Uživatelé běžně očekávají, že kliknutí na logo vrátí na úvodní stránku.",
    "hint": "Logo bývá spojeno s návratem domů.",
    "tags": [
      "header",
      "logo",
      "navigace"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-004",
    "type": "choice",
    "title": "Hlavní navigace",
    "question": "Co typicky obsahuje hlavní navigace v headeru?",
    "choices": [
      "Odkazy na všechny jednotlivé články a produkty webu",
      "Právní odkazy na cookies, GDPR a obchodní podmínky",
      "Odkazy na hlavní sekce, např. O nás, Služby a Kontakt",
      "Kontaktní formulář a mapu s adresou sídla firmy"
    ],
    "answer": "Odkazy na hlavní sekce, např. O nás, Služby a Kontakt",
    "solution": "Hlavní navigace je seznam odkazů na důležité části webu.",
    "hint": "Navigace uživateli pomáhá dostat se do hlavních sekcí.",
    "tags": [
      "header",
      "navigace"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-005",
    "type": "choice",
    "title": "Call-to-action",
    "question": "Co je účelem call-to-action (CTA) tlačítka v headeru?",
    "choices": [
      "Vyzvat k hlavní akci, například k nákupu nebo poptávce",
      "Vrátit návštěvníka zpět na úvodní stránku webu",
      "Přepnout celý web do jiné jazykové verze",
      "Rozbalit menu na malých displejích telefonů"
    ],
    "answer": "Vyzvat k hlavní akci, například k nákupu nebo poptávce",
    "solution": "CTA má návštěvníka vést k hlavní akci, kterou web požaduje, například k nákupu, zavolání nebo odeslání poptávky.",
    "hint": "CTA = výzva k akci.",
    "tags": [
      "header",
      "CTA",
      "konverze"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-006",
    "type": "choice",
    "title": "Kontaktní údaje",
    "question": "Proč mohou být kontaktní údaje součástí headeru firemního webu?",
    "choices": [
      "Zákazník najde telefon nebo e-mail hned v záhlaví",
      "Protože bez telefonu nemůže fungovat CSS",
      "Aby nahradily veškerý obsah patičky",
      "Aby se zabránilo responzivitě"
    ],
    "answer": "Zákazník najde telefon nebo e-mail hned v záhlaví",
    "solution": "U firemních webů je výhodné mít telefon nebo e-mail snadno dostupný přímo v headeru.",
    "hint": "Jde o rychlý přístup ke kontaktu.",
    "tags": [
      "header",
      "kontakt"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-007",
    "type": "choice",
    "title": "Vyhledávání v headeru",
    "question": "Pro které weby je vyhledávání v headeru zvlášť užitečné?",
    "choices": [
      "Jednostránkové vizitky s několika odstavci textu",
      "Landing pages zaměřené na jedinou konkrétní akci",
      "Osobní portfolia s několika ukázkami prací",
      "E-shopy, portály a weby s velkým množstvím obsahu"
    ],
    "answer": "E-shopy, portály a weby s velkým množstvím obsahu",
    "solution": "Vyhledávání je volitelné a hodí se hlavně tam, kde uživatel prochází velké množství obsahu.",
    "hint": "Čím více obsahu, tím více pomáhá hledání.",
    "tags": [
      "header",
      "vyhledávání",
      "UX"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – prvky",
    "id": "vwa-header-008",
    "type": "scenario",
    "title": "Košík a účet – praktický scénář",
    "question": "Kterou dvojici prvků bys použil/a v těchto dvou situacích?",
    "choices": [
      "E-shop: nákupní košík; přihlášený web: uživatelský účet/profil",
      "E-shop: favicon; přihlášený web: patička",
      "E-shop: hamburger pouze; přihlášený web: logo",
      "E-shop: slider; přihlášený web: mapa"
    ],
    "answer": "E-shop: nákupní košík; přihlášený web: uživatelský účet/profil",
    "solution": "E-shopy často používají ikonu košíku s počtem položek, zatímco weby s přihlášením nabízejí rychlý přístup k uživatelskému účtu nebo profilu.",
    "hint": "Košík souvisí s nákupem, profil s účtem.",
    "tags": [
      "header",
      "nákup"
    ],
    "scenario": "Navrhuješ header pro dva weby: e-shop a web, na kterém se uživatelé přihlašují ke svému účtu. Která dvojice prvků dává největší smysl?"
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Typy headerů",
    "id": "vwa-header-009",
    "type": "classification",
    "title": "Statický, sticky, nebo smart sticky?",
    "question": "Zařaď popis chování k typu headeru.",
    "solution": "Statický header zůstává na začátku stránky a při scrollování zmizí. Sticky se drží u horního okraje stále. Smart sticky kombinuje obojí: při čtení (scroll dolů) uvolní místo a při návratu (scroll nahoru) se zobrazí.",
    "hint": "Všímej si, jestli header na scrollování reaguje a jestli záleží na jeho směru.",
    "tags": [
      "header",
      "UX"
    ],
    "categories": [
      "Statický",
      "Sticky",
      "Smart sticky"
    ],
    "items": [
      {
        "id": "scrollaway",
        "text": "Při scrollování odjede nahoru spolu s obsahem stránky.",
        "category": "Statický"
      },
      {
        "id": "top",
        "text": "Na dlouhé stránce ho uživatel neuvidí, dokud se nevrátí na začátek.",
        "category": "Statický"
      },
      {
        "id": "stick",
        "text": "Je stále přilepený u horního okraje obrazovky.",
        "category": "Sticky"
      },
      {
        "id": "space",
        "text": "Navigace je pořád po ruce, ale trvale zabírá část obrazovky.",
        "category": "Sticky"
      },
      {
        "id": "hide",
        "text": "Při scrollování dolů zmizí a při scrollování nahoru se vrátí.",
        "category": "Smart sticky"
      }
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Typy headerů",
    "id": "vwa-header-010",
    "type": "choice",
    "title": "Sticky header",
    "question": "Jak funguje sticky header?",
    "choices": [
      "Odjede s obsahem a zůstane jen na začátku stránky",
      "Drží se u horního okraje a je viditelný i při scrollování",
      "Při scrollování dolů zmizí a při scrollování nahoru se vrátí",
      "Zobrazí se až po doscrollování na konec stránky"
    ],
    "answer": "Drží se u horního okraje a je viditelný i při scrollování",
    "solution": "Sticky header zůstává při scrollování na dosah uživateli. Nevýhodou je, že zabírá část obrazovky.",
    "hint": "Sticky = přilepený.",
    "tags": [
      "header",
      "sticky"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Typy headerů",
    "id": "vwa-header-011",
    "type": "choice",
    "title": "Smart sticky header",
    "question": "Jak se chová smart sticky header?",
    "choices": [
      "Drží se stále u horního okraje bez ohledu na směr scrollování",
      "Odjede s obsahem a objeví se znovu až na začátku stránky",
      "Při scrollování dolů se skryje, při scrollování nahoru se vrátí",
      "Zprůhlední se a překryje úvodní obrázek celé stránky"
    ],
    "answer": "Při scrollování dolů se skryje, při scrollování nahoru se vrátí",
    "solution": "Smart sticky header kombinuje úsporu místa při scrollování dolů se snadným návratem k navigaci při scrollování nahoru.",
    "hint": "Je to „inteligentní“ sticky varianta.",
    "tags": [
      "header",
      "smart sticky"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Typy headerů",
    "id": "vwa-header-012",
    "type": "choice",
    "title": "Transparentní header",
    "question": "Kde se hodí transparentní header?",
    "choices": [
      "Portfolia a landing pages s výrazným úvodním obrázkem",
      "Administrace s hustými tabulkami a formuláři",
      "E-shopy s rozsáhlým mega menu všech kategorií",
      "Dokumentace s dlouhým textem a vyhledáváním"
    ],
    "answer": "Portfolia a landing pages s výrazným úvodním obrázkem",
    "solution": "Transparentní header překrývá pozadí nebo hero sekci a může působit elegantně a moderně.",
    "hint": "Transparentní header pracuje s obrázkem nebo pozadím pod sebou.",
    "tags": [
      "header",
      "transparentní"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Typy headerů",
    "id": "vwa-header-013",
    "type": "choice",
    "title": "Mega menu",
    "question": "Co je mega menu header?",
    "choices": [
      "Menu ukryté pod ikonou se třemi vodorovnými čárkami",
      "Lišta s drobečkovou navigací k aktuální stránce",
      "Menu, které se drží u horního okraje obrazovky",
      "Velké rozbalovací menu s podkategoriemi a obrázky"
    ],
    "answer": "Velké rozbalovací menu s podkategoriemi a obrázky",
    "solution": "Mega menu umožňuje zobrazit mnoho odkazů a podkategorií najednou. Často se používá u velkých e-shopů a portálů.",
    "hint": "Mega menu = rozsáhlé rozbalené menu.",
    "tags": [
      "header",
      "mega menu",
      "navigace"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – design",
    "id": "vwa-header-014",
    "type": "choice",
    "title": "Doporučený počet položek navigace",
    "question": "Kolik položek hlavní navigace je vhodné mít v jednoduchém headeru?",
    "choices": [
      "Přibližně 5–7",
      "Přesně 20",
      "Vždy jen 1",
      "Nejméně 30"
    ],
    "answer": "Přibližně 5–7",
    "solution": "Materiál doporučuje vybrat 5–7 nejdůležitějších položek a zbytek přesunout například do patičky nebo na samostatné stránky.",
    "hint": "Méně je více.",
    "tags": [
      "header",
      "design",
      "navigace"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – design",
    "id": "vwa-header-015",
    "type": "choice",
    "title": "Kontrast v headeru",
    "question": "Co je důležité pro čitelnost textu v headeru?",
    "choices": [
      "Písmo ve stejné barvě jako logo webu",
      "Dostatečný kontrast textu vůči pozadí",
      "Text psaný výhradně velkými písmeny",
      "Co nejtenčí řez písma pro elegantní vzhled"
    ],
    "answer": "Dostatečný kontrast textu vůči pozadí",
    "solution": "Text musí být dobře čitelný. U průhledných headerů je potřeba zvlášť hlídat, aby text nesplynul s pozadím.",
    "hint": "Černá na bílé nebo bílá na tmavé je jednoduchý příklad.",
    "tags": [
      "header",
      "přístupnost"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – design",
    "id": "vwa-header-016",
    "type": "choice",
    "title": "Výška headeru",
    "question": "Jaká výška headeru bývá praktická pro desktop a mobil?",
    "choices": [
      "60–80 px na desktopu a 50–60 px na mobilu",
      "10–20 px na desktopu a 5–10 px na mobilu",
      "150–200 px na desktopu a 120–150 px na mobilu",
      "Výška je vždy stejná bez ohledu na zařízení"
    ],
    "answer": "60–80 px na desktopu a 50–60 px na mobilu",
    "solution": "Materiál uvádí jako praktické doporučení 60–80 px pro desktop a 50–60 px pro mobil.",
    "hint": "Mobilní header bývá nižší.",
    "tags": [
      "header",
      "design",
      "responzivita"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – mobil",
    "id": "vwa-header-017",
    "type": "choice",
    "title": "Mobilní header",
    "question": "Které uspořádání je typické pro zjednodušený mobilní header?",
    "choices": [
      "Logo vlevo nebo uprostřed a hamburger menu vpravo",
      "Celá desktopová navigace zalomená do více řádků",
      "Pouze logo bez jakéhokoli přístupu k navigaci",
      "Vyhledávací pole přes celou šířku místo loga"
    ],
    "answer": "Logo vlevo nebo uprostřed a hamburger menu vpravo",
    "solution": "Na mobilu je méně místa, proto se často používá minimalistický header s hamburger menu a případně CTA.",
    "hint": "Mobil = méně prostoru, zjednodušená navigace.",
    "tags": [
      "header",
      "mobil"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – mobil",
    "id": "vwa-header-018",
    "type": "choice",
    "title": "Dotykový cíl",
    "question": "Jakou minimální velikost dotykového cíle doporučují Apple Human Interface Guidelines?",
    "choices": [
      "44 × 44 px",
      "16 × 16 px",
      "20 × 20 px",
      "100 × 100 px"
    ],
    "answer": "44 × 44 px",
    "solution": "Materiál uvádí minimum 44×44 pixelů, protože menší cíle se hůře trefují prstem.",
    "hint": "Jde o doporučenou minimální plochu pro dotykové ovládání.",
    "tags": [
      "mobil",
      "UX",
      "dotyk"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – obsah",
    "id": "vwa-header-019",
    "type": "multi",
    "title": "Prvky dobrého headeru",
    "question": "Které prvky mohou být součástí dobrého headeru? Vyber všechny správné možnosti.",
    "choices": [
      "Logo",
      "Hlavní navigace",
      "Call-to-action tlačítko",
      "Kontaktní údaje",
      "Vyhledávání",
      "Vždy povinně rozsáhlé mega menu"
    ],
    "answers": [
      "Logo",
      "Hlavní navigace",
      "Call-to-action tlačítko",
      "Kontaktní údaje",
      "Vyhledávání"
    ],
    "solution": "Mezi uvedené prvky patří logo, hlavní navigace, CTA, kontaktní údaje a volitelně vyhledávání. Mega menu není povinné.",
    "hint": "Vyhledávání je označeno jako volitelné; mega menu je jen jeden typ navigace.",
    "tags": [
      "header",
      "prvky",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – design",
    "id": "vwa-header-020",
    "type": "multi",
    "title": "Zásady jednoduchého headeru",
    "question": "Která tvrzení odpovídají praktickým tipům pro design headeru?",
    "choices": [
      "Méně prvků často pomáhá přehlednosti",
      "Je vhodné respektovat známé konvence rozmístění",
      "Text musí mít dostatečný kontrast",
      "CTA může být vizuálně výraznější",
      "Navigace by měla vždy obsahovat co nejvíce položek"
    ],
    "answers": [
      "Méně prvků často pomáhá přehlednosti",
      "Je vhodné respektovat známé konvence rozmístění",
      "Text musí mít dostatečný kontrast",
      "CTA může být vizuálně výraznější"
    ],
    "solution": "Materiál zdůrazňuje jednoduchost, standardní očekávání uživatelů, kontrast a prioritu CTA. Příliš mnoho položek navigaci znepřehledňuje.",
    "hint": "Vzpomeň si na zásadu „Méně je více“.",
    "tags": [
      "header",
      "design",
      "UX",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – mobil",
    "id": "vwa-header-021",
    "type": "multi",
    "title": "Požadavky mobilního headeru",
    "question": "Co je důležité při návrhu headeru pro mobilní zařízení?",
    "choices": [
      "Responzivní přizpůsobení šířce obrazovky",
      "Dostatečně velké dotykové cíle",
      "Zjednodušená navigace",
      "Možnost použít hamburger menu",
      "Povinně ponechat stejnou širokou navigaci jako na desktopu"
    ],
    "answers": [
      "Responzivní přizpůsobení šířce obrazovky",
      "Dostatečně velké dotykové cíle",
      "Zjednodušená navigace",
      "Možnost použít hamburger menu"
    ],
    "solution": "Mobilní header má šetřit místo, přizpůsobit se šířce displeje a být dobře ovladatelný dotykem.",
    "hint": "Mobilní verze není jen zmenšený desktop.",
    "tags": [
      "header",
      "mobil",
      "responzivita",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – význam",
    "id": "vwa-favicon-001",
    "type": "multi",
    "title": "Kde lze favicon vidět",
    "question": "Kde se může favicon zobrazovat nebo pomáhat s identifikací webu?",
    "choices": [
      "V horní liště prohlížeče u otevřených oken a záložek",
      "V historii prohlížeče",
      "Ve vyhledávačích",
      "Při práci s mnoha otevřenými záložkami pro snadnější rozpoznání webu",
      "Výhradně uvnitř zdrojového kódu HTML"
    ],
    "answers": [
      "V horní liště prohlížeče u otevřených oken a záložek",
      "V historii prohlížeče",
      "Ve vyhledávačích",
      "Při práci s mnoha otevřenými záložkami pro snadnější rozpoznání webu"
    ],
    "solution": "Favicon dnes pomáhá s rozpoznáním webu v panelech a záložkách prohlížeče, historii i některých výsledcích vyhledávání.",
    "hint": "Favicon není jen obrázek uložený uvnitř HTML zdroje.",
    "tags": [
      "favicon",
      "branding",
      "UX",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – tvorba",
    "id": "vwa-favicon-002",
    "type": "multi",
    "title": "Online generátory favicon",
    "question": "Které nástroje fungují jako online generátory favicon?",
    "choices": [
      "favicon-generator.org",
      "favicon.io",
      "favicomatic.com",
      "realfavicongenerator.net",
      "Word bez grafických funkcí"
    ],
    "answers": [
      "favicon-generator.org",
      "favicon.io",
      "favicomatic.com",
      "realfavicongenerator.net"
    ],
    "solution": "Materiál uvádí čtyři online generátory: favicon-generator.org, favicon.io, favicomatic.com a realfavicongenerator.net.",
    "hint": "Jsou to čtyři konkrétní webové generátory uvedené v materiálu.",
    "tags": [
      "favicon",
      "generátory",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – formáty",
    "id": "vwa-favicon-003",
    "type": "multi",
    "title": "Doporučené velikosti favicon",
    "question": "Které velikosti favicon se hodí pro různá prostředí?",
    "choices": [
      "16×16 px",
      "32×32 px",
      "192×192 px",
      "512×512 px",
      "7×7 px"
    ],
    "answers": [
      "16×16 px",
      "32×32 px",
      "192×192 px",
      "512×512 px"
    ],
    "solution": "Pro panely a záložky postačují 16×16 nebo 32×32 px, pro mobilní zařízení a webové aplikace se hodí větší verze 192×192 a 512×512 px.",
    "hint": "Malé rozměry pro prohlížeč, větší pro mobilní zařízení a PWA.",
    "tags": [
      "favicon",
      "velikost",
      "PWA",
      "více správných"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – formáty",
    "id": "vwa-favicon-004",
    "type": "compare",
    "title": "Malé versus velké verze favicony",
    "question": "Porovnej velikosti favicony podle typického použití.",
    "pairs": [
      {
        "left": "16×16 px",
        "right": "Základní favicon v prohlížeči"
      },
      {
        "left": "32×32 px",
        "right": "Základní favicon v prohlížeči / vyšší běžná velikost"
      },
      {
        "left": "192×192 px",
        "right": "Mobilní zařízení a webové aplikace"
      },
      {
        "left": "512×512 px",
        "right": "Větší verze pro mobilní zařízení a PWA"
      }
    ],
    "solution": "Materiál rozlišuje 16×16 a 32×32 px jako základní verze pro prohlížeče a 192×192 a 512×512 px jako větší verze pro mobilní zařízení a PWA.",
    "hint": "Zamysli se nad velikostí výsledného obrazu a jeho cílovým prostředím.",
    "tags": [
      "favicon",
      "velikost",
      "přiřazování"
    ],
    "leftLabel": "Základní verze",
    "rightLabel": "Větší verze",
    "criteria": [
      {
        "id": "16",
        "text": "16×16 px – základní favicon v prohlížeči.",
        "answer": "left"
      },
      {
        "id": "32",
        "text": "32×32 px – běžná velikost pro prohlížeče.",
        "answer": "left"
      },
      {
        "id": "192",
        "text": "192×192 px – mobilní zařízení a webové aplikace.",
        "answer": "right"
      },
      {
        "id": "512",
        "text": "512×512 px – větší verze pro mobilní zařízení a PWA.",
        "answer": "right"
      }
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – formáty",
    "id": "vwa-favicon-005",
    "type": "match",
    "title": "Favicon – formát a vlastnost",
    "question": "Přiřaď formát nebo vlastnost k jeho charakteristice.",
    "pairs": [
      {
        "left": "SVG",
        "right": "Škálovatelnost"
      },
      {
        "left": "PNG",
        "right": "Vhodný i pro vyšší rozlišení a kompatibilitu"
      },
      {
        "left": "ICO",
        "right": "Široce podporovaný formát pro favicon"
      },
      {
        "left": "Jednoduchý symbol",
        "right": "Často vhodnější než složitý detailní obrázek"
      }
    ],
    "solution": "Materiál doporučuje SVG pro škálovatelnost, PNG ve vyšších rozlišeních, ICO pro širokou podporu a jednoduchý symbol pro dobrou čitelnost v malé velikosti.",
    "hint": "SVG souvisí se škálováním, ICO s kompatibilitou.",
    "tags": [
      "přiřazování"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – WordPress",
    "id": "vwa-favicon-006",
    "type": "match",
    "title": "WordPress – kroky nastavení",
    "question": "Přiřaď část postupu WordPressu k tomu, co se v ní provádí.",
    "pairs": [
      {
        "left": "Vzhled > Přizpůsobit",
        "right": "Přejití do nástroje pro úpravu webu"
      },
      {
        "left": "Identita webu",
        "right": "Sekce pro nastavení identity webu"
      },
      {
        "left": "Ikona webu",
        "right": "Místo pro výběr a nahrání favicony"
      },
      {
        "left": "Publikovat",
        "right": "Uložení a zveřejnění změny"
      }
    ],
    "solution": "Postup v materiálu vede přes Vzhled > Přizpůsobit, Identitu webu, Ikonu webu a nakonec Publikovat.",
    "hint": "Je to postup shora dolů v administraci WordPressu.",
    "tags": [
      "favicon",
      "WordPress",
      "přiřazování"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "WordPress",
    "id": "vwa-favicon-007",
    "type": "order",
    "title": "Nastavení favicony ve WordPressu",
    "question": "Seřaď kroky nastavení favicony ve WordPressu od prvního po poslední.",
    "order": [
      "Přihlásit se do administrace WordPressu a otevřít Vzhled > Přizpůsobit.",
      "Vybrat sekci Identita webu.",
      "V části Ikona webu kliknout na Vybrat soubor a nahrát PNG nebo ICO.",
      "Kliknout na Publikovat."
    ],
    "solution": "Postup je: Vzhled > Přizpůsobit → Identita webu → Ikona webu → nahrání souboru → Publikovat.",
    "hint": "Nejdříve se dostaneš do Přizpůsobení, nakonec změnu publikuješ.",
    "tags": [
      "favicon",
      "WordPress",
      "řazení"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – tvorba",
    "id": "vwa-favicon-008",
    "type": "order",
    "title": "Tvorba jednoduché favicony",
    "question": "Seřaď základní postup vytvoření favicony z obrázku.",
    "order": [
      "Vybrat obrázek, logo nebo jednoduchý symbol reprezentující značku.",
      "Případně použít online favicon generátor nebo grafický editor.",
      "Vytvořit potřebné velikosti a formáty favicony.",
      "Otestovat vzhled v různých prohlížečích a na různých zařízeních."
    ],
    "solution": "Nejprve se volí motiv, následně se favicon vytvoří, připraví se vhodné velikosti/formáty a nakonec se ověří její fungování v různých prostředích.",
    "hint": "Po vytvoření je důležité ověření v praxi.",
    "tags": [
      "tvorba",
      "řazení"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – formáty",
    "id": "vwa-favicon-009",
    "type": "fill",
    "autoGrade": true,
    "title": "Zkratka pro míru prokliku",
    "question": "Jakou třípísmennou zkratkou se označuje míra prokliku?",
    "answer": "CTR",
    "solution": "CTR znamená click-through rate, tedy míru prokliku.",
    "hint": "První písmena anglického názvu Click-Through Rate.",
    "tags": [
      "favicon",
      "SEO"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – formáty",
    "id": "vwa-favicon-010",
    "type": "fill",
    "autoGrade": true,
    "title": "Formát pro širokou podporu favicony",
    "question": "Který formát je popsán jako široce podporovaný pro favicon?",
    "answer": "ICO",
    "solution": "ICO je v materiálu uvedeno jako široce podporovaný formát favicony.",
    "hint": "Je to třípísmenná zkratka obrazového formátu.",
    "tags": [
      "favicon"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – význam",
    "id": "vwa-favicon-011",
    "type": "fill",
    "autoGrade": true,
    "title": "Vizuální konzistence značky",
    "question": "Jak se jedním slovem označuje oblast, ve které favicon podporuje vizuální konzistenci webu a značky?",
    "answer": "branding",
    "solution": "Favicon je malý prvek brandingu a může podporovat vizuální konzistenci značky.",
    "hint": "Jde o práci se značkou a její vizuální identitou.",
    "tags": [
      "favicon"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – design",
    "id": "vwa-header-022",
    "type": "text",
    "autoGrade": false,
    "title": "Proč nezahlcovat header",
    "question": "Vysvětli vlastními slovy, proč může příliš mnoho prvků v headeru působit problematicky.",
    "answer": "Příliš mnoho prvků může header znepřehlednit a zkomplikovat orientaci uživatele. Proto je vhodné ponechat jen nejdůležitější položky a zbytek přesunout jinam.",
    "solution": "Materiál zdůrazňuje jednoduchost a přehlednost. Doporučuje vybrat několik nejdůležitějších položek navigace a zbytek přesunout například do patičky.",
    "hint": "Méně je více.",
    "tags": [
      "header",
      "UX",
      "design"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Header – mobil",
    "id": "vwa-header-023",
    "type": "text",
    "autoGrade": false,
    "title": "Proč je důležitá responzivita headeru",
    "question": "Proč je důležité, aby se header automaticky přizpůsoboval šířce obrazovky? Uveď hlavní důvod.",
    "answer": "Protože desktop, tablet a telefon mají různě velký prostor a header se musí přizpůsobit, aby zůstal přehledný a ovladatelný.",
    "solution": "Materiál uvádí, že na širokém monitoru může být plná navigace, zatímco na telefonu je vhodná minimalistická verze s hamburger menu. Header tedy musí reagovat na šířku displeje.",
    "hint": "Telefon nemá tolik prostoru jako desktop.",
    "tags": [
      "header",
      "responzivita",
      "mobil"
    ]
  },
  {
    "subject": "Vývoj webových aplikací",
    "topic": "Header a favicon",
    "subtopic": "Favicon – význam",
    "id": "vwa-favicon-012",
    "type": "text",
    "autoGrade": false,
    "title": "Jednoduchost favicony",
    "question": "Proč by měla být favicon jednoduchá a dobře rozpoznatelná i po zmenšení?",
    "answer": "Protože se zobrazuje ve velmi malé velikosti, například 16×16 px, kde se složité detaily mohou stát nečitelnými.",
    "solution": "Materiál doporučuje jednoduchý a snadno rozpoznatelný motiv. Příliš detailní obrázek může být v minimální velikosti nečitelný.",
    "hint": "Představ si logo zmenšené na 16×16 pixelů.",
    "tags": [
      "favicon",
      "design",
      "čitelnost"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Základní pojmy",
    "id": "db-001",
    "type": "choice",
    "title": "Co jsou informace?",
    "question": "Co jsou informace v kontextu databází?",
    "choices": [
      "Surové hodnoty zatím bez jakéhokoli zpracování",
      "Zpracovaná data, která mají pro nás význam",
      "Tabulky uložené v relační databázi",
      "Údaje volně dostupné všem bez omezení"
    ],
    "answer": "Zpracovaná data, která mají pro nás význam",
    "solution": "Informace jsou zpracovaná data.",
    "hint": "Informace vznikají zpracováním dat.",
    "tags": [
      "databáze",
      "informace"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Základní pojmy",
    "id": "db-002",
    "type": "choice",
    "title": "Open data",
    "question": "Jak jsou definována open data?",
    "choices": [
      "Veřejně dostupná data",
      "Data uložená pouze v relacích",
      "Data dostupná jen přes ODBC",
      "Data uložená výhradně v CSV"
    ],
    "answer": "Veřejně dostupná data",
    "solution": "Open data jsou veřejná data dostupná veřejnosti.",
    "hint": "Jde o data přístupná veřejnosti.",
    "tags": [
      "databáze",
      "open data"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Relační databáze",
    "id": "db-003",
    "type": "choice",
    "title": "Role klíčů v relační databázi",
    "question": "Jakou roli mají klíče v relační databázi?",
    "choices": [
      "Propojují související data nebo tabulky",
      "Slouží pouze ke změně barev uživatelského rozhraní",
      "Nahrazují všechny sloupce tabulky",
      "Používají se jen k přehrávání animací"
    ],
    "answer": "Propojují související data nebo tabulky",
    "solution": "Materiál uvádí, že relační databáze jsou propojeny pomocí klíčů.",
    "hint": "Primární a cizí klíče pomáhají propojit související data.",
    "tags": [
      "relační databáze",
      "klíče"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Relační databáze",
    "id": "db-004",
    "type": "diagnostic",
    "title": "Odhal chybné tvrzení o relační databázi",
    "question": "Prohlédni tvrzení a označ všechna, která jsou o relační databázi chybná.",
    "solution": "Chybná jsou tvrzení, že databáze musí obsahovat pouze textová data a že nemůže mít více tabulek. Relační databáze běžně obsahuje řádky, sloupce a více tabulek propojených klíči.",
    "hint": "Hledej tvrzení, která jsou formulována příliš absolutně.",
    "tags": [
      "tabulky",
      "klíče"
    ],
    "items": [
      {
        "id": "rows",
        "label": "Databáze má řádky",
        "detail": "Řádky představují záznamy.",
        "correct": false
      },
      {
        "id": "cols",
        "label": "Databáze má sloupce",
        "detail": "Sloupce představují atributy.",
        "correct": false
      },
      {
        "id": "keys",
        "label": "Tabulky mohou být propojeny pomocí klíčů",
        "detail": "Klíče umožňují definovat vazby mezi tabulkami.",
        "correct": false
      },
      {
        "id": "text-only",
        "label": "Databáze musí obsahovat pouze textová data",
        "detail": "Relační databáze může obsahovat i číselná, datumová a další data.",
        "correct": true
      },
      {
        "id": "one-table",
        "label": "Relační databáze nemůže mít více tabulek",
        "detail": "Relační databáze běžně pracují s více tabulkami.",
        "correct": true
      }
    ],
    "answerIds": [
      "text-only",
      "one-table"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Klíče",
    "id": "db-005",
    "type": "choice",
    "title": "Typy klíčů",
    "question": "Které dva základní typy klíčů se používají v relačních databázích?",
    "choices": [
      "Primární a cizí",
      "Veřejný a soukromý",
      "Lokální a vzdálený",
      "Textový a binární"
    ],
    "answer": "Primární a cizí",
    "solution": "Základní typy klíčů jsou primární a cizí.",
    "hint": "Jeden z nich začíná slovem „primární“.",
    "tags": [
      "klíče",
      "primární klíč",
      "cizí klíč"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Atributy a entity",
    "id": "db-006",
    "type": "fill",
    "autoGrade": true,
    "title": "Sloupec jako atribut",
    "question": "Doplň: Sloupec v databázi = ______.",
    "answer": "atribut",
    "solution": "Sloupec odpovídá atributu.",
    "hint": "Je to vlastnost entity.",
    "tags": [
      "sloupec"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Atributy a entity",
    "id": "db-007",
    "type": "choice",
    "title": "Co je entita?",
    "question": "Co je entita?",
    "choices": [
      "Vlastnost objektu uložená ve sloupci",
      "Vazba mezi dvěma tabulkami přes klíč",
      "Objekt, o kterém databáze ukládá data",
      "Pravidlo omezující hodnoty ve sloupci"
    ],
    "answer": "Objekt, o kterém databáze ukládá data",
    "solution": "Entita je reálný nebo abstraktní objekt v databázi.",
    "hint": "Entita je objekt, nikoli příkaz.",
    "tags": [
      "entita",
      "základní pojmy"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Atributy a entity",
    "id": "db-008",
    "type": "choice",
    "title": "Co je atribut?",
    "question": "Co je atribut?",
    "choices": [
      "Vlastnost entity",
      "Typ databázového připojení",
      "Celá databáze",
      "Příkaz pro potvrzení transakce"
    ],
    "answer": "Vlastnost entity",
    "solution": "Atribut je vlastnost entity.",
    "hint": "Je to vlastnost objektu.",
    "tags": [
      "atribut",
      "entita"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Atributy a entity",
    "id": "db-009",
    "type": "classification",
    "title": "Entita, atribut nebo obojí?",
    "question": "Zařaď každý pojem do správné kategorie.",
    "pairs": [
      {
        "left": "Entita",
        "right": "Reálný nebo abstraktní objekt v databázi"
      },
      {
        "left": "Atribut",
        "right": "Vlastnost entity"
      },
      {
        "left": "Sloupec",
        "right": "Atribut"
      }
    ],
    "solution": "Entita představuje objekt, o kterém data uchováváme. Atribut je vlastnost takové entity; v tabulce se typicky projeví jako sloupec.",
    "hint": "Ptej se: Je to objekt, nebo jeho vlastnost?",
    "tags": [],
    "categories": [
      "Entita",
      "Atribut"
    ],
    "items": [
      {
        "id": "entity",
        "text": "Student",
        "category": "Entita"
      },
      {
        "id": "property",
        "text": "Věk studenta",
        "category": "Atribut"
      },
      {
        "id": "column",
        "text": "Sloupec s e-mailem",
        "category": "Atribut"
      },
      {
        "id": "object",
        "text": "Kniha",
        "category": "Entita"
      }
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Vlastnosti databází",
    "id": "db-010",
    "type": "multi",
    "title": "Vlastnosti databází",
    "question": "Které oblasti patří mezi základní vlastnosti databází?",
    "choices": [
      "Práva",
      "Ukládání",
      "Zabezpečení",
      "Správa dat",
      "Integrita dat",
      "Zálohování a obnova dat",
      "Animace uživatelského rozhraní"
    ],
    "answers": [
      "Práva",
      "Ukládání",
      "Zabezpečení",
      "Správa dat",
      "Integrita dat",
      "Zálohování a obnova dat"
    ],
    "solution": "Mezi základní oblasti patří práva, ukládání, zabezpečení, správa dat, integrita dat a zálohování a obnova dat.",
    "hint": "Vyber všechny položky, které patří mezi základní vlastnosti databází.",
    "tags": [
      "vlastnosti databází"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Vlastnosti databází",
    "id": "db-011",
    "type": "choice",
    "title": "Integrita dat",
    "question": "Který pojem z nabídky patří mezi vlastnosti databází?",
    "choices": [
      "Integrita dat",
      "Barevné schéma",
      "Animace",
      "Záložky prohlížeče"
    ],
    "answer": "Integrita dat",
    "solution": "Integrita dat je přímo uvedena mezi vlastnostmi databází.",
    "hint": "Souvisí s daty, ne s grafikou rozhraní.",
    "tags": [
      "vlastnosti databází"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Vlastnosti databází",
    "id": "db-012",
    "type": "choice",
    "title": "Zálohování a obnova",
    "question": "Která dvojice patří mezi vlastnosti databází?",
    "choices": [
      "Kompilace a ladění programu",
      "Vykreslování a animace grafiky",
      "Směrování a přepínání paketů",
      "Zálohování a obnova dat"
    ],
    "answer": "Zálohování a obnova dat",
    "solution": "Zálohování a obnova dat patří mezi základní oblasti správy databází.",
    "hint": "Jde o možnost data zálohovat a obnovit.",
    "tags": []
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-013",
    "type": "scenario",
    "title": "DDL v praxi",
    "question": "Která činnost odpovídá tomuto scénáři?",
    "choices": [
      "Definice struktury databázových objektů (DDL)",
      "Dotazování na data (SELECT)",
      "Řízení transakcí",
      "Standardizovaný přístup k různým databázím"
    ],
    "answer": "Definice struktury databázových objektů (DDL)",
    "solution": "DDL (Data Definition Language) slouží k definici struktury databázových objektů, například tabulek.",
    "hint": "DDL = Data Definition Language: zaměř se na definici struktury.",
    "tags": [
      "databázová struktura",
      "jazyk definice"
    ],
    "scenario": "Databázový administrátor připravuje novou tabulku a potřebuje definovat její strukturu. Neřeší zatím samotné vyhledávání dat ani transakce."
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-014",
    "type": "multi",
    "title": "Příkazy DDL",
    "question": "Které příkazy patří mezi příklady DDL?",
    "choices": [
      "CREATE",
      "ALTER",
      "DROP",
      "SELECT",
      "COMMIT"
    ],
    "answers": [
      "CREATE",
      "ALTER",
      "DROP"
    ],
    "solution": "Typickými příkazy DDL jsou CREATE, ALTER a DROP.",
    "hint": "Hledej příkazy spojené s definicí struktury.",
    "tags": [
      "DDL"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-015",
    "type": "fill",
    "autoGrade": true,
    "title": "DQL a SELECT",
    "question": "Který příkaz je typickým příkladem DQL (Data Query Language)?",
    "answer": "SELECT",
    "solution": "DQL slouží k dotazování; typickým příkladem je SELECT.",
    "hint": "Je to základní dotazovací příkaz.",
    "tags": [
      "DQL",
      "dotazování"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-016",
    "type": "choice",
    "title": "Účel DQL",
    "question": "K čemu slouží DQL?",
    "choices": [
      "K dotazování",
      "K definici struktury",
      "K řízení transakcí",
      "K zálohování dat"
    ],
    "answer": "K dotazování",
    "solution": "DQL je jazyk pro dotazování nad daty.",
    "hint": "Příklad příkazu je SELECT.",
    "tags": [
      "DQL"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-017",
    "type": "choice",
    "title": "DCL – řízení přístupových práv",
    "question": "K čemu slouží DCL (Data Control Language)?",
    "choices": [
      "Řízení přístupových práv",
      "Definice struktury tabulek",
      "Dotazování na uložená data",
      "Řízení průběhu transakcí"
    ],
    "answer": "Řízení přístupových práv",
    "solution": "DCL (Data Control Language) slouží k řízení přístupových práv.",
    "hint": "DCL souvisí s udělováním a odebíráním přístupových práv.",
    "tags": [
      "DCL",
      "přístupová práva",
      "GRANT",
      "REVOKE"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-018",
    "type": "multi",
    "title": "Příkazy DCL",
    "question": "Které příkazy patří mezi příklady DCL?",
    "choices": [
      "GRANT",
      "REVOKE",
      "SELECT",
      "CREATE",
      "ROLLBACK"
    ],
    "answers": [
      "GRANT",
      "REVOKE"
    ],
    "solution": "Typickými příkazy DCL jsou GRANT a REVOKE.",
    "hint": "Jde o příkazy pro udělování a odebírání přístupových práv.",
    "tags": [
      "DCL"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-019",
    "type": "choice",
    "title": "TCL",
    "question": "K čemu slouží TCL (Transaction Control Language)?",
    "choices": [
      "K řízení transakcí",
      "K definici struktury",
      "K dotazování",
      "K importu CSV"
    ],
    "answer": "K řízení transakcí",
    "solution": "TCL slouží k řízení transakcí.",
    "hint": "V názvu je slovo „transaction“.",
    "tags": [
      "TCL",
      "transakce"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-020",
    "type": "multi",
    "title": "Příkazy TCL",
    "question": "Které dva příkazy se používají pro řízení transakcí?",
    "choices": [
      "COMMIT",
      "ROLLBACK",
      "GRANT",
      "DROP",
      "SELECT"
    ],
    "answers": [
      "COMMIT",
      "ROLLBACK"
    ],
    "solution": "Pro řízení transakcí se používají například COMMIT a ROLLBACK.",
    "hint": "COMMIT potvrzuje změny a ROLLBACK je vrací.",
    "tags": [
      "TCL"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-021",
    "type": "match",
    "title": "SQL skupiny a jejich účel",
    "question": "Spoj každou skupinu SQL příkazů s jejím účelem a příklady.",
    "pairs": [
      {
        "left": "DDL",
        "right": "Definice struktury — CREATE, ALTER, DROP"
      },
      {
        "left": "DQL",
        "right": "Dotazování — SELECT"
      },
      {
        "left": "DML",
        "right": "Úprava dat — INSERT, UPDATE, DELETE"
      },
      {
        "left": "DCL",
        "right": "Řízení přístupových práv — GRANT, REVOKE"
      },
      {
        "left": "TCL",
        "right": "Řízení transakcí — COMMIT, ROLLBACK"
      }
    ],
    "solution": "DDL definuje strukturu, DQL slouží k dotazování, DML upravuje data, DCL řídí přístupová práva a TCL řídí transakce.",
    "hint": "Zaměř se na rozdíl mezi strukturou databáze, dotazováním, úpravou dat, oprávněními a transakcemi.",
    "tags": []
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "SQL jazyky",
    "id": "db-022",
    "type": "multi",
    "title": "SQL skupiny – příklady",
    "question": "Které dvojice správně spojují SQL skupinu s typickým příkazem?",
    "choices": [
      "DDL — CREATE",
      "DQL — SELECT",
      "DML — INSERT",
      "DCL — GRANT",
      "TCL — COMMIT",
      "DDL — SELECT",
      "DML — GRANT"
    ],
    "answers": [
      "DDL — CREATE",
      "DQL — SELECT",
      "DML — INSERT",
      "DCL — GRANT",
      "TCL — COMMIT"
    ],
    "solution": "DDL používá například CREATE, DQL SELECT, DML INSERT, DCL GRANT a TCL COMMIT.",
    "hint": "Rozlišuj definici struktury, dotazování, úpravu dat, oprávnění a transakce.",
    "tags": []
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Agregace",
    "id": "db-023",
    "type": "fill",
    "autoGrade": false,
    "title": "Význam agregace",
    "question": "Co znamená agregace?",
    "answer": "dávání dohromady",
    "solution": "Agregace znamená dávání nebo spojování prvků dohromady.",
    "hint": "Jde o spojování nebo dávání prvků dohromady.",
    "tags": [
      "agregace"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Připojení k databázi",
    "id": "db-024",
    "type": "choice",
    "title": "Účel připojovacího řetězce",
    "question": "Jaký je hlavní účel připojovacího řetězce k databázi?",
    "choices": [
      "Uložit výsledek posledního provedeného SQL dotazu",
      "Předat aplikaci údaje potřebné k připojení k databázi",
      "Definovat strukturu všech tabulek v databázi",
      "Zaznamenávat historii změn uložených dat"
    ],
    "answer": "Předat aplikaci údaje potřebné k připojení k databázi",
    "solution": "Připojovací řetězec obsahuje informace potřebné pro práci s databázovým připojením; vizuální nastavení aplikace do něj nepatří.",
    "hint": "Souvisí s připojením aplikace k databázi, ne s vzhledem rozhraní.",
    "tags": [
      "databáze",
      "připojovací řetězec"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "ODBC",
    "id": "db-025",
    "type": "choice",
    "title": "Co je ODBC?",
    "question": "Jak ODBC umožňuje aplikacím pracovat s různými databázemi?",
    "choices": [
      "Převádí všechna data do jednoho společného souborového formátu",
      "Synchronizuje obsah všech databází do jedné centrální",
      "Poskytuje jednotné rozhraní nezávislé na konkrétním výrobci",
      "Překládá SQL dotazy do jazyka konkrétní aplikace"
    ],
    "answer": "Poskytuje jednotné rozhraní nezávislé na konkrétním výrobci",
    "solution": "ODBC je standardizované rozhraní, které umožňuje aplikacím přistupovat k různým databázím jednotným způsobem nezávisle na výrobci.",
    "hint": "ODBC je rozhraní, ne příkaz SQL.",
    "tags": [
      "ODBC",
      "databáze"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "ODBC",
    "id": "db-026",
    "type": "text",
    "autoGrade": false,
    "title": "Smysl ODBC",
    "question": "Jaký problém řeší ODBC?",
    "answer": "Umožňuje aplikacím přistupovat k různým databázím jednotným způsobem nezávisle na výrobci databáze.",
    "solution": "ODBC řeší jednotný přístup aplikací k různým databázím pomocí standardizovaného rozhraní.",
    "hint": "Klíčová jsou slova „jednotným způsobem“ a „nezávisle na výrobci“.",
    "tags": [
      "ODBC",
      "rozhraní"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Připojení k databázi",
    "id": "db-027",
    "type": "choice",
    "title": "Připojovací řetězec",
    "question": "Co nepatří do připojovacího řetězce k databázi?",
    "choices": [
      "Barevné schéma uživatelského rozhraní aplikace",
      "Informace potřebné k práci s databází",
      "Nastavení databázového připojení",
      "Prvky související s databází"
    ],
    "answer": "Barevné schéma uživatelského rozhraní aplikace",
    "solution": "Do připojovacího řetězce patří informace potřebné k připojení k databázi, nikoli vizuální vzhled aplikace.",
    "hint": "Jde o vizuální vzhled UI, nikoli o databázové připojení.",
    "tags": [
      "připojovací řetězec",
      "uživatelské rozhraní"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Import a export",
    "id": "db-028",
    "type": "multi",
    "title": "Formáty pro import a export",
    "question": "Které formáty souborů lze použít pro import a export databázových dat?",
    "choices": [
      "CSV",
      "JSON",
      "XML",
      "DB",
      "TXT",
      "PNG",
      "HTML"
    ],
    "answers": [
      "CSV",
      "JSON",
      "XML",
      "DB",
      "TXT"
    ],
    "solution": "Mezi formáty pro import a export patří CSV, JSON, XML, DB a TXT.",
    "hint": "Je jich pět.",
    "tags": [
      "import",
      "export"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Import a export",
    "id": "db-029",
    "type": "text",
    "autoGrade": false,
    "title": "Společná vlastnost exportních formátů",
    "question": "Co mají v kontextu databází společného formáty CSV, JSON a XML?",
    "answer": "Mohou sloužit k importu nebo exportu databázových dat.",
    "solution": "V materiálu jsou CSV, JSON a XML uvedeny mezi formáty, které lze použít pro import a export databázových dat.",
    "hint": "Všechny tři se objevují v seznamu formátů pro import a export.",
    "tags": [
      "import",
      "export",
      "formáty"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Import a export",
    "id": "db-030",
    "type": "scenario",
    "title": "Přenos tabulkových dat",
    "question": "Který formát z nabídky nejlépe odpovídá tomuto požadavku?",
    "answer": "CSV",
    "solution": "CSV ukládá tabulková data jako řádky s oddělenými hodnotami. JSON a XML mají jinou strukturu; PNG ukládá obrazová data.",
    "hint": "Zaměř se na způsob zápisu dat, který cílová aplikace očekává.",
    "tags": [
      "import",
      "export",
      "formáty"
    ],
    "scenario": "Potřebuješ předat tabulku se jmény a známkami aplikaci, která umí načítat textové soubory s hodnotami oddělenými čárkami.",
    "choices": [
      "CSV",
      "JSON",
      "XML",
      "PNG"
    ],
    "difficulty": 2
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Import a export",
    "id": "db-031",
    "type": "choice",
    "title": "Formát, který nepatří do seznamu",
    "question": "Který z následujících formátů není uveden mezi možnostmi pro import nebo export databázových dat?",
    "choices": [
      "PNG",
      "CSV",
      "JSON",
      "TXT"
    ],
    "answer": "PNG",
    "solution": "Mezi uvedené databázové formáty patří CSV, JSON, XML, DB a TXT. PNG v tomto seznamu není.",
    "hint": "PNG je obrazový formát; v seznamu databázových formátů ho nenajdeš.",
    "tags": [
      "import",
      "export"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Shrnutí",
    "id": "db-032",
    "type": "multi",
    "title": "Přehled databázových pojmů",
    "question": "Které pojmy patří mezi základní témata databází?",
    "choices": [
      "Entita",
      "Atribut",
      "ODBC",
      "Agregace",
      "Favicon",
      "Header"
    ],
    "answers": [
      "Entita",
      "Atribut",
      "ODBC",
      "Agregace"
    ],
    "solution": "Mezi základní databázové pojmy patří entita, atribut, agregace a ODBC.",
    "hint": "Hledej pojmy z databází, ne z webového designu.",
    "tags": []
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Shrnutí",
    "id": "db-033",
    "type": "text",
    "autoGrade": false,
    "title": "Entita versus atribut",
    "question": "Vysvětli rozdíl mezi entitou a atributem.",
    "answer": "Entita je reálný nebo abstraktní objekt v databázi, zatímco atribut je vlastnost entity.",
    "solution": "Entita je reálný nebo abstraktní objekt v databázi, atribut je vlastnost entity.",
    "hint": "Objekt versus jeho vlastnost.",
    "tags": [
      "entita",
      "atribut"
    ]
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Shrnutí",
    "id": "db-034",
    "type": "spot",
    "title": "Chybné přiřazení skupiny SQL",
    "question": "V přehledu skupin SQL příkazů je jedno přiřazení chybné. Klikni na něj.",
    "solution": "GRANT patří do DCL (řízení práv), stejně jako REVOKE. Do DML (manipulace s daty) patří INSERT, UPDATE a DELETE.",
    "hint": "Projdi, které příkazy mění data a které řídí přístupová práva.",
    "tags": [],
    "segments": [
      "DDL – CREATE,",
      "DQL – SELECT,",
      "DML – GRANT,",
      "DCL – REVOKE,",
      "TCL – COMMIT"
    ],
    "wrong": [
      2
    ],
    "corrections": {
      "2": "DML – INSERT,"
    },
    "difficulty": 3
  },
  {
    "subject": "Databáze",
    "topic": "Základy databází",
    "subtopic": "Shrnutí",
    "id": "db-035",
    "type": "text",
    "autoGrade": false,
    "title": "Shrnutí základů databází",
    "question": "Uveď alespoň čtyři oblasti nebo pojmy ze základů databází.",
    "answer": "Například relační databáze, klíče, entity a atributy, vlastnosti databází, DDL, DQL, DML, DCL, TCL, agregace, ODBC nebo import a export dat.",
    "solution": "Mezi základní oblasti patří relační databáze a klíče, entity a atributy, vlastnosti databází, SQL skupiny, agregace, ODBC a import a export dat.",
    "hint": "Vyjmenuj libovolné čtyři pojmy nebo oblasti ze základů databází.",
    "tags": [
      "shrnutí",
      "ZDB",
      "databáze"
    ]
  }
];
