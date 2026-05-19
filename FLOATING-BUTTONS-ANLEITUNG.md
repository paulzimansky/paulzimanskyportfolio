# Floating-Buttons & Social-Icons – Links ändern

Alle Floating-Buttons werden zentral aus **einer** Datei erzeugt:
`floating-contact.js`. Du musst nichts in den einzelnen HTML-Seiten ändern.

## Telefon / WhatsApp ändern
Öffne `floating-contact.js`, ganz oben:

```
const TEL = '4915756662842';
```

Format: Ländervorwort ohne `+` und ohne führende 0.
0157 5666 2842  →  49 157 56662842  →  `4915756662842`
Diese eine Zeile steuert WhatsApp UND den Anruf-Button.

## Instagram ändern
Ebenfalls oben in `floating-contact.js`:

```
const IG = 'https://instagram.com/paulzimansky';
```

## Navigation-Icons (Instagram / TikTok oben)
Diese stehen direkt in `index.html` in der Navigation
(Bereich `<li class="nav-social">`). Dort die `href`-Adressen anpassen.
TikTok nicht vorhanden? Den zweiten `<a>`-Block einfach löschen.

## Mobile-Verhalten
Auf dem Handy wird bewusst nur WhatsApp + Instagram angezeigt
(Telefon-Button ausgeblendet, da WhatsApp dort der direktere Weg ist).
Steuerbar in `style.css` über die Regel `.fc-tel { display:none; }`
im Mobile-Media-Query – Zeile entfernen, wenn der Button auch auf
Mobile erscheinen soll.

## Wichtig
`floating-contact.js` muss in jeder HTML-Seite vor `</body>` verlinkt
sein (ist bereits erledigt). Bei neuen Seiten diese Zeile ergänzen:
`<script src="floating-contact.js"></script>`
