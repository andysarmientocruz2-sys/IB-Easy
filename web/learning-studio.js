/* v0.8: deterministic study routes, learner-authored cards and accessible reading tools. */
(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const STEPS = ['understand', 'recall', 'apply', 'reflect'];
  const plain = x => x && typeof x === 'object' && !Array.isArray(x);
  function validateState(raw, result) {
    const topics = [...IBStudy.catalog(), ...result.customTopics.map(t => ({...t, custom:true}))];
    const ids = new Set(topics.map(t => t.id));
    const safeDate = v => typeof v === 'string' && v.length <= 40 && Number.isFinite(Date.parse(v));
    if (raw.personalCards !== undefined && !Array.isArray(raw.personalCards)) throw Error('Invalid personal cards');
    result.personalCards = (raw.personalCards || []).map(c => {
      if (!plain(c) || !/^card-[a-z0-9-]{1,60}$/.test(c.id) || !ids.has(c.topic) || topics.find(t=>t.id===c.topic).course !== c.course ||
        typeof c.front !== 'string' || !c.front.trim() || c.front.length > 1000 || typeof c.back !== 'string' || !c.back.trim() || c.back.length > 3000 ||
        typeof c.source !== 'string' || c.source.length > 300 || !safeDate(c.createdAt) || (c.due !== null && !safeDate(c.due)) ||
        !Number.isInteger(c.repetitions) || c.repetitions < 0 || c.repetitions > 5) throw Error('Invalid personal card');
      return {id:c.id, topic:c.topic, course:c.course, front:c.front, back:c.back, source:c.source, createdAt:c.createdAt, due:c.due, repetitions:c.repetitions};
    });
    if (result.personalCards.length > 500 || new Set(result.personalCards.map(c=>c.id)).size !== result.personalCards.length) throw Error('Invalid card count');
    const session = v => {
      if (!plain(v) || !/^session-[a-z0-9-]{1,60}$/.test(v.id) || !ids.has(v.topic) || topics.find(t=>t.id===v.topic).course !== v.course ||
        ![10,25,45].includes(v.minutes) || !safeDate(v.startedAt) || !Array.isArray(v.steps) || v.steps.some(s=>!STEPS.includes(s)) ||
        typeof v.reflection !== 'string' || v.reflection.length > 3000 || (v.completedAt !== null && !safeDate(v.completedAt))) throw Error('Invalid study session');
      return {id:v.id, topic:v.topic, course:v.course, minutes:v.minutes, startedAt:v.startedAt, steps:[...new Set(v.steps)], reflection:v.reflection, completedAt:v.completedAt};
    };
    if (raw.learningSessions !== undefined && !Array.isArray(raw.learningSessions)) throw Error('Invalid session history');
    result.learningSessions = (raw.learningSessions || []).map(session);
    if (result.learningSessions.length > 200 || result.learningSessions.some(v=>!v.completedAt || v.steps.length!==4)) throw Error('Invalid completed sessions');
    result.activeSession = raw.activeSession ? session(raw.activeSession) : null;
    if (result.activeSession?.completedAt) throw Error('Active session already completed');
    if (raw.reader !== undefined && !plain(raw.reader)) throw Error('Invalid reader settings');
    result.reader = {size: ['standard','large','extra'].includes(raw.reader?.size) ? raw.reader.size : 'standard', focus:raw.reader?.focus===true};
    return result;
  }
  function recommendations(s, topics, now=Date.now()) {
    return topics.map(t => {
      const wrong=t.quiz?.filter((q,i)=>s.answers[t.id+':'+i]!==undefined && s.answers[t.id+':'+i]!==q.answer).length||0;
      const due=Object.entries(s.reviewSchedule).filter(([key,r])=>key.startsWith(t.id+':')&&Date.parse(r.due)<=now).length + s.personalCards.filter(c=>c.topic===t.id&&c.due&&Date.parse(c.due)<=now).length;
      return {topic:t, wrong, due, reason:wrong?'errors':due?'due':s.openedAt[t.id]&&!s.read.includes(t.id)?'continue':'start', score:wrong*100+due*10+(s.openedAt[t.id]&&!s.read.includes(t.id)?5:0)};
    }).sort((a,b)=>b.score-a.score);
  }
  function mount(ctx) {
    const state=ctx.state, D=IBLearning;
    const T=(es,en)=>state().lang==='en'?en:es, tx=v=>typeof v==='string'?v:v?.[state().lang]||v?.es||'';
    const B=(action,label,attrs='',cls='button')=>`<button type="button" class="${cls}" data-studio="${action}" ${attrs}>${label}</button>`;
    const all=()=>D.courses.flatMap(c=>ctx.topics(c.id).map(t=>({...t,course:c.id})));
    const current=()=>ctx.topics().find(t=>t.id===state().topic);
    let searchText='', selectedGroup='', cardEdit=null, cardShowing=null, revealed=false;
    const stepName = id => ({understand:T('Comprender','Understand'),recall:T('Recordar','Recall'),apply:T('Aplicar','Apply'),reflect:T('Reflexionar','Reflect')})[id];
    function route(topicId,courseId) { ctx.switchArea(courseId);ctx.choose(topicId);ctx.go(); }
    function reason(r) {return r.reason==='errors'?T(`${r.wrong} respuestas por corregir`,`${r.wrong} answers to revisit`):r.reason==='due'?T(`${r.due} tarjetas pendientes`,`${r.due} cards due`):r.reason==='continue'?T('Lo abriste; aún no lo marcaste como revisado','Opened, not yet marked reviewed'):T('Sugerencia inicial del catálogo','Initial catalogue suggestion');}
    function quickStart() {
      return `<section class="quick-start" aria-labelledby="quick-start-title"><div class="quick-start-heading"><span class="eyebrow">${T('EMPIEZA AQUÍ','START HERE')}</span><h2 id="quick-start-title">${T('Tres formas de comenzar','Three ways to begin')}</h2><p>${T('Abre una lección de ejemplo, encuentra un tema o elige tu asignatura.','Open a sample lesson, find a topic or choose your subject.')}</p></div><div class="quick-start-grid"><article><b aria-hidden="true">01</b><h3>${T('Ver una lección completa','View a complete lesson')}</h3><p>${T('Explora membranas celulares con explicación, vocabulario, ejemplo y repaso.','Explore cell membranes with an explanation, vocabulary, an example and review.')}</p>${B('demo',T('Abrir demostración','Open demo')+' →','','button primary')}</article><article><b aria-hidden="true">02</b><h3>${T('Buscar un tema','Find a topic')}</h3><p>${T('Busca entre 83 temas preparados y tus temas personales.','Search 83 prepared topics and your personal topics.')}</p>${B('focus-search',T('Buscar en la biblioteca','Search the library')+' →','','button')}</article><article><b aria-hidden="true">03</b><h3>${T('Elegir una asignatura','Choose a subject')}</h3><p>${T('Entra a un área y usa su propio campo para estudiar otro tema.','Open an area and use its own field to study another topic.')}</p>${B('focus-subjects',T('Ver asignaturas','View subjects')+' →','','button')}</article></div></section>`;
    }
    function launchCard() {
      const s=state(), suggestions=recommendations(s,all()).slice(0,3), active=s.activeSession;
      return `<section class="study-launch panel" aria-labelledby="launch-title"><div class="launch-copy"><span class="eyebrow">${T('UN OBJETIVO, CUATRO PASOS','ONE GOAL, FOUR STEPS')}</span><h2 id="launch-title">${T('Haz que esta sesión cuente.','Make this session count.')}</h2><p>${T('Comprende una idea, recuérdala sin mirar, aplícala y decide qué sigue.','Understand an idea, recall it without looking, apply it and decide what comes next.')}</p><div class="route-mini" aria-hidden="true">${STEPS.map((id,i)=>`<span><b>${i+1}</b>${stepName(id)}</span>`).join('')}</div></div><div class="launch-options">${active?`<span class="tag yellow">${T('RUTA EN CURSO','ACTIVE ROUTE')}</span><h3>${escape(tx(all().find(t=>t.id===active.topic)?.title))}</h3><p>${active.steps.length}/4 ${T('pasos registrados','steps recorded')}</p>${B('resume',T('Continuar mi ruta','Continue my route'),'','button primary')}`:`<form id="session-form"><label for="session-topic">${T('Tema de la sesión','Session topic')}</label><select id="session-topic" name="topic">${all().map(t=>`<option value="${t.id}" ${t.id===suggestions[0]?.topic.id?'selected':''}>${escape(tx(D.courses.find(c=>c.id===t.course).name))} · ${escape(tx(t.title))}</option>`).join('')}</select><label for="session-duration">${T('Tiempo que quiero dedicar','Time I want to spend')}</label><select id="session-duration" name="duration"><option value="10">10 min</option><option value="25" selected>25 min</option><option value="45">45 min</option></select><button class="button primary">${T('Comenzar ruta de estudio','Start study route')} →</button></form>`}</div></section><section class="recommendation-row" aria-label="${T('Sugerencias basadas en tu actividad','Suggestions based on your activity')}">${suggestions.map(r=>`<article><span class="eyebrow">${escape(reason(r))}</span><h3>${escape(tx(r.topic.title))}</h3>${B('open',T('Estudiar','Study')+' →',`data-topic="${r.topic.id}" data-course="${r.topic.course}"`,'button text-button')}</article>`).join('')}</section>`;
    }
    function discovery() {
      return `<section class="discovery panel"><div class="section-heading"><div><span class="eyebrow">${T('ENCUENTRA TU SIGUIENTE IDEA','FIND YOUR NEXT IDEA')}</span><h2>${T('Explora la biblioteca','Explore the library')}</h2></div><span class="tag sky">${all().length} ${T('temas','topics')}</span></div><label for="library-search">${T('Buscar en todas las áreas y en mis temas','Search all areas and my topics')}</label><input type="search" id="library-search" value="${escape(searchText)}" placeholder="${T('Membranas, armonía, Guerra Fría…','Membranes, harmony, Cold War…')}"><div class="group-filters" role="group" aria-label="${T('Filtrar áreas','Filter areas')}">${[['',T('Todas','All')],...D.groups.map(g=>[g.id,tx(g.name)])].map(([id,label])=>B('group',escape(label),`data-group="${id}" aria-pressed="${selectedGroup===id}"`,'button small')).join('')}</div><div id="library-results" aria-live="polite">${searchResults()}</div></section>`;
    }
    function searchResults() {
      const allowed=selectedGroup?D.groups.find(g=>g.id===selectedGroup)?.courses:null;
      const topics=all().filter(t=>!allowed||allowed.includes(t.course));
      if(!searchText.trim())return `<p class="caption">${T('Busca un concepto o filtra las tarjetas por grupo. Cada área conserva su propio campo de tema libre.','Search a concept or filter area cards by group. Every area retains its own free-topic input.')}</p>`;
      const matches=IBStudy.search(searchText,topics);
      return matches.length?`<p class="caption">${matches.length} ${T('coincidencias relacionadas','related matches')}</p><div class="search-results-grid">${matches.slice(0,8).map(({topic:t})=>`<article><span class="eyebrow">${escape(tx(D.courses.find(c=>c.id===t.course).name))}</span><h3>${escape(tx(t.title))}</h3><p>${escape(tx(t.intro))}</p>${B('open',T('Abrir explicación','Open explanation'),`data-topic="${t.id}" data-course="${t.course}"`)}</article>`).join('')}</div>${matches.length>8?`<p>${T('Mostrando las primeras ocho; concreta la búsqueda.','Showing the first eight; narrow the search.')}</p>`:''}`:`<p class="availability">${T('No hay contenido suficiente para esa búsqueda. Entra a tu asignatura y guarda el tema con tus materiales.','Not enough content for that search. Open your subject and save the topic with your materials.')}</p>`;
    }
    function activeRoute() {
      const s=state(), a=s.activeSession;if(!a)return '';
      return `<section class="active-route panel"><div class="section-heading"><div><span class="eyebrow">${T('MI RUTA DE ESTUDIO','MY STUDY ROUTE')} · ${a.minutes} MIN ${T('PLANIFICADOS','PLANNED')}</span><h2>${escape(tx(all().find(t=>t.id===a.topic)?.title))}</h2></div>${B('resume',T('Abrir tema','Open topic'),'','button small')}</div><p class="caption">${T('Registra lo que realmente hiciste. Completar una ruta no acredita dominio ni mide tiempo efectivo.','Record what you actually did. Completing a route does not certify mastery or measure actual study time.')}</p><div class="route-steps">${STEPS.map((id,i)=>`<label><input type="checkbox" data-route-step="${id}" ${a.steps.includes(id)?'checked':''}><span><b>${i+1}. ${stepName(id)}</b><small>${{understand:T('Leo y explico la idea principal.','Read and explain the main idea.'),recall:T('Recupero una idea sin mirar y la compruebo.','Recall an idea without looking and check it.'),apply:T('Intento una actividad pertinente.','Attempt a relevant activity.'),reflect:T('Registro una dificultad y mi próximo paso.','Record a difficulty and my next step.')}[id]}</small></span></label>`).join('')}</div><label for="route-reflection">${T('Lo que comprendí, mi duda y el siguiente paso','What I understood, my question and next step')}<textarea id="route-reflection" rows="2" maxlength="3000">${escape(a.reflection)}</textarea></label><div class="route-actions">${B('finish',T('Finalizar y guardar reflexión','Finish and save reflection'),'','button primary')}${B('cancel-route',T('Descartar esta ruta','Discard this route'),'','button text-button')}</div><p id="route-status" role="status"></p></section>`;
    }
    function personalCardsPanel(t) {
      const cards=state().personalCards.filter(c=>c.course===state().course&&(!t||c.topic===t.id));
      let selected=cards.find(c=>c.id===cardShowing)||cards[0];
      const edit=state().personalCards.find(c=>c.id===cardEdit);
      const editableTopic=t||ctx.topics()[0];
      return `<section class="personal-cards panel"><div class="section-heading"><div><span class="eyebrow">${T('ELABORADAS POR TI','AUTHORED BY YOU')}</span><h2>${T('Mis tarjetas de estudio','My study cards')}</h2></div><span class="tag sky">${cards.length}</span></div><p>${T('Convierte tus apuntes en preguntas y respuestas propias. No son preguntas verificadas ni se califican automáticamente.','Turn your notes into your own questions and answers. These are not verified questions and are not automatically graded.')}</p>${selected?`<div class="personal-card-review"><label for="personal-card-select">${T('Elegir tarjeta','Choose card')}</label><select id="personal-card-select">${cards.map(c=>`<option value="${c.id}" ${c.id===selected.id?'selected':''}>${escape(c.front.slice(0,100))}</option>`).join('')}</select><h3>${escape(selected.front)}</h3>${revealed?`<div class="personal-card-answer"><p>${escape(selected.back)}</p><small>${T('Fuente anotada por ti: ','Source recorded by you: ')}${escape(selected.source||T('sin registrar','not recorded'))}</small></div><div class="card-rating">${B('rate-card',T('Volver a repasar mañana','Review again tomorrow'),`data-card="${selected.id}" data-rating="again"`)}${B('rate-card',T('Lo recordé: espaciar','Recalled: space out'),`data-card="${selected.id}" data-rating="recall"`)}</div>`:B('reveal-card',T('Mostrar mi respuesta','Reveal my answer'))}<p class="caption">${selected.due?T('Próximo repaso: ','Next review: ')+escape(new Date(selected.due).toLocaleDateString(state().lang)):T('Aún sin repaso programado.','No review scheduled yet.')}</p><div class="card-management">${B('edit-card',T('Editar','Edit'),`data-card="${selected.id}"`,'button small')}${B('delete-card',T('Eliminar','Delete'),`data-card="${selected.id}"`,'button small')}</div></div>`:`<div class="cards-empty"><h3>${T('Empieza con una pregunta que te cueste.','Start with a question you find challenging.')}</h3><p>${T('Escribe una respuesta breve y la fuente donde puedes comprobarla.','Write a brief answer and the source where you can check it.')}</p></div>`}<details class="card-author" ${edit||!cards.length?'open':''}><summary>${edit?T('Editar mi tarjeta','Edit my card'):T('Crear una tarjeta propia','Create my own card')}</summary><form id="card-form"><label for="card-topic">${T('Tema al que pertenece','Topic it belongs to')}</label><select id="card-topic" name="topic">${ctx.topics().filter(x=>!t||x.id===t.id).map(x=>`<option value="${x.id}" ${x.id===(edit?.topic||editableTopic?.id)?'selected':''}>${escape(tx(x.title))}</option>`).join('')}</select><label for="card-front">${T('Mi pregunta','My question')}</label><textarea id="card-front" name="front" rows="2" maxlength="1000" required>${escape(edit?.front||'')}</textarea><label for="card-back">${T('Mi respuesta','My answer')}</label><textarea id="card-back" name="back" rows="3" maxlength="3000" required>${escape(edit?.back||'')}</textarea><label for="card-source">${T('Fuente o ubicación en mis apuntes','Source or location in my notes')}</label><input id="card-source" name="source" maxlength="300" value="${escape(edit?.source||'')}"><button class="button primary">${edit?T('Guardar cambios','Save changes'):T('Guardar tarjeta','Save card')}</button>${edit?B('cancel-card',T('Cancelar edición','Cancel edit')):''}</form></details></section>`;
    }
    function readerTools(t) {
      const panel=document.querySelector('.reading-panel');if(!panel)return;
      const headings=[...panel.querySelectorAll('section>h3,.worked-example>h3')];
      const unique=[...new Set(headings)];
      unique.forEach((h,i)=>{h.id='read-section-'+i;h.tabIndex=-1;});
      const toolbar=`<div class="reader-toolbar"><label for="reader-size">${T('Tamaño del texto','Text size')}<select id="reader-size">${[['standard',T('Normal','Standard')],['large',T('Grande','Large')],['extra',T('Muy grande','Extra large')]].map(([v,label])=>`<option value="${v}" ${state().reader.size===v?'selected':''}>${label}</option>`).join('')}</select></label>${B('focus',state().reader.focus?T('Salir del modo lectura','Exit reading mode'):T('Modo lectura','Reading mode'),`aria-pressed="${state().reader.focus}"`,'button small')}${B('download-lesson',T('Descargar lección y notas','Download lesson and notes'),'','button small')}<span class="reader-estimate">${Math.max(1,Math.ceil(panel.textContent.split(/\s+/).length/180))} min · ${T('lectura estimada','estimated reading')}</span></div>`;
      panel.insertAdjacentHTML('afterbegin',toolbar);
      if(unique.length)panel.querySelector('.reader-toolbar').insertAdjacentHTML('afterend',`<details class="reader-toc"><summary>${T('En esta lección','In this lesson')} · ${unique.length}</summary><nav aria-label="${T('Índice de la lección','Lesson contents')}">${unique.map((h,i)=>`<a href="#read-section-${i}" data-reader-anchor="read-section-${i}">${escape(h.textContent)}</a>`).join('')}</nav></details>`);
      if(t.deep?.glossary.length) {
        const box=`<details class="glossary-search"><summary>${T('Consultar vocabulario del tema','Look up topic vocabulary')}</summary><label for="glossary-query">${T('Buscar un concepto (vocabulario en español)','Find a concept (Spanish vocabulary)')}</label><input id="glossary-query" type="search"><dl id="glossary-results" lang="es">${glossaryResults(t,'')}</dl></details>`;
        document.querySelector('.lesson-aside')?.insertAdjacentHTML('afterbegin',box);
      }
      if(!state().activeSession)document.querySelector('.lesson-header')?.insertAdjacentHTML('beforeend',B('start-current',T('Estudiar este tema con una ruta de 25 min','Study this topic with a 25-minute route'),'','button small'));
    }
    function glossaryResults(t,q) {const values=t.deep.glossary.filter(([a,b])=>!q||IBStudy.norm(a+' '+b).includes(IBStudy.norm(q)));return values.length?values.map(([a,b])=>`<dt>${escape(a)}</dt><dd>${escape(b)}</dd>`).join(''):`<div>${T('No hay coincidencias en este vocabulario.','No matches in this glossary.')}</div>`;}
    function enhance() {
      const s=state();document.body.classList.toggle('reading-focus',s.reader.focus&&s.view==='course'&&s.tab==='study'&&s.mode==='read'&&!!current());
      document.body.dataset.readerSize=s.reader.size;
      if(s.view==='home') {
        document.querySelector('.home-grid')?.insertAdjacentHTML('afterend',quickStart()+launchCard()+discovery());
        applyGroup();
      }
      if(s.activeSession&&(s.view==='course'||s.view==='planner'))document.querySelector(s.view==='course'?'.tabs':'.page-heading')?.insertAdjacentHTML('afterend',activeRoute());
      if(s.view==='course') {
        const t=current();
        if(s.tab==='study'&&t&&s.mode==='read')readerTools(t);
        if(s.tab==='review')document.querySelector('.content').insertAdjacentHTML('beforeend',personalCardsPanel(t));
      }
      if(s.view==='progress') {
        const due=s.personalCards.filter(c=>c.due&&Date.parse(c.due)<=Date.now());
        document.querySelector('.content').insertAdjacentHTML('beforeend',`<section class="panel studio-history"><h2>${T('Mis rutas completadas','My completed routes')}</h2><p>${s.learningSessions.length} ${T('rutas registradas · autoevaluación del proceso','recorded routes · self-reported process')}</p>${s.learningSessions.slice(-10).reverse().map(a=>`<article><h3>${escape(tx(all().find(t=>t.id===a.topic)?.title))}</h3><small>${escape(a.completedAt.slice(0,10))} · ${a.minutes} ${T('min planificados','minutes planned')}</small><p>${escape(a.reflection)}</p></article>`).join('')}<h3>${T('Mis tarjetas pendientes','My cards due')} (${due.length})</h3>${due.map(c=>B('open-card',escape(c.front.slice(0,100)),`data-card="${c.id}"`,'button small')).join('')}</section>`);
      }
    }
    function applyGroup() { for(const group of document.querySelectorAll('.area-group'))group.hidden=!!selectedGroup&&!group.querySelector('#group-'+selectedGroup); }
    function start(topic,minutes) {const t=all().find(t=>t.id===topic);if(!t||state().activeSession)return;state().activeSession={id:'session-'+IBStudy.uid(),topic:t.id,course:t.course,minutes,steps:[],reflection:'',startedAt:new Date().toISOString(),completedAt:null};route(t.id,t.course);}
    function exportLesson(t) {
      const chunks=['# '+tx(t.title),'IB Easy · '+T('Material educativo independiente','Independent educational material'),tx(t.intro)];
      if(t.custom)chunks.push(T('Material personal, sin verificar','Personal material, unverified'),t.record.material,t.record.sourceTitle,t.record.sourceURL);
      else if(t.deep){chunks.push('## '+T('Objetivos','Objectives'),...t.deep.goals.map(x=>'- '+tx(x)),...t.deep.sections.flatMap(x=>['## '+x.title,x.body]),'## '+t.deep.example.title,t.deep.example.body,'## '+T('Profundizar','Go deeper'),t.deep.extension,'## '+T('Vocabulario','Vocabulary'),...t.deep.glossary.map(([a,b])=>a+': '+b),'## '+T('Fuentes','Sources'),...t.refs.map(r=>r.name+' — '+r.url));}
      chunks.push('## '+T('Mis notas','My notes'),state().notes[t.id]||'', '## '+T('Mis tarjetas (no verificadas)','My cards (unverified)'),...state().personalCards.filter(c=>c.topic===t.id).map(c=>c.front+'\n'+c.back+'\n'+c.source));
      ctx.download('IB-Easy-'+t.id+'.txt',chunks.join('\n\n'));
    }
    document.addEventListener('submit',e=>{
      if(e.target.id==='session-form'){e.preventDefault();const f=new FormData(e.target);start(String(f.get('topic')),Number(f.get('duration')));}
      if(e.target.id==='card-form'){
        e.preventDefault();const f=new FormData(e.target),topic=ctx.topics().find(t=>t.id===f.get('topic')),front=String(f.get('front')).trim(),back=String(f.get('back')).trim();
        if(!topic||!front||!back||front.length>1000||back.length>3000)return;
        if(!cardEdit&&state().personalCards.length>=500){ctx.toast(T('Límite de 500 tarjetas. Exporta antes de eliminar alguna.','Limit of 500 cards. Export before removing any.'));return;}
        const old=state().personalCards.find(c=>c.id===cardEdit),item={id:old?.id||'card-'+IBStudy.uid(),course:state().course,topic:topic.id,front,back,source:String(f.get('source')||'').slice(0,300),createdAt:old?.createdAt||new Date().toISOString(),due:null,repetitions:0};
        if(old)state().personalCards=state().personalCards.map(c=>c.id===old.id?item:c);else state().personalCards.push(item);
        cardEdit=null;cardShowing=item.id;revealed=false;ctx.recordActivity();ctx.go();ctx.toast(T('Tarjeta guardada. Repásala antes de programarla.','Card saved. Review it before scheduling.'));
      }
    });
    document.addEventListener('input',e=>{
      if(e.target.id==='library-search'){searchText=e.target.value;document.getElementById('library-results').innerHTML=searchResults();}
      if(e.target.id==='glossary-query'&&current())document.getElementById('glossary-results').innerHTML=glossaryResults(current(),e.target.value);
      if(e.target.id==='route-reflection'&&state().activeSession){state().activeSession.reflection=e.target.value.slice(0,3000);ctx.saveSoon();}
    });
    document.addEventListener('change',e=>{
      if(e.target.id==='reader-size'){state().reader.size=e.target.value;document.body.dataset.readerSize=e.target.value;ctx.save();}
      if(e.target.dataset.routeStep&&state().activeSession){const a=state().activeSession,id=e.target.dataset.routeStep;a.steps=e.target.checked?[...new Set([...a.steps,id])]:a.steps.filter(s=>s!==id);ctx.save();}
      if(e.target.id==='personal-card-select'){cardShowing=e.target.value;revealed=false;cardEdit=null;ctx.render();}
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('reading-focus')){state().reader.focus=false;ctx.go();}});
    document.addEventListener('click',e=>{
      const anchor=e.target.closest('[data-reader-anchor]');if(anchor){e.preventDefault();const h=document.getElementById(anchor.dataset.readerAnchor);h?.focus();h?.scrollIntoView?.({block:'start'});return;}
      const b=e.target.closest('[data-studio]');if(!b)return;const s=state(),a=b.dataset.studio;
      if(a==='open')route(b.dataset.topic,b.dataset.course);
      else if(a==='demo'){route('biology-cells','biology');}
      else if(a==='focus-search'){const target=document.getElementById('library-search');target?.scrollIntoView?.({block:'center',behavior:'smooth'});target?.focus();}
      else if(a==='focus-subjects'){const target=document.querySelector('.area-group .course-card [data-action="course"],.area-group .course-card [data-action="saved-topic"]');target?.scrollIntoView?.({block:'center',behavior:'smooth'});target?.focus();}
      else if(a==='group'){selectedGroup=b.dataset.group;ctx.render();document.querySelector('[data-studio="group"][data-group="'+selectedGroup+'"]')?.focus();}
      else if(a==='start-current')start(s.topic,25);
      else if(a==='resume'&&s.activeSession)route(s.activeSession.topic,s.activeSession.course);
      else if(a==='focus'){s.reader.focus=!s.reader.focus;ctx.render();ctx.save();document.querySelector('[data-studio="focus"]')?.focus();}
      else if(a==='download-lesson'&&current())exportLesson(current());
      else if(a==='cancel-route'&&confirm(T('¿Descartar esta ruta? Tus notas y respuestas se conservan.','Discard this route? Notes and answers are kept.'))){s.activeSession=null;ctx.go();}
      else if(a==='finish'&&s.activeSession){if(s.activeSession.steps.length<4||!s.activeSession.reflection.trim()){document.getElementById('route-status').textContent=T('Completa los cuatro pasos y escribe una reflexión antes de finalizar.','Complete all four steps and write a reflection before finishing.');return;}s.learningSessions.push({...s.activeSession,completedAt:new Date().toISOString()});s.learningSessions=s.learningSessions.slice(-200);s.activeSession=null;ctx.recordActivity();ctx.go();ctx.toast(T('Ruta guardada en Mi progreso.','Route saved in My progress.'));}
      else if(a==='reveal-card'){revealed=true;ctx.render();}
      else if(a==='cancel-card'){cardEdit=null;ctx.render();}
      else if(a==='edit-card'){cardEdit=b.dataset.card;ctx.render();document.getElementById('card-front')?.focus();}
      else if(a==='delete-card'&&confirm(T('¿Eliminar esta tarjeta personal?','Delete this personal card?'))){s.personalCards=s.personalCards.filter(c=>c.id!==b.dataset.card);cardEdit=null;cardShowing=null;revealed=false;ctx.go();}
      else if(a==='rate-card'&&revealed){const c=s.personalCards.find(c=>c.id===b.dataset.card);if(!c)return;c.repetitions=b.dataset.rating==='recall'?Math.min(c.repetitions+1,5):0;c.due=new Date(Date.now()+[1,1,3,7,14,30][c.repetitions]*86400000).toISOString();revealed=false;ctx.recordActivity();ctx.go();}
      else if(a==='open-card'){const c=s.personalCards.find(c=>c.id===b.dataset.card);if(!c)return;ctx.switchArea(c.course);ctx.choose(c.topic);s.tab='review';cardShowing=c.id;revealed=false;ctx.go();}
    });
    return {enhance};
  }
  window.IBStudio={mount,validateState,recommendations};
})();
