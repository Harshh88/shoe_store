"use client";
import { useState, useRef } from "react";
import { User, Mail, Phone, Eye, EyeOff, Camera, Edit2, Calendar, ArrowLeft } from "lucide-react";

export default function ProfileForm({ formData, isEditing, setIsEditing, handleChange, handleSubmit, handleFileChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#111113] border border-zinc-900 rounded-3xl p-6 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        {isEditing ? (
          <button 
            type="button"
            onClick={() => setIsEditing(false)} 
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Cancel
          </button>
        ) : (
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">My Profile</h2>
        )}

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 bg-[#D4F953] text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-lime-400 transition-all shadow-md cursor-pointer"
          >
            <Edit2 size={14} /> Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border border-zinc-800 overflow-hidden bg-zinc-900 flex items-center justify-center">
            {formData.url && formData.url.trim() !== "" ? (
              <img
                src={formData.url} 
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 animate-pulse" />
            )}
          </div>
          {isEditing && (
            <>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
              <button 
                type="button" 
                onClick={triggerFileSelect} 
                className="absolute bottom-0 right-0 bg-[#D4F953] text-black p-1.5 rounded-full hover:bg-lime-400 transition-colors shadow cursor-pointer"
              >
                <Camera size={14} strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>
        <h3 className="text-xl font-semibold mt-3 tracking-wide">
          {formData.name || "User"}
        </h3>
        {formData.role && (
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-[#D4F953] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest mt-1.5">
            {formData.role}
          </span>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-5">
          <div className="bg-[#1C1C1E] p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
              <div className="flex items-center gap-3">
                <Mail className="text-zinc-500" size={18} />
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Email Address</p>
                  <p className="text-sm text-zinc-200 font-medium">{formData.email || "Not Available"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
              <div className="flex items-center gap-3">
                <Phone className="text-zinc-500" size={18} />
                <div>
                  <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Phone Number</p>
                  <p className="text-sm text-zinc-200 font-medium">{formData.phone || "Not Added Yet"}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="text-zinc-500" size={18} />
              <div>
                <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider">Joined On</p>
                <p className="text-sm text-zinc-200 font-medium">{formatDate(formData.created_at)}</p>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-zinc-600 font-medium">Password and sensitive details are hidden for security.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1C1C1E] border border-transparent focus:border-zinc-800 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-zinc-200 transition-all"
              />
              <User className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1C1C1E] border border-transparent focus:border-zinc-800 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-zinc-200 transition-all"
              />
              <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Phone Number</label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-[#1C1C1E] border border-transparent focus:border-zinc-800 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-zinc-200 transition-all placeholder-zinc-600"
              />
              <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep same"
                className="w-full bg-[#1C1C1E] border border-transparent focus:border-zinc-800 focus:outline-none rounded-xl py-3 pl-4 pr-10 text-sm text-zinc-200 transition-all placeholder-zinc-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4F953] hover:bg-lime-400 text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-xl transition-all duration-200 mt-2 shadow-lg cursor-pointer"
          >
            Save Updated Details
          </button>
        </form>
      )}
    </div>
  );
}
