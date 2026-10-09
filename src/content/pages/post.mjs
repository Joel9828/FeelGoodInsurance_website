import { SITE, ROUTES, SERVICES, t, L, servicePath } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { img, ogImage, fixed } from '../../lib/images.mjs';
import { crumbsHtml, ctaBand, postCard, fmtDate, btnQuote } from '../../lib/components.mjs';
import { POSTS, CATS, postPath } from '../posts/index.mjs';

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

// Fix internal links that pointed at the old WordPress URLs
const LINK_MAP = { '/auto-insurance/': '/services/auto-insurance/', '/homeowners-insurance/': '/services/homeowners-insurance/', '/commercial-insurance/': '/services/commercial-insurance/', '/life-insurance/': '/services/life-insurance/', '/dmv-service/': '/services/dmv-service/', '/notary-services/': '/services/notary-services/', '/renters-insurance/': '/services/renters-insurance/', '/motorcycle-insurance/': '/services/motorcycle-insurance/', '/travel-insurance/': '/services/travel-insurance/', '/our-gallery': '/our-gallery/' };

function prepare(html, lang) {
  const toc = [];
  html = html.replace(/<strong><br><\/strong>/g, ' ').replace(/<h2><strong>(.*?)<\/strong><\/h2>/g, '<h2>$1</h2>');
  // Old WordPress posts used "<p>item<br>item<br>item</p>" for lists — turn them into real lists
  html = html.replace(/<p>((?:(?!<\/p>).)*?<br>(?:(?!<\/p>).)*?)<\/p>/g, (m, inner) => {
    const items = inner.split('<br>').map((s) => s.trim()).filter(Boolean);
    return items.length > 1 && items.every((i) => i.length < 160) ? `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>` : m;
  });
  html = html.replace(/<h3><strong>(.*?)<\/strong><\/h3>/g, '<h3>$1</h3>').replace(/<p><br>/g, '<p>');
  let out = html.replace(/<h2>(.*?)<\/h2>/g, (m, inner) => {
    const id = slugify(inner) || `s${toc.length + 1}`;
    toc.push({ id, text: inner.replace(/<[^>]+>/g, '') });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  out = out.replace(/href="([^"]+)"/g, (m, h) => {
    let u = h.replace(/^https?:\/\/(www\.)?fgirenonv\.com/, '');
    if (LINK_MAP[u]) u = LINK_MAP[u];
    if (lang === 'es') {
      const s = SERVICES.find((s) => u === `/services/${s.slug.en}/`);
      if (s) u = servicePath(s, 'es');
      const p = POSTS.find((p) => u === `/${p.slug.en}/`);
      if (p) u = postPath(p, 'es');
      if (u === '/contact-us/') u = ROUTES.contact.es;
      if (u === '/') u = ROUTES.home.es;
    }
    const ext = /^https?:/.test(u);
    return `href="${u}"${ext ? ' target="_blank" rel="noopener"' : ''}`;
  });
  return { html: out, toc };
}

