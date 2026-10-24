import test from 'node:test';
import assert from 'node:assert/strict';
import {ui,KEY} from './test-ui.mjs';
const submit=(x,id)=>x.one(id).dispatchEvent(new x.w.Event('submit',{bubbles:true,cancelable:true}));
const saved=x=>{x.w.dispatchEvent(new x.w.Event('pagehide'));return JSON.parse(x.w.localStorage.getItem(KEY));};
const persist=x=>{x.click('[data-view="settings"]');x.change('#persist',true);x.click('[data-view="home"]');};
const card=(x,front='¿Qué es difusión?',back='Movimiento neto a favor del gradiente.')=>{x.input('#card-front',front);x.input('#card-back',back);x.input('#card-source','Mis apuntes, sección 2');submit(x,'#card-form');};

test('subject shortcut focuses a visible filtered card and honours reduced motion',async t=>{
 const x=await ui(t);const group=x.w.IBLearning.groups.find(g=>g.courses.includes('physics'));x.click('[data-studio="group"][data-group="'+group.id+'"]');
 let scrolled;x.w.HTMLElement.prototype.scrollIntoView=function(options){scrolled={element:this,options};};x.w.matchMedia=()=>({matches:true});
 x.click('[data-studio="focus-subjects"]');assert.equal(x.d.activeElement.closest('.area-group').hidden,false);assert.ok(group.courses.includes(x.d.activeElement.dataset.course));assert.equal(scrolled.element,x.d.activeElement);assert.equal(scrolled.options.behavior,'auto');
 x.click('[data-studio="focus-search"]');assert.equal(x.d.activeElement.id,'library-search');assert.equal(scrolled.options.behavior,'auto');
 x.w.matchMedia=()=>({matches:false});x.click('[data-studio="focus-subjects"]');assert.equal(scrolled.options.behavior,'smooth');
});
test('independent branding and version are visible and navigation keeps accessible names in both languages',async t=>{
 const x=await ui(t);assert.match(x.one('.logo').textContent,/PROYECTO ESTUDIANTIL/);assert.doesNotMatch(x.one('.logo').textContent,/COAR EDITION/);assert.match(x.one('footer').textContent,/v0\.9\.0/);
 for(const lang of ['es','en']){x.change('#language',lang);for(const b of x.d.querySelectorAll('.nav-link'))assert.ok(b.getAttribute('aria-label')?.trim());x.click('[data-view="settings"]');assert.equal(x.one('[data-view="settings"]').getAttribute('aria-current'),'page');assert.match(x.one('[data-view="settings"]').getAttribute('aria-label'),lang==='es'?/Preferencias/:/Settings/);x.click('[data-view="home"]');}
 assert.match(x.one('.logo').textContent,/STUDENT PROJECT/);assert.match(x.one('footer').textContent,/Not affiliated/);
});
test('opening the demo preserves existing notes, answers, personal cards and active study routes',async t=>{
 const x=await ui(t);persist(x);x.one('#session-topic').value='music-elements';submit(x,'#session-form');x.input('#lesson-note','Conservar mis notas');x.tab('review');card(x,'¿Qué es timbre?','Cualidad sonora.');
 x.tab('study');x.click('[data-mode="quiz"]');x.click('[data-q="0"][data-choice="0"]');x.click('[data-view="home"]');const before=saved(x);x.click('[data-studio="demo"]');const after=saved(x);
 for(const field of ['notes','answers','read','bookmarks','personalCards','activeSession','customTopics'])assert.deepEqual(after[field],before[field],field+' must be preserved');assert.equal(after.topic,'biology-cells');
});

