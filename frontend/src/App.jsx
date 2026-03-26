import './App.css'
import Products from "./components/product/Products.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home/home.jsx";
import NavBar from "./components/shared/NavBar.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import {Toaster} from "react-hot-toast";
import React from "react";
import Cart from "./components/cart/Cart.jsx";
import Login from "./components/auth/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./components/auth/Register.jsx";
import Checkout from "./components/checkout/Checkout.jsx";

function App() {


  return (
      <React.Fragment>
          <Router>
              <NavBar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/contact" element={<Contact/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/" element={<PrivateRoute />} >
                  <Route path="/checkout" element={<Checkout />}/>
                  </Route>

                  <Route path="/" element={<PrivateRoute publicPage />} >
                  <Route path="/register" element={<Register />}/>
                  </Route>
              </Routes>
          </Router>
          <Toaster position={"top-center"}/>
      </React.Fragment>
  )
}

export default App
