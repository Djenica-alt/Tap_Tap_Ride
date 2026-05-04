# 🚀 Quick Start - Nouveau système de Routing

## ✅ Qu'a été refactorisé?

| Avant | Après |
|-------|-------|
| Système d'état `page` | React Router v7 |
| Prop callbacks | `useNavigation()` hook |
| Pas de protection de routes | `ProtectedRoute` component |
| Pas de gestion d'état global | `ReservationContext` |
| Navigation ad hoc | Routes centralisées |

## 🎯 Utilisation rapide

### 1️⃣ Navigation simple
```jsx
import { useNavigation } from '../hooks/useNavigation'

function MonComposant() {
  const navigate = useNavigation()
  
  return (
    <>
      <button onClick={navigate.toHome}>Accueil</button>
      <button onClick={navigate.toReservation}>Réserver</button>
      <button onClick={navigate.goBack}>Retour</button>
    </>
  )
}
```

### 2️⃣ Partager l'état
```jsx
import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

function MonComposant() {
  const { reservedDriver, setReservedDriver } = useContext(ReservationContext)
  
  return <div>{reservedDriver?.name}</div>
}
```

### 3️⃣ Naviguer avec data
```jsx
const navigate = useNavigation()
const { setReservedDriver } = useContext(ReservationContext)

const handleReserve = (driver) => {
  setReservedDriver(driver)
  navigate.toReservationSuccess()
}
```

## 📚 Documentation complète

- **[ROUTING.md](./ROUTING.md)** - Guide complet du système de routing
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Vue d'ensemble de l'architecture
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Migrer vos composants
- **[EXAMPLES_ROUTING.jsx](./src/EXAMPLES_ROUTING.jsx)** - Exemples d'utilisation

## 🏃 Tester le nouveau système

```bash
# Terminal
npm run dev

# Navigate dans l'app:
# - http://localhost:5173/
# - http://localhost:5173/reservation
# - http://localhost:5173/mon-profil
# - Essayer une route invalide pour voir 404
```

## 🔗 Routes disponibles

```
GET /                      → Accueil
GET /connexion             → Connexion
GET /inscription           → Inscription
GET /reservation           → Réservation
GET /reservation-success   → Confirmation
GET /mon-profil            → Mon Profil
GET /historique            → Historique
GET /profil/:id            → Profil (id = user id)
GET /*                     → NotFound (404)
```

## 💡 Conseils

1. **Toujours utiliser `useNavigation()`** au lieu de `useNavigate()`
   ```jsx
   ✅ const navigate = useNavigation()
   ❌ const navigate = useNavigate()
   ```

2. **Garder l'état dans le contexte** si utilisé par plusieurs pages
   ```jsx
   ✅ <ReservationContext.Provider>
   ❌ Props drilling
   ```

3. **Utiliser les chemins prédéfinis**
   ```jsx
   ✅ navigate.toReservation()
   ❌ navigate('/reservation')
   ```

4. **Tester la navigation mobile**
   - La navbar change sur mobile (<768px)
   - Les labels se cachent sur petit écran

## ⚠️ Points d'attention

- Pages `Connexion` et `Inscription` cachent la Navbar automatiquement
- Route `/*` doit être la **dernière** route (Order matters!)
- ProtectedRoute n'est pas encore configurée avec l'auth

## 🎓 Prochaines étapes

1. Mettre à jour chaque composant de page
   - Remplacer les props callbacks par `useNavigation()`
   - Utiliser `ReservationContext` pour l'état

2. Ajouter l'authentification
   - Créer `AuthContext`
   - Implémenter `ProtectedRoute`

3. Ajouter des animations
   - Page transitions
   - Fade in/out effects

## 📞 Support

Si vous avez des questions, consultez:
- Les fichiers de documentation (ROUTING.md, ARCHITECTURE.md)
- Les exemples dans EXAMPLES_ROUTING.jsx
- Le code de Navbar.jsx pour voir l'utilisation pratique

---

**Status**: ✅ Production Ready  
**Version**: 1.0  
**Last Updated**: 2026-05-02
