# Kontaktformular & Linktree – Setup für Cloudflare Pages

## TEIL 1: Kontaktformular reparieren (DRINGEND)

Das Formular nutzte Netlify Forms – das gibt es auf Cloudflare nicht. Ich habe
es auf **Web3Forms** umgestellt: kostenlos, unbegrenzte Anfragen, kein Account.

### Setup in 5 Minuten

1. Gehe zu **https://web3forms.com**
2. Trage deine E-Mail ein (kontakt@paulzimansky.de) → "Create Access Key"
3. Bestätige die E-Mail, die du erhältst
4. Du bekommst einen Access Key (lange Zeichenkette)
5. Öffne `contact.html` und ersetze in dieser Zeile:

```html
<input type="hidden" name="access_key" value="DEIN_ACCESS_KEY_HIER">
```

den Text `DEIN_ACCESS_KEY_HIER` durch deinen echten Key.

6. Speichern, committen, pushen – Cloudflare deployt automatisch.

### Was passiert beim Absenden
- Besucher füllt Formular aus → klickt "Senden"
- Web3Forms verarbeitet die Anfrage → schickt dir eine E-Mail
- Besucher wird auf `success.html` weitergeleitet ("Danke für deine Nachricht")

### Testen
Nach dem Deploy: Selbst eine Testanfrage über das Formular schicken.
Mail muss in deinem Postfach ankommen.

---

## TEIL 2: Linktree unter paulzimansky.de/links

Bereits gebaut als Unterordner `/links/`. Funktioniert automatisch mit
Cloudflare Pages – kein zusätzliches Setup, keine Konfigurationsdateien.

### Workflow

1. ZIP entpacken
2. Der Ordner `links/` und die Datei `images/paul-profile.jpg` in dein
   GitHub-Repo committen
3. Push → Cloudflare deployt automatisch
4. Nach ~1 Minute: **paulzimansky.de/links** ist live

### Was drin ist
- 3 Hauptlinks: Portfolio, Blog, Kontakt
- 5 Social-Icons: Instagram, TikTok, WhatsApp, E-Mail, Telefon
- Profilfoto (Fährbild, quadratisch zugeschnitten)
- Schwarz-weiß-Design wie die Hauptseite

### Profilfoto austauschen
Wenn du ein anderes Foto willst: Ersetze einfach `images/paul-profile.jpg`
durch deine Datei (quadratisch, ca. 500×500 px). Dateiname und Pfad nicht
ändern.

---

## TEIL 3: WICHTIG – andere Links prüfen

Beim Wechsel von Netlify zu Cloudflare können folgende Dinge brechen,
die du selbst prüfen solltest:

- **Floating-Buttons** (WhatsApp, Telefon, Instagram) → funktionieren weiter,
  sind unabhängig vom Hoster
- **Blog** → funktioniert weiter, ist rein statisch
- **Bilder** → funktionieren weiter
- **Formular** → SIEHE TEIL 1 OBEN (war kaputt, jetzt repariert)

### Was du beim Deploy einmalig prüfen musst
1. Formular absenden → Mail kommt an?
2. paulzimansky.de/links öffnen → Profilfoto da?
3. Mobile-Ansicht testen → alles lesbar?
