# Kontaktformular – Einrichtung

Das Formular nutzt **Netlify Forms**: kostenlos, kein Backend, keine Wartung.
Nach dem Deploy sind nur zwei einmalige Schritte nötig.

## Nach dem ersten Deploy (einmalig)

### 1. Formular wird automatisch erkannt
Beim Deploy scannt Netlify das HTML und findet das Formular über
`data-netlify="true"`. Es erscheint dann unter:
**Netlify Dashboard → deine Site → Forms → "contact"**

Wenn dort nach dem Deploy noch nichts steht: einmal eine Testnachricht
über das Live-Formular senden, dann erscheint es.

### 2. E-Mail-Benachrichtigung einschalten (empfohlen)
Damit Anfragen direkt in dein Postfach kommen:

1. Netlify Dashboard → Site → **Forms** → **Settings & notifications**
2. Unter **Form notifications** → **Add notification** → **Email notification**
3. Deine E-Mail-Adresse eintragen → speichern

Ab jetzt bekommst du jede Anfrage automatisch per E-Mail.
Alle Nachrichten bleiben zusätzlich im Netlify Dashboard gespeichert.

## Spamschutz
Eingebaut ist ein Honeypot-Feld (`bot-field`), das für Menschen unsichtbar
ist. Bots, die es ausfüllen, werden automatisch aussortiert.
Reicht das nicht, kannst du im Netlify-Dashboard zusätzlich reCAPTCHA
aktivieren (Forms → Settings → Spam filtering).

## Was der Besucher erlebt
1. Formular ausfüllen (Pflichtfelder werden client-seitig geprüft)
2. Datenschutz-Checkbox bestätigen
3. Absenden → Weiterleitung auf `success.html` ("Danke für deine Nachricht")

## Wichtig
- Lokal per Doppelklick funktioniert das Absenden NICHT (kein Netlify-Server).
  Erst nach dem Deploy auf der Live-URL testen.
- Die Dateien `contact.html`, `success.html`, `contact.js` und das
  aktualisierte `style.css`/`index.html` müssen alle mit hochgeladen werden.
- Ändere NICHT das versteckte Feld `form-name` oder den `name="contact"` –
  daran erkennt Netlify das Formular.
