const express = require("express");
const router = express.Router();
const { addPrediction, getPredictionsByUserId } = require("../controller/controllerPredict");
const authJWT = require("../middleware/authJWT");

// Menambahkan prediksi baru
router.post("/add", authJWT, addPrediction);

// Mendapatkan prediksi berdasarkan ID pengguna
router.get("/user-predictions", authJWT, getPredictionsByUserId);

module.exports = router;
