/* =====================================================================
   perks – IKONER  (avansert – du trenger sjelden å endre denne fila)
   ---------------------------------------------------------------------
   Tre lag bestemmer ikonet for hver fordel (mest spesifikt vinner):
     1) MERCHANT_RULES  – matcher på leverandørnavnet
     2) ICON_OVERRIDES  – matcher på nøkkelord i navn/notat/søkeord
     3) CAT_ICON        – kategori-ikon som reserve
   Alle ikoner er fra lucide-react 0.383.0. Legger du til et nytt ikon,
   husk å importere navnet i linja under.
   ===================================================================== */

import { Plane, ShoppingBag, Fuel, Hammer, Sofa, Landmark, Car, Shirt, Ticket, Home, Zap, Scale, Stethoscope, ShieldCheck, Tag,
  Hotel, BedDouble, Bus, Wine, Watch, Ship, Tent, Mountain, Utensils, Coffee, ShoppingCart, Plug, Wrench, Paintbrush, Trash2, Lamp, CreditCard, PiggyBank, HandCoins, Umbrella, HeartPulse, Truck, Bike, Snowflake, Waves, Dumbbell, Trophy, Footprints, FerrisWheel, PawPrint, Palette, Drama, Film, Music, BookOpen, Building2, Smartphone, GraduationCap, Scissors, Tv, Briefcase, Glasses, Pill, Brain, Sparkles, Sun, Wind, Lock, Package, Flower2, Baby, Laptop, Headphones, Printer, Gift } from "lucide-react";


export const CAT_ICON = {
  reise: Plane, mat: ShoppingBag, drivstoff: Fuel, bygg: Hammer, interior: Sofa,
  bank: Landmark, bil: Car, klar: Shirt, sport: Trophy, kultur: Ticket, bolig: Home,
  strom: Zap, tjenester: Scale, helse: Stethoscope, hjem: ShieldCheck, andre: Tag,
};

/* ---------- Kategorier + søkeord (synonymer) ---------- */

