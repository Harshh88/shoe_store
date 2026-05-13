const { fetchAllProducts } = require("../services/product.service");
const {fetchShopUser} = require("../services/shop.service");

const getAllProducts = async (req, res) => {
  try {
    const { shop_id } = req.params;
    const {limit} = req.query;
    const shopRows = await fetchShopUser({shop_id});
    const productRows = await fetchAllProducts({ shop_id,limit });
    res.status(200).json({
      success: true,
      message: "shop fetch successfully",
      shop: shopRows,
      products : productRows
    });
  } catch (err) {
    console.log("something is error in product Controller", err);
    res.status(500).json({
        success: false,
        message: "Internal error"
    })
  }
};

module.exports = {getAllProducts};
