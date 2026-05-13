const getShopsWithLocation = (values, validLimit, limitValue) => {
  let query;
  try {
    query = `
         SELECT shops.id,
                 shops.user_id,
                 shops.name,
                 shops.address,
                 shops.contact_number,
                 ST_AsTEXT(shops.location) AS location,
                 i.url AS image,
                 ROUND(
                 ST_DISTANCE(
                  shops.location::geography,
                  ST_SetSRID(ST_MAKEPOINT($1,$2),4326)::geography
                 )::numeric,
                 2
                 ) AS distance
                 FROM shops
                 LEFT JOIN images i ON shops.id = i.shop_id
                 AND i.is_primary = true
                 WHERE ST_DWithin(
                  shops.location::geography,
                  ST_SetSRID(ST_MAKEPOINT($1,$2),4326)::geography,
                  5000
                 ) 
                  ORDER BY shops.location <-> ST_SetSRID(ST_MAKEPOINT($1,$2),4326)
    `;
    if (validLimit) {
      values.push(limitValue);
      query += `LIMIT $${values.length}`;
    }
  } catch (err) {
    console.log("error in withlocation query", err);
  }

  return { query, values };
};

const getShopsWithoutLocation = (values, validLimit, limitValue) => {
  let query;
  try {
    query = `SELECT shops.id,
          shops.user_id,
          shops.name,
          shops.address,
          shops.contact_number,
          ST_AsTEXT(shops.location) AS location,
          i.url AS image
          FROM shops
          LEFT JOIN images i ON shops.id = i.shop_id
          `;
    if (validLimit) {
      values.push(limitValue);
      query += `LIMIT $${values.length}`;
    }
  } catch (err) {
    console.log("error in without location query", err);
  }
  return { query, values };
};

const shopQueryMap = {
  withLocation: getShopsWithLocation,
  withoutLocation: getShopsWithoutLocation,
};

module.exports = { shopQueryMap };
