"use client"
import React, { useState } from 'react';
import Header from '@/component/Header';
import AppointmentCard from '@/component/AppointmentCard';

export default function BookingsDashboard({ 
  allBookings, 
  onConfirmBooking, 
  onCompleteBooking, 
  onCancelBooking 
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  
  const mockBackendBookings = allBookings || [];

  const filteredBookings = mockBackendBookings.filter((booking) => {
    if (activeFilter === 'ALL') {
      return true;
    }

    if (!booking?.booking_datetime) return false;

    const bookingDate = new Date(booking.booking_datetime);
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const isToday = bookingDate.getDate() === today.getDate() &&
                    bookingDate.getMonth() === today.getMonth() &&
                    bookingDate.getFullYear() === today.getFullYear();

    if (activeFilter === 'TODAY') {
      return isToday;
    }

    if (activeFilter === 'THIS WEEK') {
      const oneWeekLater = new Date(todayStart);
      oneWeekLater.setDate(todayStart.getDate() + 7);
      return bookingDate >= todayStart && bookingDate <= oneWeekLater;
    }

    if (activeFilter === 'PENDING') {
      return booking?.status?.toLowerCase() === 'pending';
    }

    if (activeFilter === 'CONFIRMED') {
      return booking?.status?.toLowerCase() === 'confirmed';
    }

    if (activeFilter === 'COMPLETED') {
      return booking?.status?.toLowerCase() === 'completed';
    }

    if (activeFilter === 'CANCELLED') {
      return booking?.status?.toLowerCase() === 'cancelled' || booking?.status?.toLowerCase() === 'cancelled booking';
    }

    return true;
  });

  const allCount = mockBackendBookings.length;

  const pendingCount = mockBackendBookings.filter(
    (b) => b?.status?.toLowerCase() === 'pending'
  ).length;

  const confirmedCount = mockBackendBookings.filter(
    (b) => b?.status?.toLowerCase() === 'confirmed'
  ).length;

  const completedCount = mockBackendBookings.filter(
    (b) => b?.status?.toLowerCase() === 'completed'
  ).length;

  const cancelledCount = mockBackendBookings.filter(
    (b) => b?.status?.toLowerCase() === 'cancelled' || b?.status?.toLowerCase() === 'cancelled booking'
  ).length;

  const filters = [
    { label: `ALL (${allCount})`, value: 'ALL' },
    { label: 'TODAY', value: 'TODAY' },
    { label: 'THIS WEEK', value: 'THIS WEEK' },
    { label: `PENDING (${pendingCount})`, value: 'PENDING' },
    { label: `CONFIRMED (${confirmedCount})`, value: 'CONFIRMED' },
    { label: `COMPLETED (${completedCount})`, value: 'COMPLETED' },
    { label: `CANCELLED (${cancelledCount})`, value: 'CANCELLED' }
  ];

  return (
    <div className="flex-1 text-white w-full">
      <Header title="UPCOMING APPOINTMENTS" subtitle="High-performance session management" />
      
      <div className="flex gap-2 mb-8 mt-4 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black font-mono tracking-widest whitespace-nowrap transition-all duration-200 border ${
              activeFilter === f.value
                ? 'bg-[#F7FFB0] text-black border-[#F7FFB0]'
                : 'bg-[#141414] text-zinc-500 border-[#222222]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-zinc-500 font-mono text-xs border border-dashed border-[#222222] rounded-3xl p-12 text-center uppercase tracking-widest">
          No appointments found for {activeFilter}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <AppointmentCard 
              key={booking.id || booking._id}
              booking={booking} 
              onConfirm={onConfirmBooking}
              onComplete={onCompleteBooking}
              onCancel={onCancelBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}