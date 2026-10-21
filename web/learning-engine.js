/* Content enrichment and deterministic local study tools. No network, eval or model. */
(() => {
  'use strict';
  const D = IBLearning, L = D.L;
  for (const entry of D.expansions || []) {
    const list = entry.course === 'history' ? D.history : D.other[entry.course];
    if (!list) throw new Error('Unknown content area: ' + entry.course);
    let t = list.find(item => item.id === entry.id);
    if (!t) {
      t = {id:entry.id,title:entry.title,intro:entry.intro,keywords:'',period:'',category:L('Explorar y aplicar','Explore and apply'),sections:[],timeline:[],tip:entry.summary||entry.intro,refs:[],quiz:[]};
      list.push(t);
    }
    t.deep = entry;
    t.difficulty = entry.difficulty || 'intermediate';
    t.keywords += ' ' + entry.keywords;
    t.quiz.push(...entry.quiz);
    for (const ref of entry.refs) if (!t.refs.some(r => r.url === ref.url)) t.refs.push(ref);
  }
  // Additional feedback leaves legacy answers and question indices intact.
  const legacyFeedback={
    ww1:[ [null,['Las condiciones previas y el evento inmediato cumplen funciones distintas.','Prior conditions and the immediate event have different roles.'],['Sin condiciones previas no explicas por qué escaló la crisis.','Without prior conditions you cannot explain escalation.']], [['Más nombres no explican un mecanismo causal.','More names do not explain a causal mechanism.'],null,['Las fechas permiten comprobar la secuencia; eliminarlas no añade análisis.','Dates establish sequence; removing them adds no analysis.']], [['Versalles fue firmado en 1919; no es el armisticio.','Versailles was signed in 1919; it is not the armistice.'],['La guerra comenzó en 1914.','The war began in 1914.'],null] ],
    ww2:[ [['Polonia fue invadida en 1939, después de Múnich.','Poland was invaded in 1939, after Munich.'],null,['La derrota del Eje ocurrió en 1945.','The Axis defeat occurred in 1945.']], [null,['Un juicio necesita criterios y evidencia.','A judgment needs criteria and evidence.'],['Omitir decisiones alemanas elimina una parte causal esencial.','Omitting German decisions removes an essential causal element.']], [['Una fecha ubica; no explica todos los mecanismos.','A date locates events; it does not explain all mechanisms.'],['Declarar inevitabilidad evita examinar decisiones y alternativas.','Declaring inevitability avoids examining decisions and alternatives.'],null] ],
    coldwar:[ [['Las amenazas percibidas deben investigarse con evidencia.','Perceived threats must be investigated with evidence.'],null,['Seguridad e ideología pueden interactuar.','Security and ideology can interact.']], [['Omite intereses y decisiones de otros actores.','It omits other actors’ interests and decisions.'],['Omite a Cuba y Estados Unidos.','It omits Cuba and the United States.'],null], [null,['1914 corresponde al comienzo de la Primera Guerra Mundial.','1914 marks the beginning of World War I.'],['1933 precede al contexto de posguerra de la doctrina.','1933 precedes the doctrine’s post-war context.']] ],
    russia:[ [null,['La doctrina Truman pertenece a 1947.','The Truman Doctrine belongs to 1947.'],['La Segunda Guerra Mundial terminó en 1945.','World War II ended in 1945.']], [['Los nombres no indican una revolución diaria.','The names do not indicate daily revolutions.'],null,['Las fechas pueden convertirse entre calendarios.','Dates can be converted between calendars.']], [['No examina una causa de la crisis.','It does not examine a cause of the crisis.'],['Supone una identidad entre procesos que debe demostrarse.','It assumes identical processes without evidence.'],null] ],
    cuba:[ [['Invierte la secuencia de 1959, 1961 y 1962.','It reverses the sequence of 1959, 1961 and 1962.'],null,['La caída de Batista precedió a Bahía de Cochinos.','Batista’s fall preceded the Bay of Pigs.']], [['La victoria no mide las opiniones de toda la población.','Victory does not measure everyone’s views.'],['Derrotar una invasión no elimina toda oposición.','Defeating an invasion does not eliminate all opposition.'],null], [null,['El origen orienta la evaluación; no vuelve inútil toda evidencia.','Origin guides evaluation; it does not make all evidence useless.'],['Toda fuente tiene contexto y propósito que examinar.','Every source has context and purpose to examine.']] ],
    nazi:[ [['Acceder y conservar poder plantean problemas distintos.','Gaining and retaining power pose different problems.'],['El acceso puede combinar nombramiento, coerción y otros mecanismos.','Access may combine appointment, coercion and other mechanisms.'],null], [null,['La ley debilitó controles parlamentarios; no restauró pluralismo.','The act weakened parliamentary controls; it did not restore pluralism.'],['La Primera Guerra Mundial terminó antes de 1933.','World War I ended before 1933.']], [['Dos relatos separados no establecen un criterio común.','Two separate accounts do not establish a shared criterion.'],null,['La cronología necesita relaciones explicadas.','Chronology needs explained relationships.']] ],
    newdeal:[ [['Las fotografías no muestran efectos sobre derechos laborales.','Photographs do not establish effects on labour rights.'],null,['La fecha ubica la reforma; no evalúa su resultado.','The date locates the reform; it does not evaluate outcomes.']], [null,['Atender urgencias, reactivar y cambiar instituciones no son idénticos.','Relief, recovery and institutional change are not identical.'],['Son objetivos asociados al análisis del New Deal.','They are objectives associated with New Deal analysis.']], [['Los efectos pueden variar entre grupos.','Effects may differ across groups.'],['Una evaluación requiere respaldo.','Evaluation requires support.'],null] ],
    mexico:[ [['Ignorar actores oculta diferencias.','Ignoring actors hides differences.'],['Presupone la unidad que se necesita examinar.','It presumes the unity being examined.'],null], [null,['Una norma no garantiza resolver problemas sociales.','A legal rule does not guarantee resolving social problems.'],['La aprobación no demuestra ausencia de conflictos posteriores.','Adoption does not establish an absence of later conflict.']], [['Ordenar fechas no basta para contrastar resultados.','Ordering dates is insufficient to compare outcomes.'],null,['La neutralidad no se obtiene automáticamente.','Neutrality is not automatic.']] ],
    'literary-effect':[[['Una lista identifica; no explica efectos.','A list identifies devices; it does not explain effects.'],null,['La biografía no sustituye evidencia del fragmento.','Biography does not replace evidence from the extract.']]],
    'literary-comparison':[[null,['Resúmenes separados pueden dejar la relación sin analizar.','Separate summaries may leave the relationship unanalysed.'],['Las diferencias ayudan a matizar la comparación.','Differences help qualify comparison.']]],
    'math-functions':[[['1 y 3 son raíces, no coordenadas del vértice.','1 and 3 are roots, not vertex coordinates.'],['La forma (x−2)²−1 sitúa el centro en x=2 y altura −1.','The form (x−2)²−1 places the centre at x=2 and height −1.'],null]],
    'math-derivatives':[[['x³ tiene derivada cero en 0 sin mínimo.','x³ has zero derivative at 0 without a minimum.'],null,['El signo de x no clasifica un extremo.','The sign of x does not classify an extremum.']]],
    'english-opinion':[[null,['Repite la opinión sin limitar su alcance.','It repeats the opinion without qualifying its scope.'],['Introduce un ejemplo, no una condición o limitación.','It introduces an example, not a condition or limitation.']]],
    'english-evidence':[[['Una cita inventada no es evidencia del texto.','An invented quotation is not textual evidence.'],['El resumen dice qué ocurre; falta explicar su significado.','A summary describes events; their significance still needs explaining.'],null]],
    'business-segment':[[['No identifica una necesidad compartida que oriente decisiones.','It does not identify a shared need to guide decisions.'],null,['Sin rasgos relevantes comunes no orienta una oferta.','Without relevant shared features it does not guide an offer.']]],
    'business-decisions':[[['Una definición no aplica el concepto al caso.','A definition does not apply the concept to the case.'],['Sin razones no puede evaluarse la recomendación.','Without reasons the recommendation cannot be evaluated.'],null]],
    'digital-stakeholders':[[null,['Un anuncio presenta una expectativa, no resultados comprobados.','An advert presents expectations, not verified outcomes.'],['El nombre no demuestra efectos.','The name does not establish effects.']]],
    'digital-ai':[[['El uso debe responder a una necesidad y evaluación concreta.','Use should address a specific need and evaluation.'],null,['Los sistemas pueden cometer errores.','Systems can make errors.']]],
    'cas-plan':[[['Los resultados deben proceder de experiencias reales.','Results must come from real experiences.'],['La documentación sigue a una necesidad y un plan.','Documentation follows a need and plan.'],null]],
    'cas-reflection':[[null,['Ocultar dificultades limita la reflexión.','Hiding difficulties limits reflection.'],['La reflexión debe corresponder a tu experiencia.','Reflection must relate to your experience.']]],
    'tok-knowledge':[[['Una fecha aislada no examina justificación.','An isolated date does not examine justification.'],null,['Las razones son centrales para evaluar conocimiento.','Reasons are central to evaluating knowledge.']]],
    'tok-object':[[['La abstracción sin contexto no justifica el objeto.','Abstraction without context does not justify the object.'],['Cambiar el nombre no añade una conexión específica.','Changing the name adds no specific connection.'],null]],
    'ee-question':[[null,['La sofisticación verbal no asegura viabilidad.','Sophisticated wording does not ensure feasibility.'],['Un alcance tan amplio puede impedir análisis profundo.','Such a broad scope may prevent deep analysis.']]],
    'ee-sources':[[['Eliminar la referencia oculta procedencia.','Removing the reference hides provenance.'],null,['La memoria posterior puede confundir voces y páginas.','Later recollection may confuse voices and page numbers.']]]
  };
  const catalog = () => D.courses.flatMap(c => (c.id==='history'?D.history:D.other[c.id]).map(t=>({...t,course:c.id})));
  for(const t of catalog())for(const [i,reasons]of (legacyFeedback[t.id]||[]).entries())t.quiz[i].optionWhy=reasons.map(r=>r?L(...r):t.quiz[i].why);
  D.other.math[0].quiz[0].text=L('Para f(x)=x²−4x+3, ¿cuál es el vértice?','For f(x)=x²−4x+3, what is the vertex?');
  D.other.math[1].quiz[0].text=L('Para f(x)=x²−4x+3, ¿por qué x=2 da un mínimo?','For f(x)=x²−4x+3, why does x=2 give a minimum?');
  const norm = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  const stop = new Set('a al algo algunos any como con de del el en entre es estudiar estudio explicame for how i informacion information la las lo los me mi of on para por que quiero sobre study tema the to un una y and what want learn learning please pls'.split(' '));
  const tokens = v => [...new Set(norm(v).split(' ').filter(w=>w.length>1&&!stop.has(w)))];
  function near(a,b) {
    if(a===b)return true;
    if(Math.min(a.length,b.length)<5||Math.abs(a.length-b.length)>1)return false;
    let i=0,j=0,errors=0;
    while(i<a.length&&j<b.length){if(a[i]===b[j]){i++;j++;continue;}if(++errors>1)return false;if(a.length>=b.length)i++;if(b.length>=a.length)j++;}
    return errors+(a.length-i)+(b.length-j)<=1;
  }
  function search(query, items) {
    const words=tokens(query);if(!words.length)return [];
    const exactItems=items.filter(t=>norm(t.title.es)===norm(query)||norm(t.title.en)===norm(query));
    if(exactItems.length)return exactItems.map(topic=>({topic,coverage:1,score:words.length+6,matched:words}));
    return items.map(t=>{
      const primary=tokens([t.title.es,t.title.en,t.keywords,t.period,t.custom?t.record.material:''].join(' '));
      const matched=words.filter(w=>primary.some(p=>near(w,p)));
      const ratio=matched.length/words.length;
      const exact=norm(t.title.es)===norm(query)||norm(t.title.en)===norm(query);
      return {topic:t,coverage:ratio,score:matched.length+ratio+(exact?5:0),matched};
    }).filter(r=>r.coverage>=0.6).sort((a,b)=>b.score-a.score);
  }
  function safeURL(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
  const cleanString=(v,max=20000)=>typeof v==='string'?v.slice(0,max):'';
  const plain=o=>!!o&&typeof o==='object'&&!Array.isArray(o);
  const forbidden=k=>['__proto__','prototype','constructor'].includes(k);
  function validate(raw) {
    if(!plain(raw)||raw.version!==1)throw Error('Unsupported backup');
    const json=JSON.stringify(raw);
    if(json.length>8000000)throw Error('Backup too large');
    for(const k of ['customTopics','read','bookmarks','mistakes','tasks','history','activeDays'])if(raw[k]!==undefined&&!Array.isArray(raw[k]))throw Error('Invalid list: '+k);
    for(const k of ['notes','drafts','practiceAnswers','answers','checks','levels','practiceHints','openedAt','sectionReads','courseLast','explorers','reviewSchedule'])if(raw[k]!==undefined&&!plain(raw[k]))throw Error('Invalid map: '+k);
    const inspect=o=>{if(o&&typeof o==='object')for(const k of Object.keys(o)){if(forbidden(k))throw Error('Unsafe property');inspect(o[k]);}};inspect(raw);
    const result={version:1,schemaVersion:4};
    const courseIds=D.courses.map(c=>c.id),ids=catalog().map(t=>t.id);
    result.customTopics=(Array.isArray(raw.customTopics)?raw.customTopics:[]).slice(0,50).filter(t=>plain(t)&&/^custom-[a-z0-9-]{1,60}$/.test(t.id)&&courseIds.includes(t.course)&&typeof t.query==='string').map(t=>({id:t.id,course:t.course,query:cleanString(t.query,180),material:cleanString(t.material,60000),sourceTitle:cleanString(t.sourceTitle,200),sourceURL:safeURL(t.sourceURL),locator:cleanString(t.locator,120),lang:t.lang==='en'?'en':'es',level:t.level==='HL'?'HL':'SL',year:['2026','2027','2028'].includes(t.year)?t.year:'2027',difficulty:['foundation','intermediate','advanced'].includes(t.difficulty)?t.difficulty:'',createdAt:cleanString(t.createdAt,40)}));
    const validIds=new Set([...ids,...result.customTopics.map(t=>t.id)]);
    if((raw.customTopics?.length||0)!==result.customTopics.length||new Set(result.customTopics.map(t=>t.id)).size!==result.customTopics.length)throw Error('Invalid personal topics');
    for(const k of ['read','bookmarks'])result[k]=[...new Set((Array.isArray(raw[k])?raw[k]:[]).filter(x=>validIds.has(x)))];
    for(const k of ['notes','drafts','practiceAnswers']){result[k]={};if(plain(raw[k])){if(Object.keys(raw[k]).length>2000)throw Error('Too many records');for(const [key,value] of Object.entries(raw[k])){if(key.length>=120||typeof value!=='string')throw Error('Invalid text record');result[k][key]=value;}}}
    result.answers={};if(plain(raw.answers))for(const [key,value] of Object.entries(raw.answers)){const [id,index]=key.split(':');const q=catalog().find(t=>t.id===id)?.quiz[Number(index)];if(q&&Number.isInteger(value)&&value>=0&&value<q.options.length)result.answers[key]=value;}
    result.checks={};if(plain(raw.checks))for(const [key,value] of Object.entries(raw.checks).slice(0,3000))if(typeof value==='boolean'&&key.length<120)result.checks[key]=value;
    result.mistakes=[...new Set((Array.isArray(raw.mistakes)?raw.mistakes:[]).filter(k=>{const [id,i]=String(k).split(':');return !!catalog().find(t=>t.id===id)?.quiz[Number(i)];}))];
    result.tasks=(Array.isArray(raw.tasks)?raw.tasks:[]).slice(0,500).filter(t=>plain(t)&&typeof t.id==='string'&&courseIds.includes(t.course)&&/^\d{4}-\d{2}-\d{2}$/.test(t.date)).map(t=>({id:cleanString(t.id,100),course:t.course,text:cleanString(t.text,160),date:t.date,done:t.done===true}));
    result.history=(Array.isArray(raw.history)?raw.history:[]).slice(-3000).filter(h=>{const q=plain(h)&&catalog().find(t=>t.id===h.topic)?.quiz[h.q];return q&&Number.isInteger(h.q)&&Number.isInteger(h.choice)&&h.choice>=0&&h.choice<q.options.length;}).map(h=>({topic:h.topic,q:h.q,choice:h.choice,correct:h.choice===catalog().find(t=>t.id===h.topic).quiz[h.q].answer,at:cleanString(h.at,40)}));
    result.activeDays=[...new Set((Array.isArray(raw.activeDays)?raw.activeDays:[]).filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)))].slice(-366);
    result.levels={};for(const id of courseIds)result.levels[id]=raw.levels?.[id]==='HL'?'HL':'SL';
    result.lang=raw.lang==='en'?'en':'es';result.persist=raw.persist===true;result.course=courseIds.includes(raw.course)?raw.course:'history';
    result.year=['2026','2027','2028'].includes(raw.year)?raw.year:'2027';
    result.view=['home','course','progress','planner','settings'].includes(raw.view)?raw.view:'home';
    result.tab=['study','exams','review','notes','mentor','resources'].includes(raw.tab)?raw.tab:'study';
    result.topic=validIds.has(raw.topic)?raw.topic:null;result.mode=raw.mode==='quiz'?'quiz':'read';
    result.region=['americas','europe','africa','asia'].includes(raw.region)?raw.region:'americas';result.paper=[1,2,3].includes(raw.paper)?raw.paper:1;
    result.question=typeof raw.question==='string'&&D.exams.questions.some(q=>q.id===raw.question)?raw.question:null;
    result.lastTopic=plain(raw.lastTopic)&&courseIds.includes(raw.lastTopic.course)&&validIds.has(raw.lastTopic.id)?{course:raw.lastTopic.course,id:raw.lastTopic.id}:null;
    result.sessions=Number.isSafeInteger(raw.sessions)&&raw.sessions>=0?raw.sessions:0;
    result.readingDepth=['summary','full','deep'].includes(raw.readingDepth)?raw.readingDepth:'full';
    result.practiceHints={};if(plain(raw.practiceHints))for(const [id,n]of Object.entries(raw.practiceHints))if(ids.includes(id)&&Number.isInteger(n)&&n>=0)result.practiceHints[id]=Math.min(n,20);
    result.openedAt={};for(const [id,at]of Object.entries(raw.openedAt||{}))if(validIds.has(id)&&typeof at==='string'&&Number.isFinite(Date.parse(at)))result.openedAt[id]=cleanString(at,40);
    result.sectionReads={};for(const [key,value]of Object.entries(raw.sectionReads||{})){const [id,label,index]=key.split(':');const t=catalog().find(t=>t.id===id);if(label==='section'&&t?.deep?.sections[Number(index)]&&typeof value==='boolean')result.sectionReads[key]=value;}
    result.courseLast={};for(const c of courseIds){const id=raw.courseLast?.[c];if(catalog().some(t=>t.course===c&&t.id===id)||result.customTopics.some(t=>t.course===c&&t.id===id))result.courseLast[c]=id;}
    if(result.lastTopic&&!result.courseLast[result.lastTopic.course])result.courseLast[result.lastTopic.course]=result.lastTopic.id;
    result.explorers={};for(const [id,draft]of Object.entries(raw.explorers||{})){if(!courseIds.includes(id)||!plain(draft))continue;const v={};for(const [k,max]of Object.entries({customQuery:180,materialDraft:60000,sourceDraft:200,locatorDraft:120,urlDraft:2048}))v[k]=cleanString(draft[k],max);v.customPanel=draft.customPanel===true;v.editCustom=result.customTopics.some(t=>t.course===id&&t.id===draft.editCustom)?draft.editCustom:null;result.explorers[id]=v;}
    if(result.explorers[result.course])Object.assign(result,result.explorers[result.course]);
    result.reviewSchedule={};for(const [key,r]of Object.entries(raw.reviewSchedule||{})){const [id,idx]=key.split(':');if(catalog().find(t=>t.id===id)?.quiz[Number(idx)]&&plain(r)&&Number.isFinite(Date.parse(r.due))&&Number.isInteger(r.repetitions)&&r.repetitions>=0&&r.repetitions<=5)result.reviewSchedule[key]={due:cleanString(r.due,40),repetitions:r.repetitions};}
    result.difficulty=['foundation','intermediate','advanced'].includes(raw.difficulty)?raw.difficulty:'';
    return IBStudio.validateState(raw,result);
  }
  function parseBackup(text){if(typeof text!=='string'||text.length>8000000)throw Error('Backup too large');return validate(JSON.parse(text));}
  function numeric(value,expected,tolerance=0.001){const str=String(value).trim().replace(',','.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(str))return {valid:false,correct:false};const n=Number(str);return {valid:Number.isFinite(n),correct:Number.isFinite(n)&&Math.abs(n-expected)<=tolerance};}
  function excerpts(text,query){const pieces=String(text).split(/\n\s*\n|(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ])/).filter(x=>x.trim());const terms=tokens(query);return pieces.map((text,index)=>({text,index,score:terms.filter(w=>tokens(text).some(t=>near(w,t))).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,4);}
  function uid(){const bytes=new Uint8Array(16);crypto.getRandomValues(bytes);return Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("");}
  window.IBStudy={uid,catalog,search,norm,tokens,safeURL,validate,parseBackup,numeric,excerpts};
})();
