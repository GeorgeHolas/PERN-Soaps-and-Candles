import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetails.module.css';

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addToCartMessage, setAddToCartMessage] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!productId) {
          throw new Error('Product ID is missing');
        }

        const response = await axios.get(`http://localhost:4000/products/${productId}`);
        setProduct({ ...response.data, quantity: 1 });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddToCartMessage('Item added to the cart!');
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
      {addToCartMessage && <p>{addToCartMessage}</p>}
      <Link to="/Products" className={styles.returnLink}></Link>
    </div>
  );
};

export default ProductDetails;
