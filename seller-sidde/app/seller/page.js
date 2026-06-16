"use client";
import MainSeller from "./MainSeller";
import { useBooking } from "@/context/BookingContext";
import { useProducts } from "@/context/ProductContext";
import { useOrder } from "@/context/OrderContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import api from "@/lib/api";

export default function Seller() {
  const { allBookings = [], setAllBookings } = useBooking();
  const { products = [], setProducts } = useProducts();
  const { order = [], setOrder } = useOrder();
  const [shop, setShop] = useState(null); 
  const router = useRouter();

  const fetchBookings = async (sellerToken) => {
    try {
      const response = await api.post(
        "/booking/seller/get-bookings",
        {},
        { headers: { Authorization: `Bearer ${sellerToken}` } }
      );
      if (response.data.getAllBookings === undefined) return;
      setAllBookings(response.data.getAllBookings);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmBookingApi = async (bookingId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/booking/seller/confirm-bookings/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Booking confirmed successfully!");
      fetchBookings(sellerToken); 
    } catch (err) {
      console.error(err);
    }
  };

  const completeBookingApi = async (bookingId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/booking/seller/complete-bookings/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Booking marked as completed!");
      fetchBookings(sellerToken);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelBookingApi = async (bookingId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/booking/cancel-bookings/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Booking cancelled successfully!");
      fetchBookings(sellerToken);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmOrderApi = async (orderId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/order/confirm-order/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Order confirmed successfully!");
      fetchAllOrders(sellerToken); 
    } catch (err) {
      console.error(err);
    }
  };

  const shipOrderApi = async (orderId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/order/ship-order/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Order shipped successfully!");
      fetchAllOrders(sellerToken);
    } catch (err) {
      console.error(err);
    }
  };

  const cancelOrderApi = async (orderId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      await api.put(`/order/cancel-order/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      alert("Order cancelled successfully!");
      fetchAllOrders(sellerToken);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteShop = async (sellerToken) => {
    try {
      await api.delete(`/shop/delete-shop`, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllProducts = async (sellerToken) => {
    try {
      const response = await api.post(`/product`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      setProducts(response.data.product || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchShop = async (sellerToken) => {
    try {
      const response = await api.post("/shop/get-shop", {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      setShop(response.data.shop);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllOrders = async (sellerToken) => {
    try {
      const response = await api.post(`order/get-order`, {}, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      setOrder(response.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const editShopApi = async (shopFormData, sellerToken) => {
    try {
      const dataToSend = new FormData();
      dataToSend.append('name', shopFormData.name);
      dataToSend.append('description', shopFormData.description);
      dataToSend.append('contact_number', shopFormData.contact_number);
      dataToSend.append('address', shopFormData.address);
      if (shopFormData.image_file) {
        dataToSend.append('image', shopFormData.image_file);
      }
      const res = await api.put("/shop/edit-shop", dataToSend, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopSave = async (updatedFormData) => {
    const token = localStorage.getItem("sellerToken");
    const result = await editShopApi(updatedFormData, token);
    if (result?.success) {
      alert("Shop details updated successfully!");
      fetchShop(token); 
    }
  };

  const addProduct = async (formData) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      const res = await api.post("/product/create-product", formData, {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
          "Content-Type": "multipart/form-data",
        }
      });
      if (res.data && res.data.success) {
        if (sellerToken) {
          await fetchAllProducts(sellerToken);
        }
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const editProduct = async (productId, formData) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      const res = await api.put(`/product/edit-product/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
          "Content-Type": "multipart/form-data",
        }
      });
      if (res.data && res.data.success) {
        alert("Product updated successfully!");
        if (sellerToken) await fetchAllProducts(sellerToken); 
        return res.data;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProductApi = async (productId) => {
    try {
      const sellerToken = localStorage.getItem("sellerToken");
      const response = await api.delete(`/product/delete-product/${productId}`, {
        headers: { Authorization: `Bearer ${sellerToken}` }
      });
      if (response.data?.success || response.status === 200) {
        setProducts((prevProducts) => 
          prevProducts.filter(product => product.id !== productId && product._id !== productId)
        );
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadSellerData = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "SELLER") {
        alert("only seller or admin can access");
        router.push("/seller/login");
        return;
      }
      fetchBookings(token);
      fetchAllProducts(token);
      fetchAllOrders(token);
      fetchShop(token);
    } catch (err) {
      console.error(err);
      router.push("/seller/login");
    }
  };

  useEffect(() => {
    const existToken = localStorage.getItem("sellerToken");
    if (!existToken) {
      router.push("/seller/login");
    } else {
      loadSellerData(existToken);
    }
  }, []);

  return (
    <div>
      <MainSeller
        totalBooking={allBookings ? allBookings.length : 0}
        totalProducts={products ? products.length : 0}
        totalOrder={order ? order.length : 0}
        products={products || []}
        orders={order || []}
        allBookings={allBookings || []}
        shop={shop}
        onDeleteShop={() => deleteShop(localStorage.getItem("sellerToken"))}
        onSave={handleShopSave}
        onSubmit={addProduct}
        onDeleteProduct={deleteProductApi} 
        onEditProduct={editProduct} 
        onConfirmBooking={confirmBookingApi}
        onCompleteBooking={completeBookingApi}
        onCancelBooking={cancelBookingApi}
        onConfirmOrder={confirmOrderApi}
        onShipOrder={shipOrderApi}
        onCancelOrder={cancelOrderApi}
      />
    </div>
  );
}
