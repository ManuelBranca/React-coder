// App.js
import React from "react";
import Header from "./pages/Header";
import ItemListContainer from "./pages/ItemListContainer";
import Footer from "./pages/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Productos from "./pages/Productos";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/Productos" element={<Productos />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
