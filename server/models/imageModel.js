const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        shop_id INTEGER,
        product_id INTEGER,
        user_id INTEGER,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );

    await pool.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'check_one_reference' AND table_name = 'images'
        ) THEN
          ALTER TABLE images DROP CONSTRAINT check_one_reference;
        END IF;
      END
      $$;
    `);

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'check_one_from_three' AND table_name = 'images'
        ) THEN
          ALTER TABLE images ADD CONSTRAINT check_one_from_three CHECK (
            (shop_id IS NOT NULL AND product_id IS NULL AND user_id IS NULL)
            OR
            (shop_id IS NULL AND product_id IS NOT NULL AND user_id IS NULL)
            OR
            (shop_id IS NULL AND product_id IS NULL AND user_id IS NOT NULL)
          );
        END IF;
      END
      $$;
    `);

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

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_images_user' AND table_name = 'images'
        ) THEN
          ALTER TABLE images ADD CONSTRAINT fk_images_user 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_product
      ON images (product_id)
      WHERE is_primary = true;
    `);

    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_shop
      ON images (shop_id)
      WHERE is_primary = true;
    `);

    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_user
      ON images (user_id)
      WHERE is_primary = true;
    `);

    console.log("Image table and all constraints synchronized successfully!");
  } catch (err) {
    console.error("Something error in images model:", err);
    throw err; 
  }
};

module.exports = createTable;
