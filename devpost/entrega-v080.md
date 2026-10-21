# Entrega local · IB Easy 0.8.0

Fecha: 21 de octubre de 2026. No se publicó en Cloudflare ni se envió nada a Devpost.

## Implementado

Rutas de estudio de cuatro pasos con reflexión y reanudación; buscador global y filtros por grupo; recomendaciones con motivo explícito basado en respuestas y fechas; lector con índice, tamaño de texto, modo lectura y salida Escape; vocabulario consultable; descarga TXT de lección, referencias, notas y tarjetas propias. Tarjetas redactadas por el estudiante con área, tema, fuente, edición, eliminación confirmada y repaso programado; operativas también para temas personalizados. Historial de rutas y tarjetas vencidas en Mi progreso.

Se mantienen 16 áreas, 83 temas y 289 preguntas preparadas. No se añadió contenido al catálogo. Tarjetas personales adicionales: hasta 500; no se incluyen en esa cifra ni son material verificado. Hasta 200 rutas completadas. El tiempo es planificado, no tiempo efectivo medido. La ruta no acredita dominio ni marca automáticamente un tema como leído.

## Archivos modificados

- Nuevo web/learning-studio.js: herramientas y validación de registros nuevos.
- Nuevo scripts/studio.test.mjs: 13 pruebas de comportamiento, datos y regresión.
- web/coar-app.js, web/study-workspace.js, web/learning-engine.js: estado compatible, integración, eliminación de registros vinculados e identificadores locales.
- web/coar.css: diseño de las herramientas, lector y tamaños responsive.
- web/index.html, worker/index.js, scripts/build.mjs, scripts/test-ui.mjs: nuevo recurso y HTML portátil.
- scripts/areas.test.mjs y scripts/workspace.test.mjs: expectativa de esquema 4. Las comprobaciones anteriores se conservan.
- package.json, package-lock.json: versión 0.8.0; dependencias iguales.
- README.md, LEEME-PRIMERO.md, ACTUALIZAR.md, devpost/guion-demo.md y este informe.
- dist/worker.js y dist/IB-Easy-COAR.html: artefactos generados.

## Datos y pruebas

Misma clave ib-easy-coar-v1, version 1, schemaVersion 4. Importaciones antiguas conservan notas, respuestas, tareas y demás registros válidos. Los nuevos registros incluyen validación de forma, límites, área/tema y fechas. Se rechazan claves peligrosas y los textos se escapan antes de insertarlos en HTML. El guardado continúa siendo opcional y local, sin cifrado ni sincronización.

Suite: 73 pruebas aprobadas, 0 fallidas, 0 omitidas. Incluye las 60 pruebas previas más 13 nuevas. Registro íntegro en pruebas-v080.txt. Se ejecutaron pruebas de búsqueda por área, rutas, tarjetas, preservación de datos, importaciones hostiles, lectura, idioma, exportación y funcionamiento sin crypto.randomUUID. La revisión de Chrome detectó esa incompatibilidad HTTP y se corrigió para rutas, tarjetas, tareas y temas personales usando crypto.getRandomValues.

## Límites

No se añadió IA, extracción PDF, audio, análisis de imágenes ni evaluación inteligente de trabajos abiertos. El contenido extenso sigue en español con aviso cuando se elige inglés. Se mantienen pendientes revisión docente, cobertura completa NM/NS, práctica de Historia 2028, traducciones extensas, auditoría completa de accesibilidad y pruebas en dispositivos físicos y otros navegadores. El tutor escolar sigue desactivado. Las referencias de lecciones anteriores se conservan; esta entrega no añade afirmaciones curriculares nuevas.

La validación visual de esta versión cubre Chrome de escritorio, inicio y apertura de la ruta de Biología; las capturas de la versión anterior se conservan identificadas por su informe. La entrega incluye una copia portátil y el código completo con instrucciones manuales de Cloudflare en ACTUALIZAR.md.
