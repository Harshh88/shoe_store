const { getOrCreate,getCartItems,addCart,deleteCartItem,totalCartItem } = require("../services/cart.service");
const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const userCart = await getOrCreate(userId);
    const cartItems = await getCartItems(userCart.id);
    // console.log(userCart);
    // console.log(cartItems);
    res.status(200).json({
        success: true,
        message:"user cart fetch successfully",
        cartItems
    })

  } catch (err) {
    console.log("something error in cart Controller",err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
};

const addToCart = async(req,res) => {
  const userId = req.user.id;
  const {product_id} = req.body;
  try{
    const userCart = await getOrCreate(userId);
    const result = await addCart(userCart.id,product_id);
    res.status(200).json({
      message: "item add into cart successfully",
      result
    })
  }
  catch(err){
    console.log("err in addToCart in cart Controller",err);
    return res.status(err.status || 500).json({
      message: err.message
    })
  }
}

const deleteToCart = async(req,res) => {
  const {cartItemId,productId }= req.body;
  try{
    const result = await deleteCartItem(cartItemId,productId);
    res.status(200).json({
      success:true,
      message: "delete item successfully from cart",
      result
    })
  }
  catch(err){
    console.log("err in delete to cart function",err);
    return res.status(err.status || 500).json({
      success:false,
      message: err.message
    })
  }
}

const priceOfCart = async(req,res) => {
  const userId = req.user.id;
  try{
    const userCart = await getOrCreate(userId);
    const result = await totalCartItem(userCart.id);
    res.status(200).json({
      success: true,
      result
    })
  }
  catch(err){
    console.log("err in price Of cart",err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = {getCart,addToCart,deleteToCart,priceOfCart};
