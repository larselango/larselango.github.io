/* =====================================================================
   perks – BYGG MEDLEMSKAPSSIDER  (scripts/build-pages.mjs)
   ---------------------------------------------------------------------
   Genererer ÉN statisk, søkeoptimalisert side per organisasjon i katalogen
   (src/content.js). Tilbudene skrives som EKTE HTML (ikke JS-hentet), så de
   leses av alle søkemotorer – ikke bare de som kjører JavaScript.

   Kjøres automatisk ETTER bygget via "postbuild" i package.json, og skriver
   ferdige filer rett i dist/ (de committes ikke – de regenereres hver bygging
   fra content.js, så det er ÉN kilde og null vedlikehold av duplikater).

   Redaksjonell tekst per side: src/seo-pages.js (valgfritt – ellers standard).
   Stil: public/pages.css. Header/footer/nyhetsbrev: de delte /*.js-filene.
   ===================================================================== */
import { CATEGORIES, CAT_LABEL, CATALOG, POPULAR, AUTO_VALUE } from "../src/content.js";
import { iconOf, CAT_ICON, iconByName } from "../src/icons.js";
import { PAGE_SEO } from "../src/seo-pages.js";
import { FAQ } from "../src/faq.js";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const SITE = "https://perks.no";
const TODAY = new Date().toISOString().slice(0, 10);
const MIN_OFFERS = 5; // færre enn dette = for tynn side, hopp over (unngå «thin content»)

/* ---------- hjelpere (samme sortering/verdi som forsiden) ---------- */
const esc = (s) => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const scoreOf = (note) => {
  if (!note) return -1;
  const n = (note.match(/\d+(?:[.,]\d+)?/g) || []).map((x) => parseFloat(x.replace(",", ".")));
  return n.length ? Math.max(...n) : 0;
};
const popRank = (m) => (m && POPULAR.some((k) => m.toLowerCase().includes(k)) ? 0 : 1);
const isLive = (b) => !b.until || b.until >= TODAY; // skjul tidsbegrensede tilbud som er utløpt
const nicheRank = (b) => (b && b.niche ? 1 : 0);    // hyperlokale/smale fordeler vektes nederst
const cmp = (a, z) => nicheRank(a) - nicheRank(z) || popRank(a.merchant) - popRank(z.merchant) || scoreOf(z.note) - scoreOf(a.note);

/* Aktør-nøkkel: samler kjente kjeder under sitt POPULAR-stikkord (så «Esso» og
   «Esso Mastercard» teller som én), ellers fullt navn. Brukes til å plukke noen
   gjenkjennelige partnere til ingressen (gir konkret, søkbar tekst). */
const brandKey = (m) => { const s = (m || "").toLowerCase().trim(); return POPULAR.find((k) => s.includes(k)) || s; };
const notableMerchants = (benefits, n) => {
  const seen = new Set(); const out = [];
  for (const b of [...benefits].sort(cmp)) {
    const k = brandKey(b.merchant);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(b.merchant.replace(/\s*\(.*\)\s*$/, "").trim()); // dropp parentes-haler
    if (out.length >= n) break;
  }
  return out;
};
const andList = (arr) => arr.length <= 1 ? (arr[0] || "") : `${arr.slice(0, -1).join(", ")} og ${arr[arr.length - 1]}`;
const valueFor = (orgId, merchant) => {
  for (const r of (AUTO_VALUE[orgId] || [])) if (r.re.test((merchant || "").toLowerCase())) return r.value;
  return null;
};
const tint = (hex, a) => {
  const h = (hex || "#d76e98").replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return `rgba(${parseInt(n.slice(0, 2), 16)},${parseInt(n.slice(2, 4), 16)},${parseInt(n.slice(4, 6), 16)},${a})`;
};
const slugify = (s) => s.toLowerCase()
  .replace(/æ/g, "ae").replace(/ø/g, "o").replace(/å/g, "a")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const svgOf = (el, size) => renderToStaticMarkup(createElement(el, { width: size, height: size, strokeWidth: size > 19 ? 1.9 : 2 }));

/* ---------- ett tilbudskort som statisk HTML ---------- */
function cardHtml(org, b) {
  const url = b.url || org.url || "#";
  const value = valueFor(org.id, b.merchant);
  const valueHtml = value != null
    ? `<span class="card-value">≈ ${value.toLocaleString("no-NO")} kr/år inkludert</span>` : "";
  const notUniqueHtml = b.notUnique
    ? `<span class="card-notunique">fås også andre steder</span>` : "";
  const search = esc([b.merchant, b.note, ...(b.kw || []), CAT_LABEL[b.cats[0]] || ""].join(" ").toLowerCase());
  return `<a class="card" data-search="${search}" href="${esc(url)}" target="_blank" rel="nofollow noopener">`
    + `<span class="card-ic" aria-hidden="true" style="background:${tint(org.color, 0.15)};color:rgba(13,12,34,0.62)">${svgOf(iconOf(b), 20)}</span>`
    + `<div class="card-body">`
      + `<div class="card-top"><span class="card-merch">${esc(b.merchant)}</span><span class="card-cat">${esc(CAT_LABEL[b.cats[0]] || "Andre tilbud")}</span></div>`
      + `<div class="card-note">${esc(b.note || "")}</div>`
      + valueHtml
      + notUniqueHtml
    + `</div></a>`;
}

