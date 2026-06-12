"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import CreateShop from './CreateShop'; 
import api from '@/lib/api'; 

export default function AddShop() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
        router.push("/login");
    } else {
        setToken(storedToken);
    }
  }, [router]);

  const addNewShop = async (formDataInstance) => {
    const currentToken = token || localStorage.getItem("token");

    if (!currentToken) {
      alert("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      // Yaha hum direct standard Formdata bhej rahe hai
      const res = await api.post(`/shop/add-shop`, formDataInstance, {
        headers: {
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'multipart/form-data' // File upload ke liye important h
        }
      });
      
      if (res.data.success) {
        // Redirection as requested
        window.location.href = "https://shoe-store-h27r.vercel.app/seller/login";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <CreateShop onCreate={addNewShop} />
    </div>
  );
}