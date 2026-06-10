const cloudinary = require("../config/cloudinary");

const uploadOnCloudinary = async(
    filePath,
    folder = "uploads"
) => {
    const result = await cloudinary.uploader.upload(filePath,{folder});
    return result.secure_url;
}

module.exports = uploadOnCloudinary;