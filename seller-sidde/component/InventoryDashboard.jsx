"use client"
import React, { useState } from 'react';
import Sidebar from '@/component/Sidebar';
import Header from '@/component/Header';
import AddProductButton from '@/component/AddProductButton';
import FilterTabs from '@/component/FilterTabs';
import ProductCard from '@/component/ProductCard';
import MetricsOverview from '@/component/MetricsOverview';
import { Currency } from 'lucide-react';

export default function InventoryDashboard({ 
  products, 
  isEmbedded = false 
}) {
  const [activeTab, setActiveTab] = useState('ALL ITEMS');
  const [isAddOpen, setIsAddOpen] = useState(false);
  // const [total,setTotal] = useState(0);
  // const [total,setTotal] = useState({totalItem:"",totalPrice:""});
  // console.log(products.length)
  
  const totalPrice = products.reduce((acc,curr)=>{
    return acc + curr.price
  },0)

  const IndianPrice = totalPrice.toLocaleString('en-IN',{
    style: 'currency',
    currency: 'INR'
  })

  // const tabsList = ['ALL ITEMS', 'RUNNING', 'BASKETBALL'];

  
  const sampleMetrics = [
    { label: 'INVENTORY VALUE', value: IndianPrice },
    { label: 'TOTAL STOCK', value: products.length },
  ];

  const mainLayout = (
    <div className="flex-1 flex flex-col justify-between w-full">
      <div>
        <Header title="INVENTORY" subtitle="MANAGING 24 ACTIVE HIGH-PERFORMANCE LISTINGS" />
        
        <AddProductButton isOpen={isAddOpen} onClick={() => setIsAddOpen(!isAddOpen)} />
        
        {/* <FilterTabs tabs={tabsList} activeTab={activeTab} onTabChange={setActiveTab} /> */}
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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