# FrontBiblioTK — Aplicación web

Parte del sistema BiblioTK (ver `../CLAUDE.md`). SPA con React 19 + React Router 7 + Vite 8 + Tailwind CSS 4.

- **Arranque:** `npm run dev` → http://localhost:5173
- **Lint/formato:** Biome (`npm run check` = formatea + lint + ordena imports). Tabs y comillas dobles. `biome.json` tiene `css.parser.tailwindDirectives` activado para que entienda `@theme` y `@utility` de Tailwind 4.
- **Tipografías:** self-hosted con Fontsource. Bricolage Grotesque (display, eje óptico) y Geist (texto), importadas en `src/main.jsx`.
- **Íconos:** `@phosphor-icons/react`. El grosor y el tamaño por defecto se fijan una vez con `IconContext` en `src/main.jsx`. No dibujar SVG de íconos a mano.

## Sistema de diseño

Todos los tokens viven en `src/app/styles/globals.css` dentro de `@theme`. **Usa siempre los tokens, nunca un color fijo tipo `bg-[#173c33]`.**

| Familia | Uso |
|---|---|
| `pine-50…950` | Verde bosque: marca, paneles oscuros, texto principal (`pine-950`) |
| `sand-50…400` | Arena: fondo de página (`sand-100`), superficies (`sand-50`), líneas |
| `honey-100…700` | Miel: **único acento**. Para texto pequeño sobre arena usa `honey-700` |
| `ink`, `ink-soft`, `ink-faint`, `line` | Texto secundario, placeholders y bordes de campos (contraste AA) |
| `clay-50/600/700` | Errores |
| `role-admin`, `role-usuario`, `role-superadmin` | Colores de datos del gráfico de roles |

Otras reglas del sistema:

- **Tipografía:** `font-display` (Bricolage) solo para títulos, en `font-extrabold` con `tracking` negativo. Los números grandes van en `font-sans` (Geist), no en la display.
- **Formas:** radios grandes en contenedores (`rounded-[28px]`), `rounded-xl` en campos y `rounded-full` en botones.
- **Movimiento:** curva `ease-out-strong`, animaciones de UI por debajo de 300 ms, entradas con `motion-safe:animate-rise` y `[animation-delay:…]` para escalonar. Todo respeta `prefers-reduced-motion`.
- **Utilidad `grain`:** grano sutil para los paneles verdes; el elemento debe ser `relative`.
- Los colores del gráfico se validaron con la skill `dataviz` (banda de luminosidad, croma, separación para daltonismo y contraste ≥ 3:1). Si cambian, hay que volver a validarlos.

## Estructura

```
src/
  main.jsx                        # Fuentes, IconContext, BrowserRouter, App
  app/
    pages/
      App.jsx                     # Rutas, estado de sesión y guardas por rol
      Login.jsx                   # Formulario de login
      Register.jsx                # Registro con validación por campo y estado de éxito
      AdminHome.jsx               # /admin — bento; el tile de Usuarios muestra el total real
      UserDashboard.jsx           # /admin/usuarios — distribución por rol
      Construccion.jsx            # /construccion — para usuarios sin rol admin
      Dashboard.jsx               # SIN RUTA todavía: panel del lector (datos de ejemplo)
    components/
      layout/AuthLayout.jsx       # Pantalla partida de login y registro
      layout/AdminLayout.jsx      # Barra flotante superior del panel admin
      layout/ReaderLayout.jsx     # Cabecera simple para páginas de lector
      ui/Button.jsx               # Variantes primary | accent | outline | ghost, estado loading
      ui/TextField.jsx            # Etiqueta arriba, error debajo, aria-describedby
      ui/PasswordField.jsx        # TextField con botón de mostrar u ocultar
      ui/Checkbox.jsx  ui/Alert.jsx  ui/Logo.jsx
    dto/                          # loginUser.dto.js, registerUser.dto.js
    constants/cst.js              # SIN USO (arreglo de rutas antiguo)
    utils/cn.js                   # Une clases
    utils/format.js               # Fechas, números y porcentajes en es-ES
  service/
    LoginService.js               # loginUser, getCurrentSession, logoutUser → :3001
    RegisterService.js            # registerUser → :3000 (URL fija en el código)
    UserService.js                # getUserRoleStats → :3002
```

## Rutas y sesión (`App.jsx`)

| Ruta | Acceso |
|---|---|
| `/login` | pública; si ya hay sesión redirige según el rol |
| `/register` | pública (no consulta la sesión) |
| `/admin`, `/admin/usuarios` | sesión + `rol === "admin"` |
| `/construccion` | cualquier sesión |
| `/dashboard` | redirige a `/construccion` |
| `*` | redirige a `/login` |

- `authStatus`: `"checking" | "authenticated" | "anonymous"`.
- En las rutas protegidas se consulta `GET /Sesion` cada 10 s; si falla, muestra "Tu sesión finalizó" y va a `/login`.
- `getSessionRole` acepta `user.rol`, `user.role`, `rol` o `role`.
- Las guardas son solo de interfaz: la seguridad real debe estar en los backends.

## Variables de entorno (opcionales, con valores por defecto)

`VITE_LOGIN_URL`, `VITE_SESSION_URL`, `VITE_LOGOUT_URL`, `VITE_USERS_DASHBOARD_URL`.
`RegisterService.js` no tiene variable: la URL está fija en el código.

## Pendientes conocidos

- No hay modo oscuro. Los tokens son semánticos, así que se puede añadir sin tocar las páginas.
- `bcrypt` sigue en `dependencies` sin usarse (y no funciona en el navegador).
- `constants/cst.js` no se importa en ningún lado.
- `Dashboard.jsx` no tiene ruta y usa datos de ejemplo; espera a que exista el backend de préstamos.
- "¿Olvidaste tu contraseña?" está visible pero inactivo, a la espera del flujo de recuperación.
- `README.md` sigue siendo la plantilla por defecto de Vite.
