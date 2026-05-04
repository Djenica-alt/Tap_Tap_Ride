import { useNavigate as useRouterNavigate } from 'react-router-dom'

/**
 * Hook personnalisé pour la navigation
 * Facilite la navigation entre les pages avec des chemins prédéfinis
 * 
 * Utilisation:
 * const navigate = useNavigation()
 * navigate.toHome()
 * navigate.toReservation()
 * navigate.toProfile(userId)
 */
export function useNavigation() {
  const navigate = useRouterNavigate()

  return {
    toHome: () => navigate('/'),
    toConnexion: () => navigate('/connexion'),
    toInscription: () => navigate('/inscription'),
    toReservation: () => navigate('/reservation'),
    toReservationSuccess: () => navigate('/reservation-success'),
    toMonProfil: () => navigate('/mon-profil'),
    toHistorique: () => navigate('/historique'),
    toProfile: (id) => navigate(`/profil/${id}`),
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
    replace: (path) => navigate(path, { replace: true })
  }
}

export default useNavigation
