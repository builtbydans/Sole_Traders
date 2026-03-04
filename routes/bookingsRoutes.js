const express = require("express");
const router = express.Router();

const bookingsController = require("../controllers/bookingsController");

router.get("/", bookingsController.getAllBookings);
router.post("/", bookingsController.createNewBooking);

router.post("/:id/confirm", bookingsController.confirmBooking);
router.post("/:id/reject", bookingsController.rejectBooking);

module.exports = router;
