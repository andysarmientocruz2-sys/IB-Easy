import test from 'node:test';
import assert from 'node:assert/strict';
import {ui} from './test-ui.mjs';

test('History stands alone and Electives contains exactly the requested nine subjects',async t=>{
 const x=await ui(t);const groups=x.w.IBLearning.groups;
 assert.deepEqual(Array.from(groups.find(g=>g.id==='history').courses),['history']);
 assert.deepEqual(Array.from(groups.find(g=>g.id==='electives').courses),['business','digital','ess','biology','sports','chemistry','physics','music','visualarts']);
 assert.equal(groups.flatMap(g=>g.courses).length,16);
 x.click('[data-studio="group"][data-group="electives"]');
 assert.equal(x.d.querySelectorAll('.area-group:not([hidden]) .course-card').length,9);
 assert.equal(x.d.querySelector('.area-group:not([hidden]) [data-course="history"]'),null);
});

test('all subject hubs have distinct bilingual challenges and working tools without changing progress',async t=>{
 const x=await ui(t);
 for(const lang of ['es','en']){
  x.change('#language',lang);const challenges=new Set();
  for(const c of x.w.IBLearning.courses){
   x.course(c.id);assert.ok(x.one('.subject-hub'));challenges.add(x.one('.subject-challenge p').textContent);
   const first=x.w.IBStudy.catalog().find(a=>a.course===c.id);
   x.click('.subject-hub [data-studio="open"]');assert.equal(x.one('.lesson-header h2').textContent,first.title[lang]);assert.equal(x.d.querySelector('.subject-hub'),null);
   x.click('[data-action="all-topics"]');
   for(const tab of ['exams','review','notes']){x.click('.subject-tools [data-tab="'+tab+'"]');assert.equal(x.one('.tabs [aria-current="page"]').dataset.tab,tab);x.tab('study');}
   assert.match(x.one('.subject-metrics').textContent,/0\//);
  }
  assert.equal(challenges.size,16);
 }
});
