/* Original teaching diagrams; only static, trusted SVG is rendered as markup. */
(() => {
  const L=IBLearning.L;
  IBLearning.areaTools={
    fields:{
      science:[
        ['question',L('Pregunta e hipótesis comprobable','Question and testable hypothesis')],
        ['variables',L('Variables: independiente, dependiente y controles','Variables: independent, dependent and controls')],
        ['method',L('Método, mediciones, unidades y seguridad','Method, measurements, units and safety')],
        ['observations',L('Observaciones y datos: distingue reales de hipotéticos','Observations and data: distinguish actual from hypothetical')],
        ['analysis',L('Interpretación, incertidumbre y explicaciones alternativas','Interpretation, uncertainty and alternative explanations')],
        ['conclusion',L('Conclusión, límites y siguiente comprobación','Conclusion, limitations and next check')]
      ],
      ess:[
        ['boundary',L('Límite del sistema, entradas, salidas y reservas','System boundary, inputs, outputs and stores')],
        ['evidence',L('Evidencia y procedencia de los datos','Evidence and data sources')],
        ['actors',L('Actores, intereses, valores y perspectivas','Stakeholders, interests, values and perspectives')],
        ['decision',L('Alternativas, consecuencias y criterios de decisión','Alternatives, consequences and decision criteria')]
      ],
      music:[
        ['intent',L('Intención musical y contexto','Musical intention and context')],
        ['reference',L('Pieza o ejercicio: título, autor, enlace y localización','Piece or exercise: title, author, link and location')],
        ['analysis',L('Evidencias sobre ritmo, melodía, armonía, timbre y estructura','Evidence about rhythm, melody, harmony, timbre and structure')],
        ['process',L('Diario: fecha, prueba realizada, resultado y cambio','Journal: date, trial, outcome and revision')],
        ['reflection',L('Reflexión sobre tu creación o interpretación real','Reflection on your actual creation or performance')]
      ],
      visualarts:[
        ['intent',L('Intención artística y destinatario','Artistic intention and audience')],
        ['reference',L('Obras: autor, título, fecha, procedencia y permisos','Works: artist, title, date, source and permissions')],
        ['formal',L('Análisis: recurso visual, evidencia y efecto','Analysis: visual device, evidence and effect')],
        ['process',L('Diario: técnica, experimento, fecha y revisión','Journal: technique, experiment, date and revision')],
        ['portfolio',L('Portafolio: pieza propia, ubicación, decisión y siguiente paso','Portfolio: own work, location, decision and next step')]
      ]
    },
    diagrams:{
      'biology-cells':{
        title:L('Difusión: un modelo de partículas','Diffusion: a particle model'),
        caption:L('Diagrama didáctico original. A tiene mayor concentración que B. Las partículas se mueven en ambos sentidos; si la membrana permite su paso, el flujo neto inicial va de A hacia B. No está a escala.','Original teaching diagram. A has a higher concentration than B. Particles move both ways; if the membrane is permeable to them, the initial net flow is from A to B. Not to scale.'),
        svg:'<svg viewBox="0 0 600 180" role="img" aria-label="A: 8 partículas; B: 3. Membrana central. Flecha neta de A a B."><rect x="15" y="15" width="570" height="150" rx="16" fill="#edf7fc"/><path d="M290 20v140M310 20v140" stroke="#075b92" stroke-width="4"/><g fill="#075b92"><circle cx="65" cy="55" r="9"/><circle cx="110" cy="105" r="9"/><circle cx="155" cy="45" r="9"/><circle cx="200" cy="120" r="9"/><circle cx="70" cy="135" r="9"/><circle cx="230" cy="55" r="9"/><circle cx="180" cy="85" r="9"/><circle cx="130" cy="140" r="9"/><circle cx="400" cy="55" r="9"/><circle cx="475" cy="120" r="9"/><circle cx="545" cy="70" r="9"/></g><path d="M245 90h105l-15-10m15 10-15 10" stroke="#083d62" stroke-width="4" fill="none"/><g font-size="18" fill="#083d62"><text x="30" y="40">A</text><text x="560" y="40">B</text></g></svg>'
      },
      'physics-motion':{
        title:L('Movimiento circular: velocidad y fuerza neta','Circular motion: velocity and net force'),
        caption:L('Esquema original, no a escala. En el punto derecho, v es tangente y F neta apunta al centro si el movimiento circular es uniforme. La fuerza centrípeta es el nombre de esa resultante radial; no una fuerza adicional.','Original diagram, not to scale. At the rightmost point, v is tangent and net F points to the centre in uniform circular motion. Centripetal force names that radial resultant; it is not an additional force.'),
        svg:'<svg viewBox="0 0 600 200" role="img" aria-label="Trayectoria circular; velocidad tangente hacia arriba y fuerza neta hacia el centro"><circle cx="240" cy="100" r="75" fill="#edf7fc" stroke="#075b92" stroke-width="2"/><circle cx="315" cy="100" r="7" fill="#083d62"/><circle cx="240" cy="100" r="3" fill="#083d62"/><path d="M315 100V20l-7 12m7-12 7 12M315 100h-65l12-7m-12 7 12 7" stroke="#083d62" stroke-width="3" fill="none"/><g font-size="18" fill="#083d62"><text x="330" y="35">v</text><text x="260" y="125">F</text></g></svg>'
      },
      'music-rhythm':{
        title:L('Un compás didáctico de cuatro pulsos','A teaching bar with four beats'),
        caption:L('Patrón original: TA | TA | ti-ti | TA. Cada casilla grande dura un pulso; el tercer pulso se divide en dos mitades iguales. A 60 pulsos por minuto, este compás de cuatro pulsos dura 4 segundos. Es una representación visual, no audio.','Original pattern: TA | TA | ti-ti | TA. Each large box lasts one beat; the third beat splits into equal halves. At 60 beats per minute, this four-beat bar lasts 4 seconds. This is a visual representation, not audio.'),
        svg:'<svg viewBox="0 0 600 130" role="img" aria-label="Cuatro pulsos: negra, negra, dos corcheas, negra"><g fill="#dff4fb" stroke="#075b92" stroke-width="2"><rect x="20" y="20" width="140" height="80"/><rect x="160" y="20" width="140" height="80"/><rect x="300" y="20" width="70" height="80"/><rect x="370" y="20" width="70" height="80"/><rect x="440" y="20" width="140" height="80"/></g><g font-size="22" text-anchor="middle" fill="#083d62"><text x="90" y="67">TA</text><text x="230" y="67">TA</text><text x="335" y="67">ti</text><text x="405" y="67">ti</text><text x="510" y="67">TA</text></g></svg>'
      },
      'art-color':{
        title:L('Dos estudios originales de composición','Two original composition studies'),
        caption:L('En A, el círculo está centrado; en B, desplazado hacia la derecha. Ambos mantienen tamaño y paleta. Describe cómo cambia el equilibrio percibido antes de atribuir una emoción universal al color.','In A, the circle is centred; in B, it sits to the right. Size and palette remain constant. Describe how perceived balance changes before assigning a universal emotion to a colour.'),
        svg:'<svg viewBox="0 0 600 200" role="img" aria-label="Composición A centrada; composición B asimétrica. Mismo fondo azul y círculo amarillo"><rect x="15" y="15" width="270" height="165" rx="8" fill="#083d62"/><rect x="315" y="15" width="270" height="165" rx="8" fill="#083d62"/><circle cx="150" cy="98" r="38" fill="#ffd35b"/><circle cx="515" cy="98" r="38" fill="#ffd35b"/><g fill="white" font-size="18"><text x="30" y="40">A</text><text x="330" y="40">B</text></g></svg>'
      }
    }
  };
})();
