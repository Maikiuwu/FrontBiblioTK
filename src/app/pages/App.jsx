import { useEffect, useState } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
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
}

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [authStatus, setAuthStatus] = useState("checking");
	const [role, setRole] = useState(null);
	const [sessionMessage, setSessionMessage] = useState("");

	useEffect(() => {
		if (location.pathname === "/register") {
			setAuthStatus("anonymous");
			return;
		}

		let isActive = true;
		setAuthStatus("checking");

		getCurrentSession()
			.then((data) => {
				if (!isActive) return;
				const currentRole = extractRole(data);
				setAuthStatus("authenticated");
				setRole(currentRole);
				setSessionMessage("");
				if (location.pathname === "/" || location.pathname === "/login") {
					navigate(getHomePathForRole(currentRole), { replace: true });
				}
			})
			.catch(() => {
				if (!isActive) return;
				setAuthStatus("anonymous");
				setRole(null);
				if (location.pathname === "/") {
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
		if (authStatus !== "authenticated") return undefined;

		const sessionCheck = window.setInterval(async () => {
			try {
				await getCurrentSession();
			} catch {
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
					isAuthenticated ? (
						<Navigate to={getHomePathForRole(role)} replace />
					) : (
						<Login
							onLogin={handleLogin}
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
				path="/dashboard"
				element={
					isAuthenticated ? (
						<Dashboard onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
				path="/en-construccion"
				element={
					isAuthenticated ? (
						<UnderConstruction onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
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
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;