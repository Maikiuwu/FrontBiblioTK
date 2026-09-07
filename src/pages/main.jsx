import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/globals.css"; // Debe contener: @tailwind base; @tailwind components; @tailwind utilities;
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
