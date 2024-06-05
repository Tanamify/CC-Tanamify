const express = require("express");
const { register, login, logout, refreshToken } = require("../controller/controllerAuth");
const authJWT = require("../middleware/authJWT");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authJWT, logout);
router.post("/refresh-token", refreshToken);

module.exports = router;