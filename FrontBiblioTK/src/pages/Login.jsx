import { useState } from 'react'

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleSubmit(event) { event.preventDefault(); onLogin(email || 'María González') }
  
  return (<main className="login-page">
    <section className="login-art" aria-label="Biblioteca BiblioTK"><div className="brand">
    <span className="brand-mark">BT</span> <img src="C:\Users\USUARIO\Downloads\webi wabo.webp" alt="BiblioTK" />
    <span>BiblioTK</span></div><div className="art-copy"><p className="eyebrow">Tu biblioteca, siempre contigo</p><h1>El placer de<br /><em>encontrar</em> una<br />buena historia.</h1><p>Gestiona tus lecturas y descubre tu próxima aventura.</p></div><div className="art-stamp">EST. 2024<br /><span>LIBRARY CLUB</span></div></section><section className="login-panel"><div className="mobile-brand brand"><span className="brand-mark">BT</span><span>BiblioTK</span></div><div className="login-heading"><p className="eyebrow">Bienvenido de vuelta</p><h2>Inicia sesión</h2><p>Accede a tu espacio personal de lectura.</p></div><form onSubmit={handleSubmit} className="login-form"><label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="tu@correo.com" required /></label><label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required /></label><div className="form-meta"><label className="check"><input type="checkbox" /> Recordarme</label><a href="#recover">¿Olvidaste tu contraseña?</a></div><button className="primary-button" type="submit">Entrar</button></form><p className="login-footer">¿Aún no tienes una cuenta? <button type="button" className="link-button" onClick={onRegister}>Solicita acceso</button></p></section></main>
)}




export default Login