const db = require("../config/db");

const Predict = {
  async create(userId, result, soil, temp, humidity, rain, sun, createdAt, image) {
    const connection = await db();

    try {
      await connection.beginTransaction();

      const [countResult] = await connection.query("SELECT COUNT(*) AS count FROM predict WHERE id = ?", [userId]);
      const rowCount = countResult[0].count;
      const idpred = rowCount + 1;
      const defaultstatus = 0;

      const [queryResult] = await connection.query("INSERT INTO predict (id, idpred, result, soil, temp, humidity, rain, sun, createdAt, image, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        userId,
        idpred,
        result,
        soil,
        temp,
        humidity,
        rain,
        sun,
        new Date(),
        image,
        defaultstatus,
      ]);

      await connection.commit();
      return queryResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },

  async delete(userId, idpred) {
    const connection = await db();

    try {
      await connection.beginTransaction();

      const [updateResult] = await connection.query("UPDATE predict SET status = 1 WHERE id = ? AND idpred = ?", [userId, idpred]);

      await connection.commit();

      return {
        updatedRows: updateResult.affectedRows,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  },

  async findByUserId(userId) {
    const connection = await db();
    try {
      const [rows] = await connection.query("SELECT * FROM predict WHERE id = ? AND status = '0' ORDER BY idpred DESC", [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = Predict;
