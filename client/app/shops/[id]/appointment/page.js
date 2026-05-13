"use client";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MainAppointment from "./MainAppointment";

export default function Booking() {
  const params = useParams();
  const shop_id = params.id;
  const intialState = {
    booking_datetime: "",
  };
  const intialShop = {
    name:"",
    address:"",
    description:"",
    shop_image:""
  }
  const [formData, setFormData] = useState(intialState);
  const [bookingShop,setBookingShop] = useState(intialShop);

  const router = useRouter();

  useEffect(() => {
    const getBookingShop = async (exitToken) => {
      try {
        const res = await api.post(`/booking/${shop_id}/get-shop`,
          {},
          {
            headers: {
              Authorization: `Bearer ${exitToken}`
            }
          }
        );
        setBookingShop(res.data.shop);
        console.log(res);
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
  }, [shop_id,router]);
  const createBooking = async (formData) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await api.post(
        "/booking/create",
        {
          shop_id,
          booking_datetime: formData.booking_datetime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res;
    } catch (err) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBooking(formData);
      setFormData(intialState);
      console.log(res);
    } catch (err) {
      console.log("something error in handleSubmit function", err);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    // <form onSubmit={handleSubmit} className="text-white">
    //   <input
    //     className="bg-gray-500"
    //     name="booking_datetime"
    //     type="datetime-local"
    //     value={formData.booking_datetime}
    //     onChange={handleChange}
    //   />
    //   <button>Book</button>
    // </form>
    <MainAppointment bookingShop={bookingShop}/>
  );
}
