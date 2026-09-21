# FrontBiblioTK — Aplicación web

Parte del sistema BiblioTK (ver `../CLAUDE.md`). SPA con React 19 + React Router 7 + Vite 8 + Tailwind CSS 4.

- **Arranque:** `npm run dev` → http://localhost:5173
- **Lint/formato:** Biome (`npm run check` = formatea + lint + ordena imports). Tabs y comillas dobles. `biome.json` tiene `css.parser.tailwindDirectives` activado para que entienda `@theme` y `@utility` de Tailwind 4.
- **Tipografías:** self-hosted con Fontsource. Bricolage Grotesque (display, eje óptico) y Geist (texto), importadas en `src/main.jsx`.
- **Íconos:** `@phosphor-icons/react`. El grosor y el tamaño por defecto se fijan una vez con `IconContext` en `src/main.jsx`. No dibujar SVG de íconos a mano.

## Librería de interfaz (`@bibliotk/ui`)

Los componentes, el tema de Tailwind y las utilidades de formato **no viven en este repo**: están en `../UiBiblioTK` (ver su `CLAUDE.md`, que incluye el sistema de diseño completo).

- Dependencia `"@bibliotk/ui": "file:../UiBiblioTK"`: hace falta esa carpeta al lado de este proyecto antes de `npm install`.
- `src/app/styles/globals.css` solo importa Tailwind y `@bibliotk/ui/theme.css`.
- `vite.config.js` tiene `resolve.dedupe` para React, el router y Phosphor. **No quitarlo**: sin él se cargan dos copias de React.
- Importar desde la raíz: `import { Button, cn, formatToday } from "@bibliotk/ui";`.
- Aquí no hay carpeta `components/`: un componente reutilizable nuevo va a la librería. Las piezas propias de una sola página (por ejemplo, los cuadros de `Home.jsx`) se quedan como funciones locales de esa página.
- Regla del sistema de diseño que más se olvida: **usa siempre los tokens, nunca un color fijo tipo `bg-[#173c33]`**.

## Estructura

```
src/
  main.jsx                        # Fuentes, IconContext, BrowserRouter, App
  app/
    pages/
      App.jsx                     # Rutas, sesión, guardas por rol y PanelLayout común (ruta de layout con Outlet)
      Login.jsx                   # Formulario de login
      Register.jsx                # Registro con validación por campo y estado de éxito
      Home.jsx                    # /inicio — home único: los cuadros cambian según el rol
      Profile.jsx                 # /perfil — edición de los datos del usuario
      UserDashboard.jsx           # /admin/usuarios — dona de usuarios por rol
      Construccion.jsx            # /construccion — destino del cuadro Libros
      Dashboard.jsx               # SIN RUTA todavía: panel del lector (datos de ejemplo)
    dto/                          # loginUser, registerUser, updateProfile
    constants/cst.js              # SIN USO (arreglo de rutas antiguo)
    utils/userValidation.js       # Patrones, límites de columnas y validateUserData (registro y perfil)
    styles/globals.css            # Tailwind + tema de @bibliotk/ui
  service/
    LoginService.js               # loginUser, getCurrentSession, logoutUser → :3001
    RegisterService.js            # registerUser → :3000 (URL fija en el código)
    UserService.js                # getUserRoleStats → :3002
    ProfileService.js             # getProfile, updateProfile, deleteAccount → :3003 (errores con .status y .field)
```

## Home único (`Home.jsx`)

| Cuadro | `admin` | Cualquier otro rol |
|---|---|---|
| Grande (verde) | Usuarios → `/admin/usuarios`, con el total real | Libros → `/construccion`, con la etiqueta "En construcción" |
| Pequeño (miel) | Libros (próximamente) | Mi perfil: nombre y correo, **Editar** → `/perfil` y **Borrar** (solo rol `usuario`) → diálogo que pide la contraseña |
| Pequeño (arena) | Préstamos (próximamente) | Préstamos (próximamente) |
| Ancho | Reportes (próximamente) | Reportes (próximamente) |

Tras borrar la cuenta, `App.jsx` llama a `logoutUser()` y lleva a `/login` con el aviso "Tu cuenta fue eliminada…".

## Rutas y sesión (`App.jsx`)

| Ruta | Acceso |
|---|---|
| `/login` | pública; si ya hay sesión redirige a `/inicio` |
| `/register` | pública (no consulta la sesión) |
| `/inicio`, `/perfil`, `/construccion` | cualquier sesión |
| `/admin/usuarios` | sesión + `rol === "admin"`; con otro rol redirige a `/inicio` |
| `/admin`, `/dashboard` | redirigen a `/inicio` |
| `*` | redirige a `/login` |

- Todas las rutas con sesión comparten `PanelLayout`. Navegación: `admin` → Resumen y Usuarios; resto → Inicio y Mi perfil.
- `authStatus`: `"checking" | "authenticated" | "anonymous"`. La pantalla "Comprobando tu sesión…" solo aparece mientras no hay sesión confirmada; con sesión, cada cambio de ruta revalida en segundo plano.
- En las rutas protegidas se consulta `GET /Sesion` cada 10 s; si falla, muestra "Tu sesión finalizó" y va a `/login`.
- `getSessionRole` acepta `user.rol`, `user.role`, `rol` o `role`.
- Las guardas son solo de interfaz: la seguridad real debe estar en los backends.

## Variables de entorno (opcionales, con valores por defecto)

`VITE_LOGIN_URL`, `VITE_SESSION_URL`, `VITE_LOGOUT_URL`, `VITE_USERS_DASHBOARD_URL`, `VITE_PROFILE_URL`.
`RegisterService.js` no tiene variable: la URL está fija en el código.

## Pendientes conocidos

- No hay modo oscuro. Los tokens son semánticos, así que se puede añadir sin tocar las páginas.
- La cabecera muestra el correo del JWT: tras cambiarlo en `/perfil` sigue mostrando el anterior hasta volver a iniciar sesión.
- `bcrypt` sigue en `dependencies` sin usarse (y no funciona en el navegador).
- `constants/cst.js` no se importa en ningún lado.
- `Dashboard.jsx` no tiene ruta y usa datos de ejemplo; espera a que exista el backend de préstamos.
- "¿Olvidaste tu contraseña?" está visible pero inactivo, a la espera del flujo de recuperación.
- `README.md` sigue siendo la plantilla por defecto de Vite.
