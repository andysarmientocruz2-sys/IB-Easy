---
doc: prd
status: draft
---

# IB Easy — Requisitos del producto

Aplicación bilingüe de acompañamiento académico para estudiantes adultos (18+) en los nueve cursos y áreas solicitados: Literatura, Matemáticas, English B, Gestión Empresarial, Sociedad Digital, Historia, CAS, TdC y Monografía. Todos tendrán funciones reales en la primera entrega; Historia es solo un caso de demostración.

## Procedencia de las decisiones

Fuente: scope.md > The Unique Kernel, The Core Loop y The POC Boundary.
El usuario eligió el nombre IB Easy, español e inglés, el estilo azul, la navegación por cursos y niveles y un mentor que ofrezca ideas y orientación. Solicitó un catálogo de exámenes anteriores y preparación por tema o ronda general. El 13 de octubre delegó al asistente las preguntas restantes. Las decisiones indicadas como propuestas son recomendaciones del asistente, no preferencias personales atribuidas al usuario.

## Respuestas a las 17 preguntas

1. **Nombre (confirmado):** IB Easy.
2. **Público (actualizado):** personas de 18 años o más que cursan o preparan el IB. El uso del chat con Gemini requiere confirmación 18+ y una cuenta administradora adulta; la prueba de la integración corresponde al administrador adulto.
3. **Inicio (propuesta):** título, explicación breve, selector Español/English y tarjetas de Literatura, Matemáticas, English B, Gestión Empresarial, Sociedad Digital, Historia, CAS, TdC y Monografía. Todos los módulos disponibles; no se presentarán los demás cursos como próximos.
4. **Guías (confirmación parcial):** el usuario dispone de las guías usadas este año en su colegio. Todavía no han sido adjuntadas ni revisadas. Antes de orientar sobre evaluaciones se comprobarán asignatura, edición y convocatoria aplicable; tener una guía este año no determina automáticamente su año de evaluación.
5. **Materiales de exámenes (pendiente de recursos):** disponer de guías no confirma disponer de exámenes. Catálogo inicialmente vacío; añadir únicamente recursos y enlaces autorizados y comprobados. No inventar archivos ni enlaces.
6. **Uso del catálogo (propuesta):** consultar y abrir recursos; descargar solo cuando la fuente lo permita. Resolver un examen completo dentro de la app queda para después.
7. **Preparación (propuesta):** elegir tema específico o ronda general; ofrecer resumen breve opcional antes de comenzar. La ronda general se limita a los temas del curso configurados, y no se presenta como cobertura de todo el currículo.
8. **Preguntas (propuesta):** ejercicios adaptados a la asignatura: procedimientos matemáticos, análisis literario, práctica escrita de inglés, casos empresariales, impactos digitales y argumentos históricos. Para CAS, TdC y Monografía, cinco pasos de orientación en vez de un examen. Son preguntas originales de práctica, claramente diferenciadas de exámenes anteriores. Ensayos completos y alternativas se dejan para después.
9. **Cantidad (propuesta):** ronda de cinco preguntas, una por vez. La cantidad configurable queda para después.
10. **Corrección (propuesta):** retroalimentación inmediata y resumen al terminar. El modo con corrección solo al final queda para una versión posterior.
11. **Retroalimentación (propuesta):** indicar un acierto, una mejora concreta y una pista; permitir reintentar antes de continuar. No entregar notas oficiales ni resultados de aprendizaje supuestamente medidos.
12. **Tiempo (propuesta):** sin límite en la primera versión. Simulacros cronometrados posteriores.
13. **Idioma (confirmado y desarrollado):** interfaz y tutor en español o inglés. El catálogo tiene filtro propio por idioma del documento. Cambiar el idioma no modifica mensajes anteriores ni traduce automáticamente los exámenes originales.
14. **Tutor (propuesta coherente con lo solicitado):** ante desconocimiento, explicar brevemente con un ejemplo; ante una tarea, identificar la consigna, sugerir caminos y preguntar por la postura del estudiante. Revisar después su intento y orientar el siguiente paso.
15. **Continuidad (propuesta):** mantener la conversación y la ronda al navegar dentro de la sesión abierta. Avisar que al recargar o cerrar no se conservarán; ofrecer copiar el texto. Cuentas, sincronización e historial persistente posteriores.
16. **Gemini (elección previa; acceso pendiente):** proveedor previsto por el usuario. No se ha confirmado disponibilidad de credenciales, servicio o modelo. No solicitar claves en el chat. Configuración y validación corresponden al plan técnico.
17. **Prioridad (propuesta):** primero navegación y mentores para todos los cursos; segundo práctica adaptada en todos; tercero catálogos con filtros y recursos disponibles. El orden técnico no restringe el alcance final a Historia.

