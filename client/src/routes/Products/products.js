// Products.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./products.module.css";

// Product component
const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.Product_id}`} className={styles.productLink}>
      <div className={styles.product}>
        <div className={styles.imageContainer}>
          <img
            src={process.env.REACT_APP_IMAGE_PATH + `/${product.imageName}`}
            alt={`Product: ${product.Name}`}
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className={styles.productDetails}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <div className={styles.detailsLink}>View Details</div>
        </div>
      </div>
    </Link>
  );
};

// ProductList component
const ProductList = ({ title, category }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from the API endpoint
  useEffect(() => {
    fetch(`http://localhost:4000/products?category=${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  return (
    <div>
      <h2 className={styles.productTitle}>{title}</h2>
      <div className={styles.productcontainer}>
        {products.map((product) => (
          <Product key={product.Product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Products page component
const Products = () => {
  return (
    <div className={`${styles.pageContainer} ${styles.products}`}>
      <h1 className={styles.h1}>List of Products</h1>
      <ProductList category="all" />
    </div>
  );
};

export default Products;
