import test from 'node:test';
import assert from 'node:assert/strict';
import {ui,KEY} from './test-ui.mjs';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

test('portable HTML includes its assets and opens the study flow without a server',async t=>{
  const html=await readFile(new URL('../dist/IB-Easy-COAR.html',import.meta.url),'utf8');
  const dom=new JSDOM(html,{url:'file:///IB-Easy-COAR.html',runScripts:'outside-only'});
  t.after(()=>dom.window.close());dom.window.scrollTo=()=>{};
  dom.window.fetch=()=>{throw Error('Portable preview must be self-contained');};
  dom.window.setInterval=()=>0;
  assert.equal(dom.window.document.querySelectorAll('script[src],link[rel="stylesheet"]').length,0);
  for(const script of dom.window.document.querySelectorAll('script'))dom.window.eval(script.textContent);
  const d=dom.window.document;assert.equal(d.querySelectorAll('.course-card').length,16);
  d.querySelector('[data-action="course"][data-course="history"]').click();
  d.querySelector('[data-topic="ww2"]').click();assert.ok(d.querySelector('.timeline'));
  d.querySelector('[data-mode="quiz"]').click();assert.equal(d.querySelectorAll('.quiz-card').length,6);
});

test('all sixteen areas offer working bilingual sections without model requests',async t=>{
  const x=await ui(t);
  for(const lang of ['es','en']){
    x.change('#language',lang);
    for(const c of x.w.IBLearning.courses){
      x.course(c.id);assert.equal(x.one('h1').textContent,c.name[lang]);
      assert.equal(x.d.querySelectorAll('.topic-card').length,c.id==='history'?8:5);
      assert.equal(!!x.d.querySelector('#level'),!c.core);
      for(const tab of ['review','notes','mentor','resources','exams','study'])x.tab(tab);
    }
    assert.equal(x.d.documentElement.lang,lang);
  }
});
test('a History topic opens information before questions, with chronology and sources',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="ww2"]');
  assert.match(x.one('.lesson-header').textContent,/Segunda Guerra Mundial/);
  assert.ok(x.d.querySelectorAll('.reading-panel section').length>=3);
  assert.ok(x.d.querySelectorAll('.timeline li').length>=3);
  assert.ok(x.d.querySelector('.source-links a[href^="https://"]'));
  assert.equal(x.d.querySelector('.quiz-card'),null);
  assert.equal(x.d.querySelector('.writing-task'),null);
});
test('topic search ignores accents and never substitutes unrelated questions',async t=>{
  const x=await ui(t);x.course('history');x.input('#topic-search','guerra fria');
  assert.equal(x.d.querySelectorAll('.topic-card').length,1);
  assert.equal(x.one('.topic-card').dataset.topic,'coldwar');
  x.input('#topic-search','tema que no existe');
  assert.equal(x.d.querySelectorAll('.topic-card').length,0);
  assert.match(x.one('.empty-state').textContent,/No encontramos/);
});
test('wrong answer is explained, recorded, and cleared after a successful retry',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="ww2"]');x.click('[data-mode="quiz"]');
  const q=x.w.IBLearning.history.find(t=>t.id==='ww2').quiz[0],wrong=(q.answer+1)%q.options.length;
  x.click('[data-q="0"][data-choice="'+wrong+'"]');
  assert.equal(x.one('.feedback p').textContent,q.why.es);
  assert.ok(x.one('.quiz-option.incorrect').disabled);
  x.click('[data-view="progress"]');assert.equal(x.d.querySelectorAll('[data-action="review-mistake"]').length,1);
  x.click('[data-action="review-mistake"]');x.click('[data-q="0"][data-choice="'+q.answer+'"]');
  x.click('[data-view="progress"]');assert.equal(x.d.querySelectorAll('[data-action="review-mistake"]').length,0);
});
test('answers remain tied to their topic and complete rounds can restart',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="ww2"]');x.click('[data-mode="quiz"]');
  for(const [i,q] of x.w.IBLearning.history.find(t=>t.id==='ww2').quiz.entries())x.click('[data-q="'+i+'"][data-choice="'+q.answer+'"]');
  assert.match(x.one('.completion').textContent,/6\/6/);
  x.click('[data-action="quiz-reset"]');assert.equal(x.d.querySelectorAll('.feedback').length,0);
  x.click('[data-q="0"][data-choice="0"]');x.click('[data-action="all-topics"]');x.click('[data-topic="ww1"]');x.click('[data-mode="quiz"]');
  assert.equal(x.d.querySelectorAll('.feedback').length,0);
});
test('reading, bookmarking and flashcards link back to the correct lesson',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="coldwar"]');
  x.click('[data-action="mark-read"]');x.click('[data-action="bookmark"]');x.click('[data-view="progress"]');
  assert.equal(x.one('.stat b').textContent,'1');
  x.click('[data-action="saved-topic"]');assert.match(x.one('.lesson-header h2').textContent,/Guerra Fría/);
  x.tab('review');assert.equal(x.d.querySelector('.flash-answer'),null);
  x.click('[data-action="flip"]');assert.ok(x.d.querySelector('.flash-answer'));
  x.click('[data-action="flash-next"]');assert.equal(x.d.querySelector('.flash-answer'),null);
  const title=x.one('.flashcard .eyebrow').textContent;
  x.click('.flash-actions [data-action="topic"]');assert.equal(x.one('.lesson-header h2').textContent,title);
});
test('Paper 1 provides four labelled teaching sources and all five response parts',async t=>{
  const x=await ui(t);x.course('history');x.tab('exams');
  assert.equal(x.d.querySelectorAll('.source-card').length,4);
  assert.equal(x.d.querySelectorAll('.writing-task textarea').length,5);
  assert.equal(x.w.IBLearning.exams.paper1.questions.reduce((sum,q)=>sum+q.marks,0),24);
  assert.match(x.one('.dossier-heading').textContent,/no documentos de época/);
  assert.ok([...x.d.querySelectorAll('.self-review,.feedback')].every(el=>el.hidden));
});
test('Paper 2 filters by topic and skill, and self-review never invents a grade',async t=>{
  const x=await ui(t);x.course('history');x.tab('exams');x.click('[data-paper="2"]');
  x.change('#exam-topic','ww2');assert.equal(x.d.querySelectorAll('.essay-card').length,2);
  x.change('#command','evaluate');assert.equal(x.d.querySelectorAll('.essay-card').length,1);
  x.click('.essay-card');x.click('[data-action="review"]');assert.ok(x.one('.self-review').hidden);
  x.input('[data-draft]','Mi argumento necesita evidencia.');assert.match(x.one('.writing-meta').textContent,/4 palabras/);
  x.click('[data-action="hint"]');assert.equal(x.one('.feedback').hidden,false);
  x.click('[data-action="review"]');assert.equal(x.one('.self-review').hidden,false);
  assert.match(x.one('.self-review h4').textContent,/sin nota automática/);
  x.change('[data-check]',true);x.tab('study');x.tab('exams');assert.ok(x.one('[data-check]').checked);
  assert.equal(x.one('[data-draft]').value,'Mi argumento necesita evidencia.');
});
test('Paper 3 is HL only; unavailable regions remain visibly empty',async t=>{
  const x=await ui(t);x.course('history');x.tab('exams');x.change('#level','SL');
  assert.ok(x.one('[data-paper="3"]').disabled);x.click('[data-paper="3"]');
  assert.equal(x.d.querySelector('#region'),null);
  x.change('#level','HL');x.click('[data-paper="3"]');
  assert.equal(x.d.querySelectorAll('.essay-card').length,6);
  x.change('#region','europe');assert.equal(x.d.querySelectorAll('.essay-card').length,3);
  x.change('#region','asia');assert.equal(x.d.querySelectorAll('.essay-card').length,0);
  assert.match(x.one('.empty-state').textContent,/otra región/);
  x.change('#level','SL');assert.equal(x.d.querySelector('#region'),null);
  assert.ok(x.d.querySelector('.source-grid'));
});
test('2028 does not expose legacy paper practice as current assessment',async t=>{
  const x=await ui(t);x.course('history');x.tab('exams');x.change('#year','2028');
  assert.ok(x.d.querySelector('.new-program'));assert.equal(x.d.querySelector('.paper-grid'),null);
  assert.match(x.one('.new-program a').href,/history-updates/);
  x.tab('study');assert.equal(x.d.querySelectorAll('.topic-card').length,8);
  x.tab('exams');x.change('#year','2027');assert.ok(x.d.querySelector('.paper-grid'));
});
test('notes are escaped, separate between courses and not saved without opt-in',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="ww2"]');
  const text='<img src=x onerror=alert(1)> & mi resumen';
  x.input('#lesson-note',text);x.course('math');x.click('[data-topic="math-functions"]');
  assert.equal(x.one('#lesson-note').value,'');
  x.course('history');x.tab('notes');assert.equal(x.one('[data-note="ww2"]').value,text);
  assert.equal(x.d.querySelector('img'),null);
  x.w.dispatchEvent(new x.w.Event('pagehide'));assert.equal(x.w.localStorage.getItem(KEY),null);
});
test('optional saving survives reload; disabling removes saved work; clearing resets it',async t=>{
  const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);
  x.course('history');x.click('[data-topic="ww2"]');x.input('#lesson-note','Mi evidencia');
  x.w.dispatchEvent(new x.w.Event('pagehide'));
  const saved=x.w.localStorage.getItem(KEY),y=await ui(t,saved);
  assert.equal(y.one('#lesson-note').value,'Mi evidencia');
  y.click('[data-view="settings"]');y.change('#persist',false);assert.equal(y.w.localStorage.getItem(KEY),null);
  y.change('#persist',true);y.click('[data-action="clear-data"]');assert.equal(y.w.localStorage.getItem(KEY),null);
  y.course('history');y.click('[data-topic="ww2"]');assert.equal(y.one('#lesson-note').value,'');
});
test('bad stored JSON is recovered without breaking the workspace',async t=>{
  const x=await ui(t,'{broken');assert.equal(x.d.querySelectorAll('.course-card').length,16);
});
test('weekly tasks can be added, completed and deleted',async t=>{
  const x=await ui(t);x.click('[data-view="planner"]');
  x.input('[name="task"]','Repasar causas');x.change('[name="course"]','history');x.input('[name="date"]','2026-10-20');
  x.one('#task-form').dispatchEvent(new x.w.Event('submit',{bubbles:true,cancelable:true}));
  assert.match(x.one('.task strong').textContent,/Repasar causas/);
  x.change('[data-task]',true);assert.ok(x.d.querySelector('.task.done'));
  x.click('[data-action="delete-task"]');assert.equal(x.d.querySelectorAll('.task').length,0);
});
test('focus timer pauses, resets and records one completed session',async t=>{
  const x=await ui(t);let now=100000;x.w.Date.now=()=>now;
  x.course('history');x.click('[data-topic="ww2"]');x.click('[data-action="timer-toggle"]');
  now+=60000;x.tick();assert.equal(x.one('[data-clock]').textContent,'24:00');
  x.click('[data-action="timer-toggle"]');now+=60000;x.tick();assert.equal(x.one('[data-clock]').textContent,'24:00');
  x.click('[data-action="timer-reset"]');assert.equal(x.one('[data-clock]').textContent,'25:00');
  x.click('[data-action="timer-toggle"]');now+=1500000;x.tick();x.tick();
  x.click('[data-view="progress"]');assert.equal(x.d.querySelectorAll('.stat b')[3].textContent,'1');
});
test('prepared study support renders Markdown and copies readable answers',async t=>{
  const x=await ui(t);let copied;
  Object.defineProperty(x.w.HTMLElement.prototype,'innerText',{get(){return this.textContent;}});
  Object.defineProperty(x.w.navigator,'clipboard',{value:{writeText:async text=>{copied=text;}}});
  x.course('history');x.tab('mentor');x.change('#support-topic','ww2');x.click('[data-kind="mistake"]');
  assert.ok(x.d.querySelector('.conversation h2'));assert.ok(x.d.querySelector('.conversation strong'));
  assert.match(x.one('.support-panel .tag').textContent,/SIN IA/);
  x.click('[data-copy-message]');await Promise.resolve();
  assert.match(copied,/Segunda Guerra Mundial/);assert.ok(!copied.includes('**'));
  x.click('[data-action="clear-support"]');assert.equal(x.d.querySelectorAll('.message').length,0);
});
test('downloaded work contains current notes and no credential fields',async t=>{
  const x=await ui(t);let blob,name;
  x.w.URL.createObjectURL=b=>{blob=b;return 'blob:https://example.test/backup';};
  x.w.URL.revokeObjectURL=()=>{};
  x.w.HTMLAnchorElement.prototype.click=function(){name=this.download;};
  x.course('history');x.click('[data-topic="ww2"]');x.input('#lesson-note','Mi resumen');
  x.click('[data-view="settings"]');x.click('[data-action="export"]');
  assert.equal(name,'IB-Easy-mi-trabajo.json');
  const text=await new Promise((resolve,reject)=>{const r=new x.w.FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsText(blob);});
  const data=JSON.parse(text);assert.equal(data.notes.ww2,'Mi resumen');
  assert.equal(data.GEMINI_API_KEY,undefined);
});
