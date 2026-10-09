// Static site build: node src/build.mjs  ->  dist/
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import * as esbuild from 'esbuild';
import { SITE, ROUTES, SERVICES, AREAS, servicePath, areaPath } from './content/site.mjs';
import { POSTS, postPath } from './content/posts/index.mjs';
import { loadImageMeta, runImageJobs } from './lib/images.mjs';
import { renderPage } from './lib/layout.mjs';
import { resetIcons } from './lib/icons.mjs';

const DIST = path.resolve('dist');
const t0 = Date.now();

// ---------- prepare ----------
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
await loadImageMeta();

// reading time for posts
for (const p of POSTS) {
  for (const lang of ['en', 'es']) {
    const f = path.resolve(`src/content/posts/${lang}/${p.slug.en}.html`);
    p.body = p.body || {};
    p.body[lang] = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null;
  }
  const words = (p.body.en || '').replace(/<[^>]+>/g, ' ').split(/\s+/).length;
  p.mins = Math.max(3, Math.round(words / 230));
}

// assets
const css = await esbuild.build({ entryPoints: ['src/assets/css/main.css'], bundle: true, minify: true, write: false, external: ['/assets/*'] });
const js = await esbuild.build({ entryPoints: ['src/assets/js/main.js'], bundle: true, minify: true, write: false, target: ['es2019'] });
const cssOut = css.outputFiles[0].text, jsOut = js.outputFiles[0].text;
const v = crypto.createHash('md5').update(cssOut + jsOut).digest('hex').slice(0, 8);
fs.mkdirSync(path.join(DIST, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets/js'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'assets/fonts'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'assets/css/main.css'), cssOut);
fs.writeFileSync(path.join(DIST, 'assets/js/main.js'), jsOut);
await esbuild.build({ entryPoints: ['src/assets/js/area3d.js'], bundle: true, minify: true, format: 'esm', target: ['es2020'], outfile: path.join(DIST, 'assets/js/area3d.js'), legalComments: 'none' });
for (const [pkg, files] of [['fraunces', ['fraunces-latin-wght-normal.woff2', 'fraunces-latin-wght-italic.woff2']], ['manrope', ['manrope-latin-wght-normal.woff2']]]) {
  for (const f of files) fs.copyFileSync(path.resolve(`node_modules/@fontsource-variable/${pkg}/files/${f}`), path.join(DIST, 'assets/fonts', f));
}
// public/ (htaccess, php endpoint, etc.)
const copyDir = (src, dst) => { for (const e of fs.readdirSync(src, { withFileTypes: true })) { const s = path.join(src, e.name), d = path.join(dst, e.name); if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyDir(s, d); } else fs.copyFileSync(s, d); } };
if (fs.existsSync('src/public')) copyDir('src/public', DIST);

// ---------- pages ----------
const specs = [];
const add = (key, paths, render) => specs.push({ key, paths, render });
const mod = async (p) => (await import(p)).default;

add('home', ROUTES.home, await mod('./content/pages/home.mjs'));
const pageMods = ['about', 'services', 'areas', 'gallery', 'blog', 'contact', 'quote', 'privacy', 'terms'];
for (const k of pageMods) {
  const f = `./content/pages/${k}.mjs`;
  if (fs.existsSync(path.resolve('src', f))) add(k, ROUTES[k], await mod(f));
}
const serviceRender = fs.existsSync('src/content/pages/service.mjs') ? await mod('./content/pages/service.mjs') : null;
if (serviceRender) for (const s of SERVICES) add('svc-' + s.id, { en: servicePath(s, 'en'), es: servicePath(s, 'es') }, (lang) => serviceRender(lang, s));
const areaRender = fs.existsSync('src/content/pages/area.mjs') ? await mod('./content/pages/area.mjs') : null;
if (areaRender) for (const a of AREAS) add('area-' + a.id, { en: areaPath(a, 'en'), es: areaPath(a, 'es') }, (lang) => areaRender(lang, a));
const postRender = fs.existsSync('src/content/pages/post.mjs') ? await mod('./content/pages/post.mjs') : null;
if (postRender) for (const p of POSTS) add('post-' + p.slug.en, { en: postPath(p, 'en'), es: postPath(p, 'es') }, (lang) => postRender(lang, p));

const sitemap = [];
let count = 0;
for (const spec of specs) {
  for (const lang of ['en', 'es']) {
    resetIcons();
    const page = spec.render(lang);
    if (!page) continue;
    Object.assign(page, { lang, path: spec.paths[lang], alt: spec.paths, v, css: cssOut });
    const html = renderPage(page);
    const out = path.join(DIST, spec.paths[lang], 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    count++;
    if (!page.noindex) sitemap.push({ loc: spec.paths[lang], alt: spec.paths, lastmod: page.lastmod || new Date().toISOString().slice(0, 10), pri: spec.key === 'home' ? '1.0' : spec.key.startsWith('svc') ? '0.9' : '0.7' });
  }
}

// 404 pages
const nf = await mod('./content/pages/notfound.mjs');
for (const lang of ['en', 'es']) {
  resetIcons();
  const page = nf(lang);
  Object.assign(page, { lang, path: lang === 'es' ? '/es/404/' : '/404/', alt: { en: '/', es: '/es/' }, v, css: cssOut, noindex: true });
  fs.writeFileSync(path.join(DIST, lang === 'es' ? 'es/404.html' : '404.html'), renderPage(page));
}

// ---------- sitemap / robots / manifest ----------
const abs = (p) => SITE.url + p;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap.map((u) => `  <url><loc>${abs(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.pri}</priority><xhtml:link rel="alternate" hreflang="en-US" href="${abs(u.alt.en)}"/><xhtml:link rel="alternate" hreflang="es-US" href="${abs(u.alt.es)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${abs(u.alt.en)}"/></url>`).join('\n')}
</urlset>
`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, 'site.webmanifest'), JSON.stringify({ name: SITE.name, short_name: 'FGI', start_url: '/', display: 'standalone', background_color: '#f7f3ec', theme_color: '#0e0e0c', icons: [{ src: '/assets/img/favicon-192x192.png', sizes: '192x192', type: 'image/png' }, { src: '/assets/img/fgi-logo-512x512.png', sizes: '512x512', type: 'image/png' }] }, null, 2));

// ---------- images ----------
const r = await runImageJobs(DIST);
fs.copyFileSync(path.join(DIST, 'assets/img/favicon-32x32.png'), path.join(DIST, 'favicon.ico'));
console.log(`Built ${count} pages + 404s, ${r.total} images (${r.made} new) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
