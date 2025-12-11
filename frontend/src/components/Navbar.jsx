import { assets } from '../assets/frontend_assets/assets'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Home, ShoppingBag, Info, Mail } from 'lucide-react';
// import { useOrderStore } from '../store/orderStore';

// Page: All pages

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    // const cartCount = useOrderStore((state) => state.getCartCount());

    const logout = ()=> {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    const handleChange = ()=>{
        setShowSearch(true);
    }


  return (
    // Navbar LOGO
        <div className='flex items-center justify-between py-5 font-medium'>
            
            {/* <button >Click Me</button>  */}
            <Link to='/'>
            {/* <button onClick={console.log('ok')}> */}
            <img  src={assets.logo} alt="logo" className="w-36" />
            {/* </button> */}
            </Link>
            {/* Navigation LINKS */}
            <ul className='hidden sm:flex gap-5 text-base text-gray-700'>

                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p className='font-medium hover:text-black transition-colors'>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p className='font-medium hover:text-black transition-colors'>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p className='font-medium hover:text-black transition-colors'>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p className='font-medium hover:text-black transition-colors'>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

            </ul>    
            {/* Navigation ICONS */}    
            <div className='flex items-center gap-6'>
                <Search onClick={handleChange} className='w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition-colors' strokeWidth={2}/>
                
                <div className='group relative'>
                   <User onClick={()=> token ? null: navigate('/login')} className='w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition-colors' strokeWidth={2}/>
                    {token && 
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col w-36 gap-2 px-5 py-3 bg-slate-100 text-gray-500 rounded">
                            <p onClick={()=> navigate('/profile')} className="cursor-pointer hover:text-black">My Profile</p>
                            <p onClick={()=> navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>}    
                </div>
            
                    {/* cart icon and count <p>  */}
                <Link to="/cart" className = "relative">
                    <ShoppingCart className='w-5 h-5 text-gray-700 hover:text-black transition-colors' strokeWidth={2}/>
                    {getCartCount() > 0 && (
                        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                    )}
                </Link>
                <Menu onClick = {()=> setVisible(true)} className='w-6 h-6 cursor-pointer sm:hidden text-gray-700 hover:text-black transition-colors' strokeWidth={2}/>
            </div>

            {/*Sidebar Menu for small screens*/}
            <div className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white shadow-2xl transition-all duration-300 ${visible ? 'w-full sm:w-80' : 'w-0'}`}>
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-5 border-b bg-gradient-to-r from-gray-50 to-white'>
                        <h2 className='text-xl font-bold text-gray-900'>Menu</h2>
                        <button 
                            onClick={()=> setVisible(false)} 
                            className='p-2 rounded-full hover:bg-gray-100 transition-colors'
                            aria-label='Close menu'
                        >
                            <X className='h-6 w-6 text-gray-700' strokeWidth={2}/>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className='flex-1 overflow-y-auto py-4'>
                        <NavLink 
                            onClick={()=>setVisible(false)} 
                            className={({isActive}) => `flex items-center gap-4 px-6 py-4 transition-all ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                            to="/"
                        >
                            <Home className='h-5 w-5' strokeWidth={2}/>
                            <span className='font-medium'>Home</span>
                        </NavLink>

                        <NavLink 
                            onClick={()=>setVisible(false)} 
                            className={({isActive}) => `flex items-center gap-4 px-6 py-4 transition-all ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                            to="/collection"
                        >
                            <ShoppingBag className='h-5 w-5' strokeWidth={2}/>
                            <span className='font-medium'>Collection</span>
                        </NavLink>

                        <NavLink 
                            onClick={()=>setVisible(false)} 
                            className={({isActive}) => `flex items-center gap-4 px-6 py-4 transition-all ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                            to="/about"
                        >
                            <Info className='h-5 w-5' strokeWidth={2}/>
                            <span className='font-medium'>About</span>
                        </NavLink>

                        <NavLink 
                            onClick={()=>setVisible(false)} 
                            className={({isActive}) => `flex items-center gap-4 px-6 py-4 transition-all ${isActive ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                            to="/contact"
                        >
                            <Mail className='h-5 w-5' strokeWidth={2}/>
                            <span className='font-medium'>Contact</span>
                        </NavLink>
                    </nav>

                    {/* Footer */}
                    <div className='p-5 border-t bg-gray-50'>
                        <p className='text-xs text-gray-500 text-center'>© {new Date().getFullYear()} Cartix. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {visible && (
                <div 
                    onClick={()=> setVisible(false)}
                    className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300'
                ></div>
            )}  
        </div>
    )
}

export default Navbar