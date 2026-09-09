import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		if (window.location.pathname === "/") navigate("/login", { replace: true });
	}, [navigate]);

	return (
		<Routes>
			<Route
				path="/login"
				element={
					<Login
						onLogin={() => navigate("/dashboard")}
						onRegister={() => navigate("/register")}
					/>
				}
			/>
			<Route
				path="/register"
				element={<Register onBack={() => navigate("/login")} />}
			/>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}

export default App;
