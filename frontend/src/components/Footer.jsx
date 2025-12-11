import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'

// Page: All Pages
const Footer = () => {
  return (
    <footer className='bg-black text-white w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-20'>
        <div className='px-8 sm:px-12 md:px-16 lg:px-20 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                
                {/* Company Info Section */}
                <div className='lg:col-span-2'>
                    <img src={assets.logo} className='mb-5 w-36 brightness-0 invert' alt='Cartix logo'/>
                    <p className='text-gray-400 leading-relaxed max-w-md'>
                        Your one-stop shop for the best products and exclusive deals! Join our community and stay updated with the latest arrivals, special discounts, and more.
                    </p>
                </div>
                
                {/* Quick Links Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">Cartix</h3>
                    <ul className="flex flex-col text-gray-400 gap-2">
                        <li>
                            <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-white transition-colors duration-200">About us</Link>
                        </li>
                        <li>
                            <Link to="/collection" className="hover:text-white transition-colors duration-200">Delivery</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-white transition-colors duration-200">Privacy policy</Link>
                        </li>
                    </ul>
                </div>
            
                {/* Contact Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">GET IN TOUCH</h3>
                    <ul className="flex flex-col text-gray-400 gap-3">
                        <li className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                            <Phone size={16} />
                            <a href="tel:+14155550132">+(415) 555-0132</a>
                        </li>
                        <li className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                            <Mail size={16} />
                            <a href="mailto:Cartix@gmail.com">Cartix@gmail.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            
            {/* Copyright Section */}
            <div className='mt-10 pt-8 border-t border-gray-800'>
                <p className="text-sm text-center text-gray-500">
                    Copyright {new Date().getFullYear()}@ Cartix.com - All Right Reserved.
                </p>
            </div>
        </div>
    </footer>
    
  )
}

export default Footer