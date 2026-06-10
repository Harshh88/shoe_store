const pool = require("../config/db");

const formSubmit = async (user) => {
  const { id, user_name, country, state, city, address, contact_number } = user;
  const result = await pool.query(
    `
        INSERT INTO address(
        user_id,user_name,country,state,city,address,contact_number
        )
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
    [id, user_name, country, state, city, address, contact_number],
  );
  return result.rows[0].id;
};

const createOrder = async (address_id, totalAmount, id) => {
  const result = await pool.query(
    `
        INSERT INTO orders(
        address_id,total_amount,user_id
        )
        VALUES($1,$2,$3)
        RETURNING *
        `,
    [address_id, totalAmount, id],
  );
  return result.rows[0].id;
};

const createOrderItem = async (cart_items, order_id) => {
  let idArr = [];
  for (const item of cart_items) {
    const result = await pool.query(
      `
            INSERT INTO order_items(
            order_id,product_id,shop_id,quantity,price
            )
            VALUES($1,$2,$3,$4,$5)
            RETURNING *
            `,
      [
        order_id,
        item.product_id,
        item.shop_id,
        item.quantity,
        item.product_price,
      ],
    );
    idArr.push(result.rows[0]);
  }
  return idArr;
};

const getOrders = async (shop_id) => {
  const result = await pool.query(
    `SELECT o.id,
        o.status,
        o.total_amount,
        u.name AS customer,
        JSON_AGG(
         JSON_BUILD_OBJECT(
          'product_id',p.id,
          'product_name',p.name,
          'product_image_url',i.url
         )
        ) AS items
        
        FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        JOIN images i ON p.image_id = i.id
        WHERE oi.shop_id=$1
        GROUP BY o.id,o.status,o.total_amount,u.name
        `,
    [shop_id],
  );
  // console.log(result.rows);
  return result.rows;
};

const confirmedOrder = async (id) => {
  const booking = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
  if (booking.rows.length === 0) {
    const err = new Error("booking not found");
    err.status = 404;
    throw err;
  }
  if (booking.rows[0].status !== "pending") {
    const err = new Error("booking status is not pending");
    err.status = 409;
    throw err;
  }
  const res = await pool.query(
    `
        UPDATE orders
        SET status='confirmed'
        WHERE id=$1 AND status='pending'
        RETURNING *
        `,
    [id],
  );

  if (res.rowCount === 0) {
    const err = new Error("order is not found or order is already confirmed");
    err.status = 409;
    throw err;
  }
  return res.rows[0];
};

const shipOrder = async (id) => {
  const order = await pool.query(
    `SELECT * FROM orders WHERE id=$1`,
    [id]
  );

  if (order.rows.length === 0) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  if (order.rows[0].status !== "confirmed") {
    const err = new Error("Order status is not confirmed");
    err.status = 409;
    throw err;
  }

  const result = await pool.query(
    `
    UPDATE orders
    SET status='shipped'
    WHERE id=$1 AND status='confirmed'
    RETURNING *
    `,
    [id]
  );

  if (result.rowCount === 0) {
    const err = new Error("Order shipping failed");
    err.status = 409;
    throw err;
  }

  return result.rows[0];
};

const cancelPendingOrder = async (id) => {
  const order = await pool.query(
    `SELECT * FROM orders WHERE id=$1`,
    [id]
  );

  if (order.rows.length === 0) {
    const err = new Error("Order not found");
    err.status = 404;
    throw err;
  }

  if (order.rows[0].status !== "pending") {
    const err = new Error("Only pending orders can be cancelled");
    err.status = 409;
    throw err;
  }

  const result = await pool.query(
    `
    UPDATE orders
    SET status='cancelled'
    WHERE id=$1 AND status='pending'
    RETURNING *
    `,
    [id]
  );

  if (result.rowCount === 0) {
    const err = new Error("Order cancellation failed");
    err.status = 409;
    throw err;
  }

  return result.rows[0];
};



const getMyOrderById = async (orderId, userId) => {
  const result = await pool.query(
    `
    SELECT
      o.id,
      o.status,
      o.total_amount,
      a.user_name AS customer,
      a.address,
      a.city,
      a.state,
      a.country,
      a.contact_number,

      JSON_AGG(
        JSON_BUILD_OBJECT(
          'product_id',p.id,
          'product_name',p.name,
          'product_image_url',i.url,
          'price',oi.price,
          'quantity',oi.quantity
        )
      ) AS items

    FROM orders o

    JOIN address a
      ON o.address_id=a.id

    JOIN order_items oi
      ON oi.order_id=o.id

    JOIN products p
      ON p.id=oi.product_id

    JOIN images i
      ON i.id=p.image_id

    WHERE o.id=$1
    AND o.user_id=$2

    GROUP BY
      o.id,
      o.status,
      o.total_amount,
      a.user_name,
      a.address,
      a.city,
      a.state,
      a.country,
      a.contact_number
    `,
    [orderId, userId]
  );

  return result.rows[0];
};

module.exports = {
  formSubmit,
  createOrder,
  createOrderItem,
  getOrders,
  confirmedOrder,
  shipOrder,
  cancelPendingOrder,
  getMyOrderById
};
