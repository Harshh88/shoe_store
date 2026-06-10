const {
  formSubmit,
  createOrder,
  createOrderItem,
  getOrders,
  confirmedOrder,
  shipOrder,
  cancelPendingOrder,
  getMyOrderById
} = require("../services/order.service");
const { getOrCreate, getCartItems } = require("../services/cart.service");
const { fetchUserShop } = require("../services/shop.service");

const orderForm = async (req, res) => {
  const id = req.user.id;
  const {
    user_name,
    country,
    state,
    city,
    address,
    contact_number,
    total_amount,
  } = req.body;
  // console.log(req.body);
  try {
    const address_id = await formSubmit({
      id,
      user_name,
      country,
      state,
      city,
      address,
      contact_number,
    });
    const order_id = await createOrder(address_id, total_amount, id);
    const cart = await getOrCreate(id);
    const cart_items = await getCartItems(cart.id);
    //  console.log(cart_items);
    const order_items = await createOrderItem(cart_items, order_id);
    res.status(200).json({
      message: "order successfully",
      order_items,
      order_id,
    });
  } catch (err) {
    console.log("err in orderForm", err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const user_id = req.user.id;
    const shop = await fetchUserShop({ user_id });
    if (!shop) {
      return res.status(404).json({
        message: "you don't have shop",
      });
    }
    const shop_id = shop.id;
    const result = await getOrders(shop_id);
    res.status(200).json({
      message: "orders fetch successfully",
      orders: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      message: err.message,
    });
  }
};

const confirmPendingOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }
    const order = await confirmedOrder(id);
    res.status(200).json({
      success: true,
      message: "order confirmed successfully",
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};


const shipConfirmedOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await shipOrder(id);

    return res.status(200).json({
      success: true,
      message: "Order shipped successfully",
      order,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order id",
      });
    }

    const order = await cancelPendingOrder(id);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
};

const getMyOrder = async(req,res)=>{

    try{

        const orderId=req.params.id;

        const userId=req.user.id;

        const order=await getMyOrderById(orderId,userId);

        if(!order){

            return res.status(404).json({
                success:false,
                message:"order not found"
            })

        }

        res.status(200).json(order);

    }

    catch(err){

        res.status(500).json({
            success:false,
            message:err.message
        })

    }

}

module.exports = { orderForm, getAllOrders, confirmPendingOrder,shipConfirmedOrder,cancelOrder,getMyOrder };
