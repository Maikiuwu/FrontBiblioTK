<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
	{ label: "Resumen", path: "/admin" },
	{ label: "Usuarios", path: "/admin/usuarios" },
];

function AdminSidebar({ onLogout }) {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<aside className="flex w-full flex-none flex-col bg-[#173c33] p-[18px_20px] text-[#f7f3eb] md:w-[255px] md:p-[37px_23px_25px]">
			<div className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em]">
				<span className="grid size-[34px] place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
					BT
				</span>
				<span>BiblioTK</span>
			</div>
			<nav className="mt-[25px] flex gap-2 md:mt-[85px] md:grid">
				{navItems.map((item) => {
					const isActive = location.pathname === item.path;
					return (
						<button
							key={item.path}
							type="button"
							onClick={() => navigate(item.path)}
							className={`flex flex-1 items-center gap-[13px] rounded border-0 px-3.5 py-[13px] text-left text-xs md:flex-none ${
								isActive
									? "bg-[#285b4b] text-[#f8f1e5]"
									: "bg-transparent text-[#bed2c5] hover:bg-[#1f4b3f]"
							}`}
						>
							{item.label}
						</button>
					);
				})}
			</nav>
			<div className="mt-auto hidden md:block">
				<div className="mb-[23px] flex items-center gap-2.5 border-b border-[#376253] px-[7px] pb-[22px]">
					<div className="grid size-[34px] place-items-center rounded-full bg-[#c28b4e] text-[10px] font-bold text-white">
						AD
					</div>
					<div>
						<strong className="block text-[11px] text-[#f2f1e9]">
							Administrador
						</strong>
						<small className="mt-0.5 block text-[10px] text-[#8fa99d]">
							Panel de gestión
						</small>
					</div>
				</div>
				<button
					className="border-0 bg-transparent px-[7px] py-[13px] text-xs text-[#8fa99d] hover:text-white"
					onClick={onLogout}
				>
					Cerrar sesión
				</button>
			</div>
=======
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
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
		</aside>
	);
}

<<<<<<< HEAD
export default AdminSidebar;
=======
export default AdminSidebar;
>>>>>>> 8fea78522a336ce9d9b33fb80054be075e11eb89
