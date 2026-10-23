# IB Easy — COAR IB Companion · 0.8.2

Plataforma local para trece asignaturas y tres componentes del núcleo: 83 temas y 289 preguntas. Proyecto independiente, sin afiliación al IB, MINEDU o COAR. Material educativo original; no son exámenes oficiales ni cobertura completa del currículo.

## Probar

Extrae el ZIP y abre `dist/IB-Easy-COAR.html` con Chrome o Edge. Incluye código, estilos, contenido y bibliotecas; no necesita API ni conexión para estudiar. Las referencias externas sí necesitan internet.

Para desarrollo, instala Node.js 24 o posterior y ejecuta dentro de esta carpeta:

```sh
npm ci
npm test
npm run preview
```

Abre http://127.0.0.1:4173. Ctrl+C detiene el servidor. `npm run build` genera el Worker y el HTML portátil. No publica nada.

## Mejoras de 0.8.2

- Identidad estudiantil independiente, licencia MIT, etiquetas accesibles en navegación móvil y enfoque que respeta el filtro de áreas y la preferencia de movimiento reducido. Inicio guiado con tres acciones claras: abrir una lección real de demostración, buscar en toda la biblioteca o saltar a las asignaturas. La demostración no carga progreso ficticio ni marca dominio.

- Ruta guiada de 10, 25 o 45 minutos planificados: comprender, recordar, aplicar y reflexionar. Permite retomar y guardar hasta 200 rutas; es un registro personal, no una medición de tiempo ni de dominio.
- Buscador de toda la biblioteca y temas personales, con filtros por grupo de áreas y sugerencias que explican su motivo.
- Lector con índice navegable por teclado, tres tamaños de texto, modo lectura (Escape para salir), consulta de vocabulario y descarga TXT de la lección, fuentes, notas y tarjetas.
- Hasta 500 tarjetas propias, vinculadas al área y tema. Se pueden crear, editar, eliminar y programar después de revelar la respuesta. Funcionan también con temas personalizados. Son material del estudiante sin verificar y no alteran el dominio de las preguntas preparadas.
- Conserva los 83 temas y 289 preguntas anteriores. Esta versión mejora herramientas; no amplía el catálogo.
- Identificadores compatibles con HTTP local y el HTML portátil.

## Funciones

- Ocho temas de Historia y cinco de Matemáticas AA, English B, Literatura, Gestión, Sociedad Digital, TdC, CAS y Monografía. Se conservan temas y preguntas anteriores.
- Resumen, explicación completa y profundización; objetivos, conocimientos previos, secciones, ejemplos, vocabulario, errores frecuentes y referencias.
- Repaso del tema, explicación de cada alternativa, tarjetas, reintentos e historial.
- Matemáticas: MathML, pistas progresivas y comprobación numérica con tolerancia. Se comprueba el resultado, no automáticamente todo el razonamiento.
- English B: textos originales, escritura, vocabulario y preparación oral con autoevaluación. No procesa audio ni evalúa pronunciación.
- Literatura: recurso, evidencia y efecto; comparación, ironía, voz y textos no literarios. Los fragmentos inventados están identificados.
- Gestión y Sociedad Digital: casos originales, datos, decisiones, actores y límites. Las tareas abiertas son autoevaluación.
- TdC: argumentos, objetos, perspectivas y evidencia. CAS y Monografía: organizadores de planes, evidencias, fuentes y avances reales.
- Historia conserva práctica de Pruebas 1, 2 y 3 hasta 2027. Prueba 3 solo NS; práctica 2028 pendiente. El dossier tiene materiales didácticos originales, no documentos de época.

## Ciencias y Artes en 0.8.0

Biología, Química, Física, CDES, SAS, Música y Artes Visuales incluyen cinco temas cada una: 35 lecciones y 105 preguntas nuevas. Cada tema conserva las tres profundidades de lectura, objetivos, conocimientos previos, ejemplos, glosario, errores, fuentes y un taller propio. Los ejemplos y datos inventados se identifican como didácticos.

Ciencias incorpora fichas de investigación por tema. Química y Física incluyen diez ejercicios numéricos con pasos, tolerancia y unidad explícita. La comprobación de unidades exige la unidad solicitada; no convierte unidades automáticamente. Música y Artes Visuales añaden diarios de proceso y referencias para portafolio. No se procesa audio, no se analizan imágenes subidas ni se evalúa automáticamente una interpretación u obra.

Hay cuatro diagramas originales: membranas, movimiento circular, ritmo y composición visual. No son fotografías, fuentes históricas ni resultados experimentales.

El inicio agrupa las áreas en Lenguas, Ciencias Sociales, Matemáticas, Ciencias, Artes y núcleo. Cada tarjeta permite continuar el último tema de su área o estudiar otro.

## Temas libres

Cada una de las dieciséis áreas tiene su propio campo visible y un ejemplo específico, disponible en todas sus pestañas. Los borradores de búsqueda y materiales se conservan por área al navegar y, con guardado opcional, al recargar.

Escribe en **¿Qué quieres estudiar hoy?** o pulsa **Estudiar otro tema**. La búsqueda local tolera mayúsculas, tildes y algunos errores de escritura. Examina títulos, palabras clave y materiales personales; no busca en internet.

