# IB Easy: evaluación y próximos pasos

Fecha: 14 de octubre de 2026. Investigación de páginas públicas; no auditoría de una cuenta de pago de RevisionDojo. Sus afirmaciones comerciales no constituyen una evaluación independiente de precisión.

## Comparación honesta

RevisionDojo ya anuncia notas, banco de preguntas, tutor Jojo, flashcards, exámenes simulados, revisión de IA/EE/TOK, práctica oral, planificación y registro de errores. También anuncia tutoría organizada por el programa y un proceso de reintento. No sería correcto presentar esas funciones como inventos exclusivos de IB Easy.

Su plan gratuito tiene límites de recursos y energía. La propia plataforma explica que sus calificaciones de IA no son oficiales ni garantizan una nota. Son límites observables, no prueba de que su producto sea malo. No se ha comprobado que carezca de materiales en español, citas, personalización o aprendizaje basado en documentos.

## Estado observado en el código de IB Easy

- Nueve espacios y selector ES/EN; NM/NS en asignaturas, núcleo separado.
- Chat con contexto de curso y máximo diez mensajes previos enviados.
- Sin guías incorporadas al contexto: el servidor lo reconoce expresamente.
- Práctica con cinco preguntas fijas por curso. Escribir un tema cambia la etiqueta, no genera preguntas para ese tema; tampoco adapta actualmente el banco por nivel.
- Archivo de exámenes vacío. No confundir guías con exámenes.
- Historial y borradores en memoria: recargar los borra.
- Sin autenticación ni límites de uso por usuario verificados en el servidor. Comprobar origen no sustituye la autenticación ni impide que alguien llame al endpoint desde otro cliente.
- Selección de Literatura debe distinguir Literatura de Lengua y Literatura, y asociar la guía correcta.
- Corrección 0.4.0: Markdown seguro y legible; demostración sin API. No se publicó desde esta sesión.

## Propuesta de valor

Un acompañante bilingüe que convierte tus materiales y tus intentos en una mejora comprobable de tu respuesta. La ventaja a validar no es tener más botones, sino ofrecer una experiencia útil, comprensible y trazable para estudiantes de tu contexto.

## Prioridades

| Prioridad | Función | Criterio de aceptación |
| --- | --- | --- |
| P0 | Proveedor y acceso adecuados a la edad del público | Revisar condiciones y privacidad; no eludir la restricción mediante una casilla o clave de un adulto. |
| P0 | Historial con exportación y borrado | Sobrevive a recargas si se activa; en equipos compartidos, guardado explícito y botón claro para borrar. |
| P0 | Guías verificables | Curso, variante, nivel, convocatoria y versión; cada recomendación normativa enlaza al fragmento y página realmente recuperados. Si no hay respaldo, mostrar “no verificado”. |
| P0 | Seguridad de un servicio público | Autenticación apropiada, límites de longitud/consumo, control de abuso, tratamiento de errores y política de datos antes de un piloto abierto. |
| P1 | Entrenador de argumentos | Intento → evidencia → análisis → contrapunto → reescritura; comparar intentos sin escribir toda la entrega. |
| P1 | Práctica adaptada al tema | Las preguntas corresponden al tema y nivel; separar originales de exámenes oficiales; ocultar soluciones hasta el intento. |
| P1 | Feedback verificable | Señalar fragmento del alumno, criterio aplicable, explicación, incertidumbre y siguiente acción. Nunca presentar una nota de IA como oficial. |
| P1 | Modo bilingüe de aprendizaje | Explicar en español, practicar en inglés, glosario de términos de instrucción y conservar el registro del alumno. Validar con estudiantes. |
| P2 | Cuaderno de errores | Registrar error, causa, reintento y próxima revisión; medir si el error reaparece. |
| P2 | Oral English B | Temporizador, preguntas de seguimiento y revisión de grabaciones con consentimiento y borrado. No fingir evaluar pronunciación usando solo texto. |
| P2 | Espacios CAS, TOK y Monografía | Flujos específicos: experiencias reales, objetos/preguntas y seguimiento de investigación, respectivamente. |
| P2 | Experiencia de chat avanzada | Fórmulas con KaTeX, streaming real, cancelar respuesta, búsqueda en historial, adjuntos con citas y exportación. |
| P2 | Modo de baja conectividad | Notas y práctica local, sincronización explícita; no prometer IA remota sin internet. |

## Primer recorrido completo recomendado

Historia → nivel y convocatoria → Segunda Guerra Mundial → consigna original → intento del alumno → evidencia de sus materiales → feedback por dimensión → segundo intento → comparación y siguiente ejercicio.

Mantener visibles todos los cursos, pero marcar claramente cuáles tienen contenido verificado y cuáles son demostraciones. Validar este recorrido antes de replicarlo a las demás áreas.

## Evaluar si es mejor, no solo más grande

1. Preparar un conjunto pequeño de consignas y respuestas revisadas por un profesor.
2. Medir relevancia del feedback, respaldo real de citas y errores factuales; registrar desacuerdos, no ocultarlos.
3. Observar estudiantes con un flujo permitido para su edad: tiempo hasta recibir una pista útil y mejora entre primer y segundo intento.
4. Pedir que expliquen qué aprendieron; satisfacción no equivale por sí sola a aprendizaje.
5. Documentar ejemplos de fallo y medidas correctivas para el vídeo Devpost.

## Evitar

- Prometer ser “la mejor” o garantizar un 7 sin evidencia.
- Copiar bancos, textos o diseño de RevisionDojo.
- Publicar PDFs/exámenes del colegio por asumir que tener acceso equivale a permiso de redistribución. Usar enlaces autorizados, materiales propios y preguntas originales identificadas como tales.
- Inventar páginas, referencias, límites de nota o precisión de calificación.
- Detectores que pretendan demostrar de manera definitiva que un estudiante usó IA.
- Prometer IA gratuita e ilimitada: limitar consumo y separar claramente herramientas locales de funciones que requieren proveedor.

## Fuentes públicas consultadas

- https://www.revisiondojo.com/pricing
- https://www.revisiondojo.com/comparison
- https://www.revisiondojo.com/blog/ib-ai-tutor-jojo-syllabus-grounded
- https://www.revisiondojo.com/blog/tok-essay-ai-feedback-limits
- https://www.revisiondojo.com/blog/revisiondojo-free-features
- https://ai.google.dev/gemini-api/terms
- https://marked.js.org/
- https://github.com/cure53/DOMPurify
