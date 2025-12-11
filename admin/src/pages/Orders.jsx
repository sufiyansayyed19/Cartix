import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Package2, MapPin, Phone, Calendar, DollarSign } from 'lucide-react';
import PropTypes from 'prop-types';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]); // re-run when token changes

  return (
    <div>
      <h3 className='mb-4 text-2xl font-semibold text-gray-800 flex items-center gap-2'>
        <Package2 size={24} strokeWidth={2} />
        Orders Management
      </h3>
      <div>
        {orders.map((order) => (
          <div
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 rounded-lg p-5 md:p-6 my-3 md:my-4 text-xs sm:text-sm text-gray-700 hover:shadow-md transition-shadow bg-white'
            key={order._id}
          >
            <div className='flex items-center justify-center'>
              <div className='w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center'>
                <Package2 className='text-blue-600' size={28} strokeWidth={2} />
              </div>
            </div>

            <div>
              <div className='bg-gray-50 p-3 rounded-md mb-3'>
                <p className='font-semibold text-gray-800 mb-2'>Order Items:</p>
                {order.items.map((item, idx) => (
                  <p className='py-0.5 text-gray-700' key={idx}>
                    {item.name} <span className='font-semibold'>x {item.quantity}</span>{' '}
                    <span className='text-xs bg-gray-200 px-2 py-0.5 rounded'>{item.size}</span>
                  </p>
                ))}
              </div>

              <p className='font-semibold text-gray-800 mb-2'>{`${order.address.firstName} ${order.address.lastName}`}</p>

              <div className='flex items-start gap-2 text-gray-600'>
                <MapPin size={16} className='mt-0.5 flex-shrink-0' />
                <div>
                  <p>{`${order.address.street},`}</p>
                  <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                </div>
              </div>

              <div className='flex items-center gap-2 mt-2 text-gray-600'>
                <Phone size={16} />
                <p>{order.address.phone}</p>
              </div>
            </div>

            <div className='space-y-2'>
              <p className='text-sm sm:text-[15px] font-medium'><span className='text-gray-600'>Items:</span> {order.items.length}</p>
              <p className='text-sm'><span className='text-gray-600'>Method:</span> <span className='font-medium'>{order.paymentMethod}</span></p>
              <p className='text-sm'><span className='text-gray-600'>Payment:</span> <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-600'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
              <div className='flex items-center gap-1 text-sm'>
                <Calendar size={14} className='text-gray-600' />
                <p>{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <DollarSign size={18} className='text-green-600' />
              <p className='text-base sm:text-lg font-bold text-gray-800'>{currency}{order.amount}</p>
            </div>

            <select
              onChange={(e) => { statusHandler(e, order._id); }}
              value={order.status}
              className='p-2.5 font-medium border border-gray-300 rounded-lg bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string,
};

export default Orders;
