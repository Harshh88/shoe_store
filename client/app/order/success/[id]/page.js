"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from "@/lib/api";
import SuccessManifest from "@/component/SuccessManifest";

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

useEffect(() => {

  const fetchOrder=async()=>{

      try{

        const token=localStorage.getItem("token");

        const res=await api.get(`/order/my-order/${params.id}`,{

            headers:{
                Authorization:`Bearer ${token}`
            }

        });

        setOrderData(res.data);

      }

      catch(err){

        console.log(err);

      }

  }

  fetchOrder();

},[]);

  return (
   <SuccessManifest
  orderId={orderData?.id}
  clientName={orderData?.customer}
  valuationMetric={orderData?.total_amount}
  orderItemsList={orderData?.items}
  address={orderData?.address}
  city={orderData?.city}
  state={orderData?.state}
  country={orderData?.country}
  onTrackQueue={() => router.push("/seller")}
  onContinueShopping={() => router.push("/")}
/>
  );
}