require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const { amount, currency, id } = req.body;
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: id,
    });

    req.user.credits += amount / 100;
    const user = await req.user.save();
    res.send(user);
  });
};
