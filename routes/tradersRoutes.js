const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const traderController = require("../controllers/traderController");

router.use(requireAuth);
router.get("/dashboard", traderController.dashboard);

module.exports = router;
