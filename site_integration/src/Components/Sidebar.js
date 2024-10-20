import React, { useState } from 'react';

const Sidebar = ({ sector, industry, fullTimeEmployees, marketCap, companyName, companySite, currency }) => {
  const [width, setWidth] = useState(360);
  const [isResizing, setIsResizing] = useState(false);

  const minWidth = 250;
  const maxWidth = 450;

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > minWidth && newWidth < maxWidth) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  });  // Only update event listeners when resizing

  return (
    <div className="flex h-screen">
      {/* Sidebar container */}
      <div
        className='bg-[#0b082a] px-5 overflow-y-auto scrollbar-hide'  // Applying custom class to hide scrollbar
        style={{ width: `${width}px`, transition: isResizing ? 'none' : 'width 0.2s', height: '100vh' }} // 100vh for full screen height
      >
        <div className='px-[5px] py-[30px] flex items-center justify-center border-b border-[#EDEDED] border-opacity-30'>
          <h1 className='text-[#c7cad8] text-[25px] leading-[24px] font-extrabold cursor-pointer'>Stock Ticker Predictor</h1>
        </div>
        {/* Display the company details */}
        <div className='py-4 text-[#c7cad8] leading-7'>
          <h2 className='font-bold py-[10px] text-[18px]'>Company Info:</h2>
          <p><strong>Company Name:</strong> {companyName || 'N/A'}</p>
          <p><strong>Sector:</strong> {sector || 'N/A'}</p>
          <p><strong>Industry:</strong> {industry || 'N/A'}</p>
          <p><strong>Full-Time Employees:</strong> {Intl.NumberFormat('en-US').format(fullTimeEmployees || 'N/A')}</p>
          <p><strong>Market Cap:</strong> {Intl.NumberFormat('en-US').format(marketCap ||  'N/A')} {currency}</p>
          <p className='pt-6'><a href={companySite} target="_blank" rel="noopener noreferrer"><strong>Click for Company Website</strong></a></p>
        </div>

        {/* Additional sections */}
        <div className='flex-col items-center gap-[15px] py-4 border-b border-[#EDEDED] border-opacity-30'>
          <p className='text-[20px] leading-[10px] py-2 pr-[20px] font-bold  text-[#c7cad8]'>Our motive</p>
          <p className='text-[15px] leading-[20px] py-[20px] pr-[20px] font-bold text-[#c7cad8] mb-5' style={{ textAlign: 'justify' }}>
            To offer a simple and user-friendly stock market dashboard, where anyone can easily view stock trends for the company they're interested in.
            This platform provides clear, easy-to-understand graphs without the need to create an account. Just enter the company's ticker symbol and
            explore its performance in the stock market.
          </p>
        </div>

        {/* Duplicate section for demo */}
        <div className='flex-col items-center gap-[15px] py-4'>
          <p className='text-[20px] leading-[10px] py-2 pr-[20px] font-bold mb-4 text-[#c7cad8]'>Contributors</p>
          <div className='grid grid-cols-2 bg-[#06061d] rounded-lg mb-4'>
          <p className='text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8]'>
            Debasish Ray
          </p>
          <a className='text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8] text-right hover:underline' href="https://github.com/debasishray16" target="_blank" rel="noopener noreferrer">
            Github
          </a>
          </div>
          <div className='grid grid-cols-2 bg-[#06061d] rounded-lg'>
          <p className='text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8]'>
            Utkarsh Raj Sinha
          </p>
          <a className='text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8] text-right hover:underline' href='https://github.com/gamecoder08' target="_blank" rel="noopener noreferrer">
            Github
          </a>
          </div>
        </div>
      </div>

      {/* Resizing handle */}
      <div className="flex flex-col items-center justify-center w-3 bg-[#07051b] cursor-ew-resize" onMouseDown={handleMouseDown}>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default Sidebar;