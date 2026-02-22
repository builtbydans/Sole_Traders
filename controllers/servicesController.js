const db = require("../db/connection");

exports.getAllServices = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    const [results] = await db.query(
      "SELECT * FROM services WHERE trader_id = ?",
      [traderId],
    );

    res.render("services/index", { services: results });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.showNewForm = (req, res) => {
  const flash = req.session.flash || null;
  res.render("services/new", { title: "Add Service", flash });
};

exports.addService = async (req, res) => {
  const traderId = req.session.traderId;
  if (!traderId) return res.redirect("/login");

  let { title, description, pricingType, basePrice } = req.body;

  title = title?.trim();
  description = description?.trim();
  pricingType = pricingType?.trim().toLowerCase() || "hourly";

  const rawBasePrice = basePrice?.trim();
  const basePriceNum = Number(rawBasePrice);

  if (!title || !description || !rawBasePrice) {
    req.session.flash = { message: "All fields are required." };
    return res.redirect("/services/new");
  }

  if (!["hourly", "fixed"].includes(pricingType)) {
    req.session.flash = { message: "Invalid pricing type." };
    return res.redirect("/services/new");
  }

  if (!Number.isFinite(basePriceNum) || basePriceNum <= 0) {
    req.session.flash = { message: "Base price must be a valid number." };
    return res.redirect("/services/new");
  }

  try {
    await db.query(
      `INSERT INTO services (trader_id, title, description, pricing_type, base_price)
       VALUES (?, ?, ?, ?, ?)`,
      [traderId, title, description, pricingType, basePriceNum],
    );

    req.session.flash = {
      type: "success",
      message: "Service added successfully.",
    };
    return res.redirect("/services/new"); // or /services
  } catch (err) {
    console.error(err);
    req.session.flash = { message: "Something went wrong adding the service." };
    return res.redirect("/services/new");
  }
};
