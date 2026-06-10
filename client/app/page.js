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

   // Optimized Fetch Matrix
    // -----------------------------------------------------------------
  // OPTIMIZED LOCATION & SHOP FETCH PIPELINE (WITH USEEFFECT)
  // -----------------------------------------------------------------
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
          // STRICT FILTER: Agar lat-long bheja hai, toh sirf vhi dikhao jo backend se filter hokar aayi hain
          setShops(res.data.shops);
          console.log("Strict Nearby Shops Loaded:", res.data.shops);
        } else {
          // Fallback: Agar location ON hone par bhi area (5km) me 0 shops mili, ya location OFF hai, tabhi random load karo
          console.log("No shops nearby or location unavailable. Loading random fallback shops...");
          const fallbackRes = await api.post("/shop/nearby", { limit: 6 });
          if (fallbackRes.data?.shops) setShops(fallbackRes.data.shops);
        }
      } catch (err) {
        console.log("Database pipeline query processing error:", err);
      }
    };

    // 1. LocalStorage Cache (Instant Load)
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
      executeFetchPipeline(); // No cache -> Load fallback random instantly
    }

    // 2. Live Runtime Geolocation Prompt
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          if (
            !initialCoords || 
            Math.abs(initialCoords.lat - latitude) > 0.001 || 
            Math.abs(initialCoords.long - longitude) > 0.001
          ) {
            // Live precise location milte hi strictly nearby fetch karega
            await executeFetchPipeline(latitude, longitude);
            localStorage.setItem(
              "location",
              JSON.stringify({ long: longitude, lat: latitude })
            );
          }
        },
        async (error) => {
          console.log("Location Denied. Loading random shops:", error.message);
          await executeFetchPipeline(); // User ne block kiya -> Random load
        },
        { enableHighAccuracy: true, timeout: 5000 } // High accuracy true kiya taaki accurate GPS coordinates milein
      );
    } else {
      executeFetchPipeline();
    }
  }, [setShops]);
  // -----------------------------------------------------------------

   const shopss = [
    { name: "The Vault", location: "New York City, NY", tag: "Downtown", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
    { name: "Sole Society", location: "Los Angeles, CA", tag: "Westside", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
    { name: "Carbon Collective", location: "Chicago, IL", tag: "Art District", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
  ];

  return (
    <div className="bg-[#0E0E0E] h-[150vh] w-[100vw]">
       <div className="flex py-[1rem] px-[2rem] gap-[1rem] items-center justify-between">
        <div className="flex items-center gap-[2rem] w-[45%]">
          <LogoMain className={""} />
          <SearchBar className={"w-[45%] h-[3rem] "} />
        </div>
        <div className="flex items-center gap-[2rem] w-[25%]">
          <NavBar
            links={[
              { label: "Shops", href: "/shops" },
              { label: "Drops", href: "/drops" },
              { label: "Release Radar", href: "/release-radar" },
            ]}
            className="w-full max-w-md"
          />
        </div>
      </div>
      <HomeCard />
      <div className="bg-black">
      <div className="mt-[3rem] ">
      <NearbyShops></NearbyShops>
      </div>
      <div className="mb-[-12.5rem] bg-[#0E0E0E]">
      <PopularStaples></PopularStaples>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      </div>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
    </div>
  );
}



