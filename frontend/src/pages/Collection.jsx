import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
const Collection = () => {
  
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [ filterProducts, setFilterProducts ] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState([]);
  
  
  
  useEffect(()=>{
    setFilterProducts(products)
  },[]);

  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search, showSearch]
  )

  useEffect(()=>{
    sortProducts();
  },[sortType ]
  );

  const toggleCategory = (e) =>{
    if (category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=> item !== e.target.value));
    } else {
      setCategory (prev => [...prev, e.target.value]);
    }
  }

  const toggleSubcategory = (e) =>{
    if (subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () =>{
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
  
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    

    if (subCategory.length > 0){  
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProducts = ()=>{
    let filterProductsCopy = [...filterProducts];

    switch(sortType){
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a,b)=>a.price-b.price));
        break;
      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a,b)=>b.price-a.price));
        break;
      default:
        applyFilter();
        break
  }
  }

// useEffect(()=>{
//   console.log(subCategory);
// },[subCategory]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Option */}
      <div className='min-w-60'>
        
        <p onClick={()=> setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90': ''}`} src={assets.dropdown_icon} alt='dropdown Menu'/>
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-500 pl-5 py-3 mt-6 ${showFilter? " ": "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium '> CATEGORIES</p>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Men'}/> Men
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Women'}/> Women
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleCategory} className='w-3' type='checkbox' value={'Kids'}/> Kids
            </p>
          </div>
        </div>
        {/* SubCategory FIlter */}
        <div className={`border border-gray-500 pl-5 py-3 mt-6 my-5 ${showFilter? " ": "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium '> Collections</p>
          <div className='flex flex-col gap-3 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input onChange={toggleSubcategory} className='w-3' type='checkbox' value={'Topwear'}/> Topwear
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleSubcategory} className='w-3' type='checkbox' value={'Bottomwear'}/> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input onChange={toggleSubcategory} className='w-3' type='checkbox' value={'Winterwear'}/> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right (collection) Side */}
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sorting */}
          <select onChange={(e)=>{setSortType(e.target.value); console.log(e.target.value)}} className='border border-gray-300 text-sm px-2'>
            <option value='relevant'>Sort by: Relevent</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>
      
      {/* Map products */} 
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection;