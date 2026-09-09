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

	return (
		<main className="grid min-h-screen place-items-center bg-[#f6f3ed] px-5 py-10 font-['Inter','Segoe_UI',sans-serif] text-[#18332d] ">
			<section className="relative flex min-h-71.25 flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#173c33_0%,#255c4e_58%,#5b7760_100%)] px-[8%] py-7 text-[#f7f3eb] after:absolute after:-bottom-36 after:-right-20 after:size-97.5 after:rounded-full after:border after:border-[#deb36f]/30 after:shadow-[0_0_0_34px_rgba(222,179,111,0.08),0_0_0_70px_rgba(222,179,111,0.06)] md:min-h-0 md:px-[9%] md:py-10.5 w-full">
				<div className="relative z-10 flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em] max-md:hidden">
					<span className="grid size-8.5 place-items-center rounded-full border border-[#d4a15f] text-[#d4a15f]">
						BT
					</span>
					<span>BiblioTK</span>
				</div>
				<div className="relative z-10 my-auto">
					<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
						Tu biblioteca, siempre contigo
					</p>
					<h1 className="m-0 mb-5.5 max-w-170 font-[Georgia,serif] text-[39px] font-medium leading-[0.98] tracking-[-0.045em] md:text-[clamp(42px,5vw,69px)]">
						El placer de
						<br />
						<em className="text-[#e3b56e]">encontrar</em> una
						<br />
						buena historia.
					</h1>
				</div>
				<br />

				<section className="w-full max-w-[90%] bg-[#fffdf9] px-6.25 py-8 shadow-[0_18px_50px_rgba(38,63,53,0.08)] md:px-12 md:py-10.5">
					<div className="mb-12">
						<p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#a77a46]">
							Únete a la comunidad
						</p>
						<h1 className="m-0 font-[Georgia,serif] text-4xl font-medium text-[#173c33]">
							Crear una cuenta
						</h1>
						<p className="mt-2.5 mb-7.5 text-sm text-[#718079]">
							Regístrate para comenzar a disfrutar tu biblioteca personal.
						</p>
					</div>

					{submitted ? (
						<div className="mt-5.5 grid min-h-37.5 place-content-center gap-2 bg-[#fffdf9] text-center text-[#8c9991]">
							<strong className="font-[Georgia,serif] text-base text-[#375148]">
								Solicitud enviada
							</strong>
							<p className="m-0 text-[11px]">
								Revisaremos tus datos y te contactaremos pronto.
							</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="grid gap-4.5">
							<div className="grid gap-3.75 md:grid-cols-2">
								<label
									htmlFor="nombres"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Nombres
									<input
										id="nombres"
										name="nombres"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="text"
										placeholder="María"
										required
										value={formData.nombres}
										onChange={handleChange}
									/>
								</label>
								<label
									htmlFor="apellidos"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Apellidos
									<input
										id="apellidos"
										name="apellidos"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="text"
										placeholder="González"
										required
										value={formData.apellidos}
										onChange={handleChange}
									/>
								</label>
							</div>

							<div className="grid gap-3.75 md:grid-cols-2">
								<label
									htmlFor="email"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Correo electrónico
									<input
										id="email"
										name="email"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="email"
										placeholder="tu@correo.com"
										required
										value={formData.email}
										onChange={handleChange}
									/>
								</label>

								<label
									htmlFor="cc"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Cédula de identidad
									<input
										id="cc"
										name="cc"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="tel"
										placeholder="12345678"
										required
										value={formData.cc}
										onChange={handleChange}
									/>
								</label>
							</div>

							<label
								htmlFor="contrasena"
								className="grid gap-2 text-xs font-bold text-[#375148]"
							>
								Contraseña
								<input
									id="contrasena"
									name="contrasena"
									className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
									type="password"
									placeholder="••••••••"
									required
									value={formData.contrasena}
									onChange={handleChange}
								/>
							</label>
							<div className="grid gap-3.75 md:grid-cols-2">
								<label
									htmlFor="celular"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Celular
									<input
										id="celular"
										name="celular"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="tel"
										placeholder="04121234567"
										required
										value={formData.celular}
										onChange={handleChange}
									/>
								</label>
								<label
									htmlFor="nombreUsuario"
									className="grid gap-2 text-xs font-bold text-[#375148]"
								>
									Nombre de usuario
									<input
										id="nombreUsuario"
										name="nombreUsuario"
										className="w-full rounded-[3px] border border-[#d7d8ce] bg-white px-3.5 py-3.25 outline-none focus:border-[#3d7966] focus:shadow-[0_0_0_3px_#dcebe2]"
										type="text"
										placeholder="mari"
										required
										value={formData.nombreUsuario}
										onChange={handleChange}
									/>
								</label>
							</div>

							<label className="flex items-center gap-1.5 text-xs text-[#375148]">
								<input className="accent-[#28634f]" type="checkbox" required />
								Acepto los términos de uso
							</label>

							<button
								className="flex items-center justify-center rounded-[3px] border-0 bg-[#c28b4e] p-3.75 font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a8733c]"
								type="submit"
							>
								Crear cuenta
							</button>
						</form>
					)}

					<button
						type="button"
						className="mx-auto mt-7 block border-0 bg-transparent p-0 text-xs text-[#718079] hover:underline"
						onClick={onBack}
					>
						Volver al inicio de sesión
					</button>
				</section>
			</section>
		</main>
	);
}

export default Register;
