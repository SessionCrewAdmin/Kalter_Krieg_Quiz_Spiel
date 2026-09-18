# V22 Classroom Suite – Testzweig

Dieser Zweig ist absichtlich nicht auf `main` veröffentlicht.

## Enthalten
- Classroom Board als eigener Unterrichtsbildschirm
- Interactive Board Einstieg auf Basis der vorhandenen Live-Poll-Session-Engine
- gemeinsamer Presentation-Mode Baustein
- Homework Voucher Center mit verschlüsselter Klassenlisten-Schnellauswahl

## Noch vor Freigabe zu testen/abschließen
- Presentation-Mode in jedem bestehenden Tool einzeln integrieren und mobil prüfen
- Interactive Board: Wortwolke/Brainstorming als eigene Lehreransichten über die Live-Poll-Engine ausbauen
- Kalter Krieg: Top-3-Voucher-Workflow in Lehreransicht integrieren
- Kalter Krieg: Frageneditor UX überarbeiten und Regressionstest durchführen
- iPhone/iPad/Smartboard Tests

## Datenschutz
Klassenlisten bleiben im lokalen verschlüsselten Vault. Die Voucher-Schnellauswahl liest sie erst nach Entsperren aus. Live-Teilnahme verwendet keine Klassenlisten.
