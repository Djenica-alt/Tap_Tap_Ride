import './Historique.css'

export default function Historique({ onBack }) {
  const trips = [
    {
      id: 1,
      date: '8 avril 2026',
      time: '18:30',
      departure: 'Port-au-prince, Centre-ville',
      arrival: 'Pétionville, Place Boyer',
      driver: 'Marc Antoine',
      price: '175 HTG',
    },
    {
      id: 2,
      date: '5 avril 2026',
      time: '14:15',
      departure: 'Port-au-prince, Centre-ville',
      arrival: 'Tabarre, Tabarre',
      driver: 'Jean Michel',
      price: '150 HTG',
    },
    {
      id: 3,
      date: '2 avril 2026',
      time: '09:45',
      departure: 'Pétionville, Place Boyer',
      arrival: 'Port-au-prince, Centre-ville',
      driver: 'Marie Flores',
      price: '160 HTG',
    },
  ]

  return (
    <div className="historique-page">
      <div className="historique-card">
        <header className="historique-header">
          <button type="button" className="historique-back" onClick={onBack}>
            ← Home
          </button>
        </header>

        <div className="historique-stats-grid">
          <div className="historique-stat-card">
            <div className="historique-stat-label">Total de courses</div>
            <div className="historique-stat-value">5</div>
          </div>
          <div className="historique-stat-card">
            <div className="historique-stat-label">Dépenses totales</div>
            <div className="historique-stat-value">1105 HTG</div>
          </div>
        </div>

        <section className="historique-section">
          <div className="historique-section-title">Vos courses récentes</div>
          {trips.map((trip) => (
            <div key={trip.id} className="historique-trip-card">
              <div className="trip-header">
                <div className="trip-date">{trip.date} · {trip.time}</div>
              </div>
              <div className="trip-detail">
                <span className="trip-label">Départ</span>
                <span className="trip-value">{trip.departure}</span>
              </div>
              <div className="trip-detail">
                <span className="trip-label">Arrivée</span>
                <span className="trip-value">{trip.arrival}</span>
              </div>
              <div className="trip-footer">
                <div>
                  <span className="trip-label">Chauffeur</span>
                  <div className="trip-value">{trip.driver}</div>
                </div>
                <div className="trip-price">
                  <span className="trip-label">Prix</span>
                  <div className="trip-value">{trip.price}</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
