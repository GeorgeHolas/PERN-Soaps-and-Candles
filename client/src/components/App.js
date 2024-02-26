import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../routes/Login/login";
import Registration from "../routes/Register/register";
import Home from "../routes/Home/home";
import NavigationBar from "./NavigationBar/NavigationBar";
import Products from "../routes/Products/products";
import ProductDetails from "../routes/ProductDetails/ProductDetails";
import Cart from "../routes/Cart/cart";
import Checkout from "../components/Checkout/checkout";
import PrivateRoute from "./PrivateRoute/privateRoute";
import OrderHistory from "../components/OrderHistory/orderHistory";
import { AuthProvider, useAuth } from "../routes/AuthContext";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated, logout, user } = useAuth(); // Assuming useAuth provides user data

  // For testing, replace this with actual customer ID
  const customerId = user ? user.customerId : ""; // Assuming user has customerId

  // Add item to a cart
  const addToCart = (newItem) => {
    const isItemInCart = cartItems.some(
      (item) => item.Product_id === newItem.Product_id
    );

    if (!isItemInCart) {
      setCartItems((prevItems) => [...prevItems, newItem]);
      alert("Product added to the cart!");
    } else {
      alert("Product is already in the cart!");
    }
  };

  // Remove item from a cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.Product_id !== productId
    );
    setCartItems(updatedCart);
  };

  // Update quantity of a product in a cart
  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.Product_id === productId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: item.Price * newQuantity,
          }
        : item
    );
    setCartItems(updatedCart);
  };

  // Logout
  const handleLogout = () => {
    logout();
    setCartItems([]);
  };

  return (
    <AuthProvider>
      <Router>
        <NavigationBar
          cartItems={cartItems}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/products/*"
            element={
              <PrivateRoute element={<Products addToCart={addToCart} />} />
            }
          />
          <Route
            path="/products/:productId/*"
            element={
              <PrivateRoute
                element={<ProductDetails onAddToCart={addToCart} />}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute
                element={
                  <Cart
                    cartItems={cartItems}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                }
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute element={<Checkout cartItems={cartItems} customerId={customerId} />} />
            }
          />
          <Route
            path="/orders"
            element={<PrivateRoute element={<OrderHistory customerId={customerId} />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
