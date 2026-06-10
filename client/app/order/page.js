"use client"
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ShippingForm from "@/component/ShippingForm"; // Import matching design

export default function OrderCheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCosts, setCartCosts] = useState({ totalprice: 0, totalquantity: 0 });
  
  const [formData, setFormData] = useState({
    user_name: "",
    country: "",
    state: "",
    city: "",
    address: "",
    contact_number: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cartTotal = async () => {
    const existToken = localStorage.getItem("token");
    try {
      const resCosts = await api.post("/cart/items-price", {}, {
        headers: { Authorization: `Bearer ${existToken}` }
      });
      setCartCosts(resCosts.data.result || { totalprice: 0, totalquantity: 0 });
      setCartItems(resCosts.data.items || []);
    } catch (err) {
      console.error("Error fetching cart metrics:", err);
    }
  };

  useEffect(() => { cartTotal(); }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const existToken = localStorage.getItem("token");
    try {
      const res = await api.post("/order", {
        ...formData,
        total_amount: cartCosts.totalprice
      }, {
        headers: { Authorization: `Bearer ${existToken}` }
      });
      
      if (res.status === 200 || res.data?.order_id) {
        router.push(`/order/payment/${res.data.order_id}?amount=${cartCosts.totalprice}`);
      }
    } catch (err) {
      console.error("Error processing transaction payload:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ShippingForm 
      formData={formData}
      handleChange={handleChange}
      cartItems={cartItems}
      cartCosts={cartCosts}
      submitForm={submitForm}
      loading={loading}
    />
  );
}