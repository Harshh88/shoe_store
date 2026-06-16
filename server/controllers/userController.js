const {getUserProfile} = require("../services/user.service");

const getOneUser = async(req,res) => {
    try{
        const user_id = req.user.id;
        const user = await getUserProfile(user_id);
        console.log(user);
        return res.status(200).json({
            success: true,
            user: user,
            message: "user fetch successfully"
        })
    } catch(err){
        return res.status(err.status || 500).json({
            message: err.message
        })
    }
}

module.exports = {getOneUser};