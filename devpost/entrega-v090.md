# IB Easy 0.9.0 — organización y paneles por área

- Grupos: Lenguas, Historia, Matemáticas, Electivos y Núcleo del IB.
- Historia contiene únicamente Historia. Electivos contiene Gestión Empresarial, Sociedad Digital, SAS, Biología, CDES, Química, Física, Música y Artes Visuales.
- Esta organización responde a las preferencias del proyecto; no describe los grupos oficiales de materias del IB.
- Cada área incluye un panel de bienvenida con orientación propia, empezar/retomar, temas preparados, revisados y aciertos separados.
- Accesos funcionales a herramientas, repaso y cuaderno. Un reto original diferente para cada una de las 16 áreas, en español e inglés, con pasos de autoevaluación.
- Se conserva el campo de tema libre de cada área y los 83 temas, 289 preguntas y herramientas anteriores.
- Diseño azul oscuro, celeste y amarillo con tarjetas, jerarquía visual y adaptación a pantalla estrecha.

## Verificación

80 pruebas aprobadas, cero fallos, canceladas u omitidas. Dos pruebas nuevas verifican la distribución exacta y los paneles/retos/accesos en las 16 áreas y ambos idiomas. Las aserciones de seis grupos anteriores se actualizaron a los cinco solicitados.

Inspección real en Chrome: panel de Gestión en escritorio, panel de Biología en un marco de 390 × 844 px y foco por teclado. El cuerpo móvil mide 375 px de ancho y scrollWidth 375 px: no hubo desbordamiento horizontal del documento. Las pestañas conservan desplazamiento horizontal deliberado. No se probó teléfono físico ni se hizo auditoría completa de accesibilidad.

## Archivos

web/area-data.js, web/learning-studio.js, web/coar.css, web/coar-app.js, web/index.html, scripts/build.mjs, scripts/areas.test.mjs, scripts/studio.test.mjs, scripts/subject-hubs.test.mjs, package.json, package-lock.json y documentación. Capturas en devpost/capturas/v090/.

El almacenamiento no cambia y no se borra progreso. Los retos son actividades abiertas, no preguntas autocorregidas ni evaluaciones IA. Las traducciones extensas de lecciones siguen pendientes. Cloudflare no se ha actualizado; usa ACTUALIZAR.md. No se envió nada a Devpost.
