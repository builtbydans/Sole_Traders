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
    return res.redirect("/services");
  } catch (err) {
    console.error(err);
    req.session.flash = {
      message: err.message || "Something went wrong adding the service.",
    };
    return res.redirect("/services/new");
  }
};

exports.showEditForm = async (req, res) => {
  const serviceId = req.params.id;
  const traderId = req.session.traderId;

  const service = await servicesModel.getServiceById(serviceId);

  if (!service) {
    return res.status(404).send("Service not found");
  }

  if (service.trader_id !== traderId) {
    return res.status(403).send("Not authorised");
  }

  res.render("services/edit", {
    title: "Edit Service",
    service
  });
};

exports.updateService = async (req, res) => {
  const serviceId = req.params.id;
  const traderId = req.session.traderId;

  const { title, description, pricing_type, base_price } = req.body;

  const result = await servicesModel.updateServiceById(
    serviceId,
    traderId,
    title,
    description,
    pricing_type,
    base_price
  );

  if (result.affectedRows === 0) {
    return res.status(403).send("Not authorised");
  }

  res.redirect("/services");
};

exports.deleteService = async (req, res) => {
  const serviceId = req.params.id;
  const traderId = req.session.traderId;

  const result = await servicesModel.deleteServiceById(serviceId, traderId)

  if (result.affectedRows === 0) {
    return res.status(403).send("Not authorised")
  }

  res.redirect("/services");
}
