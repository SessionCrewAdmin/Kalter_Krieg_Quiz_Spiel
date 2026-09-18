# V18 – Kathleens magische Tool und Aufgaben Kiste

## Neue Struktur
- `index.html` → aktuelles Kalter-Krieg-Schülerquiz
- `lehrer.html` → zentrale, fachübergreifende Lehrer-Hauptseite
- `kalter_krieg_lehrer.html` → bestehender Cold-War-Control-Room

## Hauptseite
Titel: **Kathleens magische Tool und Aufgaben Kiste**

Design:
- fröhlicher, girlie Pastell-Look
- Pink / Flieder / Mint / Peach
- kleine schwebende Sparkles
- Fachkacheln Geschichte und English
- Klassenfilter 7 / 8 / 9 / 10
- Suche

## Kachelstruktur
Erste Kachel:
- Geschichte
- 9. Klasse
- Kalter Krieg – Abschluss

Klick auf `Öffnen` führt zum bisherigen Kalter-Krieg-Control-Room.

## Drag & Drop
Auf Desktop:
- Tool-Kachel auf `7. Klasse`, `8. Klasse`, `9. Klasse` oder `10. Klasse` ziehen.
- Danach wählen:
  - **Zusätzlich zuordnen**
  - **Verschieben**

Auf Tablet/Handy:
- `⋯` auf der Kachel öffnen.
- Mehrere Klassenstufen per Checkbox auswählen.

Die Zuordnungen werden aktuell im Browser der Lehrkraft gespeichert (`localStorage`).
Das ist absichtlich zunächst ohne neue Supabase-Migration umgesetzt, damit die neue Navigationsstruktur unabhängig vom Quiz-Backend funktioniert.

## GitHub Upload
Bitte diese drei Dateien in das Repo laden:
- index.html
- lehrer.html
- kalter_krieg_lehrer.html

Lehrer-Hauptseite:
`https://sessioncrewadmin.github.io/Kalter_Krieg_Quiz_Spiel/lehrer.html`
