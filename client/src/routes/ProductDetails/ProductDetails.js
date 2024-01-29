// ProductDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";

// Add products to a cart
const ProductDetails = ({ onAddToCart }) => {
const { productId } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [addToCartMessage, setAddToCartMessage] = useState(null);

// Get product details
useEffect(() => {
  const fetchProductDetails = async () => {
    try {
      if (!productId) {
        throw new Error("Product ID is missing");
      }
      // Get product details from the database
      const response = await axios.get(
        `http://localhost:4000/products/${productId}`
      );
      setProduct({ ...response.data, quantity: 1 });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProductDetails();
}, [productId]);

// Add to cart message
const handleAddToCart = () => {
  onAddToCart(product);
  setAddToCartMessage("Item added to the cart!");
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
  <>
    <div className={styles.mainContainer}>
      <img
        className={styles.productImage}
        src={process.env.REACT_APP_IMAGE_PATH + `/${product.imageName}`}
        alt={`Product: ${product.Name}`}
      />
      <div className={styles.productDetailsContainer}>
        <div className={styles.productDetails}>
          <h2>{product.Name}</h2>
          <p>{product.Description}</p>
        </div>
      </div>
    </div>
    <div className={styles.priceContainer}>
      <p className={styles.price}>Price: ${product.Price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {addToCartMessage && <p className={styles.addToCartMessage}>{addToCartMessage}</p>}
      <Link to="/Products" className={styles.returnLink}>
        <p>Return to Products</p>
      </Link>
    </div>
  </>
);
};

export default ProductDetails;
