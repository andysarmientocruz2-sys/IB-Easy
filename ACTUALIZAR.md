# Probar y actualizar IB Easy 0.9.0

## Preparar

Conserva la carpeta anterior y exporta tu progreso. Extrae el ZIP nuevo en otra carpeta; no mezcles versiones. Puedes abrir `dist/IB-Easy-COAR.html` sin instalar nada.

Para desarrollo instala Node.js 24 o posterior. Abre en Windows la carpeta con `package.json`, escribe `cmd` en la barra del Explorador y ejecuta por separado:

```cmd
npm ci
npm test
npm run preview
```

Abre http://127.0.0.1:4173. Ctrl+C detiene el servidor. Si el puerto está ocupado, cierra la vista local anterior. Ninguno de estos comandos publica.

## Revisar

Prueba una lección, sus preguntas, una búsqueda conocida, un tema inexistente con apuntes, un cálculo y la exportación/importación. Revisa ES/EN, teclado y ventana estrecha. Confirma contenido y convocatoria con tu docente. Las pruebas automáticas no sustituyen revisión visual o pedagógica.

## Publicar en tu cuenta de Cloudflare

La actualización fue solicitada, pero no pudo ejecutarse desde ChatGPT porque no hay una sesión autenticada de Cloudflare. `npm run deploy` reemplaza la versión pública del Worker configurado. Confirma carpeta, cuenta y destino antes de decidir publicarlo.

Tras detener la vista local:

```cmd
npx wrangler@4 whoami
```

Si necesitas autenticarte, ejecuta `npm run login` y sigue el flujo de Cloudflare. No pegues claves en archivos del navegador. Se conserva `name: ib-easy`, `workers_dev: true`, `preview_urls: false`.

Solo después de aprobar la publicación:

```cmd
npm run deploy
```

Ejecuta pruebas y después Wrangler. Abre la URL devuelta y comprueba que el pie de página muestre v0.9.0. La dirección usada anteriormente era https://ib-easy.ibeasy-andy.workers.dev; el resultado de tu despliegue será la referencia final. Puedes recargar forzadamente, pero no borres el almacenamiento del sitio si quieres conservar progreso.

[Documentación de Cloudflare consultada](https://developers.cloudflare.com/workers/wrangler/commands/workers/): `wrangler deploy` despliega el Worker, por lo que no se usa para probar localmente.

## Conservar y trasladar datos

Se mantiene `ib-easy-coar-v1` e IDs anteriores. Los datos usan `version: 1` y `schemaVersion: 4`. Actualizar en el mismo origen conserva notas y respuestas. HTML, localhost y web pública tienen almacenes distintos: exporta JSON en el origen e impórtalo en el destino.

Importar valida antes de pedir confirmación y reemplaza la sesión; no mezcla copias. Guarda una copia original para recuperación. Conserva también el ZIP y despliegue anteriores de la aplicación. El paquete no incluye credenciales, node_modules ni progreso real de estudiantes.

## Tutor

No usa Gemini ni otra API de modelos. El endpoint devuelve `school_ai_paused` incluso con un secreto antiguo; no lo usa ni lo borra. La ayuda usa contenido preparado. La copia portátil incluye el contenido básico sin conexión.
