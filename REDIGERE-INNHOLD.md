# REDIGERE INNHOLD – kort guide

Denne fila forklarer hvordan du endrer innholdet på perks. Du trenger **ikke** kunne
programmere – du bytter ut tekst inne i ferdige «bokser». Tre filer er aktuelle:

| Vil du endre …                         | Åpne fila        |
|----------------------------------------|------------------|
| Tilbud, merchants, katalog, Aktuelt, meny | `src/content.js` |
| Farger og fonter                       | `src/theme.js`   |
| Ikon-regler (avansert, sjelden)        | `src/icons.js`   |

**Slik redigerer du (to måter):**
- **På github.com:** åpne fila i nettleseren, klikk blyant-ikonet ✏️ øverst til høyre,
  gjør endringen, og klikk **Commit changes**. Siden bygges automatisk på nytt (1–2 min).
- **På egen maskin:** rediger fila i et tekstprogram, last opp endringen til GitHub.

> 💡 **Gylden regel:** ikke slett komma, krøllparenteser `{ }` eller hakeparenteser `[ ]`.
> De holder strukturen sammen. Endrer du bare teksten *mellom* anførselstegnene `"…"`,
> går det stort sett alltid bra.

---

## 1) Legge til et nytt tilbud hos en organisasjon som finnes

Hvert tilbud er én linje (et «objekt») inne i en organisasjons `benefits`-liste i
`src/content.js`. Et tilbud ser slik ut:

```js
{ merchant: "Scandic Hotels", note: "14 % på hotell i Norge, Norden og Europa", cats: ["reise"], kw: ["hotell","overnatting"] },
```

Feltene betyr:

| Felt       | Hva det er                                        | Påkrevd? |
|------------|---------------------------------------------------|----------|
| `merchant` | Navnet på butikken/leverandøren (vises stort)     | Ja       |
| `note`     | Selve rabatten/fordelen (vises som undertekst)    | Ja       |
| `cats`     | Én eller flere kategorier (se liste under)         | Ja       |
| `kw`       | Søkeord så folk finner tilbudet (valgfritt)       | Nei      |
| `url`      | Egen lenke for *dette* tilbudet (valgfritt)       | Nei      |

**Slik gjør du det:**
1. Finn organisasjonen i `CATALOG` (søk f.eks. etter `id: "lo"`).
2. Finn `benefits: [` under den.
3. Lim inn en ny linje (kopier gjerne en eksisterende og endre teksten). Husk komma `,` på slutten.

Eksempel – legge til et nytt tilbud:
```js
{ merchant: "Nytt Firma AS", note: "20 % rabatt for medlemmer", cats: ["andre"], kw: ["rabatt"] },
```

**Gyldige kategorier (`cats`)** – bruk id-en til venstre (akkurat slik den er skrevet):

| id          | vises som            |   | id          | vises som            |
|-------------|----------------------|---|-------------|----------------------|
| `reise`     | Reise & fly          |   | `sport`     | Sport & idrett       |
| `bank`      | Bank & forsikring    |   | `kultur`    | Kultur & fritid      |
| `bil`       | Bil & leiebil        |   | `klar`      | Klær & utstyr        |
| `drivstoff` | Drivstoff & lading   |   | `interior`  | Interiør & møbler    |
| `strom`     | Strøm & mobil        |   | `tjenester` | Tjenester & juss     |
| `mat`       | Mat & servering      |   | `hjem`      | Hjem & sikkerhet     |
| `bolig`     | Bolig & eiendom      |   | `andre`     | Andre tilbud         |
| `bygg`      | Bygg & håndverk      |   | `helse`     | Helse & optikk       |

Et tilbud kan ha flere kategorier: `cats: ["reise","bil"]`.

> Ikonet velges automatisk ut fra navn og tekst – du trenger ikke sette ikon på tilbud.

---

## 2) Legge til en helt ny organisasjon (medlemskap)

Kopier en hel organisasjons-blokk i `CATALOG` og endre toppfeltene:

```js
{
  id: "minforening", name: "Min Forening", short: "Min Forening", sub: "Fagforening",
  aliases: ["Andre navn folk søker på"], color: "#3366cc", cost: 500,
  url: "https://minforening.no/",
  benefits: [
    { merchant: "Eksempel AS", note: "10 % rabatt", cats: ["andre"], kw: ["eksempel"] },
  ],
},
```

