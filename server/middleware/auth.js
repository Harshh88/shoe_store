const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header invalid",
    });
  }

  const token = authHeader.split(" ")[1];
  if(!token){
    return res.status(401).json({
        message: "token missing"
    })
  }
  try {
    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT verify error",err);
    return res.status(401).json({
        message: "Invalid token"
    })
  }
};

module.exports = auth;
