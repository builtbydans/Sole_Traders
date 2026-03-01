const db = require("../db/connection");

exports.getPublicDirectoryDetails = async () => {
  const [rows] = await db.query(`
    SELECT t.id, t.name, tp.trade_type, tp.region
    FROM traders t
    JOIN trader_profiles tp
      ON t.id = tp.trader_id`);
  return rows;
}

exports.getTraderProfileById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT tp.*, t.name
    FROM trader_profiles tp
    JOIN traders t ON tp.trader_id = t.id
    WHERE tp.trader_id = ?
    `,
    [id]
  );

  return rows[0] || null;
};

exports.getTraderNameById = async (id) => {
  const [rows] = await db.query("SELECT name FROM traders WHERE id = ?", [id]);
  return rows[0] || null;
};
