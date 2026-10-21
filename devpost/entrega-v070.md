# Entrega local · IB Easy 0.7.0

La versión amplía la base 0.6.0: 16 áreas, 83 temas y 289 preguntas. Se conservaron 48 temas y 184 preguntas anteriores; se añadieron 35 temas y 105 preguntas. Historia mantiene 8 temas y cada otra área tiene 5. La biblioteca es inicial y no cubre todo el programa.

## Funciones implementadas

- Campo visible de tema libre y ejemplo propio en cada área, también en sus pestañas de práctica, repaso, cuaderno, ayuda y fuentes. Acceso Estudiar otro tema desde cada tarjeta del inicio.
- Exploradores y borradores de materiales independientes por área; búsqueda local con normalización, coincidencias parciales y tolerancia a errores pequeños. Mantiene idioma, nivel y dificultad al guardar un tema personal. Las coincidencias conservan su título real y se avisa cuando falta contenido.
- Inicio agrupado en seis familias. Último tema por área, continuar, porcentaje revisado, aciertos sobre preguntas disponibles y preguntas pendientes.
- Biología, Química, Física, CDES, SAS, Música y Artes Visuales: cinco temas cada una con tres profundidades, objetivos, conocimientos previos, secciones, ejemplos, glosarios, errores, fuentes y actividad propia.
- Fichas de investigación por tema para Ciencias; diarios y registro de portafolio para Artes. Se almacenan en borradores y se incluyen en JSON. Son campos personales: no fabrican experiencias ni producen una evaluación automática.
- Diez talleres numéricos nuevos en Química y Física, con pistas, unidades solicitadas y tolerancias. No convierten automáticamente unidades ni corrigen todo el razonamiento.
- Cuatro diagramas didácticos originales en SVG, con descripciones textuales. Ninguna imagen externa ni audio protegido añadido.
- Aperturas, secciones revisadas, temas marcados y respuestas se registran por separado. La autoevaluación de tarjetas permite programar un repaso sin cambiar los aciertos.
- Repaso programado por intervalos de 1, 3, 7, 14 y 30 días; fallar devuelve a mañana. Los vencidos aparecen en Mi progreso.
- Compatibilidad con datos v0.5 y v0.6, clave ib-easy-coar-v1, version 1 y schemaVersion 3. Nuevos mapas validados para aperturas, secciones, últimos temas, exploradores y fechas de repaso. Se conservan IDs e índices anteriores.

## Pruebas

`npm test` ejecutado tras integrar todo: 60 pruebas, 60 aprobadas, 0 fallidas, 0 omitidas. Se conservaron las 46 pruebas anteriores y se añadieron 14. Se actualizaron únicamente expectativas de catálogo, número de áreas y versión de esquema; no se eliminaron comprobaciones.

Se comprobaron las 83 lecciones y sus profundidades; los 16 apartados de tema libre en ES/EN y todas sus pestañas; ausencia de práctica ajena a temas personalizados; búsquedas de las nuevas áreas; filtros; guardado opcional y recarga; importación/exportación; migración anterior; entradas maliciosas; dibujos accesibles; cálculo y unidades; diarios; repaso programado; correspondencia entre fuentes JS y recursos empaquetados; HTML sin dependencias remotas y ejecución real de sus scripts en JSDOM.

Además se revisó Chrome real de escritorio: inicio con 16 áreas y 83 temas, Biología y su buscador sin tildes/en mayúsculas, apertura de explicación sin preguntas, un cálculo de Física con coma decimal y Artes Visuales. Se observó ausencia de desbordamiento horizontal en las pantallas revisadas. En un iframe de 390 × 844 px se comprobó el inicio y el apartado de Biología; no es una prueba en dispositivo físico. Capturas reales adjuntas.

La revisión visual detectó una interacción de la inserción de recarga del servidor de prueba con cadenas HTML de DOMPurify dentro del documento portátil. El empaquetado ahora escapa las secuencias HTML sensibles de los literales; se añadió una prueba de ejecución y ausencia de código visible. La fuente del Worker conserva sus archivos originales.

## Archivos

Nuevos: web/area-data.js; web/area-tools.js; web/deep-sciences-bio-cdes.js; web/deep-sciences-chem-physics.js; web/deep-environment-arts.js; scripts/areas.test.mjs; devpost/catalogo-v070.json; devpost/capturas/; este informe.

Modificados: web/coar-app.js; web/study-workspace.js; web/learning-engine.js; web/coar.css; web/index.html; worker/index.js; scripts/build.mjs; scripts/test-ui.mjs; scripts/coar.test.mjs; scripts/workspace.test.mjs; package.json; package-lock.json; README.md; LEEME-PRIMERO.md; ACTUALIZAR.md; devpost/fuentes.md; devpost/guion-demo.md. Regenerados: dist/worker.js y dist/IB-Easy-COAR.html. El informe v0.6 y los documentos antiguos se conservan como historial.

## Límites y pendientes

- Traducción al inglés de explicaciones largas, glosarios y conocimientos previos pendiente, con aviso visible. Resúmenes, preguntas y consignas sí son bilingües.
- No hay generación IA ni búsqueda web dentro de la aplicación. Los temas libres se apoyan en catálogo y materiales TXT/texto propios. No hay extracción de PDF ni generación automática de tarjetas desde esos materiales.
- No se procesa audio, se analiza una obra subida ni se corrige automáticamente un ensayo. Las actividades abiertas usan autoevaluación.
- NM/NS conserva preferencias, pero no representa dos programas completos. La práctica específica de Historia 2028 y las simulaciones formales de examen de otras áreas siguen pendientes.
- Lectura revisada y aciertos son indicadores limitados; no certifican dominio general. CAS no se convierte en examen oficial ni su registro acredita finalización.
- Auditoría completa con lector de pantalla, todos los navegadores, dispositivos físicos y revisión pedagógica docente pendientes. Las referencias científicas no convierten los datos hipotéticos en experimentos reales.
- Guardado local sin cifrado ni sincronización; es opcional. Exportar/importar traslada datos entre orígenes. No se añadieron claves ni llamadas a modelos.
- Video de Devpost: guion preparado, sin grabación ni envío. Cloudflare y la versión pública no se modificaron.
