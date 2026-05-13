const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS images(
            id SERIAL PRIMARY KEY,
            url TEXT NOT NULL,

            shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,

            is_primary BOOLEAN DEFAULT FALSE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT check_one_reference
            CHECK(
            (shop_id IS NOT NULL AND product_id IS NULL)
            OR
            (shop_id IS NuLL AND product_id IS NOT NULL)
            )

            )
            `
        )
        console.log("images table created successfully");

        await pool.query(
            `
            CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_product
            ON images (product_id)
            WHERE is_primary = true
            `
        )

        await pool.query(
            `
            CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_shop
            ON images (shop_id)
            WHERE is_primary = true
            `
        )
        console.log("index created successfully");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = createTable;