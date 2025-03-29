const passport = require("passport");

const getAuthURL = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
};

const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.redirect("/login?error=oauth");
    }
    res.redirect(`/dashboard?token=${user.token}`);
  })(req, res, next);
};

module.exports = { getAuthURL, googleCallback };
