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
  // console.log("KEY:", key);
  // console.log("FUNC:", shopQueryMap[key]);
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
  return shop;
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

  // console.log(updateUser);
  const payload = {
    id: updateUser.rows[0].id,
    email: updateUser.rows[0].email,
    role: updateUser.rows[0].role
  }
  
  const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: "1d"});

  return {finalShop,token};
};

const deleteShop = async(user_id) => {
  const deletedShop = await pool.query(`
     DELETE FROM shops
     WHERE user_id=$1
     RETURNING *
    `,[user_id]);
    // if(deleteShop.rows.length === 0){
    //   throw new Error("You don't have any shop to delete");
    // }
    return deleteShop.rows[0];
}

const editShop = async ({ shop_id, data }) => {
  let result;
  if (data[4]) {
    const imageQuery = await pool.query(
      `
      INSERT INTO images (url, shop_id) 
      VALUES ($1, $2)
      RETURNING *
      `, 
      [data[4], shop_id]
    );
    
    const new_image_id = imageQuery.rows[0].id;
    
    result = await pool.query(
      `
      UPDATE shops
      SET
        name = $1,
        description = $2,
        contact_number = $3,
        address = $4,
        image_id = $5
      WHERE id = $6
      RETURNING *;
      `,
      [data[0], data[1], data[2], data[3], new_image_id, shop_id]
    );
  } else {
    result = await pool.query(
      `
      UPDATE shops
      SET
        name = $1,
        description = $2,
        contact_number = $3,
        address = $4
      WHERE id = $5
      RETURNING *;
      `,
      [data[0], data[1], data[2], data[3], shop_id]
    );
  }

  return result.rows[0];
};



module.exports = { fetchAllShops, fetchShopUser, getSingleShop, fetchUserShop,createShop,deleteShop,editShop };
