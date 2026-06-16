const { shopQueryMap } = require("../utils/shopQueryBuilder");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const fetchAllShops = async ({ latitude, longitude, limit }) => {
  const lon = parseFloat(longitude);
  const lat = parseFloat(latitude);
  const limitValue = parseInt(limit);

  const validLimit = Number.isInteger(limitValue) && limitValue > 0;
  const validCoords = !isNaN(lon) && !isNaN(lat);

  if ((longitude || latitude) && !validCoords) {
    throw new Error("Invalid coordinates");
  }

  let values = [];
  if (validCoords) {
    values = [lon, lat];
  }

  const key = validCoords ? "withLocation" : "withoutLocation";

  const { query, values: finalValues } = shopQueryMap[key](
    values,
    validLimit,
    limitValue,
  );
  
  const result = await pool.query(query, finalValues);
  return result.rows;
};

const getSingleShop = async ({ shop_id }) => {
  const shop = await pool.query(
    `
        SELECT 
        s.name,
        s.address,
        s.description,
        s.contact_number,
        s.location,
        i.url AS shop_image
        FROM shops s
        JOIN images i ON s.image_id = i.id
        WHERE s.id=$1
        AND i.is_primary = true
        `,
    [shop_id],
  );
  return shop.rows[0];
};

const fetchShopUser = async ({ shop_id }) => {
  const shop = await pool.query(
    `
      SELECT 
      s.id,
      s.user_id,
      u.name AS user_name,
      s.name AS shop_name
      FROM shops s
      JOIN users u ON s.user_id = u.id
      WHERE s.id=$1
      `,
    [shop_id],
  );
  return shop.rows[0];
};

const fetchUserShop = async ({ user_id }) => {
  const result = await pool.query(
    `
        SELECT shops.*,
        i.url AS image_url,
        u.name AS user_name
         FROM shops
        LEFT JOIN images i ON shops.image_id = i.id
        JOIN users u ON shops.user_id = u.id
        WHERE shops.user_id=$1
        `,
    [user_id],
  );
  return result.rows[0];
};

const createShop = async (user_id, data) => {
  try {
    const query = `
          INSERT INTO shops (user_id, name, description, address, contact_number, location)
          VALUES ($1, $2, $3, $4, $5, ST_SetSRID(ST_MakePoint($6, $7), 4326))
          RETURNING *;
    `;

    const values = [
      user_id,
      data.name,
      data.description || null,
      data.address,
      data.contact_number,
      data.longitude ?? 0.0, 
      data.latitude ?? 0.0,  
    ];

    const res = await pool.query(query, values);
    
    if (!res.rows.length) {
      throw new Error("Failed to create shop");
    }

    let finalShop = res.rows[0];

    if (data.image_url) {
      const imageRes = await pool.query(
        `
          INSERT INTO images (url, is_primary, shop_id)
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
        [data.image_url, true, finalShop.id],
      );

      const newImage = imageRes.rows[0];

      const updatedShopRes = await pool.query(
        `
          UPDATE shops 
          SET image_id = $1
          WHERE id = $2
          RETURNING *;
        `,
        [newImage.id, finalShop.id]
      );

      finalShop = updatedShopRes.rows[0];
    }

    const updateUser = await pool.query(
      `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING *
      `,
      ['SELLER', user_id]
    );

    if (!updateUser.rows.length) {
      throw new Error("Failed to update user role to SELLER");
    }

    const payload = {
      id: updateUser.rows[0].id,
      email: updateUser.rows[0].email,
      role: updateUser.rows[0].role
    };
    
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    return { finalShop, token };

  } catch (err) {
    throw err;
  }
};

const deleteShop = async(user_id) => {
  const deletedShop = await pool.query(`
     DELETE FROM shops
     WHERE user_id=$1
     RETURNING *
    `,[user_id]);
    return deletedShop.rows[0];
}

const editShop = async ({ shop_id, data }) => {
  try {
    let updateFields = { ...data };

    if (updateFields.image_url) {
      const imageQuery = await pool.query(
        `
        INSERT INTO images (url, shop_id) 
        VALUES ($1, $2)
        RETURNING *
        `, 
        [updateFields.image_url, shop_id]
      );
      
      updateFields.image_id = imageQuery.rows[0].id;
      delete updateFields.image_url; 
    }

    const keys = Object.keys(updateFields);
    
    if (keys.length === 0) {
      const currentShop = await pool.query(`SELECT * FROM shops WHERE id=$1`, [shop_id]);
      return currentShop.rows[0];
    }

    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");
    const values = Object.values(updateFields);
    values.push(shop_id);

    const query = `UPDATE shops SET ${setClause} WHERE id=$${values.length} RETURNING *`;

    const result = await pool.query(query, values);
    return result.rows[0];

  } catch (err) {
    throw err;
  }
};

module.exports = { fetchAllShops, fetchShopUser, getSingleShop, fetchUserShop, createShop, deleteShop, editShop };
