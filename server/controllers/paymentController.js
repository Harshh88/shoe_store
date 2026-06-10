const { createPaymentOrder, verifyPayment } = require("../services/payment.service");
const pool = require("../config/db"); // DB pool import karo updates ke liye

const createPayment = async (req, res) => {
  const { amount } = req.body;
  console.log("Frontend amount =", amount);

  try {
    const result = await createPaymentOrder(amount);
    return res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_API_KEY,
      result
    });
  } catch (err) {
    console.log("Error in createPayment controller:", err);
    return res.status(500).json({
      success: false,
      message: "Razorpay order creation failed"
    });
  }
};

const paymentVerify = async (req, res) => {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature, 
    orderId 
  } = req.body;

  try {
    const result = await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
    
    if (result.success) {
      await pool.query(
        `UPDATE orders 
         SET status = 'CONFIRMED', 
             payment_status = 'PAID', 
             transaction_id = $1 
         WHERE id = $2`,
        [razorpay_payment_id, orderId]
      );

      const userOrderCheck = await pool.query(`SELECT user_id FROM orders WHERE id = $1`, [orderId]);
      if (userOrderCheck.rows.length > 0) {
        const userId = userOrderCheck.rows[0].user_id;
        
        await pool.query(
          `DELETE FROM cart_items 
           WHERE cart_id = (SELECT id FROM carts WHERE user_id = $1)`,
          [userId]
        );
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified and order finalized smoothly."
      });
    }
  } catch (err) {
    console.log("Verification sequence rejected:", err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.message || "Payment verification failed"
    });
  }
};

module.exports = { createPayment, paymentVerify };