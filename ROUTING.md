# Structure de Routing - TapTapRide

## Architecture professionnelle du système de routing

### 📁 Organisation des fichiers

```
src/
├── App.jsx                 # Composant principal avec Routes
├── main.jsx               # Point d'entrée avec BrowserRouter
├── components/
│   ├── Navbar.jsx         # Composant de navigation
│   ├── Navbar.css         # Styles de la navbar
│   └── ProtectedRoute.jsx # Route protégée (authentification)
├── context/
│   └── ReservationContext.jsx # Contexte pour l'état partagé
├── config/
│   └── routes.jsx         # Configuration centralisée des routes
└── pages/
    ├── Accueil.jsx
    ├── Connexion.jsx
    ├── Inscription.jsx
    ├── Reservation.jsx
    ├── ReservationSuccess.jsx
    ├── Mon_profil.jsx
    ├── Historique.jsx
    └── Profil.jsx
```

### 🔄 Flux de navigation

```
BrowserRouter (main.jsx)
    ↓
App.jsx (ReservationProvider)
    ↓
AppContent (Routes)
    ├── Navbar (si pas authentification)
    └── Routes (Pages)
```

### 🛡️ Protection des routes

Exemple d'utilisation avec ProtectedRoute:
```jsx
<Route 
  path="/mon-profil" 
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Mon_profil />
    </ProtectedRoute>
  } 
/>
```

### 📊 État partagé

Utiliser le ReservationContext pour partager l'état entre pages:

```jsx
import { useContext } from 'react'
import { ReservationContext } from '../context/ReservationContext'

function MyComponent() {
  const { reservedDriver, setReservedDriver } = useContext(ReservationContext)
  // ...
}
```

### 🗺️ Routes disponibles

| Route | Page | Description |
|-------|------|-------------|
| `/` | Accueil | Page d'accueil |
| `/connexion` | Connexion | Page de connexion |
| `/inscription` | Inscription | Page d'inscription |
| `/reservation` | Reservation | Réserver un trajet |
| `/reservation-success` | ReservationSuccess | Confirmation de réservation |
| `/mon-profil` | Mon_profil | Profil utilisateur |
| `/historique` | Historique | Historique des trajets |
| `/profil/:id` | Profil | Profil d'un chauffeur |

### 🎯 Bonnes pratiques

1. **Navigation par Link** : Utiliser `<Link>` de react-router-dom au lieu de `<a>`
2. **useNavigate** : Pour naviguer programmatiquement après une action
3. **useLocation** : Pour accéder aux infos de la route actuelle
4. **Contextes** : Pour partager l'état global sans prop drilling
5. **Routes imbriquées** : Possibilité d'ajouter des sous-routes

### 💡 Amélioration future

- [ ] Ajouter l'authentification avec tokens JWT
- [ ] Implémenter ProtectedRoute pour routes privées
- [ ] Ajouter un composant PageNotFound (404)
- [ ] Implémenter le lazy loading des pages (React.lazy)
- [ ] Ajouter des animations de transition entre pages
