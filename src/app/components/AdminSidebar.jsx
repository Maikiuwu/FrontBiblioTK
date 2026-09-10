import { useNavigate } from "react-router-dom";

function AdminSidebar({ onLogout }) {
	const navigate = useNavigate();

	return (
		<aside className="flex w-full flex-none flex-col bg-[#173c33] p-[18px_20px] text-[#f7f3eb] md:min-h-screen md:w-[255px] md:p-[37px_23px_25px]">
			<button
				type="button"
				className="flex items-center gap-2.5 border-0 bg-transparent p-0 text-left text-[22px] font-bold tracking-[-0.04em] text-[#f7f3eb]"
				onClick={() => navigate("/admin")}
			>
				<span className="grid size-[34px] place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
					BT
				</span>
				BiblioTK
			</button>
			<nav className="mt-[25px] flex gap-2 md:mt-[85px] md:grid">
				<button
					type="button"
					className="flex flex-1 items-center rounded border-0 bg-[#285b4b] px-3.5 py-[13px] text-left text-xs text-[#f8f1e5] md:flex-none"
					onClick={() => navigate("/admin")}
				>
					Resumen
				</button>
				<button
					type="button"
					className="flex flex-1 items-center rounded border-0 bg-transparent px-3.5 py-[13px] text-left text-xs text-[#8fa99d] hover:text-white md:flex-none"
					onClick={() => navigate("/admin/usuarios")}
				>
					Usuarios
				</button>
			</nav>
			<button
				type="button"
				className="mt-6 border-0 bg-transparent px-[7px] py-[13px] text-left text-xs text-[#8fa99d] hover:text-white md:mt-auto"
				onClick={onLogout}
			>
				Cerrar sesión
			</button>
		</aside>
	);
}

export default AdminSidebar;
