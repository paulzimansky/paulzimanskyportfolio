# Blog – Neue Beiträge hinzufügen

Dein Blog ist statisch: keine Datenbank, kein Login, kein CMS.
Ein neuer Beitrag = eine neue Textdatei + ein Eintrag in einer Liste.

## In 3 Schritten einen neuen Beitrag erstellen

### 1. Markdown-Datei anlegen
Lege im Ordner `posts/` eine neue Datei an. Der Dateiname ist gleichzeitig die
Adresse des Beitrags – Format: `JAHR-MONAT-TAG-titel.md`

Beispiel: `posts/2024-06-01-strandshooting.md`

Inhalt nach diesem Muster (der Block zwischen den `---` ist Pflicht):

```
---
title: "Titel des Beitrags"
date: 2024-06-01
category: "Hochzeiten"
description: "Ein kurzer Satz, der in der Übersicht erscheint."
image: "/images/blog/mein-bild.jpg"
---

# Überschrift

Hier der Text. Du kannst **fett**, *kursiv*,

## Zwischenüberschriften

und Bilder verwenden:

![Bildbeschreibung](../images/blog/mein-bild.jpg)
```

### 2. Beitrag in die Liste eintragen — WICHTIG
Öffne `posts/index.json` und ergänze den Dateinamen (ohne `.md`) **oben**:

```json
[
  {"slug":"2024-06-01-strandshooting"},
  {"slug":"2024-05-19-hochzeit-shooting"},
  {"slug":"2024-05-18-portraet-tipps"},
  {"slug":"2024-05-17-newborn-fotografie"}
]
```

Achte auf das Komma nach jeder Zeile außer der letzten.
**Ohne diesen Eintrag erscheint der Beitrag nicht** – ein Browser kann
einen Ordner nicht von selbst auslesen, deshalb diese Liste.

### 3. Hochladen
```
git add .
git commit -m "Neuer Blogbeitrag: Strandshooting"
git push
```
Netlify deployt automatisch. Nach ~1 Minute ist der Beitrag online.

## Bilder
Lege Beitragsbilder in `images/blog/` ab. Empfehlung: vorher auf max.
1600 px Breite verkleinern und als JPG speichern (Ladezeit!).
Solange kein Bild da ist, wird automatisch ein Platzhalter angezeigt.

## Sortierung
Beiträge werden automatisch nach dem `date`-Feld sortiert – neueste oben.
Die Reihenfolge in `index.json` ist egal, aber neu oben einzutragen
hält es übersichtlich.
