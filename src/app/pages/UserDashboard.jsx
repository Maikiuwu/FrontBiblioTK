import { useEffect, useMemo, useState } from "react";
import { getUserRoleStats } from "../../service/UserService.js";
import AdminSidebar from "../components/AdminSidebar.jsx";

const roleColors = {
	admin: "#c28b4e",
	usuario: "#3d7966",
	superadmin: "#6d7f91",
};

const roleLabels = {
	admin: "Administradores",
	usuario: "Usuarios",
	superadmin: "Super administradores",
};

const todayLabel = new Date().toLocaleDateString("es-ES", {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
});

function UserDashboard({ onLogout }) {
	const [roleStats, setRoleStats] = useState({
		admin: 0,
		usuario: 0,
		superadmin: 0,
	});
	const [status, setStatus] = useState("loading");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		let isMounted = true;

		getUserRoleStats()
			.then((data) => {
				if (!isMounted) return;
				setRoleStats({
					admin: Number(data?.roles?.admin ?? 0),
					usuario: Number(data?.roles?.usuario ?? 0),
					superadmin: Number(data?.roles?.superadmin ?? 0),
				});
				setStatus("success");
			})
			.catch((error) => {
				if (!isMounted) return;
				console.error("Error al obtener roles:", error);
				setErrorMessage(error.message);
				setStatus("error");
			});

		return () => {
			isMounted = false;
		};
	}, []);

	const totalUsers = useMemo(
		() => Object.values(roleStats).reduce((total, value) => total + value, 0),
		[roleStats],
	);

	const segments = useMemo(() => {
		let currentAngle = 0;
		return Object.entries(roleStats).map(([role, value]) => {
			const start = currentAngle;
			const angle = totalUsers ? (value / totalUsers) * 360 : 0;
			currentAngle += angle;
			return {
				role,
				value,
				start,
				end: currentAngle,
			};
		});
	}, [roleStats, totalUsers]);

	const chartBackground = totalUsers
		? `conic-gradient(${segments
				.map(
					(segment) =>
						`${roleColors[segment.role]} ${segment.start}deg ${segment.end}deg`,
				)
				.join(", ")})`
		: "#d7d8ce";

	return (
		<div className="flex min-h-screen flex-col bg-[#f6f3ed] font-['Inter','Segoe_UI',sans-serif] text-[#18332d] md:flex-row">
			<AdminSidebar onLogout={onLogout} />
			<main className="mx-auto w-full max-w-[1120px] px-5 py-8 pb-[50px] md:px-[6%] md:py-12 md:pb-[70px]">
				<header className="mb-[27px] md:mb-[38px]">
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						{todayLabel}
					</p>
					<h1 className="m-0 font-[Georgia,serif] text-[26px] font-medium leading-tight tracking-[-0.035em] md:text-[32px]">
						Usuarios registrados
					</h1>
					<p className="mt-2.5 text-sm text-[#718079]">
						Consulta la distribución de usuarios según su rol en la biblioteca.
					</p>
				</header>

				{status === "loading" && (
					<div className="bg-[#fffdf9] p-8 text-sm text-[#718079] shadow-[0_10px_30px_rgba(38,63,53,0.05)]">
						Cargando distribución de usuarios...
					</div>
				)}

				{status === "error" && (
					<div
						role="alert"
						className="bg-[#fffdf9] p-8 text-sm text-[#ad5d4b] shadow-[0_10px_30px_rgba(38,63,53,0.05)]"
					>
						{errorMessage}
					</div>
				)}

				{status === "success" && (
					<section className="grid gap-6 bg-[#fffdf9] p-6 shadow-[0_10px_30px_rgba(38,63,53,0.05)] md:grid-cols-[minmax(250px,360px)_1fr] md:items-center md:p-10">
						<div className="flex flex-col items-center gap-5">
							<div
								className="grid size-56 place-items-center rounded-full"
								style={{ background: chartBackground }}
							>
								<div className="grid size-32 place-items-center rounded-full bg-[#fffdf9] text-center">
									<strong className="block font-[Georgia,serif] text-3xl text-[#18332d]">
										{totalUsers}
									</strong>
									<span className="text-[10px] text-[#78867f]">usuarios</span>
								</div>
							</div>
							<h2 className="m-0 font-[Georgia,serif] text-xl font-medium text-[#173c33]">
								Usuarios por rol
							</h2>
						</div>

						<div className="grid gap-3">
							{segments.map((segment) => (
								<div
									key={segment.role}
									className="flex items-center justify-between border-b border-[#ebe8df] py-3"
								>
									<div className="flex items-center gap-3">
										<span
											className="size-3 rounded-full"
											style={{ backgroundColor: roleColors[segment.role] }}
										/>
										<span className="text-sm text-[#375148]">
											{roleLabels[segment.role]}
										</span>
									</div>
									<strong className="font-[Georgia,serif] text-xl text-[#18332d]">
										{segment.value}
									</strong>
								</div>
							))}
						</div>
					</section>
				)}
			</main>
		</div>
	);
}

export default UserDashboard;
