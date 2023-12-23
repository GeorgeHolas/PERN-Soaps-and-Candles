import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../routes/Login/login';
import Registration from '../routes/Register/register'; 
import Home from '../routes/Home/home';
import NavigationBar from './NavigationBar/NavigationBar';
import Products from '../routes/Products/products';
import ProductDetails from '../routes/ProductDetails/ProductDetails';

function App() {
  return (
    <Router>  
      <NavigationBar />  
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Products/:Product_id" element={<ProductDetails />} /> 
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;