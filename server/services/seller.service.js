const bcrypt = require("bcrypt");
const pool = require("../config/db");
const sellerAuth = async(email,password) => {
    const existUser = await pool.query(`
         SELECT * FROM users
         WHERE email=$1
        `,[email]);
     if(existUser.rows.length === 0){
        throw {message: "user not found",status: 404};
     }
     if(existUser.rows[0].role !== "SELLER"){
        throw {message: "only seller can access",status:403};
     }
     const isMatch = await bcrypt.compare(password,existUser.rows[0].password);
     if(!isMatch){
        throw {message: "password do not match",status:401};
     }
     console.log("Seller login successfully");
     return existUser.rows[0];
}



module.exports ={sellerAuth};