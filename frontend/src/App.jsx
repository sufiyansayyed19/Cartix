import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Contact from './pages/Contact';
import Home from './pages/Home';
import About from './pages/About';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Collection from './pages/Collection';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-order" element={<PlaceOrder/>} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App