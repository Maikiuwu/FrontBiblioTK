const loans = [];

export function Sidebar({ onLogout }) {
	return (
		<aside className="flex h-full w-64 shrink-0 flex-col bg-slate-900 text-white">
			{/* Brand */}
			<div className="flex items-center gap-3 border-b border-slate-700 px-6 py-5">
				<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-bold">
					BT
				</span>
				<span className="text-lg font-semibold">BiblioTK</span>
			</div>

			{/* Nav */}
			<nav className="flex-1 px-3 py-4">
				<button className="w-full rounded-lg bg-indigo-600 px-3 py-2.5 text-left text-sm font-medium text-white">
					Resumen
				</button>
			</nav>

			{/* Profile + logout */}
			<div className="space-y-3 border-t border-slate-700 px-4 py-4">
				<div className="flex items-center gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold">
						MG
					</div>
					<div>
						<p className="text-sm font-semibold">María González</p>
						<p className="text-xs text-slate-400">Lectora</p>
					</div>
				</div>
				<button
					onClick={onLogout}
					className="px-1 text-sm text-slate-400 transition-colors hover:text-white"
				>
					Cerrar sesión
				</button>
			</div>
		</aside>
	);
}

export function LoanTable({ compact = false, rows = loans }) {
	const visibleLoans = compact ? rows.slice(0, 3) : rows;

	const toneClass = {
		green: "bg-emerald-100 text-emerald-700",
		yellow: "bg-amber-100 text-amber-700",
		red: "bg-red-100 text-red-700",
	};

	if (!visibleLoans.length)
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
				<p className="font-semibold text-slate-700">Aún no tienes préstamos</p>
				<p className="mt-1 text-sm">
					Cuando solicites un libro, aparecerá aquí.
				</p>
			</div>
		);

	return (
		<div className="overflow-x-auto rounded-xl border border-slate-200">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-slate-200 bg-slate-50">
						{["Libro", "Fecha de préstamo", "Devolución", "Estado"].map((h) => (
							<th
								key={h}
								className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
							>
								{h}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
					{visibleLoans.map((loan) => (
						<tr
							key={loan.title}
							className="transition-colors hover:bg-slate-50"
						>
							<td className="px-4 py-3 font-medium text-slate-800">
								{loan.title}
							</td>
							<td className="px-4 py-3 text-slate-600">{loan.date}</td>
							<td className="px-4 py-3 text-slate-600">{loan.due}</td>
							<td className="px-4 py-3">
								<span
									className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
										toneClass[loan.tone] ?? "bg-slate-100 text-slate-700"
									}`}
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

function Dashboard() {
	return (
		<div className="flex-1 overflow-y-auto bg-gray-50">
			{/* Topbar */}
			<header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-6">
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
						Martes, 12 de marzo de 2024
					</p>
					<h1 className="mt-0.5 text-2xl font-bold text-slate-900">
						Buenos días, María
					</h1>
				</div>
				<button
					className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white"
					aria-label="Notificaciones"
				>
					2
				</button>
			</header>

			<div className="space-y-6 px-8 py-6">
				{/* Welcome banner */}
				<section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 px-8 py-8 text-white">
					<p className="text-xs font-semibold uppercase tracking-widest text-indigo-200">
						Tu rincón de lectura
					</p>
					<h2 className="mt-2 text-3xl font-bold leading-snug">
						Una página más,
						<br />
						un mundo nuevo.
					</h2>
					<p className="mt-2 text-sm text-indigo-200">
						Continúa explorando historias que te están esperando.
					</p>
				</section>

				{/* Stats */}
				<div className="grid grid-cols-3 gap-4">
					{[
						{ label: "Préstamos activos", value: "00" },
						{ label: "Por devolver", value: "00", suffix: "días" },
						{ label: "Libros leídos", value: "00" },
					].map(({ label, value, suffix }) => (
						<article
							key={label}
							className="rounded-xl border border-slate-200 bg-white px-6 py-5"
						>
							<p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
								{label}
							</p>
							<p className="mt-2 text-4xl font-bold text-slate-900">
								{value}
								{suffix && (
									<span className="ml-1 text-base font-medium text-slate-400">
										{suffix}
									</span>
								)}
							</p>
						</article>
					))}
				</div>

				{/* Loans */}
				<section>
					<div className="mb-4">
						<p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
							Actividad reciente
						</p>
						<h2 className="mt-0.5 text-xl font-bold text-slate-900">
							Mis préstamos
						</h2>
					</div>
					<LoanTable compact />
				</section>
			</div>
		</div>
	);
}

export default Dashboard;
