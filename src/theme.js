/* =====================================================================
   perks – DESIGN  (rediger denne fila for å endre farger og fonter)
   ---------------------------------------------------------------------
   Endrer du en farge her, endres den overalt på siden. Fargene er
   hex-koder (#rrggbb). Bruk gjerne en fargevelger på nettet for å finne
   nye verdier. Se REDIGERE-INNHOLD.md for en kort forklaring.
   ===================================================================== */

/* ---------- Farger ---------- */
export const ink = "#0d0c22";     // tekst + mørkt verdikort
export const paper = "#f4f4f6";   // sidebakgrunn
export const accent = "#d76e98";  // rosa signatur – knapper og aksenter
export const pop = "#ec7ba6";     // lysere rosa – verditallet på mørkt kort
export const surface = "#ffffff"; // kort
export const green = "#1f8a5b";   // positive markører

/* ---------- Fonter ----------
   logo  = skriftfonten i «perks.»-logoen
   serif = overskrifter
   sans  = brødtekst
   Vil du bytte font: endre navnet HER og i googleFontsUrl under, slik at
   den nye fonten faktisk lastes. Navnene må matche Google Fonts nøyaktig. */
export const fonts = {
  logo: "'Kaushan Script', cursive",
  serif: "'Schibsted Grotesk', system-ui, sans-serif",
  sans: "'Hanken Grotesk', system-ui, sans-serif",
};

/* Lenka som henter fontene fra Google Fonts. Bytter du font over, bytt
   tilsvarende familienavn her (mellomrom skrives som +). */
export const googleFontsUrl =
  "https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Schibsted+Grotesk:wght@400;500;600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap";
