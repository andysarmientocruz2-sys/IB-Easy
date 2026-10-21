import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import worker from '../dist/worker.js';
const req=(method='POST',origin)=>new Request('https://example.test/api/mentor',{method,headers:origin?{origin}:{}});
test('bundled pages, styling and learning data match the current source',async()=>{
  for(const [route,file] of [['/','index.html'],['/app.js','coar-app.js'],['/style.css','coar.css'],['/chat.css','chat.css'],['/learning-data.js','learning-data.js'],['/course-data.js','course-data.js'],['/exam-data.js','exam-data.js']]){
    const response=await worker.fetch(new Request('https://example.test'+route));
    assert.equal(response.status,200);
    assert.equal(await response.text(),await readFile(new URL('../web/'+file,import.meta.url),'utf8'));
  }
});
test('workers.dev enabled, preview URLs disabled; no secrets in configuration',async()=>{
  const config=JSON.parse(await readFile(new URL('../wrangler.jsonc',import.meta.url),'utf8'));
  assert.equal(config.workers_dev,true);assert.equal(config.preview_urls,false);
  assert.equal(config.name,'ib-easy');assert.equal(config.vars?.GEMINI_API_KEY,undefined);
});
test('school tutor stays paused even if a previous key is configured',async(t)=>{
  let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;throw Error('No upstream allowed');});
  for(const env of [{},{GEMINI_API_KEY:'fake-test-key'}]){
    const response=await worker.fetch(req(),env);
    assert.equal(response.status,503);
    const text=await response.text();assert.match(text,/school_ai_paused/);assert.ok(!text.includes('fake-test-key'));
  }
  assert.equal(calls,0);
});
test('cross-origin mentor requests and incorrect methods are rejected',async()=>{
  assert.equal((await worker.fetch(req('POST','https://other.test'))).status,403);
  assert.equal((await worker.fetch(req('GET'))).status,405);
  assert.equal((await worker.fetch(new Request('https://example.test/',{method:'POST'}))).status,405);
});
test('HEAD, missing assets, security headers and versioned assets behave correctly',async()=>{
  const head=await worker.fetch(new Request('https://example.test/app.js',{method:'HEAD'}));
  assert.equal(head.status,200);assert.equal(await head.text(),'');
  assert.equal((await worker.fetch(new Request('https://example.test/missing.js'))).status,404);
  assert.equal((await worker.fetch(new Request('https://example.test/toString'))).status,404);
  const response=await worker.fetch(new Request('https://example.test/app.js?v=050'));
  assert.equal(response.status,200);
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  assert.match(response.headers.get('content-security-policy'),/connect-src 'none'/);
  const html=await worker.fetch(new Request('https://example.test/'));
  assert.equal(html.headers.get('cache-control'),'no-cache');
});
