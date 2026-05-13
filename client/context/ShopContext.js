"use client"
import { useContext, createContext,useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({children}) => {
    const [shops,setShops] = useState([]);
    return(
        <ShopContext.Provider value={{shops,setShops}}>
            {children}
        </ShopContext.Provider>
    )
}

export const useShop = () => useContext(ShopContext);