"use client"

import { useState } from "react";
import LogIn from "./LogIn"
import { login } from "@/services/authService";

export default function Login(){
    const intialState = {
        email: "",
        password: ""
    }
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState(intialState);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleForm = async(e) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(!formData.email || !formData.password){
                alert("all field are required");
                setFormData(intialState);
            }else{
            const response = await login(formData);
            const token = response.data.token;
            localStorage.setItem("token",token);
            console.log(response);
            setFormData(intialState);
            alert("Login successfull");
            }
        }catch(err){
            console.log("error in login function", err);
        }finally{
            setLoading(false);
        }
    }
    return (
      <LogIn
      handleChange={handleChange}
      handleForm={handleForm}
      formData={formData}
      loading={loading}
      /> 
    )
}