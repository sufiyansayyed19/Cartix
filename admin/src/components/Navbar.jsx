import PropTypes from 'prop-types'
import { assets } from '../assets/assets'
import { LogOut } from 'lucide-react'

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center justify-between py-3 px-[4%] border-b bg-white shadow-sm'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt='' />
      <button 
        onClick={() => setToken('')} 
        className='bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg'
      >
        <LogOut size={18} strokeWidth={2}/>
        <span>Logout</span>
      </button>
    </div>
  )
}

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
}

export default Navbar
