const express = require("express");
const router = express.Router();
const { addPrediction, getPredictionsByUserId } = require("../controller/controllerPredict");
const authJWT = require("../middleware/authJWT");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder untuk menyimpan file gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nama file unik dengan timestamp
  },
});

const upload = multer({ storage: storage });

// Menambahkan prediksi baru
router.post("/add", authJWT, upload.single("image"), addPrediction);

// Mendapatkan prediksi berdasarkan ID pengguna
router.get("/user-predictions", authJWT, getPredictionsByUserId);

module.exports = router;
