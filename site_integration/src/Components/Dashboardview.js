import React, { useState } from 'react'
import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa'
import axios from 'axios';

const Dashboardview = () => {

    const [companyCode, setCompanyCode] = useState('');
    const [updatedMessage, setUpdatedMessage] = useState('');

    const handleInputChange = (event) => {
        setCompanyCode(event.target.value);
    };

    const handleSubmit = async () => {
        try {
        await axios.post('http://localhost:3001/api/update-json', { companyCode });
        setUpdatedMessage('JSON file updated successfully');
        } catch (error) {
        console.error('Error updating JSON:', error);
        setUpdatedMessage('Error updating JSON file');
        }
  };

    return (
        <div className='flex items-center justify-between h-[70px] shadow-lg border-black px-[25px] bg-[#09071d]'>
            <div className='flex items-center rounded-[5px]'>
                <input type='text' value={companyCode} onChange={handleInputChange} className='bg-[#101830] h-[40px] outline-[3px] pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] placeholder:text-[#c7cad8] text-white leading-[20px] font-normal' placeholder='Search for...' />
                <button onClick={handleSubmit} className='bg-[#101830] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                    <FaSearch color='#c7cad8' />
                </button>
                <p>{updatedMessage}</p>
            </div>
            <div className='flex items-center gap-[15px] relative'>
                <div className='flex items-center gap-[25px] pr-[25px]'>
                    <FaRegBell className='cursor-pointer text-[#c7cad8] hover:text-[#4E73DF]'/>
                    <FaEnvelope className='cursor-pointer text-[#c7cad8] hover:text-[#4E73DF]'/>
                </div>
            </div>
        </div>
    )
}

export default Dashboardview