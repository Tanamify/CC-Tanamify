const verifySignUp = require("../middleware/verifySignUp");
const authJwt = require("../middleware/authJWT");

module.exports = { verifySignUp, authJwt };
