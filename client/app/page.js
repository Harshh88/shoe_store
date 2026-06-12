"use client";

import LogoMain from "@/component/LogoMain";
import SearchBar from "@/component/SearchBar";
import NavBar from "@/component/NavBar";
import Button from "@/component/Button";
import HomeCard from "@/component/HomeCard";
import { useCallback, useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { NearbyShops } from "@/component/NearbyShop";
import { PopularStaples } from "@/component/PopularStaples";
import {Newsletter} from "@/component/NeverMiss"
import { Footer } from "@/component/HomeFooter";

export default function Home() {
  const { shops, setShops } = useShop();
  
  useEffect(() => {
    let initialCoords = null;

    const executeFetchPipeline = async (lat = null, long = null) => {
      try {
        const payload = { limit: 6 };
        if (lat && long) {
          payload.latitude = lat;
          payload.longitude = long;
        }

        const res = await api.post("/shop/nearby", payload);
        
        if (res.data?.success && res.data.shops?.length > 0) {
          setShops(res.data.shops);
        } else {
          const fallbackRes = await api.post("/shop/nearby", { limit: 6 });
          if (fallbackRes.data?.shops) setShops(fallbackRes.data.shops);
        }
      } catch (err) {
        console.log("Database pipeline query processing error:", err);
      }
    };

    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      try {
        initialCoords = JSON.parse(savedLocation);
        if (initialCoords?.lat && initialCoords?.long) {
          executeFetchPipeline(initialCoords.lat, initialCoords.long);
        }
      } catch (e) {
        console.log("Cache reading error:", e);
      }
    } else {
      executeFetchPipeline();
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          if (
            !initialCoords || 
            Math.abs(initialCoords.lat - latitude) > 0.001 || 
            Math.abs(initialCoords.long - longitude) > 0.001
          ) {
            await executeFetchPipeline(latitude, longitude);
            localStorage.setItem(
              "location",
              JSON.stringify({ long: longitude, lat: latitude })
            );
          }
        },
        async (error) => {
          await executeFetchPipeline(); 
        },
        { enableHighAccuracy: true, timeout: 5000 } 
      );
    } else {
      executeFetchPipeline();
    }
  }, [setShops]);

  return (
    <div className="bg-[#0E0E0E] min-h-screen w-full overflow-x-hidden">
       <header className="flex py-[1rem] px-[1rem] sm:px-[2rem] gap-[1rem] items-center justify-between w-full border-b border-zinc-900/40 lg:border-none">
        <div className="flex items-center gap-[1rem] sm:gap-[2rem] flex-1 lg:flex-none">
          <LogoMain className="shrink-0" />
          <SearchBar className="w-full sm:w-auto" />
        </div>
        <div className="flex items-center justify-end lg:w-[25%]">
          <NavBar
            links={[
              { label: "Shops", href: "/shops" },
              { label: "Products", href: "/products" },
            ]}
            className="w-full"
          />
        </div>
      </header>
      
      <HomeCard />
      
      <div className="bg-black w-full">
        <div className="mt-[2rem] sm:mt-[3rem]">
          <NearbyShops />
        </div>
        <div className="bg-[#0E0E0E] pb-16">
          <PopularStaples />
        </div>
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
}


