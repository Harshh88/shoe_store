const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(`CREATE EXTENSION IF NOT EXISTS postgis;`);
    
    await pool.query(
      `CREATE TABLE IF NOT EXISTS shops(
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              name VARCHAR(50) NOT NULL,
              address VARCHAR(200) NOT NULL,
              contact_number VARCHAR(15) NOT NULL
            )`,
    );
    
    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'fk_shop_user_key'
        ) THEN
          ALTER TABLE shops
          ADD CONSTRAINT fk_shop_user_key
          FOREIGN KEY (user_id)
          REFERENCES users(id)
          ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

    await pool.query(
      `ALTER TABLE shops
       ADD COLUMN IF NOT EXISTS location GEOGRAPHY(Point,4326)`
    );

    await pool.query(
      `CREATE INDEX IF NOT EXISTS idx_shops_location
       ON shops USING GIST(location)`
    );

    await pool.query(
      `ALTER TABLE shops 
       ADD COLUMN IF NOT EXISTS image_id INTEGER`
    );

    await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints 
          WHERE constraint_name = 'fk_image_key'
        ) THEN
          ALTER TABLE shops
          ADD CONSTRAINT fk_image_key
          FOREIGN KEY (image_id)
          REFERENCES images(id)
          ON DELETE SET NULL;
        END IF;
      END
      $$;
    `);

    await pool.query(
      `ALTER TABLE shops
       ADD COLUMN IF NOT EXISTS description VARCHAR(500)`
    );

  } catch (err) {
    console.log("something is error in shop model", err);
  }
};

module.exports = createTable;