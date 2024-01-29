const express = require("express");
const passport = require("../passport");

const router = express.Router();

// Login route
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

// Logout route  
router.get("/logout", (req, res) => {
  // Destroy session
  req.session.destroy();
  res.send("Logged out");
});

// Protected route
router.get("/dashboard", isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the dashboard, " + req.user.username + "!" });
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

module.exports = router;