/* Lag 2: nøkkelord-regler */
const ICON_OVERRIDES = [
  // Bank & penger
  { re: /kredittkort|mastercard|\bvisa\b/, icon: CreditCard },          // kredittkort eget symbol – ikke «beste fordel»
  { re: /personforsikring|livsforsikring|uføre|barneforsikring|ulykkesforsikring|familieulykke|grunnforsikring|behandlingsforsikring|helseforsikring/, icon: HeartPulse },
  { re: /husforsikring|innboforsikring|\binnbo\b/, icon: Home },
  { re: /forsikring/, icon: Umbrella },                                 // øvrig forsikring (bil/reise/mc/båt)
  { re: /boliglån|billån|caravanlån|mc-lån|refinansiering|forbrukslån|\blån\b/, icon: HandCoins },
  { re: /sparing|\bbsu\b|sparekonto|pensjon|pensjonskonto|\bfond\b|investering/, icon: PiggyBank },
  // Drivstoff / lading
  { re: /lading|\blade\b|hjemmelader|hurtiglading/, icon: Zap },        // elbillading → strøm, selv i «Drivstoff»
  // Reise
  { re: /hotell|overnatting|konferansehotell/, icon: Hotel },
  { re: /cruise|\bbåt\b|ferge|minicruise|\bkyst\b|hurtigruten/, icon: Ship },
  { re: /\bhytte\b|feriehus|fjellstue|fjällstation|camping|turisthytte/, icon: Tent },
  // Mat & servering
  { re: /\bkaffe\b|nespresso|narvesen/, icon: Coffee },
  { re: /restaurant|sushi|takeaway|servering|\bspise\b|middag|matkasse|delikatess|pizza|burger/, icon: Utensils },
  { re: /dagligvare|matbutikk|norgesgruppen|coop-butikker/, icon: ShoppingCart },
  // Bygg & håndverk
  { re: /elektriker|el-proffen|\belfag\b/, icon: Plug },
  { re: /rørlegger|\bvvs\b|verksted|eu-kontroll/, icon: Wrench },       // verksted dekker også bil
  { re: /maling|\bmaler\b|fargerike|flügger/, icon: Paintbrush },
  { re: /container|avfall|smartbag|ragn-sells/, icon: Trash2 },
  { re: /\blamper\b|belysning|lampegiganten/, icon: Lamp },
  // Sport & idrett (tema)
  { re: /\bski\b|alpint|heiskort|langrenn|slalåm|snowboard|\bsnø\b/, icon: Snowflake },
  { re: /klatring|klatrepark|klatresenter|buldring/, icon: Mountain },
  { re: /svømming|badeland|sommarland/, icon: Waves },
  { re: /treningssenter|\bgym\b|fitness/, icon: Dumbbell },
  { re: /fotball|håndball|ishockey|\bbasket\b|idrett|\bkamp\b/, icon: Trophy },
  // Friluft & sko (klær/utstyr)
  { re: /friluft|turtøy|turutstyr|fjellsport|kajakk|\bjakt\b|\bfiske\b|villmark/, icon: Mountain },
  { re: /\bsko\b|skotøy|løpesko|støvler|fjellsko/, icon: Footprints },
  // Bil-tjenester
  { re: /veihjelp|berging|tauebil|assistanse/, icon: Truck },
  { re: /\btaxi\b|drosje/, icon: Car },
  // Kultur & fritid (tema)
  { re: /fornøyelsespark|badepark|eventyrpark/, icon: FerrisWheel },
  { re: /akvarium|dyrepark|dyrehage/, icon: PawPrint },
  { re: /museum|\bkunst\b|galleri|utstilling|vitensenter/, icon: Palette },
  { re: /teater|opera|ballett|\bscene\b|\bshow\b|\brevy\b|forestilling/, icon: Drama },
  { re: /\bkino\b|\bfilm\b/, icon: Film },
  { re: /konsert|musikk|festival/, icon: Music },
  { re: /lydbok|e-bok|lydbøker|\bbøker\b/, icon: BookOpen },
  // Bolig & eiendom
  { re: /megler|boligsalg|\beiendom\b|\btakst\b/, icon: Building2 },
  // Strøm & mobil
  { re: /mobil|telefoni|mobilabonnement/, icon: Smartphone },
  { re: /strømming|streaming|\btv\b/, icon: Tv },
  // Tjenester & juss
  { re: /utdanning|\bkurs\b|studier|\bskole\b|e-læring|videreutdanning|nettkurs/, icon: GraduationCap },
  { re: /frisør|hårklipp/, icon: Scissors },
  { re: /sykkel|bysykkel/, icon: Bike },
  { re: /regnskap|gründer|oppstart|\bbedrift\b|karriere|\bcv\b|jobbsøknad/, icon: Briefcase },
  { re: /advokat|juridisk|\bjuss\b|privatrett|rettshjelp|rettigheter/, icon: Scale },
  // Helse & optikk
  { re: /briller|solbriller|optiker|\bsyn\b|linser|kontaktlinser/, icon: Glasses },
  { re: /apotek|medisin|farmasiet/, icon: Pill },
  { re: /psykolog|terapi|psykisk|mestring/, icon: Brain },
  { re: /skjønnhet|hudpleie|sminke|parfyme|\bspa\b|velvære|massasje/, icon: Sparkles },
  { re: /hjertestarter|førstehjelp/, icon: HeartPulse },
  // Hjem & sikkerhet
  { re: /solcelle|solskjerming|markise|persienne/, icon: Sun },
  { re: /varmepumpe|ventilasjon|inneklima/, icon: Wind },
  { re: /\blås\b|smartlås/, icon: Lock },
  { re: /minilager|oppbevaring|hvitevarer/, icon: Package },
  { re: /alarm|boligalarm/, icon: ShieldCheck },
  // Andre
  { re: /blomster/, icon: Flower2 },
  { re: /\bdyr\b|kjæledyr|\bhund\b|\bkatt\b|\bzoo\b/, icon: PawPrint },
  { re: /\bbaby\b|leker|barneklær/, icon: Baby },
  { re: /iphone|\bmac\b|ipad|\bpc\b|laptop/, icon: Laptop },
  { re: /høyttaler|hodetelefon/, icon: Headphones },
  { re: /\bblekk\b|\bkontor\b|printer/, icon: Printer },
  { re: /\bgaver\b|duftlys/, icon: Gift },
];

