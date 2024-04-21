import React from 'react';
import { FaEllipsisV, FaRegCalendarMinus } from 'react-icons/fa';
import prediction from "../images/prediction.png"
import closing from "../images/closingprice.png"

const Main = () => {
  return (
    <div className='pt-[25px] px-[25px] bg-gradient-to-r from-[#362AAB] to-[#1A154F] '>
      <div className='flex items-center justify-between'>
        <h1 className='text-[#e6e7ec] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
      </div>
      <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>
        <div className='h-[100px] rounded-[8px] bg-[#6c89e1] border-l-[4px] border-[#19223d] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#A720C4] transform hover:scale-[103%] transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#cda4fc] text-[15px]  leading-[17px] font-bold'>EARNING (MONTHLY)</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px]'>$40,000</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color='' />
        </div>
        <div className='h-[100px] rounded-[8px] bg-[#6c89e1] border-l-[4px] border-[#19223d] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#DFB729] transform hover:scale-[103%] transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#5ddbad] text-[15px]  leading-[17px] font-bold'>PENDING REQUESTS</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px]'>$240,000</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color='' />
        </div>
        <div className='h-[100px] rounded-[8px] bg-[#6c89e1] border-l-[4px] border-[#19223d] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#A720C4] transform hover:scale-[103%] transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#5ddbad] text-[15px]  leading-[17px] font-bold'>TASKS</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px]'>$40,000</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color='' />
        </div>
        <div className='h-[100px] rounded-[8px] bg-[#6c89e1] border-l-[4px] border-[#19223d] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg hover:shadow-[#DFB729] transform hover:scale-[103%] transition duration-300 ease-out'>
          <div>
            <h2 className='text-[#cda4fc] text-[15px]  leading-[17px] font-bold'>EARNING (MONTHLY)</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px]'>$40,000</h1>
          </div>
          <FaRegCalendarMinus fontSize={28} color='' />
        </div>
      </div>
      <div className='flex mt-[22px] w-full gap-[30px]'>
        <div className='basis-[70%] border bg-[#5848d3] shadow-md cursor-pointer rounded-[4px]'>
          <div className='bg-[#A59DDF] flex items-center justify-between py-[20px] px-[20px] border-b-[1px] border-[#19223d] mb-[20px]'>
            <h2 className='font-bold'>Earnings Overview</h2>
          </div>
          <img src={closing} alt='Closing Price' />
        </div>
      </div>
      <div className='flex mt-[22px] w-full gap-[30px]'>
        <div className='basis-[70%] border bg-[#5848d3] shadow-md cursor-pointer rounded-[4px]'>
          <div className='bg-[#A59DDF] flex items-center justify-between py-[20px] px-[20px] border-b-[1px] border-[#19223d] mb-[20px]'>
            <h2 className='font-bold'>Original Vs Prediction</h2>
          </div>
          <img src={prediction} alt='Prediction Vs Original'/>
        </div>
      </div>
      </div>
  )
}

export default Main