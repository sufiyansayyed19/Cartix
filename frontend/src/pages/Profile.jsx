import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';
import { User, Mail, Calendar, ShoppingBag, MapPin, Phone } from 'lucide-react';

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [orderStats, setOrderStats] = useState({ total: 0, pending: 0, delivered: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch user profile data
  const loadUserProfile = async () => {
    try {
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('Fetching user profile from:', backendUrl + '/api/user/profile');
      
      // Fetch user profile data
      const profileResponse = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
      
      console.log('Profile response:', profileResponse.data);

      if (profileResponse.data.success) {
        const user = profileResponse.data.user;
        setUserData({
          name: user.name || 'User',
          email: user.email || 'Not provided',
          phone: user.phone || 'Not provided',
          address: user.address || 'Not provided',
          joinedDate: user.createdAt || new Date().toISOString()
        });
        
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          address: user.address || ''
        });
      }

      // Get user orders to calculate stats
      console.log('Fetching user orders from:', backendUrl + '/api/order/userorders');
      const ordersResponse = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      
      console.log('Orders response:', ordersResponse.data);

      if (ordersResponse.data.success) {
        const orders = ordersResponse.data.orders;
        setOrderStats({
          total: orders.length,
          pending: orders.filter(order => order.status === 'Order Placed' || order.status === 'Packing').length,
          delivered: orders.filter(order => order.status === 'Delivered').length
        });
      }

    } catch (error) {
      console.error('Error loading profile:', error);
      console.error('Error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || 'Failed to load profile');
      // Set default data even on error
      setUserData({
        name: 'User',
        email: 'Not available',
        phone: 'Not provided',
        address: 'Not provided',
        joinedDate: new Date().toISOString()
      });
    }
  };

  useEffect(() => {
    loadUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Updating profile with data:', formData);
      
      const response = await axios.post(
        backendUrl + '/api/user/profile/update',
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address
        },
        { headers: { token } }
      );
      
      console.log('Update response:', response.data);
      
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        // Reload profile data
        loadUserProfile();
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!userData) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl mb-8'>
          <Title text1={'MY'} text2={'PROFILE'} />
        </div>
        <div className='flex justify-center items-center h-64'>
          <p className='text-gray-500'>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t pt-16 min-h-screen'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {/* Stats Cards */}
        <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-90'>Total Orders</p>
              <p className='text-3xl font-bold mt-2'>{orderStats.total}</p>
            </div>
            <ShoppingBag className='w-12 h-12 opacity-80' />
          </div>
        </div>

        <div className='bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-lg shadow-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-90'>Pending Orders</p>
              <p className='text-3xl font-bold mt-2'>{orderStats.pending}</p>
            </div>
            <ShoppingBag className='w-12 h-12 opacity-80' />
          </div>
        </div>

        <div className='bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm opacity-90'>Delivered</p>
              <p className='text-3xl font-bold mt-2'>{orderStats.delivered}</p>
            </div>
            <ShoppingBag className='w-12 h-12 opacity-80' />
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className='bg-white border rounded-lg shadow-sm p-6 md:p-8'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold text-gray-800'>Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className='px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition-colors'
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {!isEditing ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <User className='w-5 h-5 text-gray-600' />
              <div>
                <p className='text-sm text-gray-500'>Full Name</p>
                <p className='font-medium text-gray-800'>{userData.name}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <Mail className='w-5 h-5 text-gray-600' />
              <div>
                <p className='text-sm text-gray-500'>Email Address</p>
                <p className='font-medium text-gray-800'>{userData.email || 'Not provided'}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <Phone className='w-5 h-5 text-gray-600' />
              <div>
                <p className='text-sm text-gray-500'>Phone Number</p>
                <p className='font-medium text-gray-800'>{userData.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <MapPin className='w-5 h-5 text-gray-600' />
              <div>
                <p className='text-sm text-gray-500'>Address</p>
                <p className='font-medium text-gray-800'>{userData.address || 'Not provided'}</p>
              </div>
            </div>

            <div className='flex items-center gap-4 p-4 bg-gray-50 rounded-lg'>
              <Calendar className='w-5 h-5 text-gray-600' />
              <div>
                <p className='text-sm text-gray-500'>Member Since</p>
                <p className='font-medium text-gray-800'>
                  {userData.joinedDate ? new Date(userData.joinedDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                readOnly
                disabled
                className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed'
                title='Email cannot be changed'
              />
              <p className='text-xs text-gray-500 mt-1'>Email cannot be changed for security reasons</p>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
              <input
                type='tel'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Address</label>
              <textarea
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                rows='3'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
              />
            </div>

            <div className='flex gap-4 pt-4'>
              <button
                type='submit'
                className='flex-1 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Save Changes
              </button>
              <button
                type='button'
                onClick={() => setIsEditing(false)}
                className='flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Quick Actions */}
      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <button
          onClick={() => navigate('/orders')}
          className='p-4 border-2 border-gray-200 rounded-lg hover:border-black transition-colors text-left'
        >
          <ShoppingBag className='w-6 h-6 mb-2' />
          <h3 className='font-semibold'>View All Orders</h3>
          <p className='text-sm text-gray-600'>Track and manage your orders</p>
        </button>

        <button
          onClick={() => navigate('/collection')}
          className='p-4 border-2 border-gray-200 rounded-lg hover:border-black transition-colors text-left'
        >
          <ShoppingBag className='w-6 h-6 mb-2' />
          <h3 className='font-semibold'>Continue Shopping</h3>
          <p className='text-sm text-gray-600'>Explore our latest collection</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
