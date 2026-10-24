/* Area metadata only. Lessons remain in independently maintained content modules. */
(() => {
  const D=IBLearning,L=D.L;
  const added=[
    ['biology','Biología','Biology','BI','De la célula a los sistemas vivos.','From cells to living systems.'],
    ['chemistry','Química','Chemistry','QU','Explica la materia y sus transformaciones.','Explain matter and its transformations.'],
    ['physics','Física','Physics','FI','Modelos, mediciones y leyes de la naturaleza.','Models, measurements and laws of nature.'],
    ['sports','CDES · Ciencias del Deporte, el Ejercicio y la Salud','SEHS · Sports, Exercise and Health Science','CD','Comprende el movimiento y analiza el rendimiento.','Understand movement and analyse performance.'],
    ['ess','SAS · Sistemas Ambientales y Sociedades','ESS · Environmental Systems and Societies','SA','Ambiente, sistemas y decisiones compartidas.','Environment, systems and shared decisions.'],
    ['music','Música','Music','MU','Escucha, analiza, crea y reflexiona.','Listen, analyse, create and reflect.'],
    ['visualarts','Artes Visuales','Visual Arts','AV','Explora materiales y construye una mirada propia.','Explore materials and develop your own perspective.']
  ];
  for(const [id,es,en,icon,des,den] of added){D.courses.push({id,name:L(es,en),icon,desc:L(des,den),core:false});D.other[id]=[];}
  D.groups=[
    {id:'languages',name:L('Lenguas','Languages'),courses:['literature','english']},
    {id:'history',name:L('Historia','History'),courses:['history']},
    {id:'mathematics',name:L('Matemáticas','Mathematics'),courses:['math']},
    {id:'electives',name:L('Electivos','Electives'),courses:['business','digital','ess','biology','sports','chemistry','physics','music','visualarts']},
    {id:'core',name:L('Núcleo del IB','IB core'),courses:['tok','cas','ee']}
  ];
  const examples={
    history:L('Consolidación del poder de Castro entre 1959 y 1965','Consolidation of Castro’s power between 1959 and 1965'),
    math:L('Derivadas y problemas de optimización','Derivatives and optimisation problems'),
    english:L('Vocabulary about technology and social media','Vocabulary about technology and social media'),
    literature:L('La ironía en Sueño de una noche de verano','Irony in A Midsummer Night’s Dream'),
    business:L('Estado de resultados y flujo de caja','Income statement and cash flow'),
    digital:L('Privacidad y reconocimiento facial','Privacy and facial recognition'),
    biology:L('Transporte a través de la membrana celular','Transport across the cell membrane'),
    chemistry:L('Equilibrio químico y principio de Le Châtelier','Chemical equilibrium and Le Chatelier’s principle'),
    physics:L('Movimiento circular y fuerza centrípeta','Circular motion and centripetal force'),
    sports:L('Sistemas energéticos durante el ejercicio','Energy systems during exercise'),
    ess:L('Contaminación del agua y sostenibilidad','Water pollution and sustainability'),
    music:L('Ritmo, melodía y armonía en una composición','Rhythm, melody and harmony in a composition'),
    visualarts:L('Uso del color y composición visual','Use of colour and visual composition'),
    tok:L('¿Puede el conocimiento ser completamente objetivo?','Can knowledge be completely objective?'),
    cas:L('Planificar una experiencia de servicio comunitario','Planning a community service experience'),
    ee:L('Delimitar una pregunta de investigación sobre inteligencia artificial','Narrowing a research question on artificial intelligence')
  };
  for(const c of D.courses){c.group=D.groups.find(g=>g.courses.includes(c.id)).id;c.example=examples[c.id];}
})();
