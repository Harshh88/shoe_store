"use client";

import api from "@/lib/api";
import { useEffect } from "react";
import AllShops from "../shops/AllShops";
import { useShop } from "@/context/ShopContext";

export default function Shops() {
  const { setShops } = useShop();

  // -----------------------------------------------------------------
  // OPTIMIZED LOCATION & SHOP FETCH PIPELINE (WITH USEEFFECT)
  // -----------------------------------------------------------------
    useEffect(() => {
    let initialCoords = null;

    const executeFetchPipeline = async (lat = null, long = null) => {
      try {
        const payload = {}; // Full list without limit
        if (lat && long) {
          payload.latitude = lat;
          payload.longitude = long;
        }

        const res = await api.post("/shop/nearby", payload);
        
        if (res.data?.success && res.data.shops?.length > 0) {
          // STRICT FILTER: Precise location matching subset
          setShops(res.data.shops);
          console.log("Strict Nearby Shops Loaded on Shop Page:", res.data.shops);
        } else {
          // Fallback context trigger
          console.log("Zero dynamic matches inside radius. Rolling back to standard database index...");
          const fallbackRes = await api.post("/shop/nearby", {});
          if (fallbackRes.data?.shops) setShops(fallbackRes.data.shops);
        }
      } catch (err) {
        console.log("Database pipeline query processing error inside Shops component:", err);
      }
    };

    // 1. Cache Fetch Loop
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

    // 2. Live Runtime Geolocation Tracking
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
          console.log("Location Denied on Shop page. Serving fallback list:", error.message);
          await executeFetchPipeline();
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      executeFetchPipeline();
    }
  }, [setShops]);
  // -----------------------------------------------------------------

  return (
    <div className="mt-[-1rem]">
      <AllShops />
    </div>
  );
}