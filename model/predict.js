const db = require("../config/db");

const Predict = {
  async create(userId, resultValue, description, createdAt, image) {
    const connection = await db();
    const [result] = await connection.query("INSERT INTO predict (id, result, description, createdAt, image) VALUES (?, ?, ?, ?, ?)", [userId, resultValue, description, new Date(), image]);
    return result.insertId;
  },

  async findByUserId(userId) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM predict WHERE id = ?", [userId]);
    return rows;
  },
};

module.exports = Predict;
