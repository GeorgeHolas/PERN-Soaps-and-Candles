import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../routes/Login/login';
import Registration from '../routes/Register/register'; 
import Home from '../routes/Home/home';
import NavigationBar from './NavigationBar/NavigationBar';
import Products from '../routes/Products/products';
import ProductDetails from '../routes/ProductDetails/ProductDetails';
import Cart from '../routes/Cart/cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.Product_id !== productId);
    setCartItems(updatedCart);
  };

  return (
    <Router>  
      <NavigationBar cartItems={cartItems} />  
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:Product_id" element={<ProductDetails onAddToCart={addToCart} cartItems={cartItems} />}/>
        <Route path="/checkout" element={<Cart cartItems={cartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
      </Routes>
    </Router>
  );
}

export default App;