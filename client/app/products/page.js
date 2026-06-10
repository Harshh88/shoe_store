"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LogoMain from "@/component/LogoMain";
import { Footer } from "@/component/HomeFooter";
import { ArrowLeft, ShoppingBag, Check, Shield, Star } from "lucide-react";

export default function ProductsMarketplace() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  
  // Real working live states matching your backend architecture
  const [cartCount, setCartCount] = useState(0); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const router = useRouter();

  const categories = ["All Products", "Running", "Lifestyle", "Basketball", "Limited Drops", "In Stock"];

  // Fetch Live Total Items Count in Active Cart (Jaise tumhare main file me tha)
  const fetchCartCounter = useCallback(async () => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) return;
      const res = await api.post("/cart/items-price", {}, {
        headers: { Authorization: `Bearer ${existToken}` }
      });
      if (res.data?.success && res.data.result) {
        setCartCount(Number(res.data.result.totalquantity || 0));
      }
    } catch (err) {
      console.log("Error fetching cart items count token:", err);
    }
  }, []);

  // Initial Data Fetching Pipeline
  useEffect(() => {
    api.get("/product/global")
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products);
        }
      })
      .catch((err) => console.error("Error connecting to inventory", err))
      .finally(() => setLoading(false));

    fetchCartCounter(); // Trigger counter check on component layout mount
  }, [fetchCartCounter]);

  // Filtering Logic Engine
  useEffect(() => {
    let temp = products;

    if (searchQuery) {
      temp = temp.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory !== "All Products") {
      if (selectedCategory === "In Stock") {
        temp = temp.filter(p => p.stock > 0);
      } else {
        temp = temp.filter(p => 
          (p.description && p.description.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          (p.name && p.name.toLowerCase().includes(selectedCategory.toLowerCase()))
        );
      }
    }

    setFilteredProducts(temp);
  }, [searchQuery, selectedCategory, products]);

  // Live Backend Cart Adder Method (Directly Integrated)
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
        fetchCartCounter(); // Realtime instant refresh
      }
    } catch (err) {
      console.log("err in addCart frontend function", err);
      alert(err.response?.data?.message || "Cart insertion sequence rejected.");
    }
  };

  // -------------------------------------------------------------
  // 1. FULL-PAGE PRODUCT INFORMATION VIEW (JAB CARD PAR CLICK HOGA)
  // -------------------------------------------------------------
  if (selectedProduct) {
    const isOutOfStock = Number(selectedProduct.stock) <= 0;

    return (
      <div className="min-h-screen bg-[#0E0E0E] text-white p-6 md:p-12 font-sans antialiased selection:bg-[#E2FF66] selection:text-black flex flex-col justify-between">
        <div>
          {/* Top Header Navigation */}
          <header className="flex justify-between items-center mb-12 border-b border-[#141414] pb-6 max-w-[1400px] mx-auto w-full">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="text-[11px] font-black tracking-widest text-gray-500 hover:text-white flex items-center gap-2 bg-transparent border-none cursor-pointer uppercase transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#E2FF66]" /> BACK TO MARKETPLACE
            </button>
            
            <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-white transition-colors">
              <span className="absolute -top-1.5 -right-2 bg-[#E2FF66] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">
                {cartCount}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </Link>
          </header>

          {/* Product Details Section Grid */}
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-4 mb-16">
            
            {/* Left Side Picture Case */}
            <div className="bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] aspect-[4/3] rounded-[2.5rem] p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className={`w-full h-full flex items-center justify-center ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
                <img 
                  src={selectedProduct.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                  alt={selectedProduct.name} 
                  className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
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

            {/* Right Side Specifications Block */}
            <div className="flex flex-col space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-[#161616] border border-[#222] text-gray-400 text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {selectedProduct.size ? `SIZE: ${selectedProduct.size}` : "PREMIUM ASSET"}
                  </span>
                  <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                    isOutOfStock ? "bg-red-950/30 text-red-500 border border-red-900/20" : "bg-emerald-950/30 text-emerald-400 border border-emerald-900/20"
                  }`}>
                    {isOutOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
                  {selectedProduct.name}
                </h1>
                
                <div className="text-3xl font-black text-[#E2FF66] tracking-tight pt-1">
                  ₹{Number(selectedProduct.price).toLocaleString("en-IN")}
                </div>
                
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed border-t border-b border-[#141414] py-5 my-4">
                  {selectedProduct.description || "The intersection of algorithmic design and high-performance cushioning. Engineered for the absolute future of movement."}
                </p>

                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] pb-2 text-gray-500 font-bold uppercase tracking-wider">
                  <div className="bg-[#111] border border-[#191919] p-3 rounded-xl">
                    <span className="text-gray-600 block mb-1">SPECIFICATION</span>
                    <div className="text-gray-300 font-black text-xs">{selectedProduct.size || "Standard Fit"}</div>
                  </div>
                  <div className="bg-[#111] border border-[#191919] p-3 rounded-xl">
                    <span className="text-gray-600 block mb-1">AVAILABILITY METRIC</span>
                    <div className={`text-xs font-black ${!isOutOfStock ? "text-emerald-400" : "text-red-500"}`}>
                      {!isOutOfStock ? `${selectedProduct.stock || 5} UNITS LEFT` : "DEPLETED"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Integration */}
              <div className="space-y-4 pt-2">
                <button 
                  onClick={() => addCart(selectedProduct.id)}
                  disabled={isOutOfStock}
                  className="w-full bg-[#E2FF66] hover:bg-white disabled:bg-[#161616] disabled:text-gray-600 text-black font-black text-xs py-4 rounded-xl tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-[#E2FF66]/5"
                >
                  <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                </button>
                
                <div className="flex items-center justify-center gap-6 pt-2 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#E2FF66]" /> 100% KINETIC AUTHENTIC</span>
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#E2FF66]" /> VERIFIED LISTING</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. MAIN MARKETPLACE STOREFRONT VIEW (PRODUCTS GRID)
  // -------------------------------------------------------------
  return (
    <div className="bg-[#0E0E0E] min-h-screen text-white flex flex-col justify-between antialiased">
      
      {/* Header Area */}
      <header className="flex py-4 px-8 items-center justify-between border-b border-[#141414] bg-[#0E0E0E]">
        <div className="flex items-center gap-8 w-[40%]">
          <Link href="/"><LogoMain /></Link>
          <div className="w-[70%] bg-[#111111] border border-[#1F1F1F] rounded-full px-4 py-1.5 flex items-center gap-2 focus-within:border-[#333] transition-all">
            <input 
              type="text" 
              placeholder="SEARCH INVENTORY..." 
              className="bg-transparent w-full text-[11px] font-bold outline-none text-white tracking-widest placeholder-gray-700 uppercase"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Right Nav Options */}
        <div className="flex items-center gap-6 text-xs font-semibold tracking-wide text-gray-400">
          <Link href="/shops" className="hover:text-white transition-colors">Shops</Link>
          <Link href="/drops" className="hover:text-white transition-colors">Drops</Link>
          <Link href="/release-radar" className="hover:text-white transition-colors">Release Radar</Link>
          
          <Link 
            href="/add-shop" 
            className="border border-[#1F1F1F] text-gray-300 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:text-white hover:border-[#333] transition-all"
          >
            Add Shop
          </Link>
          
          {/* Live Badge Sync */}
          <Link href="/cart" className="relative cursor-pointer text-gray-400 hover:text-white transition-colors px-2">
             <span className="absolute -top-1.5 -right-2 bg-[#E2FF66] text-black text-[9px] rounded-full h-4 w-4 flex items-center justify-center font-black">
               {cartCount}
             </span>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
               <line x1="3" y1="6" x2="21" y2="6"/>
               <path d="M16 10a4 4 0 0 1-8 0"/>
             </svg>
          </Link>

          <Link 
            href="/login" 
            className="bg-[#E2FF66] text-black px-5 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-tight hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Inventory Body Display Section */}
      <main className="flex-1 px-8 py-10 max-w-[1600px] w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-1">ALL PRODUCTS</h1>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]"></span>
            {filteredProducts.length} PRODUCTS FOUND
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-black tracking-tight uppercase whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? "bg-[#E2FF66] text-black border-[#E2FF66]"
                  : "bg-[#111111] text-gray-500 border-[#1F1F1F] hover:text-white hover:border-[#333]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Layout */}
        {loading ? (
          <div className="h-[40vh] flex items-center justify-center">
            <div className="text-gray-600 animate-pulse font-black tracking-widest text-xs uppercase">Connecting System...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center border border-dashed border-[#1F1F1F] rounded-3xl">
            <p className="text-gray-500 text-xs font-bold tracking-wider mb-2 uppercase">No items match your metrics.</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("All Products"); }} className="text-[10px] text-[#E2FF66] font-black uppercase tracking-wider underline">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0;
              
              return (
                <div 
                  key={product.id} 
                  onClick={() => setSelectedProduct(product)}
                  className="group flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-[#191919] rounded-[2rem] p-6 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-[#222]">
                    <div className="absolute top-5 left-5 z-10">
                      <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        isOutOfStock ? "bg-black/40 text-red-500 border border-red-900/20" : "bg-black/40 text-gray-500 border border-[#1F1F1F]"
                      }`}>
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                      </span>
                    </div>

                    <div className={`w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "opacity-20 grayscale" : ""}`}>
                      <img 
                        src={product.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600'} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.7)]"
                      />
                    </div>

                    {isOutOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                        <div className="border border-[#222] bg-black/90 px-6 py-2 rounded-xl rotate-[-8deg]">
                          <span className="text-gray-500 font-black text-xs tracking-widest uppercase">SOLD OUT</span>
                        </div>
                      </div>
                    )}

                    {/* Action Panel Hover Trigger */}
                    <div className="absolute bottom-5 left-5 right-5 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                      {!isOutOfStock ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents layout modal from firing up
                            addCart(product.id);
                          }}
                          className="w-full bg-[#E2FF66] text-black font-black text-xs py-3 rounded-xl uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                        >
                          ADD TO BAG
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="w-full bg-[#111] border border-[#222] text-gray-500 font-bold text-xs py-3 rounded-xl uppercase tracking-wider cursor-not-allowed"
                        >
                          Restock Alert
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Footnote Data Row */}
                  <div className="mt-4 px-2 mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <div className="w-[70%]">
                        <p className="text-[9px] text-gray-600 font-bold tracking-widest uppercase mb-0.5">
                          {product.size ? `SIZE: ${product.size}` : "KINETIC STAPLE"}
                        </p>
                        <h3 className="font-bold text-base tracking-tight uppercase text-gray-200 group-hover:text-white transition-colors truncate">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-lg text-white tracking-tight">
                          ₹{Number(product.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-gray-600 font-bold pt-2 border-t border-[#141414] uppercase tracking-wider">
                      <div className="flex items-center gap-1 font-semibold text-gray-500">
                        <Star className="w-3 h-3 text-[#E2FF66] fill-[#E2FF66]" /> 4.8
                      </div>
                      <p>Seller: <span className="text-gray-500 font-black">PREMIUM SHUB</span></p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}