export default function post(lang, p) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const body = p.body[lang] || p.body.en;
  if (!body) return null;
  const { html, toc } = prepare(body, lang);
  const svc = SERVICES.find((s) => s.id === p.service);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('blog', lang), url: ROUTES.blog[lang] }, { name: L(p.title, lang), url: postPath(p, lang) }];
  const related = POSTS.filter((q) => q !== p && (q.cat === p.cat)).concat(POSTS.filter((q) => q !== p && q.cat !== p.cat)).slice(0, 3);
  const logo = fixed('image.png', 96, 96, 'png', 'fgi-logo');

  const main = `
<div class="read-progress" aria-hidden="true"></div>
<article>
  <header class="article-hero">
    <div class="container">
      ${crumbsHtml(crumbs)}
      <div class="post-meta"><span class="cat">${L(CATS[p.cat], lang)}</span></div>
      <h1 class="h1 hero-title mt-1">${L(p.title, lang)}</h1>
      <p class="lead mt-2">${L(p.desc, lang)}</p>
      <div class="post-meta">
        <span style="display:inline-flex;align-items:center;gap:10px"><img src="${logo}" width="28" height="28" alt="" style="border-radius:8px">${t('by', lang)} <b style="color:var(--ink)">${x('Feel Good Insurance Team', 'Equipo de Feel Good Insurance')}</b></span>
        <time datetime="${p.date}">${fmtDate(p.date, lang)}</time>
        ${p.updated && p.updated !== p.date ? `<span>${t('updated', lang)} <time datetime="${p.updated}">${fmtDate(p.updated, lang)}</time></span>` : ''}
        <span>${icon('clock', '', 15)} ${p.mins} ${t('minutesRead', lang)}</span>
      </div>
      <div class="article-cover reveal-img">${img(p.img, { alt: L(p.title, lang), priority: true, sizes: '(max-width: 1240px) 100vw, 1240px', widths: [640, 1024, 1600] })}</div>
    </div>
  </header>
  <div class="container article-layout">
    <nav class="toc" aria-label="${t('onThisPage', lang)}">
      ${toc.length ? `<h2>${t('onThisPage', lang)}</h2><ol>${toc.map((h) => `<li><a href="#${h.id}">${h.text}</a></li>`).join('')}</ol>` : ''}
      <button class="btn ghost sm mt-3" type="button" data-share>${icon('external', '', 16)} <span>${t('share', lang)}</span></button>
    </nav>
    <div>
      <div class="prose" data-article>${html}</div>
      ${es && !p.body.es ? '' : ''}
      <div class="author-box">
        <img src="${logo}" width="58" height="58" alt="">
        <div><b>${x('Written by the Feel Good Insurance team', 'Escrito por el equipo de Feel Good Insurance')}</b><p>${x('Independent insurance agents in Sparks, NV, helping Nevada families and businesses compare coverage since day one.', 'Agentes de seguros independientes en Sparks, NV, que ayudan a familias y negocios de Nevada a comparar coberturas.')}</p></div>
      </div>
      <div class="cta-band mt-4" style="padding:clamp(28px,4vw,44px)">
        <div class="on-dark">
          <p class="eyebrow">${svc ? L(svc.name, lang) : t('services', lang)}</p>
          <h2 class="h3" style="color:#fff">${x('Have questions about your coverage?', '¿Tiene dudas sobre su cobertura?')}</h2>
          <p style="color:#cfc7b9;margin-top:10px">${x('Talk to a local agent — we’ll compare carriers and explain your options in plain language.', 'Hable con un agente local — comparamos aseguradoras y le explicamos sus opciones con claridad.')}</p>
          <div class="btn-row mt-2">${btnQuote(lang, svc ? `?type=${svc.id}` : '')}${svc ? `<a class="btn ghost lg" href="${servicePath(svc, lang)}">${L(svc.name, lang)}</a>` : ''}</div>
        </div>
      </div>
    </div>
    <aside class="article-aside"></aside>
  </div>
</article>
<section class="section">
  <div class="container">
    <div class="section-head row"><div><p class="eyebrow">${t('related', lang)}</p><h2 class="h2">${x('More insurance <em>insights</em>', 'Más <em>consejos</em> de seguros')}</h2></div><a class="link-arrow" href="${ROUTES.blog[lang]}">${x('All articles', 'Todos los artículos')} ${icon('arrow')}</a></div>
    <div class="post-grid" data-stagger>${related.map((q) => postCard(q, lang)).join('')}</div>
  </div>
</section>
${ctaBand(lang)}`;

  return {
    title: `${L(p.seoTitle, lang)} | Feel Good Insurance`,
    ogTitle: L(p.title, lang),
    description: L(p.desc, lang),
    header: 'light',
    ogType: 'article',
    ogImage: ogImage(p.img),
    breadcrumbs: crumbs,
    lastmod: p.updated,
    extraMeta: `<meta property="article:published_time" content="${p.date}T12:00:00+00:00"><meta property="article:modified_time" content="${p.updated}T12:00:00+00:00">`,
    schema: [{
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: L(p.title, lang), description: L(p.desc, lang), inLanguage: es ? 'es-US' : 'en-US',
      image: SITE.url + ogImage(p.img), datePublished: p.date, dateModified: p.updated, mainEntityOfPage: SITE.url + postPath(p, lang),
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/' }, publisher: { '@id': SITE.url + '/#agency' },
    }],
    main,
  };
}
