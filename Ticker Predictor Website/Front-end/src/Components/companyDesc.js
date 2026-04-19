import React, { useState, useEffect } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import loading1 from '../assets/loading.gif';

const CompanyDesc = ({ companyDescription, loading, logoimg }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Expand when companyDescription or loading is active
  useEffect(() => {
    if (companyDescription || loading) {
      setIsCollapsed(false);
    }
  }, [companyDescription, loading]);

  // Auto-collapse when loading completes
  useEffect(() => {
    if (loading) {
      setIsCollapsed(true);
    }
  }, [loading]);

  return (
    <div className='mt-4 mb-4 pb-1 pl-4 bg-gradient-to-r from-white/5 via-white/20 to-white/5 backdrop-blur-lg shadow-lg rounded-xl'>
      <div className="flex justify-between items-center cursor-pointer relative z-20" onClick={toggleCollapse}>
        <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-1'>
          About Company
        </h1>
        <span className="px-7 p-4 text-[#e6e7ec]">
          {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
        </span>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className={`flex justify-center items-center transition-opacity duration-300 ease-in-out ${loading ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
          <img src={loading1} alt="Loading Animation" className="object-cover" />
        </div>
        <div className={`relative transition-opacity duration-300 ease-in-out ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {logoimg && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <img
                src={logoimg}
                alt="Watermark Logo"
                className="w-44 opacity-10 select-none"
              />
            </div>
          )}
          <p className='relative z-10 text-[#e6e7ec] px-7 p-4 text-justify'>
            {companyDescription}
          </p>

        </div>
      </div>
    </div>
  );
};

export default CompanyDesc;