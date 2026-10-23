# Entrega · IB Easy 0.8.2

Comprobación: 23 de octubre de 2026 UTC.

## Implementado

- Identidad «Proyecto estudiantil» / «Student project», sin «COAR EDITION». Conserva el público COAR y el aviso de independencia del IB, MINEDU y COAR.
- Licencia MIT para código y contenido originales; incluida también en el HTML portátil y el Worker. Avisos de bibliotecas conservados.
- Nombres accesibles y estado actual en navegación, incluido el icono de preferencias en móvil.
- «Ver asignaturas» enfoca una tarjeta visible del grupo filtrado. Los atajos respetan movimiento reducido.
- Versión v0.8.2 visible y URLs de recursos actualizadas para evitar caché antigua.
- Guion con instrucciones en español y narración en inglés, borrador Devpost, instrucciones de despliegue y capturas reales.

Se conservan **16 áreas, 83 temas y 289 preguntas**; no se amplía el catálogo ni se activa IA. No cambia el almacenamiento: `ib-easy-coar-v1`, versión 1, esquema 4.

## Pruebas

**78 pruebas: 78 aprobadas, 0 fallos, 0 canceladas, 0 omitidas, 0 pendientes.** Se conservan las 74 anteriores y se añaden cuatro: foco filtrado/movimiento reducido; identidad/navegación bilingüe accesible; conservación del trabajo al abrir la demostración; licencia completa en los dos artefactos generados.

La suite cubre áreas, lecciones y profundidades, relevancia de preguntas, búsquedas, datos antiguos, exportación/importación, entradas hostiles, cálculos, herramientas, idiomas y tutor pausado.

Comprobaciones reales en Chrome:

- Inicio, explicación de membranas antes de preguntas y diagrama.
- «MEMBRNA» encuentra membranas; «Bioluminiscencia en hongos» avisa de contenido no disponible.
- Una opción errónea genera feedback y aparece en Mi progreso. Inglés conserva el resultado.
- Modo lectura y salida mediante Escape.
- Marco responsive de 390 × 844 px: inicio, lección, campo libre y preferencias. Contenido de 375 px (descontando barra de desplazamiento), sin desbordamiento horizontal del documento en vistas comprobadas.
- «Saltar al contenido» funciona con teclado y enfoca main.
- No se observaron errores de la aplicación en los mensajes de consola inspeccionados; hubo mensajes ajenos de la extensión del navegador.

No se hizo auditoría WCAG completa, prueba en teléfono físico, Safari/Firefox, evaluación docente de todo el contenido ni ensayo de grabación. Una vista estrecha no equivale a probar un teléfono.

## Archivos

- `web/coar-app.js`, `web/learning-studio.js`, `web/index.html`: identidad, accesibilidad, enfoque y recursos.
- `scripts/studio.test.mjs`, `scripts/license.test.mjs`, `scripts/build.mjs`: pruebas y construcción.
- `LICENSE`, `package.json`, `package-lock.json`: licencia y versión.
- `README.md`, `LEEME-PRIMERO.md`, `ACTUALIZAR.md`: uso y despliegue.
- `devpost/guion-demo.md`, `devpost/para-completar.md`, este informe y `pruebas-v082.txt`.
- `devpost/capturas/v082/`: seis capturas de revisión y cuatro en inglés.
- `dist/worker.js`, `dist/IB-Easy-COAR.html`: regenerados; en el ZIP, no en el repositorio de fuentes.

## Pendiente

Cloudflare no se actualizó: Wrangler indicó ausencia de autenticación. Se conserva el destino existente, sin cuenta ni despliegue alternativos. Sigue `ACTUALIZAR.md` en tu cuenta.

No se grabó/subió video, no se editó el formulario Devpost ni se hizo el envío final. Antes de enviarlo deben resolverse elegibilidad y verificación del Skill Pack. No se marca ninguna declaración de edad.

Traducciones extensas al inglés, revisión docente, auditoría de accesibilidad y cobertura completa siguen pendientes. Gemini permanece pausado; tarjetas/rutas son autoevaluación; materiales personales no se verifican automáticamente.
