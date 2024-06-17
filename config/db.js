const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "34.101.188.179",
      port: 3306,
      user: "tanamify",
      password: "root",
      database: "tanamify",
    });
    console.log("MySQL connected...");
    return connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
