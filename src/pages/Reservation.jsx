import { useState, useEffect } from 'react'
import Profil from './Profil'
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "../mapConfig"
import historyIcon from "../assets/history.png"

const HAITI_CENTER = [18.9712, -72.2852]

const HAITI_BOUNDS = [
  [17.0, -75.2],
  [20.6, -71.0],
]

const HAITI_CITIES = [
  "Port-au-Prince",
  "Delmas",
  "Pétion-Ville",
  "Carrefour",
  "Cap-Haïtien",
  "Gonaïves",
  "Les Cayes",
  "Jacmel",
  "Hinche",
  "Saint-Marc",
  "Petit-Goâve",
  "Léogâne"
]

export default function Reservation({
  onReserve,
  onOpenProfile,
  onOpenHistorique
}) {
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const [userPosition, setUserPosition] = useState(null)

  const [pickup, setPickup] = useState(null)
  const [destinationCoords, setDestinationCoords] = useState(null)

  // 📍 GET USER LOCATION
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserPosition(HAITI_CENTER)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserPosition([latitude, longitude])
      },
      () => setUserPosition(HAITI_CENTER),
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0,
      }
    )
  }, [])

  // 🚫 HAITI LIMIT
  function isInHaiti(lat, lng) {
    return (
      lat >= 17.0 &&
      lat <= 20.6 &&
      lng >= -75.2 &&
      lng <= -71.0
    )
  }

  // 🗺 MAP CLICK
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng

        if (!isInHaiti(lat, lng)) return

        const coords = [lat, lng]

        if (!pickup) {
          setPickup(coords)
          setDeparture("Point sélectionné en Haïti")
        } else if (!destinationCoords) {
          setDestinationCoords(coords)
          setDestination("Destination sélectionnée en Haïti")
        } else {
          setPickup(coords)
          setDestinationCoords(null)
          setDeparture("Point sélectionné en Haïti")
          setDestination("")
        }
      },
    })
    return null
  }

  const drivers = [
    { name: 'Marc Antoine', car: 'Toyota Corolla • AB-1234', distance: '0.5 km', rating: 4.7, price: '220 HTG', arrival: '8 min' },
    { name: 'Jean Michel', car: 'Nissan Sentra • EF-9012', distance: '0.5 km', rating: 5.0, price: '160 HTG', arrival: '3 min' },
    { name: 'Marie Flores', car: 'Hyundai Elantra • GH-3456', distance: '1.2 km', rating: 4.8, price: '180 HTG', arrival: '6 min' },
    { name: 'Sophie Laurent', car: 'Honda Civic • CD-5678', distance: '0.5 km', rating: 4.9, price: '150 HTG', arrival: '2 min' },
  ]

  const isFormValid =
    departure && destination && departure !== destination

  const handleSearch = () => {
    const validMap = pickup && destinationCoords
    const validSelect = departure && destination && departure !== destination

    setHasSearched(validMap || validSelect)
  }

  if (!userPosition) {
    return <div>Loading your location...</div>
  }

  return (
    <div className="reservation-page">
      <div className="reservation-card">

        {/* HEADER */}
        <header className="reservation-header">
          <div className="reservation-brand">TapTap Ride</div>

          <div className="header-actions">

            <div
              className="history-icon"
              onClick={() => onOpenHistorique?.()}
            >
              <img src={historyIcon} alt="Historique" />
            </div>

            <div
              className="reservation-menu"
              onClick={() => setIsProfileOpen(true)}
            >
              ☰
            </div>

          </div>
        </header>

        {/* MAP */}
        <section className="reservation-map-section">
          <MapContainer
            center={userPosition}
            zoom={12}
            minZoom={7}
            maxZoom={18}
            maxBounds={HAITI_BOUNDS}
            maxBoundsViscosity={1.0}
            className="reservation-map-card"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler />

            <Marker position={userPosition} />
            {pickup && <Marker position={pickup} />}
            {destinationCoords && <Marker position={destinationCoords} />}
          </MapContainer>
        </section>

        {/* SEARCH */}
        <section className="reservation-search-section">
          <div className="reservation-search">

            <select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className="search-box"
            >
              <option value="">Point de départ</option>
              {HAITI_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="search-box"
            >
              <option value="">Où allez-vous ?</option>
              {HAITI_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <button
              className="search-button"
              onClick={handleSearch}
              disabled={!isFormValid}
            >
              Rechercher un trajet
            </button>

          </div>
        </section>

        {/* DRIVERS */}
        <section className="drivers-block">
          {hasSearched ? (
            <>
              <div className="drivers-count">
                Chauffeurs disponibles ({drivers.length})
              </div>

              {drivers.map((driver) => {
                const isSelected = selectedDriver === driver.name

                return (
                  <div
                    key={driver.name}
                    className={`driver-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDriver(driver.name)}
                  >
                    <div className="driver-left">
                      <div className="driver-avatar">👤</div>
                      <div className="driver-info">
                        <h3>{driver.name}</h3>
                        <p>{driver.car}</p>
                        <p>{driver.distance} de vous</p>
                      </div>
                    </div>

                    <div className="driver-right">
                      <div>⭐ {driver.rating}</div>
                      <p>{driver.price}</p>
                      <p>Arrivée: {driver.arrival}</p>
                    </div>

                    {isSelected && (
                      <button
                        className="driver-select-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          onReserve?.(driver)
                        }}
                      >
                        Réserver maintenant
                      </button>
                    )}
                  </div>
                )
              })}
            </>
          ) : (
            <div className="no-search-message">
              Choisissez des villes en Haïti ou utilisez la carte
            </div>
          )}
        </section>
      </div>

      {/* PROFILE */}
      {isProfileOpen && (
        <div
          className="profile-overlay"
          onClick={() => setIsProfileOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Profil
              onClose={() => setIsProfileOpen(false)}
              onOpenFullProfile={() => {
                setIsProfileOpen(false)
                onOpenProfile?.()
              }}
              onOpenHistorique={() => {
                setIsProfileOpen(false)
                onOpenHistorique?.()
              }}
              sidebar
            />
          </div>
        </div>
      )}
    </div>
  )
}