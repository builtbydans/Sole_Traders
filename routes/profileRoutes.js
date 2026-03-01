const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const profilesController = require("../controllers/profilesController");

router.use(requireAuth);

router.get("/", profilesController.renderProfile);

router.get("/create", profilesController.getCreateProfilePage);
router.post("/create", profilesController.createProfile);

router.post("/", profilesController.updateProfile);

module.exports = router;
