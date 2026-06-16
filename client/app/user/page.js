"use client";
import React, { useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import api from "@/lib/api";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const defaultAvatar = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
    const defaultImg = "imagen_kq7cqt.png";
    return `https://res.cloudinary.com/${cloudName}/image/upload/d_${defaultImg}/no_image.png`;
  };
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    created_at: "",
    phone: "", 
    password: "", 
    url: defaultAvatar()
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
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = res.data;
        if (data && data.success) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            role: data.user.role || "",
            created_at: data.user.created_at || "",
            phone: data.user.phone || "",
            password: "",
            url: data.user.url || defaultAvatar()
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData({ ...formData, url: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const dataToSend = new FormData();
      
      if (formData.name) dataToSend.append("name", formData.name);
      if (formData.email) dataToSend.append("email", formData.email);
      if (formData.phone) dataToSend.append("phone", formData.phone);
      if (formData.password && formData.password.trim() !== "") {
        dataToSend.append("password", formData.password);
      }
      if (selectedFile) {
        dataToSend.append("image", selectedFile);
      }

      const res = await api.put("/user/update-profile", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (res.data && res.data.success) {
        setFormData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          role: res.data.user.role || "",
          created_at: res.data.user.created_at || "",
          phone: res.data.user.phone || "",
          password: "",
          url: res.data.user.url || defaultAvatar()
        });
        setSelectedFile(null);
        setIsEditing(false);
      }
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
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
