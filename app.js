require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const traderRoutes = require("./routes/traders");
const serviceRoutes = require("./routes/services");

const db = require("./db/connection");

const app = express();
const PORT = 3000;

// ✅ View engine + layouts FIRST
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(expressLayouts);
app.set("layout", "layout");

// ✅ Body parsing
app.use(express.urlencoded({ extended: true }));

// ✅ Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// Flash for Registration/Login err
app.use((req, res, next) => {
  res.locals.flash = null;
  next();
});

// ✅ GLOBAL navbar data — MUST BE BEFORE ROUTES
app.use(async (req, res, next) => {
  try {
    if (req.session.traderId) {
      const [rows] = await db.query(
        "SELECT id, name FROM traders WHERE id = ?",
        [req.session.traderId],
      );
      const trader = rows[0];

      if (trader && trader.name) {
        trader.name =
          trader.name.charAt(0).toUpperCase() + trader.name.slice(1);
      }
      res.locals.trader = trader;
    } else {
      res.locals.trader = null;
    }
  } catch (error) {
    console.error("Session Middleware Error:", error);
    res.locals.trader = null;
  }
  next();
});

// ✅ Routes LAST
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/traders", traderRoutes);
app.use("/", serviceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
