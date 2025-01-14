import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
       <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center'>
    <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt='' />
    <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Visit Us at Our Store</p>
        <p className='text-gray-500'>1234 Fashion Ave, Suite 567 <br /> New York, NY 10001, USA</p>
        <p className='text-gray-500'>Phone: (123) 456-7890 <br /> Email: support@cartix.com</p>
        <p className='font-semibold text-xl text-gray-600'>Careers at Cartix</p>
        <p className='text-gray-500'>Discover exciting career opportunities and join our passionate team.</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Job Openings</button>
    </div>
</div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact