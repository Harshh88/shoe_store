const bcrypt = require("bcrypt");
const { getUserProfile, insertImageRecord, updateUserData } = require("../services/user.service");
const uploadOnCloudinary = require("../utils/uploadOnCloudinary");

const getOneUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await getUserProfile(user_id);
    return res.status(200).json({
      success: true,
      user: user,
      message: "user fetch successfully"
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
};

const editUserController = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { name, email, phone, password } = req.body;
    let updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    updateData.phone = phone || null;
    
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path, "users");
      const secureUrl = cloudinaryRes?.secure_url || cloudinaryRes?.url || cloudinaryRes;
      if (secureUrl) {
        const imageId = await insertImageRecord(secureUrl, user_id);
        updateData.image_id = imageId;
      }
    }

    if (Object.keys(updateData).length > 0) {
      await updateUserData(user_id, updateData);
    }

    const updatedUser = await getUserProfile(user_id);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { getOneUser, editUserController };
