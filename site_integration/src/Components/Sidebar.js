import React, { useState } from 'react';

const Sidebar = () => {
  const [width, setWidth] = useState(270);
  const [isResizing, setIsResizing] = useState(false);

  const minWidth = 220;
  const maxWidth = 400;

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
      setSelectedOption(event.target.value);
  };

  // Function to handle the mouse down event on the resizer
  const handleMouseDown = (e) => {
    setIsResizing(true);
  };

  // Function to handle the mouse move event when dragging
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = e.clientX; // Update the width as the mouse moves
      // Set the width but respect the minWidth and maxWidth limits
      if (newWidth > minWidth && newWidth < maxWidth) {
        setWidth(newWidth);
      }
    }
  };

  // Function to handle the mouse up event when dragging stops
  const handleMouseUp = () => {
    setIsResizing(false);
  };

  // Attach mousemove and mouseup event listeners
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
        <div className='flex-col items-center gap-[15px] py-4  cursor-pointer border-b border-[#EDEDED] border-opacity-30'>
            <label htmlFor="dropdown" className='text-[14px] leading-[20px] py-[20px] font-semibold hover:text-[#4E73DF] text-[#c7cad8]'>Select an option:</label>
            <select
                id="dropdown"
                value={selectedOption}
                onChange={handleChange}
                className="bg-gray-200 border rounded p-1.5 mt-4"
            >
                <option value="">--Choose an option--</option>
                <option value="option1">JPM</option>
                <option value="option2">AAPL</option>
                <option value="option3">GOOG</option>
                <option value="option4">AMZN</option>
                <option value="option5">ARCC</option>
                <option value="option6">MMM</option>
                <option value="option7">MGK</option>
                <option value="option8">IEP</option>
                <option value="option9">AAP</option>
            </select>
            {selectedOption && <p>You selected: {selectedOption}</p>}
        </div>
      </div>
      {/* Three-dot draggable indicator */}
      <div className="flex flex-col items-center justify-center w-3 bg-[#07051b] cursor-ew-resize" onMouseDown={handleMouseDown}>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full mb-1"></span>
        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default Sidebar;