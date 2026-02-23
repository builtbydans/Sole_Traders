const db = require("../db/connection");

exports.getProfileByTraderId = async (traderId) => {
  const [rows] = await db.query(
    `SELECT trade_type, region, availability, bio
     FROM trader_profiles
     WHERE trader_id = ?`,
    [traderId],
  );

  return rows[0] || null;
};

exports.createProfile = async (
  traderId,
  tradeType,
  region,
  availability,
  bio,
) => {
  return db.query(
    `INSERT INTO trader_profiles
     (trader_id, trade_type, region, availability, bio)
     VALUES (?, ?, ?, ?, ?)`,
    [traderId, tradeType, region, availability, bio],
  );
};

exports.updateProfile = async (traderId, updates) => {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  return db.query(
    `UPDATE trader_profiles SET ${setClause} WHERE trader_id = ?`,
    [...values, traderId],
  );
};
