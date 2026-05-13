const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS products(
               id SERIAL PRIMARY KEY,
               shop_id INTEGER NOT NULL,
               user_id INTEGER NOT NULL,
               name VARCHAR(50) NOT NULL,
               description VARCHAR(300) NOT NULL,
               image TEXT[],
               price INTEGER NOT NULL,
               stock INTEGER NOT NULL,
               size INTEGER NOT NULL,
               FOREIGN KEY (shop_id) REFERENCES shops(id),
               FOREIGN KEY (user_id) REFERENCES users(id)
            )`,
    );
    console.log("product model created successfully");
    await pool.query(`
  ALTER TABLE products
  DROP COLUMN IF EXISTS image
`);

    await pool.query(`
  ALTER TABLE products
  ADD COLUMN IF NOT EXISTS image_id INTEGER
`);

    await pool.query(`
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'fk_product_image'
    AND table_name = 'products'
  ) THEN 
    ALTER TABLE products
    ADD CONSTRAINT fk_product_image
    FOREIGN KEY (image_id)
    REFERENCES images(id)
    ON DELETE SET NULL;
  END IF;
END
$$;
`);
  } catch (err) {
    console.log("something error in product model", err);
  }
};

module.exports = createTable;
