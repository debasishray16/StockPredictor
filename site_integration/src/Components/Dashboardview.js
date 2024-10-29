import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboardview = ({ onFetchData, onSelectOption }) => {
    const [companyCode, setCompanyCode] = useState('');
    const [updatedMessage, setUpdatedMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setCompanyCode(event.target.value);
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        onSelectOption(selectedValue);  // Send the selected option back to Main for fetching data
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
        <div className='flex items-center justify-between h-[70px] shadow-lg border-black px-[25px] bg-[#09071d] flex-shrink-0'>
            <form onSubmit={handleSubmit} className='flex items-center rounded-[5px]'>
                <input
                    type='text'
                    value={companyCode}
                    onChange={handleInputChange}
                    className='bg-[#101830] h-[40px] outline-[3px] pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] placeholder:text-[#c7cad8] text-white leading-[20px] font-normal'
                    placeholder='Enter Company Ticker (e.g., AAPL)'
                    required
                />
                <button
                    type='submit'
                    disabled={loading} // Disable button while loading
                    className={`bg-[#101830] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <FaSearch color='#c7cad8' />
                </button>
                <p className='ml-2 text-white'>{updatedMessage}</p>
            </form>
            {/*
            <div className='py-4 cursor-pointer'>
                <label htmlFor="dropdown" className='text-[15px] leading-[20px] py-[20px] pr-[20px] font-bold #1e1e2d text-[#c7cad8]'> Or Select an option:</label>
                <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleChange}
                    className="rounded p-2 bg-[#101830] text-[#c7cad8]">
                    <option value="">Choose an option</option>
                    <option value="JPM">J.P. Morgan</option>
                    <option value="AAPL">Apple</option>
                    <option value="GOOG">Google</option>
                    <option value="AMZN">Amazon</option>
                    <option value="ARCC">Ares Capital Corporation</option>
                    <option value="MMM">3M Company</option>
                    <option value="MGK">MGK</option>
                    <option value="IEP">Icahn Enterprises L.P.</option>
                    <option value="AAP">Advance Auto Parts, Inc.</option>
                </select>
            </div>
            */}
        </div>
    );
};

export default Dashboardview;