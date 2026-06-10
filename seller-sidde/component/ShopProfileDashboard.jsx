"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Upload, MapPin, Phone, Edit3, Trash2 } from 'lucide-react';
import Header from '@/component/Header';

export default function ShopProfileDashboard({ shopData, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    contact_number: '',
    image_id: null,
    image_url: null,
    image_file: null 
  });

  useEffect(() => {
    if (shopData) {
      // Backend handles joins differently, adjusting safely for string url or object image map
      let rawUrl = null;
      if (shopData.image_url) {
        rawUrl = shopData.image_url;
      } else if (shopData.image && typeof shopData.image === 'object') {
        rawUrl = shopData.image.url;
      } else if (typeof shopData.image === 'string') {
        rawUrl = shopData.image;
      }

      setFormData({
        name: shopData.name || 'Kinetic Labs Flagship',
        description: shopData.description || 'No description available.',
        address: shopData.address || 'No address added yet.',
        contact_number: shopData.contact_number || 'No contact added.',
        image_id: shopData.image_id || null,
        image_url: rawUrl,
        image_file: null
      });
    }
  }, [shopData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file.");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);

    setFormData(prev => ({
      ...prev,
      image_url: localPreviewUrl, 
      image_file: file 
    }));

    setIsEditing(true); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData); 
    setIsEditing(false);
  };

  const handleDiscard = () => {
    if (shopData) {
      let rawUrl = shopData.image_url || (shopData.image && typeof shopData.image === 'object' ? shopData.image.url : shopData.image) || null;
      setFormData({
        name: shopData.name,
        description: shopData.description,
        address: shopData.address,
        contact_number: shopData.contact_number,
        image_id: shopData.image_id,
        image_url: rawUrl,
        image_file: null
      });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("Are you absolutely sure you want to permanent delete your shop?");
    if (confirmDelete && onDelete) {
      onDelete();
    }
  };

  return (
    <div className="flex-1 text-white w-full">
      <Header title="SHOP PROFILE" subtitle="Refine your brand identity within the Kinetic Gallery ecosystem." />

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">
            SHOP BANNER <span className="text-zinc-600 lowercase font-normal ml-2">Recommended 1920x450px</span>
          </span>
          
          <div 
            onClick={() => fileInputRef.current.click()}
            className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-[#222222] bg-[#141414] group flex items-center justify-center cursor-pointer transition-all hover:border-zinc-700"
          >
            <input 
              type="file"
              name="image" 
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />

            {formData.image_url ? (
              <img 
                src={formData.image_url} 
                alt="Shop Banner" 
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <div className="absolute inset-0 opacity-30 grayscale flex gap-4 items-center justify-center p-4 z-0">
                <span className="text-7xl select-none">👟</span>
                <span className="text-7xl select-none">👟</span>
                <span className="text-7xl select-none">👟</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 group-hover:bg-black/40 transition-colors z-10" />

            <div className="z-20 bg-black/60 backdrop-blur-md border border-zinc-800 group-hover:border-zinc-500 px-5 py-3 rounded-2xl flex items-center gap-2.5 transition-all">
              <Upload className="w-4 h-4 text-[#D9FA53]" />
              <span className="font-mono text-xs font-bold tracking-wider uppercase text-zinc-200">
                {formData.image_url ? "CHANGE BANNER" : "UPLOAD BANNER"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-5">
            
            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP NAME</label>
              {isEditing ? (
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-colors"
                  required
                />
              ) : (
                <div className="w-full bg-[#141414] border border-[#222222] rounded-2xl px-5 py-4 font-mono text-lg font-black tracking-wide text-white">
                  {formData.name}
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">SHOP DESCRIPTION</label>
              {isEditing ? (
                <textarea 
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl px-5 py-4 font-sans text-sm text-zinc-300 leading-relaxed transition-colors resize-none"
                />
              ) : (
                <div className="w-full bg-[#141414] border border-[#222222] rounded-2xl px-5 py-4 font-sans text-sm text-zinc-400 leading-relaxed min-h-[100px]">
                  {formData.description}
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-2">CONTACT NUMBER</label>
              {isEditing ? (
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-5" />
                  <input 
                    type="text" 
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    className="w-full bg-[#141414] border border-[#222222] focus:border-zinc-700 outline-none rounded-2xl pl-12 pr-5 py-4 font-mono text-sm font-bold tracking-wide text-white transition-colors"
                    required
                  />
                </div>
              ) : (
                <div className="w-full bg-[#141414] border border-[#222222] rounded-2xl px-5 py-4 font-mono text-sm font-bold text-zinc-300 flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D9FA53]" />
                  {formData.contact_number}
                </div>
              )}
            </div>

            <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-[#1C1C1C] pb-3">
                <MapPin className="w-4 h-4 text-[#D9FA53]" />
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 font-bold uppercase">ADDRESS</span>
              </div>
              {isEditing ? (
                <input 
                  type="text" 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#090909] border border-[#1C1C1C] focus:border-zinc-800 outline-none rounded-xl px-4 py-3.5 font-sans text-sm text-white transition-colors"
                  required
                />
              ) : (
                <div className="w-full bg-[#090909] border border-[#1C1C1C] rounded-xl px-4 py-3.5 font-sans text-sm text-zinc-300">
                  {formData.address}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-3 pt-4 border-t border-[#141414] mt-4">
          <div>
            {!isEditing && (
              <button 
                type="button"
                onClick={handleDeleteClick}
                className="w-full md:w-auto bg-transparent hover:bg-red-950/30 text-red-500 border border-red-900/40 font-mono text-xs font-black tracking-widest px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors uppercase"
              >
                <Trash2 className="w-4 h-4" />
                DELETE SHOP
              </button>
            )}
          </div>

          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <button 
                  type="button"
                  onClick={handleDiscard}
                  className="bg-[#1A1A1A] hover:bg-zinc-800 text-zinc-300 border border-[#262626] font-mono text-xs font-black tracking-widest px-6 py-3.5 rounded-xl transition-colors uppercase"
                >
                  DISCARD
                </button>
                <button 
                  type="submit"
                  className="bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-xs font-black tracking-widest px-8 py-3.5 rounded-xl transition-transform active:scale-[0.98] shadow-lg shadow-[#D9FA53]/5 uppercase"
                >
                  SAVE CHANGES
                </button>
              </>
            ) : (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full md:w-auto bg-[#D9FA53] hover:bg-[#cbe947] text-black font-mono text-xs font-black tracking-widest px-10 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg shadow-[#D9FA53]/5 uppercase"
              >
                <Edit3 className="w-4 h-4" />
                EDIT PROFILE
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}