const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS order_items(
             id SERIAL PRIMARY KEY,
             order_id INTEGER NOT NULL,
             product_id INTEGER NOT NULL,
             shop_id INTEGER NOT NULL,
             quantity INTEGER NOT NULL,
             price NUMERIC(10,2)
            )
            `,
    );

    await pool.query(`
      DO $$
      BEGIN
        -- Order Foreign Key Check & Apply
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_order_items_order' AND table_name = 'order_items'
        ) THEN
          ALTER TABLE order_items ADD CONSTRAINT fk_order_items_order 
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
        END IF;

        -- Product Foreign Key Check & Apply
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_order_items_product' AND table_name = 'order_items'
        ) THEN
          ALTER TABLE order_items ADD CONSTRAINT fk_order_items_product 
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
        END IF;

        -- Shop Foreign Key Check & Apply
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_order_items_shop' AND table_name = 'order_items'
        ) THEN
          ALTER TABLE order_items ADD CONSTRAINT fk_order_items_shop 
          FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

  } catch (err) {
    console.log("err in order_item model", err);
  }
};

module.exports = createTable;
