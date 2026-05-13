"use client";

import { useState } from "react";
import { signup } from "@/services/authService";
import SignUp from "./SignUp";

export default function AuthSignUp() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(formData.password !== formData.confirm_password){
      alert("passworda do not match");
      setLoading(false);
      setFormData(initialState)
    }

    try {
      const response = await signup(formData);
      console.log(response.data.user);
      setFormData(initialState);
    } catch (err) {
        console.log("Signup error",err);
    }finally{
        setLoading(false);
    }
  };

  return (
    <SignUp 
    formData={formData}
    handleChange={handleChange}
    handleForm={handleForm}
    loading={loading}
    />
  );
}
