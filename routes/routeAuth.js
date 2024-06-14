const express = require("express");
const { register, login, logout, refreshToken, checkLogged } = require("../controller/controllerAuth");
const authJWT = require("../middleware/authJWT");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authJWT, logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", checkLogged, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
