---
doc: prd
status: implemented-poc
version: 0.5.0
updated: 2026-10-15
---

# Producto: IB Easy COAR

## Experiencia principal

El inicio reúne seis asignaturas y tres áreas del núcleo. Historia ofrece ocho temas concretos; el buscador filtra fichas existentes. Un tema desconocido muestra un estado vacío. Al elegir un tema aparecen contenido, cronología, fuentes y notas personales; las preguntas son un paso opcional posterior.

Las opciones múltiples enseñan a reconocer conceptos; la práctica de examen exige escritura. Cada pregunta de repaso conserva su explicación y su relación con la ficha.

## Pantallas y comportamientos

| Espacio | Comportamiento implementado |
| --- | --- |
| Inicio | Nueve tarjetas, acceso a Historia y actividad de lectura |
| Estudiar | Buscar y filtrar, leer, marcar, guardar, escribir una nota |
| Comprobar | Elegir opción, ver explicación y volver a intentar |
| Tarjetas | Recordar antes de revelar; navegar entre preguntas |
| Pruebas IB de Historia | Seleccionar prueba, tema, instrucción y región; escribir y autoevaluar |
| Practicar en otros cursos | Repaso de sus dos fichas de fundamentos |
| Cuaderno | Notas separadas por tema |
| Ayuda para estudiar | Resúmenes y pautas preparados con Markdown; sin IA |
| Fuentes | Enlaces académicos y alcance explícito |
| Mi progreso | Lecturas, aciertos actuales, errores pendientes, favoritos y bloques |
| Mi semana | Añadir, completar y quitar tareas con fecha |
| Preferencias | Guardado opcional, copia JSON y borrado local |

## Historia y evaluación

- Prueba 1: cuatro fuentes didácticas propias; cinco apartados correspondientes a las cuatro preguntas estructuradas. Referencias 3+2+4+6+9=24 puntos. No se asignan notas.
- Prueba 2: nueve consignas originales; comparación, discusión, evaluación y grado de acuerdo. El examen completo exige dos ensayos de temas de historia mundial diferentes. Dos guerras no son automáticamente dos temas del programa.
- Prueba 3: nueve consignas originales, seis para Américas y tres para Europa. NS únicamente. África/Oriente Medio y Asia/Oceanía muestran falta de contenido.
- Año 2028: aviso del cambio curricular, sin reutilizar como vigentes las prácticas del programa anterior.
- Se muestran tiempos del examen completo de 60, 90 y 150 minutos para el programa hasta 2027. El botón de 15 minutos es un bloque de escritura, no un simulacro completo.

## Identidad y accesibilidad

Azul profundo para orientación, celeste para acompañar y amarillo como acento. Logo propio sin reproducir marcas oficiales. Enlaces externos identificados; foco visible, etiquetas de formulario, acceso directo al contenido y adaptación a pantalla estrecha. No se afirma afiliación al IB, MINEDU ni COAR.

## Datos y fiabilidad

Por defecto los trabajos duran esta sesión. La persistencia requiere una acción explícita; se guarda en el navegador actual y puede borrarse o exportarse. En equipos compartidos se explica que otras personas podrían verlos. No hay cuentas ni servidor de trabajos.

Las métricas describen actividad; no predicen una nota ni prueban dominio. La autoevaluación de ensayos usa una lista manual, sin fingir haber leído o calificado la respuesta.

## Criterios de aceptación

1. Elegir Segunda Guerra Mundial ofrece información sobre ese tema antes de preguntas.
2. Una respuesta incorrecta produce una explicación pertinente y un reintento desde progreso.
3. Cambiar de tema no arrastra respuestas de otro tema.
4. NM no abre Prueba 3; una región sin preguntas no muestra las de otra región.
5. Activar guardado conserva notas al recargar; desactivarlo elimina la copia persistida.
6. Los nueve espacios funcionan en ES/EN sin llamadas a un modelo.
7. Markdown se ve como títulos, listas y negritas, y se sanitiza antes de mostrarse.
8. Borrar y exportar funcionan sin transmitir trabajos a servicios externos.

## Pendientes

Cobertura por guía y convocatoria, revisión docente de fichas y consignas, más materiales regionales, integración de IA apropiada al público, fórmulas avanzadas, importar copias y sincronización explícita. Priorizar utilidad y validación antes de ampliar el catálogo.
