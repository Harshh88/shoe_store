"use client"
import React, { useState } from 'react';
import Sidebar from '@/component/Sidebar';
import Header from '@/component/Header';
import MetricCard from '@/component/MetricCard';
import RecentActivity from '@/component/RecentActivity';
import InventoryDashboard from '@/component/InventoryDashboard';
import OrderQueueDashboard from '@/component/OrderQueueDashboard';
import BookingsDashboard from '@/component/BookingsDashboard';
import ShopProfileDashboard from '@/component/ShopProfileDashboard';

export default function CommandCenterDashboard({
  totalBooking,
  totalProducts,
  totalOrder,
  products,
  orders
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  console.log(orders);

  const activityData = [
    { type: 'ORDER', title: 'New order from Alex', meta: 'Confirmed • 2 mins ago', value: '+$340.00' },
    { type: 'BOOKING', title: 'Booking confirmed for Tokyo Flagship', meta: 'In-person fitting • 1 hour ago', badge: 'PENDING' },
    { type: 'PRODUCT', title: 'New product: Aero Glide Z2 added', meta: 'Inventory Sync • 4 hours ago', sku: 'SKU: AG-Z2-BLK' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Header title="COMMAND_CENTER" subtitle="Global store performance and real-time logistics." />

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                <MetricCard type="CATALOG" value={totalProducts} label="Total Products" isHighlighted={false} />
                <MetricCard type="VELOCITY" value={totalOrder} label="Total Orders" isHighlighted={true} />
                <MetricCard type="ENGAGEMENTS" value={totalBooking} label="Bookings" isHighlighted={false} />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="lg:col-span-3">
                  <RecentActivity activities={activityData} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Products':
        return (
          <InventoryDashboard
            products={products}
            isEmbedded={true}
          />
        );

      case 'Orders':
        return (
          <OrderQueueDashboard
            orders={orders}
            isEmbedded={true}
          />
        );

      case 'Bookings':
        return (
          <BookingsDashboard />
        );

      case 'Shop Profile':
    return (
      <ShopProfileDashboard />
    );

      default:
        return (
          <div className="flex-1 text-white">
            <Header title={activeTab.toUpperCase()} subtitle="Section under development" />
            <div className="mt-6 p-6 bg-[#141414] rounded-xl border border-[#1F1F1F]">Coming Soon...</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex">
      <Sidebar currentNav={activeTab} onNavChange={setActiveTab} />

      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:pl-64 max-w-7xl mx-auto w-full flex flex-col justify-between">
        {renderContent()}
      </main>
    </div>
  );
}