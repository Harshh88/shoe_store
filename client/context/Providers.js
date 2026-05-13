"use client"

import { ShopProvider } from "./ShopContext"
import { ProductProvider } from "./ProductContext"
import { CartProvider } from "./CartContext"

export default function Providers({children}){
    return(
        <ShopProvider>
            <ProductProvider>
                <CartProvider>
                {children}
                </CartProvider>
            </ProductProvider>
        </ShopProvider>
    )
}