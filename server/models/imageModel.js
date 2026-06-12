const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS images(
            id SERIAL PRIMARY KEY,
            url TEXT NOT NULL,
            shop_id INTEGER,
            product_id INTEGER,
            is_primary BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT check_one_reference
            CHECK(
              (shop_id IS NOT NULL AND product_id IS NULL)
              OR
              (shop_id IS NULL AND product_id IS NOT NULL)
            )
            )
            `,
    );

    // Shop FK Constraint with CASCADE
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_images_shop' AND table_name = 'images'
        ) THEN
          ALTER TABLE images ADD CONSTRAINT fk_images_shop 
          FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

    // Product FK Constraint with CASCADE
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_images_product' AND table_name = 'images'
        ) THEN
          ALTER TABLE images ADD CONSTRAINT fk_images_product 
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

    // Partial Unique Indexes for Primary Images
    await pool.query(
      `
            CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_product
            ON images (product_id)
            WHERE is_primary = true
            `,
    );

    await pool.query(
      `
            CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_shop
            ON images (shop_id)
            WHERE is_primary = true
            `,
    );

  } catch (err) {
    console.log("something error in images model", err);
  }
};

module.exports = createTable;