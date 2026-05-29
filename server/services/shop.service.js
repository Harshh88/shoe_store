const {shopQueryMap} = require("../utils/shopQueryBuilder");
const pool = require("../config/db");

const fetchAllShops = async ({latitude,longitude,limit}) => {
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const limitValue = parseInt(limit);
    
    const validLimit = Number.isInteger(limitValue) && limitValue > 0;
    const validCoords = !isNaN(lon) && !isNaN(lat);

    if((longitude || latitude) && !validCoords){
        throw new Error("Invalid coordinates");
    }

    let values = [];
    if(validCoords){
        values =[lon,lat]
    }

    const key = validCoords ? "withLocation" : "withoutLocation";

    const{query, values: finalValues} = shopQueryMap[key](values,validLimit,limitValue);
    // console.log("KEY:", key);
    // console.log("FUNC:", shopQueryMap[key]);
    const result = await pool.query(query,finalValues);
    return result.rows;
}

const getSingleShop = async({shop_id}) => {
    const shop = await pool.query(`
        SELECT 
        s.name,
        s.address,
        s.description,
        i.url AS shop_image
        FROM shops s
        JOIN images i ON s.image_id = i.id
        WHERE s.id=$1
        AND i.is_primary = true
        `,[shop_id])
        return shop;
}

const fetchShopUser = async({shop_id}) => {
    const shop = await pool.query(`
      SELECT 
      s.id,
      s.user_id,
      u.name AS user_name,
      s.name AS shop_name
      FROM shops s
      JOIN users u ON s.user_id = u.id
      WHERE s.id=$1
      `,[shop_id])
      return shop.rows[0];
}

const fetchUserShop = async({user_id}) => {
    const result = await pool.query(`
        SELECT s.id FROM shops s WHERE user_id=$1
        `,[user_id])
        return result.rows[0]
}

module.exports = {fetchAllShops,fetchShopUser,getSingleShop,fetchUserShop};