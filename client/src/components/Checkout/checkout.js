import React from 'react';
import Checkout from './checkout.module.css';

const Checkout = ({ cartItems }) => {
  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.Product_id}>{item.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;