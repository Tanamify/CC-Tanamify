const express = require("express");
const { store } = require("../controller/historyController");

const router = express.Router();

// Middleware untuk mengizinkan parsing JSON dari body permintaan
router.use(express.json());

// Rute untuk menyimpan prediksi
router.post("/store", store);

module.exports = router;