## The Core Journey

1. Abrir IB Easy y elegir idioma.
2. Elegir cualquier curso e indicar NM o NS donde corresponda. CAS, TdC y Monografía no muestran ese selector; Monografía permite indicar su asignatura.
3. En asignaturas, entrar a Estudio y tareas, Preparación de exámenes o Exámenes anteriores. En CAS, TdC y Monografía, acceder a mentor, preparación del trabajo y recursos adaptados.
4. En el chat, escribir una duda o consigna. Recibir orientación y responder al mentor para desarrollar una idea propia.
5. En preparación, escribir un tema o escoger ronda general; contestar cinco preguntas y recibir comentarios y un resumen de repaso.
6. Volver al curso o cambiar de apartado sin perder la sesión actual.

## Screens and Layout

- **Inicio:** tarjetas de cursos y selector de idioma en cabecera; adaptable a celular y laptop.
- **Cada curso:** elección de nivel cuando corresponde y tres tarjetas de acceso. Curso, idioma y nivel aplicable permanecen visibles. CAS, TdC y Monografía adaptan las etiquetas a su trabajo.
- **Estudio y tareas:** conversación central amplia, mensajes diferenciados, caja de texto y botón Enviar. Acceso a volver y nueva conversación.
- **Preparación:** selección de tema/general, resumen opcional, pregunta actual, respuesta, revisión y botón Continuar. Indicador 1/5 y resumen final.
- **Exámenes anteriores:** filtros por año, idioma y nivel; cada recurso identifica título, año, nivel, idioma y fuente. Solo se muestra una prueba o convocatoria específica si está verificada en sus metadatos.

## Look and Feel

Dirección del usuario: azul inspirado en los colores del IB y acabado cuidado. Propuesta: fondo blanco, azul profundo en cabecera, azul claro en superficies secundarias, tipografía sans serif legible y espacio suficiente entre controles. Identidad propia, sin logo oficial ni apariencia de afiliación. Estados de selección, foco y error visibles, con texto además del color.

## Features and Behavior

### Mentores por curso

Fuente: scope.md > The Unique Kernel y The Core Loop.
El tutor usa el curso, nivel, idioma y contexto de la conversación. Explica, propone ideas, pide evidencia y ayuda a relacionarla con argumentos. Se adapta al intento del estudiante y no fuerza preguntas cuando primero hace falta explicar. No inventa citas, fuentes, criterios o páginas. Las recomendaciones atribuidas a una guía deben apoyarse en el material incorporado y señalar su procedencia; si falta información, lo indica. La guía se incorpora como recurso de referencia, no se promete que el modelo la conoce íntegramente por defecto.

### Preparación de exámenes

Ampliación solicitada después del alcance inicial: práctica breve, no simulador completo. Preguntas originales basadas en los temas configurados. Tema vacío bloquea el inicio en modo específico. Si el tema no se puede atender con el material disponible, se informa y permite cambiarlo. Una ronda mantiene sus cinco preguntas y el progreso al alternar apartados. Reintentar no cuenta como una pregunta nueva. El resumen recoge fortalezas y temas que conviene repasar apoyándose en respuestas reales.

### Catálogo

Ampliación solicitada después del alcance inicial. Un catálogo vacío sigue siendo utilizable: muestra los filtros y explica que aún no hay recursos. No presenta ejemplos como documentos disponibles. La disponibilidad de exámenes reales es una dependencia independiente de disponer de guías.

## States and Boundaries

- **Primera visita:** sin cuenta; todos los cursos accesibles. Selección de nivel solo donde corresponde.
- **Cambio de curso:** conservar sesiones separadas mientras esté abierta la app; no mezclar mensajes, guías o preguntas entre asignaturas.
- **Chat vacío:** instrucción breve y ejemplo propio del curso. Segunda Guerra Mundial se usa solo en Historia.
- **Envío:** impedir mensajes vacíos y doble envío; mostrar respuesta en preparación.
- **Error de conexión o servicio:** mensaje comprensible y Reintentar, conservando el texto. Nunca sustituir un fallo de Gemini por una respuesta fingida.
- **Material faltante:** reconocer la limitación y distinguir orientación general de recomendaciones verificadas con guía.
- **Catálogo sin coincidencias:** explicar que no se encontraron recursos y permitir limpiar filtros.
- **Cambio de idioma:** cambia controles y nuevas respuestas, preservando el contenido previo.
- **Cambio de nivel:** informar que inicia una sesión de aprendizaje nueva y pedir confirmación si hay trabajo en curso.
- **Nueva conversación o ronda:** confirmar antes de descartar trabajo activo.
- **Cierre o recarga:** la primera versión no garantiza recuperación; aviso visible y acción para copiar la conversación o resumen.

