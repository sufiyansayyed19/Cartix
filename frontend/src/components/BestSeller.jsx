import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

// Pages: Home

const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [ bestSeller, SetBestSeller ] = useState([]);

    useEffect (()=>{
        const bestProducts = products.filter(item => item.bestseller);
        // console.log(bestProducts)
        SetBestSeller(bestProducts.slice(0,5));
    },[]);


  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Meet our crowd favorites! These bestsellers are flying off the shelves and are loved by customers everywhere. 
                From timeless classics to trendy picks, grab them before they're gone!
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {bestSeller.map((product, index) => (
            <ProductItem
                key={index}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
            />
            ))}
        </div>
    </div>
  )
}

export default BestSeller