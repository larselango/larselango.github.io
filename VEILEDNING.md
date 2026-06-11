# VEILEDNING – fra filer til ferdig nettside

Denne guiden tar deg gjennom **alt**, steg for steg, uten at du trenger å kunne
programmering. Alt er **gratis** bortsett fra domenet (perks.no) du allerede har.

Les gjerne hele først, og gjør så ett steg om gangen. Det er helt normalt å bruke
en kveld på dette første gangen.

**Det vi skal gjøre, i rekkefølge:**

1. Last ned filene
2. Opprett GitHub-konto
3. Lag et «repository» og last opp filene
4. Skru på GitHub Pages → **siden er live** 🎉
5. Flytt domenet til Cloudflare og koble på perks.no
6. Sett opp e-postlista (EmailOctopus) og koble den til skjemaet
7. Motta e-post på hei@perks.no (gratis)
8. Meld siden inn til Google og Bing (Search Console)
9. Blokker AI-roboter (Cloudflare – ett klikk)
10. (Valgfritt) Anonym besøksstatistikk
11. Administrere e-postlista og sende nyhetsbrev
12. Det juridiske – hva som er på plass
13. Hjelp hvis noe ikke virker

> **Kontoer du oppretter underveis (alle gratis):** GitHub, Cloudflare, EmailOctopus.
> Domenet perks.no har du allerede hos Domeneshop.

---

## Del 1 – Last ned filene

Du har fått en mappe som heter **`perks`**. Den inneholder hele nettsiden. Slik ser den ut:

```
perks/
├─ index.html              ← selve inngangssiden (med søkeoptimalisering)
├─ package.json            ← liste over byggeverktøy
├─ vite.config.js          ← byggeinnstilling
├─ README.md               ← kort notat
├─ VEILEDNING.md           ← denne guiden
├─ REDIGERE-INNHOLD.md     ← hvordan endre innhold
├─ .gitignore              ← sier hva som IKKE skal lastes opp
├─ .github/workflows/
│  └─ deploy.yml           ← oppskriften GitHub bruker for å bygge siden
├─ public/                 ← filer som kopieres rått til siden
│  ├─ CNAME                ← binder domenet perks.no
│  ├─ robots.txt           ← slipper inn Google, ber AI-roboter holde seg unna
│  ├─ sitemap.xml          ← kart over sidene for søkemotorer
│  ├─ favicon.svg          ← det lille ikonet i nettleserfanen
│  ├─ og-image.png         ← bildet som vises når noen deler lenken
│  └─ personvern.html      ← personvernerklæringen
└─ src/                    ← koden
   ├─ Perks.jsx            ← appen (rør sjelden)
   ├─ content.js           ← ALT innhold (det du redigerer)
   ├─ theme.js             ← farger og fonter
   ├─ icons.js             ← ikon-regler
   ├─ storage.js           ← teknisk
   └─ main.jsx             ← teknisk oppstart
```

**Du skal laste opp HELE denne mappa** (alle filene og undermappene) til GitHub i Del 3.
Du skal **ikke** laste opp `node_modules` eller `dist` – de finnes ikke i mappa, og det er
meningen. GitHub lager dem selv ved bygging.

---

## Del 2 – Opprett GitHub-konto

GitHub er gratis og hoster nettsiden din.

1. Gå til **github.com** og klikk **Sign up**.
2. Velg brukernavn, e-post og passord. **Tips:** brukernavnet blir en del av en
   midlertidig nettadresse, så velg noe pent (f.eks. `perksno`).
3. Bekreft e-posten din.

---

## Del 3 – Lag et repository og last opp filene

Et «repository» (repo) er en prosjektmappe på GitHub.

1. Øverst til høyre på github.com, klikk **+** → **New repository**.
2. **Repository name:** skriv `DITTBRUKERNAVN.github.io`
   (bytt `DITTBRUKERNAVN` med ditt faktiske brukernavn – f.eks. `perksno.github.io`).
   👉 Dette spesielle navnet gjør at siden blir liggende på roten av adressen og virker
   med en gang.
3. Sett den til **Public**. Ikke huk av for noe ekstra (ingen README – vi har egen).
4. Klikk **Create repository**.

**Laste opp filene (enkleste måte – dra og slipp i nettleseren):**

5. På den nye, tomme repo-siden, klikk lenken **uploading an existing file**.
6. Åpne `perks`-mappa på maskinen din, merk **alt innholdet** (ikke selve mappa, men
   filene og undermappene inni), og dra det inn i nettleservinduet.
