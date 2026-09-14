# FrontBiblioTK — Aplicación web

Parte del sistema BiblioTK (ver `../CLAUDE.md`). SPA con React 19 + React Router 7 + Vite 8 + Tailwind CSS 4.

- **Arranque:** `npm run dev` → http://localhost:5173
- **Lint/formato:** Biome (`npm run check` = formatea + lint + ordena imports). Tabs y comillas dobles.
- **Estilos:** solo clases de Tailwind inline con valores arbitrarios (`bg-[#173c33]`); no hay componentes de UI ni tema centralizado. `src/app/styles/globals.css` importa Tailwind.

## Estructura

```
src/
  main.jsx                      # BrowserRouter + App
  app/
    pages/
      App.jsx                   # Rutas, estado de sesión y guardas por rol
      Login.jsx                 # Formulario de login
      Register.jsx              # Formulario de registro con validaciones
      AdminHome.jsx             # /admin — menú (solo "Usuarios" activo)
      UserDashboard.jsx         # /admin/usuarios — gráfico de dona por rol
      Construccion.jsx          # /construccion — página para rol no admin
      Dashboard.jsx             # SIN USO (maqueta con datos falsos)
    components/AdminSidebar.jsx
    dto/loginUser.dto.js        # { email, password, rememberMe } → { email, contrasena, recordarme }
    dto/registerUser.dto.js     # trim / lowercase del formulario de registro
    constants/cst.js            # SIN USO (arreglo de rutas antiguo)
  service/
    LoginService.js             # loginUser, getCurrentSession, logoutUser → :3001
    RegisterService.js          # registerUser → :3000 (URL fija en el código)
    UserService.js              # getUserRoleStats → :3002
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

## Problemas conocidos

- `bcrypt` está en `dependencies` pero no se usa (y no funciona en el navegador).
- `Dashboard.jsx` se importa en `App.jsx` sin usarse; `constants/cst.js` no se importa en ningún lado.
- `Construccion.jsx` → el botón "Volver" navega a `/login`, que con sesión activa redirige otra vez a `/construccion`.
- `Register.jsx` hace `console.log` de la respuesta del servidor.
- `README.md` es la plantilla por defecto de Vite.
