const express = require("express");
const router = express.Router();
const {orderForm,getAllOrders,confirmPendingOrder,shipConfirmedOrder,cancelOrder,getMyOrder} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");

router.post("/",auth,orderForm);
router.get("/my-order/:id",auth,getMyOrder);
router.post("/get-order",auth,isSeller,getAllOrders);
router.put("/confirm-order/:id",auth,isSeller,confirmPendingOrder);
router.put("/ship-order/:id",auth,isSeller,shipConfirmedOrder);
router.put("/cancel-order/:id",auth,isSeller,cancelOrder);

module.exports = router;