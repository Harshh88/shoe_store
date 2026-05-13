const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              shop_id INTEGER NOT NULL,
              status VARCHAR(20) DEFAULT 'pending' CHECK(status IN('pending','confirmed','cancelled','completed')),
              booking_datetime TIMESTAMP NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE
            )`)
            console.log("booking model created successfully");
        
        await pool.query(`CREATE INDEX IF NOT EXISTS idx_shop_datetime
              ON bookings(shop_id,booking_datetime)
            `)        
        await pool.query(`
             CREATE INDEX IF NOT EXISTS idx_unique_booking
             ON bookings(user_id,shop_id,booking_datetime)
             WHERE status != 'cancelled';
            `)    
    }
    catch(err){
        if(err.code  === "23505"){
            return res.status(400).json({
                message: "You already have booking at this time for this shop"
            })
        }
        console.log("something is error in booking model",err);
    }
}

module.exports = createTable;