test('discovery finds different relevant topics across subjects and filters grouped hubs',async t=>{
 const x=await ui(t);x.input('#library-search','MEMBRNA');assert.ok(x.one('#library-results [data-topic="biology-cells"]'));assert.equal(x.d.querySelector('#library-results [data-topic="physics-motion"]'),null);
 x.input('#library-search','movimiento circular fuerza centrípeta');assert.ok(x.one('#library-results [data-topic="physics-motion"]'));
 const group=x.w.IBLearning.groups.find(g=>g.courses.includes('physics'));x.click('[data-studio="group"][data-group="'+group.id+'"]');assert.equal([...x.d.querySelectorAll('.area-group')].filter(el=>!el.hidden).length,1);
 x.input('#library-search','qzxxyy desconocido');assert.match(x.one('#library-results').textContent,/No hay contenido suficiente/);
 x.click('[data-studio="group"][data-group=""]');assert.equal([...x.d.querySelectorAll('.area-group')].filter(el=>!el.hidden).length,5);
});
test('quick start exposes three clear paths and opens a real lesson without fake mastery',async t=>{
 const x=await ui(t);persist(x);assert.equal(x.d.querySelectorAll('.quick-start-grid article').length,3);assert.match(x.one('.quick-start').textContent,/EMPIEZA AQUÍ/i);
 x.click('[data-studio="focus-search"]');assert.equal(x.d.activeElement.id,'library-search');
 x.click('[data-studio="focus-subjects"]');assert.ok(x.d.activeElement.closest('.course-card'));
 x.click('[data-studio="demo"]');assert.equal(x.one('h1').textContent,'Biología');assert.equal(x.one('.lesson-header h2').textContent,x.w.IBStudy.catalog().find(t=>t.id==='biology-cells').title.es);
 const data=saved(x);assert.ok(data.openedAt['biology-cells']);assert.equal(data.read.length,0);assert.equal(Object.keys(data.answers).length,0);assert.equal(data.activeSession,null);
});
test('guided route persists, requires steps and reflection, and never awards mastery or read status',async t=>{
 const x=await ui(t);persist(x);x.one('#session-topic').value='biology-cells';x.one('#session-duration').value='10';submit(x,'#session-form');assert.match(x.one('.active-route').textContent,/10 MIN/);assert.equal(saved(x).activeSession.topic,'biology-cells');
 x.click('[data-studio="finish"]');assert.match(x.one('#route-status').textContent,/cuatro pasos/);
 for(const id of ['understand','recall','apply','reflect'])x.change('[data-route-step="'+id+'"]',true);
 x.input('#route-reflection','Comprendí el gradiente. Revisaré transporte activo.');const y=await ui(t,saved(x));assert.equal(y.one('#route-reflection').value,'Comprendí el gradiente. Revisaré transporte activo.');y.click('[data-studio="finish"]');
 const data=saved(y);assert.equal(data.activeSession,null);assert.equal(data.learningSessions.length,1);assert.equal(data.read.length,0);assert.equal(Object.keys(data.answers).length,0);y.click('[data-view="progress"]');assert.match(y.one('.studio-history').textContent,/Revisaré transporte activo/);
});
test('active route can resume from home across subject switches and cancellation retains notes',async t=>{
 const x=await ui(t);persist(x);x.course('music');x.click('[data-topic="music-elements"]');x.click('[data-studio="start-current"]');x.input('#lesson-note','Mis notas musicales');x.course('physics');x.click('[data-view="home"]');x.click('[data-studio="resume"]');assert.equal(x.one('#lesson-note').value,'Mis notas musicales');
 x.w.confirm=()=>false;x.click('[data-studio="cancel-route"]');assert.ok(x.one('.active-route'));x.w.confirm=()=>true;x.click('[data-studio="cancel-route"]');assert.equal(x.d.querySelector('.active-route'),null);assert.equal(saved(x).notes['music-elements'],'Mis notas musicales');
});
test('reader provides navigable contents, searchable glossary, persisted size and an Escape exit',async t=>{
 const x=await ui(t);persist(x);x.course('biology');x.click('[data-topic="biology-cells"]');const anchor=x.one('[data-reader-anchor]');anchor.click();assert.equal(x.d.activeElement.id,anchor.dataset.readerAnchor);
 const term=x.w.IBStudy.catalog().find(t=>t.id==='biology-cells').deep.glossary[0][0];x.input('#glossary-query',term);assert.match(x.one('#glossary-results').textContent,new RegExp(term));x.input('#glossary-query','qzxzz');assert.match(x.one('#glossary-results').textContent,/No hay coincidencias/);
 x.change('#reader-size','extra');assert.equal(x.d.body.dataset.readerSize,'extra');x.click('[data-studio="focus"]');assert.ok(x.d.body.classList.contains('reading-focus'));x.d.dispatchEvent(new x.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(x.d.body.classList.contains('reading-focus'),false);const y=await ui(t,saved(x));assert.equal(y.one('#reader-size').value,'extra');
});
test('own cards are scoped to topic and subject, escaped, editable and require reveal before scheduling',async t=>{
 const x=await ui(t);persist(x);x.course('biology');x.click('[data-topic="biology-cells"]');x.tab('review');card(x,'Mi pregunta <img src=x onerror=alert(1)>','Respuesta <script>alert(1)</script>');assert.equal(x.d.querySelector('.personal-cards img,.personal-cards script'),null);assert.equal(x.d.querySelector('[data-studio="rate-card"]'),null);
 x.click('[data-studio="reveal-card"]');assert.match(x.one('.personal-card-answer').textContent,/<script>/);x.click('[data-studio="rate-card"][data-rating="recall"]');let data=saved(x);assert.equal(data.personalCards.length,1);assert.ok(Date.parse(data.personalCards[0].due)>Date.now());assert.equal(Object.keys(data.answers).length,0);
 x.click('[data-studio="edit-card"]');x.input('#card-back','Respuesta corregida');submit(x,'#card-form');data=saved(x);assert.equal(data.personalCards[0].back,'Respuesta corregida');assert.equal(data.personalCards[0].due,null);
 x.course('physics');x.tab('review');assert.equal(x.d.querySelector('.personal-card-review'),null);x.course('biology');x.click('[data-topic="biology-genetics"]');x.tab('review');assert.equal(x.d.querySelector('.personal-card-review'),null);
});
test('personal topics can have their own cards and topic deletion removes only linked cards and routes',async t=>{
 const x=await ui(t);persist(x);x.course('music');x.input('#custom-query','Mi composición');submit(x,'#custom-search-form');x.input('#custom-material','Mi estructura: A B A.');x.click('[data-action="save-custom"]');const id=saved(x).topic;x.click('[data-studio="start-current"]');x.tab('review');card(x,'¿Qué forma elegí?','A B A.');assert.equal(saved(x).personalCards[0].topic,id);assert.equal(x.d.querySelector('.flashcard'),null);
 x.tab('study');x.click('[data-action="delete-custom"]');const data=saved(x);assert.equal(data.personalCards.length,0);assert.equal(data.activeSession,null);assert.equal(data.customTopics.length,0);
});
test('personal card schedules are restored, appear when due, and open the correct subject',async t=>{
 const x=await ui(t);persist(x);x.course('music');x.click('[data-topic="music-elements"]');x.tab('review');card(x,'¿Qué es el timbre?','Cualidad del sonido.');const data=saved(x);data.personalCards[0].due='2020-01-01T00:00:00Z';data.view='progress';const y=await ui(t,data);y.click('[data-studio="open-card"]');assert.equal(y.one('h1').textContent,'Música');assert.match(y.one('.personal-card-review').textContent,/timbre/);
});
test('recommendations explain real errors, due dates or initial suggestions without fake personalisation',async t=>{
 const x=await ui(t);persist(x);assert.match(x.one('.recommendation-row').textContent,/Sugerencia inicial/);x.course('biology');x.click('[data-topic="biology-cells"]');x.click('[data-mode="quiz"]');const q=x.w.IBStudy.catalog().find(t=>t.id==='biology-cells').quiz[0];x.click('[data-q="0"][data-choice="'+((q.answer+1)%q.options.length)+'"]');x.click('[data-view="home"]');assert.match(x.one('.recommendation-row article').textContent,/1 respuestas por corregir/);assert.ok(x.one('.recommendation-row article [data-topic="biology-cells"]'));
});
test('new records round trip while legacy records migrate and hostile card/session backups fail atomically',async t=>{
 const x=await ui(t);persist(x);x.course('biology');x.click('[data-topic="biology-cells"]');x.click('[data-studio="start-current"]');x.tab('review');card(x);const data=saved(x),round=x.w.IBStudy.parseBackup(JSON.stringify(data));assert.deepEqual(JSON.parse(JSON.stringify(round.personalCards)),data.personalCards);assert.deepEqual(JSON.parse(JSON.stringify(round.activeSession)),data.activeSession);
 const old=x.w.IBStudy.validate({version:1,schemaVersion:3,notes:{ww1:'Viejas notas'},answers:{'ww1:0':0}});assert.equal(old.notes.ww1,'Viejas notas');assert.equal(old.personalCards.length,0);assert.equal(old.schemaVersion,4);
 for(const patch of [{personalCards:{}},{learningSessions:{}},{reader:[]},{personalCards:[{...data.personalCards[0],course:'physics'}]},{personalCards:[{...data.personalCards[0],front:''}]},{activeSession:{...data.activeSession,steps:['fake']}},{personalCards:[data.personalCards[0],data.personalCards[0]]}])assert.throws(()=>x.w.IBStudy.parseBackup(JSON.stringify({...data,...patch})));
 assert.throws(()=>x.w.IBStudy.parseBackup('{"version":1,"reader":{"__proto__":{"polluted":true}}}'));assert.equal(saved(x).personalCards.length,1);
});
test('personal cards remain session-only without opt-in and clearing data resets new records too',async t=>{
 const x=await ui(t);x.course('music');x.click('[data-topic="music-elements"]');x.tab('review');card(x);assert.equal(x.w.localStorage.getItem(KEY),null);x.click('[data-view="settings"]');x.change('#persist',true);assert.equal(saved(x).personalCards.length,1);x.click('[data-action="clear-data"]');assert.equal(x.w.localStorage.getItem(KEY),null);x.course('music');x.tab('review');assert.equal(x.d.querySelector('.personal-card-review'),null);
});
test('new tools remain usable in English on each subject including core components',async t=>{
 const x=await ui(t);x.change('#language','en');assert.match(x.one('.study-launch').textContent,/Start study route/);for(const c of x.w.IBLearning.courses){x.course(c.id);const topic=x.w.IBStudy.catalog().find(t=>t.course===c.id);x.click('[data-topic="'+topic.id+'"]');assert.ok(x.one('[data-studio="focus"]'));x.tab('review');assert.match(x.one('.personal-cards').textContent,/My study cards/);assert.equal(x.one('#card-topic').value,topic.id);}
});
test('lesson export includes source lesson, references and notes without HTML execution',async t=>{
 const x=await ui(t);let blob;x.w.URL.createObjectURL=b=>{blob=b;return 'blob:local';};x.w.URL.revokeObjectURL=()=>{};x.w.HTMLAnchorElement.prototype.click=()=>{};x.course('biology');x.click('[data-topic="biology-cells"]');x.input('#lesson-note','Mi idea personal');x.click('[data-studio="download-lesson"]');const text=await new Promise(resolve=>{const r=new x.w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(blob);});assert.match(text,/Mi idea personal/);assert.match(text,/https:\/\//);assert.ok(text.includes(x.w.IBStudy.catalog().find(t=>t.id==='biology-cells').deep.sections[0].body));
});
test('local HTTP without randomUUID supports routes, personal cards, topics and weekly tasks',async t=>{
 const x=await ui(t);Object.defineProperty(x.w.crypto,'randomUUID',{value:undefined,configurable:true});persist(x);x.one('#session-topic').value='music-elements';submit(x,'#session-form');assert.ok(x.one('.active-route'));x.tab('review');card(x);assert.equal(saved(x).personalCards.length,1);
 x.course('biology');x.input('#custom-query','Mi tema de prueba local');submit(x,'#custom-search-form');x.click('[data-action="save-custom"]');assert.equal(saved(x).customTopics.length,1);
 x.click('[data-view="planner"]');x.one('#task-form [name="task"]').value='Repasar biología';x.one('#task-form [name="date"]').value='2026-10-22';x.one('#task-form [name="course"]').value='biology';submit(x,'#task-form');assert.equal(saved(x).tasks.length,1);
});
