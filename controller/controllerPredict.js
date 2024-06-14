const fs = require("fs");
const path = require("path");
const Predict = require("../model/predict");

const addPrediction = async (req, res) => {
  try {
    const { result, description, createdAt } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.filename : null;
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    const newPredictionId = await Predict.create(userId, result, description, currentTime, image);
    res.status(201).json({
      status: "success",
      message: "Prediction created successfully",
      data: {
        result,
        description,
        createdAt: currentTime,
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
    res.status(200).json({ predictions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPrediction,
  getPredictionsByUserId,
};
