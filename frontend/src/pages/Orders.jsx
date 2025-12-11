import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

const Orders = () => {

  const { backendUrl, token, currency  } = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () =>{
    try {
      setLoading(true);
      if (!token) {
        setLoading(false);
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}});
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        });
        // console.log(allOrdersItem);
        setOrderData(allOrdersItem.reverse()); // reverse to show latest order on top
      }
      setLoading(false);
    } catch (error){
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    } 
  }

  // Get status icon and color
  const getStatusDisplay = (status) => {
    switch(status) {
      case 'Order Placed':
        return { icon: <Package className="w-5 h-5" />, color: 'bg-blue-500', text: 'Order Placed' };
      case 'Packing':
        return { icon: <Clock className="w-5 h-5" />, color: 'bg-yellow-500', text: 'Packing' };
      case 'Shipped':
        return { icon: <Truck className="w-5 h-5" />, color: 'bg-purple-500', text: 'Shipped' };
      case 'Out for delivery':
        return { icon: <Truck className="w-5 h-5" />, color: 'bg-orange-500', text: 'Out for Delivery' };
      case 'Delivered':
        return { icon: <CheckCircle className="w-5 h-5" />, color: 'bg-green-500', text: 'Delivered' };
      default:
        return { icon: <Package className="w-5 h-5" />, color: 'bg-gray-500', text: status };
    }
  }

  useEffect(()=>{
    loadOrderData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token]
  )

  if (loading) {
    return (
      <div className='border-t pt-16 min-h-screen'>
        <div className='text-2xl mb-8'>
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-16 min-h-screen'>
        
        <div className='text-2xl mb-8'>
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        {orderData.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16'>
            <Package className='w-20 h-20 text-gray-300 mb-4' />
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Orders Yet</h3>
            <p className='text-gray-500 mb-6'>Looks like you haven&apos;t placed any orders yet.</p>
            <button 
              onClick={() => window.location.href = '/collection'}
              className='px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {
              orderData.map((item, index)=>{
                const statusDisplay = getStatusDisplay(item.status);
                return (
                  <div key={index} className='bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden'>
                    <div className='p-4 sm:p-6'>
                      <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
                        {/* Product Image and Details */}
                        <div className='flex items-start gap-4 flex-1'>
                          <img 
                            className='w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border' 
                            src={item.image[0]} 
                            alt={item.name}
                          />
                          <div className='flex-1 min-w-0'>
                            <h3 className='font-semibold text-gray-900 text-base sm:text-lg mb-2 truncate'>
                              {item.name}
                            </h3>
                            <div className='flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600'>
                              <div className='flex items-center gap-1'>
                                <span className='font-medium text-gray-900'>{currency}{item.price}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <span className='text-gray-500'>Qty:</span>
                                <span className='font-medium'>{item.quantity}</span>
                              </div>
                              <div className='flex items-center gap-1'>
                                <span className='text-gray-500'>Size:</span>
                                <span className='font-medium'>{item.size}</span>
                              </div>
                            </div>
                            <div className='mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500'>
                              <p>
                                <span className='font-medium'>Order Date:</span>{' '}
                                {new Date(item.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                              <p>
                                <span className='font-medium'>Payment:</span>{' '}
                                {item.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </div>  

                        {/* Status and Actions */}
                        <div className='flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-48'>
                          <div className='flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg'>
                            <div className={`${statusDisplay.color} text-white p-2 rounded-full`}>
                              {statusDisplay.icon}
                            </div>
                            <div>
                              <p className='text-xs text-gray-500'>Status</p>
                              <p className='text-sm font-semibold text-gray-900'>{statusDisplay.text}</p>
                            </div>
                          </div>
                          <button 
                            onClick={loadOrderData} 
                            className='w-full sm:w-auto lg:w-full px-4 py-2 border-2 border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-black hover:text-black transition-colors'
                          >
                            Refresh Status
                          </button>
                        </div>  
                      </div>
                    </div>

                    {/* Payment Status Badge */}
                    {item.payment && (
                      <div className='px-4 sm:px-6 py-2 bg-green-50 border-t border-green-100'>
                        <p className='text-sm text-green-700'>
                          <span className='font-semibold'>✓</span> Payment Confirmed
                        </p>
                      </div>
                    )}
                  </div>
                )
              })
            }
          </div>
        )}

    </div>
  )
}

export default Orders