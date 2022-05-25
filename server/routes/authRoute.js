const express = require("express");
const router = express.Router();
const passport = require("passport");
// Google Auth ...
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// Google Auth Call Back ...
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys");
  }
);
// Logout User...
router.get("/api/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
