import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminStats } from "../../service/StatsService.js";

const todayLabel = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});

const menuOptions = [
    {
        title: "Usuarios",
        description:
            "Consulta la información de todos los usuarios registrados en la biblioteca.",
        path: "/admin/usuarios",
        available: true,
    },
    {
        title: "Libros",
        description: "Administra el catálogo de libros disponibles.",
        path: null,
        available: false,
    },
    {
        title: "Préstamos",
        description: "Supervisa los préstamos activos y su historial.",
        path: null,
        available: false,
    },
    {
        title: "Reportes",
        description: "Genera reportes de actividad de la biblioteca.",
        path: null,
        available: false,
    },
];

function StatCard({ label, value, loading }) {
    return (
        <article className="bg-[#fffdf9] px-[17px] py-[13px] md:px-5 md:py-[18px]">
            <div>
                <small className="block text-[10px] text-[#78867f]">{label}</small>
                <strong className="mt-1 block font-[Georgia,serif] text-2xl font-semibold text-[#18332d]">
                    {loading ? "—" : (value ?? "--")}
                </strong>
            </div>
        </article>
    );
}

function AdminHome({ onLogout }) {
    const navigate = useNavigate();
    const [stats, setStats] = useState({});
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        async function fetchStats() {
            try {
                const data = await getAdminStats();
                if (isMounted) setStats(data || {});
            } catch (error) {
                // No bloquea la vista si aún no existe el endpoint;
                // las tarjetas simplemente muestran "--".
                console.error("Error al obtener estadísticas:", error);
            } finally {
                if (isMounted) setStatsLoading(false);
            }
        }

        fetchStats();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[#f6f3ed] font-['Inter','Segoe_UI',sans-serif] text-[#18332d] md:flex-row">
            <AdminSidebar onLogout={onLogout} />
            <main className="mx-auto w-full max-w-[1120px] px-5 py-8 pb-[50px] md:px-[6%] md:py-12 md:pb-[70px]">
                <header className="mb-[27px] md:mb-[38px]">
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
                        {todayLabel}
                    </p>
                    <h1 className="m-0 font-[Georgia,serif] text-[26px] font-medium leading-tight tracking-[-0.035em] md:text-[32px]">
                        Panel de administración
                    </h1>
                    <p className="mt-2.5 text-sm text-[#718079]">
                        Selecciona una sección para comenzar a gestionar la biblioteca.
                    </p>
                </header>

                <div className="mb-[35px] grid gap-2 md:mb-[50px] md:grid-cols-3 md:gap-4">
                    <StatCard
                        label="Total usuarios"
                        value={stats.totalUsuarios}
                        loading={statsLoading}
                    />
                    <StatCard
                        label="Administradores"
                        value={stats.administradores}
                        loading={statsLoading}
                    />
                    <StatCard
                        label="Usuarios activos"
                        value={stats.usuariosActivos}
                        loading={statsLoading}
                    />
                </div>

                <section className="grid gap-4 sm:grid-cols-2">
                    {menuOptions.map((option) => (
                        <button
                            key={option.title}
                            type="button"
                            disabled={!option.available}
                            onClick={() => option.path && navigate(option.path)}
                            className={`flex flex-col items-start gap-3 border-0 bg-[#fffdf9] px-6 py-6 text-left shadow-[0_10px_30px_rgba(38,63,53,0.05)] transition ${option.available
                                ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(38,63,53,0.1)]"
                                : "cursor-not-allowed opacity-60"
                                }`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <h2 className="m-0 font-[Georgia,serif] text-xl font-medium text-[#173c33]">
                                    {option.title}
                                </h2>
                                {!option.available && (
                                    <span className="rounded-full bg-[#f0eee8] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#a1a79f]">
                                        Próximamente
                                    </span>
                                )}
                            </div>
                            <p className="m-0 text-xs leading-relaxed text-[#718079]">
                                {option.description}
                            </p>
                        </button>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default AdminHome;