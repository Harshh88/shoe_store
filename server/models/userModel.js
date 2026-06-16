const pool = require("../config/db");

const createTable = async () => {
  try {
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(20) DEFAULT 'USER' CHECK(role IN ('USER','ADMIN','SELLER')),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  
    `);

    
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS image_id INTEGER
    `);

    
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_image_key' AND table_name = 'users'
        ) THEN 
          ALTER TABLE users
          ADD CONSTRAINT fk_image_key
          FOREIGN KEY (image_id)
          REFERENCES images(id)
          ON DELETE SET NULL; 
        END IF; 
      END
      $$;
    `);

    console.log("User table and constraints synchronized successfully!");

  } catch (err) {
    console.log("something error in userModel", err);
    throw err; 
  }
};


module.exports = { createTable };
