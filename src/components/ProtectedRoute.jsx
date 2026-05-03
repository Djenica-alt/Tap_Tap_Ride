import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />
  }

  return children
}

export default ProtectedRoute
