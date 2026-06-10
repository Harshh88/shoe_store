require("dotenv").config();
const express = require("express");

const app = express();

const cors = require("cors");
app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Hello World");
})
const userModel = require("./models/userModel");
const shopModel = require("./models/shopModel");
const productModel = require("./models/productModel");
const cartModel = require("./models/cartModel");
const cart_itemModel = require("./models/cart_itemModel");
const bookingModel = require("./models/bookingModel");
const addressModel = require("./models/addressModel");
const orderModel = require("./models/orderModel");
const order_item_model = require("./models/order_itemModel");
const imageModel = require("./models/imageModel");



await userModel();
await shopModel();
await productModel();
await cartModel();
await cart_itemModel(); 
await bookingModel();
await addressModel();
await orderModel();
await order_item_model(); 
await imageModel();


const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
// const productRoutes = require("./routes/productRoutes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/",authRoutes);
app.use("/shop",shopRoutes);
app.use("/cart",cartRoutes);
app.use("/booking",bookingRoutes);
app.use("/order",orderRoutes);
app.use("/payment",paymentRoutes);
app.use("/product",productRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})