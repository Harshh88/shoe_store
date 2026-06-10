"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import MainProduct from "../[id]/MainProduct";
import { useProducts } from "@/context/ProductContext";

export default function AllProducts() {
  const initalState = {
    id: "",
    shop_name: "",
    user_id: "",
    user_name: ""
  };
  
  const [shopData, setShopData] = useState(initalState);
  const [cartCount, setCartCount] = useState(0); // Live Navbar Counter State
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { products, setProducts } = useProducts();

  // Fetch Live Total Items Count in Active Cart
  const fetchCartCounter = useCallback(async () => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) return;
      const res = await api.post("/cart/items-price", {}, {
        headers: { Authorization: `Bearer ${existToken}` }
      });
      if (res.data?.success && res.data.result) {
        setCartCount(Number(res.data.result.totalquantity || 0));
      }
    } catch (err) {
      console.log("Error fetching cart items count token:", err);
    }
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await api.get(`/shop/${id}`);
        setShopData(res.data.shop);
        setProducts(res.data.products || []);
      } catch (err) {
        console.log("something error in fetching all shops", err);
      }
    };
    fetchAllProducts();
    fetchCartCounter();
  }, [id, setProducts, fetchCartCounter]);

  const goToBooking = (shop_id) => {
    try {
      router.push(`/shops/${shop_id}/appointment`);
    } catch (err) {
      console.log(err);
    }
  };

  const addCart = async (productId) => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) {
        router.push("/login");
        return;
      }
      const response = await api.post("/cart/add-item",
        { product_id: productId },
        {
          headers: { Authorization: `Bearer ${existToken}` }
        }
      );
      if (response.status === 200 || response.data) {
        alert("Item allocated to cart module successfully.");
        fetchCartCounter(); // Counter pipeline instantly refresh trigger
      }
    } catch (err) {
      console.log("err in addCart frontend function", err);
      alert(err.response?.data?.message || "Cart insertion sequence rejected.");
    }
  };

  return (
    <div className="mt-[-1.4rem]">
      <MainProduct 
        shop={shopData} 
        addCart={addCart} 
        goToBooking={goToBooking} 
        cartCount={cartCount} // Passed down live sync counter
      />
    </div>
  );
}