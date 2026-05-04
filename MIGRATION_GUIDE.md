# Guide de Migration des Composants

## 🔄 Migrer les composants vers le nouveau système de routing

### Avant (Ancien système)
```jsx
// Composant reçoit des props de callback
function Reservation({ onReserve, onOpenProfile, onOpenHistorique }) {
  return (
    <div>
      <button onClick={() => onReserve(driver)}>Réserver</button>
      <button onClick={onOpenProfile}>Voir mon profil</button>
      <button onClick={onOpenHistorique}>Voir l'historique</button>
    </div>
  )
}

// Utilisation dans App.jsx
<Reservation
  onReserve={(driver) => {
    setReservedDriver(driver)
    setPage('confirmation')
  }}
  onOpenProfile={() => setPage('mon_profil')}
  onOpenHistorique={() => setPage('historique')}
/>
```

### Après (Nouveau système)
```jsx
import { useNavigation } from '../hooks/useNavigation'
import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

function Reservation() {
  const navigate = useNavigation()
  const { setReservedDriver } = useContext(ReservationContext)

  const handleReserve = (driver) => {
    setReservedDriver(driver)
    navigate.toReservationSuccess()
  }

  return (
    <div>
      <button onClick={() => handleReserve(driver)}>Réserver</button>
      <button onClick={navigate.toMonProfil}>Voir mon profil</button>
      <button onClick={navigate.toHistorique}>Voir l'historique</button>
    </div>
  )
}

// Utilisation simple dans App.jsx
<Route path="/reservation" element={<Reservation />} />
```

## 📋 Checklist de migration

Pour chaque page/composant:
- [ ] Remplacer les props `onXxx` par des appels à `useNavigation()`
- [ ] Remplacer les props d'état par du `ReservationContext`
- [ ] Supprimer les props de callback
- [ ] Tester la navigation
- [ ] Vérifier que l'état est bien partagé via le contexte

## 💾 État partagé avec ReservationContext

```jsx
import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

function MyComponent() {
  const { reservedDriver, setReservedDriver } = useContext(ReservationContext)

  return (
    <div>
      {reservedDriver && <p>Chauffeur réservé: {reservedDriver.name}</p>}
      <button onClick={() => setReservedDriver(null)}>
        Réinitialiser
      </button>
    </div>
  )
}
```

## 🎯 Fichiers prêts à utiliser

- `hooks/useNavigation.js` - Hook pour la navigation facile
- `context/ReservationContext.jsx` - Contexte pour l'état partagé
- `pages/NotFound.jsx` - Page 404 personnalisée
- `components/ProtectedRoute.jsx` - Protection des routes (à configurer)
- `EXAMPLES_ROUTING.jsx` - Exemples d'utilisation

## 🚀 Prochaines étapes recommandées

1. **Ajouter l'authentification**
   - Créer `context/AuthContext.jsx`
   - Implémenter `login()` et `logout()`
   - Utiliser `ProtectedRoute` pour les routes privées

2. **Lazy loading**
   ```jsx
   const Accueil = lazy(() => import('./pages/Accueil'))
   <Suspense fallback={<Loading />}>
     <Route path="/" element={<Accueil />} />
   </Suspense>
   ```

3. **Animations de transition**
   - Ajouter `framer-motion` ou `react-transition-group`
   - Animer les changements de pages

4. **Error boundaries**
   - Créer un ErrorBoundary pour les erreurs React

5. **Analytics**
   - Tracker les changements de route
   - Implémenter Google Analytics