/* ---------- bygg én side ---------- */
function buildPage(org) {
  const seo = PAGE_SEO[org.id] || {};
  const slug = seo.slug || `${slugify(org.short || org.name)}-medlemsfordeler`;
  const url = `${SITE}/${slug}.html`;
  const liveBenefits = org.benefits.filter(isLive);
  const count = liveBenefits.length;

  // grupper per kategori i CATEGORIES-rekkefølge; sorter innad som forsiden
  const groups = CATEGORIES.map((c) => ({
    cat: c,
    rows: liveBenefits.filter((b) => (b.cats || []).includes(c.id))
      .sort((a, z) => nicheRank(a) - nicheRank(z) || popRank(a.merchant) - popRank(z.merchant) || scoreOf(z.note) - scoreOf(a.note)),
  })).filter((g) => g.rows.length);

  // Kategorier sortert etter hvor mange tilbud de har (mest representative øverst i teksten)
  const bySize = [...groups].sort((a, z) => z.rows.length - a.rows.length);
  const topLabels = bySize.slice(0, 3).map((g) => g.cat.label.toLowerCase());
  const topCats = andList(topLabels);
  const partners = notableMerchants(liveBenefits, 5);
  const incl = (AUTO_VALUE[org.id] || []).map((r) => r.label.toLowerCase());
  const valueSentence = incl.length
    ? `${incl[0].charAt(0).toUpperCase() + incl[0].slice(1)} har en reell årsverdi selv om du ikke bruker en eneste rabatt – resten er tilbud du kan bruke når du handler.`
    : `De fleste fordelene er rabatter du kan bruke når du handler – ikke penger du får automatisk.`;

  const title = seo.title || `${org.short} medlemsfordeler – ${count} rabatter samlet (2026)`;
  const h1 = esc(seo.h1 || `${org.name} medlemsfordeler: ${count} rabatter og fordeler`);
  const description = seo.description
    || `Komplett oversikt over ${org.name}-fordelene (${count} stk): rabatter på ${topCats} og mer${partners.length ? `, bl.a. hos ${andList(partners.slice(0, 3))}` : ""}. Se hva medlemskapet er verdt i 2026.`;
  const intro = seo.intro
    || `${org.name}${org.sub ? ` (${org.sub})` : ""} gir deg ${count} medlemsfordeler. Her er hele oversikten – samlet, sortert og søkbar – så du ser nøyaktig hvilke rabatter medlemskapet ditt gir, og hva de er verdt.`;
  const body = seo.body
    || `Du finner fordeler på blant annet ${esc(topCats)}${partners.length ? `, med kjente partnere som ${esc(andList(partners))}` : ""}. ${esc(valueSentence)} Skill mellom det som er <strong>gratis inkludert</strong> i medlemskapet og det som bare er <strong>rabattert medlemspris</strong> – og bruk søkefeltet under for å gå rett til en bestemt butikk eller kategori.`;

  // Artikkelinnganger: kompakte kort (støtter flere artikler per medlemskap).
  // seo.articles = [{ href, title, tag?, icon?, color? }]; eldre seo.related støttes også.
  const articleDefs = seo.articles
    || (seo.related ? [{ href: seo.related.href, title: seo.related.label.replace(/^Les også:\s*/i, ""), tag: "Guide", icon: "BookOpen" }] : []);
  const articlesHtml = articleDefs.length
    ? `<div class="art-list">${articleDefs.map((a) => {
        const Icon = iconByName(a.icon) || iconByName("BookOpen");
        const color = a.color || org.color || "#d76e98";
        return `<a class="art" href="${esc(a.href)}">`
          + `<span class="art-ic" aria-hidden="true" style="background:${tint(color, 0.15)};color:${esc(color)}">${svgOf(Icon, 22)}</span>`
          + `<span class="art-tx"><span class="art-tag">${esc(a.tag || "Guide")}</span><span class="art-title">${esc(a.title)}</span></span>`
          + `<span class="art-go">Les →</span>`
        + `</a>`;
      }).join("")}</div>`
    : "";

  const searchHtml = `<div class="search-wrap"><input id="perks-search" type="search" autocomplete="off" placeholder="Søk i ${esc(org.short)}-fordelene – f.eks. hotell, drivstoff, forsikring…" aria-label="Søk i fordelene til ${esc(org.short)}" /></div>`
    + `<p class="search-empty" id="perks-search-empty" hidden>Ingen treff. Prøv et annet søkeord.</p>`;

  const sections = groups.map((g) => {
    const ic = CAT_ICON[g.cat.id] ? `<span class="cat-ic" aria-hidden="true">${svgOf(CAT_ICON[g.cat.id], 18)}</span>` : "";
    return `<section class="cat-sec"><h2>${ic}${esc(g.cat.label)} <span class="cat-count">${g.rows.length}</span></h2><div class="grid">${g.rows.map((b) => cardHtml(org, b)).join("")}</div></section>`;
  }).join("\n");

  const jsonld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": `${url}#webpage`, url, name: title, inLanguage: "nb-NO",
        isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": `${SITE}/#organization` }, description },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "perks", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: `${org.short} medlemsfordeler` },
      ] },
    ],
  };

  return { slug, url, html: `<!doctype html>
<html lang="nb">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="theme-color" content="#f4f4f6" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="perks" />
    <meta property="og:locale" content="nb_NO" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${SITE}/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}/og-image.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" />
    <link rel="stylesheet" href="/pages.css" />
    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  </head>
  <body>
    <div id="site-header"></div>
    <main class="wrap">
      <p class="kicker"><a href="/">perks</a> <span>·</span> Medlemsfordeler</p>
      <h1>${h1}</h1>
      <p class="lead">${esc(intro)}</p>
      <p class="intro-body">${body}</p>
      <p class="meta">${count} fordeler · oppdatert juni 2026</p>
      ${articlesHtml}
      ${searchHtml}
      ${sections}
      <div data-perks-newsletter></div>
      <p class="foot"><a href="/">Se alle medlemskapene dine og regn ut verdien på forsiden →</a></p>
      <p class="fine">Rabattene er tilbud du kan bruke som medlem – ikke penger du får automatisk; kun goder med fast årsverdi (f.eks. innboforsikring) er tallfestet, og det er anslag. Rabatter og vilkår kan endres – sjekk alltid hos ${esc(org.short)} og tilbyderen. Lenker kan være annonselenker. perks er en uavhengig oversikt og er ikke tilknyttet ${esc(org.short)}.</p>
    </main>
    <div id="site-footer"></div>
    <script>
      /* Søk i denne foreningens fordeler – samme prinsipp som forsiden, men
         avgrenset til kortene på denne siden. Ren DOM-filtrering, ingen avhengigheter. */
      (function () {
        var input = document.getElementById("perks-search");
        if (!input) return;
        var cards = [].slice.call(document.querySelectorAll(".card[data-search]"));
        var secs = [].slice.call(document.querySelectorAll(".cat-sec"));
        var empty = document.getElementById("perks-search-empty");
        function apply() {
          var q = input.value.trim().toLowerCase();
          cards.forEach(function (c) {
            c.style.display = (!q || c.getAttribute("data-search").indexOf(q) > -1) ? "" : "none";
          });
          var any = false;
          secs.forEach(function (s) {
            var vis = [].slice.call(s.querySelectorAll(".card[data-search]")).some(function (c) { return c.style.display !== "none"; });
            s.style.display = vis ? "" : "none";
            if (vis) any = true;
          });
          if (empty) empty.hidden = any || !q;
        }
        input.addEventListener("input", apply);
      })();
    </script>
    <script src="/header.js" defer></script>
    <script src="/footer.js" defer></script>
    <script src="/newsletter.js" defer></script>
  </body>
</html>
` };
}

