import './Reservation.css'

export default function ReservationSuccess({ driver, onDone }) {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h1 className="success-title">Réservation confirmée</h1>
        <p className="success-text">
          Votre course avec <strong>{driver?.name || "Inconnu"} ✅</strong> est bien confirmée.
          Il arrive bientôt pour vous chercher à Port-au-Prince, Centre-ville.
        </p>

        <div className="success-details">
          <div>
            <span className="success-label">Chauffeur</span>
            <div className="success-value">{driver.name}</div>
          </div>
          <div>
            <span className="success-label">Voiture</span>
            <div className="success-value">{driver.car}</div>
          </div>
          <div>
            <span className="success-label">Prix estimé</span>
            <div className="success-value">175 HTG</div>
          </div>
        </div>

        <button type="button" className="success-button" onClick={onDone}>
          Retour au début
        </button>
      </div>
    </div>
  )
}
