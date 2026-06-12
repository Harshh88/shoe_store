"use client"
import React, { useState, useRef } from 'react';
import { Upload, MapPin, Phone, PlusCircle, ImageIcon } from 'lucide-react';
import Header from '@/component/Header';

export default function CreateShopForm({ onCreate }) {
  const fileInputRef = useRef(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // File object store karne ke liye

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    contact_number: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Actual file file object save kiya
      const objectUrl = URL.createObjectURL(file);
      setBannerPreview(objectUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.contact_number) {
      alert("Please fill all mandatory fields.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a shop banner image.");
      return;
    }

    // Geolocation handler helper
    const sendDataWithCoords = (lat, lng) => {
      // Create FormData instance for file transfer
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name);
      dataToSend.append('description', formData.description);
      dataToSend.append('address', formData.address);
      dataToSend.append('contact_number', formData.contact_number);
      dataToSend.append('latitude', lat);
      dataToSend.append('longitude', lng);
      dataToSend.append('image', selectedFile); // Backend single upload middleware trigger karega (e.g., upload.single('image'))

      if (onCreate) {
        onCreate(dataToSend);
      }
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          sendDataWithCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          sendDataWithCoords(0.0, 0.0);
        }
      );
    } else {
      sendDataWithCoords(0.0, 0.0);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      contact_number: ''
    });
    setBannerPreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="flex-1 text-white w-full px-2 sm:px-4 lg:px-0">
      <Header 
        title="CREATE YOUR SHOP" 
        subtitle="Establish your brand identity within the Kinetic Gallery ecosystem." 
      />

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 mt-6">
        
        {/* SHOP BANNER AREA */}
        <div>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
            SHOP BANNER <span className="text-zinc-600 lowercase font-normal block sm:inline sm:ml-2">Recommended 1920x450px</span>
          </span>
          
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
          />

          <div className="relative w-full h-36 sm:h-48 md:h-64 rounded-2xl sm:rounded-[2rem] overflow-hidden border border-[#222222] bg-[#141414] group flex items-center justify-center p-4">
            
            {bannerPreview ? (
              <img 
                src={bannerPreview} 
                alt="Banner Preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 opacity-20 grayscale flex gap-2 sm:gap-4 items-center justify-center p-4 overflow-hidden">
                  <span className="text-4xl sm:text-7xl select-none">👟</span>
                  <span className="text-4xl sm:text-7xl select-none">👟</span>
                  <span className="text-4xl sm:text-7xl select-none">👟</span>
                </div>
              </>
            )}

            <button 
              type="button" 
              onClick={handleUploadClick}
              className="z-20 bg-black/80 backdrop-blur-md border border-zinc-800 hover:border-zinc-500 hover:bg-black px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 transition-all text-center max-w-full cursor-pointer"
            >
              {bannerPreview ? (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-[#D9FA53] shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase text-zinc-200 truncate">CHANGE BANNER</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-[#D9FA53] shrink-0" />
                  <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase text-zinc-200 truncate">UPLOAD BANNER</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* DETAILS CONFIGURATION MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-4 sm:space-y-5">
            
            {/* Shop Name */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
                SHOP NAME <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                maxLength={50}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter shop name (max 50 chars)"
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-xl sm:rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 font-mono text-xs sm:text-sm font-bold tracking-wide text-white transition-colors"
                required
              />
            </div>

            {/* Shop Description */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP DESCRIPTION</label>
              <textarea 
                rows={4}
                name="description"
                maxLength={500}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your shop concept... (max 500 chars)"
                className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-xl sm:rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed transition-colors resize-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
                CONTACT NUMBER <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-4 sm:left-5" />
                <input 
                  type="text" 
                  name="contact_number"
                  maxLength={15}
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  placeholder="e.g. +1234567890"
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-xl sm:rounded-2xl pl-11 sm:pl-12 pr-4 sm:pr-5 py-3.5 sm:py-4 font-mono text-xs sm:text-sm font-bold tracking-wide text-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Location & Address */}
            <div className="bg-[#141414] border border-[#222222] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1C1C1C] pb-3">
                <MapPin className="w-4 h-4 text-[#D9FA53]" />
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">
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
                className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3 sm:py-3.5 font-sans text-xs sm:text-sm text-white transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* BOTTOM GLOBAL ACTION ROW CONTROLLER */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#141414] mt-4">
          <button 
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 border border-[#262626] font-mono text-[11px] sm:text-xs font-black tracking-widest px-6 py-3.5 rounded-xl transition-colors uppercase cursor-pointer text-center"
          >
            RESET
          </button>
          <button 
            type="submit"
            className="w-full sm:w-auto bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-[11px] sm:text-xs font-black tracking-widest px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-[#D9FA53]/5 uppercase cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            CREATE SHOP
          </button>
        </div>
      </form>
    </div>
  );
}