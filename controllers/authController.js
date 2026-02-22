const db = require("../db/connection");
const bcrypt = require("bcrypt");

/* =========================
   Render Pages
========================= */

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

/* =========================
   Register
========================= */

exports.register = async (req, res) => {
  let { name, username, email, password } = req.body;

  // trim and force name to be pushed in uppercase
  if (name) {
    name = name?.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  username = username?.trim();
  email = email?.trim();

  if (!name || !username || !email || !password) {
    req.session.flash = { message: "All fields are required." };
    return res.redirect("/register");
  }

  if (password.length < 8) {
    req.session.flash = { message: "Password must be at least 8 characters." };
    return res.redirect("/register");
  }

  try {
    const [rows] = await db.query(
      "SELECT id FROM traders WHERE email = ? OR username = ?",
      [email, username],
    );

    if (rows.length > 0) {
      req.session.flash = {
        message: "Email or username already exists.",
      };
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.query(
      `INSERT INTO traders (name, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
      [name, username, email, hashedPassword],
    );

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
    res.status(500).send("Server error");
  }
};

/* =========================
   Login
========================= */

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    req.session.flash = { message: "Email and password are required." };
    return res.redirect("/login");
  }

  try {
    const [rows] = await db.query("SELECT * FROM traders WHERE email = ?", [
      email.trim(),
    ]);

    if (rows.length === 0) {
      req.session.flash = { message: "Invalid email or password." };
      return res.redirect("/login");
    }

    const trader = rows[0];

    const passwordMatch = await bcrypt.compare(password, trader.password_hash);

    if (!passwordMatch) {
      req.session.flash = { message: "Invalid email or password." };
      return res.redirect("/login");
    }

    // Maintain session
    req.session.traderId = trader.id;
    req.session.username = trader.username;

    res.redirect("/traders/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

/* =========================
   Logout
========================= */

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Logout failed");
    }

    res.redirect("/?loggedOut=true");
  });
};
