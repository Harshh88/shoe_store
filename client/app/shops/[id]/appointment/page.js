"use client";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainAppointment from "./MainAppointment";

export default function Booking() {
  const params = useParams();
  const shop_id = params.id;
  const router = useRouter();

  const [bookingShop, setBookingShop] = useState({
    name: "",
    address: "",
    description: "",
    shop_image: ""
  });

  useEffect(() => {
    const getBookingShop = async (exitToken) => {
      try {
        const res = await api.post(`/booking/${shop_id}/get-shop`, {}, {
          headers: {
            Authorization: `Bearer ${exitToken}`
          }
        });
        setBookingShop(res.data.shop);
      } catch (err) {
        console.log(err);
      }
    };
    const existToken = localStorage.getItem("token");
    if (!existToken) {
      router.push("/login");
    } else {
      getBookingShop(existToken);
    }
  }, [shop_id, router]);

  const handleBookingSubmit = async (finalDateTime) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "Please Login first" };
    
    try {
      const res = await api.post(
        "/booking/create",
        {
          shop_id,
          booking_datetime: finalDateTime,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <MainAppointment 
      bookingShop={bookingShop} 
      onBookingSubmit={handleBookingSubmit} 
    />
  );
}