import { BookOpen } from "@phosphor-icons/react";
import ReaderLayout from "../components/layout/ReaderLayout.jsx";
import { cn } from "../utils/cn.js";
import { formatToday } from "../utils/format.js";

const statusTones = {
	green: "bg-pine-100 text-pine-800",
	blue: "bg-sand-200 text-pine-900",
};

const summary = [
	{ label: "Préstamos activos", value: "0" },
	{ label: "Por devolver", value: "0", unit: "días" },
	{ label: "Libros leídos", value: "0" },
];

export function LoanTable({ compact = false, rows = [] }) {
	const visibleLoans = compact ? rows.slice(0, 3) : rows;

	if (!visibleLoans.length) {
		return (
			<div className="grid place-items-center gap-3 rounded-[24px] bg-sand-50 px-6 py-14 text-center shadow-[inset_0_0_0_1px_var(--color-sand-200)]">
				<span className="grid size-12 place-items-center rounded-2xl bg-pine-900 text-honey-300">
					<BookOpen aria-hidden="true" className="size-6" />
				</span>
				<strong className="font-display text-xl font-extrabold tracking-[-0.03em] text-pine-950">
					Aún no tienes préstamos
				</strong>
				<p className="max-w-xs text-sm text-ink-soft">
					Cuando solicites un libro, aparecerá aquí con su fecha de devolución.
				</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto rounded-[24px] bg-sand-50 shadow-[inset_0_0_0_1px_var(--color-sand-200)]">
			<table className="w-full min-w-[40rem] border-collapse text-left">
				<thead>
					<tr className="text-xs font-semibold text-ink-soft">
						<th className="px-6 py-4">Libro</th>
						<th className="px-6 py-4">Fecha de préstamo</th>
						<th className="px-6 py-4">Devolución</th>
						<th className="px-6 py-4">Estado</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-sand-200">
					{visibleLoans.map((loan) => (
						<tr key={loan.title}>
							<td className="px-6 py-4 text-sm font-medium text-pine-950">
								{loan.title}
							</td>
							<td className="px-6 py-4 text-sm text-ink-soft tabular-nums">
								{loan.date}
							</td>
							<td className="px-6 py-4 text-sm text-ink-soft tabular-nums">
								{loan.due}
							</td>
							<td className="px-6 py-4">
								<span
									className={cn(
										"inline-block rounded-md px-2.5 py-1 text-xs font-semibold",
										statusTones[loan.tone] ?? "bg-clay-50 text-clay-700",
									)}
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
		<ReaderLayout onLogout={onLogout}>
			<header className="pt-6 motion-safe:animate-rise">
				<p className="text-sm font-medium text-ink-soft">{formatToday()}</p>
				<h1 className="mt-3 font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[0.94] font-extrabold tracking-[-0.045em] text-pine-950">
					Mis lecturas
				</h1>
			</header>

			<section className="grain relative isolate mt-10 overflow-hidden rounded-[28px] bg-pine-900 px-7 py-12 text-sand-50 md:px-12 md:py-16">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-20 -bottom-24 size-80 rounded-full border border-honey-400/30 shadow-[0_0_0_40px_rgb(217_165_90/0.05)] md:size-[26rem]"
				/>
				<p className="relative text-sm font-semibold text-honey-300">
					Tu rincón de lectura
				</p>
				<h2 className="relative mt-3 max-w-lg font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
					Una página más, un mundo nuevo.
				</h2>
				<p className="relative mt-4 max-w-md text-[15px] text-pine-200">
					Continúa explorando historias que te están esperando.
				</p>
			</section>

			<section
				aria-label="Resumen de tu actividad"
				className="mt-3 grid gap-px overflow-hidden rounded-[28px] bg-sand-200 sm:grid-cols-3"
			>
				{summary.map((item) => (
					<div key={item.label} className="bg-sand-50 px-6 py-7">
						<p className="text-sm text-ink-soft">{item.label}</p>
						<p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-pine-950">
							{item.value}
							{item.unit && (
								<span className="ml-1.5 text-sm font-medium text-ink-soft">
									{item.unit}
								</span>
							)}
						</p>
					</div>
				))}
			</section>

			<section className="mt-12">
				<h2 className="font-display text-2xl font-extrabold tracking-[-0.035em] text-pine-950">
					Mis préstamos
				</h2>
				<div className="mt-5">
					<LoanTable compact />
				</div>
			</section>
		</ReaderLayout>
	);
}

export default Dashboard;
