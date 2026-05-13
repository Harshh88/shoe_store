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
        FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

        UNIQUE (cart_id, product_id)
        )
        `,
    );
    console.log("cart_item table created successfully");
  } catch (err) {
    console.log("something is error in cart_item Model", err);
  }
};

module.exports = createTable;