/* Lag 1: eksplisitte leverandør-regler (sjekkes først) */
const MERCHANT_RULES = [
  { re: /mastercard|kredittkort|\bvisa\b/, icon: CreditCard }, // vakt: «Esso Mastercard» → kort, ikke bensin
  // «alle med X i overskriften»
  { re: /boliglån/, icon: Home },
  { re: /bilforsikring|billån/, icon: Car },
  { re: /elbil|hybrid/, icon: Car },
  { re: /\bmc\b/, icon: Car },          // MC: ingen motorsykkel-ikon i 0.383.0 (se melding) – Bil inntil videre
  { re: /leasing/, icon: Car },
  { re: /naf forsikring|egenandelsforsikring/, icon: Car },
  // enkeltleverandører → Bil
  { re: /internasjonalt førerkort|flight park|naf veibok|nortrip|førerutvikling|noddi|bestdrive|vianor/, icon: Car },
  // overnatting / hytte
  { re: /treetop/, icon: Tent },
  { re: /svenska turistför|norgesbooking|dnt-hyttene/, icon: BedDouble },
  // buss
  { re: /dag aasbø|^vy$/, icon: Bus },
  // handle
  { re: /bagbrokers|^db$/, icon: ShoppingBag },
  { re: /kiwi pluss/, icon: ShoppingCart },
  // drivstoff / lading
  { re: /\bdefa\b/, icon: Zap },
  { re: /\besso\b|circle k/, icon: Fuel },
  // kjøkken / glass & bestikk
  { re: /byggmakker|designa kjøkken|\bhth\b/, icon: Hammer },
  { re: /hadeland glassverk|hardanger bestikk|kitchn|tilbords/, icon: Wine },
  // diverse
  { re: /bikemember/, icon: Bike },
  { re: /garmin/, icon: Watch },
];



/* Slå opp et lucide-ikon fra navnet (brukt av «Aktuelt»-stripa, som lagrer
   ikonet som tekst i content.js). Ukjent navn -> null (kaller faller til Tag). */
const ICON_BY_NAME = { Plane, ShoppingBag, Fuel, Hammer, Sofa, Landmark, Car, Shirt, Ticket, Home, Zap, Scale, Stethoscope, ShieldCheck, Tag, Hotel, BedDouble, Bus, Wine, Watch, Ship, Tent, Mountain, Utensils, Coffee, ShoppingCart, Plug, Wrench, Paintbrush, Trash2, Lamp, CreditCard, PiggyBank, HandCoins, Umbrella, HeartPulse, Truck, Bike, Snowflake, Waves, Dumbbell, Trophy, Footprints, FerrisWheel, PawPrint, Palette, Drama, Film, Music, BookOpen, Building2, Smartphone, GraduationCap, Scissors, Tv, Briefcase, Glasses, Pill, Brain, Sparkles, Sun, Wind, Lock, Package, Flower2, Baby, Laptop, Headphones, Printer, Gift };
export const iconByName = (name) => (name && ICON_BY_NAME[name]) || null;


/* Velg ikon for en fordel: leverandør -> nøkkelord -> kategori -> Tag */
export const iconOf = (b) => {
  const name = b.merchant.toLowerCase().trim();
  for (const o of MERCHANT_RULES) if (o.re.test(name)) return o.icon;   // eksplisitte leverandørvalg vinner
  const hay = (b.merchant + " " + b.note + " " + (b.kw ? b.kw.join(" ") : "")).toLowerCase();
  for (const o of ICON_OVERRIDES) if (o.re.test(hay)) return o.icon;
  return CAT_ICON[b.cats[0]] || Tag;
};

/* Eksplisitte leverandør-valg (matcher kun på leverandørnavnet). Sjekkes FØR nøkkelord-
   reglene, så disse vinner. «(alle)» = delstreng-treff; korte/tvetydige navn er ankret (^..$). */
