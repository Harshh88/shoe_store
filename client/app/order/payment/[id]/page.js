"use client";

import api from "@/lib/api";
import Script from "next/script";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PaymentConsole from "@/component/PaymentConsole";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [orderAmount, setOrderAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrderAmount(Number(searchParams.get("amount") || 1));
  }, [searchParams]);

  const processPayment = async () => {
    if (paymentMethod === "cod") {
      alert("Order placed with Cash on Delivery state successfully.");
      router.push(`/order/success/${params.id}`);
      return;
    }

    setLoading(true);
    try {
      const existToken = localStorage.getItem("token");

      if (!existToken) {
        alert("Authentication token missing. Please log in again.");
        router.push("/login");
        return;
      }

      console.log("Real Product Amount displayed on UI:", orderAmount);
      
      const res = await api.post(
        "/payment/create",
        {
          amount: 1, 
          order_id: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        }
      );

      console.log("Backend Order Payload Generated:", res.data);

      const orderPayload = res.data.result || res.data;

      if (!orderPayload || !orderPayload.id) {
        alert("Gateway allocation sequence failed. Order payload invalid.");
        return;
      }

      const options = {
        key: res.data.key_id, 
        amount: parseInt(orderPayload.amount), 
        currency: orderPayload.currency || "INR",
        order_id: orderPayload.id,
        name: "KINETICA GEAR CONSOLE",
        handler: async function (response) {
          try {
            console.log("Razorpay capture successful, triggering auth verification...");
            
            const verifyRes = await api.post(
              "/payment/verify", 
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: params.id, 
              },
              {
                headers: {
                  Authorization: `Bearer ${existToken}`, 
                }
              }
            );

            if (verifyRes.status === 200 || verifyRes.data?.success) {
              router.push(`/order/success/${params.id}`);
            } else {
              alert("Order allocation verification rejected by system context.");
            }
          } catch (err) {
            console.log("Verification error block:", err);
            alert(err.response?.data?.message || "Payment signature verification failed.");
          }
        },
        theme: { color: "#0E0E0E" },
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response){
        console.error("Razorpay SDK Component Failed Reason:", response.error);
        alert(`Razorpay Crash Reason: ${response.error.description}`);
      });

      rzp.open();
    } catch (err) {
      console.log("Error reaching backend payment engine:", err);
      alert(err.response?.data?.message || "Internal gateway console error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script 
        src="https://checkout.razorpay.com/v1/checkout.js" 
        strategy="afterInteractive" 
      />
      
      <PaymentConsole
        orderId={params.id}
        orderAmount={orderAmount} 
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        processPayment={processPayment}
        loading={loading}
      />
    </>
  );
}