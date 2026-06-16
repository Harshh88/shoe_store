require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "https://shoe-store-seven-tau.vercel.app",
    "https://shoe-store-h27r.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        const isAllowed = allowedOrigins.indexOf(origin) !== -1;
        const isVercelPreview = origin.endsWith(".vercel.app") || origin.includes("vercel.app");

        if (isAllowed || isVercelPreview) {
            callback(null, true);
        } else {
            callback(new Error("CORS Policy Violation: Source Node Blocked"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World - Kinetic Engine Online");
});

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

const synchronizeDatabase = async () => {
    try {
        await userModel();
        console.log("User table synchronized successfully");
        
        await imageModel();
        console.log("Image table synchronized successfully");

        await orderModel();
        console.log("Order table synchronized successfully");

        await Promise.all([
            shopModel(),
            productModel(),
            cartModel(),
            bookingModel(),
            addressModel()
        ]);
        console.log("Core tables (Shops, Products, Carts, Bookings, Address) synchronized");

        await Promise.all([
            cart_itemModel(),
            order_item_model()
        ]);
        console.log("Dependent tables (CartItems, OrderItems) synchronized successfully");

    } catch (err) {
        console.log("Database synchronization failed critical error:", err);
    }
};

synchronizeDatabase();

const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", authRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/booking", bookingRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Kinetic backend terminal active on port: ${PORT}`);
});
