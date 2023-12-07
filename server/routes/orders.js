// orders.js

const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.use(express.json());

// Get all orders
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Orders"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get an order by id
router.get('/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;
    const result = await db.query('SELECT * FROM "Orders" WHERE "Order_id" = $1', [order_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { customer_id, product_id, quantity, total_price } = req.body;
    const result = await db.query(
      'INSERT INTO "Orders" ("Customer_id", "Product_id", "Quantity", "Total_price") VALUES ($1, $2, $3, $4) RETURNING *',
      [customer_id, product_id, quantity, total_price]
    );

    // The result.rows[0] contains the newly created order
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific order
router.put('/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;
    const { quantity, total_price } = req.body;
    const result = await db.query(
      'UPDATE "Orders" SET "Quantity" = $1, "Total_price" = $2 WHERE "Order_id" = $3 RETURNING *',
      [quantity, total_price, order_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific order
router.delete('/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;
    const result = await db.query('DELETE FROM "Orders" WHERE "Order_id" = $1 RETURNING *', [order_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
