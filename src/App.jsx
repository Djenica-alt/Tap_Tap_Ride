import { useState } from 'react'
import Reservation from './pages/Reservation'
import ReservationConfirmation from './pages/ReservationConfirmation'
import ReservationSuccess from './pages/ReservationSuccess'
import Mon_profil from './pages/Mon_profil'
import Historique from './pages/Historique'
import Accueil from './pages/Accueil'

function App() {
  const [reservedDriver, setReservedDriver] = useState(null)
  const [page, setPage] = useState('reservation')

  return (
    <div>
      <Accueil onStart={() => setPage('reservation')} />
      {page === 'reservation' && (
        <Reservation
          onReserve={(driver) => {
            setReservedDriver(driver)
            setPage('confirmation')
          }}
          onOpenProfile={() => setPage('mon_profil')}
          onOpenHistorique={() => setPage('historique')}
        />
      )}
      {page === 'confirmation' && reservedDriver && (
        <ReservationConfirmation
          driver={reservedDriver}
          onBack={() => setPage('reservation')}
          onConfirm={() => setPage('success')}
        />
      )}
      {page === 'success' && reservedDriver && (
        <ReservationSuccess
          driver={reservedDriver}
          onDone={() => {
            setReservedDriver(null)
            setPage('reservation')
          }}
        />
      )}
      {page === 'mon_profil' && (
        <Mon_profil
          onBack={() => setPage('reservation')}
          onOpenHistorique={() => setPage('historique')}
        />
      )}
      {page === 'historique' && (
        <Historique onBack={() => setPage('reservation')} />
      )}
    </div>
  )
}

export default App;
