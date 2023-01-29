const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/Survey");
require("./services/passport");
require("dotenv").config();
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI);
const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  if (err) console.error("Error in server setup. Server not running.");
  console.log(`\n\nYour backend server is now running on PORT:\t${PORT}`);
  console.log(`\t\tOn Your Network: http://localhost:${PORT}\n\n`);
});
