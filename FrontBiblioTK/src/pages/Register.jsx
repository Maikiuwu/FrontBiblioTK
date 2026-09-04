import { useState } from 'react'

function Register({ onBack }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return <main className="register-page"><section className="register-panel"><div className="register-heading"><div className="brand register-brand"><span className="brand-mark">BT</span><span>BiblioTK</span></div><p className="eyebrow">Únete a la comunidad</p><h1>Crear una cuenta</h1><p>Regístrate para comenzar a disfrutar tu biblioteca personal.</p></div>{submitted ? <div className="empty-state register-success"><strong>Solicitud enviada</strong><p>Revisaremos tus datos y te contactaremos pronto.</p></div> : <form onSubmit={handleSubmit} className="register-form"><div className="register-grid"><label>Nombres<input type="text" placeholder="María" required /></label><label>Apellidos<input type="text" placeholder="González" required /></label></div><label>Correo electrónico<input type="email" placeholder="tu@correo.com" required /></label><label>Contraseña<input type="password" placeholder="••••••••" required /></label><label className="check"><input type="checkbox" required /> Acepto los términos de uso</label><button className="primary-button" type="submit">Crear cuenta</button></form>}<button type="button" className="back-button" onClick={onBack}>Volver al inicio de sesión</button></section></main>
}

export default Register