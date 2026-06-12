const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS address(
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            country VARCHAR(30) NOT NULL,
            state VARCHAR(30) NOT NULL,
            city VARCHAR(30) NOT NULL,
            address VARCHAR(60) NOT NULL,
            contact_number VARCHAR(20) NOT NULL
            )
            `,
    );

    await pool.query(
      `
            ALTER TABLE address
            ADD COLUMN IF NOT EXISTS user_name VARCHAR(30) DEFAULT 'Unknown' NOT NULL
            `,
    );

    // User Foreign Key Constraint with CASCADE
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_address_user' AND table_name = 'address'
        ) THEN
          ALTER TABLE address ADD CONSTRAINT fk_address_user 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

  } catch (err) {
    console.log("err in address table initialization", err);
  }
};

module.exports = createTable;