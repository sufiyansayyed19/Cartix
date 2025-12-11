import PropTypes from "prop-types";
import { useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Shield, Mail, Lock, LogIn } from 'lucide-react'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                setToken(response.data.token);
                toast.success('Welcome back, Admin!');
            } else {
                toast.error(response.data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || "Unable to connect to the server.";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200'>
            {/* Background decorative elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
                <div className='absolute top-40 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
            </div>

            {/* Login Card */}
            <div className='relative bg-white shadow-2xl rounded-2xl px-10 py-12 max-w-md w-full mx-4 border border-gray-100'>
                {/* Logo/Icon */}
                <div className='flex justify-center mb-6'>
                    <div className='bg-gradient-to-br from-gray-900 to-gray-700 p-4 rounded-2xl shadow-lg'>
                        <Shield className='w-12 h-12 text-white' strokeWidth={2} />
                    </div>
                </div>

                {/* Header */}
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>Cartix Admin Panel</h1>
                    <p className='text-gray-500 text-sm'>Sign in to access the dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={onSubmitHandler} className='space-y-6'>
                    {/* Email Field */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Mail className='h-5 w-5 text-gray-400' />
                            </div>
                            <input 
                                onChange={(e)=> setEmail(e.target.value)} 
                                value={email}
                                className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all' 
                                type="email" 
                                placeholder='admin@cartix.com'
                                required 
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>
                            Password
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Lock className='h-5 w-5 text-gray-400' />
                            </div>
                            <input 
                                onChange={(e)=> setPassword(e.target.value)} 
                                value={password}
                                className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all' 
                                type="password" 
                                placeholder='••••••••'
                                required 
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button 
                        type='submit'
                        disabled={isLoading}
                        className='w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {isLoading ? (
                            <>
                                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <LogIn className='w-5 h-5' />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className='mt-8 text-center'>
                    <p className='text-xs text-gray-500'>
                        Protected by enterprise-grade security
                    </p>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
