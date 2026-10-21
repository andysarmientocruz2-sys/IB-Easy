---
doc: spec
status: implemented-and-tested
version: 0.5.0
updated: 2026-10-15
---

# Especificación técnica

## Arquitectura

HTML/CSS/JavaScript sin framework. Los contenidos son datos bilingües locales. Un Cloudflare Worker sirve archivos empaquetados; no consulta proveedores de IA ni almacena trabajos.

build.mjs genera dist/worker.js y una copia HTML portátil. El Worker no contiene claves y no lee GEMINI_API_KEY. POST /api/mentor devuelve HTTP 503 school_ai_paused; orígenes ajenos reciben 403 y métodos incorrectos 405. La clave previamente configurada en Cloudflare no se elimina ni modifica.

## Archivos

| Archivo | Responsabilidad |
| --- | --- |
| web/index.html | Entrada, metadatos y orden de scripts |
| web/coar.css | Identidad COAR, componentes y reglas adaptables |
| web/coar-app.js | Navegación, estudio, ensayos, notas, tareas y estado |
| web/learning-data.js | Catálogo y ocho temas de Historia |
| web/course-data.js | Dieciséis fichas de los otros espacios |
| web/exam-data.js | Dossier, 18 consignas, instrucciones y referencias IB |
| web/chat-format.js y chat.css | Markdown sanitizado, tipografía y copia |
| worker/index.js | Rutas estáticas y endpoint de IA pausado |
| scripts/build.mjs | Empaquetado y HTML portátil |
| scripts/preview.mjs | Servidor de prueba solo en 127.0.0.1:4173 |
| scripts/*.test.mjs | Verificaciones automatizadas |
| licenses/ | Licencias de las bibliotecas distribuidas |

No se distribuyen los antiguos web/app.js y web/style.css: las rutas públicas /app.js y /style.css corresponden a coar-app.js y coar.css. No se necesitan archivos de secretos locales.

## Dependencias

Node.js 24 o posterior. marked 18.1.1, DOMPurify 3.4.17, jsdom 30.1.2 para pruebas. package-lock.json fija instalaciones. Wrangler 4 se ejecuta mediante npx para login y despliegue.

Las bibliotecas del navegador se incluyen en el paquete; no requieren CDN. CSP limita scripts al mismo origen y bloquea conexiones remotas desde la página. El HTML portátil incrusta los recursos y no hereda los encabezados HTTP del Worker.

## Datos

Clave local: ib-easy-coar-v1. Estado versionado con idioma, curso, nivel, año, región, respuestas por topicId:index, notas, borradores por questionId, revisiones manuales, lecturas, favoritos, errores, tareas y sesiones terminadas.

Persistencia desactivada inicialmente. Solo se rehidratan datos con version 1 y persist true; JSON inválido vuelve al inicio. Se validan estructuras y enumeraciones principales, no constituye un formato público de importación. Se captura un fallo de almacenamiento y se recomienda exportar.

El temporizador se basa en Date.now para corregir retrasos de intervalos; su ejecución no sobrevive a una recarga. La exportación JSON es una copia legible, sin importador. El origen web, localhost y un archivo local usan almacenamientos diferentes.

## Seguridad y comportamiento académico

- No claves en navegador, ZIP, HTML portátil ni bundle.
- Markdown con lista de etiquetas/atributos permitidos y enlaces HTTP(S) absolutos. Sin scripts, imágenes remotas o atributos de eventos.
- Notas y tareas se escapan al volver a dibujar la interfaz.
- La información de fuentes del dossier identifica su origen didáctico real.
- Sin nota automática, exámenes copiados, testimonios históricos inventados ni supuesta integración de guías privadas.
- Herramientas locales sin telemetría de aplicación ni cuentas.

## Verificación y límites

29 pruebas automatizadas aprobadas, incluido DOM del HTML portátil, los nueve espacios ES/EN, relevancia por tema, reintentos, controles de año/nivel/región, escritura, almacenamiento, agenda, temporizador, Markdown y ausencia de llamadas a IA.

No se hizo revisión visual en navegador real. DOM no comprueba alineación ni desbordamientos. No se desplegó en la cuenta Cloudflare del usuario ni se ejecutó Gemini. El contenido requiere validación docente antes de tratarlo como preparación exhaustiva.
