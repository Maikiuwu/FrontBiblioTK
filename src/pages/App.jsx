import { useState } from "react";
import Dashboard, { Sidebar } from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

function App() {
	const [user, setUser] = useState(null);
	const [authView, setAuthView] = useState("login");

	if (!user)
		return authView === "login" ? (
			<Login onLogin={setUser} onRegister={() => setAuthView("register")} />
		) : (
			<Register onBack={() => setAuthView("login")} />
		);

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50">
			<Sidebar onLogout={() => setUser(null)} />
			<Dashboard />
		</div>
	);
}

export default App;
