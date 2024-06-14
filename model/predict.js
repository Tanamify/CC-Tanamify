const db = require("../config/db");

const Predict = {
  async create(userId, resultValue, description, createdAt, image) {
    const connection = await db();
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    const [result] = await connection.query("INSERT INTO predict (id, result, description, createdAt, image) VALUES (?, ?, ?, ?, ?)", [userId, resultValue, description, currentTime, image]); // Gunakan resultValue di sini
    return result.insertId;
  },

  async findByUserId(userId) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM predict WHERE id = ?", [userId]);
    return rows;
  },
};

module.exports = Predict;
