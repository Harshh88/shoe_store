const pool = require("../config/db");
const { productQueryMap } = require("../utils/productQueryBuilder");

const fetchAllProducts = async ({ shop_id, limit }) => {
  const limitValue = parseInt(limit);
  const validLimit = !isNaN(limitValue) && limitValue > 0;
  let values = [shop_id];

  const key = "productWithoutLimit";

  const { query, values: finalValues } = productQueryMap[key](
    values,
    validLimit,
    limitValue,
  );
  const result = await pool.query(query, finalValues);
  return result.rows;
};

const addProduct = async ({ user_id, shop_id, data }) => {
  try {
    const newProduct = await pool.query(
      `
      INSERT INTO products(user_id, shop_id, name, description, price, stock, size)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [user_id, shop_id, data.name, data.description, data.price, data.stock, data.size]
    );

    const product = newProduct.rows[0];

    // Agar image aayi hai toh use save karo aur return object me bind karo
    if (data.productImage) {
      await pool.query(
        `
        INSERT INTO images(url, product_id, is_primary)
        VALUES($1, $2, TRUE)
        `,
        [data.productImage, product.id]
      );
      
      // Object me image path append kar diya
      product.image_url = data.productImage;
    }

    return product;
  } catch (err) {
    throw err;
  }
};

const deleteProduct = async (product_id) => {
  const res = await pool.query(
    `
    DELETE FROM products
    WHERE id=$1
    RETURNING *
    `,
    [product_id]
  );
  return res.rows[0];
};

const editProduct = async (product_id, data) => {
  const keys = Object.keys(data);
  if (keys.length === 0) {
    const currentProduct = await pool.query(`SELECT * FROM products WHERE id=$1`, [product_id]);
    return currentProduct.rows[0];
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
  const values = Object.values(data);
  values.push(product_id);

  const query = `UPDATE products SET ${setClause} WHERE id=$${values.length} RETURNING *`;

  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { fetchAllProducts, addProduct, deleteProduct, editProduct };