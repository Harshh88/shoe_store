const {getOneUser} = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/get-profile",auth,getOneUser);

module.exports = router;
