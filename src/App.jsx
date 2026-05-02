import { useState } from 'react'
import { useState } from 'react'
import Reservation from './pages/Reservation'
import ReservationSuccess from './pages/ReservationSuccess'
import Mon_profil from './pages/Mon_profil'
import Historique from './pages/Historique'
import Profil from './pages/Profil.jsx'
import Inscription from './pages/Inscription'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
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
    
  
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />

      </Routes>
    </Router>

    
  
);

    </>
  )
}

export default App;
