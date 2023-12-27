// Cart.js

import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.Product_id}>
            {item.Name} - ${item.Price}
            <button onClick={() => removeFromCart(item.Product_id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;