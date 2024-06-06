const fs = require("fs");
const path = require("path");
const Predict = require("../model/predict");

const addPrediction = async (req, res) => {
  try {
    const { result, description, createdAt } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.filename : null; // Ambil nama file gambar jika di-upload
    const newPredictionId = await Predict.create(userId, result, description, createdAt, image);
    res.status(201).json({
      status: "success",
      message: "Prediction created successfully",
      data: {
        result,
        description,
        image,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPredictionsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const predictions = await Predict.findByUserId(userId);
    res.status(200).json({
      status: "success",
      data: [
        {
          id: 1,
          result: "Example prediction",
          description: "This is an example",
          image: "path/to/image.jpg",
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPrediction,
  getPredictionsByUserId,
};
