# Kathleens magische Tool und Aufgaben Kiste · V20

Ein Repository für die komplette Unterrichtszentrale.

## URL-Struktur
- Hauptseite / Lehrer-Dashboard: https://sessioncrewadmin.github.io/Kathleens_magische_Kiste/
- Kalter Krieg – Schülerquiz: https://sessioncrewadmin.github.io/Kathleens_magische_Kiste/tools/kalter-krieg/
- Kalter Krieg – Control Room: https://sessioncrewadmin.github.io/Kathleens_magische_Kiste/tools/kalter-krieg/lehrer.html
- The World Speaks English: https://sessioncrewadmin.github.io/Kathleens_magische_Kiste/tools/english-world-quiz/
- English Bonus Round: https://sessioncrewadmin.github.io/Kathleens_magische_Kiste/tools/english-world-quiz/bonus.html

## Neu in V20
- echtes Dashboard vor der Modulübersicht
- aktive Session oben
- zuletzt verwendet
- Favoriten
- Geschichte / English als echte Tabs
- Klassen 7–10 als kleinere Filter
- stark sichtbare Drag-&-Drop-Ziele für Klassenstufen
- Animation beim Verschieben, z. B. 9 → 10
- Sortierung innerhalb einer Klassenstufe per Drag & Drop
- Status: Bereit / Entwurf / In Bearbeitung / Archiv
- saubere Kacheln, Details erst beim Hover
- eigene Coverbilder und Bild-Upload im Modul-Editor
- „+ Neues Tool“ direkt im Dashboard
- ⋯ Menü: öffnen, Klassen, Favorit, Bearbeiten, Cover, Duplizieren, Archivieren
- globale Suche über beide Fächer
- Tags, Typ- und Statusfilter
- Tablet: 2-spaltig, Smartphone: 1-spaltig
- Konfiguration liegt in Supabase, nicht in localStorage
- JSON Backup/Export und Import
- Untertitel „Kathleens Unterrichtszentrale“
- Kalter Krieg und English World Quiz liegen beide im selben Repository
- English Bonus: Zoom/Pan, Combo, ON FIRE und Konfetti

## Einmalig Supabase
1. `setup/V20_SUPABASE_MIGRATION.sql` im Supabase SQL Editor ausführen.
2. Hauptseite öffnen.
3. Beim ersten Bearbeiten / neuen Tool ein Admin-Passwort mit mindestens 8 Zeichen festlegen.
4. Auf einem anderen Gerät dasselbe Admin-Passwort eingeben.

Die Modulkonfiguration, Favoriten, Klassenstufen, Sortierung und Archivstatus liegen danach zentral in Supabase. Im Browser wird nur das Admin-Passwort für die aktuelle Browser-Session (`sessionStorage`) gehalten.

## GitHub
Den Inhalt dieses Ordners direkt in das Repository `Kathleens_magische_Kiste` hochladen. Die Ordnerstruktur beibehalten.


## V20.1 – Supabase pgcrypto Fix

Supabase installs PostgreSQL extensions commonly in the schema `extensions`.
The original V20 admin functions restricted their `search_path` to `public`, so
`digest()` could not be resolved on affected projects.

V20.1 uses:
`set search_path=public,extensions,pg_catalog`

If V20 already stopped at the digest error, it is enough to run:
`setup/V20_1_PGCRYPTO_PATCH.sql`

Otherwise run the corrected full migration:
`setup/V20_SUPABASE_MIGRATION.sql`


## V20.2 – Supabase Full Recovery

Wenn V20.1 den Fehler `relation "public.toolbox_admin" does not exist` zeigt,
wurde die ursprüngliche V20-Migration beim ersten Fehler vollständig zurückgerollt.
Der Patch allein reicht dann nicht.

Einfach `setup/V20_2_FULL_RECOVERY.sql` komplett in einem neuen Supabase SQL Tab ausführen.
Das Skript erstellt Tabellen und RPCs in richtiger Reihenfolge und qualifiziert
`extensions.digest()` explizit.


## V20.3 – iPhone / Mobile Polish

Speziell für iPhone 14 / ca. 390 px Breite optimiert:
- kompakter Header und sinnvoll angeordnete Hauptaktionen
- deutlich kompakteres Dashboard
- sticky Fach-Tabs
- horizontale Klassen- und Tag-Leisten
- mindestens ca. 44 px große Touch-Flächen
- 16 px Eingabefelder gegen automatisches Safari-Zoomen
- kompaktere Modul-Karten
- mobiles `i` für Details, weil Hover auf dem iPhone nicht existiert
- Modale als Bottom-Sheets
- Safe-Area-Unterstützung für Home-Indicator / Displayränder
- horizontaler Overflow verhindert

Für den reinen Mobile-Fix reicht auf GitHub das Ersetzen von `index.html`.

## V20.4 – World Quiz exakt wiederhergestellt

Die beiden Dateien unter `tools/english-world-quiz/` wurden nicht rekonstruiert, sondern auf den exakten Stand des ursprünglichen GitHub-Repositories `SessionCrewAdmin/world-map-quiz` zurückgesetzt.

- `index.html`: D3-Vektorkarte, Natural Earth / world-atlas 50m, Mausrad/Pinch, Drag, +/−/1×, bis 8× Zoom.
- `bonus.html`: gleicher Vektor-/Zoom-Unterbau plus Combo, ON FIRE / UNSTOPPABLE / MAP MASTER / PERFECT, Konfetti und Homework Pass.

Für diesen Fix müssen auf GitHub nur diese beiden Dateien ersetzt werden:
- `tools/english-world-quiz/index.html`
- `tools/english-world-quiz/bonus.html`

Keine neue Supabase-Migration nötig.
