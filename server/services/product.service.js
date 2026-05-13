const pool = require("../config/db");
const {productQueryMap} = require("../utils/productQueryBuilder");

const fetchAllProducts = async({shop_id,limit}) =>{
    const limitValue = parseInt(limit);
    const validLimit = !isNaN(limitValue && limitValue > 0);
    let values = [shop_id];

    const key = "productWithoutLimit";

    const {query,values:finalValues} = productQueryMap[key](values,validLimit,limitValue);
    const result = await pool.query(query,finalValues);
    return result.rows;
}

module.exports = {fetchAllProducts};