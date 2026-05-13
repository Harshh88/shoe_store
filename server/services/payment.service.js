require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})

const createPaymentOrder = async(amount) => {
    const options = {
        amount: amount * 100,
        currency: "INR"
    }

    const order = await razorpay.orders.create(options);
    return order;
}

const verifyPayment = async(payment) => {
    const body = payment.razorpay_order_id + "|" + payment.razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

    if(expectedSignature === payment.razorpay_signature){
        return{success:true}
    }else{
        throw{message:"unsuccessfull",status:400}
    }
}

module.exports = {createPaymentOrder,verifyPayment};
