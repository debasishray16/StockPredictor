import React from 'react'
import {FaChevronLeft, FaChevronRight, FaRegCalendarAlt, FaRegChartBar, FaRegSun, FaStickyNote, FaTachometerAlt, FaWrench} from "react-icons/fa"

const Sidebar = () => {
  return (
    <div className='bg-[#4E73DF] h-screen px-[25px]'>
    <div className='px-[5px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Admin Panel</h1>
    </div>
    <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]'>
    <FaTachometerAlt color='white' />
    <p className='text-[14px] leading-[20px] font-bold text-white'>Dashboard</p>
    </div>
    <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
      <p className='text-[10px] font-extrabold-leadding-[16px] text-white/[0.4]'>INTERFACE</p>
      <div  className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
      <div className='flex items-center gap-[10px]'>
        <FaRegSun color='white'/>
        <p className='text-[14px] leading-[20px] font-normal text-white'>Components</p>
      </div>
      <FaChevronRight color='white'/>
      </div>
      <div  className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
      <div className='flex items-center gap-[10px]'>
        <FaWrench color='white'/>
        <p className='text-[14px] leading-[20px] font-normal text-white'>Utilities</p>
      </div>
      <FaChevronRight color='white'/>
      </div>
    </div>

    <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
      <p className='text-[10px] font-extrabold-leadding-[16px] text-white/[0.4]'>ADDONS</p>
      <div  className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
      <div className='flex items-center gap-[10px]'>
        <FaStickyNote color='white'/>
        <p className='text-[14px] leading-[20px] font-normal text-white'>Pages</p>
      </div>
      <FaChevronRight color='white'/>
      </div>
      <div  className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
      <div className='flex items-center gap-[10px]'>
        <FaRegChartBar color='white'/>
        <p className='text-[14px] leading-[20px] font-normal text-white'>Charts</p>
      </div>
      <FaChevronRight color='white'/>
      </div>
      <div className='flex items-center gap-[10px] py-[15px]'>
        <FaRegCalendarAlt color='white'/>
        <p className='text-[14px] leading-[20px] font-normal text-white'>Tables</p>
      </div>
    </div>
    
    <div>
    <div className='flex items-center justify-center pt-[15px]'>
    <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer'>
    <FaChevronLeft color='white'/>
    </div>
    </div>
    </div>

    </div>
  )
}

export default Sidebar