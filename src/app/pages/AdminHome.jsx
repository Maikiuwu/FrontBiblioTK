import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";

function AdminHome({ onLogout }) {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col bg-[#f6f3ed] font-['Inter','Segoe_UI',sans-serif] text-[#18332d] md:flex-row">
			<AdminSidebar onLogout={onLogout} />
			<main className="mx-auto w-full max-w-[1120px] px-5 py-8 md:px-[6%] md:py-12">
				<header className="mb-8">
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Administración
					</p>
					<h1 className="m-0 font-[Georgia,serif] text-[30px] font-medium text-[#173c33]">
						Panel de administración
					</h1>
					<p className="mt-2.5 text-sm text-[#718079]">
						Selecciona una sección para gestionar la biblioteca.
					</p>
				</header>

				<section className="grid gap-4 sm:grid-cols-2">
					<button
						type="button"
						onClick={() => navigate("/admin/usuarios")}
						className="flex flex-col items-start gap-3 border-0 bg-[#fffdf9] px-6 py-6 text-left shadow-[0_10px_30px_rgba(38,63,53,0.05)] transition hover:-translate-y-0.5"
					>
						<h2 className="m-0 font-[Georgia,serif] text-xl font-medium text-[#173c33]">
							Usuarios
						</h2>
						<p className="m-0 text-xs leading-relaxed text-[#718079]">
							Consulta la información y distribución de roles de los usuarios.
						</p>
					</button>
				</section>
			</main>
		</div>
	);
}

export default AdminHome;
