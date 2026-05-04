import { Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import Reservation from './pages/Reservation'
import ReservationSuccess from './pages/ReservationSuccess'
import Mon_profil from './pages/Mon_profil'
import Historique from './pages/Historique'
import Profil from './pages/Profil'
import NotFound from './pages/NotFound'
import { ReservationProvider } from './context/ReservationContext'
import './App.css'

function AppContent() {
  return (
    <main className="app-main">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/reservation-success" element={<ReservationSuccess />} />
        <Route path="/mon-profil" element={<Mon_profil />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

function App() {
  return (
    <ReservationProvider>
      <AppContent />
    </ReservationProvider>
  )
}

export default App