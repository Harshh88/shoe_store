const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async(req,res) => {
    const {name,email,password} = req.body;
    // const role = "SELLER";
    try{
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "all field required"
            })
        }
        const existUser = await pool.query(`SELECT 1 FROM users WHERE email=$1`,
            [email]
        )
        if(existUser.rows.length !== 0){
            return res.status(409).json({
                success: false,
                message: "User already exist"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const createdUser =  await pool.query(`INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,role`,
            [name,email,hashPassword]
        )
        res.status(201).json({
            success: true,
            message: "signup successfull",
            user: createdUser.rows[0]
        })
    }
    catch(err){
        console.log("err in signup controller",err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const logIn = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existUser = await pool.query(`
            SELECT id,email,password FROM users WHERE email=$1
            `,[email])

        if(existUser.rows.length === 0){
            return res.status(404).json({
                success: true,
                message: "User not found",
            })
        }
        const isMatch = await bcrypt.compare(password,existUser.rows[0].password);
        if(!isMatch){
            return res.status(401).json({
                success: true,
                message: "password do not match"
            })
        }

        const payload = {
            id : existUser.rows[0].id,
            email : existUser.rows[0].email,
            role : existUser.rows[0].role
        }
        const safeUser = {
            id: existUser.rows[0].id,
            email: existUser.rows[0].email,
            role: existUser.rows[0].role
        }

        const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: "1d"});
        res.setHeader("Authorization" ,`Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "login successfull",
            token,
            safeUser
        });

    }catch(err){
        console.log("something error in login function", err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


module.exports = {signUp,logIn};