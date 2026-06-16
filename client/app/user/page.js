"use client";
import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import api from "@/lib/api";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    created_at: "",
    phone: "", 
    password: "", 
    url:""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await api.post("/user/get-profile", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const defaultImg = "imagen_kq7cqt.png";

        const data = res.data;
        if (data && data.success) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            role: data.user.role || "",
            created_at: data.user.created_at || "",
            phone: data.user.phone || "",
            password: "",
            url: data.user.url || `https://res.cloudinary.com/${cloudName}/image/upload/d_${defaultImg}/no_image.png`
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post("/user/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center text-zinc-400 font-medium">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center px-4 py-12">
      <ProfileForm 
        formData={formData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}