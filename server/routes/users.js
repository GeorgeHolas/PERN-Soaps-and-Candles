/**
 * User routes module.
 *
 * Defines routes for managing user accounts. Includes routes for:
 * - Getting a list of all users
 * - Getting a specific user by ID
 * - Updating a user's information by ID
 *
 * Uses an Express router and interfaces with the database.
 * Requires authentication middleware.
 */
// user.js
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const authenticate = require("../routes/auth");

router.use(authenticate);
router.use(express.json());

// GET /users
router.get("/", async (req, res) => {
  try {
    // Retrieve a list of users
    const getUsersQuery = 'SELECT * FROM public."Customers"';
    const users = await db.query(getUsersQuery);

    res.status(200).json(users.rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /users/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve a specific user by ID
    const getUserQuery =
      'SELECT * FROM public."Customers" WHERE "Customer_id" = $1';
    const user = await db.query(getUserQuery, [userId]);

    if (user.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(user.rows[0]);
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /users/:userId
router.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, address, email } = req.body;

  try {
    // Update user information
    const updateUserQuery = `
      UPDATE public."Customers"
      SET First_Name = $1, Last_Name = $2, Address = $3, Email = $4
      WHERE "Customer_id" = $5
      RETURNING *;
    `;

    const updatedUser = await db.query(updateUserQuery, [
      firstName,
      lastName,
      address,
      email,
      userId,
    ]);

    if (updatedUser.rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json(updatedUser.rows[0]);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
