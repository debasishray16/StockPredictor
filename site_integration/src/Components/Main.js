import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dashboardview from './Dashboardview';

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch data from the backend
  const fetchData = useCallback(async (ticker) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const priceArray = result.predictions;
      const originalPriceArray = result.original;

      const formattedData = priceArray.map((price, index) => ({
        day: index + 1,
        predictedPrice: price,
        originalPrice: originalPriceArray[index]
      }));

      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className='h-screen pt-0 px-4 bg-gradient-to-r from-[#14142d] to-[#0b082a] z-10 relative overflow-hidden'>
      <Dashboardview onFetchData={fetchData} className='pt-0 px-0 top-0' />
      <div className='sticky top-0 bg-gradient-to-r from-[#14142d] to-[#0b082a] p-4'>
        <h1 className='text-[#e6e7ec] text-[35px] leading-[34px] font-normal'>Dashboard</h1>
      </div>
      <div className='mt-4 mb-4 pb-4 pl-4 border-2 bg-[#06061d]'>
        <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-4'>Original vs Prediction</h1>
        {loading ? (
          <p className='text-[#e6e7ec] text-[25px] leading-[34px] font-normal px-4'>Loading data...</p>
        ) : errorMessage ? (
          <p className='text-red-500' aria-live="polite">{errorMessage}</p>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="95%" height={500}>
            <LineChart data={data}>
              {/* X-axis and Y-axis labels */}
              <XAxis 
                dataKey="day"
                label={{ value: 'Days', position: 'insideBottom',offset: -4 }} 
                ticks={data.map((_, index) => (index + 1) % 100 === 0 ? index + 1 : null).filter(Boolean)} 
                interval={0}
              />
              <YAxis label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />

              {/* Tooltip */}
              <Tooltip />

              {/* Legend positioned at the top-right */}
              <Legend 
                verticalAlign="top"  // Places the legend at the top
                align="right"        // Aligns the legend to the right
              />

              {/* Lines */}
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

export default Main;