const db = require("../db/connection");
const bcrypt = require("bcrypt");

exports.register = async (data) => {
  let { name, username, email, password } = data;

  if (name) {
    name = name?.trim();
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  username = username?.trim();
  email = email?.trim();

  if (!name || !username || !email || !password) {
    throw new Error("All fields are required");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  const [rows] = await db.query(
    "SELECT id FROM traders WHERE email = ? OR username = ?",
    [email, username],
  );

  if (rows.length > 0) {
    throw new Error("Email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  return db.query(
    `INSERT INTO traders (name, username, email, password_hash)
       VALUES (?, ?, ?, ?)`,
    [name, username, email, hashedPassword],
  );
};

exports.login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const [rows] = await db.query("SELECT * FROM traders WHERE email = ?", [
    email.trim(),
  ]);

  if (rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const trader = rows[0];

  const passwordMatch = await bcrypt.compare(password, trader.password_hash);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  return trader;
};
