const db = require("../config/db");

const Predict = {
  async create(userId, result, soil, temp, humidity, rain, sun, createdAt, image) {
    const connection = await db();
    const [queryResult] = await connection.query("INSERT INTO predict (id, result, soil, temp, humidity, rain, sun, createdAt, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
      userId,
      result,
      soil,
      temp,
      humidity,
      rain,
      sun,
      new Date(),
      image,
    ]);
    return queryResult.insertId;
  },

  async findByUserId(userId) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM predict WHERE id = ?", [userId]);
    return rows;
  },
};

module.exports = Predict;
