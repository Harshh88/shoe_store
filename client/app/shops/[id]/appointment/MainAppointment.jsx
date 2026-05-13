import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

const BookingPage = ({bookingShop}) => {
  const [selectedDate, setSelectedDate] = useState(9);
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  
  const name_parts = bookingShop.name.split(" ");
  const [first_name, ...remain_name] = bookingShop.name.split(" ");


  const timeSlots = [
    { time: '10:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '01:00 PM', available: false },
    { time: '02:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '05:30 PM', available: false },
  ];

  return (
    <div className="min-h-screen w-full text-white font-sans selection:bg-[#E2FB6C] selection:text-black">
      
      {/* Top Navigation Bar - Immersive & Minimal */}
      <nav className="flex justify-between items-center px-4 py-10 max-w-[1400px] mx-auto">
        <button className="group flex items-center gap-3 text-zinc-500 hover:text-[#E2FB6C] transition-all text-[10px] font-black tracking-[0.3em] uppercase">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Shops
        </button>
        <div className="text-2xl font-black italic text-[#F7FFB0] tracking-tighter uppercase leading-none">
          KINETIC<span className="text-[#F7FFB0]"></span>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-4 pb-20">
        
        {/* Main Hero Section - Merged with Page */}
        <div className="grid lg:grid-cols-12 gap-16 items-start mb-24 mt-4">
          
          {/* Visual Side */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden border border-zinc-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <img 
                src={bookingShop.shop_image} 
                alt={bookingShop.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
            </div>
          </div>

          {/* Text Side */}
          <div className="lg:col-span-5 pt-8">
            <div className="inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-[#E2FB6C] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-zinc-300 tracking-widest uppercase">Digital Flagship</span>
            </div>
            
            <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.75] mb-8">
              {first_name}<br />
              <span className="text-zinc-800 outline-text">{remain_name}</span>
            </h1>

            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin size={18} className="text-[#F7FFB0]" />
                <span className="text-xs font-bold tracking-widest uppercase">{bookingShop.address}</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                {bookingShop.description}
              </p>
            </div>
          </div>
        </div>

        {/* Booking Controls - Clean Sections */}
        <div className="grid lg:grid-cols-2 gap-24 py-20 border-t border-zinc-900">
          
          {/* Calendar Section */}
          <section>
            <header className="flex justify-between items-center mb-12">
              <h3 className="text-xs font-black tracking-[0.4em] uppercase text-zinc-600">01. Select Date</h3>
              <div className="flex items-center gap-6">
                <button className="p-2 hover:bg-zinc-900 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                <span className="text-sm font-black italic tracking-tighter uppercase">October 2024</span>
                <button className="p-2 hover:bg-zinc-900 rounded-full transition-colors"><ChevronRight size={20} /></button>
              </div>
            </header>

            <div className="grid grid-cols-7 gap-y-4 text-center">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-[10px] font-black text-zinc-800 mb-4">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`relative group h-14 w-full text-sm font-black transition-all flex items-center justify-center rounded-2xl
                    ${selectedDate === date 
                      ? 'text-black z-10' 
                      : 'text-zinc-500 hover:text-white'
                    } ${date < 8 ? 'opacity-10 cursor-not-allowed' : ''}`}
                >
                  {selectedDate === date && (
                    <div className="absolute inset-2 bg-[#F7FFB0] rounded-2xl -z-10 shadow-[0_0_20px_rgba(226,251,108,0.4)]" />
                  )}
                  {date}
                </button>
              ))}
            </div>
          </section>

          {/* Time Slot Section */}
          <section>
            <h3 className="text-xs font-black tracking-[0.4em] uppercase text-[#F7FFB0] mb-12">02. Select Time</h3>
            <div className="grid grid-cols-2 gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedTime(slot.time)}
                  className={`group relative h-20 rounded-3xl border  transition-all px-8 flex items-center justify-between
                    ${!slot.available ? 'bg-transparent border-zinc-900 opacity-20 cursor-not-allowed' : 
                      selectedTime === slot.time 
                      ? 'bg-[#F7FFB0] border-[#E2FB6C] text-black' 
                      : 'bg-zinc-900/30 border-zinc-800 text-white hover:border-zinc-600'
                    }`}
                >
                  <span className="text-lg font-black italic uppercase tracking-tighter">{slot.time}</span>
                  {slot.available && (
                    <div className={`w-2 h-2 rounded-full transition-colors ${selectedTime === slot.time ? 'bg-black' : 'bg-[#F7FFB0]'}`} />
                  )}
                </button>
              ))}
            </div>

            {/* Bottom Summary Bar */}
            <div className="mt-12 p-8 bg-zinc-900/20 border-l-2 border-[#E2FB6C] rounded-r-3xl flex justify-between items-center">
              <div>
                <p className="text-[10px] text-[#F7FFB0] font-black tracking-[0.2em] uppercase mb-1">Reservation Summary</p>
                <p className="text-lg font-black italic text-white uppercase tracking-tighter">
                  Wed, Oct {selectedDate} <span className="text-zinc-600 mx-2">/</span> {selectedTime}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full border border-zinc-800 flex items-center justify-center">
                <Clock size={16} className="text-zinc-600" />
              </div>
            </div>
          </section>
        </div>

        {/* Global Action Button */}
        <div className=" bottom-10 mt-10">
          <button className="w-full bg-[#F7FFB0] hover:bg-white text-black py-8 rounded-[2.5rem] font-black italic text-2xl uppercase flex items-center justify-center gap-4 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
            Confirm Appointment
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
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