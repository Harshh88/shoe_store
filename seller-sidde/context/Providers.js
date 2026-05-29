"use client";
import { BookingProvider } from "./BookingContext";
import { TokenProvider } from "./TokenContext";
import { ProductProvider } from "./ProductContext";
import { OrderProvider } from "./OrderContext";

export default function Providers({ children }) {
  return (
    
    <BookingProvider>
      <TokenProvider>
        <ProductProvider>
          <OrderProvider>
        {children}
        </OrderProvider>
        </ProductProvider>
        </TokenProvider>
    </BookingProvider>
  );
}
