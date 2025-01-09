import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    // console.log(products);

    useEffect( ()=>{
        setLatestProducts(products.slice(0,10));
    }, [])



  return (
    
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Step into the spotlight with our hottest new arrivals! From chic designs to must-have essentials, 
                our latest collection is here to add that wow factor to your style. Don't just keep up with trends—set them!
            </p>
        </div>
    
        {/* Rendering Produts */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            latestProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          }
        </div>

    
    </div>

    

  )
}

export default LatestCollection