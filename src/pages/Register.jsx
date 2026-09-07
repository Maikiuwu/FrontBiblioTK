import { useState } from "react";

function Register({ onBack }) {
	const [submitted, setSubmitted] = useState(false);

	function handleSubmit(event) {
		event.preventDefault();
		setSubmitted(true);
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
			<section className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
				{/* Brand */}
				<div className="flex items-center gap-2">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
						BT
					</span>
					<span className="font-semibold text-slate-800">BiblioTK</span>
				</div>

				<div className="space-y-1">
					<p className="text-xs font-semibold uppercase tracking-widest text-indigo-500">
						Únete a la comunidad
					</p>
					<h1 className="text-2xl font-bold text-slate-900">
						Crear una cuenta
					</h1>
					<p className="text-sm text-slate-500">
						Regístrate para comenzar a disfrutar tu biblioteca personal.
					</p>
				</div>

				{submitted ? (
					<div className="flex flex-col items-center justify-center space-y-2 py-10 text-center">
						<div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
							<span className="text-xl text-emerald-600">✓</span>
						</div>
						<p className="font-semibold text-slate-800">Solicitud enviada</p>
						<p className="text-sm text-slate-500">
							Revisaremos tus datos y te contactaremos pronto.
						</p>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-3">
							<label className="block space-y-1.5">
								<span className="text-sm font-medium text-slate-700">
									Nombres
								</span>
								<input
									type="text"
									placeholder="María"
									required
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</label>
							<label className="block space-y-1.5">
								<span className="text-sm font-medium text-slate-700">
									Apellidos
								</span>
								<input
									type="text"
									placeholder="González"
									required
									className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</label>
						</div>

						<label className="block space-y-1.5">
							<span className="text-sm font-medium text-slate-700">
								Correo electrónico
							</span>
							<input
								type="email"
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
								placeholder="••••••••"
								required
								className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</label>

						<label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
							<input
								type="checkbox"
								required
								className="rounded border-slate-300 text-indigo-600"
							/>
							Acepto los términos de uso
						</label>

						<button
							type="submit"
							className="w-full rounded-lg bg-indigo-600 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-700"
						>
							Crear cuenta
						</button>
					</form>
				)}

				<button
					type="button"
					onClick={onBack}
					className="w-full text-center text-sm text-slate-500 transition-colors hover:text-slate-800"
				>
					← Volver al inicio de sesión
				</button>
			</section>
		</main>
	);
}

export default Register;
