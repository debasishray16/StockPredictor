import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboardview = ({ onFetchData }) => {
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
        </div>
    );
};

export default Dashboardview;