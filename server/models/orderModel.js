const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS orders(
             id SERIAL PRIMARY KEY,
             address_id INTEGER NOT NULL,
             user_id INTEGER NOT NULL,
             status VARCHAR(20) DEFAULT 'pending' CHECK(status IN('pending','confirmed','shipped','delivered','cancelled')),
             payment_status VARCHAR(20) DEFAULT 'pending' CHECK(payment_status IN('pending','paid','failed')),
             total_amount NUMERIC(10,2) NOT NULL,
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
             
             
             FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE,
             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `
        )
        console.log("order model created successfully");
        await pool.query(
            `
            ALTER TABLE orders
            ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(100)
            `
        )
    }
    catch(err){
        console.log("err in order model",err);
    }
}

module.exports = createTable;