require("dotenv").config();
// const { use } = require("react");
const {sellerAuth,getBookings} = require("../services/seller.service");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const sellerLogin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await sellerAuth(email,password);
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const safeUser = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"});
        res.setHeader("Authorization",`Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "seller login successfully",
            token,
            safeUser
        })
    }catch(err){
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    }
}



module.exports = {sellerLogin,};