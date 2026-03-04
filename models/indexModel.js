const db = require("../db/connection");

exports.getPublicDirectoryDetails = async (tradeType, region) => {
  let query = `
    SELECT t.id, t.name, tp.trade_type, tp.region
    FROM traders t
    JOIN trader_profiles tp
      ON t.id = tp.trader_id
    WHERE 1=1
  `;

  const params = [];

  if (tradeType) {
    query += " AND tp.trade_type = ?";
    params.push(tradeType);
  }

  if (region) {
    query += " AND tp.region = ?";
    params.push(region);
  }

  const [rows] = await db.query(query, params);
  return rows;
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

exports.getTraderProfileById = async (id) => {
  const [rows] = await db.query(`
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
