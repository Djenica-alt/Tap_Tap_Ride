import { useState } from 'react'
import './Paiement.css'

export default function Payment({ driver, trip, onBack, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleConfirm = () => {
    onConfirm(paymentMethod)
  }

  return (
    <div className="payment-page">
      <div className="payment-card">

        {/* Header */}
        <header className="payment-header">
          <button type="button" className="payment-back" onClick={onBack}>
            ← Retour
          </button>
          <div className="payment-title">Confirmer la réservation</div>
        </header>

        {/* Trip details */}
        <section className="payment-section">
          <div className="section-title">Détails du trajet</div>

          <div className="row">
            <span className="badge blue" />
            <div>
              <div className="label">Point de départ</div>
              <div className="value">
                {trip?.departure || 'Port-au-Prince, Centre-ville'}
              </div>
            </div>
          </div>

          <div className="row">
            <span className="badge green" />
            <div>
              <div className="label">Destination</div>
              <div className="value">
                {trip?.destination || 'Aquin'}
              </div>
            </div>
          </div>

          <div className="summary">
            <div>Temps estimé: {trip?.duration || '2 min'}</div>
            <div>Distance: {trip?.distance || '0.5 km'}</div>
          </div>
        </section>

        {/* Driver */}
        <section className="payment-section">
          <div className="section-title">Votre chauffeur</div>

          <div className="driver">
            <div className="avatar">👤</div>

            <div className="driver-info">
              <div className="name">{driver?.name || 'Jean Michel'}</div>
              <div className="car">
                {driver?.car || 'Nissan Sentra • EF-9012'}
              </div>
              <div className="rating">
                ⭐ {driver?.rating || 5} (120 courses)
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="payment-section">
          <div className="section-title">Mode de paiement</div>

          <label>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Espèces
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Carte bancaire
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'moncash'}
              onChange={() => setPaymentMethod('moncash')}
            />
            MonCash
          </label>
        </section>

        {/* Summary */}
        <section className="payment-section">
          <div className="section-title">Récapitulatif</div>

          <div className="recap">
            <div className="recap-row">
              <span>Course</span>
              <span>150 HTG</span>
            </div>

            <div className="recap-row">
              <span>Frais de service</span>
              <span>25 HTG</span>
            </div>

            <div className="recap-row total">
              <span>Total</span>
              <span>175 HTG</span>
            </div>
          </div>
        </section>

        {/* Confirm */}
        <button
          type="button"
          className="confirm-btn"
          onClick={handleConfirm}
        >
          Confirmer la réservation
        </button>

      </div>
    </div>
  )
}