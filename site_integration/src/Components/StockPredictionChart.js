import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const StockPredictionChart = ({ data, loading, errorMessage, currency, companyName, dates, monthlyLabels }) => {
  const [selectedGraph, setSelectedGraph] = useState('Closing Price vs Time');
  const [isGraphCollapsed, setIsGraphCollapsed] = useState(true);

  const { predictionData = [], closingPriceData = [], closingvsmean = [], futurePredictionData = [] } = data;

  // Automatically expand when data is available
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setIsGraphCollapsed(false);
      setSelectedGraph('Original vs Prediction');
    }
  }, [data]);

  // Determine the data and tooltip labels based on the selected graph
  const getGraphData = () => {
    switch (selectedGraph) {
      case 'Closing Price vs Time':
        return { data: closingPriceData, dataKey: 'closingPrice', yAxisLabel: `Closing Price (${currency})` };
      case 'Mean Value Analysis':
        return { data: closingvsmean, dataKey: 'mean_avg_price75', yAxisLabel: `Price (${currency})` };
      case 'Training vs Testing':
        return { data: predictionData, dataKey: 'predictedPrice', yAxisLabel: `Price (${currency})` };
      case 'Original vs Prediction':
        return { data: futurePredictionData, dataKey: 'original_1year', yAxisLabel: `Price (${currency})` };
      default:
        return { data: [], dataKey: '', yAxisLabel: '' };
    }
  };

  const { data: graphData, yAxisLabel } = getGraphData();

  return (
    <div className="mt-4 mb-4 p-2 pl-4 bg-[#06061d] rounded-lg">
      <div className="text-[#e6e7ec] leading-[34px] font-bold px-7 grid grid-cols-2 gap-[55%] mt-[25px] pb-3">
        <p className='w-[500px]'>{companyName} Graph Analysis</p>
        <select
          value={selectedGraph}
          onChange={(e) => setSelectedGraph(e.target.value)}
          className="bg-[#101830] text-[#e6e7ec] rounded p-2"
        >
          <option value="Closing Price vs Time">Closing Price vs Time</option>
          <option value="Mean Value Analysis">Mean Value Analysis</option>
          <option value="Original vs Prediction">Original vs Prediction</option>
          <option value="Training vs Testing">Training vs Testing</option>
        </select>
      </div>
      <div className="rounded-lg mt-4 border border-[#EDEDED] border-opacity-30 mr-2 pb-1">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsGraphCollapsed(!isGraphCollapsed)}>
          <h1 className="text-[#e6e7ec] leading-[34px] font-bold px-7 p-4">{selectedGraph}</h1>
          <span className="px-7 p-4 text-[#e6e7ec]">
            {isGraphCollapsed ? <IoChevronDown size={20} /> : <IoChevronUp size={20} />}
          </span>
        </div>
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isGraphCollapsed ? 'max-h-0 pb-0' : 'max-h-screen pb-3'}`}>
          {loading ? (
            <p className="text-[#e6e7ec] text-[15px] leading-[34px] animate-pulse font-normal px-7 flex items-center justify-center">Loading data...</p>
          ) : errorMessage ? (
            <p className="text-red-500" aria-live="polite">{errorMessage}</p>
          ) : graphData.length > 0 ? (
            <ResponsiveContainer width="95%" height={500}>
              <LineChart data={graphData}>
                {selectedGraph === 'Closing Price vs Time' && (
                  <XAxis
                    dataKey="day"
                    label={{ value: 'Days', position: 'insideBottom', offset: -2 }}
                    ticks={graphData.map((_, index) => (index + 1) % 500 === 0 ? index + 1 : null).filter(Boolean)}
                    interval={0}
                  />
                )}
                {selectedGraph === 'Mean Value Analysis' && (
                  <XAxis
                    dataKey="day"
                    label={{ value: 'Days', position: 'insideBottom', offset: -2 }}
                    ticks={graphData.map((_, index) => (index + 1) % 500 === 0 ? index + 1 : null).filter(Boolean)}
                    interval={0}
                  />
                )}
                {selectedGraph === 'Training vs Testing' && (
                  <XAxis
                    dataKey="day"
                    label={{ value: 'Days', position: 'insideBottom', offset: -2 }}
                    ticks={graphData.map((_, index) => (index + 1) % 100 === 0 ? index + 1 : null).filter(Boolean)}
                    interval={0}
                  />
                )}
                {selectedGraph === 'Original vs Prediction' && (
                  <XAxis
                    dataKey="day"
                    label={{ value: 'Days', position: 'insideBottom', offset: -2 }}
                    ticks={graphData.map((_, index) => (index + 1) % 100 === 0 ? index + 1 : null).filter(Boolean)}
                    interval={0}
                  />
                )}
                <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  formatter={(value, name) => {
                    if (selectedGraph === 'Training vs Testing ' || selectedGraph === 'Original vs Prediction') {
                      return name === 'original'
                        ? [`${parseFloat(value).toFixed(2)} ${currency}`, 'Original Price']
                        : [`${parseFloat(value).toFixed(2)} ${currency}`, 'Predicted Price'];
                    }
                    return [`${parseFloat(value).toFixed(2)} ${currency}`, name];
                  }}
                  labelFormatter={() => ``}
                />
                <Legend verticalAlign="top" align="right" />

                {/* Adjust lines based on selected graph */}
                {selectedGraph === 'Closing Price vs Time' && (
                  <Line type="monotone" dataKey="closingPrice" name="Closing Price" stroke="#8884d8" dot={false} />
                )}
                {selectedGraph === 'Mean Value Analysis' && (
                  <>
                    <Line type="monotone" dataKey="closingPriceData" name="Closing Price" stroke="#8884d8" dot={false} />
                    <Line type="monotone" dataKey="mean_avg_price75" name="Mean (75 Days)" stroke="#e74ac7" dot={false} />
                    <Line type="monotone" dataKey="mean_avg_price50" name="Mean (50 Days)" stroke="#f4a44b" dot={false} />
                  </>
                )}
                {selectedGraph === 'Training vs Testing' && (
                  <>
                    <Line type="monotone" dataKey="originalPrice" name="Original Price" stroke="#82ca9d" dot={false} />
                    <Line type="monotone" dataKey="predictedPrice" name="Predicted Price" stroke="#ff7300" dot={false} />
                  </>
                )}
                {selectedGraph === 'Original vs Prediction' && (
                  <>
                    <Line type="monotone" dataKey="original_1year" name="Original Price" stroke="#82ca9d" dot={false} />
                    <Line type="monotone" dataKey="combined_predictions" name="Predicted Price" stroke="#ff7300" dot={false} />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-[#e6e7ec] text-[15px] leading-[34px] font-normal px-7 p-4 flex items-center justify-center">No data available for graph.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockPredictionChart;