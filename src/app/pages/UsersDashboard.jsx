import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getUsers } from "../../service/UserService.js";

function formatDate(value) {
	if (!value) return "—";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return value;
	return date.toLocaleDateString("es-ES", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

function StatusBadge({ active }) {
	return (
		<span
			className={`inline-block rounded-full px-2.5 py-1.5 text-[9px] font-bold ${
				active ? "bg-[#dcebe0] text-[#357358]" : "bg-[#f5ded8] text-[#ad5d4b]"
			}`}
		>
			{active ? "Activo" : "Inactivo"}
		</span>
	);
}

function UsersDashboard() {
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [status, setStatus] = useState("loading"); // loading | success | error
	const [errorMessage, setErrorMessage] = useState("");
	const [search, setSearch] = useState("");

	useEffect(() => {
		let isMounted = true;

		async function fetchUsers() {
			try {
				const data = await getUsers();
				if (isMounted) {
					setUsers(Array.isArray(data) ? data : []);
					setStatus("success");
				}
			} catch (error) {
				console.error("Error al obtener usuarios:", error);
				if (isMounted) {
					setErrorMessage(
						"No se pudo cargar la información de usuarios. Verifica que el servidor esté disponible.",
					);
					setStatus("error");
				}
			}
		}

		fetchUsers();
		return () => {
			isMounted = false;
		};
	}, []);

	const filteredUsers = users.filter((user) => {
		const term = search.trim().toLowerCase();
		if (!term) return true;
		return [user.nombres, user.apellidos, user.email, user.nombreusuario]
			.filter(Boolean)
			.some((field) => field.toLowerCase().includes(term));
	});

	return (
		<div className="flex min-h-screen flex-col bg-[#f6f3ed] font-['Inter','Segoe_UI',sans-serif] text-[#18332d] md:flex-row">
			<AdminSidebar onLogout={() => navigate("/login")} />
			<main className="mx-auto w-full max-w-[1120px] px-5 py-8 pb-[50px] md:px-[6%] md:py-12 md:pb-[70px]">
				<header className="mb-[26px] flex flex-col gap-4 md:mb-[38px] md:flex-row md:items-end md:justify-between">
					<div>
						<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
							Administración
						</p>
						<h1 className="m-0 font-[Georgia,serif] text-[26px] font-medium leading-tight tracking-[-0.035em] md:text-[32px]">
							Usuarios registrados
						</h1>
					</div>
					<input
						type="text"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						placeholder="Buscar por nombre, correo o usuario"
						className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3 text-xs outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2] md:w-[280px]"
					/>
				</header>

				{status === "loading" && (
					<div className="grid min-h-[150px] place-content-center gap-2 bg-[#fffdf9] text-center text-[#8c9991]">
						<p className="m-0 text-xs">Cargando usuarios…</p>
					</div>
				)}

				{status === "error" && (
					<div className="grid min-h-[150px] place-content-center gap-2 bg-[#fffdf9] px-6 text-center text-[#ad5d4b]">
						<strong className="font-[Georgia,serif] text-base">
							No se pudo cargar la información
						</strong>
						<p className="m-0 text-[11px]">{errorMessage}</p>
					</div>
				)}

				{status === "success" && filteredUsers.length === 0 && (
					<div className="grid min-h-[150px] place-content-center gap-2 bg-[#fffdf9] text-center text-[#8c9991]">
						<strong className="font-[Georgia,serif] text-base text-[#375148]">
							No hay usuarios para mostrar
						</strong>
						<p className="m-0 text-[11px]">
							{search
								? "Intenta con otro término de búsqueda."
								: "Aún no hay usuarios registrados en la biblioteca."}
						</p>
					</div>
				)}

				{status === "success" && filteredUsers.length > 0 && (
					<div className="overflow-x-auto bg-[#fffdf9]">
						<table className="w-full min-w-[820px] border-collapse">
							<thead>
								<tr>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										NOMBRE
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										USUARIO
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										CORREO
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										CÉDULA
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										CELULAR
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										ROL
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										REGISTRO
									</th>
									<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
										ESTADO
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((user) => (
									<tr key={user.id ?? user.email}>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{user.nombres} {user.apellidos}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{user.nombreusuario}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{user.email}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{user.cc}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{user.celular}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b] capitalize">
											{user.rol}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
											{formatDate(user.fecharegistro)}
										</td>
										<td className="border-b border-[#f0eee8] px-5 py-4">
											<StatusBadge active={Boolean(Number(user.activo))} />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</main>
		</div>
	);
}

export default UsersDashboard;