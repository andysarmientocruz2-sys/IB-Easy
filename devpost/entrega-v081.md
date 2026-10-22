# Entrega local · IB Easy 0.8.1

Fecha: 21 de octubre de 2026. Esta actualización no se publicó en Cloudflare ni se envió a Devpost.

## Mejora implementada

La pantalla inicial incorpora «Empieza aquí» con tres recorridos accesibles: abrir una lección real de Biología, enfocar la búsqueda general y saltar a las tarjetas de asignaturas. La demostración reutiliza la lección `biology-cells`; no carga datos inventados, no responde preguntas, no marca la lección como revisada y no inicia una sesión.

El bloque se adapta a escritorio, tableta y móvil. Los textos están disponibles en español e inglés y los controles pueden enfocarse con teclado.

## Archivos actualizados

- `web/learning-studio.js`: guía inicial y acciones de navegación.
- `web/coar.css`: presentación responsive del nuevo bloque.
- `scripts/studio.test.mjs`: prueba del recorrido y de la separación entre apertura, revisión y dominio.
- `package.json` y `package-lock.json`: versión 0.8.1.
- `README.md`, `LEEME-PRIMERO.md`, `ACTUALIZAR.md` y `devpost/guion-demo.md`: instrucciones actuales.
- `dist/worker.js` y `dist/IB-Easy-COAR.html`: artefactos regenerados.

## Verificación

La suite completa aprobó 74 de 74 pruebas, sin fallos ni pruebas omitidas. La prueba nueva comprueba las tres rutas, el enfoque por teclado, la apertura de la lección correcta y la ausencia de progreso ficticio.

La revisión visual automatizada adicional no pudo ejecutarse porque el entorno no incluye el navegador binario de Playwright y el navegador remoto no puede acceder al servidor local. Permanecen válidas las comprobaciones DOM y responsive de la suite. Conviene revisar la versión final en Chrome de escritorio y en un celular físico antes de grabar el video.

Gemini continúa pausado y las funciones básicas siguen funcionando sin API. Cloudflare y Devpost no fueron modificados.
