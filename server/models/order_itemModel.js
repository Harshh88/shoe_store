const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS order_items(
             id SERIAL PRIMARY KEY,
             order_id INTEGER NOT NULL,
             product_id INTEGER NOT NULL,
             shop_id INTEGER NOT NULL,
             quantity INTEGER NOT NULL,
             price NUMERIC(10,2),

             FOREIGN KEY (order_id) REFERENCES orders(id),
             FOREIGN KEY (product_id) REFERENCES products(id),
             FOREIGN KEY (shop_id) REFERENCES shops(id)
            )
            `
        )  
        console.log("order_item model created successfully");
    }
    catch(err){
        console.log("err in order_item model",err);
    }
}

module.exports = createTable;