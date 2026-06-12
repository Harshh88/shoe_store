const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS bookings(
              id SERIAL PRIMARY KEY,
              user_id INTEGER NOT NULL,
              shop_id INTEGER NOT NULL,
              status VARCHAR(20) DEFAULT 'pending' CHECK(status IN('pending','confirmed','cancelled','completed')),
              booking_datetime TIMESTAMP NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`,
    );

    await pool.query(`
      DO $$
      BEGIN
        -- User Foreign Key Constraint with CASCADE
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_bookings_user' AND table_name = 'bookings'
        ) THEN
          ALTER TABLE bookings ADD CONSTRAINT fk_bookings_user 
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        END IF;

        -- Shop Foreign Key Constraint with CASCADE
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_bookings_shop' AND table_name = 'bookings'
        ) THEN
          ALTER TABLE bookings ADD CONSTRAINT fk_bookings_shop 
          FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

    // Performance Index for shop lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_shop_datetime
      ON bookings(shop_id, booking_datetime);
    `);        

    // Prevent duplicate active bookings for same user at same time
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_unique_booking
      ON bookings(user_id, shop_id, booking_datetime)
      WHERE status != 'cancelled';
    `);    

  } catch (err) {
    console.log("something error in booking model initialization:", err);
  }
};

module.exports = createTable;