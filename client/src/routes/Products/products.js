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
  console.log("Category in ProductList:", category); // Log the category prop

  const [products, setProducts] = useState([]);

  // Fetch products from the API endpoint
  useEffect(() => {
    let url = `http://localhost:4000/products`;
    
    // If a category is selected, add it to the URL
    if (category && (category === "soaps" || category === "candles")) {
      url += `?category=${category}`;
    }

    console.log("Fetching from URL:", url); // Log the URL

    fetch(url)
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
  const [currentCategory, setCurrentCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setShowDropdown(false); // Close the dropdown after selecting a category
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close the dropdown when clicking outside of it
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
            <div onClick={() => handleCategoryChange("soaps")}>
              Soaps
            </div>
            <div onClick={() => handleCategoryChange("candles")}>
              Candles
            </div>
          </div>
        )}
      </div>
      
      {/* Product list */}
      <ProductList category={currentCategory} />
    </div>
  );
};

export default Products;
