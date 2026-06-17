"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

const BookingPage = ({ bookingShop, onBookingSubmit }) => {
  const router = useRouter();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [loading, setLoading] = useState(false);

  const name_parts = bookingShop?.name ? bookingShop.name.split(" ") : ["Shop"];
  const first_name = name_parts[0];
  const remain_name = name_parts.slice(1).join(" ");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:30 PM', available: true },
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const convertTimeTo24h = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours}:${minutes}:00`;
  };

  const handleFinalConfirm = async () => {
    if (!onBookingSubmit) return;
    setLoading(true);

    try {
      const dayString = String(selectedDate).padStart(2, '0');
      const monthString = String(currentMonth + 1).padStart(2, '0');
      const time24h = convertTimeTo24h(selectedTime);
      const finalTimestamp = `${currentYear}-${monthString}-${dayString} ${time24h}`;

      const response = await onBookingSubmit(finalTimestamp);
      
      if (response && response.success) {
        alert("🎉 Appointment Booked Successfully!");
      } else {
        alert("Booking failed: " + response?.message);
      }
    } catch (error) {
      alert("Error booking appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white font-sans selection:bg-[#E2FB6C] selection:text-black">
      <nav className="flex justify-between items-center px-4 py-6 md:py-10 max-w-[1400px] mx-auto gap-4">
        <button 
          onClick={() => router.push("/shops")}
          className="group flex items-center gap-2 text-zinc-500 hover:text-[#E2FB6C] transition-all text-[10px] font-black tracking-[0.3em] uppercase shrink-0 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Shops
        </button>
        <div className="text-xl font-black italic text-[#F7FFB0] tracking-tighter uppercase leading-none">
          KINETIC
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-10 lg:mb-24 mt-2">
          <div className="w-full lg:col-span-7 relative group">
            <div className="relative h-[240px] sm:h-[350px] lg:h-[500px] rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden border border-zinc-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              
              {/* FIX: Changed 'grayscale' to 'md:grayscale' so it stays colored on mobile/tablet */}
              <img 
                src={bookingShop.shop_image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"} 
                alt={bookingShop.name}
                className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            </div>
          </div>

          <div className="w-full lg:col-span-5 pt-1 lg:pt-8">
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-[#E2FB6C] rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-zinc-300 tracking-widest uppercase">Digital Flagship</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] sm:leading-[0.75] mb-4 sm:mb-8 break-words">
              {first_name}<br />
              <span className="text-zinc-800 outline-text">{remain_name}</span>
            </h1>

            <div className="space-y-3 sm:space-y-6 max-w-sm sm:max-w-md lg:max-w-sm">
              <div className="flex items-start gap-2.5 text-zinc-400">
                <MapPin size={16} className="text-[#F7FFB0] shrink-0 mt-0.5" />
                <span className="text-xs font-bold tracking-widest uppercase leading-tight">{bookingShop.address || "Address details Loading..."}</span>
              </div>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-medium">
                {bookingShop.description || "No description provided."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-24 py-8 lg:py-20 border-t border-zinc-900">
          
          <section className="w-full">
            <header className="flex justify-between items-center mb-6 sm:mb-12 gap-4">
              <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-600 whitespace-nowrap">01. Select Date</h3>
              <div className="flex items-center gap-3 sm:gap-6">
                <button onClick={handlePrevMonth} className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors shrink-0">
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs font-black italic tracking-tighter uppercase min-w-[100px] sm:min-w-[140px] text-center truncate">
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button onClick={handleNextMonth} className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors shrink-0">
                  <ChevronRight size={16} />
                </button>
              </div>
            </header>

            <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-4 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={`${day}-${index}`} className="text-[9px] font-black text-zinc-800 mb-2">{day}</div>
              ))}
              
              {Array.from({ length: firstDayIndex }).map((_, index) => (
                <div key={`blank-${index}`} className="h-9 sm:h-14 w-full" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(date => {
                const isPast = new Date(currentYear, currentMonth, date) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

                return (
                  <button
                    key={date}
                    disabled={isPast}
                    onClick={() => setSelectedDate(date)}
                    className={`relative group h-9 sm:h-14 w-full text-xs font-black transition-all flex items-center justify-center rounded-xl cursor-pointer
                      ${selectedDate === date 
                        ? 'text-black z-10' 
                        : isPast ? 'text-zinc-800 cursor-not-allowed line-through' : 'text-zinc-500 hover:text-white'
                      }`}
                  >
                    {selectedDate === date && (
                      <div className="absolute inset-0.5 sm:inset-1.5 bg-[#F7FFB0] rounded-xl -z-10 shadow-[0_0_15px_rgba(226,251,108,0.3)]" />
                    )}
                    {date}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="w-full">
            <h3 className="text-xs font-black tracking-[0.4em] uppercase text-[#F7FFB0] mb-6 sm:mb-12">02. Select Time</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`group relative h-14 sm:h-20 rounded-xl sm:rounded-3xl border transition-all px-5 sm:px-8 flex items-center justify-between cursor-pointer
                    ${!slot.available ? 'bg-transparent border-zinc-900 opacity-20 cursor-not-allowed' : 
                      selectedTime === slot.time 
                      ? 'bg-[#F7FFB0] border-[#E2FB6C] text-black' 
                      : 'bg-zinc-900/30 border-zinc-800 text-white hover:border-zinc-600'
                    }`}
                >
                  <span className="text-sm sm:text-lg font-black italic uppercase tracking-tighter">{slot.time}</span>
                  {slot.available && (
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedTime === slot.time ? 'bg-black' : 'bg-[#F7FFB0]'}`} />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-6 sm:mt-12 p-4 sm:p-8 bg-zinc-900/20 border-l-2 border-[#E2FB6C] rounded-r-xl sm:rounded-r-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="max-w-full overflow-hidden">
                <p className="text-[9px] text-[#F7FFB0] font-black tracking-[0.2em] uppercase mb-0.5">Reservation Summary</p>
                <p className="text-xs sm:text-lg font-black italic text-white uppercase tracking-tighter truncate">
                  Selected: {selectedDate} {monthNames[currentMonth]} {currentYear} <span className="text-zinc-600 mx-1">/</span> Slot: {selectedTime}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full border border-zinc-800 flex items-center justify-center shrink-0 self-end sm:self-auto">
                <Clock size={14} className="text-zinc-600" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 sm:mt-10">
          <button 
            disabled={loading}
            onClick={handleFinalConfirm}
            className="w-full bg-[#F7FFB0] hover:bg-white text-black py-4 sm:py-6 rounded-xl sm:rounded-[2.5rem] font-black italic text-lg sm:text-2xl uppercase flex items-center justify-center gap-3 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.4)] group disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing Booking..." : "Confirm Appointment"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px #27272a;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;
