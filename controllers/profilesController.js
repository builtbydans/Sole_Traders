const profilesModel = require("../models/profilesModel");

// Render create profile page
exports.getCreateProfilePage = (req, res) => {
  res.render("traders/createProfile", {
    title: "Create Your Profile",
  });
};

// View profile
exports.profile = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    const profile = await profilesModel.getProfileByTraderId(traderId);

    res.render("traders/profile", {
      title: "Your Profile",
      profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("error", {
      message: "Unable to load profile",
    });
  }
};

// Create profile
exports.createProfile = async (req, res) => {
  const traderId = req.session.traderId;

  if (!traderId) {
    return res.redirect("/login");
  }

  try {
    await profilesModel.createProfile(traderId, req.body);

    req.session.flash = {
      type: "success",
      message: "Profile created successfully",
    };

    return res.redirect("/traders/profile");
  } catch (err) {
    console.error(err);

    req.session.flash = {
      type: "error",
      message:
        err.message || "Something went wrong while creating your profile",
    };

    return res.redirect("/traders/profile/create");
  }
};

exports.updateProfile = async (req, res) => {
  const traderId = req.session.traderId;
  const updates = req.body;

  // Validate allowed fields
  const allowedFields = ["trade_type", "region", "availability", "bio"];

  const filteredUpdates = {};

  for (const key of Object.keys(updates)) {
    if (allowedFields.includes(key)) {
      filteredUpdates[key] = updates[key].trim();
    }
  }

  if (Object.keys(filteredUpdates).length === 0) {
    return res.redirect("/traders/profile");
  }

  await profilesModel.updateProfile(traderId, filteredUpdates);

  res.redirect("/traders/profile");
};
