import { Search } from 'lucide-react';

export default function SearchBar({ className }) {
    return (
        <div className={`relative border-b border-zinc-800 ml-[0.5rem] sm:ml-[2rem] pb-2 ${className}`}>
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
            <input
              type="text"
              placeholder="SEARCH..."
              className="bg-transparent text-white pl-6 pr-2 focus:outline-none text-[11px] tracking-widest w-full max-w-[130px] sm:max-w-[200px]"
            />
        </div>
    );
}