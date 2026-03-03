const bookingsModel = require("../models/bookingsModel");
const servicesModel = require("../models/servicesModel");

exports.getAllBookings = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    const bookings = await bookingsModel.getBookingsByTraderId(traderId);

    res.render("bookings/index", {
      title: "Your bookings",
      bookings
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
}

exports.createNewBooking = async (req, res) => {
  try {
    const { service_id } = req.body;

    const service = await servicesModel.getServiceById(service_id);

    if (!service) {
      throw new Error("Invalid service selected");
    }

    const traderId = service.trader_id;

    await bookingsModel.createNewBooking(traderId, req.body);

    return res.redirect(`/directory/profile/${traderId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};
