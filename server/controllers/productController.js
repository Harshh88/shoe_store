const { fetchAllProducts } = require("../services/product.service");
const {fetchShopUser,fetchUserShop} = require("../services/shop.service");

const getAllProducts = async (req, res) => {
  try {
    const {shop_id} = req.params;
    const {limit} = req.query;
    const shopRows = await fetchShopUser({shop_id});
    // if(!shopRows){
    //   return res.status(404).json({
    //     message: "you don't have shop"
    //   })
    // }
    const productRows = await fetchAllProducts({ shop_id,limit });
    console.log(productRows)
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

const getProductsWithAuth = async(req,res) => {
  try{
    const user_id = req.user.id;
    // console.log("user id is:" ,user_id);
    const shop = await fetchUserShop({user_id});
    // console.log(shop);
    if(!shop){
      return res.status(404).json({
        message: "you don't have shop"
      })
    }
    const shop_id = shop.id;
    // console.log(shop_id);
    const productRows = await fetchAllProducts({shop_id});
    // console.log(productRows);
    res.status(200).json({
      success: true,
      message:"product fetch successfully",
      product: productRows
    })
  }
  catch(err){
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
}

module.exports = {getAllProducts,getProductsWithAuth};
