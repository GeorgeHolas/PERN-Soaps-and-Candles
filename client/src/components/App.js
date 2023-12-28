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

  const addToCart = (newItem) => {
    const isItemInCart = cartItems.some((item) => item.Product_id === newItem.Product_id);

    if (!isItemInCart) {
      setCartItems((prevItems) => [...prevItems, newItem]);
      alert('Product added to the cart!');
    } else {
      alert('Product is already in the cart!');
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.Product_id !== productId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.Product_id === productId
        ? { ...item, quantity: newQuantity, totalPrice: item.Price * newQuantity }
        : item
    );
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
        <Route path="/Products/:Product_id" element={<ProductDetails onAddToCart={addToCart} />}/>
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />}/>
      </Routes>
    </Router>
  );
}

export default App;
