import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingInfo, setBookingInfo] = useState(null);

  const clearBookingInfo = () => setBookingInfo(null);

  return (
    <BookingContext.Provider
      value={{ bookingInfo, setBookingInfo, clearBookingInfo }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
