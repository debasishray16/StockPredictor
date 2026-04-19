import React, { useState, useCallback } from "react";
import Dashboardview from "./Dashboardview";
import Sidebar from "./Sidebar";
import CompanyDesc from "./companyDesc";
import StockPredictionChart from "./StockPredictionChart";
import CompanyInfo from "./companyInfo";
import LoadingAnim from "./LoadingAnim";
import AboutModel from "./aboutModel";
import idle from "../assets/idle.gif";

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [logoimg, setLogoimg] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [fullTimeEmployees, setFullTimeEmployees] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [currency, setCurrency] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySite, setCompanySite] = useState("");
  const [openingPrice, setOpeningPrice] = useState("");
  const [closingPrice, setClosingPrice] = useState("");
  const [maxopeningPrice, setmaxopeningPrice] = useState("");
  const [maxclosingPrice, setmaxclosingPrice] = useState("");
  const [max_high_price, setmax_high_price] = useState("");
  const [max_low_price, setmax_low_price] = useState("");
  const [avg_high_price, setavg_high_price] = useState("");
  const [avg_low_price, setavg_low_price] = useState("");
  const [lastClosingPrice, setLastClosingPrice] = useState("");
  const [combinedDates, setcombinedDates] = useState([]);

  // Fetch data from the backend for stock predictions
  const fetchData = useCallback(async (ticker) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const priceArray = result.predictions;
      const originalPriceArray = result.original;
      const closingPriceGraph = result.closing_price;
      const meanAvgPrice75 = result.mean_avg_75;
      const meanAvgPrice50 = result.mean_avg_50;
      const original8Year = result.original_last8;
      const combined_predictions = result.combined_predictions;
      const combined_dates = result.combined_dates;

      // Formatting data for prediction vs original graph
      const formattedData = priceArray.map((price, index) => ({
        day: index + 1,
        predictedPrice: price,
        originalPrice: originalPriceArray[index],
      }));

      const futurePredictionData = combined_predictions.map((price, index) => ({
        day: index + 1,
        combined_predictions: price,
        original_8year: original8Year[index],
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
        futurePredictionData: futurePredictionData,
        combined_dates: combined_dates,
      });

      // Set additional data for last closing price, 1-year predictions, etc.
      setShowAnimation(false);
      setcombinedDates(combined_dates);
      setLastClosingPrice(original8Year);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("No Data to Display.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch the company info from the backendd
  const fetchCompanyInfo = useCallback(async (ticker) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/company_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker }),
      });

      const data = await response.json();
      if (response.ok) {
        setCompanyName(data.company_name || "Full name not available");
        setSector(data.sector || "No sector information available.");
        setIndustry(data.industry || "No industry information available.");
        setFullTimeEmployees(
          data.fullTimeEmployees || "No employee data available.",
        );
        setMarketCap(data.marketCap || "No market cap available.");
        setCompanyDescription(
          data.longBusinessSummary || "",
        );
        setLogoimg(data.logo_url || "");
        setCompanySite(data.website || "No website available");
        setCurrency(data.currency || "");
        setOpeningPrice(data.openingPrice || "Opening price not available");
        setClosingPrice(data.closingPrice || "Closing price not available");
        setmaxopeningPrice(
          data.max_opening_Price || "Opening price not available",
        );
        setmaxclosingPrice(
          data.max_closing_Price || "Closing price not available",
        );
        setmax_high_price(
          data.max_high_price || "Max High price not available",
        );
        setmax_low_price(data.max_low_price || "Max Low price not available");
        setavg_high_price(
          data.avg_high_price || "Avg High price not available",
        );
        setavg_low_price(data.avg_low_price || "Avg Low price not available");
      } else {
        setCompanyDescription("");
      }
    } catch (error) {
      setCompanyDescription("");
    }
  }, []);

  // Function to handle ticker submission from the Dashboardview input box
  const handleFetchData = (ticker) => {
    fetchData(ticker); // Fetch stock prediction data
    fetchCompanyInfo(ticker); // Fetch company info
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#13161b]">
      <Sidebar
        loading={loading}
        sector={sector}
        industry={industry}
        fullTimeEmployees={fullTimeEmployees}
        marketCap={marketCap}
        companyName={companyName}
        companySite={companySite}
        currency={currency}
      />
      <div className="flex-grow flex flex-col overflow-auto w-full">
        <Dashboardview
          onFetchData={handleFetchData}
          className="pt-0 px-0 top-0 "
          onSelectOption={handleFetchData}
        />
        <div className="flex-grow flex flex-col overflow-auto pl-4 pr-4">
          {showAnimation ? (
            <>
              {!loading && (
                <h1 className="text-[30px] italic text-[#e6e7ec] leading-[34px] font-semibold p-4 pt-[100px] flex justify-center items-center">
                  Enter a company ticker to see predictions and insights
                </h1>
              )}
              <div className="flex justify-center items-center h-screen">
                <LoadingAnim loading={loading} />
              </div>
            </>
          ) : (
            <>
              <CompanyInfo
                loading={loading}
                currency={currency}
                openingPrice={openingPrice}
                closingPrice={closingPrice}
                maxOpen={maxopeningPrice}
                maxClose={maxclosingPrice}
                max_high_price={max_high_price}
                max_low_price={max_low_price}
                avg_high_price={avg_high_price}
                avg_low_price={avg_low_price}
              />
              {companyDescription && (
                <CompanyDesc
                  companyDescription={companyDescription}
                  logoimg={logoimg}
                  loading={loading}
                  showAnimation={showAnimation}
                />
              )}


              <StockPredictionChart
                data={data}
                loading={loading}
                errorMessage={errorMessage}
                currency={currency}
                companyName={companyName}
                lastClosingPrice={lastClosingPrice}
                xlabel={combinedDates}
              />
            </>
          )}
          <div className="flex items-end w-full justify-end py-4 px-4">
            <div className="flex flex-row items-center gap-5 text-[#e6e7ec]">
              <div className="flex flex-row gap-[10px] items-center rounded-lg">
                <a
                  href="https://github.com/debasishray16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-bold hover:underline"
                >
                  Debasish Ray
                </a>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="#e6e7ec"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
              <div className="flex flex-row gap-[10px] items-center rounded-lg">
                <a
                  href="https://github.com/gamecoder08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-bold hover:underline"
                >
                  Utkarsh Raj Sinha
                </a>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="#e6e7ec"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
