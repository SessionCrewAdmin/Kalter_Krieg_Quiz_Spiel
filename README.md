# V17.2 – Session-Erstellung repariert

## Ursache
In V17 lagen mehrere Overlay-Elemente (Lehrer-Nachricht, Gerätesperre, Zertifikat usw.)
unterhalb des Haupt-JavaScripts.

Das JavaScript versuchte beim Laden bereits Event-Listener auf diese Elemente zu setzen.
Dadurch brach der App-Start vorzeitig ab. Der Lehrermodus wurde zwar angezeigt,
aber der Button „Neue Unterrichts-Session“ bekam keinen funktionierenden Click-Handler.

## Fix
- Alle benötigten Overlay-Elemente werden jetzt vor dem JavaScript geladen.
- Der komplette Lehrer-Boot läuft wieder durch.
- „Neue Unterrichts-Session“ wird wieder korrekt gebunden.
- Fehler beim Supabase-RPC werden jetzt direkt im Lehrermodus detaillierter angezeigt.
- `lehrer.html` bleibt die empfohlene Lehreradresse.

## Upload
Bitte beide Dateien ersetzen:
- index.html
- lehrer.html

Keine neue SQL-Migration erforderlich.

Lehrer:
https://sessioncrewadmin.github.io/Kalter_Krieg_Quiz_Spiel/lehrer.html
