import { ROUTES, GALLERY, t } from '../site.mjs';
import { ogImage } from '../../lib/images.mjs';
import { pageHero, galleryGrid, ctaBand, btnQuote } from '../../lib/components.mjs';

export default function gallery(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('gallery', lang), url: ROUTES.gallery[lang] }];
  return {
    title: x('Gallery: Our Sparks Office & Team | Feel Good Insurance', 'Galería: Oficina y Equipo en Sparks | Feel Good Insurance'),
    description: x('See our Sparks, NV office, our team and the community events we take part in. Feel Good Insurance takes pride in serving Northern Nevada.', 'Conozca nuestra oficina en Sparks, NV, nuestro equipo y los eventos comunitarios en los que participamos.'),
    header: 'dark', ogImage: ogImage('10.webp'), breadcrumbs: crumbs,
    main: `
${pageHero({ lang, crumbs, compact: true, eyebrow: x('Our gallery', 'Galería'), title: x('Our agency <em>in action</em>', 'Nuestra agencia <em>en acción</em>'), lead: x('Our team takes pride in serving the local community. Take a look around our Sparks office and meet the people behind your policy.', 'Nuestro equipo se enorgullece de servir a la comunidad. Conozca nuestra oficina en Sparks y a las personas detrás de su póliza.'), image: '2.webp', actions: btnQuote(lang) })}
<section class="section"><div class="container">${galleryGrid(lang, GALLERY, true)}</div></section>
${ctaBand(lang, { title: x('Come visit us on <em>South Rock Blvd</em>', 'Visítenos en <em>South Rock Blvd</em>') })}`,
  };
}
