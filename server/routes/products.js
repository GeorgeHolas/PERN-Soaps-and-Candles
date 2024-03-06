// Products.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.use(express.json());

// Get all products or filter by category and name
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT * FROM "Products"';

    // Check if a type query parameter is provided
    if (req.query.type) {
      const { type } = req.query;

      // Validate the type to prevent SQL injection
      const validTypes = ['soap', 'candle']; // Types in lowercase
      if (!validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid type' });
      }

      // Filter products by type
      query = `SELECT * FROM "Products" WHERE LOWER("Type") = '${type.toLowerCase()}'`;
    }

    const result = await db.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product by id
router.get('/:Product_id', async (req, res) => {
  try {
    const { Product_id } = req.params;

    // Check if product_id is a valid integer
    if (isNaN(Product_id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const result = await db.query('SELECT * FROM "Products" WHERE "Product_id" = $1', [Product_id]);

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
      'INSERT INTO "Products" ("Name", "Price", "Description", "Type") VALUES ($1, $2, $3, $4) RETURNING *',
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
router.delete('/:Product_id', async (req, res) => {
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
