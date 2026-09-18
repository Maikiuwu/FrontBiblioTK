import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		// @bibliotk/ui se enlaza desde ../UiBiblioTK: sus imports deben usar las copias del front
		// (una segunda copia de React o del router rompe hooks, contexto e IconContext)
		dedupe: [
			"react",
			"react-dom",
			"react-router",
			"react-router-dom",
			"@phosphor-icons/react",
		],
	},
});
