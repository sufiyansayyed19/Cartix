import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message || 'Failed to fetch products');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Unable to fetch products');
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token: token || '' } }
      );
      if (response.data.success) {
        toast.success(response.data.message || 'Product removed');
        await fetchList();
      } else {
        toast.error(response.data.message || 'Failed to remove product');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Unable to remove product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-4 text-2xl font-semibold text-gray-800'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gradient-to-r from-gray-100 to-gray-50 text-sm rounded-t-lg'>
          <b className='text-gray-700'>Image</b>
          <b className='text-gray-700'>Name</b>
          <b className='text-gray-700'>Category</b>
          <b className='text-gray-700'>Price</b>
          <b className='text-center text-gray-700'>Action</b>
        </div>

        {list.map((item) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 gap-2 border border-gray-200 text-sm hover:bg-gray-50 transition-colors'
            key={item._id}
          >
            <img
              className='w-12 h-12 object-cover rounded-md border'
              src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : ''}
              alt={item.name || 'product'}
            />
            <p className='font-medium text-gray-700'>{item.name}</p>
            <p className='text-gray-600'>{item.category}</p>
            <p className='font-semibold text-gray-800'>{currency}{item.price}</p>
            <div className='flex justify-center'>
              <button
                onClick={() => removeProduct(item._id)}
                className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200'
                title='Delete product'
              >
                <Trash2 size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

List.propTypes = {
  token: PropTypes.string,
};

export default List;
