// Register.js  
const express = require('express');
const bodyParser = require('body-parser'); 
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const router = express.Router();
  
router.use(bodyParser.json()); // Add this line to enable JSON parsing

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Endpoint for user registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await pool.query('SELECT * FROM public."Customers" WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    console.log('Hashed Password:', hashedPassword);
    const newUser = await pool.query('INSERT INTO public."Customers" (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error('Error during registration:', error);

    // Log the specific error message
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

  module.exports = router;
