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

exports.renderDirectory = async (req, res) => {
  const id = req.params.id

  try {
    const result = await indexModel.getPublicDirectoryDetails(id);

    res.render("directory", {
      id,
      result,
    });
  } catch (err) {
    console.log(err)
  }
};

exports.renderTraderProfile = async (req, res) => {
  const traderId = req.params.id;

  const profile = await indexModel.getTraderProfileById(traderId);

  if (!profile) {
    return res.status(404).send("Trader not found");
  }

  res.render("traders/profile", {
    profile,
    isOwner: req.session.traderId == profile.id,
    loggedInTraderId: req.session.traderId,
  });
};
