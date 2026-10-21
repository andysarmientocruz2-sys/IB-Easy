// Local design preview: no credentials, no Gemini requests, no public listener.
import { createServer } from 'node:http';
import worker from '../dist/worker.js';

const server = createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(403, { 'content-type': 'application/json' });
      response.end(JSON.stringify({ code: 'preview_only', message: 'Local format preview: AI requests are disabled.' }));
      return;
    }
    const result = await worker.fetch(new Request(new URL(request.url, 'http://127.0.0.1:4173'), { method: request.method }), {});
    response.writeHead(result.status, Object.fromEntries(result.headers));
    response.end(request.method === 'HEAD' ? undefined : Buffer.from(await result.arrayBuffer()));
  } catch {
    response.writeHead(500);
    response.end('Preview error');
  }
});
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'Port 4173 is busy. Close the previous preview and retry.' : 'Could not start the local preview.');
  process.exitCode = 1;
});
server.listen(4173, '127.0.0.1', () => console.log('Local preview: http://127.0.0.1:4173 — No API calls. Stop with Ctrl+C.'));
