const db = require("../db/connection");

exports.getTraderNameById = async (id) => {
  const [rows] = await db.query("SELECT name FROM traders WHERE id = ?", [id]);
  return rows[0] || null;
};
