const express = require("express");
const router = express.Router();
const keys = require("../confing/keys");
const stripe = require("stripe")(keys.stripSecretKey);
// authentication routes ...
const authentication = require("../middlewares/Authentication");

// testing route ....
router.get("/api/getbill", (req, res) => {
  res.send("<h1> This is bill Detail Route </h1>");
});
// Handling strpe integration that is coming from the frontend ..
router.post("/api/stripe", authentication, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    description: "$5 for 5 Credits",
    source: req.body.id,
  });
  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

module.exports = router;
