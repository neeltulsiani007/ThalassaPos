// src/LoginPage.js

import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import axios from 'axios';
import useAuth from '../hooks/useAuth'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(){

    const [email,setEmailId] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastname] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const[loading,setLoading] = useState(false)
    const { setAuth } = useAuth();


    const styles = {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      }
  
  
    const navigate = useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    };
    const validate = (email , password) =>{
        if(!email)
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
      setLoading(true)
      if ((validate(email,password))){
        const res = await axios.post('http://localhost:4000/insertcashier',
          {
            email:email,
            password:password,
            fname:firstName,
            lname:lastName,
            username:username
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
        
        console.log(res.data);
        if (res.data.success === false){
         toast.error("Username or Email already in use",styles);
         setLoading(false)
        }
        else
        {
        const response = await axios.post('http://localhost:4000/sendemail',
        {
            CashierID : res.data.cashierid,
            email : res.data.email
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
            );
          const cid = res.data.cashierid
          const accessToken = res?.data?.accessToken;
          setAuth({ cid, password , accessToken }); 
          toast.success("Email Sent Successfully",styles)
          setTimeout(
            () => navigate(`/login`), 
            3000
          ); 
        }
    
      } 
    }


    return (
        <div className="min-h-screen bg-gray-800 text-white flex justify-center items-center">
                   <ToastContainer
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    />
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl text-black font-semibold mb-6 ">Signup</h2>
                <form onSubmit={handleSubmit} className='text-black'>
                    <div className="mb-4">
                        <label 
                            htmlFor="cashierId" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            Email
                        </label>
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={email}
                            onChange={(e)=>{setEmailId(e.target.value)}}
                            className="w-full p-2  border rounded-md"
                            placeholder="Enter email" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="firstName" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            First Name
                        </label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={firstName}
                            onChange={(e)=>{setFirstName(e.target.value)}}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter firstname" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="lastName" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            Last Name
                        </label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            value={lastName}
                            onChange={(e)=>{setLastname(e.target.value)}}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter lastname" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            htmlFor="username" 
                            className="flex text-gray-600 text-sm font-semibold mb-2"
                        >
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username}
                            onChange={(e)=>{setUsername(e.target.value)}}
                            className="w-full p-2 border rounded-md"
                            placeholder="Enter username" 
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
                    disabled={loading}
                        type="submit" 
                        className={` ${loading ? 'w-full flex mt-2 bg-gray-800 items-center justify-center text-white px-4 py-2 rounded-xl':' w-full flex mt-2 bg-gray-800 items-center justify-center text-white px-4 py-2 rounded-xl hover:font-semibold hover:bg-white hover:text-gray-800 ring-2 ring-gray-800 transition duration-300 ease-in-out'} `}
                    >
                        {loading?"Loading":"Signup"}
                        <svg aria-hidden="true" class={` ${!loading &&'hidden'} w-5 h-5 ml-2  text-gray-300 animate-spin  fill-white`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Already have an account? 
                        <Link 
                            to="/login" 
                            className="text-red-600 ml-1 hover:underline transition duration-300 ease-in-out"
                        >
                            Login
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

export default Signup;
