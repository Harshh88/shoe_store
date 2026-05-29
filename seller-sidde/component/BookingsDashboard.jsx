"use client"
import React, { useState } from 'react';
import Header from '@/component/Header';
import AppointmentCard from '@/component/AppointmentCard';

export default function BookingsDashboard() {
  const [activeFilter, setActiveFilter] = useState('TODAY');

  return (
    <div className="flex-1 text-white w-full">
      <Header title="UPCOMING APPOINTMENTS" subtitle="High-performance session management" />
      
      <div className="flex gap-2 mb-8 mt-4 overflow-x-auto no-scrollbar">
        {['TODAY', 'THIS WEEK', 'PENDING (12)'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter.split(' ')[0])}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black font-mono tracking-widest whitespace-nowrap transition-all duration-200 border ${
              activeFilter === filter.split(' ')[0]
                ? 'bg-[#D9FA53] text-black border-[#D9FA53]'
                : 'bg-[#141414] text-zinc-500 border-[#222222]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentCard 
          type="FITTING SESSION"
          name="Marcus Sterling"
          date="24"
          day="OCT"
          time="14:30 — 15:30"
          detailLabel="LOCATION"
          detailValue="Main Suite, Floor 2"
        />
        <AppointmentCard 
          type="PICKUP"
          name="Elena Rossi"
          date="25"
          day="OCT"
          time="11:00 — 11:30"
          detailLabel="ORDER ID"
          detailValue="#KL-99210"
        />
      </div>
    </div>
  );
}