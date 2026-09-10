import { useEffect, useState } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
<<<<<<< HEAD
import { getCurrentSession, logoutUser } from "../../service/LoginService";
import AdminHome from "./AdminHome.jsx";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import UnderConstruction from "./UnderConstruction.jsx";
import UsersDashboard from "./UsersDashboard.jsx";

const ADMIN_ROLE = "admin";

// TODO: ajustar si el backend envuelve el usuario en otra propiedad,
// por ejemplo sessionData.usuario?.rol en vez de sessionData.rol directo.
function extractRole(sessionData) {
	return sessionData?.rol ?? sessionData?.usuario?.rol ?? null;
}

function getHomePathForRole(rol) {
	return rol === ADMIN_ROLE ? "/admin" : "/en-construccion";
=======

import {
	getCurrentSession,
	logoutUser,
} from "../../service/LoginService";

import AdminHome from "./AdminHome.jsx";
import Construccion from "./Construccion.jsx";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import UserDashboard from "./UserDashboard.jsx";

function getSessionRole(session) {
	return String(
		session?.user?.rol ??
			session?.user?.role ??
			session?.rol ??
			session?.role ??
			"",
	).toLowerCase();
}

function getAuthenticatedPath(session) {
	return getSessionRole(session) === "admin" ? "/admin" : "/construccion";
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
}

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [authStatus, setAuthStatus] = useState("checking");
<<<<<<< HEAD
	const [role, setRole] = useState(null);
=======
	const [session, setSession] = useState(null);
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
	const [sessionMessage, setSessionMessage] = useState("");

	useEffect(() => {
		if (location.pathname === "/register") {
			setAuthStatus("anonymous");
			return;
		}

		let isActive = true;
		setAuthStatus("checking");

		getCurrentSession()
<<<<<<< HEAD
			.then((data) => {
				if (!isActive) return;
				const currentRole = extractRole(data);
=======
			.then((currentSession) => {
				if (!isActive) return;
				setSession(currentSession);
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
				setAuthStatus("authenticated");
				setRole(currentRole);
				setSessionMessage("");
				if (location.pathname === "/" || location.pathname === "/login") {
<<<<<<< HEAD
					navigate(getHomePathForRole(currentRole), { replace: true });
=======
					navigate(getAuthenticatedPath(currentSession), { replace: true });
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
				}
			})
			.catch(() => {
				if (!isActive) return;
				setSession(null);
				setAuthStatus("anonymous");
<<<<<<< HEAD
				setRole(null);
				if (location.pathname === "/") {
=======
				if (
					location.pathname.startsWith("/admin") ||
					location.pathname === "/construccion"
				) {
					setSessionMessage("Tu sesión finalizó. Debes iniciar sesión nuevamente.");
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
					navigate("/login", { replace: true });
				} else if (location.pathname !== "/login") {
					setSessionMessage(
						"Tu sesión finalizó. Debes iniciar sesión nuevamente.",
					);
					navigate("/login", { replace: true });
				}
			});

		return () => {
			isActive = false;
		};
	}, [location.pathname, navigate]);

	useEffect(() => {
<<<<<<< HEAD
		if (authStatus !== "authenticated") return undefined;
=======
		if (
			authStatus !== "authenticated" ||
			(!location.pathname.startsWith("/admin") &&
				location.pathname !== "/construccion")
		) {
			return undefined;
		}
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89

		const sessionCheck = window.setInterval(async () => {
			try {
				const currentSession = await getCurrentSession();
				setSession(currentSession);
			} catch {
				setSession(null);
				setAuthStatus("anonymous");
				setRole(null);
				setSessionMessage("Tu sesión finalizó. Debes iniciar sesión nuevamente.");
				navigate("/login", { replace: true });
			}
		}, 10000);

		return () => window.clearInterval(sessionCheck);
	}, [authStatus, navigate]);

	function handleLogin(sessionData) {
		const currentRole = extractRole(sessionData);
		setAuthStatus("authenticated");
		setRole(currentRole);
		navigate(getHomePathForRole(currentRole), { replace: true });
	}

	async function handleLogout() {
		try {
			await logoutUser();
		} finally {
			setSession(null);
			setAuthStatus("anonymous");
			setRole(null);
			navigate("/login", { replace: true });
		}
	}

	if (authStatus === "checking") {
		return (
			<main className="grid min-h-screen place-items-center bg-[#f6f3ed] text-sm text-[#375148]">
				Comprobando tu sesión...
			</main>
		);
	}

	const isAuthenticated = authStatus === "authenticated";
	const isAdmin = isAuthenticated && role === ADMIN_ROLE;

	return (
		<Routes>
			<Route
				path="/login"
				element={
<<<<<<< HEAD
					isAuthenticated ? (
						<Navigate to={getHomePathForRole(role)} replace />
					) : (
						<Login
							onLogin={handleLogin}
							onRegister={() => navigate("/register")}
							sessionMessage={sessionMessage}
						/>
=======
					authStatus === "authenticated" ? (
						<Navigate to={getAuthenticatedPath(session)} replace />
					) : (
					<Login
							onLogin={async () => {
								const currentSession = await getCurrentSession();
								setSession(currentSession);
								setAuthStatus("authenticated");
								navigate(getAuthenticatedPath(currentSession), { replace: true });
							}}
						onRegister={() => navigate("/register")}
						sessionMessage={sessionMessage}
					/>
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
					)
				}
			/>
			<Route
				path="/register"
				element={<Register onBack={() => navigate("/login")} />}
			/>
			<Route
				path="/admin"
				element={
<<<<<<< HEAD
					isAuthenticated ? (
						<Dashboard onLogout={handleLogout} />
=======
					authStatus === "authenticated" && getSessionRole(session) === "admin" ? (
						<AdminHome onLogout={handleLogout} />
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
<<<<<<< HEAD
				path="/en-construccion"
				element={
					isAuthenticated ? (
						<UnderConstruction onLogout={handleLogout} />
=======
				path="/admin/usuarios"
				element={
					authStatus === "authenticated" && getSessionRole(session) === "admin" ? (
						<UserDashboard onLogout={handleLogout} />
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
<<<<<<< HEAD
				path="/admin"
				element={
					isAdmin ? (
						<AdminHome onLogout={handleLogout} />
					) : (
						<Navigate to={isAuthenticated ? "/en-construccion" : "/login"} replace />
					)
				}
			/>
			<Route
				path="/admin/usuarios"
				element={
					isAdmin ? (
						<UsersDashboard onLogout={handleLogout} />
					) : (
						<Navigate to={isAuthenticated ? "/en-construccion" : "/login"} replace />
					)
				}
			/>
=======
				path="/construccion"
				element={
					authStatus === "authenticated" ? (
						<Construccion onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route path="/dashboard" element={<Navigate to="/construccion" replace />} />
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;