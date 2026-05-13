import { useShop } from "@/context/ShopContext";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
// const shops = [
//   { name: 'THE VAULT', location: 'New York City, NY', zone: 'DOWNTOWN', img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800" },
//   { name: 'SOLE SOCIETY', location: 'Los Angeles, CA', zone: 'WESTSIDE', img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800" },
//   { name: 'CARBON COLLECTIVE', location: 'Chicago, IL', zone: 'ART DISTRICT', img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800" },
// ];

export const NearbyShops = () => {
  const {shops,setShops} = useShop();
  return(
  <section className="bg-[#0E0E0E] text-white p-8">
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tighter">NEARBY SHOPS</h2>
        <p className="text-gray-400 text-sm">Exclusive sneaker boutiques in your metropolitan area.</p>
      </div>
      <Link href={"/shops"} className="text-l font-bold  border-white pb-1 text-[#F7FFB0]/80 cursor-pointer">VIEW ALL MAP</Link>
    </div>
    
    <div className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory">
      {shops.map((shop) => (
        <div key={shop.id} className="min-w-[calc((100%-3rem)/3)] flex-shrink-0 snap-start group cursor-pointer">
          <div className="relative h-96 overflow-hidden rounded-lg mb-4 ">
            <img src={shop.image} alt={shop.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition duration-500" />
            <h3 className="uppercase text-xl font-bold text-white absolute bottom-[3rem] left-[2rem]">{shop.name}</h3>
            <p className="text-gray-400 text-sm absolute bottom-[1.6rem] left-[2.8rem]">
              <MapPinIcon className="w-4 h-4 text-gray-400 absolute bottom-[0.2rem] left-[-1rem]" />
              {shop.address}</p>
          </div>
          {/* <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{shop.zone}</p> */}
          {/* <h3 className="text-xl font-bold text-white">{shop.name}</h3>
          <p className="text-gray-400 text-sm">{shop.address}</p>
           */}
        </div>
      ))}
    </div>
  </section>
)
}