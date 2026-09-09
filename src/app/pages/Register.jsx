import { useState } from "react";
import { registerUser } from "../../service/RegisterService";
import { createRegisterUserDto } from "../dto/registerUser.dto";

const initialFormData = {
	nombres: "",
	apellidos: "",
	email: "",
	cc: "",
	contrasena: "",
	celular: "",
	nombreUsuario: "",
};

function Register({ onBack }) {
	const [submitted, setSubmitted] = useState(false);
	const [formData, setFormData] = useState(initialFormData);

	function handleChange(event) {
		const { name, value } = event.target;
		setFormData((currentData) => ({ ...currentData, [name]: value }));
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const userData = createRegisterUserDto(formData);

		try {
			const responseRegisterUser = await registerUser(userData);
			console.log(responseRegisterUser);
			setSubmitted(true);
		} catch (error) {
			console.error("Error al registrar el usuario:", error);
			window.alert("No se pudo registrar el usuario. Inténtalo de nuevo.");
		}
	};

	const inputClasses =
		"w-full rounded-[10px] border border-[#dcd6c7] bg-white px-3.5 py-2.75 text-sm text-[#18332d] outline-none placeholder:text-[#b7bcae] focus:border-[#4c6c5c] focus:shadow-[0_0_0_3px_rgba(76,108,92,0.18)]";
	const labelClasses = "grid gap-2 text-[12.5px] font-semibold text-[#1c4238]";

	return (
		<main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#132f28_0%,#23533f_45%,#4c6c5c_100%)] px-5 py-11 font-['Inter','Segoe_UI',sans-serif] text-[#18332d]">
			{/* detalle decorativo repetido en el fondo, sin superponerse a la tarjeta */}
			<div className="pointer-events-none absolute -left-28 -top-24 size-65 rounded-full border border-[#e3b56e]/35 shadow-[0_0_0_26px_rgba(227,181,110,0.06),0_0_0_52px_rgba(227,181,110,0.045)]" />
			<div className="pointer-events-none absolute -right-24 top-62 hidden size-50 rounded-full border border-[#e3b56e]/35 shadow-[0_0_0_26px_rgba(227,181,110,0.06),0_0_0_52px_rgba(227,181,110,0.045)] md:block" />
			<div className="pointer-events-none absolute -bottom-40 left-1/3 size-85 rounded-full border border-[#e3b56e]/35 shadow-[0_0_0_26px_rgba(227,181,110,0.06),0_0_0_52px_rgba(227,181,110,0.045)]" />

			<div className="relative z-10 mx-auto max-w-270">
				{/* logo, arriba a la derecha, circulo y texto centrados entre si */}
				<div className="mb-9 flex justify-start">
					<div className="flex items-center gap-2.5">
						<span className="grid size-8.5 place-items-center rounded-full border border-[#d4a15f] text-[13px] font-bold leading-none text-[#e3b56e]">
							BT
						</span>
						<span className="text-[19px] font-bold leading-none tracking-[-0.02em] text-[#f7f3eb]">
							BiblioTK
						</span>
					</div>
				</div>

				{/* hero, centrado, "encontrar" cierra la primera linea */}
				<div className="mx-auto mb-14 max-w-160 text-center">
					<p className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#e3b56e]">
						Tu biblioteca, siempre contigo
					</p>
					<h1 className="m-0 font-[Georgia,serif] text-[32px] font-medium leading-[1.08] tracking-[-0.02em] text-[#f7f3eb] md:text-[clamp(32px,5vw,50px)]">
						<span className="block">
							El placer de{" "}
							<em className="not-italic text-[#e3b56e]">encontrar</em>
						</span>
						<span className="block">una buena historia.</span>
					</h1>
				</div>

				{/* tarjeta, centrada, angosta, bordes curvos */}
				<section className="mx-auto max-w-150 rounded-[32px] bg-[#fbf6ec] px-8 pt-11 pb-9 shadow-[0_30px_70px_rgba(19,47,40,0.35)] md:px-11">
					<div className="mb-8.5 text-center">
						{submitted ? (
							<>
								<p className="mb-1.5 text-[17px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
									Cuenta creada
								</p>
								<h2 className="m-0 font-[Georgia,serif] text-[30px] font-medium tracking-[-0.01em] text-[#132f28]">
									Bienvenido a la comunidad
								</h2>
								<p className="mt-2.5 text-[14.5px] text-[#7c8a80]">
									Esperamos que disfrutes tu estancia.
								</p>
							</>
						) : (
							<>
								<p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
									Únete a la comunidad
								</p>
								<h2 className="m-0 font-[Georgia,serif] text-[30px] font-medium tracking-[-0.01em] text-[#132f28]">
									Crear una cuenta
								</h2>
								<p className="mt-2.5 text-[13.5px] text-[#7c8a80]">
									Regístrate para comenzar a disfrutar tu biblioteca personal.
								</p>
							</>
						)}
					</div>

					{submitted ? (
						<div
							className="grid min-h-0 place-content-center"
							aria-live="polite"
						/>
					) : (
						<form onSubmit={handleSubmit} className="grid gap-6.5">
							<div className="grid gap-6.5 gap-x-5 md:grid-cols-2">
								<label htmlFor="cc" className={labelClasses}>
									Cédula de identidad
									<input
										id="cc"
										name="cc"
										className={inputClasses}
										type="text"
										inputMode="numeric"
										pattern="[0-9]*"
										placeholder="12345678"
										autoComplete="off"
										required
										value={formData.cc}
										onChange={handleChange}
									/>
								</label>
								<label htmlFor="email" className={labelClasses}>
									Correo electrónico
									<input
										id="email"
										name="email"
										className={inputClasses}
										type="email"
										placeholder="tu@correo.com"
										autoComplete="email"
										required
										value={formData.email}
										onChange={handleChange}
									/>
								</label>
							</div>

							<div className="grid gap-6.5 gap-x-5 md:grid-cols-2">
								<label htmlFor="nombres" className={labelClasses}>
									Nombres
									<input
										id="nombres"
										name="nombres"
										className={inputClasses}
										type="text"
										placeholder="María"
										autoComplete="given-name"
										required
										value={formData.nombres}
										onChange={handleChange}
									/>
								</label>
								<label htmlFor="apellidos" className={labelClasses}>
									Apellidos
									<input
										id="apellidos"
										name="apellidos"
										className={inputClasses}
										type="text"
										placeholder="González"
										autoComplete="family-name"
										required
										value={formData.apellidos}
										onChange={handleChange}
									/>
								</label>
							</div>

							<div className="grid gap-6.5 gap-x-5 md:grid-cols-2">
								<label htmlFor="nombreUsuario" className={labelClasses}>
									Nombre de usuario
									<input
										id="nombreUsuario"
										name="nombreUsuario"
										className={inputClasses}
										type="text"
										placeholder="mari"
										autoComplete="username"
										required
										value={formData.nombreUsuario}
										onChange={handleChange}
									/>
								</label>
								<label htmlFor="celular" className={labelClasses}>
									Celular
									<input
										id="celular"
										name="celular"
										className={inputClasses}
										type="tel"
										placeholder="04121234567"
										autoComplete="tel"
										required
										value={formData.celular}
										onChange={handleChange}
									/>
								</label>
							</div>

							<div className="flex justify-center">
								<label
									htmlFor="contrasena"
									className={`${labelClasses} w-full max-w-57.5`}
								>
									Contraseña
									<input
										id="contrasena"
										name="contrasena"
										className={inputClasses}
										type="password"
										placeholder="••••••••"
										autoComplete="new-password"
										minLength={8}
										required
										value={formData.contrasena}
										onChange={handleChange}
									/>
								</label>
							</div>

							<label
								htmlFor="terminos"
								className="flex items-center justify-center gap-2 text-[12.5px] text-[#1c4238]"
							>
								<input
									id="terminos"
									name="terminos"
									className="size-3.5 accent-[#1c4238]"
									type="checkbox"
									required
								/>
								Acepto los términos de uso
							</label>

							<div className="flex justify-center pt-1">
								<button
									className="rounded-full border-0 bg-[#c28b4e] px-11.5 py-3.25 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a8733c]"
									type="submit"
								>
									Crear cuenta
								</button>
							</div>
						</form>
					)}

					<div className="mt-6.5 flex justify-center">
						<button
							type="button"
							className="border-0 bg-transparent p-0 text-shadow-2xs font-bold text-[#a77a46] hover:underline"
							onClick={onBack}
						>
							Volver al inicio de sesión
						</button>
					</div>
				</section>
			</div>
		</main>
	);
}

export default Register;
