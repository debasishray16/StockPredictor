import React, { useState } from 'react'
import { FaEnvelope, FaRegBell, FaSearch } from 'react-icons/fa'
import Photo from "../assets/Photo.png"

const Dashboardview = () => {
    const [open, setOpen] = useState(false)

    const showDropDown = () => {
        setOpen(!open)
    }
    return (
        <div className='flex items-center justify-between h=[70px] shadow-lg px-[25px]'>
            <div className='flex items-center rounded=[5px]'>
                <input type='text' className='bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-[5px] placeholder:text-[14px] leading-[20px] font-normal' placeholder='Search for...' />
                <div className='bg-[#4E73DF] h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px]'>
                    <FaSearch color='white' />
                </div>
            </div>
            <div className='flex items-center gap-[15px] relative'>
                <div className='flex items-center gap-[25px] border-r-[1px] pr-[25px]'>
                    <FaRegBell />
                    <FaEnvelope />
                </div>
                <div className='flex items-center gap-[15px] relative' onClick={showDropDown}>
                    <p>My Profile</p>
                    <div className='h-[50px] w-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center relative'>
                        <img src={Photo} alt='' />
                    </div>
                    {
                        open &&
                        <div className='bg-white border h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[10px] space-y-[10px]'>
                            <p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                            <p className='cursor-pointer hover:text-[blue] font-semibold'>Settings</p>
                            <p className='cursor-pointer hover:text-[blue] font-semibold'>Log Out</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboardview