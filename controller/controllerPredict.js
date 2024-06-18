const fs = require("fs");
const path = require("path");
const Predict = require("../model/predict");

const addPrediction = async (req, res) => {
  try {
    const { result, soil, temp, humidity, rain, sun, image } = req.body;
    const userId = req.user.id;
    // const cleanedImage = image ? image.trim() : null;
    const currentTime = new Date().toLocaleString({ timeZone: "Asia/Jakarta" });

    console.log("Received image:", image); // Debugging: log the received image

    // console.log("Cleaned image:", cleanedImage); // Debugging: log the cleaned image

    const newPredictionId = await Predict.create(userId, result, soil, temp, humidity, rain, sun, currentTime, image);
    res.status(201).json({
      status: "success",
      message: "Prediction created successfully",
      data: {
        result,
        soil,
        temp,
        humidity,
        rain,
        createdAt: currentTime,
        image,
      },
    });
  } catch (error) {
    console.error("Error in addPrediction:", error); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
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
