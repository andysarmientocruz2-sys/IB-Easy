import test from 'node:test';
import assert from 'node:assert/strict';
import {ui,KEY} from './test-ui.mjs';
import {readFile} from 'node:fs/promises';
import worker from '../dist/worker.js';
const added=['biology','chemistry','physics','sports','ess','music','visualarts'];
const snapshot=x=>{x.w.dispatchEvent(new x.w.Event('pagehide'));return JSON.parse(x.w.localStorage.getItem(KEY));};
const submit=x=>x.one('#custom-search-form').dispatchEvent(new x.w.Event('submit',{bubbles:true,cancelable:true}));

test('five subject groups contain exactly sixteen unique area hubs with independent calls to action',async t=>{
 const x=await ui(t);assert.equal(x.d.querySelectorAll('.area-group').length,5);
 const ids=[...x.d.querySelectorAll('.course-card')].map(c=>c.dataset.course);assert.equal(new Set(ids).size,16);
 for(const id of ids){const card=x.one('.course-card[data-course="'+id+'"]');assert.equal(card.tagName,'ARTICLE');assert.equal(card.querySelectorAll('button button').length,0);assert.ok(card.querySelector('[data-action="area-custom"]'));assert.match(card.textContent,/pendientes o por corregir/);}
 for(const id of added){x.click('.course-card[data-course="'+id+'"] [data-action="area-custom"]');assert.equal(x.d.activeElement.id,'custom-query');assert.equal(x.one('h1').textContent,x.w.IBLearning.courses.find(c=>c.id===id).name.es);x.click('[data-view="home"]');}
});
test('each area has its own free-topic example in both languages on every tab',async t=>{
 const x=await ui(t);for(const lang of ['es','en']){x.change('#language',lang);const placeholders=[];
 for(const c of x.w.IBLearning.courses){x.course(c.id);for(const tab of ['study','exams','review','notes','mentor','resources']){x.tab(tab);assert.equal(x.one('#custom-query').placeholder,c.example[lang]);assert.equal(x.d.querySelectorAll('#custom-search-form').length,1);assert.ok(x.one('[data-action="custom-toggle"]'));}placeholders.push(x.one('#custom-query').placeholder);}assert.equal(new Set(placeholders).size,16);}
});
test('new area content includes developed original lessons, specific practice and feedback',async t=>{
 const x=await ui(t),all=x.w.IBStudy.catalog();for(const id of added){const ts=all.filter(a=>a.course===id);assert.equal(ts.length,5);for(const a of ts){assert.equal(a.quiz.length,3);assert.ok(a.deep.glossary.length>=3,a.id);assert.ok(a.deep.mistakes.length>=2,a.id);assert.ok(a.deep.sections.every(s=>s.body.length>160),a.id);assert.ok(a.deep.practice.steps.length>=2);assert.ok(a.deep.practice.checks.length>=2);assert.ok(a.refs.every(r=>x.w.IBStudy.safeURL(r.url)));}}
});
test('specific free topics resolve locally and never cross subject boundaries',async t=>{
 const x=await ui(t);const cases=[['biology','TRANSPORTE A TRAVES DE LA MEMBRANA CELULAR','biology-cells'],['chemistry','Equilibrio químico y principio de Le Châtelier','chemistry-equilibrium'],['physics','Movimiento circular y fuerza centrípeta','physics-motion'],['sports','Sistemas energéticos durante el ejercicio','sports-energy'],['ess','Contaminación del agua y sostenibilidad','ess-water'],['music','Ritmo, melodía y armonía en una composición','music-elements'],['visualarts','Uso del color y composición visual','art-color']];
 for(const [area,query,id]of cases){x.course(area);x.input('#custom-query',query);submit(x);assert.ok(x.d.querySelector('.related-lesson [data-topic="'+id+'"]'),query);x.click('.related-lesson [data-topic="'+id+'"]');assert.equal(x.d.querySelector('.quiz-card'),null);assert.ok(x.one('.reading-panel').textContent.includes(x.w.IBStudy.catalog().find(t=>t.id===id).deep.sections[0].body));}
 x.course('biology');x.input('#custom-query','movimiento circular fuerza centrípeta');submit(x);assert.match(x.one('.availability').textContent,/no disponible/);assert.equal(x.d.querySelector('.related-lesson [data-topic="physics-motion"]'),null);
 x.course('biology');x.input('#custom-query','membrna');submit(x);assert.ok(x.d.querySelector('[data-topic="biology-cells"]'));
});
test('free-topic drafts survive switching subjects and storage reload without leaking between them',async t=>{
 const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);x.course('biology');x.input('#custom-query','Mi célula');submit(x);x.input('#custom-material','Mis apuntes de biología');
 x.course('physics');assert.equal(x.one('#custom-query').value,'');x.input('#custom-query','Mi péndulo');submit(x);x.input('#custom-material','Mis apuntes de física');
 x.course('biology');assert.equal(x.one('#custom-query').value,'Mi célula');assert.equal(x.one('#custom-material').value,'Mis apuntes de biología');
 const y=await ui(t,snapshot(x));assert.equal(y.one('#custom-material').value,'Mis apuntes de biología');y.course('physics');assert.equal(y.one('#custom-material').value,'Mis apuntes de física');
});
test('personal topics retain area, level, language and difficulty and cannot acquire unrelated practice',async t=>{
 const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);
 for(const id of added){x.course(id);x.change('#level','HL');x.change('#difficulty','advanced');x.input('#custom-query','Tema propio '+id);submit(x);x.input('#custom-material','Material propio sobre '+id);x.click('[data-action="save-custom"]');assert.equal(x.d.querySelectorAll('.personal-topic-list button').length,1);x.tab('exams');assert.equal(x.d.querySelector('#skill-draft'),null);x.tab('review');assert.equal(x.d.querySelector('.flashcard'),null);}
 const data=snapshot(x);assert.equal(data.customTopics.length,7);for(const c of data.customTopics){assert.equal(c.level,'HL');assert.equal(c.difficulty,'advanced');assert.equal(c.lang,'es');assert.ok(added.includes(c.course));}
 const round=x.w.IBStudy.parseBackup(JSON.stringify(data));assert.equal(round.customTopics.length,7);assert.deepEqual(JSON.parse(JSON.stringify(round.customTopics)),data.customTopics);
});
test('opening, section review, marked study and demonstrated practice remain distinct',async t=>{
 const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);x.course('biology');x.click('[data-topic="biology-cells"]');let data=snapshot(x);assert.ok(data.openedAt['biology-cells']);assert.equal(data.read.length,0);assert.equal(Object.keys(data.answers).length,0);
 x.change('[data-section-read="biology-cells:section:0"]',true);data=snapshot(x);assert.equal(data.sectionReads['biology-cells:section:0'],true);assert.equal(data.read.length,0);
 x.click('[data-action="mark-read"]');x.click('[data-mode="quiz"]');const q=x.w.IBStudy.catalog().find(t=>t.id==='biology-cells').quiz[0];x.click('[data-q="0"][data-choice="'+q.answer+'"]');x.click('[data-view="home"]');assert.match(x.one('.course-card[data-course="biology"] .course-progress').textContent,/20% revisado/);assert.match(x.one('.course-card[data-course="biology"] .course-progress').textContent,/1\/15/);assert.ok(x.one('.course-card[data-course="biology"] [data-action="saved-topic"]'));
 const y=await ui(t,snapshot(x));y.course('biology');y.click('[data-topic="biology-cells"]');assert.equal(y.one('[data-section-read="biology-cells:section:0"]').checked,true);
});
test('science numeric exercises validate numerical values, units and progressive reasoning',async t=>{
 const x=await ui(t);let count=0;for(const a of x.w.IBStudy.catalog().filter(a=>['chemistry','physics'].includes(a.course)&&a.deep.practice.numeric)){count++;x.course(a.course);x.click('[data-topic="'+a.id+'"]');x.tab('exams');const n=a.deep.practice.numeric;assert.ok(Number.isFinite(n.value),a.id);assert.ok(n.tolerance>0,a.id);x.input('#numeric-answer',String(n.value));x.input('#numeric-unit','wrong');x.click('[data-action="check-numeric"]');assert.match(x.one('#numeric-feedback').textContent,/unidad solicitada/);x.input('#numeric-unit',n.unit);x.click('[data-action="check-numeric"]');assert.match(x.one('#numeric-feedback').textContent,/coincide/);x.click('[data-action="skill-hint"]');assert.equal(x.d.querySelectorAll('.progressive-hints li').length,1);x.input('#numeric-answer','<script>');x.click('[data-action="check-numeric"]');assert.match(x.one('#numeric-feedback').textContent,/número válido/);}assert.ok(count>=4);
});
test('science investigation records and arts journals persist per topic with safe text',async t=>{
 const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);for(const id of added){x.course(id);const a=x.w.IBStudy.catalog().find(a=>a.course===id);x.click('[data-topic="'+a.id+'"]');x.tab('exams');const el=x.one('.area-journal textarea'),key=el.dataset.skill;x.input('[data-skill="'+key+'"]','Mi proceso <script>alert(1)</script>');assert.equal(x.d.querySelector('.area-journal script'),null);x.course('history');x.course(id);x.click('[data-topic="'+a.id+'"]');x.tab('exams');assert.equal(x.one('[data-skill="'+key+'"]').value,'Mi proceso <script>alert(1)</script>');}assert.equal(Object.keys(snapshot(x).drafts).filter(k=>k.startsWith('journal-')).length,7);
});
test('original teaching diagrams have accessible descriptions and no external assets',async t=>{
 const x=await ui(t);for(const id of ['biology-cells','physics-motion','music-rhythm','art-color']){const a=x.w.IBStudy.catalog().find(a=>a.id===id);x.course(a.course);x.click('[data-topic="'+id+'"]');const fig=x.one('.teaching-diagram');assert.ok(fig.querySelector('svg[role="img"][aria-label]'));assert.ok(fig.querySelector('figcaption').textContent.length>80);assert.equal(fig.querySelector('image,script,foreignObject'),null);}
});
test('self-rated spaced review schedules recall without changing scored mastery',async t=>{
 const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);x.course('music');x.click('[data-topic="music-elements"]');x.tab('review');assert.equal(x.d.querySelector('[data-action="schedule-review"]'),null);x.click('[data-action="flip"]');x.click('[data-action="schedule-review"][data-recalled="yes"]');const data=snapshot(x);assert.equal(Object.keys(data.answers).length,0);assert.equal(data.reviewSchedule['music-elements:0'].repetitions,1);assert.ok(Date.parse(data.reviewSchedule['music-elements:0'].due)>Date.now());
 data.reviewSchedule['music-elements:0'].due='2020-01-01T00:00:00.000Z';data.view='progress';const y=await ui(t,data);y.click('[data-action="due-review"]');assert.equal(y.one('h1').textContent,'Música');assert.match(y.one('.flashcard').textContent,/./);assert.equal(snapshot(y).reviewSchedule['music-elements:0'].repetitions,1);
});
test('new schema validation rejects unsafe maps and preserves all legacy state',async t=>{
 const x=await ui(t),S=x.w.IBStudy;for(const key of ['openedAt','sectionReads','courseLast','explorers','reviewSchedule']){assert.throws(()=>S.validate({version:1,[key]:[]}));assert.throws(()=>S.parseBackup('{"version":1,"'+key+'":{"__proto__":{"x":1}}}'));}
 const data=S.validate({version:1,schemaVersion:2,notes:{ww1:'Anterior'},answers:{'ww1:0':0},drafts:{old:'Texto'},lastTopic:{course:'history',id:'ww1'}});assert.equal(data.notes.ww1,'Anterior');assert.equal(data.drafts.old,'Texto');assert.equal(data.courseLast.history,'ww1');assert.equal(data.schemaVersion,4);
});
test('new bundled assets are exact and portable build has no remote script dependencies',async()=>{
 for(const name of ['area-data','area-tools','deep-sciences-bio-cdes','deep-sciences-chem-physics','deep-environment-arts']){const r=await worker.fetch(new Request('https://example.test/'+name+'.js?v=070'));assert.equal(r.status,200);assert.equal(await r.text(),await readFile(new URL('../web/'+name+'.js',import.meta.url),'utf8'));}
});
test('portable scripts escape HTML sentinels and cannot become visible page text',async()=>{
 const {JSDOM,VirtualConsole}=await import('jsdom'),html=await readFile(new URL('../dist/IB-Easy-COAR.html',import.meta.url),'utf8'),errors=[],vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
 // Real parsing/execution catches inline-script boundaries, unlike manually evaluating source.
 const dom=new JSDOM(html,{url:'file:///IB-Easy-COAR.html',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){w.scrollTo=()=>{};w.setInterval=()=>0;w.fetch=()=>{throw Error('Unexpected network');};}});
 try{assert.deepEqual(errors,[]);assert.equal(dom.window.document.querySelectorAll('.course-card').length,16);assert.equal([...dom.window.document.body.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).length,0);assert.equal(typeof dom.window.DOMPurify.sanitize,'function');for(const script of dom.window.document.scripts)assert.doesNotMatch(script.textContent,/<\/(?:body|head|html)>|<!--/i);}finally{dom.window.close();}
});
