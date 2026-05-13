"use client"
import api from "@/lib/api"
import { useEffect, useState,useCallback } from "react";
import Link from "next/link";
// import MainPage from "../../component/MainPage";
// import PartnerCard from "../../component/PartnerCard";
// import StoreCard from "../../component/StoreCard";
import AllShops from "../shops/AllShops"
import { useShop } from "@/context/ShopContext";

export default function Shops(){
    const {shops,setShops} = useShop();
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
              // limit:3
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
                // limit:3
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
                // limit:3
              });
              setShops(res.data.shops);
              console.log(res.data.shops);
            } catch (err) {
              console.log("something error in location error function", err);
            }
          },
        );
      }, [setShops]);
    useEffect(()=>{
        fetchData();
    },[])
    return(
        // <h1 className="text-white">HELLO from shop side</h1>
        // <div className="m-[2rem] text-white">
        //     {shops.map((shop)=>(
        //         <div key={shop.id} className="m-[2rem] cursor-pointer">
        //             <Link href={`/shops/${shop.id}`}>
        //             <h1>{shop.name}</h1>
        //             <p>{shop.address}</p>
        //             <p>{shop.contact_number}</p>
        //             </Link>
        //             <Link href={`/shops/${shop.id}/appointment`}>BOOK APPOINTMENT</Link>
        //         </div>
        //     ))}
        // </div>
        <div 
        className="mt-[-1rem]"
        >
        <AllShops/>
        </div>

    )
}