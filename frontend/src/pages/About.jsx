import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Cartix – where fashion meets innovation! Born from a passion for style and beauty, Cartix is your ultimate destination to explore the latest trends and beauty essentials, all from the comfort of your home.</p>
        <p>At Cartix, we believe that shopping should be an experience, not a chore. That's why we've handpicked an exclusive collection of high-quality fashion cloths, beauty, and skincare products designed to elevate your look and lifestyle. Whether you're looking for that perfect outfit, skincare miracle, or beauty must-have, Cartix brings you the best from top brands and trusted suppliers.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission at Cartix is simple: to empower you with effortless access to the latest styles and beauty solutions, all while providing a shopping experience that is as smooth as it is exciting. From browsing to checkout, we’re here to make your shopping journey unforgettable.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Uncompromising Quality:</b>
            <p className='text-gray-600'>At Cartix, we carefully curate and test every product to ensure it meets the highest standards of quality, so you can shop with confidence.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Effortless Convenience:</b>
            <p className='text-gray-600'>Our intuitive interface and seamless checkout process make shopping with us a breeze—your perfect items are just a few clicks away!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Dedicated Customer Support:</b>
            <p className='text-gray-600'>Our friendly and professional support team is here to assist you every step of the way, ensuring your complete satisfaction with every purchase.</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}   

export default About