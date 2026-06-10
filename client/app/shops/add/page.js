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

  const addNewShop = async (shopData) => {
    const currentToken = token || localStorage.getItem("token");

    if (!currentToken) {
      alert("Session expired. Please login again.");
      router.push("/login");
      return;
    }

    try {
      const res = await api.post(`/shop/add-shop`, shopData, {
        headers: {
            Authorization: `Bearer ${currentToken}`
        }
      });
      
      if (res.data.success) {
        const newToken = res.data.token;
        
        const sellerWindow = window.open('http://localhost:3002/seller', '_self');
        
        const interval = setInterval(() => {
          if (sellerWindow) {
            sellerWindow.postMessage(
              { type: 'SET_SELLER_TOKEN', token: newToken },
              'http://localhost:3002'
            );
          }
        }, 500);

        setTimeout(() => {
          clearInterval(interval);
        }, 3000);
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