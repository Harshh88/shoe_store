const express = require("express");
const router = express.Router();
const {signUp,logIn} = require("../controllers/authController");
const{sellerLogin} = require("../controllers/SellerController")


router.post("/signup",
    signUp
);

router.post("/login",
    logIn
)

router.post("/seller/login",sellerLogin);


module.exports = router;