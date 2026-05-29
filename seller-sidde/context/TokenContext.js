"use client"
import { useContext,createContext,useState } from "react"

const TokenContext = createContext();

export const TokenProvider = ({children}) => {
    const [sellerToken, setSellerToken] = useState(null);
    return(
        <TokenContext.Provider value={{sellerToken,setSellerToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = () => useContext(TokenContext);