"use client"
import React, { useState, useRef } from 'react';
import { Upload, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';

export default function AddProductDashboard({ onBack, onSubmit }) {
  const fileInputRef = useRef(null);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [size, setSize] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setSize('');
    setImageFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('size', size);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-sans flex flex-col w-full">
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl mx-auto w-full">
        
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <button 
                type="button"
                onClick={onBack}
                className="p-2.5 rounded-xl bg-[#141414] border border-[#222222] hover:border-zinc-700 text-zinc-400 hover:text-white transition-all flex items-center justify-center active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight font-mono text-white">ADD PRODUCT</h1>
            </div>
            <button 
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 bg-[#141414] border border-[#222222] hover:border-zinc-700 hover:text-white text-zinc-400 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider font-mono transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              RESET
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-start">
            
            <div className="md:col-span-2">
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">PRODUCT MEDIA</label>
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square rounded-3xl border border-dashed border-[#333333] bg-[#141414] hover:bg-[#181818] hover:border-zinc-600 transition-all group flex flex-col items-center justify-center p-6 text-center cursor-pointer relative overflow-hidden"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-[#090909] border border-[#222222] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5 text-[#F7FFB0]" />
                    </div>
                    <span className="font-mono text-xs font-black tracking-wider uppercase text-white block mb-1">DRAG & DROP</span>
                    <span className="text-[11px] text-zinc-500 font-medium">Or click to browse high-res product shot</span>
                  </>
                )}
              </div>
            </div>

            <div className="md:col-span-3 space-y-5">
              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">PRODUCT NAME</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. AERO-STRIDE X1 NEON"
                  required
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 focus:bg-[#181818] outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-all placeholder-zinc-700"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase">DESCRIPTION</label>
                  <span className="text-[10px] font-mono font-bold text-zinc-600">{description.length} / 500</span>
                </div>
                <textarea 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the engineering and aesthetic profile..."
                  required
                  maxLength={500}
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 focus:bg-[#181818] outline-none rounded-2xl px-5 py-4 font-sans text-sm text-white transition-all placeholder-zinc-700 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">PRICE (INR)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-5 font-mono font-bold text-zinc-500 text-sm">₹</span>
                    <input 
                      type="number" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                      className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 focus:bg-[#181818] outline-none rounded-2xl pl-10 pr-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-all placeholder-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">STOCK UNITS</label>
                  <input 
                    type="number" 
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    required
                    className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 focus:bg-[#181818] outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-all placeholder-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">AVAILABLE SIZE (EU)</label>
                <input 
                  type="number" 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 42"
                  required
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 focus:bg-[#181818] outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-all placeholder-zinc-700"
                />
              </div>
            </div>

          </div>

          <div className="mt-10 pt-4 border-t border-[#141414]">
            <button 
              type="submit"
              className="w-full bg-[#F7FFB0] hover:bg-[#F7FFB0] text-black font-mono text-sm font-black tracking-widest py-4.5 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-[#F7FFB0]/5 uppercase"
            >
              <span>ADD PRODUCT</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </form>

      </main>
    </div>
  );
}