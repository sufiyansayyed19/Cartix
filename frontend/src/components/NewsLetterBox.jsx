import React from 'react'

// Page: Home
const NewsletterBox = () => {

  return (
    <div className="text-center">
       {/* Text area  */}
        <p className="text-2xl font-medium text-gray-800">
        Subscribe to our newsletter and get 25% off your first order!
        </p>
        <p className="text-gray-500 mt-3">
        Stay updated on new arrivals, exclusive sales, and the latest promotions. Don't miss out on exciting offers!
        </p>

      {/* Email Submission */}
        <form onClick={(e) => e.preventDefault()} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type='email' placeholder='Enter your email' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 active:bg-white active:text-black'>SUBSCRIBE  </button>
        </form>

    </div>
  )
}

export default NewsletterBox