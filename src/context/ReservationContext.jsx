import { createContext, useState } from 'react'

export const ReservationContext = createContext()

export function ReservationProvider({ children }) {
  const [reservedDriver, setReservedDriver] = useState(null)

  return (
    <ReservationContext.Provider value={{ reservedDriver, setReservedDriver }}>
      {children}
    </ReservationContext.Provider>
  )
}
