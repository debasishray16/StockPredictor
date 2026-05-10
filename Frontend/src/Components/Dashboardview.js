import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import AboutModel from "./aboutModel";

const Dashboardview = ({ companySelected, onFetchData, onSelectOption }) => {
    const [companyCode, setCompanyCode] = useState(companySelected || "");
    const [updatedMessage, setUpdatedMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setCompanyCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading

        try {
            await onFetchData(companyCode); // Call fetchData from props to fetch company info
            setUpdatedMessage(
                console.log(`Ticker submitted successfully: ${companyCode}`),
            );
        } catch (error) {
            console.error("Error submitting ticker:", error);
            const errorMessage =
                error.response?.data?.error || "Error submitting ticker";
            setUpdatedMessage(errorMessage);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        if (companySelected) {
            setCompanyCode(companySelected);
            handleAutoFetch(companySelected);
        }
    }, [companySelected]);

    const handleAutoFetch = async (ticker) => {
        setLoading(true);
        try {
            await onFetchData(ticker);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center bg-[#1c2023] justify-between h-[70px] z-10 shadow-xl shadow-black px-[25px] flex-shrink-0">
            <form
                onSubmit={handleSubmit}
                className="flex items-center rounded-[5px] "
            >
                <input
                    type="text"
                    value={companyCode}
                    onChange={handleInputChange}
                    className="h-[40px] outline-none bg-[#15181d] text-[#e6e7ec] border border-[#e6e7ec] border-r-0 focus:outline-none pl-[13px] w-[600px] rounded-l-lg placeholder:text-[14px] placeholder:text-[#e6e7ec] leading-[20px] font-normal"
                    placeholder="Enter Company Ticker"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`h-[40px] px-[14px] flex items-center border border-[#e6e7ec] justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <FaSearch color="#e6e7ec" />
                </button>
                <p className="ml-2 text-[#e6e7ec]">{updatedMessage}</p>
            </form>
            <button className="relative group">
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                        {" "}
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#e6e7ec"
                            strokeWidth="1.5"
                        ></circle>{" "}
                        <path
                            d="M12 17V11"
                            stroke="#e6e7ec"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>{" "}
                        <circle
                            cx="1"
                            cy="1"
                            r="1"
                            transform="matrix(1 0 0 -1 11 9)"
                            fill="#e6e7ec"
                        ></circle>{" "}
                    </g>
                </svg>
                <div className="absolute bg-[#1c2023] right-0 top-[45px] w-[350px] 
                    text-white rounded-lg shadow-xl shadow-black p-4
                    opacity-0 group-hover:opacity-100 transition duration-200 z-50">
                    <AboutModel />
                </div>
            </button>
        </div>
    );
};

export default Dashboardview;
