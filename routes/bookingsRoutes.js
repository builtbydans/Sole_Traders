const express = require("express");
const router = express.Router();

const bookingsController = require("../controllers/bookingsController");

router.get("/", bookingsController.getAllBookings);
router.post("/", bookingsController.createNewBooking);

module.exports = router;
