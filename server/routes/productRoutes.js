const express = require("express");
const router = express.Router();
const {getProductsWithAuth} = require("../controllers/productController");
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");

router.post("/",auth,isSeller,getProductsWithAuth)

module.exports = router;