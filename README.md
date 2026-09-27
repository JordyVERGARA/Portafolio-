# Portafolio personal — Jordy Rodrigo Vergara Morales

Portafolio web individual desarrollado con **HTML5 semántico, CSS propio y JavaScript puro** (sin frameworks). Presenta mi perfil profesional, habilidades, proyectos destacados y un **Design System** que documenta los tokens visuales y los componentes reutilizables del sitio.

- **GitHub:** [JordyVERGARA](https://github.com/JordyVERGARA)
- **Repositorio del portafolio:** pendiente de crear o conectar; este checkout aún no tiene un remoto Git.
- **Sitio publicado:** pendiente de configurar en GitHub Pages.

Las capturas actuales de `docs/capturas/` pertenecen a una versión anterior y deben actualizarse antes de entregar el proyecto.

## Secciones

| Sección | Contenido |
| --- | --- |
| **Inicio** | Nombre, perfil, breve presentación, avatar y llamadas a la acción. |
| **Sobre mí** | Perfil profesional, intereses, datos rápidos y formación académica. |
| **Habilidades** | Tecnologías por categoría (Frontend, Backend, Bases de datos, Herramientas y diseño) con ícono, descripción y nivel justificado. |
| **Proyectos** | 4 proyectos en cards reutilizables: descripción, problema que resuelve, tecnologías, imagen y enlace de código cuando está disponible. |
| **Design System** | Página propia (`design-system.html`) con colores, tipografía, espaciado, radios, sombras y componentes. |
| **Contacto** | Formulario validado, correo institucional y perfil de GitHub. |

## Tecnologías

- **HTML5 semántico:** `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `address`, `dialog`, `footer`.
- **CSS3:** Custom Properties (design tokens), Flexbox, CSS Grid, media queries, `clamp()`, `color-mix()`, nomenclatura BEM.
- **JavaScript (ES6+):** sin librerías, organizado por responsabilidad.
- **Git** para control de versiones. El remoto público y GitHub Pages aún están pendientes de configurar.
- Recursos externos: fuentes [Inter y Space Grotesk](https://fonts.google.com/) (Google Fonts) e íconos de tecnologías de [Devicon](https://devicon.dev/) (licencia MIT, copiados localmente).

## Funcionalidades interactivas

1. **Menú responsive:** botón hamburguesa con `aria-expanded`; se cierra con `Escape`, al hacer clic fuera o al elegir un enlace.
2. **Tema claro / oscuro:** inicia en tema oscuro; el usuario puede cambiarlo y la elección queda guardada en `localStorage`.
3. **Filtro de proyectos por tecnología:** chips con `aria-pressed` y mensaje de estado para lectores de pantalla.
4. **Modal de detalle de proyectos:** usa `<dialog>` nativo; toma los datos de la propia card para no duplicar información.
5. **Validación del formulario:** mensajes por campo enlazados con `aria-describedby`, contador de caracteres y apertura de Gmail con el mensaje preparado para `jvergaram7@unemi.edu.ec`.
6. **Navegación dinámica:** resalta en el menú la sección visible (`IntersectionObserver`).
7. **Botón «volver arriba»** y **animaciones de aparición** que respetan `prefers-reduced-motion`.
8. **Design System vivo:** los valores de color se leen de las variables CSS según el tema activo y se pueden copiar con un clic.

## Design System

Todas las decisiones visuales están en [`css/tokens.css`](css/tokens.css) y los componentes solo consumen esas variables:

| Grupo | Tokens |
| --- | --- |
| Colores | `--color-primary`, `--color-secondary`, `--color-background`, `--color-surface`, `--color-text`, `--color-text-muted`, estados de éxito y error… |
| Tipografía | `--font-heading`, `--font-body`, `--font-mono`, escala `--fs-xs` a `--fs-3xl`, pesos y alturas de línea |
| Espaciado | Escala de 4px: `--space-3xs` (2px) a `--space-4xl` (96px) |
| Bordes y radios | `--border`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` |
| Sombras | `--shadow-sm`, `--shadow-card`, `--shadow-lg`, `--focus-ring` |
| Tamaños | `--container-max`, `--header-height`, `--touch-target`, `--icon-size`… |

El tema oscuro solo redefine los tokens de color bajo `:root[data-theme="dark"]`; ningún componente tiene estilos duplicados por tema.

## Estructura del proyecto

```text
.
├── index.html              # Página principal (inicio, sobre mí, habilidades, proyectos, contacto)
├── design-system.html      # Documentación del Design System / Componentes
├── css/
│   ├── tokens.css          # Design tokens (CSS Custom Properties) y tema oscuro
│   ├── base.css            # Reset, tipografía global y utilidades
│   ├── layout.css          # Contenedor, header, secciones y grillas responsive
│   ├── components.css      # Componentes reutilizables (BEM)
│   └── design-system.css   # Estilos exclusivos de la página del Design System
├── js/
│   ├── theme.js            # Tema claro/oscuro + localStorage
│   ├── main.js             # Menú, navegación activa, volver arriba, animaciones
│   ├── projects.js         # Filtro y modal de proyectos
│   ├── form.js             # Validación del formulario de contacto
│   └── design-system.js    # Valores de color en vivo y copia al portapapeles
├── assets/
│   ├── icons/              # Favicon e íconos de tecnologías (SVG)
│   └── img/                # Avatar e imágenes de proyectos (SVG)
└── docs/capturas/          # Capturas usadas en este README
```

## Cómo visualizarlo

**Servidor local recomendado:** desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador. Cuando se configure el repositorio remoto, agrega aquí el comando `git clone` con su URL real.

## Publicación en GitHub Pages

1. Sube el proyecto a un repositorio **público** en GitHub.
2. En el repositorio: **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Espera un par de minutos y abre la URL que muestra GitHub.

## Buenas prácticas aplicadas

- Un solo `h1` por página y jerarquía de encabezados sin saltos.
- Enlaces para navegar y botones para ejecutar acciones.
- Imágenes con `alt` descriptivo y dimensiones (`width`/`height`) para evitar saltos de diseño.
- Formularios con `label` asociado a cada control y errores anunciados a lectores de pantalla.
- Enlace «Saltar al contenido», foco visible y áreas táctiles de al menos 44px.
- Mejora progresiva: sin JavaScript el contenido y la navegación siguen funcionando.

## Autor

**Jordy Rodrigo Vergara Morales** — Estudiante de 8.º semestre de Ingeniería de Software en la Universidad Estatal de Milagro (UNEMI).

- Correo: [jvergaram7@unemi.edu.ec](mailto:jvergaram7@unemi.edu.ec)
- GitHub: [@JordyVERGARA](https://github.com/JordyVERGARA)
