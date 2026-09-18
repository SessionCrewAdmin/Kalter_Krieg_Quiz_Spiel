# V15 – Classroom Control

## Neu
- Lehrersteuerung direkt im Quiz
- Unterrichts-Session mit 6-stelligem Klassen-Code
- Schüler melden sich mit Name + Klassen-Code bereit
- Quiz startet erst nach Lehrerfreigabe
- synchronisierter Cold-War-Startcountdown auf allen Geräten
- 10/15/20/25 Minuten Quizzeit auswählbar
- 5/10/15/30 Sekunden Startcountdown
- Lehrer kann Highscore, Hinweise und Sound für die Session einstellen
- Lehrer sieht bereit gemeldete Schüler und eingegangene Ergebnisse
- Klassen-Ergebnisse als CSV exportierbar
- Schüler kann eigenes Ergebnis als CSV exportieren oder als PDF drucken
- Score-Daten enthalten Session-Code, Bearbeitungszeit und Fehler pro Mission
- Session-Rangliste zeigt nur Ergebnisse dieser Unterrichts-Session

## Wichtig
Vor dem Upload von V15 einmal `V15_SUPABASE_MIGRATION.sql` im Supabase SQL Editor ausführen.

## Ablauf im Unterricht
1. Lehrkraft öffnet `https://sessioncrewadmin.github.io/Kalter_Krieg_Quiz_Spiel/?teacher=1`.
2. Einstellungen wählen und „Neue Unterrichts-Session“ drücken.
3. 6-stelligen Klassen-Code am Beamer zeigen.
4. Schüler scannen den festen QR-Code und geben Name + Klassen-Code ein.
5. Schüler drücken „Bereit melden“.
6. Lehrkraft sieht die Bereit-Liste.
7. „START FREIGEBEN“ drücken.
8. Auf allen Geräten läuft synchron der Cold-War-Countdown.
9. Bei T–00 startet das Quiz automatisch.

Der Lehrer-Schlüssel wird pro Session zufällig auf dem Server erzeugt und nur im Lehrerbrowser gespeichert. Schüler erhalten nur den Klassen-Code.


Der Lehrermodus ist auf der Schüler-Startseite absichtlich nicht verlinkt.
