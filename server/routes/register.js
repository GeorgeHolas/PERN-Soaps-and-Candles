/**
 * Registers a new user.
 *
 * Accepts a POST request to /register with username and password in the request body.
 * Checks if the username already exists in the database.
 * If so, returns a 400 error.
 * If not, hashes the password, inserts the user into the database,
 * and returns the new user object.
 */
// register.js
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const router = express.Router();
router.use(bodyParser.json());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query(
      'SELECT * FROM public."Customers" WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const newUser = await pool.query(
      'INSERT INTO public."Customers" (username, password, "Created") VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, formattedDate]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
