import './Reservation.css'

export default function ReservationConfirmation({ driver, onBack, onConfirm }) {
  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <header className="confirmation-header">
          <button type="button" className="confirmation-back" onClick={onBack}>
            ← Retour
          </button>
          <div className="confirmation-title">Confirmer la réservation</div>
        </header>

        <section className="confirmation-details-card">
          <div className="confirmation-section-title">Détails du trajet</div>
          <div className="confirmation-row">
            <span className="confirmation-badge blue" />
            <div>
              <div className="confirmation-label">Point de départ</div>
              <div className="confirmation-value">Port-au-Prince, Centre-ville</div>
            </div>
          </div>
          <div className="confirmation-row">
            <span className="confirmation-badge green" />
            <div>
              <div className="confirmation-label">Destination</div>
              <div className="confirmation-value">aquin</div>
            </div>
          </div>
          <div className="confirmation-summary-row">
            <div>Temps estimé: 2 min</div>
            <div>Distance: 0.5 km</div>
          </div>
        </section>

        <section className="confirmation-driver-card">
          <div className="confirmation-section-title">Votre chauffeur</div>
          <div className="driver-summary">
            <div className="driver-avatar">👤</div>
            <div className="driver-summary-info">
              <div className="driver-name">{driver.name}</div>
              <div className="driver-car">{driver.car}</div>
              <div className="driver-rating">⭐ {driver.rating} (120 courses)</div>
            </div>
          </div>
        </section>

        <section className="confirmation-payment-card">
          <div className="confirmation-section-title">Mode de paiement</div>
          <label className="payment-option">
            <input type="radio" name="payment" defaultChecked /> Espèces
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" /> Carte bancaire
          </label>
          <label className="payment-option">
            <input type="radio" name="payment" /> MonCash
          </label>
        </section>

        <section className="confirmation-recap-card">
          <div className="confirmation-section-title">Récapitulatif</div>
          <div className="recap-row">
            <span>Course</span>
            <span>150 HTG</span>
          </div>
          <div className="recap-row">
            <span>Frais de service</span>
            <span>25 HTG</span>
          </div>
          <div className="recap-row total-row">
            <span>Total</span>
            <span>175 HTG</span>
          </div>
        </section>

        <button
          type="button"
          className="confirm-reservation-button"
          onClick={onConfirm}
        >
          Confirmer la réservation
        </button>
      </div>
    </div>
  )
}