| Felt      | Betydning                                                       |
|-----------|------------------------------------------------------------------|
| `id`      | Kort, unik tekst uten mellomrom (brukes internt)                |
| `short`   | Navnet som vises i velgeren og merkelappene                     |
| `sub`     | Liten undertekst (f.eks. «Fagforening»)                         |
| `aliases` | Andre navn folk kan søke på (hjelper gjenfinning)               |
| `color`   | Fargeprikken til organisasjonen (hex-kode)                      |
| `cost`    | Årlig pris i kroner (`0` hvis gratis) – brukes i velgeren        |
| `url`     | Hovedlenke til organisasjonens fordelsside                      |

Vil du styre **rekkefølgen** organisasjonen vises i? Legg `id`-en inn i `ORG_RANK`-lista
(lenger ned i `content.js`). De som står først i lista, vises øverst.

---

## 3) Redigere «Aktuelt nå»-stripa

Stripa øverst på forsiden styres av `ARTICLES` i `content.js`. Hvert kort:

```js
{ tag: "Reise", title: "Reiseforsikring på kredittkortet – hva dekker det?", url: "#", current: true, color: "#5a8def", icon: "Plane" },
```

| Felt     | Betydning                                                                 |
|----------|---------------------------------------------------------------------------|
| `tag`    | Liten etikett øverst på kortet (f.eks. «Reise», «Sommer»)                  |
| `title`  | Overskriften på kortet                                                     |
| `url`    | Lenke til artikkelen. Sett `"#"` så lenge artikkelen ikke finnes ennå     |
| `color`  | Fargen på kortet (hex-kode)                                                |
| `icon`   | Ikonnavn som **tekst** (se liste under)                                    |

- **Endre et kort:** bytt teksten i `tag`, `title`, evt. `url`/`color`/`icon`.
- **Skjul ett kort:** slett hele linja (husk å ikke etterlate et løst komma).
- **Skjul hele stripa:** gjør lista tom: `export const ARTICLES = [];`
- **Gjøre et kort klikkbart:** bytt `url: "#"` til en ekte adresse, f.eks. `url: "https://perks.no/guide-reise"`.

**Gyldige ikonnavn** (skriv akkurat slik, i anførselstegn):
`Plane, Car, Home, Zap, Hotel, Ship, Tent, Mountain, Utensils, Coffee, ShoppingCart,
CreditCard, PiggyBank, Umbrella, HeartPulse, Snowflake, Sun, Dumbbell, Trophy, Film,
Music, BookOpen, Smartphone, Tv, Glasses, Pill, Sparkles, Gift, Tag` (m.fl. – full liste
er importen øverst i `src/icons.js`).

---

## 4) Bytte farger

Åpne `src/theme.js`. Endre hex-kodene:

```js
export const accent = "#d76e98";  // rosa signatur – knapper og aksenter
export const ink    = "#0d0c22";  // tekst + mørkt kort
export const paper  = "#f4f4f6";  // sidebakgrunn
```

Bruk en fargevelger (søk «color picker» på nettet) for å finne nye hex-koder. Endrer du
`accent`, endres alle rosa knapper på én gang.

---

## 5) Bytte fonter

Også i `src/theme.js`. To steg, ellers lastes ikke fonten:

1. Endre navnet i `fonts`:
   ```js
   export const fonts = {
     logo: "system-ui, sans-serif",
     serif: "'Schibsted Grotesk', system-ui, sans-serif",
     sans: "'Hanken Grotesk', system-ui, sans-serif",
   };
   ```
2. Endre `googleFontsUrl` slik at den nye fonten faktisk hentes fra Google Fonts.
   Gå til [fonts.google.com](https://fonts.google.com), velg en font, kopier familienavnet,
   og bytt det inn i adressen (mellomrom skrives som `+`).

---

## 6) Forhåndsvise før du publiserer (valgfritt)

Vil du se endringen før den går live? På egen maskin:
```bash
npm install   # bare første gang
npm run dev    # åpne adressen som vises, f.eks. http://localhost:5173
```
Ellers: commit på GitHub, vent 1–2 minutter, og last siden på nytt.

---

## Hvis noe knekker

Hvit/blank side etter en endring betyr nesten alltid en **manglende `,`** eller en
**ulik parentes**. Gå til **Actions**-fanen på GitHub – feiler byggingen, står det
hvilken fil og linje som er problemet. Angre i verste fall endringen (GitHub husker alt).
