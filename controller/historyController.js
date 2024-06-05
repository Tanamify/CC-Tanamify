const express = require("express");
const { Firestore } = require("@google-cloud/firestore");
const crypto = require("crypto");

const router = express.Router();

// Middleware untuk mengizinkan parsing JSON dari body permintaan
router.use(express.json());

// Rute untuk menyimpan prediksi
const store = async (req, res) => {
  try {
    const { image } = req.body; // Anda dapat mengakses data dari body permintaan
    const { model } = req.app.locals; // Jika model disimpan dalam locals, Anda dapat mengaksesnya dari sana

    // Logika prediksi manual (gantilah ini sesuai dengan kebutuhan Anda)
    const label = "Prediction Label"; // Gantilah dengan hasil prediksi yang sebenarnya
    const description = "Prediction Description"; // Gantilah dengan saran prediksi yang sebenarnya
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      description: description,
      createdAt: createdAt,
    };

    const db = new Firestore();
    const predictCollection = db.collection("histories");
    await predictCollection.doc(id).set(data);

    return res.status(201).json({
      status: "success",
      message: "Prediction added successfully",
      data,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return res.status(500).json({ error: "Terjadi kesalahan dalam menyimpan prediksi." });
  }
};

// Rute untuk mendapatkan histori prediksi
// router.get("/predictHistories", async (req, res) => {
//   try {
//     const histories = await retrieveHistories(); // Anda harus mengimport retrieveHistories terlebih dahulu

//     const responseData = {
//       status: "success",
//       data: histories.map((history) => ({
//         id: history.id,
//         history: {
//           result: history.result,
//           createdAt: history.createdAt,
//           suggestion: history.suggestion,
//           id: history.id,
//         },
//       })),
//     };

//     return res.status(200).json(responseData);
//   } catch (error) {
//     console.error("Terjadi kesalahan:", error);
//     return res.status(500).json({ error: "Terjadi kesalahan dalam mengambil histori prediksi." });
//   }
// });

module.exports = { store };
