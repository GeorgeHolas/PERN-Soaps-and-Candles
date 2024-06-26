/**
 * Cart router handles CRUD operations for cart items.
 *
 * Uses middleware to validate input data.
 *
 * Routes include:
 * - GET / - Get all cart items
 * - GET /:id - Get cart item by ID
 * - POST / - Create new cart item
 * - PUT /:id - Update cart item quantity
 * - DELETE /:id - Delete cart item
 */
// cart.js
const express = require("express");
const router = express.Router();
const db = require("../db/db");

const validateCartInput = (req, res, next) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: "Invalid input data" });
  }
  next();
};

// Use middleware
router.use(express.json());
router.use(validateCartInput);

// Get all items in the cart
router.get("/", async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "Cart"');
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a cart item by id
router.get("/:cart_id", async (req, res) => {
  try {
    const { cart_id } = req.params;
    const result = await db.query('SELECT * FROM "Cart" WHERE "Cart_id" = $1', [
      cart_id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cart item not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new item to the cart
router.post("/", async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const result = await db.query(
      'INSERT INTO "Cart" ("Product_id", "Quantity") VALUES ($1, $2) RETURNING *',
      [product_id, quantity]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update quantity of a specific cart item
router.put("/:cart_id", async (req, res) => {
  try {
    const { cart_id } = req.params;
    const { quantity } = req.body;
    const result = await db.query(
      'UPDATE "Cart" SET "Quantity" = $1 WHERE "Cart_id" = $2 RETURNING *',
      [quantity, cart_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cart item not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Remove a specific item from the cart
router.delete("/:cart_id", async (req, res) => {
  try {
    const { cart_id } = req.params;
    const result = await db.query(
      'DELETE FROM "Cart" WHERE "Cart_id" = $1 RETURNING *',
      [cart_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Cart item not found" });
    } else {
      res.json({ message: "Cart item deleted successfully" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
