const db = require("../config/db");

const User = {
  async create(id, name, email, password) {
    const connection = await db();
    const [result] = await connection.query("INSERT INTO users (id, name, email, password, createdAt) VALUES (?, ?, ?, ?, ?)", [id, name, email, password, new Date()]);
    return result.insertId;
  },

  async findByEmail(email) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  },

  async findById(id) {
    const connection = await db();
    const [rows] = await connection.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  async updateLoginAt(id) {
    const connection = await db();
    const [result] = await connection.query("UPDATE users SET loginAt = ?, sesi = 1 WHERE id = ?", [new Date(), id]);
    return result;
  },

  async updateLogoutAt(id) {
    const connection = await db();
    const [result] = await connection.query("UPDATE users SET logoutAt = ?, sesi = 0 WHERE id = ?", [new Date(), id]);
    return result;
  },
};

module.exports = User;
