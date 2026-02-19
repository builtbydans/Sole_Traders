const db = require("../db/connection");

exports.renderHome = async (req, res) => {
  let trader = null;
  const loggedOut = req.query.loggedOut === "true";

  if (req.session.traderId) {
    const [rows] = await db.query("SELECT name FROM traders WHERE id = ?", [
      req.session.traderId,
    ]);

    trader = rows[0];
  }

  res.render("home", {
    title: "Home",
    trader,
    loggedOut,
  });
};

exports.renderDirectory = (req, res) => {
  res.render("directory");
};
