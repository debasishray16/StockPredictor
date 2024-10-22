import React, { useState } from 'react';

const CompanyInfo = ({ currency, openingPrice, closingPrice, maxOpen, maxClose, max_high_price, max_low_price, avg_high_price, avg_low_price }) => {
  const [showMaxOpening, setShowMaxOpening] = useState(false);
  const [showMaxClosing, setShowMaxClosing] = useState(false);
  const [showMaxEmployees, setShowMaxEmployees] = useState(false);
  const [showMaxMarketCap, setShowMaxMarketCap] = useState(false);

  return (
    <div className='p-2 px-4'>
      <div className='grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]'>

        {/* Opening Price with hover animation */}
        <div
          className='h-[100px] rounded-[8px] bg-[#06061d] flex items-center justify-center px-[30px] relative overflow-hidden'
          onMouseEnter={() => setShowMaxOpening(true)}
          onMouseLeave={() => setShowMaxOpening(false)}
        >
          <div className='relative w-full text-center'>
            <h2 className='text-[#e6e7ec] text-[15px] leading-[17px] font-bold'>
              {showMaxOpening ? 'Max Opening Price' : 'Latest Opening Price'}
            </h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px] relative'>
              <span className={`block transition-all transform duration-500 ease-in-out ${showMaxOpening ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {parseFloat(openingPrice).toFixed(3)} {currency}
              </span>
              <span className={`block transition-all transform duration-500 ease-in-out absolute top-0 left-0 w-full ${showMaxOpening ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                {parseFloat(maxOpen).toFixed(3)} {currency}
              </span>
            </h1>
          </div>
        </div>

        {/* Closing Price with hover animation */}
        <div
          className='h-[100px] rounded-[8px] bg-[#06061d] flex items-center justify-center px-[30px] relative overflow-hidden'
          onMouseEnter={() => setShowMaxClosing(true)}
          onMouseLeave={() => setShowMaxClosing(false)}
        >
          <div className='relative w-full text-center'>
            <h2 className='text-[#e6e7ec] text-[15px] leading-[17px] font-bold'>
              {showMaxClosing ? 'Max Closing Price' : 'Latest Closing Price'}
            </h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px] relative'>
              <span className={`block transition-all transform duration-500 ease-in-out ${showMaxClosing ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {parseFloat(closingPrice).toFixed(3)} {currency}
              </span>
              <span className={`block transition-all transform duration-500 ease-in-out absolute top-0 left-0 w-full ${showMaxClosing ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                {parseFloat(maxClose).toFixed(3)} {currency}
              </span>
            </h1>
          </div>
        </div>

        {/* High Price with hover animation */}
        <div
          className='h-[100px] rounded-[8px] bg-[#06061d] flex items-center justify-center'
          onMouseEnter={() => setShowMaxEmployees(true)}
          onMouseLeave={() => setShowMaxEmployees(false)}
        >
          <div className='text-center'>
            <h2 className='text-[#e6e7ec] text-[15px] leading-[17px] font-bold'>
              {showMaxEmployees ? '52 - Week High (Max)' : '52 - Week High (Mean)'}
            </h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px] relative'>
              <span className={`block transition-all transform duration-500 ease-in-out ${showMaxEmployees ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {Intl.NumberFormat('en-US').format(avg_high_price)} {currency}
              </span>
              <span className={`block transition-all transform duration-500 ease-in-out absolute top-0 left-0 w-full ${showMaxEmployees ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                {Intl.NumberFormat('en-US').format(max_high_price)} {currency}
              </span>
            </h1>
          </div>
        </div>

        {/* Low Price with hover animation */}
        <div
          className='h-[100px] rounded-[8px] bg-[#06061d] flex items-center justify-center'
          onMouseEnter={() => setShowMaxMarketCap(true)}
          onMouseLeave={() => setShowMaxMarketCap(false)}
        >
          <div className='text-center'>
            <h2 className='text-[#e6e7ec] text-[15px] leading-[17px] font-bold'>
              {showMaxMarketCap ? '52 - Week Low (Max)' : '52 - Week Low (Mean)'}
            </h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#d0d4ee] mt-[5px] relative'>
              <span className={`block transition-all transform duration-500 ease-in-out ${showMaxMarketCap ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
                {Intl.NumberFormat('en-US').format(avg_low_price)} {currency}
              </span>
              <span className={`block transition-all transform duration-500 ease-in-out absolute top-0 left-0 w-full ${showMaxMarketCap ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                {Intl.NumberFormat('en-US').format(max_low_price)} {currency}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;