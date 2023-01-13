const express = require("express");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./services/passport");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) console.error("Error in server setup. Server not running.");
  console.log("Server running on PORT: " + PORT);
  console.log(`http://localhost:${PORT}`);
});