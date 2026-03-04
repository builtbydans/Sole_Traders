require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const traderRoutes = require("./routes/tradersRoutes");
const serviceRoutes = require("./routes/servicesRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bookingsRoutes = require("./routes/bookingsRoutes");

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
const sessionStore = new MySQLStore(
  {
    clearExpired: true,
    checkExpirationInterval: 1000 * 60 * 10, // 10 mins
    expiration: 1000 * 60 * 60 * 24 * 7,     // 7 days
  },
  db.promise ? db.promise() : db // depends how your db is exported; if db is mysql2/promise pool, pass db
);

app.use(
  session({
    key: "soletraders.sid",
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: false, // localhost
    },
  })
);

// Flash for Registration/Login err
app.use((req, res, next) => {
  res.locals.flash = req.session.flash || null;
  delete req.session.flash;
  next();
});

// ✅ GLOBAL navbar data — MUST BE BEFORE ROUTES
app.use(async (req, res, next) => {
  try {
    if (!req.session.traderId) {
      res.locals.trader = null;
      return next();
    }

    const [rows] = await db.query(
      "SELECT id, name FROM traders WHERE id = ?",
      [req.session.traderId]
    );

    const trader = rows[0];

    if (!trader) {
      // trader deleted? stale session
      req.session.destroy(() => {});
      res.locals.trader = null;
      return next();
    }

    trader.name = trader.name.charAt(0).toUpperCase() + trader.name.slice(1);
    res.locals.trader = trader;
    next();
  } catch (e) {
    console.error("Session Middleware Error:", e);
    res.locals.trader = null;
    next();
  }
});

// ✅ Routes LAST
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/traders", traderRoutes);
app.use("/traders/profile", profileRoutes);
app.use("/services", serviceRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
