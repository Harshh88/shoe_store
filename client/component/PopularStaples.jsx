"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const PopularStaples = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api.get("/product/global?limit=4")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => console.log("Error fetching home products", err))
      .finally(() => setLoading(false));
  }, []);

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
        window.dispatchEvent(new Event("cartUpdate"));
      }
    } catch (err) {
      console.log("Error in home addCart process sequence:", err);
      alert(err.response?.data?.message || "Cart insertion sequence rejected.");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0E0E0E] text-gray-500 font-bold tracking-widest text-xs text-center py-20 uppercase animate-pulse">
        Loading Staples...
      </div>
    );
  }

  return (
    <section className="bg-[#0E0E0E] text-white px-8 md:px-12 py-16 w-full">
      <div className="flex justify-between items-end mb-12 border-b border-[#141414] pb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-[0.85]">
            POPULAR <br /> STAPLES
          </h2>
        </div>
        
        <Link 
          href="/products" 
          className="bg-[#F7FFB0]/80 text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-tight hover:bg-[#F7FFB0] transition-all duration-300 whitespace-nowrap"
        >
          View All Products
        </Link>
      </div>

      <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-8 scroll-smooth snap-x snap-mandatory no-scrollbar pb-4">
        {products.map((item) => {
          const isOutOfStock = item.stock <= 0;

          return (
            <div 
              key={item.id} 
              onClick={() => router.push(`/products/${item.id}`)}
              className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-auto flex-shrink-0 snap-start group flex flex-col gap-4 cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] flex items-center justify-center rounded-[2rem] overflow-hidden p-6 relative transition-all duration-500 group-hover:border-[#2a2a2a]">
                <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
                  <img 
                    src={item.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                    alt={item.name}
                    className="max-w-full max-h-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]" 
                  />
                </div>

                {isOutOfStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    <div className="border border-[#222] bg-black/90 px-4 py-1.5 rounded-xl rotate-[-8deg]">
                      <span className="text-gray-600 font-black text-[11px] tracking-widest uppercase">SOLD OUT</span>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-5 left-5 right-5 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                  {!isOutOfStock ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addCart(item.id);
                      }}
                      className="w-full bg-[#F7FFB0] text-black font-black text-[11px] py-3 rounded-xl uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#E2FF66]/5 cursor-pointer"
                    >
                      ADD TO BAG
                    </button>
                  ) : (
                    <button 
                      disabled
                      onClick={(e) => e.stopPropagation()}
                      className="w-full bg-[#111] border border-[#222] text-gray-500 font-bold text-[11px] py-3 rounded-xl uppercase tracking-wider cursor-not-allowed"
                    >
                      OUT OF STOCK
                    </button>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-start px-2">
                <div className="space-y-0.5 truncate w-[70%]">
                  <p className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">
                    {item.size ? `SIZE: ${item.size}` : "KINETIC CO"}
                  </p>
                  <h4 className="font-bold text-sm tracking-tight text-gray-200 uppercase truncate group-hover:text-white transition-colors">
                    {item.name}
                  </h4>
                </div>
                <span className="font-black text-sm text-white tracking-tight">
                  ₹{Number(item.price).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};