import React, { useEffect, useState , useContext} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
// import { products } from '../assets/frontend_assets/assets';

const Product = () => {
    const { productId } = useParams();
  // console.log(productId); // use params check
  const { products , currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage ] = useState("");
  const [size, setSize] =useState("");

  

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item)
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // const 



  return productData ?(
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

          {/* Product Images */}
            <div className="flex-1 flex flex-col.reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                  {
                    productData.image.map((item,index) =>(
                      <img onClick={()=> setImage(item)} src={item} key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
                    )
                    //see the index.css for hiding scroll bar
                    )
                  }
              </div>
              <div className="w-full sm:w-[80%">
                  <img  className="w-full h-auto" src={image} alt="image" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                <img src={assets.star_icon} alt="rating stars" className="w-3 5" />
                <img src={assets.star_icon} alt="rating stars" className="w-3 5" />
                <img src={assets.star_icon} alt="rating stars" className="w-3 5" />
                <img src={assets.star_icon} alt="rating stars" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="rating stars" className="w-3 5"/>
                <p className="pl-2">(122)</p>
              </div>
              <p className="mt-5 text-3xl font-medium"> {currency}{productData.price}</p>
              <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
              <div className="flex flex-col gap-4 my-8">
                <p> Select-Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((item,index)=>(
                    <button onClick={()=> setSize(item)} className={`border py-2 px-4 ${item == size ? 'text-white bg-black': " bg-gray-100 "} `} key={index} >{item}</button>
                  ))}
                </div>
              </div>
              <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
              onClick={()=> addToCart(productData._id,size)}
              >ADD TO CART</button>
              <hr className="mt-8 sm:w-4/5"/>
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original Product</p>
                <p>Cash on delivery is available on this prodcut</p>
                <p>Easy Return and Exchange Policy within 7 Days</p>
              </div>
            </div>
      </div>
      {/* ------Description & Review Section ----------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm"> Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>This product is crafted with premium quality fabric, ensuring excellent comfort and durability. The breathable material keeps you cool and relaxed, making it ideal for everyday wear. Designed to provide a perfect fit, it complements all body types while offering maximum flexibility for your daily activities.</p>
            <p>Whether you're heading out for casual outings or need a versatile addition to your wardrobe, this product is the perfect choice. Its timeless design and attention to detail make it suitable for pairing with any outfit, offering a blend of style and practicality. Easy to care for and maintain, this is a must-have staple for your collection.</p>
        </div>          
      </div>
      
      {/* Display related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>         

    </div>  
  ): <div className="opacity-0"></div>
} 
export default Product;
