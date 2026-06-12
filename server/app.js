require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ==========================================
// CORS CONSOLE SPECIFICATION NODE
// ==========================================
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
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("CORS Policy Violation: Source Node Blocked"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ==========================================
// CORE GLOBAL MIDDLEWARES
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World - Kinetic Engine Online");
});

// ==========================================
// DB MODELS SYSTEM INVOCATION
// ==========================================
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

userModel().then(() => console.log("User table synchronized successfully")).catch(err => console.log("User table err", err));
shopModel().then(() => console.log("Shop table synchronized successfully")).catch(err => console.log("Shop table err", err));
productModel().then(() => console.log("Product table synchronized successfully")).catch(err => console.log("Product table err", err));
cartModel().then(() => console.log("Cart table synchronized successfully")).catch(err => console.log("Cart table err", err));
cart_itemModel().then(() => console.log("CartItem table synchronized successfully")).catch(err => console.log("CartItem table err", err)); 
bookingModel().then(() => console.log("Booking table synchronized successfully")).catch(err => console.log("Booking table err", err));
addressModel().then(() => console.log("Address table synchronized successfully")).catch(err => console.log("Address table err", err));
orderModel().then(() => console.log("Order table synchronized successfully")).catch(err => console.log("Order table err", err));
order_item_model().then(() => console.log("OrderItem table synchronized successfully")).catch(err => console.log("OrderItem table err", err)); 
imageModel().then(() => console.log("Image table synchronized successfully")).catch(err => console.log("Image table err", err));

<<<<<<< HEAD
// ==========================================
// ECOSYSTEM GATEWAY ROUTING PIPELINES
// ==========================================
=======

userModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
shopModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
productModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
cartModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
cart_itemModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
}); 
bookingModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
addressModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
orderModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});
order_item_model().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
}); 
imageModel().then(()=>{
    console.log("table created successfully");
}).catch((err)=>{
    console.log("table err",err)
});


>>>>>>> 742b9c30d3a9a3672e0e825abce5adfdbcfd434e
const authRoutes = require("./routes/authRoutes");
const shopRoutes = require("./routes/shopRoutes");
const cartRoutes = require("./routes/cartRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/", authRoutes);
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/booking", bookingRoutes);
app.use("/order", orderRoutes);
app.use("/payment", paymentRoutes);
app.use("/product", productRoutes);

// ==========================================
// LISTENING INTERFACE CONNECTION NODE
// ==========================================
const PORT = process.env.PORT || 3000;
<<<<<<< HEAD
app.listen(PORT, () => {
    console.log(`Kinetic backend terminal active on port: ${PORT}`);
});
=======
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`);
})
>>>>>>> 742b9c30d3a9a3672e0e825abce5adfdbcfd434e
