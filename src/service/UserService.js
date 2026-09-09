const API_BASE_URL = "http://localhost:3000/RegistroBiblioTK";

/**
 * Obtiene el listado de usuarios registrados.
 * Requiere un endpoint GET /RegistroBiblioTK/usuarios en el backend
 * que responda con un arreglo de objetos usuario (SIN el campo password), ej:
 * [{ id, nombres, apellidos, email, cc, rol, fecharegistro, activo, celular, nombreusuario }]
 */
export async function getUsers() {
	const response = await fetch(`${API_BASE_URL}/usuarios`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(error || "No se pudo obtener el listado de usuarios");
	}

	return await response.json();
}