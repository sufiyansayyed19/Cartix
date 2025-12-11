import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4'>
      <div className='text-center'>
        {/* 404 Number */}
        <h1 className='text-9xl font-bold text-gray-200 select-none'>404</h1>
        
        {/* Error Message */}
        <div className='mt-4'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Page Not Found</h2>
          <p className='text-gray-600 mb-8 max-w-md mx-auto'>
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex gap-4 justify-center flex-wrap'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
          >
            <ArrowLeft className='w-4 h-4' />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors'
          >
            <Home className='w-4 h-4' />
            Home Page
          </button>
        </div>

        {/* Additional Help */}
        <div className='mt-12 text-sm text-gray-500'>
          <p>Need help? <span onClick={() => navigate('/contact')} className='text-black underline cursor-pointer hover:text-gray-700'>Contact us</span></p>
        </div>
      </div>
    </div>
  )
}

export default NotFound