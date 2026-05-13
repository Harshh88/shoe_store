const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users(
          id SERIAL PRIMARY KEY,
          name VARCHAR(30) NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          role VARCHAR(20) DEFAULT 'USER' CHECK(role IN ('USER','ADMIN','SELLER')),
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
  } catch (err) {
    console.log("something error in userModel", err);
  }
};

module.exports = createTable;
