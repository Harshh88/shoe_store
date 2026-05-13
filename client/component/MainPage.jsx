// pages/index.js (or app/page.js)
import StoreCard from '../component/StoreCard';
import PartnerCard from '../component/PartnerCard';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white p-10 font-sans">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-7xl font-black italic uppercase tracking-tighter text-[#DFFF5E]">
          Kinetic <br /> Locations
        </h1>
        <p className="text-zinc-400 max-w-md mt-4">
          A curated network of digital flagships and physical sanctuaries dedicated to the art of footwear engineering.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 mb-20">
        <div className="col-span-8">
          <StoreCard 
            title="The Vault" 
            location="SHIBUYA, TOKYO" 
            isFlagship={true}
            imageUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" 
          />
        </div>
        <div className="col-span-4">
          <StoreCard 
            title="Parallel Space" 
            location="DOWNTOWN, NY" 
            imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" 
          />
        </div>
        <div className="col-span-4">
          <StoreCard 
            title="Oxygen Lab" 
            location="KREUZBERG, BERLIN" 
            imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" 
            size="small"
          />
        </div>
        <div className="col-span-8">
          <StoreCard 
            title="Kinetic Archive" 
            location="MARAIS, PARIS" 
            imageUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" 
            size="small"
          />
        </div>
      </div>

      {/* Partners Section */}
      <div>
        <h2 className="text-zinc-500 uppercase text-xs font-bold tracking-[0.2em] mb-6 border-b border-zinc-800 pb-4">
          Authorized Retail Partners
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <PartnerCard name="Sole Society" location="Shoreditch, London" logoUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800"/>
          <PartnerCard name="Street Concept" location="Gangnam, Seoul" logoUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800"/>
          <PartnerCard name="Velocity Hub" location="Downtown, LA" logoUrl="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800"/>
        </div>
      </div>
    </main>
  );
}