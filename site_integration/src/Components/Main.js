import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Dashboardview from './Dashboardview';
import Sidebar from './Sidebar';  // Import Sidebar

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  const [fullTimeEmployees, setFullTimeEmployees] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [currency, setCurrency] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companySite, setCompanySite] = useState('');

  // Fetch data from the backend for stock predictions
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

  // Fetch the company info from the backend
  const fetchCompanyInfo = useCallback(async (ticker) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/company_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });

      const data = await response.json();
      if (response.ok) {
        setCompanyName(data.company_name || 'Full name not available')
        setSector(data.sector || 'No sector information available.');
        setIndustry(data.industry || 'No industry information available.');
        setFullTimeEmployees(data.fullTimeEmployees || 'No employee data available.');
        setMarketCap(data.marketCap || 'No market cap available.');
        setCompanyDescription(data.longBusinessSummary || 'Failed to fetch company info.');
        setCompanySite(data.website || "No website available")
        setCurrency(data.currency || "NA");
      } else {
        setCompanyDescription('Failed to fetch company info.');
      }
    } catch (error) {
      setCompanyDescription('An error occurred while fetching company info.');
    }
  }, []);

  // Function to handle ticker selection from the Sidebar
  const handleSelectOption = (ticker) => {
    if (ticker) {
      fetchData(ticker);  // Fetch stock prediction data
      fetchCompanyInfo(ticker);  // Fetch company info
    }
  };

  // Function to handle ticker submission from the Dashboardview input box
  const handleFetchData = (ticker) => {
    fetchData(ticker);  // Fetch stock prediction data
    fetchCompanyInfo(ticker);  // Fetch company info
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-[#14142d] to-[#0b082a] overflow-hidden">
      <Sidebar 
        onSelectOption={handleSelectOption} 
        sector={sector} 
        industry={industry} 
        fullTimeEmployees={fullTimeEmployees} 
        marketCap={marketCap}
        companyName={companyName} 
        companySite={companySite}
        currency={currency}
      />
      <div className="flex-grow flex flex-col overflow-auto">
        <Dashboardview onFetchData={handleFetchData} className='pt-0 px-0 top-0' />
        <div className="flex-grow flex flex-col overflow-auto">
          <div className='top-0 bg-gradient-to-r from-[#14142d] to-[#0b082a] p-4'>
            <h1 className='text-[#e6e7ec] text-[35px] leading-[34px] font-normal'>Dashboard</h1>
          </div>
          {/* Display long business summary here */}
          <div className='mt-4 mb-4 pb-4 pl-4 border-2 bg-[#06061d]'>
            <h1 className='text-[#e6e7ec] leading-[34px] font-bold px-7 p-4'>About Company</h1>
            <p className='text-[#e6e7ec] px-7 p-4' style={{textAlign:'justify'}}>{companyDescription}</p>
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
                  <XAxis 
                    dataKey="day"
                    label={{ value: 'Days', position: 'insideBottom', offset: -4 }} 
                    ticks={data.map((_, index) => (index + 1) % 100 === 0 ? index + 1 : null).filter(Boolean)} 
                    interval={0}
                  />
                  <YAxis label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
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
      </div>
    </div>
  );
};

export default Main;