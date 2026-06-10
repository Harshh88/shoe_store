"use client"
import React from 'react';
import { CreditCard, Wallet, Banknote } from "lucide-react";

export default function PaymentConsole({ orderId, orderAmount, paymentMethod, setPaymentMethod, processPayment, loading }) {
  const getStatusStyle = (method) => {
    return paymentMethod === method ? "bg-[#1A1A1A] border-[#D9FA53]" : "bg-[#141414] border-[#222222] hover:border-zinc-700";
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col items-center justify-start p-4 md:p-8 font-sans">
      <div className="max-w-2xl w-full space-y-8">
        <header className="border-b border-[#1A1A1A] pb-6">
          <h1 className="text-3xl font-black font-mono tracking-tighter text-white">PAYMENT CAPTURE</h1>
          <p className="text-xs text-zinc-500 font-mono mt-1 tracking-widest uppercase">STEP 02 OF 03 // GATEWAY AUTHORIZATION</p>
        </header>

        <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">TARGET COMPONENT TOKEN</span>
            <div className="text-sm font-bold font-mono text-white">#KN-{orderId}</div>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-0.5">TOTAL DEBIT BOUNDARY</span>
            <div className="text-sm font-bold font-mono text-[#D9FA53]">₹{Number(orderAmount || 0).toLocaleString("en-IN")}</div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block px-1">
            SELECT SECURE ROUTE METHOD
          </span>

          <div onClick={() => setPaymentMethod("razorpay")} className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all duration-200 ${getStatusStyle("razorpay")}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#0E0E0E] rounded-xl flex items-center justify-center border border-[#1F1F1F]">
                <CreditCard className={`w-5 h-5 ${paymentMethod === "razorpay" ? "text-[#D9FA53]" : "text-zinc-400"}`} />
              </div>
              <div>
                <h4 className="text-sm font-black font-mono text-white tracking-wide">Razorpay Checkout Gateway</h4>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">Cards, Netbanking, International Wallets</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "razorpay" ? "border-[#D9FA53]" : "border-zinc-700"}`}>
              {paymentMethod === "razorpay" && <div className="w-2 h-2 bg-[#D9FA53] rounded-full" />}
            </div>
          </div>

          <div onClick={() => setPaymentMethod("upi")} className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all duration-200 ${getStatusStyle("upi")}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#0E0E0E] rounded-xl flex items-center justify-center border border-[#1F1F1F]">
                <Wallet className={`w-5 h-5 ${paymentMethod === "upi" ? "text-[#D9FA53]" : "text-zinc-400"}`} />
              </div>
              <div>
                <h4 className="text-sm font-black font-mono text-white tracking-wide">Unified Payments Interface (UPI)</h4>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">Google Pay, PhonePe, BHIM Instant Node</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "upi" ? "border-[#D9FA53]" : "border-zinc-700"}`}>
              {paymentMethod === "upi" && <div className="w-2 h-2 bg-[#D9FA53] rounded-full" />}
            </div>
          </div>

          <div onClick={() => setPaymentMethod("cod")} className={`border rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-all duration-200 ${getStatusStyle("cod")}`}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#0E0E0E] rounded-xl flex items-center justify-center border border-[#1F1F1F]">
                <Banknote className={`w-5 h-5 ${paymentMethod === "cod" ? "text-[#D9FA53]" : "text-zinc-400"}`} />
              </div>
              <div>
                <h4 className="text-sm font-black font-mono text-white tracking-wide">Cash on Delivery</h4>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">Remit physical tender upon physical handoff</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod" ? "border-[#D9FA53]" : "border-zinc-700"}`}>
              {paymentMethod === "cod" && <div className="w-2 h-2 bg-[#D9FA53] rounded-full" />}
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-0.5">FINAL BALANCED AMOUNT</span>
            <div className="text-2xl font-black font-mono text-white">₹{Number(orderAmount || 0).toLocaleString("en-IN")}</div>
          </div>
          <button 
            onClick={processPayment}
            disabled={loading || orderAmount === 0}
            className="w-full sm:w-auto px-12 py-4 bg-[#D9FA53] hover:bg-[#cbe947] disabled:bg-zinc-800 disabled:text-zinc-600 text-black text-xs font-black tracking-widest rounded-xl font-mono uppercase transition-all shadow-lg shadow-black/50 cursor-pointer"
          >
            {loading ? "AUTHORIZING ENGINE..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}