"use client"
import { useState,useContext,createContext } from "react"

const BookingContext = createContext();

export const BookingProvider = ({children}) => {
    const [allBookings,setAllBookings] = useState([]);
    return(
        <BookingContext.Provider value={{allBookings,setAllBookings}}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => useContext(BookingContext)