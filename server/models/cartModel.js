const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS cart(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            status VARCHAR(20) DEFAULT 'active' CHECK(status IN('active','ordered')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            `,
    );

    // User Foreign Key Constraint with CASCADE
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_cart_user' AND table_name = 'cart'
        ) THEN
          ALTER TABLE cart ADD CONSTRAINT fk_cart_user 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

  } catch (err) {
    console.log("something is error in cart model", err);
  }
};

module.exports = createTable;