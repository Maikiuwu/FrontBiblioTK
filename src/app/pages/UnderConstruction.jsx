import { useNavigate } from "react-router-dom";

function UnderConstruction({ onLogout }) {
    const navigate = useNavigate();

    return (
        <main className="grid min-h-screen place-items-center bg-[#f6f3ed] px-5 py-10 font-['Inter','Segoe_UI',sans-serif] text-[#18332d]">
            <section className="relative flex w-full max-w-[520px] flex-col items-center gap-6 overflow-hidden bg-[linear-gradient(145deg,#173c33_0%,#255c4e_58%,#5b7760_100%)] px-[8%] py-14 text-center text-[#f7f3eb] after:absolute after:-bottom-36 after:-right-20 after:size-[390px] after:rounded-full after:border after:border-[#deb36f]/30 after:shadow-[0_0_0_34px_rgba(222,179,111,0.08),0_0_0_70px_rgba(222,179,111,0.06)]">
                <div className="relative z-10 flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em]">
                    <span className="grid size-[34px] place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
                        BT
                    </span>
                    <span>BiblioTK</span>
                </div>
                <div className="relative z-10">
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e0b46f]">
                        Estamos trabajando en esto
                    </p>
                    <h1 className="m-0 mb-3 font-[Georgia,serif] text-[28px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[34px]">
                        Tu espacio de lectura
                        <br />
                        está en construcción
                    </h1>
                    <p className="m-0 max-w-[340px] text-sm leading-[1.7] text-[#ccded3]">
                        Muy pronto podrás gestionar tus préstamos y descubrir nuevas
                        historias desde aquí.
                    </p>
                </div>
                <button
                    type="button"
                    className="relative z-10 border-0 bg-[#c28b4e] px-6 py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a8733c]"
                    onClick={onLogout}
                >
                    Cerrar sesión
                </button>
            </section>
        </main>
    );
}

export default UnderConstruction;