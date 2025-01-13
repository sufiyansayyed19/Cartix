import React, { useEffect } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
// import logo from "../assets/frontend_assets/LOGO.svg"
import { Link, NavLink } from 'react-router-dom'
const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount } = useContext(ShopContext);

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
            <ul className='hidden sm:flex gap-5 text-m text-grey-700'>

                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>

            </ul>    
            {/* Navigation ICONS */}    
            <div className='flex items-center gap-6'>
                <img onClick={handleChange} src={assets.search_icon} className='w-5 cursor-pointer' alt='search'/>
                
                <div className='group relative'>
                    <img className='w-5 cursor-pointer'  src={assets.profile_icon} alt="profile" />
                    <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col w-36 gap-2 px-5 py-3 bg-slate-100 text-gray-500 rounded">
                            <p className="cursor-pointer hover:text-black">My Profile</p>
                            <p className="cursor-pointer hover:text-black">Orders</p>
                            <p className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>    
            
                </div>
            
                    {/* cart icon and count <p>  */}
                <Link to="/cart" className = "relative">
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{getCartCount()}</p>
                </Link>
                <img  onClick = {()=> setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu Icon"/>
            </div>

            {/*Sidebar Menu for small screens*/}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transitioin-all ${visible ?'w-full':'w-0' }`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=""/>
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className=" py-2 pl-5 border" to="/">HOME</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className=" py-2 pl-5 border" to="/collection">COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className=" py-2 pl-5 border" to="/about">ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className=" py-2 pl-5 border" to="/contact">CONTACT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className=" py-2 pl-5 border" to="https://Cartix-adminn-ebon.vercel.app">ADMIN PANEL</NavLink>
                </div>
            </div>  
        </div>
    )
}

export default Navbar