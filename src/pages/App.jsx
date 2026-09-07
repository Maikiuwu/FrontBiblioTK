import { useState } from "react";
import Dashboard, { Sidebar } from "./Dashboard.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

//webi wabo
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
		<main className="app-shell">
			<Sidebar onLogout={() => setUser(null)} />
			<Dashboard />
		</main>
	);
}

export default App;
