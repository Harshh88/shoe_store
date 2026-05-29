"use client";
import MainSeller from "./MainSeller";
import { useBooking } from "@/context/BookingContext";
import { useProducts } from "@/context/ProductContext";
import { useToken } from "@/context/TokenContext";
import { useOrder } from "@/context/OrderContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";

export default function Seller() {
  const { allBookings, setAllBookings } = useBooking();
  const {products,setProducts} = useProducts();
  const {order,setOrder} = useOrder();
  // const {sellerToken,setSellerToken} = useToken();
  const router = useRouter();
  const fetchBookings = async (sellerToken) => {
    // console.log(sellerToken);
    // console.log(localStorage.getItem("user"))
    try {
      // setBtnFlag(true);
      const response = await api.post(
        "/booking/seller/get-bookings",
        {},
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        },
      );
      // console.log(response.data);
      if (response.data.getAllBookings === undefined) {
        console.log("sorry no bookings on your shop");
        // setBtnFlag(false);
        return;
      }
      // localStorage.setItem("bookings",JSON.stringify(response.data.getAllBookings))
      setAllBookings(response.data.getAllBookings);
      // console.log(response.data.getAllBookings);
    } catch (err) {
      console.log("something error in fetchbookings", err);
      // setBtnFlag(false);
    }
  };
  const fetchAllProducts = async(sellerToken) => {
    try{
      const response = await api.post(`/product`,{},{
        headers: {
          Authorization: `Bearer ${sellerToken}`
        }
      })
      // console.log(response.data.product);
      setProducts(response.data.product);
    }catch(err){
      console.log(err);
    }
  }

  const fetchAllOrders = async(sellerToken) => {
    try{
      const response = await api.post(`order/get-order`,{},{
        headers:{
          Authorization: `Bearer ${sellerToken}`
        }
      })
      setOrder(response.data.orders);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    try {
      const existToken = localStorage.getItem("sellerToken");
      if (!existToken) {
        router.push("/seller/login");
        return;
      }
      const decoded = jwtDecode(existToken);
      if (decoded.role !== "SELLER") {
        alert("only seller or admin can access");
        router.push("/seller/login");
      }
      // setSellerToken(existToken);
      fetchBookings(existToken);
      fetchAllProducts(existToken);
      fetchAllOrders(existToken);
      // console.log(existToken);
    } catch (err) {
      console.log(err);
      router.push("/seller/login");
    }
  }, []);
  return (
    <div>
      <MainSeller totalBooking={allBookings.length} totalProducts={products.length} totalOrder={order.length} products={products} orders={order}/>
    </div>
  );
}
