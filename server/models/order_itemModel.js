const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
            CREATE TABLE IF NOT EXISTS order_items(
             id SERIAL PRIMARY KEY,
             order_id INTEGER NOT NULL,
             product_id INTEGER,
             shop_id INTEGER NOT NULL,
             quantity INTEGER NOT NULL,
             price NUMERIC(10,2)
            )
            `,
    );

    await pool.query(`
      ALTER TABLE order_items ALTER COLUMN product_id DROP NOT NULL;
    `);

    await pool.query(`
      ALTER TABLE order_items DROP CONSTRAINT IF EXISTS fk_order_items_product;
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_product 
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL;
    `);

    await pool.query(`
      ALTER TABLE order_items DROP CONSTRAINT IF EXISTS fk_order_items_order;
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_order 
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;
    `);

    await pool.query(`
      ALTER TABLE order_items DROP CONSTRAINT IF EXISTS fk_order_items_shop;
      ALTER TABLE order_items 
      ADD CONSTRAINT fk_order_items_shop 
      FOREIGN KEY (shop_id) REFERENCES shops(id) ON DELETE CASCADE;
    `);

  } catch (err) {
    console.log("err in order_item model", err);
  }
};

module.exports = createTable;
