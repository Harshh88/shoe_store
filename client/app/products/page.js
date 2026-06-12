"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import ProductsMarketplace from "./ProductsMarketplace";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [cartCount, setCartCount] = useState(0); 
  const router = useRouter();

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
    api.get("/product/global")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products);
        }
      })
      .catch((err) => console.error("Error connecting to inventory", err))
      .finally(() => setLoading(false));

    fetchCartCounter(); 
  }, [fetchCartCounter]);

  useEffect(() => {
    let temp = products;

    if (searchQuery) {
      temp = temp.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory !== "All Products") {
      if (selectedCategory === "In Stock") {
        temp = temp.filter(p => p.stock > 0);
      } else {
        temp = temp.filter(p => 
          (p.description && p.description.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          (p.name && p.name.toLowerCase().includes(selectedCategory.toLowerCase()))
        );
      }
    }

    setFilteredProducts(temp);
  }, [searchQuery, selectedCategory, products]);

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
        fetchCartCounter(); 
      }
    } catch (err) {
      console.log("err in addCart frontend function", err);
      alert(err.response?.data?.message || "Cart insertion sequence rejected.");
    }
  };

  return (
    <ProductsMarketplace 
      filteredProducts={filteredProducts}
      loading={loading}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      cartCount={cartCount}
      addCart={addCart}
    />
  );
}