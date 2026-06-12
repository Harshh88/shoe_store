const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(
      `
        CREATE TABLE IF NOT EXISTS cart_item(
        id SERIAL PRIMARY KEY,
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
        UNIQUE (cart_id, product_id)
        )
        `,
    );

    await pool.query(`
      DO $$
      BEGIN
        -- Cart Foreign Key Constraint with CASCADE
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_cart_item_cart' AND table_name = 'cart_item'
        ) THEN
          ALTER TABLE cart_item ADD CONSTRAINT fk_cart_item_cart 
          FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE;
        END IF;

        -- Product Foreign Key Constraint with CASCADE
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.table_constraints
          WHERE constraint_name = 'fk_cart_item_product' AND table_name = 'cart_item'
        ) THEN
          ALTER TABLE cart_item ADD CONSTRAINT fk_cart_item_product 
          FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
        END IF;
      END
      $$;
    `);

  } catch (err) {
    console.log("something is error in cart_item Model", err);
  }
};

module.exports = createTable;