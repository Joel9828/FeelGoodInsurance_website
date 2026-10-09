// Static dev server for dist/ — mirrors production (.htaccess): clean URLs, gzip, long cache for assets, 404 pages.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve('dist'), port = +process.env.PORT || 4321;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
const compressible = new Set(['.html', '.css', '.js', '.json', '.svg', '.xml', '.txt', '.webmanifest']);

function send(req, res, file, status = 200) {
  const ext = path.extname(file);
  const headers = { 'Content-Type': types[ext] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' };
  headers['Cache-Control'] = ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable';
  let body = fs.readFileSync(file);
  if (compressible.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) { body = zlib.gzipSync(body, { level: 9 }); headers['Content-Encoding'] = 'gzip'; headers.Vary = 'Accept-Encoding'; }
  res.writeHead(status, headers);
  res.end(body);
}

http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split('?')[0]);
  if (req.method === 'POST' && p === '/api/contact.php') { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { console.log('FORM', b); res.writeHead(200, { 'Content-Type': 'application/json' }); res.end('{"ok":true}'); }); return; }
  let f = path.join(root, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) {
    if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
    f = path.join(f, 'index.html');
  }
  if (!fs.existsSync(f)) return send(req, res, path.join(root, p.startsWith('/es/') ? 'es/404.html' : '404.html'), 404);
  send(req, res, f);
}).listen(port, () => console.log(`http://localhost:${port}`));
