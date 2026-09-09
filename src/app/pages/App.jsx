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
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [authStatus, setAuthStatus] = useState("checking");
	const [sessionMessage, setSessionMessage] = useState("");

	useEffect(() => {
		if (location.pathname === "/register") {
			setAuthStatus("anonymous");
			return;
		}

		let isActive = true;
		setAuthStatus("checking");

		getCurrentSession()
			.then(() => {
				if (!isActive) return;
				setAuthStatus("authenticated");
				setSessionMessage("");
				if (location.pathname === "/" || location.pathname === "/login") {
					navigate("/dashboard", { replace: true });
				}
			})
			.catch(() => {
				if (!isActive) return;
				setAuthStatus("anonymous");
				if (location.pathname === "/dashboard") {
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
		if (authStatus !== "authenticated" || location.pathname !== "/dashboard") {
			return undefined;
		}

		const sessionCheck = window.setInterval(async () => {
			try {
				await getCurrentSession();
			} catch {
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
						<Navigate to="/dashboard" replace />
					) : (
					<Login
						onLogin={() => navigate("/dashboard", { replace: true })}
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
					authStatus === "authenticated" ? (
						<Dashboard onLogout={handleLogout} />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
