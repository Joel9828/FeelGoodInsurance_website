import { SITE, ROUTES, t, L } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { ogImage } from '../../lib/images.mjs';
import { pageHero, postCard, ctaBand } from '../../lib/components.mjs';
import { POSTS, CATS, postPath } from '../posts/index.mjs';

export default function blog(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('blog', lang), url: ROUTES.blog[lang] }];
  const [first, ...rest] = POSTS;
  const main = `
${pageHero({ lang, crumbs, compact: true, eyebrow: x('Insurance insights', 'Consejos de seguros'), title: x('Smarter coverage <em>decisions</em>', 'Decisiones de cobertura <em>más inteligentes</em>'), lead: x('Helpful guides, practical tips and expert insights on auto, life, business and homeowners insurance — so you can compare your options and protect what matters most.', 'Guías útiles, consejos prácticos y la opinión de expertos sobre seguros de auto, vida, negocio y casa — para comparar sus opciones y proteger lo que más importa.'), image: 'Notary-service7.jpg' })}
<section class="section" data-blog>
  <div class="container">
    <h2 class="sr-only">${x('All articles', 'Todos los artículos')}</h2>
    <div class="filters" role="group" aria-label="${x('Filter articles', 'Filtrar artículos')}">
      <button class="filter-btn active" type="button" data-cat="all" aria-pressed="true">${x('All', 'Todos')}</button>
      ${Object.entries(CATS).map(([k, v]) => `<button class="filter-btn" type="button" data-cat="${k}" aria-pressed="false">${L(v, lang)}</button>`).join('')}
      <div class="search-box">${icon('search')}<input class="input" type="search" placeholder="${x('Search articles…', 'Buscar artículos…')}" aria-label="${x('Search articles', 'Buscar artículos')}"></div>
    </div>
    <div class="post-grid" data-stagger>
      ${postCard(first, lang, { featured: true })}
      ${rest.map((p) => postCard(p, lang)).join('')}
    </div>
    <p class="no-results lead center mt-4" hidden>${x('No articles match your search.', 'Ningún artículo coincide con su búsqueda.')}</p>
  </div>
</section>
${ctaBand(lang)}`;
  return {
    title: x('Insurance Blog & Guides | Feel Good Insurance', 'Blog y Guías de Seguros | Feel Good Insurance'),
    description: x('Expert insurance guides from Feel Good Insurance in Sparks, NV: auto insurance benefits, dash cams, life insurance, AD&D, general liability, LLC coverage and more.', 'Guías de seguros de Feel Good Insurance en Sparks, NV: beneficios del seguro de auto, cámaras para auto, seguro de vida, AD&D, responsabilidad general, LLC y más.'),
    header: 'dark', ogImage: ogImage('Notary-service7.jpg'), breadcrumbs: crumbs,
    schema: [{ '@context': 'https://schema.org', '@type': 'Blog', name: x('Feel Good Insurance Blog', 'Blog de Feel Good Insurance'), url: SITE.url + ROUTES.blog[lang], inLanguage: es ? 'es-US' : 'en-US', blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: L(p.title, lang), url: SITE.url + postPath(p, lang), datePublished: p.date })) }],
    main,
  };
}
