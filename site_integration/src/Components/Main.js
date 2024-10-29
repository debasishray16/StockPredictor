import React, { useState, useCallback } from 'react';
import Dashboardview from './Dashboardview';
import Sidebar from './Sidebar';
import CompanyDesc from './companyDesc';
import StockPredictionChart from './StockPredictionChart';
import CompanyInfo from './companyInfo';
import AboutModel from './aboutModel';

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
  const [openingPrice, setOpeningPrice] = useState('');
  const [closingPrice, setClosingPrice] = useState('');
  const [maxopeningPrice, setmaxopeningPrice] = useState('');
  const [maxclosingPrice, setmaxclosingPrice] = useState('');
  const [max_high_price, setmax_high_price] = useState('');
  const [max_low_price, setmax_low_price] = useState('');
  const [avg_high_price, setavg_high_price] = useState('');
  const [avg_low_price, setavg_low_price] = useState('');
  const [lastClosingPrice, setLastClosingPrice] = useState('');
  const [dates, setDates] = useState([]);
  const [monthlyLabels, setMonthlyLabels] = useState([]);

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
      const closingPriceGraph = result.closing_price;
      const meanAvgPrice75 = result.mean_avg_75;
      const meanAvgPrice50 = result.mean_avg_50;
      const original1Year = result.original_last1;
      const combined_predictions = result.combined_predictions;
      const dates = result.dates; // Daily dates
      const monthlyLabels = result.monthly_labels; // Monthly labels

      // Formatting data for prediction vs original graph
      const formattedData = priceArray.map((price, index) => ({
        day: index + 1,
        predictedPrice: price,
        originalPrice: originalPriceArray[index],
      }));

      const futurePredictionData = combined_predictions.map((price, index) => ({
        day: index + 1,
        combined_predictions: price,
        original_1year: original1Year[index]
      }));

      // Formatting data for closing price vs time graph
      const closingPriceData = closingPriceGraph.map((price, index) => ({
        day: index + 1,
        closingPrice: price,
      }));

      // Formatting data for closing price vs mean averages
      const closingvsmean = closingPriceGraph.map((price, index) => ({
        day: index + 1,
        closingPriceData: price,
        mean_avg_price75: meanAvgPrice75[index],
        mean_avg_price50: meanAvgPrice50[index],
      }));

      setData({
        predictionData: formattedData,
        closingPriceData: closingPriceData,
        closingvsmean: closingvsmean,
        futurePredictionData: futurePredictionData, // Contains both month and date
      });


      // Set additional data for last closing price, 1-year predictions, etc.
      setLastClosingPrice(original1Year);
      setDates(dates);
      setMonthlyLabels(monthlyLabels);
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
        setCompanyName(data.company_name || 'Full name not available');
        setSector(data.sector || 'No sector information available.');
        setIndustry(data.industry || 'No industry information available.');
        setFullTimeEmployees(data.fullTimeEmployees || 'No employee data available.');
        setMarketCap(data.marketCap || 'No market cap available.');
        setCompanyDescription(data.longBusinessSummary || 'Failed to fetch company info.');
        setCompanySite(data.website || 'No website available');
        setCurrency(data.currency || '');
        setOpeningPrice(data.openingPrice || 'Opening price not available')
        setClosingPrice(data.closingPrice || 'Closing price not available')
        setmaxopeningPrice(data.max_opening_Price || 'Opening price not available')
        setmaxclosingPrice(data.max_closing_Price || 'Closing price not available')
        setmax_high_price(data.max_high_price || 'Max High price not available')
        setmax_low_price(data.max_low_price || 'Max Low price not available')
        setavg_high_price(data.avg_high_price || 'Avg High price not available')
        setavg_low_price(data.avg_low_price || 'Avg Low price not available')
      } else {
        setCompanyDescription('Failed to fetch company info.');
      }
    } catch (error) {
      setCompanyDescription('An error occurred while fetching company info.');
    }
  }, []);

  // Function to handle ticker submission from the Dashboardview input box
  const handleFetchData = (ticker) => {
    fetchData(ticker);  // Fetch stock prediction data
    fetchCompanyInfo(ticker);  // Fetch company info
  };

  return (
    <div className="h-screen flex bg-gradient-to-r from-[#14142d] to-[#0b082a] overflow-hidden">
      <Sidebar
        sector={sector}
        industry={industry}
        fullTimeEmployees={fullTimeEmployees}
        marketCap={marketCap}
        companyName={companyName}
        companySite={companySite}
        currency={currency}
      />
      <div className="flex-grow flex flex-col overflow-auto">
        <Dashboardview onFetchData={handleFetchData} className='pt-0 px-0 top-0 ' onSelectOption={handleFetchData} />
        <div className="flex-grow flex flex-col overflow-auto pl-4 pr-4">
          <div className='top-0 bg-gradient-to-r from-[#14142d] to-[#0b082a] p-4 pr-5'>
            <h1 className='text-[#e6e7ec] text-[35px] leading-[34px] font-semibold'>Dashboard</h1>
          </div>
          {/* Display long business summary here */}
          <CompanyDesc companyDescription={companyDescription} loading={loading} />
          <CompanyInfo currency={currency} openingPrice={openingPrice} closingPrice={closingPrice} maxOpen={maxopeningPrice} maxClose={maxclosingPrice} max_high_price={max_high_price} max_low_price={max_low_price} avg_high_price={avg_high_price} avg_low_price={avg_low_price} />
          {/* Render StockPredictionChart here */}
          <StockPredictionChart data={data} loading={loading} errorMessage={errorMessage} currency={currency} companyName={companyName} lastClosingPrice={lastClosingPrice} dates={dates} monthlyLabels={monthlyLabels} />
          <AboutModel />
        </div>
      </div>
    </div>
  );
};

export default Main;