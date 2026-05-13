const express = require("express");
const router = express.Router();

const { getCart, addToCart,deleteToCart,priceOfCart } = require("../controllers/cartController");
const auth = require("../middleware/auth");

router.post("/", auth, getCart);

router.post("/add-item", auth, addToCart);

router.delete("/delete-item",auth,deleteToCart);

router.post("/items-price",auth,priceOfCart);

module.exports = router;
