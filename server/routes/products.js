const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.use(express.json());

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Products"');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product by id
router.get('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await db.query('SELECT * FROM "Products" WHERE "Product_id" = $1', [product_id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const result = await db.query(
      'INSERT INTO "Products" ("Name", "Price", "Description") VALUES ($1, $2, $3) RETURNING *',
      [name, price, description]
    );

    // The result.rows[0] contains the newly created product
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a specific product
router.put('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const { name, price, description } = req.body;
    const result = await db.query(
      'UPDATE "Products" SET "Name" = $1, "Price" = $2, "Description" = $3 WHERE "Product_id" = $4 RETURNING *',
      [name, price, description, product_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a specific product
router.delete('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const result = await db.query('DELETE FROM "Products" WHERE "Product_id" = $1 RETURNING *', [product_id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;