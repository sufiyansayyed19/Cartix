import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Cart = lazy(() => import('./pages/Cart'));
const Product = lazy(() => import('./pages/Product'));
const Collection = lazy(() => import('./pages/Collection'));
const Login = lazy(() => import('./pages/Login'));
const Contact = lazy(() => import('./pages/Contact'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Orders = lazy(() => import('./pages/Orders'));
const Profile = lazy(() => import('./pages/Profile'));
const Verify = lazy(() => import('./pages/Verify'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const LoadingSpinner = () => (
  <div className='flex items-center justify-center min-h-[60vh]'>
    <div className='flex flex-col items-center gap-4'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      <p className='text-gray-600 text-sm'>Loading...</p>
    </div>
  </div>
);

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/verify" element={<Verify/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
      <Footer/>
    </div>
  )
}

export default App