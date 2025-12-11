import { NavLink } from 'react-router-dom';
import { PlusCircle, Package, ShoppingBag } from 'lucide-react';


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-50'>
        <div className='flex flex-col gap-3 pt-6 pl-[20%] text-[15px]' >
            <NavLink to="/add" className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l transition-all duration-200 ${
              isActive ? 'bg-blue-50 border-blue-500 text-blue-600' : 'hover:bg-white hover:border-gray-400'
            }`}>
                <PlusCircle className='w-5 h-5' strokeWidth={2}/>
                <p className='hidden md:block font-medium'>Add Items</p>
            </NavLink>

            <NavLink to="/list" className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l transition-all duration-200 ${
              isActive ? 'bg-blue-50 border-blue-500 text-blue-600' : 'hover:bg-white hover:border-gray-400'
            }`}>
                <Package className='w-5 h-5' strokeWidth={2}/>
                <p className='hidden md:block font-medium'>List Items</p>
            </NavLink>
            
            <NavLink to="/orders" className={({isActive}) => `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l transition-all duration-200 ${
              isActive ? 'bg-blue-50 border-blue-500 text-blue-600' : 'hover:bg-white hover:border-gray-400'
            }`}>
                <ShoppingBag className='w-5 h-5' strokeWidth={2}/>
                <p className='hidden md:block font-medium'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar