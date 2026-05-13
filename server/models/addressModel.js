const pool = require("../config/db");

const createTable = async() => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS address(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            country VARCHAR(30) NOT NULL,
            state VARCHAR(30) NOT NULL,
            city VARCHAR(30) NOT NULL,
            address VARCHAR(60) NOT NULL,
            contact_number VARCHAR(20) NOT NULL,

            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `
        )
        await pool.query(
            `
            ALTER TABLE address
            ADD COLUMN IF NOT EXISTS user_name VARCHAR(30) DEFAULT 'Unknown' NOT NULL
            `
        )
        console.log("address table created successfully");
    }catch(err){
        console.log("err in address table",err);
    }
}

module.exports = createTable;