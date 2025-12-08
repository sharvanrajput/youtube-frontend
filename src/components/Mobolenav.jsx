import { Home, Plus, User } from 'lucide-react'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { SiYoutubeshorts } from 'react-icons/si'
import { MdSubscriptions } from "react-icons/md";
import { PiUserCircleFill } from "react-icons/pi";
import { Link } from 'react-router-dom';


const Mobolenav = () => {
  return (
    <div className='fixed bottom-0 bg-backgrond w-full pt-2  border-t  md:hidden block'>
      <div className="flex py-3 justify-between items-center   relative ">
        <Link to="/" className='w-[20%]'>

          <div className='flex    flex-col justify-center items-center'>
            <FaHome size={23} />
            <span className="sm:text-sm text-xs">Home</span>
          </div>
        </Link>
        <Link to="/shorts" className='w-[20%]'>
          <div className='flex    flex-col justify-center items-center'>
            <SiYoutubeshorts size={20} />
            <span className="sm:text-sm text-xs">Shorts</span>
          </div>
        </Link>
        <div className='flex    flex-col  size-15 rounded-full   bg-secondary justify-center items-center'>
          <Plus className='size-7' />
        </div>
        <div className='flex  w-[20%]  flex-col justify-center items-center'>
          <MdSubscriptions size={20} />
          <span className="sm:text-sm text-xs">Subscriptions</span>
        </div>
        <Link to="/mobilepro" className='w-[20%]'>
          <div className='flex     flex-col justify-center items-center'>
            <PiUserCircleFill size={25} />
            <span className="sm:text-sm text-xs">You</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Mobolenav