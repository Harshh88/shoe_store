"use client";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
// import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import MainCart from "../cart/MainCart";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const router = useRouter();
  const {cartItems,setCartItems} = useCart();
  const [token, setToken] = useState(null);
  const [total,setTotal] = useState({
    totalprice:"",
    totalquantity:""
  });
  // const router = useRouter();
  const fetchCart = useCallback(async () => {
    try {
      const existToken = localStorage.getItem("token");
      if (!existToken) {
        router.push("/login");
        return;
      }
      setToken(existToken);
      const res = await api.post(
        "/cart",
        {},
        {
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        },
      );
      console.log(res.data);
      setCartItems(res.data.cartItems);
    } catch (err) {
      console.log("err in fetchCart", err);
    }
  }, [router,setCartItems]);
  const deleteItem = async (id, product_id) => {
    // console.log(token);
    const existToken = localStorage.getItem("token");
    try {
      const res = await api.delete(
        "/cart/delete-item",
        {
          data: { cartItemId: id, productId: product_id },
          headers: {
            Authorization: `Bearer ${existToken}`,
          },
        },
      );
      // console.log(res);
      fetchCart();
    } catch (err) {
      console.log("err in deleteItem frontend function", err);
    }
  };
  const totalOfCart = async() => {
    const existToken = localStorage.getItem("token");
    try{
      const res = await api.post("/cart/items-price",
        {},
        {
          headers:{
            Authorization: `Bearer ${existToken}`
          }
        }
      )
      setTotal(res.data.result);
      // console.log();
      console.log(res.data);
      
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    fetchCart();
    totalOfCart();
  }, [fetchCart]);

  return (
    // <div className="text-white flex">
    //   <div>
    //   {cartItems.map((cartItem) => (
    //     <div className="m-[1rem]" key={cartItem.cart_item_id}>
    //       <h1>{cartItem.product_name}</h1>
    //       <p>{cartItem.product_description}</p>
    //       <h2>{cartItem.product_price}</h2>
    //       <h2>{cartItem.product_size}</h2>
    //       <h2>{cartItem.quantity}</h2>
    //       <div>
    //         <button
    //           onClick={() =>
    //             deleteItem(cartItem.cart_item_id, cartItem.product_id)
    //           }
    //           className="p-[0.5rem] m-[1rem] bg-yellow-500 rounded-full cursor-pointer"
    //         >
    //           Delete item
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    //   </div>
    //   <div className="text-white h-[20rem] w-[30%] p-[2rem] m-[2rem] border border-yellow-500 absolute right-[2rem]">
    //     <h1 className="text-white">{total.totalprice}</h1>
    //     <h1>{total.totalquantity}</h1>
    //     <button
    //     className="p-[0.5rem] m-[1rem] bg-yellow-500 rounded-full cursor-pointer">checkout</button>
    //   </div>
    // </div>
    <MainCart totalOfProduct={total} deleteItem={deleteItem}/>
  );
}