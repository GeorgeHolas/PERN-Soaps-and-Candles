import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
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
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;

