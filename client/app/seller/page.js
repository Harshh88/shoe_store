"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
// import { headers } from "next/headers";

export default function Admin() {
  const [allBookings, setAllBookings] = useState([]);
  const [sellerToken, setSellerToken] = useState(null);
  const [btnFlag, setBtnFlag] = useState(false);
  const router = useRouter();

  const confirmBookings = async (id) => {
    try {
      const res = await api.put(
        "/booking/seller/confirm-bookings",
        { id: id },
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        },
      );
      console.log(res);
      fetchBookings();
    } catch (err) {
      console.log(err);
      if(err.status === 409){
        alert("booking is not pending or already confirmed");
        return;
      }
    }
  };
  const completeBookings = async (id) => {
    try{
      const res = await api.put("/booking/seller/complete-bookings",
        {id:id},
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`
          }
        }
      )
      console.log(res);
      fetchBookings();
    }
    catch(err){
      console.log(err);
      if(err.status === 409){
        alert("booking is not confirmed or already completed");
        return;
      }
    }
  }
 
  return (
    <div className="text-white">
      <div className="flex">
      <button
        onClick={fetchBookings}
        className="bg-green-400 m-[1rem] p-[0.5rem] rounded-full cursor-pointer"
      >
        Bookings
      </button>
      {allBookings.map((booking) => (
        <div key={booking.id}>
          <h1 className="text-white">{btnFlag && booking.name}</h1>
          <h2>{btnFlag && booking.email}</h2>
          <h2>
            {btnFlag &&
              new Date(booking.booking_datetime).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
          </h2>
          <h2>{btnFlag && booking.status}</h2>
          <button
            onClick={() => confirmBookings(booking.id)}
            className="bg-yellow-600 p-[0.5rem] m-[1rem] rounded-full"
          >
            {btnFlag ? "confirm_booking" : ""}
          </button>
          <button
          onClick={()=> completeBookings(booking.id)}
          className="bg-yellow-600 p-[0.5rem] m-[1rem] rounded-full"
          >
            {btnFlag ? "complete_booking" : ""}
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}
