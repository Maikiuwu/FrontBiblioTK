import { PanelLayout } from "bibliotk-ui";
import { useEffect, useState } from "react";
import {
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";

import { getCurrentSession, logoutUser } from "../../service/LoginService";

import Construccion from "./Construccion.jsx";
import Home from "./Home.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import Register from "./Register.jsx";
import UserDashboard from "./UserDashboard.jsx";

const homePath = "/inicio";
const protectedPaths = [homePath, "/perfil", "/construccion", "/admin"];

const adminNavItems = [
	{ to: homePath, label: "Resumen", end: true },
	{ to: "/admin/usuarios", label: "Usuarios" },
];

const readerNavItems = [
	{ to: homePath, label: "Inicio", end: true },
	{ to: "/perfil", label: "Mi perfil" },
];

function getSessionRole(session) {
	return String(
		session?.user?.rol ??
			session?.user?.role ??
			session?.rol ??
			session?.role ??
			"",
	).toLowerCase();
}

function isProtectedPath(pathname) {
	return protectedPaths.some(
		(path) => pathname === path || pathname.startsWith(`${path}/`),
	);
}

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [authStatus, setAuthStatus] = useState("checking");
	const [session, setSession] = useState(null);
	const [sessionMessage, setSessionMessage] = useState("");

	useEffect(() => {
		if (location.pathname === "/register") {
			setAuthStatus("anonymous");
			return;
		}

		let isActive = true;
		// Con la sesión ya confirmada se revalida en segundo plano, sin volver a la pantalla de carga
		setAuthStatus((currentStatus) =>
			currentStatus === "authenticated" ? currentStatus : "checking",
		);

		getCurrentSession()
			.then((currentSession) => {
				if (!isActive) return;
				setSession(currentSession);
				setAuthStatus("authenticated");
				setSessionMessage("");
				if (location.pathname === "/" || location.pathname === "/login") {
					navigate(homePath, { replace: true });
				}
			})
			.catch(() => {
				if (!isActive) return;
				setSession(null);
				setAuthStatus("anonymous");
				if (isProtectedPath(location.pathname)) {
					setSessionMessage(
						"Tu sesión finalizó. Debes iniciar sesión nuevamente.",
					);
					navigate("/login", { replace: true });
				} else if (location.pathname === "/") {
					navigate("/login", { replace: true });
				}
			});

		return () => {
			isActive = false;
		};
	}, [location.pathname, navigate]);

	useEffect(() => {
		if (authStatus !== "authenticated" || !isProtectedPath(location.pathname)) {
			return undefined;
		}

		const sessionCheck = window.setInterval(async () => {
			try {
				const currentSession = await getCurrentSession();
				setSession(currentSession);
			} catch {
				setSession(null);
				setAuthStatus("anonymous");
				setSessionMessage(
					"Tu sesión finalizó. Debes iniciar sesión nuevamente.",
				);
				navigate("/login", { replace: true });
			}
		}, 10000);

		return () => window.clearInterval(sessionCheck);
	}, [authStatus, location.pathname, navigate]);

	async function handleLogout() {
		try {
			await logoutUser();
		} finally {
			setSession(null);
			setAuthStatus("anonymous");
			navigate("/login", { replace: true });
		}
	}

	async function handleAccountDeleted() {
		// El servicio de perfil ya borró la cookie; cerrar sesión aquí es solo un refuerzo
		await logoutUser().catch(() => undefined);
		setSession(null);
		setAuthStatus("anonymous");
		setSessionMessage(
			"Tu cuenta fue eliminada. Gracias por haber sido parte de BiblioTK.",
		);
		navigate("/login", { replace: true });
	}

	if (authStatus === "checking") {
		return (
			<main
				aria-busy="true"
				className="grid min-h-dvh place-items-center bg-sand-100"
			>
				<div className="flex flex-col items-center gap-5 motion-safe:animate-fade [animation-delay:150ms]">
					<span className="relative grid size-16 place-items-center">
						<span
							aria-hidden="true"
							className="absolute inset-0 rounded-full border-2 border-pine-900/10 border-t-honey-500 animate-[spin_800ms_linear_infinite]"
						/>
						<span className="font-display text-lg font-extrabold text-pine-900">
							BT
						</span>
					</span>
					<p role="status" className="text-sm font-medium text-ink-soft">
						Comprobando tu sesión...
					</p>
				</div>
			</main>
		);
	}

	const role = getSessionRole(session);
	const isAuthenticated = authStatus === "authenticated";

	return (
		<Routes>
			<Route
				path="/login"
				element={
					isAuthenticated ? (
						<Navigate to={homePath} replace />
					) : (
						<Login
							onLogin={async () => {
								const currentSession = await getCurrentSession();
								setSession(currentSession);
								setAuthStatus("authenticated");
								navigate(homePath, { replace: true });
							}}
							onRegister={() => navigate("/register")}
							sessionMessage={sessionMessage}
						/>
					)
				}
			/>
			<Route
				path="/register"
				element={<Register onBack={() => navigate("/login")} />}
			/>
			<Route
				element={
					isAuthenticated ? (
						<PanelLayout
							navItems={role === "admin" ? adminNavItems : readerNavItems}
							homePath={homePath}
							userLabel={session?.user?.email}
							onLogout={handleLogout}
						>
							<Outlet />
						</PanelLayout>
					) : (
						<Navigate to="/login" replace />
					)
				}
			>
				<Route
					path={homePath}
					element={<Home role={role} onAccountDeleted={handleAccountDeleted} />}
				/>
				<Route path="/perfil" element={<Profile />} />
				<Route path="/construccion" element={<Construccion />} />
				<Route
					path="/admin/usuarios"
					element={
						role === "admin" ? (
							<UserDashboard />
						) : (
							<Navigate to={homePath} replace />
						)
					}
				/>
			</Route>
			<Route path="/admin" element={<Navigate to={homePath} replace />} />
			<Route path="/dashboard" element={<Navigate to={homePath} replace />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
