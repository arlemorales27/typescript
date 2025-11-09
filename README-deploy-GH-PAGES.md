# Despliegue en GitHub Pages (sitio estático)

Este proyecto no tiene base de datos; es un sitio estático con ejemplos TypeScript. Puedes desplegarlo en GitHub Pages usando GitHub Actions.

Resumen: la acción hace `npm ci`, `npm run build` y copia los ficheros necesarios a una carpeta `site/`, luego usa las acciones oficiales para desplegar en GitHub Pages (branch `gh-pages` gestionado por GitHub).

Pasos (local)

1. Asegúrate que el repositorio tiene `main` como rama por defecto.
2. Añade, commitea y push de tus cambios:

```bash
git add .
git commit -m "Prepare site for GitHub Pages deployment"
git push origin main
```

3. En GitHub, ve a Settings → Pages para verificar la configuración de Pages si quieres (no es estrictamente necesario; la Action usa la API para desplegar).

Flujo automático con GitHub Actions

- Cada vez que hagas push a `main`, la action `Build and Deploy to GitHub Pages` se ejecutará.
- Compilará con `npm run build`, preparará la carpeta `site/` y la subirá a GitHub Pages.

Archivos añadidos

- `.github/workflows/deploy-gh-pages.yml` — workflow que compila y despliega.
- `.nojekyll` — evita el procesado Jekyll en GitHub Pages.
- `README-deploy-GH-PAGES.md` — esta guía de despliegue.

Notas

- Si tu sitio requiere assets adicionales (p.ej. `assets/`, imágenes grandes), añádelos a la copia en el paso `Prepare site folder` del workflow.
- La action usa `actions/deploy-pages@v1` y `actions/upload-pages-artifact@v1` (acciones oficiales). Si necesitas personalizar el branch destino o domain CNAME, dímelo y lo adapto.

