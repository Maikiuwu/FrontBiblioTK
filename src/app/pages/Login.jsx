import { useState } from "react";

function Login({ onLogin, onRegister }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		onLogin(email || "María González");
	}

	return (
		<main className="grid min-h-screen bg-[#f6f3ed] font-['Inter','Segoe_UI',sans-serif] text-[#18332d] md:grid-cols-[minmax(420px,46%)_1fr]">
			<section className="relative flex min-h-[285px] flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#173c33_0%,#255c4e_58%,#5b7760_100%)] px-[8%] py-7 text-[#f7f3eb] after:absolute after:-bottom-36 after:-right-20 after:size-[390px] after:rounded-full after:border after:border-[#deb36f]/30 after:shadow-[0_0_0_34px_rgba(222,179,111,0.08),0_0_0_70px_rgba(222,179,111,0.06)] md:min-h-0 md:px-[9%] md:py-[42px]">
				<div className="relative z-10 flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em] max-md:hidden">
					<span className="grid size-[34px] place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
						BT
					</span>
					<span>BiblioTK</span>
				</div>
				<div className="relative z-10 my-auto">
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Tu biblioteca, siempre contigo
					</p>
					<h1 className="m-0 mb-[22px] max-w-[680px] font-[Georgia,serif] text-[39px] font-medium leading-[0.98] tracking-[-0.045em] md:text-[clamp(42px,5vw,69px)]">
						El placer de
						<br />
						<em className="text-[#e3b56e]">encontrar</em> una
						<br />
						buena historia.
					</h1>
					<p className="hidden max-w-[280px] text-sm leading-[1.7] text-[#ccded3] md:block">
						Gestiona tus lecturas y descubre tu próxima aventura.
					</p>
				</div>
				<div className="relative z-10 hidden text-[10px] font-bold uppercase leading-[1.8] tracking-[0.18em] text-[#ddb36a] md:block">
					EST. 2024
					<br />
					<span className="text-[8px] text-[#bdd2c5]">LIBRARY CLUB</span>
				</div>
			</section>
			<section className="mx-auto flex w-auto max-w-[410px] flex-col justify-center px-[8%] py-[34px] md:w-[75%] md:px-0 md:py-[50px]">
				<div className="mb-[42px] flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em] text-[#173c33] md:hidden">
					<span className="grid size-[34px] place-items-center rounded-full border border-[#a77a46] text-[#a77a46]">
						BT
					</span>
					<span>BiblioTK</span>
				</div>
				<div className="mb-[35px]">
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Bienvenido de vuelta
					</p>
					<h2 className="m-0 font-[Georgia,serif] text-[35px] font-medium leading-[1.1] tracking-[-0.035em]">
						Inicia sesión
					</h2>
					<p className="mt-2.5 text-sm text-[#718079]">
						Accede a tu espacio personal de lectura.
					</p>
				</div>
				<form onSubmit={handleSubmit} className="grid gap-5">
					<label className="grid gap-2 text-xs font-bold text-[#375148]">
						Correo electrónico
						<input
							type="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="tu@correo.com"
							className="w-full rounded-[3px] border border-[#d7d8ce] bg-[#fffdf9] px-[15px] py-3.5 text-sm text-[#18332d] outline-none transition-[border,box-shadow] placeholder:text-[#87958d] focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
							required
						/>
					</label>
					<label className="grid gap-2 text-xs font-bold text-[#375148]">
						Contraseña
						<input
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="••••••••"
							className="w-full rounded-[3px] border border-[#d7d8ce] bg-[#fffdf9] px-[15px] py-3.5 text-sm text-[#18332d] outline-none transition-[border,box-shadow] placeholder:text-[#87958d] focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
							required
						/>
					</label>
					<div className="-mt-1 flex items-center justify-between text-[11px] text-[#78867f]">
						<label className="flex items-center gap-1.5">
							<input type="checkbox" className="accent-[#28634f]" /> Recordarme
						</label>
						<a
							className="font-bold text-[#a77a46] no-underline hover:underline"
							href="#recover"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>
					<button
						className="flex items-center justify-center border-0 rounded-[3px] bg-[#c28b4e] px-[15px] py-[15px] text-white font-bold transition hover:-translate-y-0.5 hover:bg-[#a8733c]"
						type="submit"
					>
						Entrar
					</button>
				</form>
				<p className="mt-[35px] text-center text-xs text-[#859089]">
					¿Aún no tienes una cuenta?{" "}
					<button
						type="button"
						className="border-0 bg-transparent p-0 font-bold text-[#a77a46] hover:underline"
						onClick={onRegister}
					>
						Solicita acceso
					</button>
				</p>
			</section>
		</main>
	);
}

export default Login;
