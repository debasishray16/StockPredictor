import React, { useState } from 'react';

const Sidebar = ({ onSelectOption, sector, industry, fullTimeEmployees, marketCap, companyName, companySite, currency }) => {  // Accept new props
  const [width, setWidth] = useState(270);
  const [isResizing, setIsResizing] = useState(false);

  const minWidth = 220;
  const maxWidth = 400;

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectOption(selectedValue);  // Send the selected option back to Main for fetching data
  };

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
  });

  return (
    <div className="flex h-screen">
      <div className='bg-[#0b082a] px-5 ' style={{ width: `${width}px`, transition: isResizing ? 'none' : 'width 0.2s' }}>
        <div className='px-[5px] py-[30px] flex items-center justify-center border-b border-[#EDEDED] border-opacity-30'>
          <h1 className='text-[#c7cad8] text-[25px] leading-[24px] font-extrabold cursor-pointer'>Stock Ticker Predictor</h1>
        </div>
        <div className='flex-col items-center gap-[15px] py-4 cursor-pointer border-b border-[#EDEDED] border-opacity-30'>
            <label htmlFor="dropdown" className='text-[14px] leading-[20px] py-[20px] pr-[20px] font-semibold hover:text-[#4E73DF] text-[#c7cad8]'>Select an option:</label>
            <select
                id="dropdown"
                value={selectedOption}
                onChange={handleChange}  // Trigger onChange to handle selection
                className="bg-gray-200 border rounded p-1.5 mt-4"
            >
                <option value="">--Choose an option--</option>
                <option value="JPM">JPM</option>
                <option value="AAPL">AAPL</option>
                <option value="GOOG">GOOG</option>
                <option value="AMZN">AMZN</option>
                <option value="ARCC">ARCC</option>
                <option value="MMM">MMM</option>
                <option value="MGK">MGK</option>
                <option value="IEP">IEP</option>
                <option value="AAP">AAP</option>
            </select>
        </div>
        {/* Display the company details */}
        <div className='py-4 text-[#c7cad8]'>
          <h2 className='font-bold py-[10px] '>Company Info:</h2>
          <p><strong>Company Name:</strong> {companyName || 'N/A'}</p>
          <p><strong>Sector:</strong> {sector || 'N/A'}</p>
          <p><strong>Industry:</strong> {industry || 'N/A'}</p>
          <p><strong>Full-Time Employees:</strong> {fullTimeEmployees || 'N/A'}</p>
          <p><strong>Market Cap:</strong> {marketCap ? `${marketCap} ${currency}` : 'N/A'}</p>
          <p className='pt-6'><a href={companySite} target="_blank" rel="noopener noreferrer"><strong>Click for Company Website</strong></a></p>
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