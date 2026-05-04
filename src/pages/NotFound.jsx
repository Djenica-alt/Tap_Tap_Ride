import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page non trouvée</h2>
        <p className="notfound-text">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>
        
        <button 
          className="notfound-button" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Retour précédent
        </button>
        
        <button 
          className="notfound-button notfound-button--primary" 
          onClick={() => navigate('/')}
        >
          Aller à l'accueil
        </button>
      </div>
    </div>
  )
}

export default NotFound
