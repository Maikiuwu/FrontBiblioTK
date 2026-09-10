import { useEffect, useState } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";

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
		setAuthStatus("checking");

		getCurrentSession()
			.then((currentSession) => {
				if (!isActive) return;
				setSession(currentSession);
				setAuthStatus("authenticated");
				setSessionMessage("");
				if (location.pathname === "/" || location.pathname === "/login") {
					navigate(getAuthenticatedPath(currentSession), { replace: true });
				}
			})
			.catch(() => {
				if (!isActive) return;
				setSession(null);
				setAuthStatus("anonymous");
				if (
					location.pathname.startsWith("/admin") ||
					location.pathname === "/construccion"
				) {
					setSessionMessage("Tu sesión finalizó. Debes iniciar sesión nuevamente.");
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
		if (
			authStatus !== "authenticated" ||
			(!location.pathname.startsWith("/admin") &&
				location.pathname !== "/construccion")
		) {
			return undefined;
		}

		const sessionCheck = window.setInterval(async () => {
			try {
				const currentSession = await getCurrentSession();
				setSession(currentSession);
			} catch {
				setSession(null);
				setAuthStatus("anonymous");
				setSessionMessage("Tu sesión finalizó. Debes iniciar sesión nuevamente.");
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

	if (authStatus === "checking") {
		return (
			<main className="grid min-h-screen place-items-center bg-[#f6f3ed] text-sm text-[#375148]">
				Comprobando tu sesión...
			</main>
		);
	}

	return (
		<Routes>
			<Route
				path="/login"
				element={
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
					authStatus === "authenticated" && getSessionRole(session) === "admin" ? (
						<AdminHome onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
				path="/admin/usuarios"
				element={
					authStatus === "authenticated" && getSessionRole(session) === "admin" ? (
						<UserDashboard onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
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
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