/* ---------- kjør ---------- */
const orgs = CATALOG.filter((o) => !o.parent && o.benefits && o.benefits.length >= MIN_OFFERS);
const built = [];
for (const org of orgs) {
  const { slug, url, html } = buildPage(org);
  writeFileSync(`dist/${slug}.html`, html);
  built.push({ org, slug, url });
}
const skipped = CATALOG.filter((o) => !o.parent && (!o.benefits || o.benefits.length < MIN_OFFERS)).map((o) => o.short);

/* Sitemap (komplett: forside + medlemskapssider + faste sider). */
const staticUrls = [
  { loc: `${SITE}/`, pr: "1.0", cf: "weekly" },
  ...built.map((b) => ({ loc: b.url, pr: "0.8", cf: "monthly" })),
  { loc: `${SITE}/er-lofavor-verdt-det.html`, pr: "0.7", cf: "monthly" },
  { loc: `${SITE}/personvern.html`, pr: "0.3", cf: "yearly" },
];
writeFileSync("dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + staticUrls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${u.cf}</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join("\n")
  + `\n</urlset>\n`);

/* Interne lenker på forsiden (crawlbart) – fyll inn placeholder i dist/index.html. */
const indexPath = "dist/index.html";
if (existsSync(indexPath)) {
  const links = built.map((b) => `<a href="/${b.slug}.html" style="color:#d76e98;font-weight:600;text-decoration:none">${esc(b.org.short)}</a>`).join(", ");
  // FAQPage-strukturdata fra samme kilde som den synlige FAQ-en (src/faq.js).
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question", name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const faqScript = `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`;
  let html = readFileSync(indexPath, "utf8");
  html = html.replace("<!--PERKS_MEMBERSHIP_LINKS-->", links)
             .replace("<!--PERKS_FAQ_JSONLD-->", faqScript);
  writeFileSync(indexPath, html);
}

console.log(`✓ ${built.length} medlemskapssider skrevet til dist/ (${built.map((b) => b.slug).join(", ")})`);
if (skipped.length) console.log(`  hoppet over (< ${MIN_OFFERS} tilbud): ${skipped.join(", ")}`);
