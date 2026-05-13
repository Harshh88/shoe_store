import { FiSearch } from "react-icons/fi";
import { Star, Clock, MapPin, Heart, Search } from 'lucide-react';
export default function SearchBar({
     className
}){
    return(
        <div className="relative border-b border-zinc-800 ml-[2rem] pb-2">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
            <input
              type="text"
              placeholder="SEARCH..."
              className="bg-transparent text-white pl-8 pr-4 focus:outline-none text-xs tracking-widest w-[200px]"
            />
          </div>
    )
}