const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { v4: uuidv4 } = require('uuid');
const authenticate = require('../routes/auth')

router.use(authenticate);
router.use(express.json());

// Get all orders or orders by customer_id
router.get('/', async (req, res) => {
  try {
    const { customerId } = req.query;

    let query;
    let values = [];

    if (customerId) {
      query = 'SELECT * FROM public."Orders" WHERE "Customer_id" = $1';
      values = [customerId];
    } else {
      query = 'SELECT * FROM public."Orders"';
    }

    const result = await db.query(query, values);
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const orderId = uuidv4();
  const { customerId, total, status, customerInfo } = req.body;

  try {
    // Insert order information into Orders table
    const orderResult = await db.query(
      'INSERT INTO public."Orders" ("Customer_id", "Order_id", "Total", "Status", "Created") VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *',
      [customerId, orderId, total, status]
    );

    // Use the existing Customer_id for updating customer information in Customers table
    await db.query(
      'UPDATE public."Customers" SET "First_Name" = $1, "Last_Name" = $2, "Address" = $3, "Email" = $4 RETURNING *',
      [customerInfo.firstName, customerInfo.lastName, customerInfo.address, customerInfo.email]
    );

    res.status(201).json({ order: orderResult.rows[0], customerId });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific order
router.put('/:order_id', async (req, res) => {
  try {
    const { order_id } = req.params;
    const { quantity, total_price } = req.body;
    const result = await db.query(
      'UPDATE public."Orders" SET "Quantity" = $1, "Total" = $2 WHERE "Order_id" = $3 RETURNING *',
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
    const result = await db.query('DELETE FROM public."Orders" WHERE "Order_id" = $1 RETURNING *', [order_id]);

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
