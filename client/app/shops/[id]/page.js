"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import MainProduct from "../[id]/MainProduct"
import { useProducts } from "@/context/ProductContext";

export default function AllProducts() {
  const initalState = {
    id:"",
    shop_name:"",
    user_id:"",
    user_name:""
  }
  const [shopData,setShopData] = useState(initalState);
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const {products,setProducts} = useProducts();
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await api.get(`/shop/${id}`);
        console.log(res.data.shop);
        console.log(res.data.products);
        setShopData(res.data.shop);
        setProducts(res.data.products);
      } catch (err) {
        console.log("something error in fetching all shops",err);
      }
    };
    fetchAllProducts();
  }, []);
  const goToBooking = (shop_id) => {
    try{
      router.push(`/shops/${shop_id}/appointment`);
    }catch(err){
      console.log(err);
    }
  }
  const addCart = async(id) => {
    try{
      const existToken = localStorage.getItem("token");
      if(!existToken){
        router.push("/login");
        return;
      }
      await api.post("/cart/add-item",
        {product_id:id},
        {
          headers:{
            Authorization: `Bearer ${existToken}`
          }
        }
      )
      alert("add item successfully");
    }
    catch(err){
      console.log("err in addCart frontend function",err);
    }
  }
  return (

    // <div className="text-white p-[2rem]">
    //     {products.map((product)=>(
    //         <div key={product.id} className="m-[2rem]">
    //             <h1>{product.name}</h1>
    //             <p>{product.description}</p>
    //             <p>{product.size}</p>
    //             <p>{product.stock}</p>
    //             <p>{product.price}</p>
    //             <button 
    //             onClick={()=>addCart(product.id)}
    //             className="cursor-pointer bg-blue-400 text-white whitespace-nowrap rounded-full w-[7rem]"
    //             >Add to Cart</button>
    //         </div>
    //     ))}
    // </div>
    <div 
    className="mt-[-1.4rem]"
    >
    <MainProduct shop={shopData} addCart={addCart} goToBooking={goToBooking}/>
    </div>
  )
}
