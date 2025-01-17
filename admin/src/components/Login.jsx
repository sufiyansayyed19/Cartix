import React, { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
    
            // Sending login request
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
    
            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Unable to connect to the server.";
            toast.error(message);
        }
    };
    


  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                    <input onChange={(e)=> setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
                </div>

                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input onChange={(e)=> setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='your@email.com' required />
                </div>

                <button onClick={onSubmitHandler} className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:text-black active:bg-white' type='submit'> Login </button>
                
            </form>
        </div>
    </div>
  )
}

export default Login