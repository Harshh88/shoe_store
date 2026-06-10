"use client";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import MainCart from "../cart/MainCart";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const router = useRouter();
  const { cartItems, setCartItems } = useCart();
  const [token, setToken] = useState(null);
  const [total, setTotal] = useState({
    totalprice: "",
    totalquantity: ""
  });

  const fetchCart = useCallback(async () => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) {
        router.push("/login");
        return;
      }
      setToken(existToken);
      const res = await api.post(
        "/cart",
        {},
        {
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        },
      );
      console.log(res.data);
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.log("err in fetchCart", err);
    }
  }, [router, setCartItems]);

  const deleteItem = async (id, product_id) => {
    const existToken = localStorage.getItem("token");
    try {
      await api.delete(
        "/cart/delete-item",
        {
          data: { cartItemId: id, productId: product_id },
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        },
      );
      fetchCart();
    } catch (err) {
      console.log("err in deleteItem frontend function", err);
    }
  };

  const totalOfCart = async () => {
    const existToken = localStorage.getItem("token");
    try {
      const res = await api.post("/cart/items-price",
        {},
        {
          headers: {
            Authorization: `Bearer ${existToken}`
          }
        }
      );
      setTotal(res.data.result);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Checkout redirect trigger controller handler
  const handleCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart terminal is empty.");
      return;
    }
    router.push("/order");
  };

  useEffect(() => {
    fetchCart();
    totalOfCart();
  }, [fetchCart]);

  return (
    <MainCart 
      totalOfProduct={total} 
      deleteItem={deleteItem}
      onCheckout={handleCheckout} 
    />
  );
}