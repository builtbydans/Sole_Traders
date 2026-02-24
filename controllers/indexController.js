const indexModel = require("../models/indexModel");

exports.renderHome = async (req, res) => {
  let trader = null;
  const loggedOut = req.query.loggedOut === "true";

  try {
    if (req.session.traderId) {
      trader = await indexModel.getTraderNameById(req.session.traderId);
    }

    res.render("home", {
      title: "Home",
      trader,
      loggedOut,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading home page");
  }
};

exports.renderDirectory = (req, res) => {
  res.render("directory");
};
