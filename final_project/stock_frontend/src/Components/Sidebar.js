import React from 'react'
import {FaChevronRight, FaRegCalendarAlt, FaRegChartBar, FaRegSun, FaStickyNote, FaTachometerAlt, FaWrench } from "react-icons/fa"

const Sidebar = () => {
  return (
    <div className='bg-[#182f6d] h-screen px-[25px]'>
      <div className='px-[5px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
        <h1 className='text-[#c7cad8] text-[20px] leading-[24px] font-extrabold cursor-pointer'>Stock Market Predictor</h1>
      </div>
      <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] cursor-pointer border-[#EDEDED]/[0.3]'>
        <FaTachometerAlt color='#c7cad8' />
        <p className='text-[14px] leading-[20px] font-semibold hover:text-[#4E73DF] text-[#c7cad8]'>Dashboard</p>
      </div>
      <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
        <p className='text-[10px] font-extrabold-leadding-[16px] text-white/[0.4]'>INTERFACE</p>
        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px] '>
            <FaRegSun color='#c7cad8' />
            <p className='text-[14px] leading-[20px] font-normal text-[#c7cad8] hover:text-[#4E73DF]'>Components</p>
          </div>
          <FaChevronRight color='#c7cad8' />
        </div>
        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaWrench color='#c7cad8' />
            <p className='text-[14px] leading-[20px] font-normal text-[#c7cad8] hover:text-[#4E73DF]'>Utilities</p>
          </div>
          <FaChevronRight color='#c7cad8' />
        </div>
      </div>

      <div className='pt-[15px]'>
        <p className='text-[10px] font-extrabold-leading-[16px] text-white/[0.4]'>ADDONS</p>
        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaStickyNote color='#c7cad8' />
            <p className='text-[14px] leading-[20px] font-normal text-[#c7cad8] hover:text-[#4E73DF]'>Pages</p>
          </div>
          <FaChevronRight color='#c7cad8' />
        </div>
        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
          <div className='flex items-center gap-[10px]'>
            <FaRegChartBar color='#c7cad8' />
            <p className='text-[14px] leading-[20px] font-normal text-[#c7cad8] hover:text-[#4E73DF]'>Charts</p>
          </div>
          <FaChevronRight color='#c7cad8' />
        </div>
        <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
        <div className='flex items-center gap-[10px]'>
          <FaRegCalendarAlt color='#c7cad8' />
          <p className='text-[14px] leading-[20px] font-normal text-[#c7cad8] hover:text-[#4E73DF]'>Tables</p>
        </div>
        <FaChevronRight color='#c7cad8' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar