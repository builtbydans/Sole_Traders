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
  try {
    const { trade_type, region } = req.query;

    const result = await indexModel.getPublicDirectoryDetails(
      trade_type,
      region
    );

    res.render("directory", {
      title: "Public Directory",
      result,
      trade_type,
      region
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
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
