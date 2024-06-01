const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "34.128.92.90",
      user: "root",
      password: "root",
      database: "develop-tes",
    });
    console.log("MySQL connected...");
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
