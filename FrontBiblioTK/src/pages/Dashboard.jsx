const loans = []

export function Sidebar({ onLogout }) {
  return <aside className="sidebar"><div className="brand"><span className="brand-mark">BT</span><span>BiblioTK</span></div><nav><button className="nav-item active">Resumen</button></nav><div className="sidebar-bottom"><div className="profile"><div className="avatar">MG</div><div><strong>María González</strong><small>Lectora</small></div></div><button className="logout" onClick={onLogout}>Cerrar sesión</button></div></aside>
}

export function LoanTable({ compact = false, rows = loans }) {
  const visibleLoans = compact ? rows.slice(0, 3) : rows
  if (!visibleLoans.length) return <div className="empty-state"><strong>Aún no tienes préstamos</strong><p>Cuando solicites un libro, aparecerá aquí.</p></div>
  return <div className="table-wrap"><table><thead><tr><th>LIBRO</th><th>FECHA DE PRÉSTAMO</th><th>DEVOLUCIÓN</th><th>ESTADO</th></tr></thead><tbody>{visibleLoans.map((loan) => <tr key={loan.title}><td>{loan.title}</td><td>{loan.date}</td><td>{loan.due}</td><td><span className={`status ${loan.tone}`}>{loan.status}</span></td></tr>)}</tbody></table></div>
}

function Dashboard() {
  return <div className="content"><header className="topbar"><div><p className="eyebrow">Martes, 12 de marzo de 2024</p><h1>Buenos días, María</h1></div><button className="notification" aria-label="Notificaciones">2</button></header><section className="welcome-banner"><div><p className="eyebrow">Tu rincón de lectura</p><h2>Una página más,<br />un mundo nuevo.</h2><p>Continúa explorando historias que te están esperando.</p></div></section><div className="stats"><article><div><small>Préstamos activos</small><strong>00</strong></div></article><article><div><small>Por devolver</small><strong>00 <small>días</small></strong></div></article><article><div><small>Libros leídos</small><strong>00</strong></div></article></div><section className="section-heading"><div><p className="eyebrow">Actividad reciente</p><h2>Mis préstamos</h2></div></section><LoanTable compact /></div>
}

export default Dashboard