7. Skriv en liten beskrivelse i feltet nederst (f.eks. «Første versjon») og klikk
   **Commit changes**.

> ⚠️ **Viktig om `.github`-mappa:** mapper som starter med punktum kan være vanskelige å
> dra-og-slippe. Hvis `.github/workflows/deploy.yml` ikke ble med, lag den manuelt:
> klikk **Add file → Create new file**, skriv `.github/workflows/deploy.yml` som
> filnavn (skråstrekene lager mappene automatisk), lim inn innholdet fra fila, og commit.
> Samme triks om `.gitignore` mangler.

Når du er ferdig, skal du se mappene `src`, `public` og `.github` i repoet.

---

## Del 4 – Skru på GitHub Pages (siden blir live)

1. I repoet, klikk **Settings** (øverst) → **Pages** (i menyen til venstre).
2. Under **Build and deployment → Source**, velg **GitHub Actions**.
3. Gå til **Actions**-fanen øverst. Du ser en kjøring som heter «Bygg og publiser perks».
   Vent til den får et grønt flått ✓ (1–3 minutter).

🎉 **Siden er nå live på `https://DITTBRUKERNAVN.github.io`.** Åpne adressen og sjekk!

(Akkurat nå ligger den på github.io-adressen. I neste del kobler vi på perks.no.)

> Senere, hver gang du endrer en fil og committer, bygges og publiseres siden automatisk.

---

## Del 5 – Flytt domenet til Cloudflare og koble på perks.no

Vi bruker **Cloudflare** (gratis) fordi den gir deg tre ting på ett sted: pek domenet mot
GitHub, gratis e-postmottak (Del 7), og ett-klikks blokkering av AI-roboter (Del 9).

**A. Opprett Cloudflare-konto og legg til domenet**
1. Gå til **cloudflare.com**, lag konto, og klikk **Add a site**.
2. Skriv `perks.no` og velg **Free**-planen.
3. Cloudflare skanner og viser eksisterende DNS-oppføringer. Klikk videre.
4. Cloudflare gir deg **to navnetjenere (nameservers)**, f.eks.
   `xxx.ns.cloudflare.com` og `yyy.ns.cloudflare.com`. Noter dem.

**B. Bytt navnetjenere hos Domeneshop**
5. Logg inn på **domene.shop**, gå til perks.no → **Navnetjenere/DNS**.
6. Bytt fra Domeneshop sine navnetjenere til de **to fra Cloudflare**. Lagre.
   (Dette kan ta fra noen minutter til et døgn å tre i kraft. Cloudflare sender e-post
   når domenet er aktivt hos dem.)

**C. Pek domenet mot GitHub Pages (i Cloudflare → DNS → Records)**
7. Legg til **fire A-oppføringer** for selve domenet. For hver: Type `A`,
   Name `@`, og én av disse IP-adressene:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
8. Legg til **én CNAME**: Type `CNAME`, Name `www`, Target `DITTBRUKERNAVN.github.io`.
9. **Viktig for at HTTPS skal komme på plass:** sett alle disse fem til **DNS only**
   (grå sky, ikke oransje) til å begynne med. Du skrur på den oransje skyen i steg 12.

**D. Si fra til GitHub at domenet er perks.no**
10. Tilbake i GitHub → repo → **Settings → Pages → Custom domain**: skriv `perks.no`
    og klikk **Save**. (Dette stemmer med `public/CNAME`-fila som allerede ligger der.)
11. GitHub sjekker domenet. Når det er grønt, huk av **Enforce HTTPS** (kan ta litt tid
    før valget blir klikkbart – det venter på et gratis sikkerhetssertifikat).

**E. Slå på Cloudflare-beskyttelsen**
12. Når perks.no virker med `https://`, gå til Cloudflare → DNS og endre de fem
    oppføringene fra grå til **oransje sky (Proxied)**. Under **SSL/TLS** velg modus
    **Full**. Nå går trafikken gjennom Cloudflare (raskere, og klar for AI-blokkering).

✅ **Siden er nå live på `https://perks.no`.**

---

## Del 6 – E-postlista (EmailOctopus) og påmelding

Påmeldingsfeltet på siden er allerede bygget. Det mangler bare én adresse fra EmailOctopus.

