const products = [
  {
    name: 'CRIMSON RUSH',
    price: '₹14,999',
    desc: 'Popular Staples',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
  },

  {
    name: 'GHOST WALKER',
    price: '₹11,499',
    desc: 'Popular Staples',
    img: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80'
  },

  {
    name: 'STEALTH X',
    price: '₹17,999',
    desc: 'Popular Staples',
    img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80'
  },

  {
    name: 'ALPINE PEAK',
    price: '₹15,499',
    desc: 'Popular Staples',
    img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80'
  }
];

export const PopularStaples = () => (
  // Main Section with your specific color
  <section className="bg-[#0E0E0E] text-white p-10 min-h-screen">
    
    {/* Header Section */}
    <div className="flex justify-between items-end mb-12">
      <h2 className="text-5xl font-black leading-[0.9] italic tracking-tighter">
        POPULAR <br /> STAPLES
      </h2>
      
      {/* Filter Tabs */}
      <div className="flex gap-2  p-1.9  ">
        <button className="bg-[#E2FF66] rounded-full text-black px-8 border border-[#222] py-2 rounded-full text-[11px] font-extrabold uppercase tracking-tight">
          ALL
        </button>
        <button className="px-8 bg-[#161616] rounded-full py-2 text-[11px] border border-[#222] text-gray-500 font-extrabold uppercase tracking-tight hover:text-white transition-colors">
          RUNNING
        </button>
        <button className="px-8 py-2 bg-[#161616] rounded-full text-[11px] border border-[#222] text-gray-500 font-extrabold uppercase tracking-tight hover:text-white transition-colors">
          LIFESTYLE
        </button>
      </div>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {products.map((item, i) => (
        <div key={i} className="flex flex-col gap-4">
          
          {/* Card Container - slightly lighter than background to show depth */}
          <div className="aspect-square bg-[#161616] border border-[#222] flex items-center justify-center rounded-3xl overflow-hidden p-8 group cursor-pointer relative shadow-2xl bg-black">
             <img 
               src={item.img} 
               alt={item.name}
               className="w-full h-full object-contain group-hover:scale-110 transition duration-700 ease-out" 
             />
          </div>
          
          {/* Product Info */}
          <div className="flex justify-between items-start px-2">
            <div className="space-y-0.5">
              <h4 className="font-bold text-sm tracking-tight uppercase">{item.name}</h4>
              <p className="text-[12px] text-gray-500 font-semibold">{item.desc}</p>
            </div>
            <span className="font-bold text-sm tracking-tighter">{item.price}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);