// Customers.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.use(express.json());

// Middleware for error handling
const errorHandler = (error, res) => {
  console.error('Error executing query:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Get all customers
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Customers"');
    res.json(result.rows);
  } catch (error) {
    errorHandler(error, res);
  }
});

// Get a customer by id
router.get('/:customer_id', async (req, res) => {
  try {
    const customer_id = parseInt(req.params.customer_id);
    const result = await db.query('SELECT * FROM "Customers" WHERE "Customer_id" = $1', [customer_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

// Create a new customer
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, address, city, state, zip } = req.body;
    const result = await db.query(
      'INSERT INTO "Customers" ("First_name", "Last_name", "Email", "Address") VALUES ($1, $2, $3, $4) RETURNING *',
      [first_name, last_name, email, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
});

// Update a specific customer
router.put('/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { first_name, last_name, email, address, city, state, zip } = req.body;
    const result = await db.query(
      'UPDATE "Customers" SET "First_name" = $1, "Last_name" = $2, "Email" = $3, "Address" = $4, "City" = $5, "State" = $6, "Zip" = $7 WHERE "Customer_id" = $8',
      [first_name, last_name, email, address, city, state, zip, customer_id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json({ message: 'Customer updated successfully' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

// Delete a specific customer
router.delete('/:customer_id', async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await db.query('DELETE FROM "Customers" WHERE "Customer_id" = $1', [customer_id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json({ message: 'Customer deleted successfully' });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});

module.exports = router;
