require("dotenv").config();

const express = require("express");
const indexRoutes = require("./routes/index");
const db = require("./db/connection");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", indexRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
