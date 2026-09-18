# V17.1 – Lehrermodus-Fix

Der Lehrermodus wurde robuster gemacht.

## Zwei Wege zum Lehrermodus

1. Empfohlen:
   https://sessioncrewadmin.github.io/Kalter_Krieg_Quiz_Spiel/lehrer.html

2. Weiterhin unterstützt:
   https://sessioncrewadmin.github.io/Kalter_Krieg_Quiz_Spiel/?teacher=1

`lehrer.html` enthält dieselbe Anwendung wie `index.html`, startet aber direkt im Cold-War-Control-Room.

## Was wurde repariert?
- Lehrerroute wird jetzt schon vor dem normalen App-Start ausgewertet.
- Selbst wenn später ein externes Skript langsam lädt, wird der Lehrerbildschirm direkt angezeigt.
- `/lehrer.html` wird auch vom normalen JavaScript als Lehrerroute erkannt.
- Bestehende V17 Supabase-Struktur bleibt unverändert.

## Upload zu GitHub Pages
Diesmal bitte ZWEI Dateien in das Repo laden/ersetzen:
- index.html
- lehrer.html

Keine neue SQL-Migration notwendig, wenn V17 bereits ausgeführt wurde.
