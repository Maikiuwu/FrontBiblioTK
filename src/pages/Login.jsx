import { useState } from "react";

function Login({ onLogin, onRegister }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		onLogin(email || "María González");
	}

	return (
		<main className="flex min-h-screen">
			{/* Art panel */}
			<section
				className="hidden flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 p-12 text-white lg:flex lg:w-1/2"
				aria-label="Biblioteca BiblioTK"
			>
				<div className="flex items-center gap-3">
					<span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500 font-bold">
						BT
					</span>
					<span className="text-lg font-semibold">BiblioTK</span>
				</div>

				<div className="space-y-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
						Tu biblioteca, siempre contigo
					</p>
					<h1 className="text-5xl font-bold leading-tight">
						El placer de
						<br />
						<em className="not-italic text-indigo-300">encontrar</em> una
						<br />
						buena historia.
					</h1>
					<p className="text-sm text-slate-300">
						Gestiona tus lecturas y descubre tu próxima aventura.
					</p>
				</div>

				<p className="font-mono text-xs text-slate-500">
					EST. 2024
					<br />
					<span className="tracking-widest">LIBRARY CLUB</span>
				</p>
			</section>

			{/* Login panel */}
			<section className="flex flex-1 items-center justify-center bg-white px-6 py-12">
				<div className="w-full max-w-sm space-y-8">
					{/* Mobile brand */}
					<div className="flex items-center gap-2 lg:hidden">
						<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
							BT
						</span>
						<span className="font-semibold">BiblioTK</span>
					</div>

					<div className="space-y-1">
						<p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
							Bienvenido de vuelta
						</p>
						<h2 className="text-3xl font-bold text-slate-900">Inicia sesión</h2>
						<p className="text-sm text-slate-500">
							Accede a tu espacio personal de lectura.
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-4">
						<label className="block space-y-1.5">
							<span className="text-sm font-medium text-slate-700">
								Correo electrónico
							</span>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="tu@correo.com"
								required
								className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</label>

						<label className="block space-y-1.5">
							<span className="text-sm font-medium text-slate-700">
								Contraseña
							</span>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								required
								className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</label>

						<div className="flex items-center justify-between text-sm">
							<label className="flex cursor-pointer items-center gap-2 text-slate-600">
								<input
									type="checkbox"
									className="rounded border-slate-300 text-indigo-600"
								/>
								Recordarme
							</label>
							<a
								href="#recover"
								className="font-medium text-indigo-600 hover:text-indigo-700"
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>

						<button
							type="submit"
							className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
						>
							Entrar
						</button>
					</form>

					<p className="text-center text-sm text-slate-500">
						¿Aún no tienes una cuenta?{" "}
						<button
							type="button"
							onClick={onRegister}
							className="font-medium text-indigo-600 hover:text-indigo-700"
						>
							Solicita acceso
						</button>
					</p>
				</div>
			</section>
		</main>
	);
}

export default Login;
