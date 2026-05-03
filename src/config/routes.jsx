import Accueil from '../pages/Accueil'
import Connexion from '../pages/Connexion'
import Inscription from '../pages/Inscription'
import Reservation from '../pages/Reservation'
import ReservationSuccess from '../pages/ReservationSuccess'
import Mon_profil from '../pages/Mon_profil'
import Historique from '../pages/Historique'
import Profil from '../pages/Profil'

export const routes = [
  {
    path: '/',
    element: <Accueil />,
    label: 'Accueil'
  },
  {
    path: '/connexion',
    element: <Connexion />,
    label: 'Connexion'
  },
  {
    path: '/inscription',
    element: <Inscription />,
    label: 'Inscription'
  },
  {
    path: '/reservation',
    element: <Reservation />,
    label: 'Réservation'
  },
  {
    path: '/reservation-success',
    element: <ReservationSuccess />,
    label: 'Confirmation'
  },
  {
    path: '/mon-profil',
    element: <Mon_profil />,
    label: 'Mon Profil'
  },
  {
    path: '/historique',
    element: <Historique />,
    label: 'Historique'
  },
  {
    path: '/profil/:id',
    element: <Profil />,
    label: 'Profil'
  }
]
