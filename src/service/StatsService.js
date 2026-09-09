const API_BASE_URL = "http://localhost:3000/RegistroBiblioTK";

/**
 * Obtiene estadísticas simples para el panel de administración.
 * Contrato sugerido — ajústenlo con el nombre real del endpoint y
 * de los campos cuando esté listo:
 *
 * GET /RegistroBiblioTK/estadisticas
 * -> { totalUsuarios: 12, administradores: 2, usuariosActivos: 10 }
 */
export async function getAdminStats() {
	const response = await fetch(`${API_BASE_URL}/estadisticas`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error || "No se pudieron obtener las estadísticas");
	}

	return await response.json();
}