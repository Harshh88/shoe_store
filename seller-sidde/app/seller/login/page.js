"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";
import SellerLoginForm from "@/component/SellerLoginForm";

export default function AdminLogin() {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post("/seller/login", formData);
            
            if (response.status !== 200) {
                setLoading(false);
                return;
            }

            let decoded;
            try {
                decoded = jwtDecode(response.data.token);
            } catch (err) {
                alert("Invalid token");
                setLoading(false);
                return;
            }
            
            if (decoded.role !== "SELLER") {
                alert("Only seller can access this terminal");
                setFormData(initialState);
                setLoading(false);
                return;
            }

            localStorage.setItem("sellerToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.safeUser));
            
            router.push("/seller"); 

        } catch (err) {
            console.log("Something went wrong in seller login function", err);
            alert(err.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SellerLoginForm 
            formData={formData}
            loading={loading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
}