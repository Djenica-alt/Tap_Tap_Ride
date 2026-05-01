import { useState, useEffect } from 'react'
import Profil from './Profil'

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "../mapConfig"

export default function Reservation({ onReserve, onOpenProfile, onOpenHistorique }) {
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [departure, setDeparture] = useState('')
  const [destination, setDestination] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const [userPosition, setUserPosition] = useState(null)

  // 🆕 Ride coordinates
  const [pickup, setPickup] = useState(null)
  const [destinationCoords, setDestinationCoords] = useState(null)

  // 📍 GET USER LOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setUserPosition([latitude, longitude])
      },
      (err) => {
        console.error(err)
        setUserPosition([18.5944, -72.3074])
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }, [])

  // 🖱️ MAP CLICK HANDLER
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        const coords = [e.latlng.lat, e.latlng.lng]

        if (!pickup) {
          setPickup(coords)
          setDeparture("Point sélectionné sur la carte")
        } else if (!destinationCoords) {
          setDestinationCoords(coords)
          setDestination("Destination sélectionnée")
        } else {
          // reset
          setPickup(coords)
          setDestinationCoords(null)
          setDeparture("Point sélectionné sur la carte")
          setDestination("")
        }
      },
    })

    return null
  }

  const drivers = [
    {
      name: 'Marc Antoine',
      car: 'Toyota Corolla • AB-1234',
      distance: '0.5 km',
      rating: 4.7,
      price: '220 HTG',
      arrival: '8 min',
    },
    {
      name: 'Jean Michel',
      car: 'Nissan Sentra • EF-9012',
      distance: '0.5 km',
      rating: 5.0,
      price: '160 HTG',
      arrival: '3 min',
    },
    {
      name: 'Marie Flores',
      car: 'Hyundai Elantra • GH-3456',
      distance: '1.2 km',
      rating: 4.8,
      price: '180 HTG',
      arrival: '6 min',
    },
    {
      name: 'Sophie Laurent',
      car: 'Honda Civic • CD-5678',
      distance: '0.5 km',
      rating: 4.9,
      price: '150 HTG',
      arrival: '2 min',
    },
  ]

  const handleSearch = () => {
    if ((pickup && destinationCoords) || (departure.trim() && destination.trim())) {
      setHasSearched(true)
    } else {
      setHasSearched(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputChange = (value, type) => {
    if (type === 'departure') {
      setDeparture(value)
    } else {
      setDestination(value)
    }
  }

  const isFormValid =
    (pickup && destinationCoords) ||
    (departure.trim() && destination.trim())

  // ⏳ Loading
  if (!userPosition) {
    return <div>Loading your location...</div>
  }

  return (
    <div className="reservation-page">
      <div className="reservation-card">

        {/* HEADER */}
        <header className="reservation-header">
          <div className="reservation-brand">TapTap Ride</div>
          <div
            className="reservation-menu"
            onClick={() => setIsProfileOpen(true)}
          >
            ☰
          </div>
        </header>

        {/* MAP */}
        <section className="reservation-map-section">
          <MapContainer
            center={userPosition}
            zoom={14}
            className="reservation-map-card"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            <MapClickHandler />

            {/* User */}
            <Marker position={userPosition} />

            {/* Pickup */}
            {pickup && <Marker position={pickup} />}

            {/* Destination */}
            {destinationCoords && <Marker position={destinationCoords} />}
          </MapContainer>
        </section>

        {/* SEARCH */}
        <section className="reservation-search-section">
          <div className="reservation-search">
            <label className="search-box">
              <span className="search-icon">📍</span>
              <input
                type="text"
                placeholder="Point de départ"
                value={departure}
                onChange={(e) =>
                  handleInputChange(e.target.value, 'departure')
                }
                onKeyDown={handleKeyPress}
              />
            </label>

            <label className="search-box">
              <span className="search-icon">🔎</span>
              <input
                type="text"
                placeholder="Où allez-vous ?"
                value={destination}
                onChange={(e) =>
                  handleInputChange(e.target.value, 'destination')
                }
                onKeyDown={handleKeyPress}
              />
            </label>

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
                const isSelected = driver.name === selectedDriver

                return (
                  <div
                    key={driver.name}
                    className={`driver-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDriver(driver.name)}
                  >
                    <div className="driver-left">
                      <div className="driver-avatar">👤</div>

                      <div className="driver-info">
                        <h3 className="driver-name">{driver.name}</h3>
                        <p className="driver-car">{driver.car}</p>
                        <p className="driver-distance">
                          {driver.distance} de vous
                        </p>
                      </div>
                    </div>

                    <div className="driver-right">
                      <div className="driver-rating">
                        ⭐ {driver.rating}
                      </div>

                      <p className="driver-price">{driver.price}</p>

                      <p className="driver-arrival">
                        Arrivée: {driver.arrival}
                      </p>

                      {isSelected && (
                        <button
                          type="button"
                          className="driver-select-btn"
                          onClick={(event) => {
                            event.stopPropagation()
                            onReserve?.(driver)
                          }}
                        >
                          Réserver maintenant
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <div className="no-search-message">
              Remplissez les champs ou utilisez la carte pour définir le trajet
            </div>
          )}
        </section>
      </div>

      {/* PROFILE SIDEBAR */}
      {isProfileOpen && (
        <div
          className="profile-overlay"
          onClick={() => setIsProfileOpen(false)}
        >
          <div
            className="profile-sidebar"
            onClick={(event) => event.stopPropagation()}
          >
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