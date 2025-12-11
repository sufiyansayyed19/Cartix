import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[category, subCategory, search, showSearch, products]
  )

  useEffect(()=>{
    sortProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t'>

      {/* Filter Sidebar */}
      <div className='min-w-64'>
        
        {/* Filter Header */}
        <div 
          onClick={()=> setShowFilter(!showFilter)} 
          className='flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors sm:bg-transparent sm:px-0 sm:hover:bg-transparent'
        >
          <div className='flex items-center gap-2'>
            <SlidersHorizontal className='w-5 h-5' />
            <span className='text-lg font-semibold'>Filters</span>
          </div>
          <ChevronDown className={`w-5 h-5 sm:hidden transition-transform ${showFilter ? 'rotate-180': ''}`} />
        </div>

        {/* Active Filters Display */}
        {(category.length > 0 || subCategory.length > 0) && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {category.map((cat) => (
              <span key={cat} className='inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full'>
                {cat}
                <X className='w-3 h-3 cursor-pointer' onClick={() => toggleCategory({ target: { value: cat } })} />
              </span>
            ))}
            {subCategory.map((sub) => (
              <span key={sub} className='inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs rounded-full'>
                {sub}
                <X className='w-3 h-3 cursor-pointer' onClick={() => toggleSubcategory({ target: { value: sub } })} />
              </span>
            ))}
          </div>
        )}

        {/* Category Filter */}
        <div className={`mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='px-4 py-3 bg-gray-50 border-b border-gray-200'>
              <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>Categories</h3>
            </div>
            <div className='p-4 space-y-3'>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleCategory} 
                  type='checkbox' 
                  value='Men'
                  checked={category.includes('Men')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Men</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleCategory} 
                  type='checkbox' 
                  value='Women'
                  checked={category.includes('Women')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Women</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleCategory} 
                  type='checkbox' 
                  value='Kids'
                  checked={category.includes('Kids')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Kids</span>
              </label>
            </div>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
            <div className='px-4 py-3 bg-gray-50 border-b border-gray-200'>
              <h3 className='text-sm font-semibold text-gray-900 uppercase tracking-wide'>Type</h3>
            </div>
            <div className='p-4 space-y-3'>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleSubcategory} 
                  type='checkbox' 
                  value='Topwear'
                  checked={subCategory.includes('Topwear')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Topwear</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleSubcategory} 
                  type='checkbox' 
                  value='Bottomwear'
                  checked={subCategory.includes('Bottomwear')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Bottomwear</span>
              </label>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <input 
                  onChange={toggleSubcategory} 
                  type='checkbox' 
                  value='Winterwear'
                  checked={subCategory.includes('Winterwear')}
                  className='w-4 h-4 rounded border-gray-300 text-black focus:ring-2 focus:ring-black cursor-pointer'
                />
                <span className='text-sm text-gray-700 group-hover:text-black transition-colors'>Winterwear</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='flex-1'>
        {/* Header with Title and Sort */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
          <div>
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            <p className='text-sm text-gray-600 mt-1'>
              Showing {filterProducts.length} {filterProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          {/* Modern Sort Dropdown */}
          <div className='relative'>
            <select 
              onChange={(e)=> setSortType(e.target.value)} 
              className='appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all cursor-pointer'
            >
              <option value='relevant'>Sort by: Relevant</option>
              <option value='low-high'>Price: Low to High</option>
              <option value='high-low'>Price: High to Low</option>
            </select>
            <ChevronDown className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none' />
          </div>
        </div>
      
        {/* Products Grid */}
        {filterProducts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='w-20 h-20 mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
              <SlidersHorizontal className='w-10 h-10 text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>No products found</h3>
            <p className='text-gray-600 mb-4'>Try adjusting your filters to see more results</p>
            {(category.length > 0 || subCategory.length > 0) && (
              <button 
                onClick={() => {setCategory([]); setSubCategory([]);}}
                className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.map((item, index) => (
              <ProductItem 
                key={index} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Collection;