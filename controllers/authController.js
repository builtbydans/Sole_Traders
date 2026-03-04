const authModel = require("../models/authModel");

exports.renderRegister = (req, res) => {
  const flash = req.session.flash || null;
  delete req.session.flash;

  res.render("auth/register", {
    title: "Register",
    flash,
  });
};

exports.renderLogin = (req, res) => {
  const flash = req.session.flash || null;
  delete req.session.flash;

  res.render("auth/login", {
    title: "Login",
    flash,
  });
};

exports.register = async (req, res) => {
  try {
    await authModel.register(req.body);

    req.session.flash = { message: "Registration successful. Please login." };
    res.redirect("/login");
  } catch (err) {
    console.error(err);

    if (err.code === "ER_DUP_ENTRY") {
      req.session.flash = {
        message: "That email or username is already taken.",
      };
      return res.redirect("/register");
    }

    req.session.flash = {
      message: err.message || "Something went wrong",
    };
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  try {
    const trader = await authModel.login(req.body);

    req.session.traderId = trader.id;
    req.session.username = trader.username;

    req.session.save(() => res.redirect("/traders/dashboard"));
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Logout failed");
    }

    res.redirect("/?loggedOut=true");
  });
};
