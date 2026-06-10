const express = require("express");
const router = express.Router();

const {getAllShops,getShopByUserId,createNewShop,deleteShopBySeller,editShopController} = require("../controllers/shopController");
const { getAllProducts } = require("../controllers/productController");
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");
const upload = require("../middleware/multer");


router.post("/nearby",
    getAllShops
)

router.get("/:shop_id",
    getAllProducts);

router.post("/get-shop",auth,isSeller,getShopByUserId);

router.post("/add-shop",auth,createNewShop);

router.delete("/delete-shop",auth,isSeller,deleteShopBySeller);

router.put("/edit-shop",auth,isSeller,
    upload.single("image"),
    editShopController
)


module.exports = router;