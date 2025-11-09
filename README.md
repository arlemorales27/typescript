# Tutorial TypeScript — Sitio estático

Este repositorio contiene un tutorial interactivo de TypeScript (HTML, CSS y ejemplos TS) pensado para uso educativo. No requiere base de datos: es un sitio estático con ejemplos ejecutables.

## Despliegue en GitHub Pages
Se ha añadido un workflow de GitHub Actions que compila el proyecto y despliega el sitio a GitHub Pages automáticamente al hacer `push` a la rama `main`.

### ¿Qué hace el workflow?
- Ejecuta `npm ci` para instalar dependencias.
- Ejecuta `npm run build` (usa `tsc`) para compilar ejemplos TypeScript.
- Copia los ficheros necesarios a la carpeta `site/`.
- Sube `site/` a GitHub Pages con las acciones oficiales (`upload-pages-artifact` y `deploy-pages`).

### Archivos importantes añadidos
- `.github/workflows/deploy-gh-pages.yml` — flujo CI para compilar y desplegar en GitHub Pages.
- `.nojekyll` — evita que GitHub Pages procese el sitio con Jekyll (útil para archivos con `_`).
- `README-deploy-GH-PAGES.md` — instrucciones adicionales.
- Scripts npm:
  - `npm run prepare-site` — prepara localmente la carpeta `site/` con los artefactos.
  - `npm run deploy:local` — ejecuta `prepare-site` y muestra mensaje.

### Pasos para activar la publicación (en GitHub)
1. Push a `main` con los cambios.
2. En GitHub, abre *Settings → Pages* para revisar las opciones (opcional).
3. Tras el push, en *Actions* verás el workflow `Build and Deploy to GitHub Pages` ejecutándose; cuando termine, la página se publicará bajo tu sitio GitHub Pages (ej. `https://<usuario>.github.io/<repo>`).

### Prueba local (antes de push)
Puedes preparar la carpeta `site/` localmente:

```bash
npm ci
npm run prepare-site
# revisar ./site/ y abrir http://localhost:8000/index.html desde la raíz si deseas servir "site" o abrir los archivos en el navegador.
```

Si quieres que despliegue en una rama o dominio personalizado diferente, dime y lo ajusto en el workflow (por ejemplo añadir CNAME o usar otra rama).

---

Si quieres, puedo:
- Añadir un CNAME y configurar un dominio personalizado dentro del workflow.
- Añadir pasos de cache para npm en el workflow para acelerar builds.
- Ajustar la lista de ficheros que se copian a `site/` para incluir activos adicionales.

