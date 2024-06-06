const db = require("../config/db");

const Predict = {
  async create(userId, resultValue, description, createdAt) {
    const connection = await db();
    const [result] = await connection.query("INSERT INTO predict (id, result, description, createdAt) VALUES (?, ?, ?, ?)", [userId, resultValue, description, createdAt]); // Gunakan resultValue di sini
    return result.insertId;
  },

  async findByUserId(userId) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM predict WHERE id = ?", [userId]);
    return rows;
  },
};

module.exports = Predict;
