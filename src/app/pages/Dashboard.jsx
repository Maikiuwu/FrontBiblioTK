const loans = [];

export function Sidebar({ onLogout }) {
	return (
		<aside className="flex w-full flex-none flex-col bg-[#173c33] p-[18px_20px] text-[#f7f3eb] md:w-[255px] md:p-[37px_23px_25px]">
			<div className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em]">
				<span className="grid size-[34px] place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
					BT
				</span>
				<span>BiblioTK</span>
			</div>
			<nav className="mt-[25px] flex gap-2 md:mt-[85px] md:grid">
				<button className="flex flex-1 items-center gap-[13px] rounded border-0 bg-[#285b4b] px-3.5 py-[13px] text-left text-xs text-[#f8f1e5] md:flex-none">
					Resumen
				</button>
			</nav>
			<div className="mt-auto hidden md:block">
				<div className="mb-[23px] flex items-center gap-2.5 border-b border-[#376253] px-[7px] pb-[22px]">
					<div className="grid size-[34px] place-items-center rounded-full bg-[#c28b4e] text-[10px] font-bold text-white">
						MG
					</div>
					<div>
						<strong className="block text-[11px] text-[#f2f1e9]">
							María González
						</strong>
						<small className="mt-0.5 block text-[10px] text-[#8fa99d]">
							Lectora
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
		</aside>
	);
}

export function LoanTable({ compact = false, rows = loans }) {
	const visibleLoans = compact ? rows.slice(0, 3) : rows;
	if (!visibleLoans.length)
		return (
			<div className="grid min-h-[150px] place-content-center gap-2 bg-[#fffdf9] text-center text-[#8c9991]">
				<strong className="font-[Georgia,serif] text-base text-[#375148]">
					Aún no tienes préstamos
				</strong>
				<p className="m-0 text-[11px]">
					Cuando solicites un libro, aparecerá aquí.
				</p>
			</div>
		);
	return (
		<div className="overflow-x-auto bg-[#fffdf9]">
			<table className="w-full min-w-[650px] border-collapse">
				<thead>
					<tr>
						<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
							LIBRO
						</th>
						<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
							FECHA DE PRÉSTAMO
						</th>
						<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
							DEVOLUCIÓN
						</th>
						<th className="border-b border-[#ebe8df] px-5 py-[15px] text-left text-[9px] tracking-[0.1em] text-[#a1a79f]">
							ESTADO
						</th>
					</tr>
				</thead>
				<tbody>
					{visibleLoans.map((loan) => (
						<tr key={loan.title}>
							<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
								{loan.title}
							</td>
							<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
								{loan.date}
							</td>
							<td className="border-b border-[#f0eee8] px-5 py-4 text-[11px] text-[#64736b]">
								{loan.due}
							</td>
							<td>
								<span
									className={`inline-block rounded-full px-2.5 py-1.5 text-[9px] font-bold ${loan.tone === "green" ? "bg-[#dcebe0] text-[#357358]" : loan.tone === "blue" ? "bg-[#e0eaf0] text-[#4d7290]" : "bg-[#f5ded8] text-[#ad5d4b]"}`}
								>
									{loan.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Dashboard({ onLogout }) {
	return (
		<div className="mx-auto w-full max-w-[1120px] px-5 py-8 pb-[50px] md:px-[6%] md:py-12 md:pb-[70px]">
			<header className="mb-[27px] flex items-start justify-between md:mb-[38px]">
				<div>
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Martes, 12 de marzo de 2024
					</p>
					<h1 className="m-0 font-[Georgia,serif] text-[26px] font-medium leading-tight tracking-[-0.035em] md:text-[32px]">
						Buenos días, María
					</h1>
				</div>
				<button
					type="button"
					className="border-0 bg-transparent px-0 text-xs font-bold text-[#a77a46] hover:underline"
					onClick={onLogout}
				>
					Cerrar sesión
				</button>
			</header>
			<section className="mb-[26px] min-h-[198px] bg-[#295c4e] px-[25px] py-7 text-[#f5f3e7] md:px-[39px] md:py-[33px]">
				<div>
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e0b46f]">
						Tu rincón de lectura
					</p>
					<h2 className="m-0 mb-[11px] font-[Georgia,serif] text-[31px] font-medium leading-[1.08]">
						Una página más,
						<br />
						un mundo nuevo.
					</h2>
					<p className="m-0 text-xs text-[#bed2c5]">
						Continúa explorando historias que te están esperando.
					</p>
				</div>
			</section>
			<div className="mb-[35px] grid gap-2 md:mb-[50px] md:grid-cols-3 md:gap-4">
				<article className="bg-[#fffdf9] px-[17px] py-[13px] md:px-5 md:py-[18px]">
					<div>
						<small className="block text-[10px] text-[#78867f]">
							Préstamos activos
						</small>
						<strong className="mt-1 block font-[Georgia,serif] text-2xl font-semibold text-[#18332d]">
							00
						</strong>
					</div>
				</article>
				<article className="bg-[#fffdf9] px-[17px] py-[13px] md:px-5 md:py-[18px]">
					<div>
						<small className="block text-[10px] text-[#78867f]">
							Por devolver
						</small>
						<strong className="mt-1 block font-[Georgia,serif] text-2xl font-semibold text-[#18332d]">
							00{" "}
							<small className="inline font-['Trebuchet_MS',sans-serif] text-[11px]">
								días
							</small>
						</strong>
					</div>
				</article>
				<article className="bg-[#fffdf9] px-[17px] py-[13px] md:px-5 md:py-[18px]">
					<div>
						<small className="block text-[10px] text-[#78867f]">
							Libros leídos
						</small>
						<strong className="mt-1 block font-[Georgia,serif] text-2xl font-semibold text-[#18332d]">
							00
						</strong>
					</div>
				</article>
			</div>
			<section className="mb-[19px] flex items-end justify-between">
				<div>
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Actividad reciente
					</p>
					<h2 className="m-0 font-[Georgia,serif] text-[25px] font-medium">
						Mis préstamos
					</h2>
				</div>
			</section>
			<LoanTable compact />
		</div>
	);
}

export default Dashboard;
