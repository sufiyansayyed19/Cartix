import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import ClipLoader from "react-spinners/ClipLoader"; // From react-spinners (optional)

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try{
      setIsLoading(true); // Show loading spinner
      const formData = new FormData();

      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestSeller", bestSeller);

      formData.append("sizes",JSON.stringify(sizes)); // array can't be sent in fromData we have to send it as a string

      image1 && formData.append("image1",image1); 
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);
      //Above is a short-circuit operator means sec expression only will be executed if image1 is true

      // console.log('FormData BestSeller:', formData.get("bestSeller")); 

      const response = await axios.post(backendUrl + "/api/product/add",formData, {headers:{token  }});

      // console.log(response);
      if (response.data.success){
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
      }

      } catch(error){
        console.log(error);
        toast.error(error.message);
      } finally {
        setIsLoading(false); // Hide loading spinner
      }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className='mb-2'>Upload Image</p>
        
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-24 cursor-pointer' src={!image1? assets.upload_area: URL.createObjectURL(image1)} alt=''/>
            <input onChange={(e)=> setImage1(e.target.files[0])} type='file' id='image1' hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-24 cursor-pointer' src={!image2? assets.upload_area: URL.createObjectURL(image2)} alt=''/>
            <input onChange={(e)=> setImage2(e.target.files[0])} type='file' id='image2' hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-24 cursor-pointer' src={!image3? assets.upload_area: URL.createObjectURL(image3)} alt=''/>
            <input onChange={(e)=> setImage3(e.target.files[0])} type='file' id='image3' hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-24 cursor-pointer' src={!image4? assets.upload_area: URL.createObjectURL(image4)} alt=''/>
            <input onChange={(e)=> setImage4(e.target.files[0])} type='file' id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='write content here' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product catagoty</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub catagoty</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winter">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120]' type='Number' placeholder='25' />
        </div>
      </div> 

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div className={`${sizes.includes("S")? "bg-black text-white":"bg-slate-200"}`} onClick={()=> setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
            <p className=' px-3 py-1 cursor-pointer'>S</p>
          </div>

          <div className={`${sizes.includes("M")? "bg-black text-white":"bg-slate-200"}`} onClick={()=> setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
            <p className='px-3 py-1 cursor-pointer'>M</p>
          </div>

          <div className={`${sizes.includes("L")? "bg-black text-white":"bg-slate-200"}`} onClick={()=> setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
            <p className='px-3 py-1 cursor-pointer'>L</p>
          </div>

          <div className={`${sizes.includes("XL")? "bg-black text-white":"bg-slate-200"}`} onClick={()=> setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
            <p className='px-3 py-1 cursor-pointer'>XL</p>
          </div>

          <div className={`${sizes.includes("XXL")? "bg-black text-white":"bg-slate-200"}`} onClick={()=> setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
            <p className='px-3 py-1 cursor-pointer'>XXL</p>
          </div>

        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={()=> setBestSeller(prev=> !prev)} type='checkbox' id="bestSeller" />
          <label className='cursor-pointer' htmlFor='bestSeller'>Add to bestseller</label>
        </div>

        <button
          type="submit"
          className={`w-28 py-3 mt-4 bg-black text-white ${
            isLoading ? "opacity-50 cursor-not-allowed" : "active:bg-white active:text-black"
          }`}
          disabled={isLoading} // Disable button while loading
        >
  {isLoading ? "Adding..." : "ADD"}
</button>

      </div> 
    </form>
  
  
  )
}
export default Add