**A. Opprett konto og liste**
1. Gå til **emailoctopus.com** og lag en gratis konto (opptil 2 500 abonnenter og
   10 000 e-poster i måneden gratis).
2. Klikk **Lists → Create a list**. Gi den et navn (f.eks. «perks nyhetsbrev»).

**B. Skru på dobbel bekreftelse (anbefalt – og ryddig for personvern)**
3. I lista, gå til innstillinger og slå på **double opt-in**. Da får den som melder seg
   på en bekreftelses-e-post, og du får bare reelle, samtykkende abonnenter.

**C. Lag et skjema og finn adressen koden trenger**
4. Gå til **Forms → Create a form → Embedded/Inline**. Lagre det.
5. Klikk **Get the code / «Add to your website»**. Du får en kodesnutt. Inne i den ser du
   `<form action="https://...">`. **Kopier akkurat den nettadressen** som står etter
   `action=` (den slutter typisk på `.../subscribe`).

**D. Lim adressen inn i siden**
6. På GitHub, åpne `src/content.js`, klikk blyanten ✏️, og finn linja:
   ```js
   emailoctopusFormAction: "",
   ```
   Lim adressen inn mellom anførselstegnene:
   ```js
   emailoctopusFormAction: "https://...subscribe",
   ```
7. **Commit changes.** Siden bygges på nytt automatisk. Fra nå havner påmeldinger rett i
   EmailOctopus. (Lar du feltet stå tomt, virker siden fint, men ingen e-post sendes inn.)

8. **Test det selv:** meld deg på med din egen e-post, og sjekk at du dukker opp under
   **Subscribers** i EmailOctopus (og at bekreftelses-e-posten kommer).

> E-postadressene lagres trygt hos EmailOctopus – ikke på nettsiden. Det er bra:
> du slipper å håndtere persondata i koden.

---

## Del 7 – Motta e-post på hei@perks.no (gratis)

Du trenger ikke kjøpe e-post hos Domeneshop. Cloudflare videresender gratis.

1. I Cloudflare, velg perks.no → **Email → Email Routing** → **Get started**.
2. Cloudflare ber om å legge til noen **MX-oppføringer** automatisk – godta det.
3. Under **Destination addresses**, legg til din vanlige e-post (f.eks. Gmail) og
   bekreft den via lenka du får tilsendt.
4. Under **Routing rules**, lag en regel: **hei@perks.no → din Gmail**. (Du kan også lage
   en «catch-all» som fanger alt til @perks.no.)

Nå kommer e-post sendt til hei@perks.no rett i innboksen din. **«Send inn»-knappen** og
**fotnoten** på siden bruker allerede hei@perks.no.

> Å *sende* e-post **fra** hei@perks.no (f.eks. svare fra Gmail med den adressen) er et
> eget, valgfritt steg («Send mail as» i Gmail). Nyhetsbrevet sendes uansett fra
> EmailOctopus, så dette haster ikke.

---

## Del 8 – Meld siden inn til Google og Bing

**Google Search Console**
1. Gå til **search.google.com/search-console** og logg inn.
2. Velg **Domain** (anbefalt) og skriv `perks.no`.
3. Google ber deg legge til en **TXT-oppføring** i DNS. Kopier verdien, gå til Cloudflare
   → DNS → **Add record**: Type `TXT`, Name `@`, lim inn verdien. Lagre, og klikk
   **Verify** i Google.
4. Når den er verifisert: gå til **Sitemaps**, skriv `sitemap.xml`, og send inn.
   (Full adresse blir `https://perks.no/sitemap.xml`.)

**Bing Webmaster Tools**
5. Gå til **bing.com/webmasters**, logg inn, og velg **Import from Google Search Console**
   (raskest), eller legg til perks.no og verifiser på samme måte.
6. Send inn samme sitemap.

> Det kan ta noen dager før sidene dukker opp i søk. Det er normalt.

---

## Del 9 – Blokker AI-roboter (ett klikk)

Du vil bli funnet i Google/Bing, men ikke at AI-tjenester støvsuger hele katalogen.

1. I Cloudflare, velg perks.no → **Security → Bots**.
2. Skru på bryteren **AI Scrapers and Crawlers**.

Cloudflare blokkerer da kjente AI-roboter automatisk – og slipper bevisst gjennom
vanlige søkemotorer som Google og Bing. Lista holdes oppdatert av Cloudflare selv.
`robots.txt`-fila på siden ber i tillegg AI-roboter pent om å holde seg unna.

