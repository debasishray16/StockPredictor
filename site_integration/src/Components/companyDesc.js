import React, { useState, useEffect } from 'react';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const CompanyDesc = ({ companyDescription, loading }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Automatically expand when companyDescription is received
  useEffect(() => {
    if (companyDescription) {
      setIsCollapsed(false);
    }
  }, [companyDescription]);

  return (
    <div className='mt-4 mb-4 pb-1 pl-4 bg-[#06061d] rounded-lg'>
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollapse}>
        <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-1'>
          About Company
        </h1>
        {/* Arrow icon */}
        <span className="px-7 p-4 text-[#e6e7ec]">
          {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
        </span>
      </div>

      {/* Collapsible content with animation */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-screen'}`}>
        {loading ? (
          <p className='text-[#e6e7ec] px-7 p-4' style={{ textAlign: 'justify' }}>
            {companyDescription}
          </p>
        ) : (<p className="text-[#e6e7ec] text-[15px] leading-[34px] font-normal px-7 p-4 flex items-center justify-center">No ticker selected</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDesc;