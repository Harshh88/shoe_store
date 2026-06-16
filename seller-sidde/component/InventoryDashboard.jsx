"use client"
import React, { useState } from 'react';
import Sidebar from '@/component/Sidebar';
import Header from '@/component/Header';
import AddProductButton from '@/component/AddProductButton';
import ProductCard from '@/component/ProductCard';
import MetricsOverview from '@/component/MetricsOverview';
import EditProductDashboard from './EditProductDashboard';

export default function InventoryDashboard({ 
  products = [], 
  isEmbedded = false,
  onAddProductClick,
  onDeleteProduct,
  onEditProduct
}) {
  const [currentView, setCurrentView] = useState('LIST');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Total value metrics
  const totalPrice = products.reduce((acc, curr) => {
    return acc + Number(curr.price || 0);
  }, 0);

  // Total absolute quantities across all dynamic item listings
  const totalStockCount = products.reduce((acc, curr) => {
    return acc + Number(curr.stock || 0);
  }, 0);

  const IndianPrice = totalPrice.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR'
  });
  
  const sampleMetrics = [
    { label: 'INVENTORY VALUE', value: IndianPrice },
    { label: 'TOTAL STOCK', value: totalStockCount },
  ];

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('EDIT');
  };

  const handleEditSaveSuccess = () => {
    setCurrentView('LIST');
    setSelectedProduct(null);
  };

  if (currentView === 'EDIT' && selectedProduct) {
    return (
      <EditProductDashboard 
        product={selectedProduct}
        onBack={() => setCurrentView('LIST')}
        onSubmit={onEditProduct}
        onSaveSuccess={handleEditSaveSuccess}
      />
    );
  }

  const mainLayout = (
    <div className="flex-1 flex flex-col justify-between w-full relative">
      <div>
        <Header title="INVENTORY" subtitle="MANAGING ACTIVE HIGH-PERFORMANCE LISTINGS" />
        
        <AddProductButton isOpen={false} onClick={onAddProductClick} />
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id || product._id} 
              product={product} 
              onDeleteProduct={onDeleteProduct} 
              onEditClick={handleEditClick} 
            />
          ))}
        </section>
      </div>

      <MetricsOverview metricsData={sampleMetrics} />
    </div>
  );

  if (isEmbedded) {
    return mainLayout;
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] flex">
      <Sidebar currentNav="Products" />
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full flex flex-col justify-between">
        {mainLayout}
      </main>
    </div>
  );
}
