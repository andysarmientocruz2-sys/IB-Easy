# Entrega local 0.6.0 · 18 de octubre de 2026

## Resultado

48 temas desarrollados y 184 preguntas de comprensión: ocho temas de Historia y cinco por cada otra área. Se mantienen los 24 temas y 40 preguntas anteriores, sus identificadores y posiciones de respuesta. Las dos preguntas matemáticas antiguas ahora explicitan la función en su enunciado para evitar ambigüedad entre ejemplos.

Se implementaron lectura por profundidad, búsqueda libre local, materiales personales editables, talleres específicos, organizadores CAS/Monografía, MathML, pistas, comprobación numérica, historial, días de actividad, continuación del último tema y progreso por área. La importación valida la copia antes de confirmar el reemplazo y conserva la preferencia actual de guardado.

Los componentes del núcleo están separados de las asignaturas. Las preguntas conceptuales de CAS repasan planificación; no evalúan las experiencias ni certifican resultados CAS. Los campos del organizador se completan con trabajo real.

## Archivos principales

| Archivos | Cambio |
| --- | --- |
| web/deep-history-math.js, deep-core.js, deep-subjects.js, deep-more.js | Desarrollo de Historia, Literatura, CAS y Matemáticas |
| web/deep-extra-core.js, deep-extra-digital-history.js, deep-extra-languages-business.js | Ampliación de núcleo, Historia, Sociedad Digital, English B y Gestión |
| web/learning-engine.js | Enriquecimiento sin borrar IDs, búsqueda tolerante, validación de datos y comprobación numérica |
| web/study-workspace.js | Lectura por profundidad, temas personales, talleres, organizadores y seguimiento |
| web/coar-app.js, coar.css, index.html | Integración, navegación, estado y diseño adaptable |
| worker/index.js, scripts/build.mjs | Recursos incluidos en Worker y HTML portátil |
| scripts/test-ui.mjs, coar.test.mjs, workspace.test.mjs | Carga de nuevos recursos y comprobaciones de regresión y funciones nuevas |
| package.json, package-lock.json | Versión 0.6.0; sin activar proveedor de IA |
| README.md, LEEME-PRIMERO.md, ACTUALIZAR.md y devpost | Instalación, uso, alcance, fuentes y demostración |

Los documentos de planificación anteriores se conservan como historial. Para el alcance actual prevalece este informe y README.md.

## Validación ejecutada

`npm test`: **46/46 pruebas aprobadas**, 0 fallos, 0 omitidas. Incluye build del Worker y del HTML portátil. Se conservaron las 29 pruebas previas; tres expectativas de cantidad se actualizaron a la ampliación real (6 preguntas de Historia y 5 temas por las demás áreas), sin eliminar verificaciones. Se añadieron 17 pruebas.

Se comprobó:

- Apertura de los 48 temas antes de solicitar respuestas y sus tres profundidades de lectura.
- Conteo y estructura de 184 preguntas con retroalimentación de todas las alternativas.
- Tildes, mayúsculas, errores de escritura y búsquedas de los ejemplos solicitados.
- Tema desconocido, material personal, edición, búsqueda y eliminación confirmada.
- Ausencia de preguntas ajenas al tema, tanto en talleres como en repaso y Historia.
- Todos los talleres preparados fuera de Historia y sus ejemplos vinculados.
- Cálculos, tolerancia, coma decimal, rechazo de expresiones inválidas y pistas progresivas.
- Guardado opcional, recarga, migración v1, exportación, importación, borrado y cancelación.
- Rechazo de JSON inválido y propiedades peligrosas sin alterar los datos actuales.
- Notas escapadas y Markdown sanitizado: scripts, atributos peligrosos y enlaces inseguros.
- Agenda, temporizador, favoritos, errores, historial, ES/EN, filtros y límites NM/NS/2028.
- Recursos locales y bloqueo de peticiones a modelos, incluso con un secreto antiguo.
- DOM del HTML portátil, etiquetas, viewport y reglas responsive. Esto no constituye prueba visual.

## Pendientes y límites exactos

- No se pudo usar un navegador real: faltan comprobación visual en móvil/laptop, revisión completa de teclado/lector de pantalla y capturas reales. No se adjuntan imágenes simuladas.
- La interfaz, resúmenes, preguntas y consignas son bilingües; la traducción de las lecturas extensas al inglés sigue pendiente y tiene aviso visible.
- No hay IA generativa, búsqueda web dentro de la app, extracción de PDF ni preguntas generadas a partir de materiales personales. Los temas sin contenido conservan material aportado o un estado pendiente.
- No hay evaluación de pronunciación, corrección automática de redacciones ni calificación oficial. Las tareas abiertas usan autoevaluación.
- La práctica formal por pruebas se limita a Historia hasta 2027. Otros cursos tienen talleres preparados, no simulacros oficiales completos. Historia 2028 y algunas regiones están pendientes.
- La biblioteca es selectiva. Requiere revisión docente; no promete cubrir todo el currículo. El estudio de Cuba delimita la cobertura de sus fuentes y no simula un desarrollo completo de 1959–1965.
- Guardado local sin cifrado y sin sincronización. Una primera visita a la web necesita conexión; la copia HTML incluye el material offline.
- Guion de video preparado; video no grabado ni enviado.

No se publicó en Cloudflare, no se modificó la web pública y no se envió nada a Devpost.
