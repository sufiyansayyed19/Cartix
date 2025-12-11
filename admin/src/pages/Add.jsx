import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { Upload } from 'lucide-react';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // keep as string for controlled input
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Create and revoke previews to avoid memory leaks
  useEffect(() => {
    if (!image1) {
      setPreview1(null);
      return;
    }
    const url = URL.createObjectURL(image1);
    setPreview1(url);
    return () => URL.revokeObjectURL(url);
  }, [image1]);

  useEffect(() => {
    if (!image2) {
      setPreview2(null);
      return;
    }
    const url = URL.createObjectURL(image2);
    setPreview2(url);
    return () => URL.revokeObjectURL(url);
  }, [image2]);

  useEffect(() => {
    if (!image3) {
      setPreview3(null);
      return;
    }
    const url = URL.createObjectURL(image3);
    setPreview3(url);
    return () => URL.revokeObjectURL(url);
  }, [image3]);

  useEffect(() => {
    if (!image4) {
      setPreview4(null);
      return;
    }
    const url = URL.createObjectURL(image4);
    setPreview4(url);
    return () => URL.revokeObjectURL(url);
  }, [image4]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token: token || "",
            // If your backend requires multipart/form-data header, axios will set the correct boundary automatically when you omit Content-Type here.
          },
        }
      );

      if (response.data?.success) {
        toast.success(response.data.message || "Product added");
        // reset form
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
      } else {
        toast.error(response.data?.message || "Could not add product");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to toggle sizes
  const toggleSize = (s) => {
    setSizes((prev) => (prev.includes(s) ? prev.filter((it) => it !== s) : [...prev, s]));
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">
      <div className="w-full">
        <p className="mb-3 text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Upload size={20} strokeWidth={2} />
          Upload Images
        </p>

        <div className="flex gap-3">
          <label htmlFor="image1" className="cursor-pointer">
            <img className="w-24" src={preview1 || assets.upload_area} alt="" />
            <input
              accept="image/*"
              onChange={(e) => setImage1(e.target.files?.[0] ?? null)}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2" className="cursor-pointer">
            <img className="w-24" src={preview2 || assets.upload_area} alt="" />
            <input
              accept="image/*"
              onChange={(e) => setImage2(e.target.files?.[0] ?? null)}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3" className="cursor-pointer">
            <img className="w-24" src={preview3 || assets.upload_area} alt="" />
            <input
              accept="image/*"
              onChange={(e) => setImage3(e.target.files?.[0] ?? null)}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4" className="cursor-pointer">
            <img className="w-24" src={preview4 || assets.upload_area} alt="" />
            <input
              accept="image/*"
              onChange={(e) => setImage4(e.target.files?.[0] ?? null)}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            min="0"
            step="0.01"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((s) => (
            <div
              key={s}
              className={`${sizes.includes(s) ? "bg-black text-white" : "bg-slate-200"} rounded`}
              onClick={() => toggleSize(s)}
            >
              <p className="px-3 py-1 cursor-pointer">{s}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2 items-center">
          <input onChange={() => setBestSeller((prev) => !prev)} checked={bestSeller} type="checkbox" id="bestSeller" />
          <label className="cursor-pointer" htmlFor="bestSeller">Add to bestseller</label>
        </div>

        <button
          type="submit"
          className={`w-28 py-3 mt-4 bg-black text-white ${isLoading ? "opacity-50 cursor-not-allowed" : "active:bg-white active:text-black"}`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </div>
    </form>
  );
};

Add.propTypes = {
  token: PropTypes.string,
};

export default Add;
