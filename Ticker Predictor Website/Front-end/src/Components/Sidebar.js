import React, { useState, useEffect, useRef } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import loading1 from '../assets/loading.gif';

const Sidebar = ({ loading, sector, industry, fullTimeEmployees, marketCap, companyName, companySite, currency }) => {
  const [width, setWidth] = useState(360);
  const [isResizing, setIsResizing] = useState(false);

  const sidebarRef = useRef(null);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const minWidth = 300;
  const maxWidth = 450;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleMouseDown = (e) => {
    setIsResizing(true);
    startX.current = e.clientX;
    startWidth.current = sidebarRef.current.offsetWidth;

    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      requestAnimationFrame(() => {
        const delta = e.clientX - startX.current;
        let newWidth = startWidth.current + delta;

        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;

        setWidth(newWidth);
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (companyName) {
      setIsCollapsed(false);
    }
  }, [companyName]);

  return (
    <div className="z-10 flex h-screen bg-[#1c2023] shadow-xl shadow-black">
      <div
        ref={sidebarRef}
        className="pr-2 pl-3 h-full transition-all duration-200 ease-linear scrollbar-hide"
        style={{
          width: `${width}px`,
          transition: isResizing ? 'none' : 'width 0.2s ease'
        }}
      >
        <div className="px-[5px] py-[30px] flex items-center justify-center border-b border-[black] border-opacity-30">
          <h1 className="text-[#e6e7ec] text-[25px] leading-[24px] font-extrabold"> Ticker Predictor </h1>
        </div>

        <div className="flex justify-between items-center cursor-pointer leading-7 pl-5 mt-7 rounded-t-lg" onClick={toggleCollapse}>
          <h1 className="text-[#e6e7ec] font-bold py-[16px] text-[16px] "> Company Details </h1>
          <span className="px-7">
            {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
          </span>
        </div>

        <div className={`text-[#e6e7ec] leading-7 pl-5 mb-5 transition-all duration-500 ease-in-out ${isCollapsed ? 'overflow-hidden max-h-0 rounded-b-lg' : 'max-h-screen overflow-y-auto pb-3 rounded-b-lg'}`}>
          {loading ? (  // Add loading condition
            <div className="flex items-center justify-center py-4">
              <img src={loading1} alt="Loading Animation" className=" object-cover" />
            </div>
          ) : (
            <>
              <p><strong> Company - </strong> {companyName || '--'}</p>
              <p><strong> Sector - </strong> {sector || '--'}</p>
              <p><strong> Industry - </strong> {industry || '--'}</p>
              <p><strong> Full-Time Employees - </strong> {Intl.NumberFormat('en-US').format(fullTimeEmployees || '--')}</p>
              <p><strong> Market Cap - </strong> {Intl.NumberFormat('en-US').format(marketCap || '--')} {currency}</p>
            </>
          )}
        </div>


        <a
          href={companySite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e6e7ec] mb-5 p-3 ml-6 mt-5 rounded-lg border-b border-[#EDEDED] border-opacity-70 w-5/6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-400 text-center"
        >
          <strong>Company Website</strong>
        </a>
      </div>

      <div
        className={`flex flex-col items-center justify-center w-3 cursor-ew-resize ${isResizing ? 'bg-gray-300' : ''
          }`}
        onMouseDown={handleMouseDown}
      >
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default Sidebar;