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

exports.renderPublicTraderProfile = async (req, res) => {
  const traderId = req.params.id;
  try {
    const profile = await indexModel.getTraderProfileById(traderId);
    const services = await indexModel.getPublicTraderServicesById(traderId);

    if (!profile) {
      return res.status(404).send("Trader not found");
    }

    if (!services) {
      req.session.flash = {
        type: "error",
        message: "No services found",
      };
    }

    res.render("traders/profile", {
      profile,
      services: services || [],
      isOwner: req.session.traderId == traderId,
      loggedInTraderId: req.session.traderId || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading profile");
  }
}

exports.renderTraderProfile = async (req, res) => {
  const traderId = req.session.traderId;
  if (!traderId) return res.redirect("/login");

  try {
    const profile = await indexModel.getTraderProfileById(traderId);

    if (!profile) {
      return res.status(404).send("Trader not found");
    }

    res.render("traders/profile", {
      profile,
      isOwner: req.session.traderId == profile.id,
      loggedInTraderId: req.session.traderId,
    });
  } catch (err) {
    res.status(500).send("Error loading your profile");
  }
};
