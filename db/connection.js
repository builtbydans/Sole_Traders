const mysql = require("mysql2/promise");
const password = process.env.DB_KEY;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: password,
  database: "sole_traders",
});

module.exports = pool;
