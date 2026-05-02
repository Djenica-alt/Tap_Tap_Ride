import { useLocation, useNavigate } from "react-router-dom"

export default function ReservationConfirmation() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const driver = state?.driver

  if (!driver) {
    return <div>No driver selected</div>
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Confirmation</h2>

      <p><strong>Driver:</strong> {driver.name}</p>
      <p><strong>Car:</strong> {driver.car}</p>
      <p><strong>Price:</strong> {driver.price}</p>
      <p><strong>Arrival:</strong> {driver.arrival}</p>

      <button onClick={() => navigate("/")}>
        Back to Reservation
      </button>

      <button
        onClick={() => navigate("/success")}
        style={{ marginLeft: "10px" }}
      >
        Confirm Ride
      </button>
    </div>
  )
}