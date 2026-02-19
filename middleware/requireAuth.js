module.exports = (req, res, next) => {
  if (!req.session.traderId) {
    req.session.flash = {
      type: "error",
      message: "Please log in to access your dashboard",
    };
    return res.redirect("/login");
  }

  next();
};