## Acceptance Criteria

- [ ] La interfaz puede recorrerse en español e inglés sin mezcla accidental de controles.
- [ ] Las seis asignaturas permiten elegir NM/NS y acceder a mentor, preparación y catálogo; ninguna queda como simple tarjeta sin funcionamiento.
- [ ] CAS, TdC y Monografía ofrecen los tres espacios adaptados, sin selector NM/NS ni exámenes inexistentes.
- [ ] Cambiar de curso cambia las orientaciones, guías y preguntas y conserva separadas las sesiones.
- [ ] Se verifica al menos una conversación y una práctica u orientación completa en cada uno de los nueve módulos.
- [ ] Una pregunta sobre la Segunda Guerra Mundial recibe orientación; una segunda intervención obtiene comentarios relacionados con el intento del alumno.
- [ ] Las afirmaciones sobre criterios de evaluación se comprueban contra la guía incorporada; su ausencia se comunica.
- [ ] La práctica por tema y la ronda general permiten completar cinco preguntas, reintentar y consultar el resumen final.
- [ ] Las preguntas de práctica no aparecen identificadas como preguntas oficiales de convocatorias pasadas.
- [ ] El catálogo filtra recursos reales cuando existen y muestra un estado vacío honesto cuando no.
- [ ] Un fallo de Gemini conserva el mensaje y permite reintentar sin duplicarlo.
- [ ] La navegación y escritura funcionan en celular y laptop, también mediante teclado.

## What We're Building

Todos los cursos y áreas solicitados con idioma ES/EN, contexto propio, mentor guiado, preparación y recursos verificables. NM/NS y catálogo de exámenes solo donde corresponden. Esta corrección del usuario sustituye expresamente el límite previo a Historia; requiere probar cada módulo y no tiene una promesa de finalización en una sola tarde.

## Deferred From the POC

Cuentas; historial persistente; sincronización; carga de archivos por estudiantes; ensayos cronometrados; corrección de exámenes completos; elección de longitud de ronda; voz; panel docente. Mantener un conjunto común de funciones con adaptación por asignatura; las herramientas avanzadas específicas se agregan después.

## Non-Goals

Calificaciones oficiales, afiliación al IB, promesas de banda 7, exámenes inventados presentados como originales o redacción automática de trabajos listos para entregar.

## Open Questions and Dependencies

No hace falta otra entrevista extensa para revisar este borrador. Antes de validar contenido académico: recibir y revisar las guías de cada curso y área, confirmando denominación exacta, modalidad y convocatoria, especialmente Literatura y Matemáticas. Antes de pruebas reales con IA: comprobar el acceso a Gemini. Antes de llenar el catálogo: recibir o localizar recursos autorizados. El diseño y los estados vacíos pueden desarrollarse antes; no equivalen a una integración académica validada.

## Adaptación de los nueve módulos

| Curso o área | Mentor | Preparación | Archivo o recursos |
|---|---|---|---|
| Literatura | Interpretación y argumentos apoyados en el texto aportado | Análisis de fragmentos y planificación de respuestas | Exámenes y materiales verificados |
| Matemáticas | Explicación y revisión de procedimientos | Problemas con retroalimentación sobre pasos | Exámenes por modalidad y nivel verificados |
| English B | Comprensión, escritura y conversación por texto | Preguntas y tareas de lenguaje; práctica en inglés con explicación opcional en español | Exámenes y recursos disponibles por idioma |
| Gestión Empresarial | Conceptos, herramientas y cálculos | Casos y preguntas de aplicación | Exámenes verificados |
| Sociedad Digital | Análisis de tecnología, personas e impactos | Casos y argumentos | Exámenes verificados |
| Historia | Evidencias, perspectivas y argumentos | Temas concretos o ronda general | Exámenes verificados |
| CAS | Planificación y reflexión sobre experiencias reales | Preguntas para preparar o revisar una experiencia | Guías y plantillas; no banco de exámenes |
| TdC | Preguntas de conocimiento, argumentos y objetos | Orientación de exposición y ensayo | Guías y recursos autorizados; no exámenes ficticios |
| Monografía | Delimitación de pregunta, investigación y estructura | Revisión guiada de avances | Guías y recursos autorizados; no exámenes ficticios |

Las sesiones CAS no inventan experiencias o evidencias. Matemáticas no asume una modalidad hasta comprobarla. English B distingue idioma de explicación e idioma de la actividad. Los ejemplos del catálogo no se inventan para aparentar contenido disponible.
