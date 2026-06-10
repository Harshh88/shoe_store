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
  const newProduct = await pool.query(
    `
        INSERT INTO products(
        user_id,
        shop_id,
        name,
        description,
        price,
        stock,
        size
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
    [user_id, shop_id, data[0], data[1], data[2], data[3], data[4]]
  );
  const productImage = await pool.query(
    `
            INSERT INTO images(url,product_id)
            VALUES($1,$2)
            RETURNING *
            `,
    [data[5], newProduct.rows[0].id],
  );
  const finalProduct = await pool.query(
    `
            UPDATE products
            SET image_id=$1
            WHERE id=$2
            RETURNING *
            `,
    [productImage.rows[0].id,newProduct.rows[0].id],
  );

  return finalProduct.rows[0];
};

const deleteProduct = async (product_id)=>{
  const res = await pool.query(
    `
    DELETE FROM products
    WHERE id=$1
    RETURNING *
    `,
    [product_id]
  )
  return res.rows[0];
}

const editProduct = async (product_id,data)=>{
  const keys = Object.keys(data);
  const setClause = keys.map((key,index) => `${key} = $${index+1}`).join(", ");
  const values = Object.values(data);
  values.push(product_id);

  const query = `UPDATE products SET ${setClause} WHERE id=$${values.length} RETURNING * `

  const result = await pool.query(query,values);
  return result.rows[0];
  
}

module.exports = { fetchAllProducts, addProduct,deleteProduct,editProduct };
