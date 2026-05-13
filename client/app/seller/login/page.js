"use client"
import { useState } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"

export default function AdminLogin(){
    const router = useRouter();
    const initalState = {
        email:"",
        password:"",
    }
    const[formData,setFormData] = useState(initalState);
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await api.post("/seller/login",formData);
            if(response.status !== 200){
                return;
            }
            // alert("login successfully");
            let decoded
            try{
                decoded = jwtDecode(response.data.token);
            }
            catch(e){
                alert("Invalid token");
                return;
            }
            
            if(decoded.role !== "SELLER"){
                alert("only seller can access");
                setFormData(initalState);
                return;
            }
            localStorage.setItem("sellerToken",response.data.token);
            console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data.safeUser));
            if(response.status === 200){
               router.push("/seller"); 
            }
            console.log(response);
        }catch(err){
            console.log("something error in seller login function",err);
        }
    }
    return(
        <form className="text-white" onSubmit={handleSubmit}>
            <input
            className="bg-gray-500"
            type="email"
            placeholder="enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
            <input
            className="bg-gray-500 text-white"
            type="password"
            placeholder="enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
            <button type="submit">login</button>
        </form>
    )
}