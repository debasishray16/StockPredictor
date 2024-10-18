import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const StockPredictionChart = ({ data, loading, errorMessage,currency }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='mt-4 mb-4 p-2 pl-4 bg-[#06061d] rounded-lg'>
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollapse}>
        <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-4'>Original vs Prediction</h1>
        {/* Arrow icon */}
        <span className="px-7 p-4 text-[#e6e7ec]">
          {isCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
        </span>
      </div>

      {/* Collapsible content with animation */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? 'max-h-0' : 'max-h-screen'}`}>
        {loading ? (
          <p className='text-[#e6e7ec] text-[15px] leading-[34px] animate-pulse font-normal px-7'>Loading data...</p>
        ) : errorMessage ? (
          <p className='text-red-500' aria-live="polite">{errorMessage}</p>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="95%" height={500}>
            <LineChart data={data}>
              <XAxis
                dataKey="day"
                label={{ value: 'Days', position: 'insideBottom', offset: 2 }}
                ticks={data.map((_, index) => (index + 1) % 100 === 0 ? index + 1 : null).filter(Boolean)}
                interval={0}
              />
              <YAxis label={{ value: `Price (${currency})`, angle: -90, position: 'insideLeft' }} />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'predictedPrice') {
                    return [`${parseFloat(value).toFixed(2)} USD`, 'Predicted Price'];
                  }
                  if (name === 'originalPrice') {
                    return [`${parseFloat(value).toFixed(2)} USD`, 'Original Price'];
                  }
                  return [value, name];
                }}
                labelFormatter={(label) => ``}
              />
              <Legend verticalAlign="top" align="right" />
              <Line type="monotone" dataKey="predictedPrice" stroke="#ff7300" dot={false} />
              <Line type="monotone" dataKey="originalPrice" stroke="#82ca9d" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className='text-[#e6e7ec] text-[25px] leading-[34px] font-normal p-4'>No data available for graph.</p>
        )}
      </div>
    </div>
  );
};

export default StockPredictionChart;