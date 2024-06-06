const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.log("Authorization header missing");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const bearerToken = token.split(" ")[1];
    console.log("Bearer Token:", bearerToken);

    const decoded = jwt.verify(bearerToken, "test123");
    console.log("Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authJWT;
