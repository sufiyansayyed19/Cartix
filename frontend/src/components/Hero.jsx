import { useState, useEffect } from 'react';
import image1 from '../assets/image_1.jpg';
import image2 from '../assets/image_2.jpg';
import image3 from '../assets/image_3.jpg';
import image6 from '../assets/image_6.jpg';
import imageFx from '../assets/image_fx_.jpg';

// Page: Home
const Hero = () => {
  const heroImages = [image6, image1, image2, image3, imageFx];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className='flex flex-col sm:flex-row border w-full border-gray-400'>
        {/*Left Side*/}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-semibold text-sm md:text-base tracking-wider'>BEST SELLERS</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed font-normal'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base tracking-wide hover:gap-3 transition-all cursor-pointer'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/*Hero Right Side*/}
        <div className='w-full sm:w-1/2 relative overflow-hidden'>
            <img 
                className='w-full h-full object-cover transition-opacity duration-1000' 
                src={heroImages[currentImageIndex]} 
                alt='Hero fashion'
            />
            {/* Navigation dots */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                                ? 'bg-white w-8' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Hero