const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const traderController = require("../controllers/traderController");
const traderProfileController = require("../controllers/traderProfileController");

router.use(requireAuth);

router.get("/dashboard", traderController.dashboard);
router.get("/profile", traderProfileController.profile);

router.get("/profile/create", traderProfileController.getCreateProfilePage);
router.post("/profile/create", traderProfileController.createProfile);

router.post("/profile/trade-type", traderProfileController.updateTradeType);
router.post("/profile/region", traderProfileController.updateRegion);
router.post(
  "/profile/availability",
  traderProfileController.updateAvailability,
);
router.post("/profile/bio", traderProfileController.updateBio);

module.exports = router;
