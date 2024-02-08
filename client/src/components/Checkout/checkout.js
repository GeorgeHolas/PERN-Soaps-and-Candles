// Checkout.js

import React, { useState } from "react";
import { Elements, useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMessage from "../PaymentMessage/paymentMessage";
import { useAuth } from "../../routes/AuthContext"; 
import styles from "./checkout.module.css";

// Define the CheckoutForm component
const CheckoutForm = ({ cartItems, customerId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");

  // Additional state for customer information
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardElementChange = (e) => {
    if (e.error) {
      setPaymentError(e.error.message);
    } else {
      setPaymentError(null);
    }
  };

  console.log("User from login:", { username: 'testuser20', password: 'testuser20' });

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log("User in handlePayment:", customerId);

    // Check if all required customer information is filled
    if (
      !customerInfo.firstName ||
      !customerInfo.lastName ||
      !customerInfo.address ||
      !customerInfo.email
    ) {
      setPaymentError("Please fill in all customer information before proceeding to payment.");
      return;
    }

    setProcessingPayment(true);

      try {
      // Create a PaymentMethod from the CardElement
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
;

      if (error) {
        setPaymentError(error.message);
      } else {
        
        // Add this check
        if(!customerId || !customerId) {
          console.error("Customer not logged in");
          return <p>Please login to access checkout</p>;
        }      

        const response = await fetch("http://localhost:4000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId, // Check if user is defined before accessing properties
            paymentMethodId: paymentMethod.id,
            total: calculateTotalAmount(cartItems),
            status: "Complete",
            created: new Date(),
            customerInfo: { ...customerInfo }, // Include customer information in the request
          }),
        });

        if (response.ok) {
          setPaymentError(null);
          setPaymentSuccessMessage("Payment was successful!");
          setShowPaymentMessage(true);

          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 3000);
        } else {
          console.error("Payment failed");
        }
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      setPaymentError("Error processing payment. Please try again.");
    } finally {
      setProcessingPayment(false);
    }
  };

  const calculateTotalAmount = (items) => {
    return items.reduce(
      (total, item) => total + (item.Price || 0) * (item.quantity || 1),
      0
    );
  };

  const totalAmount = calculateTotalAmount(cartItems);

  return (
    <div className={styles.checkoutContainer}>
      <h3>Checkout</h3>
      <hr />
      <div>
        <h2>Customer Information</h2>
        <form className={styles.customerInfoForm}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={customerInfo.firstName}
              onChange={handleInputChange}
              autoComplete="given-name"
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={customerInfo.lastName}
              onChange={handleInputChange}
              autoComplete="family-name"
              required
            />
          </label>
          <label>
            Address:
            <textarea
              name="address"
              value={customerInfo.address}
              onChange={handleInputChange}
              rows="4"
              autoComplete="street-address"
              required
            ></textarea>
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
            />
          </label>
        </form>
      </div>
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
          <button
            className={styles.buttonPay}
            type="submit"
            disabled={processingPayment}
          >
            {processingPayment ? "Processing..." : "Pay Now"}
          </button>
        </form>
        {paymentError && (
          <div className={styles.paymentError}>{paymentError}</div>
        )}
      </div>
      {showPaymentMessage && <PaymentMessage message={paymentSuccessMessage} />}
    </div>
  );
};

const Checkout = ({ cartItems }) => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

  const { getUser } = useAuth();

  const user = getUser(); 

  if (!user) {
    console.log("Customer not logged in");
    return;
  }

  console.log("User", user);

  const customerId = user.id;

    // Set mock data 
localStorage.setItem("user", JSON.stringify({id: 1})) 

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} customerId={customerId} />
    </Elements>
  );
};

export default Checkout;
