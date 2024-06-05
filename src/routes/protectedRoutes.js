const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authJWT");

// Endpoint terproteksi
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "You have access to this route", userId: req.user });
});

module.exports = router;