Muestra lecciones relacionadas con su título real. Una coincidencia no garantiza responder toda una pregunta específica. Si falta contenido, lo comunica y permite guardar un tema pendiente o aportar texto/TXT. No renombra una explicación genérica para simular una respuesta.

Los materiales personales conservan texto y procedencia declarada, sin verificación automática. Puedes editarlos, buscarlos, retomarlos o borrarlos. No se generan preguntas sobre ellos ni se sustituyen por ejercicios ajenos. Límites: 50 temas, 60 000 caracteres por material, TXT de hasta 120 KB. Sin extracción de PDF.

## Datos

Guardado persistente desactivado inicialmente. En equipos compartidos puedes usar solo la sesión y exportar antes de cerrar. Activarlo usa localStorage del navegador: no es cifrado ni sincronización entre cuentas. Evita datos sensibles.

**Preferencias y datos** permite exportar JSON, importar una copia validada de hasta 8 MB, desactivar guardado y borrar con confirmación. Importar reemplaza la sesión después de confirmarlo; exporta antes para conservar ambas. Respeta tu preferencia actual de guardado.

Se conserva la clave `ib-easy-coar-v1`, los IDs y los índices de preguntas anteriores. Los datos v0.5 y v0.6 se migran sin reiniciar notas, tareas, favoritos o respuestas. HTML local, localhost y web pública usan almacenes separados: exporta e importa para trasladar trabajo.

El seguimiento distingue última apertura, secciones revisadas mediante casillas, tema marcado como revisado y aciertos en preguntas. El porcentaje de «dominio demostrado» se limita a las respuestas actuales de estas preguntas; no demuestra transferencia a problemas nuevos.

Las tarjetas permiten programar repasos por autoevaluación: repetir mañana o espaciar según 1, 3, 7, 14 y 30 días. Las fechas vencidas aparecen en Mi progreso. Esta autoevaluación no modifica las respuestas calificadas.

Abrir una lección registra actividad, pero no la marca revisada ni demuestra dominio. El porcentaje de lectura cambia al marcarla expresamente. Aciertos y sesiones no son notas oficiales. Las recomendaciones se basan en errores registrados y la ausencia de historial se indica.

## Alcance y pendientes

Interfaz, resúmenes, preguntas y consignas ES/EN. Las explicaciones extensas nuevas están en español con aviso de traducción pendiente al elegir inglés. No se anuncia cobertura completa del programa.

NM/NS no transforma las lecciones fundamentales en dos currículos diferentes. Sí limita Prueba 3 de Historia; la convocatoria limita su práctica. Confirma opciones y requisitos con tu docente.

No hay solicitudes a Gemini u otro modelo. El endpoint de tutor permanece desactivado incluso con un secreto antiguo. No hace falta clave. Una integración escolar futura requiere revisión de condiciones, privacidad y adecuación; no está implementada.

Las referencias de contexto no respaldan cada detalle de un caso ficticio. La revisión docente y una auditoría completa de accesibilidad siguen pendientes. Se revisaron pantallas reales en Chrome de escritorio y un marco de 390 × 844 px; consulta el informe de entrega. El HTML portátil funciona offline; una primera visita a la web o enlaces externos requieren conexión.

## Documentación

- `LEEME-PRIMERO.md`: recorrido rápido.
- `ACTUALIZAR.md`: publicar en Cloudflare únicamente cuando lo decidas.
- `devpost/entrega-v082.md`: cambios, pruebas y límites.
- `devpost/fuentes.md`: referencias.
- `devpost/guion-demo.md`: guion bilingüe para grabar; las capturas reales están en `devpost/capturas/v082/`.

Esta entrega actualiza el código y el HTML portátil. Cloudflare requiere autenticación y no se ha actualizado desde este entorno. No se ha enviado nada a Devpost.

## English quick start

IB Easy 0.8.2 is an independent study companion for IB and COAR students. It contains 16 areas, 83 prepared topics and 289 multiple-choice questions, plus learner-authored topics and flashcards. It is not affiliated with the IB, MINEDU or COAR and does not cover the full curriculum.

Requirements: Node.js 24 or later. Clone this repository, then run:

```sh
npm ci
npm test
npm run preview
```

Open http://127.0.0.1:4173. The build generates `dist/IB-Easy-COAR.html`, a self-contained file you can open without a server. No model API is needed. To test: choose Biology, open the membrane lesson, study its explanation, answer its questions, and inspect the progress page. Each subject also has its own free-topic input. Unknown topics show an honest limitation and accept your own text materials.

The interface, summaries and prepared questions support Spanish and English. Extended explanations remain in Spanish with a translation notice. Guided study routes and personal flashcards are self-reported activities, not official grades. Optional browser storage, JSON export/import and deletion are available in Settings. The hosted website and local files use separate storage origins.

The last full test run passed 78/78 tests. Cloudflare deployment requires your own authenticated account; see `ACTUALIZAR.md`. Publishing this source repository does not deploy the Worker. The Gemini/model tutor remains disabled.

Planning documents are in `devpost/scope.md`, `devpost/prd.md` and `devpost/spec.md`. They document an earlier phase; `devpost/entrega-v082.md` describes the current implementation. Development used AI assistance. No claim is made here that the Devpost Learn Skill Pack was run; that history must be confirmed separately.

Third-party library notices are retained in `licenses/`. Original project code and original educational content are available under the MIT license in `LICENSE`. Linked third-party materials remain subject to their respective licenses.
