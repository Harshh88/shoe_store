const express = require("express");
const router = express.Router();
const {addBookings,sellerConfirmBooking,sellerCompleteBooking,getUserBookings,getBookingShop} = require("../controllers/bookingController");
const auth = require("../middleware/auth");
// const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");

router.post("/:shop_id/get-shop",
    auth,
    getBookingShop
)

router.post("/create",
    auth,
    addBookings);


router.post("/seller/get-bookings",
auth,
isSeller,
getUserBookings);

router.put("/seller/confirm-bookings",
    auth,
    isSeller,
    sellerConfirmBooking
)
router.put("/seller/complete-bookings",
    auth,
    isSeller,
    sellerCompleteBooking
)
module.exports = router;