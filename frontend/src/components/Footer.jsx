import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

// Page: All Pages
const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt='logo'/>
                <p className='w-full md:w-2/3 text-gray-600'>
                Your one-stop shop for the best products and exclusive deals! Join our community and stay updated with the latest arrivals, special discounts, and more.
                </p>
            </div>
            
            <div>
                <p className="text-xl font-medium mb-5">Cartix</p>
                <ul className="flex flex-col text-gray-600 gap-1">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
        
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col text-gray-600 gap-1">
                    <li>+(415) 555-0132</li>
                    <li>Cartix@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* </div> */}
            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                Copyright 2024@ Cartix.com - All Right Reserved.
                </p>
            </div>
    </div>
    
  )
}

export default Footer