const pool = require("../config/db");

const getUserProfile = async(user_id) => {
    const existUser = await pool.query(`
        SELECT u.*,
        i.url
        FROM users u 
        LEFT JOIN images i ON u.image_id = i.id
        WHERE u.id=$1
        `,[user_id]);
    if(existUser.rows.length === 0){
        const err = new Error("user not exist");
        err.status = 404;
        return err;
    }
    return existUser.rows[0];
}

module.exports = {getUserProfile};
