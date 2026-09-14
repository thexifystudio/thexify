import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('../../sunsu-cleaning-services/web-sunsu-cleaning-services/dist');
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const target = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
      if (!target.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const body = await readFile(target);
      res
        .writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream' })
        .end(body);
    } catch {
      res.writeHead(404).end('Not found');
    }
  })
  .listen(4324, '127.0.0.1', () => console.log('Reference build http://127.0.0.1:4324'));
