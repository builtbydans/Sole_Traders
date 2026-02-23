const profileModel = require("../models/profileModel");

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
    const profile = await profileModel.getProfileByTraderId(traderId);

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

  let { tradeType, region, availability, bio } = req.body;

  tradeType = tradeType?.trim();
  region = region?.trim();
  availability = availability?.trim();
  bio = bio?.trim();

  if (!tradeType || !region || !availability || !bio) {
    req.session.flash = {
      type: "error",
      message: "All fields are required.",
    };
    return res.redirect("/traders/profile/create");
  }

  try {
    await profileModel.createProfile(
      traderId,
      tradeType,
      region,
      availability,
      bio,
    );

    req.session.flash = {
      type: "success",
      message: "Profile created successfully",
    };

    return res.redirect("/traders/profile");
  } catch (err) {
    console.error(err);

    req.session.flash = {
      type: "error",
      message: "Something went wrong while creating your profile",
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

  await profileModel.updateProfile(traderId, filteredUpdates);

  res.redirect("/traders/profile");
};
