const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email", "https://www.googleapis.com/auth/gmail.send"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  res.json({ success: true, message: "Logged in successfully", user: req.user });
});
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ success: true, message: "Logged out" });
  });
});
module.exports = router;
