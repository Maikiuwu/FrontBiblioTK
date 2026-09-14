import { ArrowsClockwise, UsersThree } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getUserRoleStats } from "../../service/UserService.js";
import AdminLayout from "../components/layout/AdminLayout.jsx";
import Alert from "../components/ui/Alert.jsx";
import Button from "../components/ui/Button.jsx";
import { cn } from "../utils/cn.js";
import { formatNumber, formatPercent } from "../utils/format.js";

const roles = [
	{ key: "admin", label: "Administradores", markClass: "bg-role-admin" },
	{ key: "usuario", label: "Usuarios", markClass: "bg-role-usuario" },
	{
		key: "superadmin",
		label: "Super administradores",
		markClass: "bg-role-superadmin",
	},
];

function UserDashboard({ onLogout, user }) {
	const [roleStats, setRoleStats] = useState({
		admin: 0,
		usuario: 0,
		superadmin: 0,
	});
	const [status, setStatus] = useState("loading");
	const [errorMessage, setErrorMessage] = useState("");
	const [activeRole, setActiveRole] = useState(null);
	const isMountedRef = useRef(true);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const loadRoleStats = useCallback(() => {
		setStatus("loading");

		getUserRoleStats()
			.then((data) => {
				if (!isMountedRef.current) return;
				setRoleStats({
					admin: Number(data?.roles?.admin ?? 0),
					usuario: Number(data?.roles?.usuario ?? 0),
					superadmin: Number(data?.roles?.superadmin ?? 0),
				});
				setStatus("success");
			})
			.catch((error) => {
				if (!isMountedRef.current) return;
				console.error("Error al obtener roles:", error);
				setErrorMessage(error.message);
				setStatus("error");
			});
	}, []);

	useEffect(() => {
		loadRoleStats();
	}, [loadRoleStats]);

	const totalUsers = useMemo(
		() => Object.values(roleStats).reduce((total, value) => total + value, 0),
		[roleStats],
	);

	const segments = useMemo(() => {
		let start = 0;
		return roles.map((role) => {
			const value = roleStats[role.key] ?? 0;
			const share = totalUsers ? value / totalUsers : 0;
			const center = start + share / 2;
			start += share;
			return { ...role, value, share, center };
		});
	}, [roleStats, totalUsers]);

	const visibleSegments = segments.filter((segment) => segment.value > 0);
	const activeSegment = segments.find((segment) => segment.key === activeRole);

	return (
		<AdminLayout onLogout={onLogout} user={user}>
			<header className="motion-safe:animate-rise">
				<h1 className="font-display text-[clamp(2.5rem,5.5vw,4rem)] leading-[0.94] font-extrabold tracking-[-0.045em] text-pine-950">
					Usuarios registrados
				</h1>
				<p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
					Consulta la distribución de usuarios según su rol en la biblioteca.
				</p>
			</header>

			{status === "loading" && (
				<div
					aria-busy="true"
					className="mt-10 rounded-[28px] bg-sand-50 p-6 shadow-[inset_0_0_0_1px_var(--color-sand-200)] md:p-10"
				>
					<span className="block h-4 w-32 animate-pulse rounded-full bg-sand-200" />
					<span className="mt-5 block h-20 w-44 animate-pulse rounded-2xl bg-sand-200" />
					<span className="mt-8 block h-5 w-full animate-pulse rounded-full bg-sand-200" />
					<div className="mt-8 grid gap-4">
						{roles.map((role) => (
							<span
								key={role.key}
								className="block h-6 w-full animate-pulse rounded-full bg-sand-200"
							/>
						))}
					</div>
					<p className="sr-only">Cargando distribución de usuarios</p>
				</div>
			)}

			{status === "error" && (
				<div className="mt-10 rounded-[28px] bg-sand-50 p-6 shadow-[inset_0_0_0_1px_var(--color-sand-200)] md:p-10">
					<Alert tone="error">
						No se pudieron obtener las estadísticas de usuarios. {errorMessage}
					</Alert>
					<Button className="mt-6" onClick={loadRoleStats}>
						<ArrowsClockwise aria-hidden="true" className="size-[18px]" />
						Reintentar
					</Button>
				</div>
			)}

			{status === "success" && (
				<section className="mt-10 rounded-[28px] bg-sand-50 p-6 shadow-[inset_0_0_0_1px_var(--color-sand-200)] motion-safe:animate-rise md:p-10 [animation-delay:80ms]">
					{totalUsers === 0 ? (
						<div className="grid place-items-center gap-3 py-12 text-center">
							<span className="grid size-12 place-items-center rounded-2xl bg-pine-900 text-honey-300">
								<UsersThree aria-hidden="true" className="size-6" />
							</span>
							<strong className="font-display text-xl font-extrabold tracking-[-0.03em] text-pine-950">
								Aún no hay usuarios registrados
							</strong>
							<p className="max-w-xs text-sm text-ink-soft">
								Cuando alguien cree una cuenta, su rol aparecerá en esta
								distribución.
							</p>
						</div>
					) : (
						<figure className="m-0">
							<figcaption className="text-sm font-medium text-ink-soft">
								Usuarios por rol
							</figcaption>
							<p className="mt-2 text-[clamp(3.25rem,8vw,5rem)] leading-none font-semibold tracking-[-0.045em] text-pine-950">
								{formatNumber(totalUsers)}
							</p>

							<div className="relative mt-10">
								{activeSegment && (
									<div
										role="status"
										style={{ left: `${activeSegment.center * 100}%` }}
										className="pointer-events-none absolute -top-2 z-10 w-max max-w-56 -translate-x-1/2 -translate-y-full rounded-xl bg-pine-950 px-3 py-2 text-sand-50 shadow-[0_14px_30px_-18px_rgb(11_34_28/0.9)]"
									>
										<span className="block text-base font-semibold tabular-nums">
											{formatNumber(activeSegment.value)}{" "}
											<span className="text-sm font-normal text-pine-200">
												({formatPercent(activeSegment.share)})
											</span>
										</span>
										<span className="mt-1 flex items-center gap-2 text-xs text-pine-200">
											<span
												aria-hidden="true"
												className={cn(
													"h-0.5 w-4 rounded-full",
													activeSegment.markClass,
												)}
											/>
											{activeSegment.label}
										</span>
									</div>
								)}

								<div className="flex h-10 items-center gap-0.5">
									{visibleSegments.map((segment, index) => (
										<button
											key={segment.key}
											type="button"
											style={{
												flexGrow: segment.value,
												flexBasis: 0,
												minWidth: "0.5rem",
												animationDelay: `${index * 70}ms`,
											}}
											onPointerEnter={() => setActiveRole(segment.key)}
											onPointerLeave={() => setActiveRole(null)}
											onFocus={() => setActiveRole(segment.key)}
											onBlur={() => setActiveRole(null)}
											onClick={() =>
												setActiveRole((current) =>
													current === segment.key ? null : segment.key,
												)
											}
											aria-label={`${segment.label}: ${formatNumber(segment.value)} (${formatPercent(segment.share)})`}
											className="group flex h-10 items-center rounded-sm"
										>
											<span
												aria-hidden="true"
												className={cn(
													"h-5 w-full origin-left transition-[height] duration-150 ease-out-strong group-hover:h-6 group-focus-visible:h-6 motion-safe:animate-grow-x",
													segment.markClass,
													index === 0 && "rounded-l",
													index === visibleSegments.length - 1 && "rounded-r",
												)}
											/>
										</button>
									))}
								</div>
							</div>

							<ul className="mt-8 divide-y divide-sand-200">
								{segments.map((segment) => (
									<li
										key={segment.key}
										className="flex items-center justify-between gap-4 py-4"
									>
										<span className="flex items-center gap-3">
											<span
												aria-hidden="true"
												className={cn(
													"size-3 shrink-0 rounded-sm",
													segment.markClass,
												)}
											/>
											<span className="text-[15px] text-pine-900">
												{segment.label}
											</span>
										</span>
										<span className="flex items-baseline gap-3">
											<span className="text-sm text-ink-soft tabular-nums">
												{formatPercent(segment.share)}
											</span>
											<span className="min-w-16 text-right font-display text-2xl font-extrabold tracking-[-0.03em] text-pine-950 tabular-nums">
												{formatNumber(segment.value)}
											</span>
										</span>
									</li>
								))}
							</ul>
						</figure>
					)}
				</section>
			)}
		</AdminLayout>
	);
}

export default UserDashboard;
