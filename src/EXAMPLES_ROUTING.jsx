import { useNavigation } from '../hooks/useNavigation'
import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

/**
 * EXEMPLES D'UTILISATION DU NOUVEAU SYSTÈME DE ROUTING
 * Ce fichier montre comment utiliser le système de routing professionnel
 */

// ❌ ANCIEN SYSTÈME (À ÉVITER)
// function OldComponent({ onNavigate }) {
//   return (
//     <button onClick={() => onNavigate('reservation')}>
//       Réserver
//     </button>
//   )
// }

// ✅ NOUVEAU SYSTÈME (À UTILISER)

function Example1_SimpleNavigation() {
  const navigate = useNavigation()

  return (
    <>
      <button onClick={navigate.toHome}>Accueil</button>
      <button onClick={navigate.toReservation}>Réserver</button>
      <button onClick={navigate.toMonProfil}>Mon Profil</button>
    </>
  )
}

function Example2_WithSharedState() {
  const navigate = useNavigation()
  const { setReservedDriver } = useContext(ReservationContext)

  const handleReserveDriver = (driver) => {
    // 1. Sauvegarder le chauffeur dans le contexte
    setReservedDriver(driver)
    
    // 2. Naviguer vers la page de confirmation
    navigate.toReservationSuccess()
  }

  return (
    <button onClick={() => handleReserveDriver({ name: 'John' })}>
      Réserver ce trajet
    </button>
  )
}

function Example3_DynamicRoute() {
  const navigate = useNavigation()

  const handleProfileClick = (driverId) => {
    navigate.toProfile(driverId)
  }

  return (
    <button onClick={() => handleProfileClick('123')}>
      Voir profil du chauffeur
    </button>
  )
}

function Example4_BackNavigation() {
  const navigate = useNavigation()

  return (
    <button onClick={navigate.goBack}>
      Retour
    </button>
  )
}

/**
 * INTÉGRATION DANS UN COMPOSANT RÉEL
 * 
 * import { useNavigation } from '../hooks/useNavigation'
 * 
 * function Reservation() {
 *   const navigate = useNavigation()
 *   const { setReservedDriver } = useContext(ReservationContext)
 * 
 *   const handleConfirm = (driver) => {
 *     setReservedDriver(driver)
 *     navigate.toReservationSuccess()
 *   }
 * 
 *   return (
 *     <div>
 *       <h1>Réservation</h1>
 *       <button onClick={() => handleConfirm(driver)}>
 *         Confirmer
 *       </button>
 *       <button onClick={navigate.goBack}>
 *         Annuler
 *       </button>
 *     </div>
 *   )
 * }
 */

export { Example1_SimpleNavigation, Example2_WithSharedState, Example3_DynamicRoute, Example4_BackNavigation }
