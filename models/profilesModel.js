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

exports.getPublicTraderServicesById = async (traderId) => {
  const [rows] = await db.query(
    `SELECT
        s.id,
        s.title,
        s.description,
        s.pricing_type,
        s.base_price
     FROM services s
     JOIN trader_profiles tp ON s.trader_id = tp.trader_id
     WHERE s.trader_id = ?`,
    [traderId]
  );
  return rows;
}

exports.createProfile = async (traderId, data) => {
  let { tradeType, region, availability, bio } = data;

  tradeType = tradeType?.trim();
  region = region?.trim();
  availability = availability?.trim();
  bio = bio?.trim();

  if (!tradeType || !region || !availability || !bio) {
    throw new Error("All fields requried");
  }

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
