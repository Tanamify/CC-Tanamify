const express = require("express");
const router = express.Router();
const { addPrediction, getPredictionsByUserId, deletePrediction } = require("../controller/controllerPredict");
const authJWT = require("../middleware/authJWT");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Menambahkan prediksi baru
router.post("/add", authJWT, upload.single("image"), addPrediction);

// Mendapatkan prediksi berdasarkan ID pengguna
router.get("/user-predictions", authJWT, getPredictionsByUserId);

// Delete
router.put("/delete/:idpred", authJWT, deletePrediction);

module.exports = router;
