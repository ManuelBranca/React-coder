// App.js
import React from "react";
import Header from "./pages/Header";
import ItemListContainer from "./pages/ItemListContainer";
import Footer from "./pages/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from "./pages/Productos";
import Productoscaros from "./pages/Productoscaros";
import Cart from "./pages/Cart";
import CartProvider from "./context/CartContext";


function App() {
  return (
    <Router>
      <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/Productos" element={<Productos />} /> 
        <Route path="/Productoscaros" element={<Productoscaros />} /> 
        <Route path="/cart" component={Cart} />
      </Routes>
      </CartProvider>
      <Footer />
    </Router>
  );
}

export default App;
