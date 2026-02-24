const servicesModel = require("../models/servicesModel");

exports.getAllServices = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    const results = await servicesModel.getServicesByTraderId(traderId);

    res.render("services/index", {
      title: "Your services",
      services: results,
    });
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

  try {
    await servicesModel.addService(traderId, req.body);

    req.session.flash = {
      type: "success",
      message: "Service added successfully.",
    };
    return res.redirect("/services/new"); // or /services
  } catch (err) {
    console.error(err);
    req.session.flash = {
      message: err.message || "Something went wrong adding the service.",
    };
    return res.redirect("/services/new");
  }
};
