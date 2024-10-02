import React from 'react';
import prediction from "../images/prediction.png"
import closing from "../images/closingprice.png"

const Main = () => {
  return (
    <div className='pt-[25px] px-[25px] bg-gradient-to-r from-[#14142d] to-[#0b082a] z-10 relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-[#e6e7ec] text-[28px] leading-[34px] font-normal cursor-pointer'>Dashboard</h1>
      </div>
      <div className='flex mt-[22px] w-full gap-[30px]'>
        <div className='basis-[60%] border bg-[#5848d3] shadow-md cursor-pointer rounded-[4px]'>
          <div className='bg-[#A59DDF] flex items-center justify-between py-[20px] px-[20px] border-b-[1px] border-[#19223d] mb-[20px]'>
            <h2 className='font-bold'>Earnings Overview</h2>
          </div>
          <img src={closing} alt='Closing Price' />
        </div>
      </div>
      <div className='flex mt-[22px] w-full gap-[30px]'>
        <div className='basis-[60%] border bg-[#5848d3] shadow-md cursor-pointer rounded-[4px]'>
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