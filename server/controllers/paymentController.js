const {createPaymentOrder,verifyPayment} = require("../services/payment.service");

const createPayment = async(req,res) => {
    const {amount} = req.body;
    try{
        const result = await createPaymentOrder(amount);
        res.status(200).json({
            result
        })
    }
    catch(err){
        console.log("err in create Payment",err);
    }
}

const paymentVerify = async(req,res) => {
    const {razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,} = req.body;
    try{
        const result = await verifyPayment({razorpay_order_id,razorpay_payment_id,razorpay_signature});
        res.status(200).json(result);
    }catch(err){
        return res.status(err.status || 500).json({
            message: err.message
        })
    }

    // update ordermodel payment status and status confirm
    // update cartmodel status to ordered
    // store payment order id into ordermodel 
}

module.exports = {createPayment,paymentVerify};