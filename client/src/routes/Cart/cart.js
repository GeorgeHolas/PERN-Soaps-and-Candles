import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';
import styles from './cart.module.css';
import Checkout from '../../components/Checkout/checkout';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  // Calculate the total price for a single item
  const calculateItemTotal = (item) => {
    return (item.Price || 0) * (item.quantity || 1);
  };

  // Calculate the overall total for the cart
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  // Show the checkout
  const handleCheckout = () => {
    setShowCheckout(true);
    navigate('/checkout');
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cart}>
        <h2>Your Cart</h2>
        <div className={styles.productContainer}>
          {cartItems.map((item, index) => (
            <div key={`${item.Product_id}-${index}`} className={styles.cartItem}>
              <div className={styles.productInfo}>
                <img
                  className={styles.productImg}
                  src={process.env.REACT_APP_IMAGE_PATH + `/${item.imageName}`}
                  alt={item.Name}
                />
                <span className={styles.productName}>{item.Name}</span>
                <span className={styles.productPrice}>${item.Price}</span>
              </div>
              <div className={styles.quantityContainer}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => updateQuantity(item.Product_id, (item.quantity || 1) - 1)}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity || 1}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => updateQuantity(item.Product_id, (item.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemove(item.Product_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className={styles.cartTotal}>
          <span>Total</span>
          <span className={styles.calculateTotal}>${calculateCartTotal()}</span>
        </div>
        {showCheckout && (
          <Elements>
            <Checkout cartItems={cartItems} setShowCheckout={setShowCheckout} />
          </Elements>
        )}
        <button className={styles.checkoutBtn} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
