import { SITE, ROUTES, AREAS, t, areaPath, areaLabel } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';
import { ogImage } from '../../lib/images.mjs';
import { pageHero, areas3d, ctaBand, btnQuote, btnCall, reviews } from '../../lib/components.mjs';

export default function areas(lang) {
  const es = lang === 'es';
  const x = (en, sp) => (es ? sp : en);
  const crumbs = [{ name: t('home', lang), url: ROUTES.home[lang] }, { name: t('areas', lang), url: ROUTES.areas[lang] }];
  const groups = {};
  AREAS.forEach((a) => { (groups[a.county] = groups[a.county] || []).push(a); });
  const main = `
${pageHero({ lang, crumbs, eyebrow: x('Where we work', 'Dónde trabajamos'), title: x('Based in Sparks. <em>Serving all of Nevada.</em>', 'Con base en Sparks. <em>Al servicio de todo Nevada.</em>'), lead: x('Visit our office on South Rock Blvd or work with us by phone, text and email from anywhere in the state. Choose your community to see local coverage insights.', 'Visite nuestra oficina en South Rock Blvd o trabaje con nosotros por teléfono, mensaje y correo desde cualquier parte del estado. Elija su comunidad para ver información local.'), image: 'statewide.png', actions: `${btnQuote(lang)}${btnCall(lang)}` })}
<section class="section dark a3d-section">
  <div class="container">
    <div class="section-head"><p class="eyebrow">${x('Interactive 3D map', 'Mapa interactivo en 3D')}</p><h2 class="h2 split-words">${x('Find your town. <em>We’re already there.</em>', 'Encuentre su ciudad. <em>Ya estamos ahí.</em>')}</h2><p class="lead">${x('Drag to rotate Northern Nevada, search for your town, or hover the list — the camera flies to each community we serve from our office in Sparks.', 'Arrastre para girar el norte de Nevada, busque su ciudad o pase el cursor por la lista — la cámara vuela a cada comunidad que atendemos desde Sparks.')}</p></div>
    ${areas3d(lang)}
  </div>
</section>
${reviews(lang)}
${ctaBand(lang)}`;
  return {
    title: x('Service Areas: Reno, Sparks & All of Nevada | FGI', 'Áreas de Servicio: Reno, Sparks y Nevada | FGI'),
    description: x('Feel Good Insurance serves Sparks, Reno, Carson City, Spanish Springs, Sun Valley, Incline Village, Fernley, Fallon, Yerington, Washoe County and all of Nevada.', 'Feel Good Insurance atiende Sparks, Reno, Carson City, Spanish Springs, Sun Valley, Incline Village, Fernley, Fallon, Yerington, el condado de Washoe y todo Nevada.'),
    header: 'dark', ogImage: ogImage('statewide.png'), breadcrumbs: crumbs, main,
  };
}
