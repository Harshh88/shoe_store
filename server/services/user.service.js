const pool = require("../config/db");

const getUserProfile = async (userId) => {
  const query = `
    SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at, img.url 
    FROM users u
    LEFT JOIN images img ON u.image_id = img.id
    WHERE u.id = $1
  `;
  const result = await pool.query(query, [userId]);
  return result.rows[0];
};

const insertImageRecord = async (url, userId) => {
  const query = `
    INSERT INTO images (url, user_id) 
    VALUES ($1, $2) 
    RETURNING id
  `;
  const result = await pool.query(query, [url, userId]);
  return result.rows[0].id;
};

const updateUserData = async (userId, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  if (data.name !== undefined) { fields.push(`name = $${idx++}`); values.push(data.name); }
  if (data.email !== undefined) { fields.push(`email = $${idx++}`); values.push(data.email); }
  if (data.phone !== undefined) { fields.push(`phone = $${idx++}`); values.push(data.phone); }
  if (data.password !== undefined) { fields.push(`password = $${idx++}`); values.push(data.password); }
  if (data.image_id !== undefined) { fields.push(`image_id = $${idx++}`); values.push(data.image_id); }

  if (fields.length === 0) return null;

  values.push(userId);
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { getUserProfile, insertImageRecord, updateUserData };
