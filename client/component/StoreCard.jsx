// components/StoreCard.js
const StoreCard = ({ title, location, imageUrl, isFlagship, size = "large" }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl group cursor-pointer ${size === 'large' ? 'h-[500px]' : 'h-[350px]'}`}>
      {/* Background Image */}
      <img 
        src={imageUrl} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
        <div>
          {isFlagship && (
            <span className="bg-[#DFFF5E] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">
              Flagship
            </span>
          )}
          <h3 className="text-white text-4xl font-bold uppercase tracking-tighter">{title}</h3>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <span className="opacity-70">📍</span> {location}
          </p>
        </div>
        
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          VIEW SHOP
        </button>
      </div>
    </div>
  );
};

export default StoreCard;