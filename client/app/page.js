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

  const fetchData = useCallback(() => {
    const location = localStorage.getItem("location");
    let existLocation = null;
    try {
      existLocation = location ? JSON.parse(location) : null;
    } catch (err) {
      existLocation = null;
      console.log(err);
    }

    if (existLocation) {
      api
        .post("/shop/nearby", {
          latitude: existLocation.lat,
          longitude: existLocation.long,
          limit:6
        })
        .then((res) => {
          setShops(res.data.shops);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("fetchData called");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("Location success");
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        try {
          const res = await api.post("/shop/nearby", {
            latitude,
            longitude,
            limit:6
          });

          setShops(res.data.shops);
          localStorage.setItem(
            "location",
            JSON.stringify({ long: longitude, lat: latitude }),
          );
          console.log(res.data.shops);
        } catch (err) {
          console.log("Api error", err);
        }
      },
      async (error) => {
        try {
          const res = await api.post("/shop/nearby",{
            limit:6
          });
          setShops(res.data.shops);
          console.log(res.data.shops);
        } catch (err) {
          console.log("something error in location error function", err);
        }
      },
    );
  }, [setShops]);
  useEffect(() => {
    console.log("useEffect running");
    fetchData();
  }, [fetchData]);

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
      </div>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
    </div>
  );
}



