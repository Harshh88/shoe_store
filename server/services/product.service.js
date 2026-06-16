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
    // 1. Pehle product insert karo (image_id abhi null rahega)
    const newProduct = await pool.query(
      `
      INSERT INTO products(user_id, shop_id, name, description, price, stock, size)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [user_id, shop_id, data.name, data.description, data.price, data.stock, data.size]
    );

    let product = newProduct.rows[0];

    // 2. Agar productImage aayi hai toh images table me daalo
    if (data.productImage) {
      const newImage = await pool.query(
        `
        INSERT INTO images(url, product_id, is_primary)
        VALUES($1, $2, TRUE)
        RETURNING id, url
        `,
        [data.productImage, product.id]
      );

      const imageId = newImage.rows[0].id;
      const imageUrl = newImage.rows[0].url;

      // 3. 🔥 MAIN FIX: Wapas product table me jao aur image_id link karo
      const updatedProduct = await pool.query(
        `
        UPDATE products 
        SET image_id = $1 
        WHERE id = $2 
        RETURNING *
        `,
        [imageId, product.id]
      );

      product = updatedProduct.rows[0];
      
      // Frontend ki safety ke liye dono fields append kar do taaki image kabhie na fte
      product.url = imageUrl;
      product.image_url = imageUrl;
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
