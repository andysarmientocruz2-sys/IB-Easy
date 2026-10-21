---
doc: spec
status: draft
---

# IB Easy — Especificación y primera entrega de diseño

## How This Works, In Plain Language

El navegador dibuja tus cursos y recuerda tus borradores mientras la página sigue abierta. Entras a una asignatura, eliges el nivel y cambias entre estudio, práctica y archivo. Monografía tiene su propio espacio, sin NM/NS. El chat llama a un servidor del mismo Site; ese servidor conserva la clave fuera del navegador, añade instrucciones por curso y consulta Gemini. La integración se limita a personas de 18 años o más.

El usuario pidió empezar a diseñar la app y delegó las decisiones pendientes. Esta entrega visual no significa que el núcleo con IA esté terminado ni que la especificación completa haya sido aprobada.

## The Core Journey Through the System

Implementa `prd.md > The Core Journey` y `Screens and Layout`.

1. El inicio muestra seis asignaturas y tres áreas del núcleo.
2. Elegir una tarjeta cambia el curso activo. Seleccionar NM/NS habilita sus apartados; CAS, TdC y Monografía acceden directamente.
3. Estudio permite escribir una consigna o seleccionar una sugerencia; el envío indica que falta conectar Gemini y conserva el texto.
4. Preparación permite elegir modo específico o general. El prototipo usa un banco fijo por curso, identificado como ejemplo, no adapta las preguntas al tema escrito ni al nivel.
5. Responder, revisar personalmente y continuar conduce a un resumen de cinco respuestas. Se puede copiar al portapapeles.
6. El archivo muestra filtros y un estado vacío: todavía no se han incorporado exámenes.

## Stack

- HTML, CSS y JavaScript del navegador, sin dependencias JavaScript. Aprovecha la familiaridad reportada con HTML/CSS y facilita revisar la interfaz.
- Worker ESM en Sites para servir la página y atender `POST /api/mentor` sin exponer la clave.
- Documentación: https://developer.mozilla.org/es/docs/Web/HTML , https://developer.mozilla.org/es/docs/Web/CSS , https://developer.mozilla.org/es/docs/Web/JavaScript .
- Sites conserva el código fuente y publica la vista con acceso privado.
- DM Sans y Manrope mediante Google Fonts, con alternativas sans-serif si la fuente no carga.
- Gemini es el proveedor elegido. Modelo predeterminado: `gemini-3.5-flash-lite`, configurable con `GEMINI_MODEL`. Endpoint REST: `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`, autenticado en el servidor mediante `x-goog-api-key`. Documentación: https://ai.google.dev/gemini-api/docs .

## Where It Runs and How Someone Tries It

Vista privada publicada en Sites. El administrador adulto debe configurar `GEMINI_API_KEY` como secreto del alojamiento y volver a desplegar para activar el chat.

Para Devpost siguen pendientes la app con su mentor funcional, el repositorio público y la grabación de 1–3 minutos. La vista publicada no reemplaza ninguno de esos requisitos.

## Look and Feel

Implementa `prd.md > Look and Feel`: blanco y azul #1559d5, fondo #f6f8fc, texto azul oscuro, tarjetas con acentos suaves por curso. Barra lateral en laptop; iconos compactos en tablet; cabecera simplificada en celular. Tipografía legible, foco de teclado visible, mensajes de estado con texto. Identidad propia; sin logo del IB.

## Components

### Inicio y navegación
Implementa `prd.md > Screens and Layout`. Tarjetas, buscador y sidebar comparten el catálogo de nueve módulos. Todos tienen vistas navegables.

### Contexto del curso
Implementa `prd.md > States and Boundaries`. Nivel, tema, borrador y ronda viven por separado en cada curso. Cambiar de nivel pide confirmar antes de eliminar trabajo. Monografía incluye asignatura editable.

