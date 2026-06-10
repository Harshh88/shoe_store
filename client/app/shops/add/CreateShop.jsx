"use client"
import React, { useState, useRef } from 'react'; // 1. useRef ko import kiya
import { Upload, MapPin, Phone, PlusCircle, ImageIcon } from 'lucide-react';
import Header from '@/component/Header';

export default function CreateShopForm({ onCreate }) {
  // File input ko reference karne ke liye ref banaya
  const fileInputRef = useRef(null);
  
  // Banner image ka preview show karne ke liye local state
  const [bannerPreview, setBannerPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    contact_number: '',
    image_id: null 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. Upload Button par click hote hi hidden input trigger hoga
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 3. File select hone par chalne wala function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview ke liye URL generate karna
      const objectUrl = URL.createObjectURL(file);
      setBannerPreview(objectUrl);

      // Yahan aap apna image upload logic (cloudinary/s3 bucket) laga sakte hain
      // Aur response me aane wali image_id ko formData me set kar sakte hain
      console.log("Selected file:", file);
    }
  };

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.address || !formData.contact_number) {
    alert("Please fill all mandatory fields.");
    return;
  }
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (onCreate) {
          onCreate({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }
      },
      (error) => {
        if (onCreate) {
          onCreate({
            ...formData,
            latitude: 0.0,
            longitude: 0.0
          });
        }
      }
    );
  } else {
    if (onCreate) {
      onCreate({
        ...formData,
        latitude: 0.0,
        longitude: 0.0
      });
    }
  }
};

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      contact_number: '',
      image_id: null
    });
    setBannerPreview(null); // Preview reset
  };

  return (
    <div className="flex-1 text-white w-full">
      <Header 
        title="CREATE YOUR SHOP" 
        subtitle="Establish your brand identity within the Kinetic Gallery ecosystem." 
      />

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        
        {/* SHOP BANNER AREA */}
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
            SHOP BANNER <span className="text-zinc-600 lowercase font-normal ml-2">Recommended 1920x450px</span>
          </span>
          
          {/* Hidden File Input */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
          />

          <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-[#222222] bg-[#141414] group flex items-center justify-center">
            
            {/* Agar image select ho gyi hai toh background me dikhegi */}
            {bannerPreview ? (
              <img 
                src={bannerPreview} 
                alt="Banner Preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 opacity-30 grayscale flex gap-4 items-center justify-center p-4">
                  <span className="text-7xl select-none">👟</span>
                  <span className="text-7xl select-none">👟</span>
                  <span className="text-7xl select-none">👟</span>
                </div>
              </>
            )}

            {/* Banner Upload Trigger Button */}
            <button 
              type="button" 
              onClick={handleUploadClick} // Click handler yahan attach kiya
              className="z-20 bg-black/70 backdrop-blur-md border border-zinc-800 hover:border-zinc-500 hover:bg-black/90 px-5 py-3 rounded-2xl flex items-center gap-2.5 transition-all"
            >
              {bannerPreview ? (
                <>
                  <ImageIcon className="w-4 h-4 text-[#D9FA53]" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-200">CHANGE BANNER</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-[#D9FA53]" />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-200">UPLOAD BANNER</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* DETAILS CONFIGURATION MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-5">
            
            {/* Shop Name */}
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
                SHOP NAME <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                maxLength={50}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter shop name (max 50 chars)"
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-colors"
                required
              />
            </div>

            {/* Shop Description */}
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP DESCRIPTION</label>
              <textarea 
                rows={4}
                name="description"
                maxLength={500}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your shop concept... (max 500 chars)"
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-sans text-sm text-zinc-300 leading-relaxed transition-colors resize-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
                CONTACT NUMBER <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-5" />
                <input 
                  type="text" 
                  name="contact_number"
                  maxLength={15}
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="e.g. +1234567890"
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl pl-12 pr-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Location & Address */}
            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1C1C1C] pb-3">
                <MapPin className="w-4 h-4 text-[#D9FA53]" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
                  LOCATION & ADDRESS <span className="text-red-500">*</span>
                </span>
              </div>
              <input 
                type="text" 
                name="address"
                maxLength={200}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter physical full address"
                className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3.5 font-sans text-sm text-white transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* BOTTOM GLOBAL ACTION ROW CONTROLLER */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#141414] mt-4">
          <button 
            type="button"
            onClick={handleReset}
            className="bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 border border-[#262626] font-mono text-xs font-black tracking-widest px-6 py-3.5 rounded-xl transition-colors uppercase"
          >
            RESET
          </button>
          <button 
            type="submit"
            className="bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-xs font-black tracking-widest px-8 py-3.5 rounded-xl flex items-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-[#D9FA53]/5 uppercase"
          >
            <PlusCircle className="w-4 h-4" />
            CREATE SHOP
          </button>
        </div>
      </form>
    </div>
  );
}