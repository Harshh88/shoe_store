"use client";

import { useState } from "react";
import { signup } from "@/services/authService";
import SignUp from "./SignUp";
import { useRouter } from "next/navigation";

export default function AuthSignUp() {
  const router = useRouter();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };
  
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false); // Shop verification check prompt state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      console.log(response?.data?.user);
      setFormData(initialState);
      setShowPrompt(true); // Signup complete, show custom popup terminal
    } catch (err) {
      console.log("Signup error", err);
      alert(err.response?.data?.message || "Signup matrix configuration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePromptChoice = (registerShop) => {
    setShowPrompt(false);
    if (registerShop) {
      router.push("/shops/add");
    } else {
      router.push("/login");
    }
  };

  return (
    <SignUp 
      formData={formData}
      handleChange={handleChange}
      handleForm={handleForm}
      loading={loading}
      showPrompt={showPrompt}
      onPromptChoice={handlePromptChoice}
    />
  );
}