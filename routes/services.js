const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const servicesController = require("../controllers/servicesController");

router.use(requireAuth);

router.get("/services/new", servicesController.showNewForm);
router.post("/services", servicesController.addService);

module.exports = router;
