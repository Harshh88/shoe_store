"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag, Check, Shield } from 'lucide-react';
import api from '@/lib/api';

const SingleProduct = ({ productId }) => {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCounter = useCallback(async () => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) return;
      const res = await api.post("/cart/items-price", {}, {
        headers: { Authorization: `Bearer ${existToken}` }
      });
      if (res.data?.success && res.data.result) {
        setCartCount(Number(res.data.result.totalquantity || 0));
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (err) {
      console.log("Error syncing cart metrics:", err);
    }
  }, []);

  useEffect(() => {
    if (!productId) return;
    
    api.get(`/product/global`)
      .then((res) => {
        if (res.data.success) {
          const foundProduct = res.data.products.find(p => String(p.id) === String(productId));
          setProduct(foundProduct || null);
        }
      })
      .catch((err) => console.log("Error fetching product metadata detail:", err))
      .finally(() => setLoading(false));

    fetchCartCounter();
  }, [productId, fetchCartCounter]);

  const addCart = async (productId) => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) {
        router.push("/login");
        return;
      }
      const response = await api.post("/cart/add-item",
        { product_id: productId },
        {
          headers: { Authorization: `Bearer ${existToken}` }
        }
      );
      if (response.status === 200 || response.data) {
        alert("Item allocated to cart module successfully.");
        fetchCartCounter();
      }
    } catch (err) {
      console.log("Error inserting item sequence process:", err);
      alert(err.response?.data?.message || "Cart insertion sequence rejected.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] text-gray-500 font-bold tracking-widest text-xs text-center py-40 uppercase animate-pulse">
        Loading Product Specifications...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] text-white flex flex-col justify-center items-center gap-4 p-4 text-center">
        <p className="text-gray-500 font-bold uppercase tracking-wider text-sm">Product metadata matrix missing or unallocated.</p>
        <button onClick={() => router.back()} className="text-[#F7FFB0] font-black uppercase text-xs tracking-widest cursor-pointer">Return Backward</button>
      </div>
    );
  }

  const isOutOfStock = Number(product.stock) <= 0;

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white p-4 sm:p-6 md:p-12 font-sans antialiased selection:bg-[#F7FFB0] selection:text-black">
      <header className="flex justify-between items-center mb-8 md:mb-12 border-b border-[#141414] pb-6 max-w-[1400px] mx-auto w-full gap-4">
        <button 
          onClick={() => router.back()}
          className="text-[10px] sm:text-[11px] font-black tracking-widest text-gray-500 hover:text-white flex items-center gap-2 bg-transparent border-none cursor-pointer uppercase transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-[#F7FFB0]" /> BACK TO CATALOG
        </button>
        
        <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-white transition-colors p-2 shrink-0">
          <span className="absolute top-0 right-0 bg-[#F7FFB0] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black shadow-md">
            {cartCount}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </Link>
      </header>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-4">
        <div className="bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] aspect-square md:aspect-[4/3] rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden shadow-2xl w-full">
          <div className={`w-full h-full flex items-center justify-center ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
            <img 
              src={product.image_url || product.url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
              alt={product.name} 
              className="max-w-[90%] max-h-[90%] md:max-w-full md:max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            />
          </div>
          
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
              <div className="border border-[#222] bg-black/90 px-6 py-2 rounded-xl rotate-[-8deg]">
                <span className="text-gray-500 font-black text-xs tracking-widest uppercase">SOLD OUT</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-5 sm:space-y-6 w-full">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#161616] border border-[#222] text-gray-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                {product.size ? `SIZE: ${product.size}` : "PREMIUM ASSET"}
              </span>
              <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                isOutOfStock ? "bg-red-950/30 text-red-500 border border-red-900/20" : "bg-emerald-950/30 text-emerald-400 border border-emerald-900/20"
              }`}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white leading-tight sm:leading-none break-words">
              {product.name}
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#F7FFB0] tracking-tight pt-1">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </div>
            
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed border-t border-b border-[#141414] py-4 sm:py-5 my-3 sm:my-4">
              {product.description || "The intersection of algorithmic design and high-performance cushioning. Engineered for the absolute future of movement."}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 font-mono text-[9px] sm:text-[10px] pb-2 text-gray-500 font-bold uppercase tracking-wider">
              <div className="bg-[#111] border border-[#191919] p-3 rounded-xl overflow-hidden">
                <span className="text-gray-600 block mb-1 truncate">SPECIFICATION</span>
                <div className="text-gray-300 font-black text-xs truncate">{product.size || "Standard Fit"}</div>
              </div>
              <div className="bg-[#111] border border-[#191919] p-3 rounded-xl overflow-hidden">
                <span className="text-gray-600 block mb-1 truncate">AVAILABILITY</span>
                <div className={`text-xs font-black truncate ${!isOutOfStock ? "text-emerald-400" : "text-red-500"}`}>
                  {!isOutOfStock ? `${product.stock || 5} UNITS LEFT` : "DEPLETED"}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            <button 
              onClick={() => addCart(product.id)}
              disabled={isOutOfStock}
              className="w-full bg-[#F7FFB0] hover:bg-white disabled:bg-[#161616] disabled:text-gray-600 text-black font-black text-xs py-3.5 sm:py-4 rounded-xl tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-[#F7FFB0]/5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" /> ADD TO BAG
            </button>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-[9px] font-black text-gray-600 uppercase tracking-widest text-center">
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#F7FFB0] shrink-0" /> 100% KINETIC AUTHENTIC</span>
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#F7FFB0] shrink-0" /> VERIFIED LISTING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;