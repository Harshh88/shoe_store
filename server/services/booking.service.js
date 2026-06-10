const pool = require("../config/db");

const createBooking = async ({ user_id, shop_id, booking_datetime }) => {
  const result = await pool.query(
    `INSERT INTO bookings(user_id,shop_id,booking_datetime)
                                  VALUES($1,$2,$3)
                                  RETURNING *
        `,
    [user_id, shop_id, booking_datetime],
  );
  return result.rows[0];
};

const getBookings = async(seller_id) => {
   
   const shop = await pool.query(`SELECT id FROM shops WHERE user_id=$1`,[seller_id]);
   if(shop.rows.length === 0){
      throw {message: "you dont have any shop",status:404}
   }
   const shop_id = shop.rows[0].id;
   const shopAllBookings = await pool.query(
      `
      SELECT bookings.id,
      bookings.user_id,
      bookings.status,
      customer.name,
      customer.email,
      bookings.booking_datetime FROM bookings
      JOIN users customer ON bookings.user_id = customer.id
      WHERE shop_id=$1
      `,[shop_id]
   );
   return shopAllBookings.rows;
}


const confirmBooking = async(id) => {
  const booking = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,[id]
  )
  if(booking.rows.length === 0){
    const err = new Error("booking not found");
    err.status = 404;
    throw err;
  }
  if(booking.rows[0].status !== "pending"){
    const err = new Error("booking is not pending")
    err.status = 409;
    throw err;
  }
  const res = await pool.query(
    `
    UPDATE bookings
    SET status='confirmed'
    WHERE id=$1 AND status='pending'
    RETURNING *
    `,
    [id]
  )
  if(res.rowCount === 0){
    const err = new Error( "booking is not found or booking already confirmed");
    err.status = 404;
    throw err;
  }
  return res.rows[0];
}

const completeBooking = async(id) => {
  const booking = await pool.query(
    `SELECT * FROM bookings WHERE id=$1`,[id]
  )
  if(booking.rows.length === 0){
    const err = new Error("booking not found");
    err.status = 404;
    throw err;
  }
  if(booking.rows[0].status !== "confirmed"){
    const err = new Error("booking is not confirmed first confirm then update");
    err.status = 409;
    throw err;
  }
  const res = await pool.query(
    `
    UPDATE bookings
    SET status='completed'
    WHERE id=$1 AND status='confirmed'
    RETURNING *
    `,
    [id]
  )
  if(res.rowCount === 0){
    const err =  new Error("booking is not found or booking already completed");
    err.status = 409;
    throw err;
  }
  return res.rows[0];
}

const cancelBooking = async(id) => {
  const booking = await pool.query(`SELECT * FROM bookings WHERE id=$1`,[id]);
  if(booking.rows.length === 0){
    const err = new Error("booking not found");
    err.status = 404;
    throw err;
  }
  if(booking.rows[0].status !== "pending"){
    const err = new Error("booking is not pending");
    err.status = 409;
    throw err;
  }
  const res = await pool.query(
    `
    UPDATE bookings
    SET status='cancelled'
    WHERE id=$1 AND status='pending'
    RETURNING *
    `,[id]
  )
  if(res.rowCount === 0){
    const err = new Error("booking is not found or booking already cancelled");
    err.status = 409;
    throw err;
  }
  return res.rows[0];
}

module.exports = {createBooking,confirmBooking,completeBooking,getBookings,cancelBooking};
