import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboardview = ({ onFetchData, onSelectOption }) => {
    const [companyCode, setCompanyCode] = useState('');
    const [updatedMessage, setUpdatedMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setCompanyCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading

        try {
            await onFetchData(companyCode); // Call fetchData from props to fetch company info
            setUpdatedMessage(console.log(`Ticker submitted successfully: ${companyCode}`));
        } catch (error) {
            console.error('Error submitting ticker:', error);
            const errorMessage = error.response?.data?.error || 'Error submitting ticker';
            setUpdatedMessage(errorMessage);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className='flex items-center bg-[#1c2023] justify-between h-[70px] shadow-xl shadow-black px-[25px] flex-shrink-0'>
            <form onSubmit={handleSubmit} className='flex items-center rounded-[5px] '>
                <input
                    type='text'
                    value={companyCode}
                    onChange={handleInputChange}
                    className='h-[40px] outline-none border border-[#ccc] border-r-0 focus:outline-none pl-[13px] w-[600px] rounded-l-lg placeholder:text-[14px] placeholder:text-[#000] leading-[20px] font-normal'
                    placeholder='Enter Company Ticker (e.g., AAPL)'
                    required
                />

                <button
                    type='submit'
                    disabled={loading} // Disable button while loading
                    className={`h-[40px] px-[14px] flex items-center border border-[#ccc] justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <FaSearch color='#e6e7ec' />
                </button>
                <p className='ml-2 text-[#e6e7ec]'>{updatedMessage}</p>
            </form>
        </div>
    );
};

export default Dashboardview;