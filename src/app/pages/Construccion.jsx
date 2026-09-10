import { useNavigate } from "react-router-dom";

function Construccion({ onLogout }) {
	const navigate = useNavigate();

	return (
		<main className="grid min-h-screen place-items-center bg-[#f6f3ed] px-5 font-['Inter','Segoe_UI',sans-serif] text-[#18332d]">
			<section className="w-full max-w-[520px] bg-[#fffdf9] px-7 py-10 text-center shadow-[0_18px_50px_rgba(38,63,53,0.08)]">
				<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
					BiblioTK
				</p>
				<h1 className="m-0 font-[Georgia,serif] text-[30px] font-medium text-[#173c33]">
					Página en construcción
				</h1>
				<p className="mt-3 text-sm leading-relaxed text-[#718079]">
					Tu cuenta está activa, pero esta sección todavía no está disponible.
				</p>
				<div className="mt-7 flex justify-center gap-3">
					<button
						type="button"
						className="border-0 bg-[#295c4e] px-4 py-3 text-xs font-bold text-white hover:bg-[#173c33]"
						onClick={() => navigate("/login")}
					>
						Volver
					</button>
					<button
						type="button"
						className="border border-[#d7d8ce] bg-transparent px-4 py-3 text-xs font-bold text-[#375148] hover:border-[#a77a46]"
						onClick={onLogout}
					>
						Cerrar sesión
					</button>
				</div>
			</section>
		</main>
	);
}

export default Construccion;
