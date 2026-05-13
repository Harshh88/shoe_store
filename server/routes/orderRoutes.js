const express = require("express");
const router = express.Router();
const {orderForm} = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/",auth,orderForm);

module.exports = router;