### Mentor
Implementa `prd.md > Mentores por curso`. Sugerencias específicas, historial por curso, editor y estados de carga/error. El navegador envía mensaje, historial reciente, curso, nivel e idioma a `/api/mentor`. El servidor valida los datos, añade instrucciones académicas por curso y devuelve el texto de Gemini. La clave nunca se inserta en el navegador. Las guías todavía no se envían como contexto; el mentor debe reconocer esa limitación.

### Práctica
Implementa el recorrido visual de `prd.md > Preparación de exámenes`. Banco fijo de cinco preguntas originales por módulo. No evalúa, puntúa ni genera retroalimentación. Su revisión personal se etiqueta como tal. La integración debe reemplazar el banco de ejemplo por generación basada en tema, nivel y materiales, conservando el recorrido.

### Catálogo
Implementa `prd.md > Catálogo`. Sin recursos añadidos: filtros visibles y explicación de la diferencia entre guía y examen. Recursos de CAS/TdC/Monografía adaptados, sin exámenes ficticios.

## Data Model

- `courses`: nueve registros, nombres ES/EN, iconos, ejemplos y tipo de módulo.
- `dict`: textos de interfaz por idioma.
- `states[courseId]`: nivel, borrador, asignatura de Monografía, modo, tema, filtros y ronda.
- `round`: preguntas, respuestas, índice, revisión personal, finalización y tema anotado. Las preguntas mantienen el idioma con que se inició la ronda; cambiar la interfaz no traduce respuestas previas.
- Todo en memoria del navegador. Navegar conserva; recargar o cerrar borra. No hay cuentas, base de datos ni almacenamiento de trabajos.

## File Structure

| Archivo | Responsabilidad |
|---|---|
| web/index.html | Entrada y metadatos |
| web/style.css y web/chat.css | Diseño adaptable y conversación |
| web/app.js | Catálogo, idiomas, pantallas e interacciones |
| worker/index.js | Archivos estáticos, validación y proxy seguro a Gemini |
| scripts/build.mjs | Empaqueta la interfaz dentro del Worker |
| devpost/scope.md | Alcance previamente acordado |
| devpost/prd.md | Producto completo, distinto de este prototipo |
| devpost/spec.md | Diseño técnico y dependencias pendientes |
| devpost/checklist.md | Progreso verificable |
| README.md | Cómo abrir y límites actuales |

## Important Failure Modes

- Sin secreto de Gemini: respuesta `not_configured`; la interfaz conserva el borrador, sin respuesta falsa.
- Fallo, límite o bloqueo de Gemini: mensaje comprensible, sin revelar la clave ni la respuesta interna del proveedor.
- Tema o respuesta vacíos: bloquear el avance y explicar el dato faltante.
- Portapapeles no disponible: pedir copiar manualmente el resumen.
- Sin recursos: estado vacío, sin archivos inventados.

## Decisions and Open Issues

Se conserva español/inglés, diseño azul, nueve módulos, NM/NS donde corresponde y Monografía aparte. El público del chat se actualizó a personas de 18 años o más; el hermano adulto del usuario administra la cuenta de Gemini. La elección de un Worker pequeño evita exponer la clave y conserva la interfaz existente.

Incertidumbre planteada por el usuario: cómo conseguir que la IA use la guía del curso. Tener los documentos no basta: la próxima entrega deberá seleccionar referencias del curso y enviarlas como contexto, y comprobar que las recomendaciones atribuidas a la guía citan material real. En esta entrega solo se muestra su disponibilidad, sin afirmar integración.

El 14 de octubre se leyó el texto de ocho guías compartidas en Drive. Lengua y Literatura declara primera evaluación 2026; Matemáticas es Análisis y Enfoques. Falta guía de Monografía. Aún falta decidir y probar el contrato de servidor para Gemini, configurar credenciales de forma segura, verificar la convocatoria académica aplicable y añadir exámenes autorizados. Esta especificación permanece en borrador para completar esas decisiones.
