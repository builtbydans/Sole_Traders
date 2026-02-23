const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const profileController = require("../controllers/profileController");

router.use(requireAuth);

router.get("/", profileController.profile);

router.get("/create", profileController.getCreateProfilePage);
router.post("/create", profileController.createProfile);

router.post("/", profileController.updateProfile);

module.exports = router;
