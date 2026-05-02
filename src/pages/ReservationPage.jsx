import { useNavigate } from "react-router-dom"
import Reservation from "../components/Reservation"

export default function ReservationPage() {
  const navigate = useNavigate()

  return (
    <Reservation
      onReserve={(driver) =>
        navigate("/confirmation", { state: { driver } })
      }
      onOpenProfile={() => navigate("/profile")}
      onOpenHistorique={() => navigate("/historique")}
    />
  )
}