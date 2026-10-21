import assert from 'node:assert/strict';
import { JSDOM, VirtualConsole } from 'jsdom';
import worker from '../dist/worker.js';
export const KEY='ib-easy-coar-v1';
export async function ui(t,saved) {
  const errors=[],vc=new VirtualConsole();
  vc.on('jsdomError',error=>errors.push(error.message));
  const dom=new JSDOM('<!doctype html><html lang="es"><body><div id="app"></div></body></html>',{
    url:'https://example.test',runScripts:'outside-only',virtualConsole:vc
  });
  const w=dom.window,d=w.document;
  w.scrollTo=()=>{};w.confirm=()=>true;
  const intervals=[];w.setInterval=fn=>{intervals.push(fn);return intervals.length;};
  let calls=0;
  w.fetch=()=>{calls++;throw Error('School tools must not call an API');};
  if(saved)w.localStorage.setItem(KEY,typeof saved==='string'?saved:JSON.stringify(saved));
  for(const route of ['/vendor/marked.js','/vendor/purify.js','/chat-format.js','/learning-data.js','/course-data.js','/exam-data.js','/deep-history-math.js','/deep-core.js','/deep-subjects.js','/deep-more.js','/deep-extra-core.js','/deep-extra-digital-history.js','/deep-extra-languages-business.js','/area-data.js','/deep-sciences-bio-cdes.js','/deep-sciences-chem-physics.js','/deep-environment-arts.js','/area-tools.js','/learning-engine.js','/learning-studio.js','/study-workspace.js','/app.js']){
    const response=await worker.fetch(new Request('https://example.test'+route));
    assert.equal(response.status,200);w.eval(await response.text());
  }
  t.after(()=>{w.close();assert.equal(calls,0);assert.deepEqual(errors,[]);});
  const one=selector=>{const el=d.querySelector(selector);assert.ok(el,'Element missing: '+selector);return el;};
  const click=selector=>one(selector).click();
  const change=(selector,value)=>{const el=one(selector);if(el.type==='checkbox')el.checked=value;else el.value=value;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
  const input=(selector,value)=>{const el=one(selector);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));};
  return {w,d,one,click,change,input,tick:()=>intervals.forEach(fn=>fn()),course:id=>click('[data-action="course"][data-course="'+id+'"]'),tab:id=>click('[data-tab="'+id+'"]')};
}
