# Feel Good Insurance — new website

A fast, bilingual (English / Español) static website for fgirenonv.com. It replaces the WordPress/Elementor site. There is no database or plugins to maintain, and it runs on any web host. Hostinger is the current host.

## What's included

| | |
|---|---|
| **Pages** | 84 pages (42 in English and 42 in Spanish): home, about, 9 services, 15 city pages, service-areas hub, gallery, blog with 8 articles, contact, quote form, privacy, terms. Plus a 404 page in each language. |
| **Spanish** | Hand-translated pages at `/es/…`. A language switch on every page links to the matching page in the other language. Pages carry `hreflang` tags, and the site suggests Spanish to visitors whose browser is set to Spanish. |
| **New features** | 3-step quote form, coverage finder (home), life-insurance calculator (life page), help panel (call / text / quote / quick answers), sticky Call-Text-Quote bar on phones, blog search and filters, gallery lightbox, contents list and reading progress on articles, an interactive service-area map, and links to the partner online-quote tools. |
| **SEO** | Unique titles and descriptions on every page. Canonical URLs. InsuranceAgency, Breadcrumb, FAQ, Service and BlogPosting structured data. Bilingual sitemap, robots.txt, Open Graph images, and 301 redirects from the old WordPress addresses. |
| **Speed** | Self-hosted fonts, responsive WebP images, one small CSS file and one small JS file. Google Analytics loads after the visitor's first interaction. The homepage loads about 8 requests and ~325 KB (the old site was 151 requests and ~2.5 MB). |
| **Original features kept** | Contact form with the same fields and SMS/email consent text. Google reviews (5.0 ★, 55). Carrier logos, team, gallery and all original photos. Partner quote links (AgentInsure, NEXT, ePremium, PolicyMaker). Nevada DMV fee estimator link. BBB seal. Social links. GA4 and Google Ads tags. |

## Folder layout

```
src/
  content/site.mjs        ← phone, email, address, hours, team, reviews, carriers, nav
  content/services/*.mjs  ← each service page (en + es)
  content/areas/a1-3.mjs  ← the 15 city pages (en + es)
  content/posts/          ← blog list (index.mjs) + article bodies (en/, es/)
  content/pages/*.mjs     ← page templates (home, about, contact, quote…)
  content/legal/*.mjs     ← privacy policy & terms (en + es)
  assets/css, assets/js   ← design system and interactions
  public/                 ← .htaccess (redirects, caching) and api/contact.php (form handler)
  img-original/           ← original photos from the old site (resized automatically)
dist/                     ← the finished website (upload this)
```

## Build and preview

```bash
npm install
npm run dev
```

`npm run dev` builds the site into `dist/` and serves it at http://localhost:4321. `npm run build` only builds.

## Deploying to Hostinger

1. Back up the current WordPress site in hPanel (Files → Backups).
2. Upload **the contents of `dist/`** (including the hidden `.htaccess` file) into `public_html/`, replacing the WordPress files.
3. In `public_html/api/contact.php`, check `TO_EMAIL` and `FROM_EMAIL`. `FROM_EMAIL` must be a mailbox on the fgirenonv.com domain, for example create `no-reply@fgirenonv.com` in hPanel → Emails.
4. Send a test from the contact form and the quote form. Every lead is also saved to `api/leads/leads-YYYY-MM.csv`, which is blocked from public access.
5. In Google Search Console, submit `https://fgirenonv.com/sitemap.xml`.

## Please confirm before going live

- **Office hours** — the old site never listed them. Add them in `src/content/site.mjs` (`hours`) to turn on the "Open now" badge and send opening hours to Google.
- **Years of experience** — the old site said 12, 15 and 25 in different places. The new site uses "decades of combined experience" and no specific number.
- **"99.9% claims approved"** was removed because it is an unverifiable claim and a compliance risk. "300+ lives protected" was kept.
- **Privacy policy** still mentions *Squarespace Analytics*, which this site doesn't use. The legal text was carried over unchanged, so have it reviewed and updated.
- **Blog author** — articles are credited to "Feel Good Insurance Team". A named, licensed author with a license number would strengthen trust and Google's E-E-A-T signals.
- Two photos from the old statewide page were left out: an immigration-protest photo and a border-wall photo. They didn't fit an insurance website.
- **Google reviews** are static text. Update `REVIEWS` and `rating` in `site.mjs` when you want to refresh them.
