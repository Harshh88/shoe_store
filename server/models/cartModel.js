const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS cart(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            status VARCHAR(20) DEFAULT 'active' CHECK(status IN('active','ordered')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
            )
            `
        )
        console.log("cart table created successfully");
    }
    catch(err){
        console.log("something is error in cart model",err);
    }
}

module.exports = createTable;