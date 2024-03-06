import React, { useState, useEffect } from "react";
import { Elements, useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentMessage from "../PaymentMessage/paymentMessage";
import { useAuth } from "../../routes/AuthContext"; 
import styles from "./checkout.module.css";

const CheckoutForm = ({ cartItems, customerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [paymentError, setPaymentError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });
  const [skipCustomerInfo, setSkipCustomerInfo] = useState(false); 

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

  const handlePayment = async (e) => {
    e.preventDefault();
  
    if (!skipCustomerInfo) {
      // Check if any of the required fields are empty
      if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.address || !customerInfo.email) {
        setPaymentError("Please fill in all customer information before proceeding to payment.");
        return;
      }
    }
  
    setProcessingPayment(true);
  
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
  
      if (error) {
        setPaymentError(error.message);
      } else {
        const response = await fetch("http://localhost:4000/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId,
            paymentMethodId: paymentMethod.id,
            total: calculateTotalAmount(cartItems),
            status: "Complete",
            created: new Date(),
            // Only include customerInfo if skipCustomerInfo is false
            customerInfo: skipCustomerInfo ? {} : { ...customerInfo },
          }),
        });
  
        if (response.ok) {
          setPaymentError(null);
          setPaymentSuccessMessage("Payment was successful!");
          setShowPaymentMessage(true);
  
          // Clear customer info after successful payment
          setCustomerInfo({
            firstName: "",
            lastName: "",
            address: "",
            email: "",
          });
  
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 1000);
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
      {!skipCustomerInfo && (
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
      )}
      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={skipCustomerInfo}
            onChange={() => setSkipCustomerInfo(!skipCustomerInfo)}
          />
          <span className={styles.checkboxText}>Use previously saved customer information</span>
        </label>
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
  const { getUser, getCustomerId } = useAuth();
  const user = getUser();
  const customerId = getCustomerId();

  useEffect(() => {
    console.log("User from login:", user);
    console.log("Customer_id from login:", customerId);
    if (localStorage.getItem("customerInfoFilled")) {
      // Customer info has been filled before
      // You can choose to hide the customer info form here
    }
  }, [user, customerId]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm cartItems={cartItems} customerId={customerId} />
    </Elements>
  );
};

export default Checkout;
