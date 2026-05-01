import { useState, useEffect } from 'react'
import './Mon_profil.css'

export default function Mon_profil({ onBack, onOpenHistorique }) {
  const [profilePicture, setProfilePicture] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load profile picture from localStorage on component mount
    const savedPicture = localStorage.getItem('profilePicture')

    if (savedPicture) {
      setProfilePicture(savedPicture)
    }
  }, [])

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsLoading(true)

    const reader = new FileReader()

    reader.onloadend = () => {
      const base64Image = reader.result

      // Save to localStorage
      localStorage.setItem('profilePicture', base64Image)

      setProfilePicture(base64Image)
      setIsLoading(false)
    }

    reader.readAsDataURL(file)
  }

  return (
    <div className="mon-profil-page">
      <div className="mon-profil-card">

        <header className="mon-profil-header">
          <button type="button" className="mon-profil-back" onClick={onBack}>
            ← Mon Profil
          </button>
        </header>

        <div className="mon-profil-user-card">
          <div
            className="mon-profil-avatar"
            onClick={() => !isLoading && document.getElementById('profilePictureInput').click()}
          >
            {profilePicture ? (
              <img src={profilePicture} alt="Profile" />
            ) : (
              'SA'
            )}

            <div className="mon-profil-avatar-overlay">
              {isLoading ? 'Uploading...' : 'Upload'}
            </div>

            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mon-profil-file-input"
              disabled={isLoading}
            />
          </div>

          <div className="mon-profil-user-info">
            <div className="mon-profil-name">Alce Steevens</div>
            <div className="mon-profil-status">Membre depuis mars 2022</div>
            <div className="mon-profil-rating">4.9 (842 évaluations)</div>
          </div>
        </div>

        <section className="mon-profil-section">
          <div className="mon-profil-section-title">Informations de contact</div>
          <div className="mon-profil-field">
            <span>Email</span>
            <div>alces@example.com</div>
          </div>
          <div className="mon-profil-field">
            <span>Téléphone</span>
            <div>+509 1234 5678</div>
          </div>
          <div className="mon-profil-field">
            <span>Adresse</span>
            <div>Port-au-Prince, Haïti</div>
          </div>
        </section>

        <section className="mon-profil-activity">
          <div className="mon-profil-section-title">Activité</div>

          <div className="mon-profil-activity-grid">
            <div className="mon-profil-activity-card">
              <div className="mon-profil-activity-value">5</div>
              <div className="mon-profil-activity-label">Courses ce mois-ci</div>
            </div>

            <div className="mon-profil-activity-card">
              <div className="mon-profil-activity-value">1 105</div>
              <div className="mon-profil-activity-label">HTG dépensés</div>
            </div>

            <div className="mon-profil-activity-card">
              <div className="mon-profil-activity-value">42</div>
              <div className="mon-profil-activity-label">Courses totales</div>
            </div>

            <div className="mon-profil-activity-card">
              <div className="mon-profil-activity-value">15</div>
              <div className="mon-profil-activity-label">Chauffeurs favoris</div>
            </div>
          </div>
        </section>

        <section className="mon-profil-section">
          <div className="mon-profil-section-title">Préférences</div>
          <div className="mon-profil-option">Notification push</div>
          <div className="mon-profil-option">Partager ma position</div>
          <div className="mon-profil-option">Recevoir les promotions</div>
        </section>

        <button
          type="button"
          className="mon-profil-historique-button"
          onClick={onOpenHistorique}
        >
          Historique des trajets
        </button>

        <button type="button" className="mon-profil-logout-button">
          Se déconnecter
        </button>
      </div>
    </div>
  )
}