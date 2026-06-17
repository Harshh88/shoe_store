"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from '@/component/Sidebar';
import Header from '@/component/Header';
import MetricCard from '@/component/MetricCard';
import RecentActivity from '@/component/RecentActivity';
import InventoryDashboard from '@/component/InventoryDashboard';
import OrderQueueDashboard from '@/component/OrderQueueDashboard';
import BookingsDashboard from '@/component/BookingsDashboard';
import ShopProfileDashboard from '@/component/ShopProfileDashboard';
import AddProductDashboard from '@/component/AddProductDashboard';

export default function CommandCenterDashboard({
  totalBooking,
  totalProducts,
  totalOrder,
  products = [],
  orders = [],
  allBookings = [],
  shop,
  onDeleteShop,
  onSave,
  onSubmit,
  onDeleteProduct,
  onEditProduct,
  onConfirmBooking,
  onCompleteBooking,
  onCancelBooking,
  onConfirmOrder,   
  onShipOrder,      
  onCancelOrder     
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('VELOCITY'); 

  const dynamicOrders = [...products].reverse().map(p => ({
    type: 'PRODUCT',
    title: `New product added: ${p.name || 'Component'}`,
    meta: `Size: ${p.size || 'Standard'} • Stock: ${p.stock || 0}`,
    sku: `SKU: PROD-${p.id || p._id || '00'}`,
    rawDate: p.createdAt || p.updatedAt || 0
  }));

  const dynamicActivities = [...orders].reverse().map(o => ({
    type: 'ORDER',
    title: `Order from ${o.customer || 'Client'}`,
    meta: `ID: #${o.id || '00'} • Status: ${o.status?.toUpperCase() || 'PENDING'}`,
    value: `₹${Number(o.total_amount || 0).toLocaleString("en-IN")}`,
    rawDate: o.createdAt || o.id || 0
  }));

  const dynamicBookings = [...allBookings].reverse().map(b => ({
    type: 'BOOKING',
    title: `Session with ${b.name || 'User'}`,
    meta: b.booking_datetime ? new Date(b.booking_datetime).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Date Pending',
    badge: b.status?.toUpperCase() || 'PENDING',
    rawDate: b.booking_datetime || 0
  }));

  const combinedActivities = [...dynamicActivities, ...dynamicBookings, ...dynamicOrders];

  const filteredActivities = combinedActivities.filter((activity) => {
    if (selectedMetric === 'CATALOG') return activity.type === 'PRODUCT';
    if (selectedMetric === 'VELOCITY') return activity.type === 'ORDER';
    if (selectedMetric === 'ENGAGEMENTS') return activity.type === 'BOOKING';
    return true;
  });

  const latestThreeActivities = filteredActivities.slice(0, 3);

  const handleViewAllRedirect = () => {
    if (selectedMetric === 'CATALOG') setActiveTab('Products');
    if (selectedMetric === 'VELOCITY') setActiveTab('Orders');
    if (selectedMetric === 'ENGAGEMENTS') setActiveTab('Bookings');
  };

  const handleAddProductToggle = () => {
    setActiveTab('AddProduct');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="flex-1 flex flex-col justify-between w-full">
            <div className="w-full">
              <Header title="COMMAND_CENTER" subtitle="Global store performance and real-time logistics." />
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8 mt-4">
                <MetricCard 
                  type="CATALOG" 
                  value={totalProducts} 
                  label="Total Products" 
                  isHighlighted={selectedMetric === 'CATALOG'} 
                  onClick={() => setSelectedMetric('CATALOG')}
                />
                <MetricCard 
                  type="VELOCITY" 
                  value={totalOrder} 
                  label="Total Orders" 
                  isHighlighted={selectedMetric === 'VELOCITY'} 
                  onClick={() => setSelectedMetric('VELOCITY')}
                />
                <MetricCard 
                  type="ENGAGEMENTS" 
                  value={totalBooking} 
                  label="Bookings" 
                  isHighlighted={selectedMetric === 'ENGAGEMENTS'} 
                  onClick={() => setSelectedMetric('ENGAGEMENTS')}
                />
              </section>
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <div className="w-full">
                  <RecentActivity activities={latestThreeActivities} onViewAllClick={handleViewAllRedirect} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Products':
        return (
          <div className="w-full">
            <InventoryDashboard
              products={products}
              isEmbedded={true}
              onAddProductClick={handleAddProductToggle}
              onDeleteProduct={onDeleteProduct} 
              onEditProduct={onEditProduct}
            />
          </div>
        );

      case 'Orders':
        return (
          <div className="w-full">
            {/* Added standard wrapper in case you implement network/order displays */}
            <OrderQueueDashboard 
              orders={orders} 
              onConfirmOrder={onConfirmOrder}
              onShipOrder={onShipOrder} 
              onCancelOrder={onCancelOrder}
            />
          </div>
        );

      case 'Bookings':
        return (
          <div className="w-full">
            <BookingsDashboard 
              allBookings={allBookings}
              onConfirmBooking={onConfirmBooking}
              onCompleteBooking={onCompleteBooking}
              onCancelBooking={onCancelBooking}
            />
          </div>
        );

      case 'Shop Profile':
        return (
          <div className="w-full">
            <ShopProfileDashboard shopData={shop} onDelete={onDeleteShop} onSave={onSave}/>
          </div>
        );

      case 'AddProduct':
        return (
          <div className="w-full">
            <AddProductDashboard 
              onBack={() => setActiveTab('Products')} 
              onSubmit={async (formData) => {
                const success = await onSubmit(formData);
                if (success) {
                  alert("Product added successfully!");
                  setActiveTab('Products');
                } else {
                  alert("Failed to add product.");
                }
              }} 
            />
          </div>
        );

      default:
        return (
          <div className="flex-1 text-white w-full">
            <Header title={activeTab.toUpperCase()} subtitle="Section under development" />
            <div className="mt-6 p-4 sm:p-6 bg-[#141414] rounded-xl border border-[#1F1F1F]">Coming Soon...</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] relative flex flex-col w-full overflow-x-hidden">
      {/* Sidebar Toggle Button */}
      <button 
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2.5 sm:p-3 bg-[#141414] border border-[#1F1F1F] rounded-xl flex items-center justify-center text-[#F7FFB0] hover:text-white transition-colors cursor-pointer shadow-lg"
      >
        {isSidebarOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
      </button>

      {/* Shared Sidebar */}
      <Sidebar 
        currentNav={activeTab === 'AddProduct' ? 'Products' : activeTab} 
        onNavChange={setActiveTab} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Area: Centered layout with clean grid fluid adjustment */}
      <div className={`flex-1 w-full flex flex-col items-center transition-all duration-300 ${
        isSidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
      }`}>
        <main className="w-full max-w-7xl p-4 sm:p-6 md:p-8 pt-20 flex flex-col justify-between">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
