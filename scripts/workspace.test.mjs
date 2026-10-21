import test from 'node:test';
import assert from 'node:assert/strict';
import {ui,KEY} from './test-ui.mjs';
import {readFile} from 'node:fs/promises';
import worker from '../dist/worker.js';

const submit=x=>x.one('#custom-search-form').dispatchEvent(new x.w.Event('submit',{bubbles:true,cancelable:true}));
function personal(x,title='Geometría hiperbólica',material='Mis apuntes originales: las líneas y los modelos necesitan definiciones.'){
  x.input('#custom-query',title);submit(x);x.input('#custom-material',material);x.input('#material-source','Apuntes propios');x.click('[data-action="save-custom"]');
}
const snapshot=x=>{x.w.dispatchEvent(new x.w.Event('pagehide'));return JSON.parse(x.w.localStorage.getItem(KEY));};

test('83 distinct developed topics preserve legacy IDs and provide 289 relevant questions',async t=>{
  const x=await ui(t),all=x.w.IBStudy.catalog();assert.equal(all.length,83);assert.equal(new Set(all.map(t=>t.id)).size,83);
  assert.equal(all.reduce((n,t)=>n+t.quiz.length,0),289);
  for(const c of x.w.IBLearning.courses)assert.equal(all.filter(t=>t.course===c.id).length,c.id==='history'?8:5);
  for(const id of ['ww1','ww2','coldwar','russia','cuba','nazi','newdeal','mexico','math-functions','math-derivatives','english-opinion','english-evidence','literary-effect','literary-comparison','business-segment','business-decisions','digital-stakeholders','digital-ai','cas-plan','cas-reflection','tok-knowledge','tok-object','ee-question','ee-sources'])assert.ok(all.some(t=>t.id===id));
  for(const a of all){
    assert.ok(a.deep,a.id);assert.ok(a.deep.sections.length>=3,a.id);assert.ok(a.deep.goals.length>=2,a.id);
    assert.ok(a.deep.example.body&&a.deep.extension&&a.deep.prerequisites,a.id);
    assert.equal(new Set(a.deep.sections.map(p=>p.body)).size,a.deep.sections.length,a.id);
    assert.ok(a.refs.some(r=>x.w.IBStudy.safeURL(r.url)),a.id);
    for(const q of a.quiz){assert.ok(q.text.es&&q.text.en);assert.equal(q.optionWhy.length,q.options.length);assert.ok(q.answer>=0&&q.answer<q.options.length);for(const reason of q.optionWhy)assert.ok(reason.es&&reason.en);}
  }
});
test('every developed lesson opens explanation before quiz and offers three distinct reading levels',async t=>{
  const x=await ui(t);
  for(const a of x.w.IBStudy.catalog()){
    x.course(a.course);x.click('[data-topic="'+a.id+'"]');
    assert.equal(x.d.querySelector('.quiz-card'),null);assert.equal(x.d.querySelector('.writing-task'),null);
    const full=x.one('.reading-panel').textContent;assert.ok(full.includes(a.deep.sections[0].body),a.id);
    x.click('[data-depth="summary"]');const summary=x.one('.reading-panel').textContent;assert.notEqual(summary,full,a.id);
    x.click('[data-depth="deep"]');assert.ok(x.one('.reading-panel').textContent.includes(a.deep.extension),a.id);
  }
});
test('free search handles accents, case and typos and does not relabel results',async t=>{
  const x=await ui(t),S=x.w.IBStudy,a=S.catalog();
  for(const [q,id]of [['GUERRA FRÍA','coldwar'],['derivdas','math-derivatives'],['Derivadas y problemas de optimización','math-derivatives'],['Ironía en Sueño de una noche de verano','literature-irony-midsummer'],['Estado de resultados y flujo de caja','business-cashflow'],['Privacidad y reconocimiento facial','digital-privacy'],['Consolidación del poder de Castro entre 1959 y 1965','cuba']])assert.ok(S.search(q,a).some(r=>r.topic.id===id),q);
  assert.equal(S.search('tensores gravitacionales de agujeros negros',a).length,0);
  x.course('math');x.input('#custom-query','derivdas');submit(x);assert.match(x.one('.availability').textContent,/disponible/);
  x.click('.related-lesson [data-action="topic"]');assert.match(x.one('.lesson-header h2').textContent,/Derivada/);assert.equal(x.d.querySelector('.quiz-card'),null);
});
test('unavailable custom topic is honest, preserves selected context and never substitutes unrelated practice',async t=>{
  const x=await ui(t);x.course('history');x.change('#level','SL');x.change('#year','2028');x.change('#language','en');
  x.input('#custom-query','Kingdom of Aksum monetary history');submit(x);assert.match(x.one('.availability').textContent,/not available/);
  assert.equal(x.one('#level').value,'SL');assert.equal(x.one('#year').value,'2028');assert.match(x.one('.custom-results').textContent,/not integrated/);
  x.click('[data-action="save-custom"]');assert.match(x.one('.reading-panel').textContent,/awaiting material/);
  x.tab('review');assert.equal(x.d.querySelector('.flashcard'),null);assert.match(x.one('.empty-state').textContent,/unrelated cards/);
  x.tab('exams');assert.equal(x.d.querySelector('.writing-task'),null);assert.equal(x.d.querySelector('#skill-draft'),null);
});
test('personal materials are escaped, searchable, editable and kept only with opt-in',async t=>{
  const x=await ui(t);x.course('math');personal(x,'Geometría hiperbólica','<img src=x onerror=alert(1)>\n\nMis apuntes sobre curvatura negativa.');
  assert.equal(x.d.querySelector('.personal-material img'),null);assert.match(x.one('.personal-material').textContent,/onerror/);
  assert.equal(x.w.localStorage.getItem(KEY),null);x.click('[data-action="edit-custom"]');x.input('#custom-material','Curvatura negativa: revisión personal.');x.click('[data-action="save-custom"]');
  assert.match(x.one('.personal-material').textContent,/revisión personal/);
  x.input('#custom-query','curvatura negativa');submit(x);assert.match(x.one('.related-lesson').textContent,/Material personal/);
  x.click('[data-view="settings"]');x.change('#persist',true);const saved=snapshot(x);assert.equal(saved.customTopics.length,1);
  const y=await ui(t,saved);y.course('math');y.click('[data-topic="'+saved.customTopics[0].id+'"]');assert.match(y.one('.personal-material').textContent,/revisión personal/);
});
test('cancelling deletion keeps personal notes; confirming deletes that topic only',async t=>{
  const x=await ui(t);x.course('math');personal(x);x.input('#lesson-note','Mi reflexión');x.w.confirm=()=>false;x.click('[data-action="delete-custom"]');assert.equal(x.one('#lesson-note').value,'Mi reflexión');
  x.w.confirm=()=>true;x.click('[data-action="delete-custom"]');assert.equal(x.d.querySelectorAll('.topic-card').length,5);
});
test('import/export round trip restores personal topics, notes, answers, tasks and current storage preference',async t=>{
  const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);x.course('math');personal(x);x.input('#lesson-note','Mi nota');const data=snapshot(x);
  data.answers={'ww2:0':1};data.tasks=[{id:'task-1',course:'history',text:'Repasar',date:'2026-10-20',done:false}];
  let blob;x.w.URL.createObjectURL=b=>{blob=b;return 'blob:https://example.test/export';};x.w.URL.revokeObjectURL=()=>{};x.w.HTMLAnchorElement.prototype.click=()=>{};
  x.click('[data-view="settings"]');x.click('[data-action="export"]');
  const exported=await new Promise(resolve=>{const reader=new x.w.FileReader();reader.onload=()=>resolve(reader.result);reader.readAsText(blob);});
  assert.equal(JSON.parse(exported).notes[data.customTopics[0].id],'Mi nota');
  const y=await ui(t);assert.equal(y.w.IBEasyImportBackup(JSON.stringify(data)),true);assert.equal(y.w.localStorage.getItem(KEY),null);
  y.click('[data-view="settings"]');y.change('#persist',true);const restored=snapshot(y);assert.equal(restored.notes[data.customTopics[0].id],'Mi nota');assert.equal(restored.answers['ww2:0'],1);assert.equal(restored.tasks[0].text,'Repasar');assert.equal(restored.customTopics.length,1);
});
test('malformed or hostile backups fail before confirmation without changing current work',async t=>{
  const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);x.course('history');x.click('[data-topic="ww2"]');x.input('#lesson-note','Conservar');const before=JSON.stringify(snapshot(x));let confirms=0;x.w.confirm=()=>{confirms++;return true;};
  for(const bad of ['{bad','{"version":2}','{"version":1,"notes":42}','{"version":1,"notes":{"__proto__":{"polluted":true}}}',JSON.stringify({version:1,customTopics:[{id:'custom-x',course:'math',query:'a'},{id:'custom-x',course:'math',query:'b'}]})])assert.throws(()=>x.w.IBEasyImportBackup(bad));
  assert.equal(confirms,0);assert.equal(JSON.stringify(snapshot(x)),before);assert.equal(x.w.Object.prototype.polluted,undefined);
  x.w.confirm=()=>false;assert.equal(x.w.IBEasyImportBackup('{"version":1}'),false);assert.equal(x.one('#lesson-note').value,'Conservar');
});
test('legacy v1 data migrates without losing old notes, answers, checklist or tasks',async t=>{
  const saved={version:1,persist:true,view:'course',course:'history',tab:'study',topic:'ww2',notes:{ww2:'Nota anterior'},answers:{'ww2:0':1},read:['ww2'],bookmarks:['ww2'],drafts:{'p2-ww2-evaluate':'Borrador anterior'},checks:{'old:0':true},tasks:[{id:'old',course:'history',text:'Tarea anterior',date:'2026-10-20',done:true}]};
  const x=await ui(t,saved);assert.equal(x.one('#lesson-note').value,'Nota anterior');const result=snapshot(x);assert.equal(result.answers['ww2:0'],1);assert.equal(result.drafts['p2-ww2-evaluate'],'Borrador anterior');assert.equal(result.checks['old:0'],true);assert.equal(result.tasks[0].done,true);assert.equal(result.schemaVersion,4);
});
test('opening a lesson does not mark reviewed; recommendations follow real mistakes',async t=>{
  const x=await ui(t);assert.match(x.one('.dashboard-next').textContent,/Aún no hay historial/);x.course('math');x.click('[data-topic="math-functions"]');x.click('[data-view="home"]');
  assert.match(x.one('.course-card[data-course="math"] .course-progress').textContent,/0% revisado/);assert.match(x.one('.dashboard-next').textContent,/Continuar/);
  x.click('.dashboard-next [data-action="saved-topic"]');x.click('[data-action="mark-read"]');x.click('[data-mode="quiz"]');x.click('[data-q="0"][data-choice="0"]');x.click('[data-view="home"]');assert.match(x.one('.dashboard-next').textContent,/Según tus respuestas/);assert.match(x.one('.course-card[data-course="math"] .course-progress').textContent,/20% revisado/);
});
test('numeric checks use tolerance, accept decimal comma and reject expressions or units',async t=>{
  const x=await ui(t),S=x.w.IBStudy;assert.equal(S.numeric('100,005',100,0.01).correct,true);assert.equal(S.numeric('100.02',100,0.01).correct,false);
  for(const v of ['100 m2','1+99','Infinity','NaN','','0x64','<script>'])assert.equal(S.numeric(v,100).valid,false,v);
  x.course('math');x.click('[data-topic="math-derivatives"]');assert.ok(x.d.querySelector('.formula-box math'));x.tab('exams');x.input('#numeric-answer','100');x.click('[data-action="check-numeric"]');assert.match(x.one('#numeric-feedback').textContent,/coincide/);
  assert.equal(x.d.querySelectorAll('.progressive-hints li').length,0);x.click('[data-action="skill-hint"]');assert.equal(x.d.querySelectorAll('.progressive-hints li').length,1);
  x.input('#skill-draft','A=x(20−x). Mi procedimiento.');x.click('[data-action="skill-checklist"]');assert.equal(x.one('#skill-checks').hidden,false);assert.match(x.one('#skill-checks').textContent,/sin nota/);
});
test('all non-History workshops follow the selected topic and contain its source example',async t=>{
  const x=await ui(t);for(const a of x.w.IBStudy.catalog().filter(t=>t.course!=='history')){x.course(a.course);x.click('[data-topic="'+a.id+'"]');x.tab('exams');assert.equal(x.one('.practice-prompt').textContent,a.deep.practice.prompt.es);assert.ok(x.one('.workshop-material').textContent.includes(a.deep.example.body));}
});
test('CAS and EE organisers preserve real user work across topics and reload',async t=>{
  const x=await ui(t);x.click('[data-view="settings"]');x.change('#persist',true);
  for(const c of ['cas','ee']){x.course(c);assert.equal(x.d.querySelector('#difficulty'),null);assert.equal(x.d.querySelector('#level'),null);x.tab('exams');const el=x.one('.core-organizer textarea'),key=el.dataset.skill;x.input('[data-skill="'+key+'"]','Trabajo real de '+c);x.click('.practice-topics button:nth-child(2)');assert.equal(x.one('[data-skill="'+key+'"]').value,'Trabajo real de '+c);}
  const y=await ui(t,snapshot(x));y.course('cas');y.tab('exams');assert.equal(y.one('.core-organizer textarea').value,'Trabajo real de cas');y.course('ee');y.tab('exams');assert.equal(y.one('.core-organizer textarea').value,'Trabajo real de ee');
});
test('difficulty, language and review selection retain topic relevance',async t=>{
  const x=await ui(t);x.course('math');x.change('#difficulty','foundation');assert.equal(x.d.querySelectorAll('.topic-card').length,1);x.click('[data-topic="math-functions"]');x.change('#language','en');assert.match(x.one('.translation-note').textContent,/translation is pending/);x.tab('review');assert.equal(x.one('#review-topic').value,'math-functions');x.click('[data-mode="quiz"]');assert.equal(x.d.querySelectorAll('.quiz-card').length,4);
  x.click('[data-q="0"][data-choice="0"]');assert.equal(x.d.querySelectorAll('.feedback details li').length,3);assert.match(x.one('.feedback details summary').textContent,/Why each option/);
});
test('History topic practice filters its bank and never substitutes the general dossier',async t=>{
  const x=await ui(t);x.course('history');x.click('[data-topic="coldwar"]');x.tab('exams');assert.equal(x.one('#exam-topic').value,'coldwar');
  for(const el of x.d.querySelectorAll('.essay-card'))assert.match(el.textContent,/Guerra Fría/);
  x.click('[data-paper="1"]');assert.equal(x.d.querySelector('.source-card'),null);assert.match(x.one('.empty-state').textContent,/No hay dossier/);
});
test('offline state, labels, viewport and responsive rules are present (not a visual browser test)',async t=>{
  const x=await ui(t);Object.defineProperty(x.w.navigator,'onLine',{value:false,configurable:true});x.course('math');assert.match(x.one('.local-pill').textContent,/Sin conexión/);assert.ok(x.one('#custom-query').labels.length);x.click('[data-topic="math-functions"]');assert.ok(x.one('#lesson-note').getAttribute('aria-label'));
  const html=await readFile(new URL('../web/index.html',import.meta.url),'utf8'),css=await readFile(new URL('../web/coar.css',import.meta.url),'utf8');assert.match(html,/name="viewport"/);assert.match(css,/@media\(max-width:680px\)/);assert.match(css,/:focus-visible/);assert.match(css,/prefers-reduced-motion/);
});
test('all newly bundled assets exactly match source files',async()=>{
  for(const name of ['deep-history-math','deep-core','deep-subjects','deep-more','deep-extra-core','deep-extra-digital-history','deep-extra-languages-business','learning-engine','study-workspace']){const response=await worker.fetch(new Request('https://example.test/'+name+'.js?v=060'));assert.equal(response.status,200);assert.equal(await response.text(),await readFile(new URL('../web/'+name+'.js',import.meta.url),'utf8'));}
});
