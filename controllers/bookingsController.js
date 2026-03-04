const bookingsModel = require("../models/bookingsModel");
const servicesModel = require("../models/servicesModel");

exports.getAllBookings = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    const { status } = req.query;

    const bookings = await bookingsModel.getBookingsByTraderId(traderId, status);

    res.render("bookings/index", {
      title: "Your bookings",
      bookings,
      status
    });

  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

exports.createNewBooking = async (req, res) => {
  try {
    const { service_id } = req.body;

    const service = await servicesModel.getServiceById(service_id);


    if (!service) {
      throw new Error("Invalid service selected");
    }

    const traderId = service.trader_id;

    await bookingsModel.createNewBooking(traderId, req.body);

    req.session.flash = {
      type: "success",
      message: "Booking request sent successfully!"
    };

    return res.redirect(`/directory/profile/${traderId}`);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err.message);
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    await bookingsModel.updateBookingStatus(bookingId, "confirmed");

    res.redirect("/bookings");

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to confirm booking");
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    await bookingsModel.updateBookingStatus(bookingId, "rejected");

    res.redirect("/bookings");

  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to reject booking");
  }
};
