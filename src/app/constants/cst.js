import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = [
	//public: true??
	{ path: "/login", element: <Login /> },
	{ path: "/register", element: <Register /> },
	{ path: "/dashboard", element: <Dashboard /> },
];

export default routes;
