const { getOneUser, editUserController } = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");
const upload = require("../middleware/multer");

// User Side Routes (Purane wale - Intact)
router.post("/get-profile", auth, getOneUser);
router.put("/update-profile", auth, upload.single("image"), editUserController);

// Seller Side Routes (Naye wale - Added)
router.post("/get-seller-profile", auth, isSeller, getOneUser);
router.put("/update-seller-profile", auth, isSeller, upload.single("image"), editUserController);

module.exports = router;
