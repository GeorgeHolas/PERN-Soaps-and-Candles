/**
 * POST /login route - Authenticates user login using passport local strategy.
 * Checks for user in DB, authenticates with passport, establishes session.
 * Returns Customer_id on successful login.
 */
// auth.js
const express = require("express");
const passport = require("../passport");
const db = require("../db/db");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const result = await db.query(
      'SELECT * FROM "Customers" WHERE "username" = $1',
      [req.body.username]
    );

    // Log result for debugging
    console.log("DB Query Result:", result.rows[0]);

    if (!result.rows || result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username" });
    }

    const user = result.rows[0];

    // Log user object
    console.log("User object:", user);

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect("/login");
      }

      req.login(user, async (err) => {
        if (err) {
          return next(err);
        }

        // Log response body
        console.log("Login Response:", res.body);

        return res.json({
          Customer_id: user.Customer_id,
        });
      });
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Logout route
router.get("/logout", (req, res) => {
  // Destroy session
  req.logout();
  req.session.destroy();
  res.send("Logged out");
});

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

module.exports = router;
