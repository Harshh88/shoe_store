const express = require("express");
const router = express.Router();
const {createPayment,paymentVerify} = require("../controllers/paymentController");
const auth = require("../middleware/auth");


router.post("/create",auth,createPayment);
router.post("/verify",auth,paymentVerify)

module.exports = router;