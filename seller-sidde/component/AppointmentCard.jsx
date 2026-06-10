"use client"
import React from 'react';

export default function AppointmentCard({ booking, onConfirm, onComplete, onCancel }) {
  const { name, email, booking_datetime, status } = booking;
  const id = booking.id || booking._id;

  const dateObj = new Date(booking_datetime);
  const date = dateObj.getDate().toString().padStart(2, '0'); 
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase(); 
  
  const timeStr = dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  });

  const currentStatus = status?.toLowerCase();

  return (
    <div className="bg-[#141414] border border-[#222222] rounded-3xl p-6 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">
              STATUS // <span className={
                currentStatus === 'pending' ? 'text-amber-400' :
                currentStatus === 'confirmed' ? 'text-sky-400' :
                currentStatus === 'completed' ? 'text-emerald-400' : 'text-red-500'
              }>{status}</span>
            </span>
            <h3 className="text-2xl font-black font-mono tracking-wide text-white">{name}</h3>
          </div>
          
          {/* Dynamic Date Badge */}
          <div className="text-center bg-[#1A1A1A] px-3 py-2 rounded-xl border border-[#222222]">
            <div className="text-2xl font-black font-mono text-white leading-none">{date}</div>
            <div className="text-[10px] font-mono font-bold text-[#D9FA53] uppercase mt-1">{month}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">BOOKING TIME</span>
            <div className="text-sm font-bold text-white font-mono uppercase">{timeStr}</div>
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 font-bold uppercase block mb-1">CUSTOMER EMAIL</span>
            <div className="text-sm font-bold text-white font-mono truncate max-w-[150px]" title={email}>
              {email}
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions Logic Based on Current Booking Status */}
      <div>
        <div className="text-[9px] font-mono text-zinc-600 mb-2 uppercase tracking-wider">BOOKING ID: #{id}</div>
        <div className="flex gap-3">
          {/* PENDING: Isme Confirm aur Cancel dono options rahenge */}
          {currentStatus === 'pending' && (
            <>
              <button 
                onClick={() => onConfirm(id)}
                className="flex-1 bg-[#D9FA53] hover:bg-[#cbe947] text-black text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase transition-colors duration-200"
              >
                CONFIRM
              </button>
              <button 
                onClick={() => onCancel(id)}
                className="flex-1 bg-[#1A1A1A] hover:bg-zinc-800 text-white text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase border border-[#262626] transition-colors duration-200"
              >
                CANCEL
              </button>
            </>
          )}

          {/* CONFIRMED: Ab yahan se cancel button hata diya hai, sirf complete ka option hai */}
          {currentStatus === 'confirmed' && (
            <button 
              onClick={() => onComplete(id)}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase transition-colors duration-200"
            >
              MARK AS COMPLETED
            </button>
          )}

          {/* COMPLETED / CANCELLED: Isme buttons locked rahenge */}
          {(currentStatus === 'completed' || currentStatus === 'cancelled' || currentStatus === 'cancelled booking') && (
            <button 
              disabled
              className="flex-1 bg-[#1C1C1C] text-zinc-600 text-xs font-black tracking-widest py-3 rounded-xl font-mono uppercase border border-[#222222] cursor-not-allowed text-center"
            >
              ACTION LOCKED // {status}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}