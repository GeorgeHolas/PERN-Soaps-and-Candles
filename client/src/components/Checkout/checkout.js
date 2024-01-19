import React, { useState } from 'react';
import { Elements, useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styles from './checkout.module.css';

// Define the CheckoutForm component
const CheckoutForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const handleCardElementChange = (e) => {
    if (e.error) {
      setPaymentError(e.error.message);
    } else {
      setPaymentError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);
  
    try {
      // Use elements.getElement to get the CardElement
      const cardElement = elements.getElement(CardElement);
  
      // Create a token from the CardElement
      const { token, error } = await stripe.createToken(cardElement);
  
      if (error) {
        setPaymentError(error.message);
      } else {
        const response = await fetch('http://localhost:4000/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerId: token?.card?.customer,
    total: calculateTotalAmount(cartItems),
    status: 'Complete',
    created: new Date().toISOString(),
  }),
});
const placeOrder = async () => {
}
        if (response.ok) {
          await placeOrder(); // Call this first
          setPaymentError(null); // Clear any previous payment errors
          console.log('Payment successful');
          
          // Delay the redirection to the home page
          setTimeout(() => {
            window.location.href = 'http://localhost:3000/'; 
          }, 5000); // 5000 milliseconds = 5 seconds
        } else {
          console.error('Payment failed');
        }
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setPaymentError('Error processing payment. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.Price || 0) * (item.quantity || 1), 0);
  };

  const totalAmount = calculateTotalAmount(cartItems);

  return (
    <div className={styles.checkoutContainer}>
      <h3>Checkout</h3>
      <hr />
      <ul>
        <h1>Subtotal : ${totalAmount + 5}</h1>
        <p>includes shipping costs</p>
      </ul>
      <div className={styles.paymentDetails}>
        <hr />
        <h2>Payment Details</h2>
        <form onSubmit={handlePayment}>
          <CardElement onChange={handleCardElementChange} />
          <button class={styles.buttonPay} type="submit" disabled={processingPayment}>
            {processingPayment ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
        {paymentError && <div className={styles.paymentError}>{paymentError}</div>}
      </div>
    </div>
  );
};

// Define the Checkout component
const Checkout = ({ cartItems }) => {
  const stripePromise = loadStripe('pk_test_51OSinJAdtQPayGzAJ4J6nek6Fh9i4iUFrkDRRw0J9OonrY2dhAr6yBcE3WR2XnVEudZ2myYnBjSSjHbomQ55M8QS00EYO911Dl');

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} />
    </Elements>
  );
};

export default Checkout;
