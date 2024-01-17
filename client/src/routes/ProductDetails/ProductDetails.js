import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetails.module.css';

const ProductDetails = ({ onAddToCart }) => {
  const { productId } = useParams();  // Change this line
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Link to="/Products" className={styles.returnLink}>Return</Link>
    </div>
  );
};

export default ProductDetails;
