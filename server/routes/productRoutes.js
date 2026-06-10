const express = require("express");
const router = express.Router();
const {getProductsWithAuth,createNewProduct,deleteOneProduct,editOneProduct,getGlobalProducts} = require("../controllers/productController");
const auth = require("../middleware/auth");
const isSeller = require("../middleware/isSeller");
const upload = require("../middleware/multer");



router.get("/global", getGlobalProducts);
router.post("/",auth,isSeller,getProductsWithAuth);
router.post("/create-product",auth,isSeller,
    upload.single("image"),
    createNewProduct
);

router.put("/edit-product/:id",auth,isSeller,upload.single("image"),editOneProduct);
router.delete("/delete-product/:id",auth,isSeller,deleteOneProduct);

module.exports = router;