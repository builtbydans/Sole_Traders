const db = require("../db/connection");

exports.profile = async (req, res) => {
  const traderId = req.session.traderId;

  const [rows] = await db.query(
    "SELECT trade_type, region, availability, bio FROM trader_profiles WHERE trader_id = ?",
    [traderId]
  );

  const profile = rows.length > 0 ? rows[0] : null;

  res.render("traders/profile", {
    title: "Your Profile",
    profile,
  });
};

exports.updateTradeType = async (req, res) => {
  const traderId = req.session.traderId;
  const { tradeType } = req.body;

  if (!tradeType || tradeType.trim() === "") {
    return res.redirect("/traders/profile");
  }

  await db.query(
    "UPDATE trader_profiles SET trade_type = ? WHERE trader_id = ?",
    [tradeType, traderId]
  );

  res.redirect("/traders/profile");
};

exports.updateRegion = async (req, res) => {
  const traderId = req.session.traderId;
  const { region } = req.body;

  if (!region || region.trim() === "") {
    return res.redirect("/traders/profile");
  }

  await db.query("UPDATE trader_profiles SET region = ? WHERE trader_id = ?", [
    region,
    traderId,
  ]);

  res.redirect("/traders/profile");
};

exports.updateAvailability = async (req, res) => {
  const traderId = req.session.traderId;
  const { availability } = req.body;

  if (!availability || availability.trim() === "") {
    return res.redirect("/traders/profile");
  }

  await db.query(
    "UPDATE trader_profiles SET availability = ? WHERE trader_id = ?",
    [availability, traderId]
  );

  res.redirect("/traders/profile");
};

exports.updateBio = async (req, res) => {
  const traderId = req.session.traderId;
  const { bio } = req.body;

  if (!bio || bio.trim() === "") {
    return res.redirect("/traders/profile");
  }

  await db.query("UPDATE trader_profiles SET bio = ? WHERE trader_id = ?", [
    bio,
    traderId,
  ]);

  res.redirect("/traders/profile");
};
