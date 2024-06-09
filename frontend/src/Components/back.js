import React from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const Back = () => {

    const navigate = useNavigate()
    return (
        <div className="relative lg:ml-10 lg:block hidden  cursor-pointer top-8">
            <span 
            onClick={()=>{navigate(-1)}}
             className="hover:underline poppins text-gray-700 select-none flex items-center space-x-2"><MdOutlineKeyboardBackspace 
            className='lg:block hidden'
            /> <span>Back</span></span>
        </div>
    )
}

export default Back