const pool = require("../config/db");

const createTable = async () => {
  try {
    // 1. Table agar nahi hai toh banegi
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

    // 🔥 CRITICAL FIX FOR PRODUCTION:
    // Agar production par images table pehle se bani hai par user_id nahi hai, toh ye column add kar dega
    await pool.query(`
      ALTER TABLE images ADD COLUMN IF NOT EXISTS user_id INTEGER;
    `);

    // 2. Purani reference constraint drop karna
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

    // 3. New Check Constraint (Shop OR Product OR User)
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

    // 4. FK for Shop
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

    // 5. FK for Product
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

    // 6. FK for User
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

    // 7. Unique Indexes for Is Primary
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
