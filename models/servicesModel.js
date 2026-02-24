db = require("../db/connection");

exports.getServicesByTraderId = async (traderId) => {
  const [rows] = await db.query(`SELECT * FROM services WHERE trader_id = ?`, [
    traderId,
  ]);

  return rows;
};

exports.addService = async (traderId, data) => {
  let { title, description, pricingType, basePrice } = data;

  title = title?.trim();
  description = description?.trim();
  pricingType = pricingType?.trim().toLowerCase() || "hourly";
  const basePriceNum = Number(basePrice);

  if (!title || !description || isNaN(basePriceNum) || basePriceNum <= 0) {
    throw new Error("Invalid service data provided.");
  }

  if (!["hourly", "fixed"].includes(pricingType)) {
    throw new Error("Invalid pricing type.");
  }

  return db.query(
    `INSERT INTO services (trader_id, title, description, pricing_type, base_price)
       VALUES (?, ?, ?, ?, ?)`,
    [traderId, title, description, pricingType, basePrice],
  );
};
