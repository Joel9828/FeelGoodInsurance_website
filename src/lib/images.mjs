// Responsive image pipeline: originals in src/img-original -> optimized WebP set in dist/assets/img
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('src/img-original');
const OUT_DIR = 'assets/img';
const meta = new Map();
const jobs = new Map(); // outName -> {file, width, height, fit, format, quality}

export async function loadImageMeta() {
  for (const f of fs.readdirSync(SRC)) {
    if (!/\.(png|jpe?g|webp)$/i.test(f)) continue;
    try { const m = await sharp(path.join(SRC, f)).metadata(); meta.set(f, { w: m.width, h: m.height }); } catch {}
  }
}

const slug = (f) => f.replace(/\.[a-z]+$/i, '').toLowerCase().replace(/-?e\d{10,}/g, '').replace(/-scaled/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

function job(file, w, opts = {}) {
  const m = meta.get(file);
  if (!m) throw new Error('Image not found: ' + file);
  const width = Math.min(w, m.w);
  const fmt = opts.format || 'webp';
  const name = `${opts.name || slug(file)}-${width}${opts.h ? 'x' + opts.h : ''}.${fmt}`;
  if (!jobs.has(name)) jobs.set(name, { file, width, height: opts.h, fmt, quality: opts.quality || (fmt === 'webp' ? 72 : 80) });
  return { url: `/${OUT_DIR}/${name}`, width };
}

export function dims(file) { return meta.get(file); }

/**
 * <img> with srcset.
 * opts: alt, sizes, widths, cls, priority (LCP), ratio ('4/5' crop), style, attrs
 */
export function img(file, opts = {}) {
  const m = meta.get(file);
  if (!m) throw new Error('Image not found: ' + file);
  const set = srcSet(file, opts.widths);
  const largest = set[set.length - 1];
  const fallback = set.find((s) => s.width >= 800) || largest;
  const w = largest.width, h = Math.round((m.h / m.w) * w);
  const alt = (opts.alt ?? '').replace(/"/g, '&quot;');
  const loading = opts.priority ? 'fetchpriority="high" loading="eager" decoding="async"' : 'loading="lazy" decoding="async"';
  return `<img src="${fallback.url}" srcset="${set.map((s) => `${s.url} ${s.width}w`).join(', ')}" sizes="${opts.sizes || '(max-width: 760px) 100vw, 50vw'}" width="${w}" height="${h}" alt="${alt}" ${loading}${opts.cls ? ` class="${opts.cls}"` : ''}${opts.style ? ` style="${opts.style}"` : ''}${opts.attrs ? ' ' + opts.attrs : ''}>`;
}

/** Plain URL to one size (e.g. for lightbox targets or preload) */
export function imgUrl(file, w = 1600) { return job(file, w).url; }

function srcSet(file, widths = [400, 640, 960, 1280, 1600]) {
  const m = meta.get(file);
  const ws = widths.filter((w, i, a) => w <= m.w || i === 0 || a[i - 1] < m.w);
  return [...new Map(ws.map((w) => { const j = job(file, w); return [j.width, j]; })).values()];
}

/** Preload tag for the LCP image (must use the same widths as the <img>) */
export function preload(file, sizes = '100vw', widths) {
  const set = srcSet(file, widths);
  return `<link rel="preload" as="image" imagesrcset="${set.map((s) => `${s.url} ${s.width}w`).join(', ')}" imagesizes="${sizes}" fetchpriority="high">`;
}

/** 1200x630 JPEG for Open Graph / Twitter cards */
export function ogImage(file) {
  const name = `og-${slug(file)}.jpg`;
  if (!jobs.has(name)) jobs.set(name, { file, width: 1200, height: 630, fmt: 'jpeg', quality: 80, cover: true });
  return `/${OUT_DIR}/${name}`;
}

/** Square/fixed-size asset (logos, avatars, icons) */
export function fixed(file, w, h, fmt = 'png', name) {
  const out = `${name || slug(file)}-${w}x${h}.${fmt}`;
  if (!jobs.has(out)) jobs.set(out, { file, width: w, height: h, fmt, quality: 82, cover: true });
  return `/${OUT_DIR}/${out}`;
}

export async function runImageJobs(distDir) {
  const out = path.join(distDir, OUT_DIR);
  fs.mkdirSync(out, { recursive: true });
  let made = 0;
  const list = [...jobs.entries()];
  const worker = async () => {
    while (list.length) {
      const [name, j] = list.shift();
      const target = path.join(out, name);
      const cache = path.resolve('.cache/img', name);
      if (fs.existsSync(cache)) { fs.copyFileSync(cache, target); continue; }
      let p = sharp(path.join(SRC, j.file)).rotate();
      p = j.height ? p.resize(j.width, j.height, { fit: 'cover', position: 'attention' }) : p.resize({ width: j.width, withoutEnlargement: true });
      if (j.fmt === 'webp') p = p.webp({ quality: j.quality, effort: 5 });
      else if (j.fmt === 'jpeg') p = p.jpeg({ quality: j.quality, mozjpeg: true });
      else p = p.png({ compressionLevel: 9 });
      fs.mkdirSync(path.dirname(cache), { recursive: true });
      await p.toFile(cache);
      fs.copyFileSync(cache, target);
      made++;
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  return { total: jobs.size, made };
}
