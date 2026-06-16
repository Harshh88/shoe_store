const pool = require("../config/db");
const { fetchAllShops, fetchUserShop, createShop, deleteShop, editShop } = require("../services/shop.service");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

const getAllShops = async (req, res) => {
  try {
    const { latitude, longitude, limit } = req.body || {};
    const shops = await fetchAllShops({ latitude, longitude, limit });
    
    res.status(200).json({
      success: true,
      message: shops.length ? "shops fetch successfully" : "shops not found",
      shops
    });
  } catch (err) {
    console.log("something error in shopController", err);
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getShopByUserId = async (req, res) => {
  try {
    const user_id = req.user.id;
    const shop = await fetchUserShop({ user_id });
    if (!shop) {
      return res.status(404).json({
        message: "you don't have shop",
        success: false
      });
    }
    res.status(200).json({
      shop: shop,
      message: "shop fetch successfully",
      success: true
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      message: err.message
    });
  }
};

const createNewShop = async (req, res) => {
  try {
    const user_id = req.user.id;
    
    const existShop = await pool.query(`SELECT id FROM shops WHERE user_id=$1`, [user_id]);
    if (existShop.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "you already have a shop"
      });
    }

    const { name, description, address, contact_number, longitude, latitude } = req.body;
    
    let image_url = null;
    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path, "shops");
      image_url = cloudinaryRes?.secure_url || cloudinaryRes?.url || cloudinaryRes;
    }

    if (!name || !address || !contact_number) {
      return res.status(400).json({
        success: false,
        message: "all required fields must be filled"
      });
    }

    const data = {
      name,
      description,
      address,
      contact_number,
      longitude: longitude ? parseFloat(longitude) : 0.0,
      latitude: latitude ? parseFloat(latitude) : 0.0,
      image_url 
    };

    const { finalShop, token } = await createShop(user_id, data);
    
    return res.status(201).json({
      success: true,
      shop: finalShop,
      token,
      message: "shop created successfully"
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Internal server error"
    });
  }
};

const deleteShopBySeller = async (req, res) => {
  try {
    const user_id = req.user.id;
    const deletedShop = await deleteShop(user_id);
    
    if (!deletedShop) {
      return res.status(404).json({
        success: false,
        message: "you don't have any shop to delete "
      });
    }
    
    res.status(200).json({
      success: true,
      deleteShop: deletedShop
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message,
      success: false
    });
  }
};

const editShopController = async (req, res) => {
  try {
    const user_id = req.user.id; 

    const shop = await fetchUserShop({ user_id });
    if (!shop) {
      return res.status(404).json({ 
        success: false, 
        message: "you don't have shop" 
      });
    }
    const shop_id = shop.id;

    const { name, description, contact_number, address } = req.body;

    let updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (contact_number) updateData.contact_number = contact_number;
    if (address) updateData.address = address;

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path, "shops");
      updateData.image_url = cloudinaryRes?.secure_url || cloudinaryRes?.url || cloudinaryRes;
    }

    const updatedShop = await editShop({
      shop_id,
      data: updateData
    });

    if (!updatedShop) {
      return res.status(500).json({
        success: false,
        message: "failed to shop edit"
      });
    }

    const freshShopData = await fetchUserShop({ user_id });

    return res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      shop: freshShopData
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { getAllShops, getShopByUserId, createNewShop, deleteShopBySeller, editShopController };
