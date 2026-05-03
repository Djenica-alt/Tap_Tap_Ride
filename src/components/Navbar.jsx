import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaCar, FaUser, FaHistory, FaSignOutAlt } from 'react-icons/fa'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/', icon: FaHome, label: 'Accueil' },
    { path: '/reservation', icon: FaCar, label: 'Réservation' },
    { path: '/mon-profil', icon: FaUser, label: 'Profil' },
    { path: '/historique', icon: FaHistory, label: 'Historique' }
  ]

  const handleLogout = () => {
    // À implémenter: logout logic
    navigate('/connexion')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <FaCar className="navbar-logo-icon" />
          <span>TapTapRide</span>
        </Link>

        {/* Menu principal */}
        <div className="navbar-menu">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-item ${isActive(item.path) ? 'active' : ''}`}
                title={item.label}
              >
                <Icon className="navbar-icon" />
                <span className="navbar-label">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <button className="navbar-logout" onClick={handleLogout} title="Déconnexion">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
