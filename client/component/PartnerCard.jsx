// components/PartnerCard.js
const PartnerCard = ({ name, location, logoUrl }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
      <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden">
        <img src={logoUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="text-white font-bold uppercase text-sm">{name}</h4>
        <p className="text-zinc-500 text-xs">{location}</p>
        <button className="text-[10px] font-bold text-zinc-400 mt-1 hover:text-white uppercase tracking-widest">
          Explore
        </button>
      </div>
    </div>
  );
};

export default PartnerCard;