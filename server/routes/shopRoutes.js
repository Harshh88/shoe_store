const express = require("express");
const router = express.Router();

const {getAllShops} = require("../controllers/shopController");
const { getAllProducts } = require("../controllers/productController");


router.post("/nearby",
    getAllShops
)
router.get("/:shop_id",getAllProducts);



module.exports = router;