> **Ærlig forbehold:** Ingen løsning gjør innhold *både* synlig i Google *og* umulig å
> kopiere – kan Google lese det, kan en bestemt tyv også. Cloudflare stopper de aller
> fleste, men den ekte beskyttelsen er at katalogen din er **kuratert og fersk**: det er
> jobben med å holde den oppdatert som er vanskelig å kopiere, ikke et øyeblikksbilde.

---

## Del 10 – Anonym besøksstatistikk (valgfritt)

Vil du se hvor mange som besøker siden, uten cookies og uten å spore folk?

1. I Cloudflare, velg perks.no → **Analytics & Logs → Web Analytics**.
2. Den fungerer automatisk når trafikken går gjennom Cloudflare (oransje sky fra Del 5).

Dette er allerede dekket i personvernerklæringen.

---

## Del 11 – Administrere e-postlista og sende nyhetsbrev

Alt skjer i EmailOctopus:

- **Se abonnenter:** Lists → din liste → **Subscribers**.
- **Eksportere lista:** **Export** gir deg en CSV-fil (Excel) – fin som sikkerhetskopi.
- **Importere:** **Import** lar deg lime inn eller laste opp adresser (kun folk som har
  samtykket!).
- **Fjerne noen:** søk dem opp og slett, eller marker som «unsubscribed».
- **Sende nyhetsbrev:** **Campaigns → Create** → skriv → velg lista → send eller planlegg.
- **Avmelding** håndteres automatisk: hver e-post får en avmeldingslenke. Det er lovpålagt,
  og EmailOctopus ordner det.

---

## Del 12 – Det juridiske (hva som er på plass)

For en side som samler e-post i Norge gjelder personvern (GDPR) og markedsføringsloven.
Dette er allerede laget for deg:

- **Personvernerklæring:** `public/personvern.html`, lenket fra bunnen av siden.
  **Du må fylle inn** feltene merket `[HAKEPARENTES]`: ditt navn/firma og evt.
  organisasjonsnummer. Åpne fila, bytt ut, og commit.
- **Samtykke:** påmelding er frivillig, og med dobbel bekreftelse (Del 6) har du
  dokumentert samtykke – i tråd med markedsføringsloven § 15.
- **Avmelding:** automatisk i hver e-post (Del 11).
- **Ingen sporings-cookies:** statistikken (Del 10) er cookieless, så du trenger ikke
  cookie-banner slik siden er nå.
- **Åpenhet:** erklæringen sier hvem som står bak og hvilke tjenester (EmailOctopus,
  GitHub, Cloudflare) som brukes.

> Dette er en god, ærlig start tilpasset slik siden fungerer nå – ikke juridisk
> rådgivning. Legger du til nye funksjoner som samler mer data, oppdater erklæringen.
> Driver du i næring, vurder å oppgi organisasjonsnummer.

---

## Del 13 – Hjelp hvis noe ikke virker

| Problem | Sjekk dette |
|---------|-------------|
| **Byggingen feiler** (rødt kryss i Actions) | Klikk på kjøringen i **Actions** – den peker på fil og linje. Oftest en manglende `,` eller parentes i `content.js`. |
| **perks.no virker ikke ennå** | DNS kan bruke opptil et døgn. Sjekk at navnetjenerne hos Domeneshop er Cloudflare sine, og at A-oppføringene stemmer. |
| **«Not secure» / ingen HTTPS** | Vent litt – GitHub lager sertifikatet automatisk. Sørg for at oppføringene var **DNS only** først (Del 5C), og at SSL/TLS står på **Full**. |
| **Påmelding lagrer ingenting** | Sjekk at `emailoctopusFormAction` i `content.js` har riktig `...subscribe`-adresse, og at du committet. |
| **Ikon mangler på et Aktuelt-kort** | Ikonnavnet må skrives akkurat som i lista i REDIGERE-INNHOLD.md (f.eks. `"Plane"`). |
| **Hvit/blank side** | Nesten alltid en syntaksfeil i en `.js`-fil. Angre siste endring på GitHub (alt er lagret i historikken). |

---

Det var alt. Du har nå en gratis, søkeoptimalisert, AI-beskyttet nettside på eget domene,
med e-postliste og mottak av e-post – og du kan endre innholdet selv via
**REDIGERE-INNHOLD.md**. Lykke til! 🎉
