import React, { useState, useEffect } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import throttle from 'lodash/throttle';

const Sidebar = ({ sector, industry, fullTimeEmployees, marketCap, companyName, companySite, currency }) => {
  const [width, setWidth] = useState(360);
  const [isResizing, setIsResizing] = useState(false);

  const minWidth = 250;
  const maxWidth = 450;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  useEffect(() => {
    if (companyName) {
      setIsCollapsed(false);
    }
  }, [companyName]);

  const handleMouseDown = () => setIsResizing(true);

  const handleMouseMove = throttle((e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > minWidth && newWidth < maxWidth) {
        setWidth(newWidth);
      }
    }
  }, 50);

  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // Clean up event listeners on unmount or when resizing ends
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove]);

  return (
    <div className="flex h-screen">
      <div
        className="bg-[#0b082a] pr-2 pl-3 h-full transition-all duration-200 ease-linear scrollbar-hide"
        style={{ width: `${width}px`, height: '100vh', overflow: isResizing ? 'hidden' : 'auto' }}
      >
        <div className="px-[5px] py-[30px] flex items-center justify-center border-b border-[#EDEDED] border-opacity-30">
          <h1 className="text-[#c7cad8] text-[25px] leading-[24px] font-extrabold"> Ticker Predictor </h1>
        </div>

        <div className="flex justify-between items-center cursor-pointer text-[#c7cad8] leading-7 bg-[#06061d] pl-5 mt-7 rounded-lg" onClick={toggleCollapse}>
          <h1 className="font-bold py-[16px] text-[16px] "> Company Details </h1>
          <span className="px-7 text-[#e6e7ec]">
            {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
          </span>
        </div>

        <div className={`text-[#c7cad8] leading-7 bg-[#06061d] pl-5 mb-5 transition-all duration-500 ease-in-out ${isCollapsed ? 'overflow-hidden max-h-0' : 'max-h-screen overflow-y-auto pb-3 rounded-lg'}`}>
          <p><strong> Company - </strong> {companyName || '--'}</p>
          <p><strong> Sector - </strong> {sector || '--'}</p>
          <p><strong> Industry - </strong> {industry || '--'}</p>
          <p><strong> Full-Time Employees - </strong> {Intl.NumberFormat('en-US').format(fullTimeEmployees || '--')}</p>
          <p><strong> Market Cap - </strong> {Intl.NumberFormat('en-US').format(marketCap || '--')} {currency}</p>
        </div>

        <button
          href={companySite}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 p-3 ml-6 mt-5 rounded-lg text-[#c7cad8] border-b border-[#EDEDED] border-opacity-70 w-5/6 transition ease-in-out bg-[#06061d] delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-500 duration-400 text-center"
        >
          <a href={companySite} target="_blank" rel="noopener noreferrer ">
            <strong>Company Website</strong>
          </a>
        </button>

        <div className="flex-col items-center gap-[15px] py-4">
          <p className="text-[20px] leading-[10px] py-2 pr-[20px] font-bold mb-4 text-[#c7cad8]">Contributors</p>
          <div className="grid grid-cols-2 bg-[#06061d] rounded-lg mb-4">
            <p className="text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8]">Debasish Ray</p>
            <a className="text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8] text-right hover:underline" href="https://github.com/debasishray16" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"> GitHub </i>
            </a>
          </div>
          <div className="grid grid-cols-2 bg-[#06061d] rounded-lg">
            <p className="text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8]">Utkarsh Raj Sinha</p>
            <a className="text-[15px] py-3 px-3 pr-[20px] font-bold text-[#c7cad8] text-right hover:underline" href="https://github.com/gamecoder08" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"> GitHub </i>
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-3 bg-[#07051b] cursor-ew-resize" onMouseDown={handleMouseDown}>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default Sidebar;