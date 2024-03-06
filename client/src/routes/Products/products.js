import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./products.module.css";

// Product component
const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.Product_id}`} className={styles.productLink}>
      <div className={styles.product}>
        <h3>{product.Name}</h3>
        <div className={styles.imageContainer}>
          <img
            src={process.env.REACT_APP_IMAGE_PATH + `/${product.imageName}`}
            alt={`Product: ${product.Name}`}
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.detailsLink}>View Details</div>
        </div>
      </div>
    </Link>
  );
};

// ProductList component
const ProductList = ({ title, type }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = `http://localhost:4000/products`;

    if (type) {
      url += `?type=${type}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Invalid data received from server');
        }
      })
      .catch((error) => {
        setError('Failed to fetch products');
      });
  }, [type]);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
  const [currentType, setCurrentType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleTypeChange = (type) => {
    setCurrentType(type);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showDropdown && !event.target.closest(`.${styles.dropdown}`)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <div className={`${styles.pageContainer} ${styles.products}`}>
      <h1 className={styles.h1}>List of Products</h1>

      {/* Dropdown menu */}
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={toggleDropdown}>
          Filter Products
        </button>
        {showDropdown && (
          <div className={styles.dropdownContent}>
            <div onClick={() => handleTypeChange("")}>
              All
            </div>
            <div onClick={() => handleTypeChange("soap")}>
              Soaps
            </div>
            <div onClick={() => handleTypeChange("candle")}>
              Candles
            </div>
          </div>
        )}
      </div>

      {/* Product list */}
      <ProductList type={currentType} />
    </div>
  );
};

export default Products;
