// Payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Payment function
router.post('/intents', async (req, res) => {
  try {
    // Create intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: 'Error creating payment' });
  }
});

module.exports = router;
