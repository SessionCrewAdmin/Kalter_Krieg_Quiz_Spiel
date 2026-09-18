# Homework Voucher → Apple Wallet (V22)

Ziel: Ein echter signierter Apple-Wallet-Pass (.pkpass), nicht nur eine Wallet-Optik.

## Geplanter Pass
- Pass-Stil: Generic / Coupon
- serialNumber: Voucher-ID
- sichtbare Felder: Homework Voucher, Schüler/Kürzel, Klasse, Ausstellungsgrund, Status
- QR-Code: öffentliche Voucher-Prüf-URL
- Status-Update: gültig → eingelöst / storniert
- keine Klassenliste im Pass; nur Daten des konkreten Vouchers

## Noch erforderlich, bevor echte .pkpass-Dateien erzeugt werden können
1. Apple Developer Account
2. Pass Type ID, z. B. pass.de.kathleen.homeworkvoucher
3. Pass Type ID Certificate
4. Apple WWDR Intermediate Certificate
5. Team Identifier
6. sicherer serverseitiger Speicher für den privaten Signierschlüssel

Die Zertifikate/privaten Schlüssel dürfen niemals in GitHub Pages oder Browser-JavaScript liegen.

## Server-Architektur
Voucher Center → geschützter Server-Endpunkt → Voucher-Daten prüfen → pass.json/Assets personalisieren → Pass signieren → application/vnd.apple.pkpass zurückgeben.

Für Statusänderungen kann später der Apple Wallet Web Service implementiert werden, damit ein bereits gespeicherter Pass nach Einlösung aktualisiert wird.

## Sicherheitsgrenze
Die bestehende öffentliche Voucher-Prüfung kann als Barcode-Ziel dienen. Das Signieren selbst muss serverseitig erfolgen. GitHub Pages allein kann keinen sicheren produktiven Wallet-Signer enthalten.
