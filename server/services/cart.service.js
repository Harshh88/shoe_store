const pool = require("../config/db");
const getOrCreate = async(userId) => {
    const existCart = await pool.query(`SELECT * FROM cart WHERE user_id=$1 AND status='active' LIMIT 1`,
        [userId]
    )
    if(existCart.rows.length > 0){
        return existCart.rows[0];
    }
    const newCart = await pool.query(`INSERT INTO cart (user_id) VALUES ($1) RETURNING *`,
        [userId]
    )
    return newCart.rows[0];
}

const getCartItems = async(cartId) => {
    const allCartItems = await pool.query(
        `
        SELECT cart_item.id AS cart_item_id,
        cart_item.cart_id,
        cart_item.product_id,
        cart_item.quantity,
        item.name AS product_name,
        item.description AS product_description,
        item.price AS product_price,
        item.size AS product_size,
        item.shop_id,
        i.url,
        shop.id AS shop_id,
        shop.name AS shop_name,
        shop.address AS shop_address,
        shop.contact_number AS shop_contact_number
        FROM cart_item
        JOIN products item ON cart_item.product_id = item.id
        JOIN images i ON item.image_id = i.id
        JOIN shops shop ON item.shop_id = shop.id
        WHERE cart_item.cart_id=$1
        ORDER BY cart_item.id DESC
        `,
        [cartId]
    )
    return allCartItems.rows;
}

const addCart = async(cartId,productId) => {
    const res = await pool.query(
        `
        INSERT INTO cart_item(cart_id,product_id)
        VALUES($1,$2)
        ON CONFLICT (cart_id,product_id)
        DO UPDATE
        SET quantity = cart_item.quantity + 1
        RETURNING *
        `,
        [cartId,productId]
    )
    if(res.rows.length === 0){
        throw{message: "insert failed",status:400}
    }
    return res.rows[0];
}

const deleteCartItem = async(cartItemId,productId) => {
    const result = await pool.query(
        `DELETE FROM cart_item
        WHERE id=$1 AND product_id=$2
        RETURNING *
        `,
        [cartItemId,productId]
    )
    if(result.rows.length === 0){
        throw{message:"item not found ",status:404}
    }
    return result.rows[0];
}

const totalCartItem = async(cartId)=>{
    const result = await pool.query(
        `
        SELECT
        SUM(cart_item.quantity) AS totalquantity,
        SUM(cart_item.quantity * products.price) AS totalprice
        FROM cart_item
        JOIN products ON cart_item.product_id = products.id
        WHERE cart_item.cart_id = $1
        `,
        [cartId]
    )
    if(result.rows.length === 0){
        throw{message:"0 items in cart",status:404}
    }
    return result.rows[0];
}

module.exports = {getOrCreate,getCartItems,addCart,deleteCartItem,totalCartItem};