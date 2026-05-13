const pool = require("../config/db");

const formSubmit = async(user) => {
    const{id,user_name,country,state,city,address,contact_number} = user;
    const result = await pool.query(
        `
        INSERT INTO address(
        user_id,user_name,country,state,city,address,contact_number
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
        [id,user_name,country,state,city,address,contact_number]
    )
    return result.rows[0].id;
}

const createOrder = async(address_id,totalAmount,id) => {
    const result = await pool.query(
        `
        INSERT INTO orders(
        address_id,total_amount,user_id
        )
        VALUES($1,$2,$3)
        RETURNING *
        `,
        [address_id,totalAmount,id]
    )
    return result.rows[0].id;
}

const createOrderItem = async(cart_items,order_id) => {
    let idArr = [];
    for(const item of cart_items){
        const result = await pool.query(
            `
            INSERT INTO order_items(
            order_id,product_id,shop_id,quantity,price
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
            `,[order_id,item.product_id,item.shop_id,item.quantity,item.product_price]
        )
        idArr.push(result.rows[0]);
    }
    return idArr;
}

module.exports = {formSubmit,createOrder,createOrderItem};