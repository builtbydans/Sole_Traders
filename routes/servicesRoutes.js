const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const servicesController = require("../controllers/servicesController");

router.use(requireAuth);

router.get("/", servicesController.getAllServices);

// new service form
router.get("/new", servicesController.showNewForm);
router.post("/", servicesController.addService);

// edit form
router.get("/:id/edit", servicesController.showEditForm);
router.post("/:id", servicesController.updateService);

// delete form


module.exports = router;
