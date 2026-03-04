const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");

router.get("/", indexController.renderHome);

router.get("/directory", indexController.renderDirectory);
router.get("/directory/profile/:id", indexController.renderPublicTraderProfile);

router.get("/login", authController.renderLogin);
router.get("/register", authController.renderRegister);

router.get("/set-name", (req, res) => {
  req.session.name = "Dan";
  res.send("Name set");
});

module.exports = router;
