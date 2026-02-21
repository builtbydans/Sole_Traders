const db = require("../db/connection");

exports.dashboard = async (req, res) => {
  const traderId = req.session.traderId;

  const [rows] = await db.query(
    "SELECT id, name, email FROM traders WHERE id = ?",
    [traderId],
  );

  const trader = rows[0];
  const profileExists = Boolean(trader.bio);

  if (trader && trader.name) {
    trader.name = trader.name.charAt(0).toUpperCase() + trader.name.slice(1);
  }

  res.render("traders/dashboard", {
    title: "Dashboard",
    trader,
    profileExists,
  });
};
