"use client"
import api from "@/lib/api";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function Order(){
    const router = useRouter();
    const initialState = {
        user_name:"",
        country:"",
        state:"",
        city:"",
        address:"",
        contact_number:""
    }
    const [formData,setFormData] = useState(initialState);
    const [cartCosts,setCartCosts] = useState({totalprice:"",totalquantity:""})

    const submitForm = async(e) => {
        e.preventDefault();
        const existToken = localStorage.getItem("token");
        try{
            const res = await api.post("/order",
                {
                    ...formData,
                    total_amount: cartCosts.totalprice
                },
                {
                    headers: {
                        Authorization: `Bearer ${existToken}`
                    }
                }
            )
            if(res.status === 200){
                router.push(`/order/payment/${res.data.order_id}`);
            }
        }
        catch(err){
            console.log("err in frontend submitForm",err);
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const cartTotal = async() => {
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
            setCartCosts(res.data.result);
            console.log(res);
        }
        catch(err){
            console.log("err in frontend cartTotal",err);
        }
    }
    useEffect(()=>{
        cartTotal();
    },[])
    return (
        <div className="text-white w-full">
        <form className="flex flex-col w-full"
        onSubmit={submitForm}
        >
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="user_name"
            type="text"
            placeholder="enter your name"
            onChange={handleChange}
            />
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="country"
            type="text"
            placeholder="enter your country"
            onChange={handleChange}
            />
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="state"
            type="text"
            placeholder="enter your state"
            onChange={handleChange}
            />
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="city"
            type="text"
            placeholder="enter your city"
            onChange={handleChange}
            />
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="address"
            type="text"
            placeholder="enter your address"
            onChange={handleChange}
            />
            <input 
            className="bg-gray-500 m-[0.2rem]"
            name="contact_number"
            type="tel"
            pattern="[0-9]{10}"
            maxLength="10"
            placeholder="enter your contact_number"
            onChange={handleChange}
            />

            <h1>{cartCosts.totalprice}</h1>
            <button 
            className="p-[0.5rem] bg-yellow-500 rounded-full w-[8rem]">checkout</button>

        </form> 
        </div>
    )
}