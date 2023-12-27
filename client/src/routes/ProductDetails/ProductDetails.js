import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetails.module.css';

const ProductDetails = ({ onAddToCart }) => {
  const { Product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!Product_id) {
          throw new Error('Product ID is missing');
        }

        const response = await axios.get(`http://localhost:4000/products/${Product_id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [Product_id]);

  const handleAddToCart = () => {
    // Ensure onAddToCart is initialized as a function
    onAddToCart = onAddToCart || (() => []);
  
    // Call the function to handle cart logic
    addToCartHandler();
  };
  
  const addToCartHandler = () => {
    // Get the current cart items
    const currentCart = onAddToCart();
  
    // Check if the product is already in the cart
    const isProductInCart = currentCart && currentCart.some && currentCart.some((item) => item.Product_id === product.Product_id);
  
    if (!isProductInCart) {
      // If not in cart, update the cart items
      onAddToCart((prevCartItems) => [...prevCartItems, product]);
      alert('Product added to the cart!');
    } else {
      // If already in cart, show a message
      alert('Product is already in the cart!');
    }
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Product not found state
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetails}>
      <h2>{product.Name}</h2>
      <p>{product.Description}</p>
      <p>Price: ${product.Price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Link to="/checkout">Go to Checkout</Link>
    </div>
  );
};

export default ProductDetails;
