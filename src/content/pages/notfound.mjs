import { ROUTES, SERVICES, L, servicePath } from '../site.mjs';
import { icon } from '../../lib/icons.mjs';

export default function notFound(lang) {
  const es = lang === 'es';
  return {
    title: es ? 'Página no encontrada | Feel Good Insurance' : 'Page Not Found | Feel Good Insurance',
    description: es ? 'La página que busca no existe o cambió de dirección.' : 'The page you are looking for doesn’t exist or has moved.',
    header: 'light',
    main: `<section class="page-404"><div class="container narrow">
      <div class="big" aria-hidden="true">404</div>
      <h1 class="h2 mt-2">${es ? 'Esta página <em>se perdió en el camino</em>' : 'This page took a <em>wrong turn</em>'}</h1>
      <p class="lead mt-2" style="margin-inline:auto">${es ? 'La dirección pudo haber cambiado con nuestro nuevo sitio. Estas páginas le pueden ayudar:' : 'The address may have changed with our new website. These pages can help:'}</p>
      <div class="btn-row mt-3" style="justify-content:center"><a class="btn" href="${ROUTES.home[lang]}">${es ? 'Ir al inicio' : 'Go to homepage'} ${icon('arrow', 'arrow-ico')}</a><a class="btn ghost" href="${ROUTES.contact[lang]}">${es ? 'Contáctenos' : 'Contact us'}</a></div>
      <div class="area-cloud mt-4" style="justify-content:center">${SERVICES.map((s) => `<a class="area-pill" href="${servicePath(s, lang)}">${icon(s.icon)}${L(s.name, lang)}</a>`).join('')}</div>
    </div></section>`,
  };
}
