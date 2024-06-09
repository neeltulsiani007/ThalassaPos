// src/LoginPage.js

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import a1 from '../images/about.jpeg'
import axios from 'axios';
import useAuth from '../hooks/useAuth'


function LoginPage() {

    const [cashierId,setCashierId] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const[Gotohomepage,setGotohomepage] = useState(false);
    const { setAuth } = useAuth();
  
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };
    const validate = (cashierId , password) =>{
        if(!cashierId)
        {
         alert("CashierId is required")
         return false
        }
        if(!password)
        {
         alert("Password is required")
         return false
        }
        return true
     }

    const handleSubmit = async(e) =>
    {
      e.preventDefault();
      if ((validate(cashierId,password))){
        const res = await axios.post('http://localhost:4000/checkuserexists',
          {
            cashierid:cashierId,
            password:password
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
        console.log(res.data);
        if (res.data.success === false){
         alert("Invalid Id or Password");
        }
        else
        {
          const accessToken = res?.data?.accessToken;
          setAuth({ cashierId, password , accessToken }); 
          navigate('/poshome')  
        }
      } 
    }


    return (
        
        <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl text-black font-semibold mb-6 ">Login</h2>
                <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                        <label 
                            htmlFor="cashierId" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            Cashier ID
                        </label>
                        <input 
                            type="text" 
                            id="cashierId" 
                            name="cashierId" 
                            value={cashierId}
                            onChange={(e)=>{setCashierId(e.target.value)}}
                            className="w-full p-2  border rounded-md"
                            placeholder="Enter cashier ID" 
                            required 
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label 
                            htmlFor="password" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            Password
                        </label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className="w-full p-2 border rounded-md pr-10"  // Added pr-10 for icon spacing
                            placeholder="Enter password" 
                            required 
                        />
                        <button 
                            type="button" 
                            className="absolute top-1/2 mt-[14px]  right-2 transform -translate-y-1/2 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <EyeOffIcon className="h-5 w-5 text-gray-600" />
                            ) : (
                                <EyeIcon className="h-5 w-5 text-gray-600" />
                            )}
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full mt-2 bg-gray-800 text-white px-4 py-2 rounded-xl hover:font-semibold hover:bg-white hover:text-gray-800 ring-2 ring-gray-800 transition duration-300 ease-in-out"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Dont have an account? 
                        <Link 
                            to="/signup" 
                            className="text-red-600 ml-1 hover:underline transition duration-300 ease-in-out"
                        >
                            Signup
                        </Link>
                    </p>
                </div>
                <div className="mt-4 text-center">
                    <button 
                        onClick={()=>{navigate('/')}}
                        className="text-gray-600 hover:font-bold focus:outline-none"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
       
       
    );
}

export default LoginPage;
