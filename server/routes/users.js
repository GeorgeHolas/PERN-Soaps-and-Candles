const express = require('express');
const router = express.Router();

// GET /users
router.get('/', async (req, res) => {
  try {
    // Retrieve a list of users
    const getUsersQuery = 'SELECT * FROM public."Customers"';
    const users = await pool.query(getUsersQuery);

    res.status(200).json(users.rows);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /users/:userId
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Retrieve a specific user by ID
    const getUserQuery = 'SELECT * FROM public."Customers" WHERE customer_id = $1';
    const user = await pool.query(getUserQuery, [userId]);

    if (user.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user.rows[0]);
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /users/:userId
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, address, email } = req.body;

  try {
    // Update user information
    const updateUserQuery = `
      UPDATE public."Customers"
      SET first_name = $1, last_name = $2, address = $3, email = $4
      WHERE customer_id = $5
      RETURNING *;
    `;

    const updatedUser = await pool.query(updateUserQuery, [firstName, lastName, address, email, userId]);

    if (updatedUser.rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(updatedUser.rows[0]);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;