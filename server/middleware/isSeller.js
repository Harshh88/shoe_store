const isSeller = (req,res,next) => {
    if(req.user.role !== "SELLER"){
        return res.status(403).json({
            message: "only seller can access"
        })
    }
    next();
}

module.exports = isSeller;