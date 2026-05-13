"use client";
import api from "@/lib/api";
import Script from "next/script";
import { useParams } from "next/navigation";

export default function Payment() {
  const params = useParams();

  const handlePayment = async () => {
    try {
      const res = await api.post("/payment/create", {
        amount: 1,
        order_id: params.id,
      });

      const order = res.data;

      const options = {
        key: "rzp_test_Se9LzHiskNRxzg",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,

        handler: async function (response) {
          await api.post("/payment/verify", {
            ...response,
            orderId: params.id,
          });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <button
        onClick={handlePayment}
        className="p-[0.5rem] m-[1rem] bg-yellow-500 rounded-full cursor-pointer"
      >
        payment
      </button>
    </div>
  );
}
