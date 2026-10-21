import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import worker from '../dist/worker.js';

async function setup(app = false) {
  const dom = new JSDOM('<!doctype html><html lang="es"><body><div id="app"></div></body></html>', {
    url: 'https://example.test', runScripts: 'outside-only'
  });
  dom.window.scrollTo = () => {};
  for (const route of ['/vendor/marked.js', '/vendor/purify.js', '/chat-format.js', ...(app ? ['/app.js'] : [])]) {
    const response = await worker.fetch(new Request('https://example.test' + route), {});
    assert.equal(response.status, 200);
    dom.window.eval(await response.text());
  }
  return dom;
}
function render(dom, text) {
  const node = dom.window.document.createElement('section');
  node.innerHTML = dom.window.IBChat.render(text);
  return node;
}

test('headings, bold, triple emphasis and paragraphs render as elements', async () => {
  const dom = await setup();
  const node = render(dom, '## Historia\n\n**Evidencia** y ***evaluación***.\n\nOtro párrafo.');
  assert.equal(node.querySelector('h2').textContent, 'Historia');
  assert.equal(node.querySelector('strong').textContent, 'Evidencia');
  assert.ok(node.querySelector('em strong, strong em'));
  assert.equal(node.querySelectorAll('p').length, 2);
  assert.ok(!node.textContent.includes('**'));
  dom.window.close();
});
test('lists, quotes, table, code and escaped code contents', async () => {
  const dom = await setup();
  const node = render(dom, '1. Uno\n2. Dos\n\n- Pista\n\n> Piensa\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\n```html\n<img onerror="alert(1)">\n```');
  assert.equal(node.querySelectorAll('ol li').length, 2);
  assert.ok(node.querySelector('ul li'));
  assert.ok(node.querySelector('blockquote'));
  assert.ok(node.querySelector('.table-scroll[tabindex="0"] table'));
  assert.ok(node.querySelector('pre code').textContent.includes('<img'));
  assert.equal(node.querySelectorAll('img').length, 0);
  dom.window.close();
});
test('removes scripts, images, events, SVG, iframe, style and clobbering attributes', async () => {
  const dom = await setup();
  const node = render(dom, '<script>alert(1)</script><img src="https://tracker.test/pixel" onerror="alert(1)"><svg onload="alert(1)"></svg><iframe src="https://evil.test"></iframe><p id="app" style="position:fixed" onclick="alert(1)">Texto</p>');
  assert.equal(node.querySelectorAll('script,img,svg,iframe,style,[onclick],[onerror],[onload],[id],[style]').length, 0);
  assert.match(node.textContent, /Texto/);
  dom.window.close();
});
test('unsafe and relative links disabled; HTTPS links isolated', async () => {
  const dom = await setup();
  const node = render(dom, '[Fuente](https://example.com) <a href="javascript:alert(1)">x</a> <a href="data:text/html,test">y</a> <a href="/api/mentor">z</a>');
  const links = node.querySelectorAll('a');
  assert.equal(links[0].getAttribute('rel'), 'noopener noreferrer');
  assert.equal(links[0].getAttribute('referrerpolicy'), 'no-referrer');
  for (const link of [...links].slice(1)) assert.equal(link.hasAttribute('href'), false);
  dom.window.close();
});
test('missing formatting libraries falls back to escaped readable text', async () => {
  const dom = await setup();
  dom.window.marked = undefined;
  const node = render(dom, '<script>alert(1)</script>\n**texto**');
  assert.equal(node.querySelector('script'), null);
  assert.ok(node.querySelector('br'));
  assert.match(node.textContent, /<script>/);
  dom.window.close();
});
test('formatting assets are served from this Worker, not third-party CDNs', async () => {
  const html = await (await worker.fetch(new Request('https://example.test/'), {})).text();
  assert.ok(!html.includes('<script src="https://'));
  for (const [route, file] of [['/chat-format.js','web/chat-format.js'],['/vendor/marked.js','node_modules/marked/lib/marked.umd.js'],['/vendor/purify.js','node_modules/dompurify/dist/purify.min.js']]) {
    assert.equal(await (await worker.fetch(new Request('https://example.test' + route), {})).text(), await readFile(new URL('../' + file, import.meta.url), 'utf8'));
  }
});
