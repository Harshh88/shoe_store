const express = require("express");
const router = express.Router();
const {createPayment,paymentVerify} = require("../controllers/paymentController");


router.post("/create",createPayment);
router.post("/verify",paymentVerify)

module.exports = router;