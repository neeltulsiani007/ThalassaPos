import React from 'react'
import axios from 'axios'; 
import { useState ,useEffect} from 'react';
import a1 from '../images/about.jpeg'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Ingredients() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [search , SetSearch] = useState('')
    const navigate = useNavigate();
    const [ingredients , setIngredients] = useState();
    const axiosPrivate = useAxiosPrivate()
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  

    useEffect(() => {
      const getitems= async()=>{
        await  axios.get(`http://localhost:4000/getingredients`).then((response) => {
           console.log(response.data.ing);
           setIngredients(response.data.ing)
         }); 
     }
    getitems();
    
      },[]);

      const handleSearch = async(e)=>{
        SetSearch(e.target.value)
        const res = await axiosPrivate.post(`http://localhost:4000/filteringredients`,
        {
          ingname : e.target.value
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
      setIngredients(res.data.recordset)
      }

    return (
        <div className="flex h-screen bg-gray-100">
        <div 
         style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        class="bg-gray-900 z-10 transition-transform  md:translate-x-0 duration-300 ease-in-out transform md:static">
    <span
      class="absolute text-red-300 text-4xl top-5 left-4 cursor-pointer"
      onclick="openSidebar()"
    >
    </span>
    <div
    
      class={` ${!isSidebarOpen?"hidden":"sidebar  fixed z-50   top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"}  `}
    >
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
        <img src={a1} class="h-8 w-8 rounded-full" alt="Flowbite Logo" />
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">Thalassa</h1>
          <svg
          onClick={toggleSidebar}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-28  cursor-pointer ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div
        class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
      >
        <i class="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
      </div>
      <div
      onClick={()=>{navigate('/poshome')}}
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i class="bi bi-house-door-fill"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Dashboard</span>
      </div>
  
      <div class="my-4 bg-gray-600 h-[1px]"></div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div
        onClick={()=>{navigate('/items/Eatables')}}
        class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Items</span>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div 
         onClick={()=>{navigate('/orders')}}
        class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Orders</span>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Inventory</span>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div 
        onClick={()=>{navigate('/expenses')}}
        class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Expenses</span>
          <span class="text-sm rotate-180" id="arrow">
            <i class="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
      onClick={()=>{navigate('/')}}
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i class="bi bi-box-arrow-in-right"></i>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </div>
    </div>
  </div>

     

         <div className="flex-1 overflow-y-auto">
 <div class="flex-grow text-gray-800">
    <header class="flex items-center h-20 px-6 sm:px-10 bg-white">
      <button
      onClick={toggleSidebar}
      class={` ${isSidebarOpen?'hidden':'block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full'} `}>
        <span class="sr-only">Menu</span>
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>
      <div class="relative max-w-md sm:-ml-2">
                                    <svg 
                                     className={`${isSidebarOpen?'hidden':'hidden  md:block mt-[6px] ml-5 w-10 font-bold text-black h-10 cursor-pointer'}   `}
                                        onClick={toggleSidebar}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
       
      </div>
      <div class="relative  w-full xl:px-48 md:px-20   flex items-center justify-center rounded-md ">
          <svg class="absolute hidden left-52 xl:block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" class=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
          </svg>
          <input
          value={search}
          onChange={handleSearch}
          type="name" name="search" class="h-12 placeholder:opacity-0 lg:placeholder:opacity-100 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 xl:pl-12 pl-4 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Enter Item Name ..." />
         
        </div>
      <div class="flex flex-shrink-0 items-center ml-auto">
        <button class="inline-flex items-center p-2 cursor-default rounded-lg">
          <span class="sr-only">User Menu</span>
          <div class="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span class="font-semibold">POS System</span>
            <span class="text-sm text-gray-600">Thalassa</span>
          </div>
          <span class="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            <img src={a1} alt="user profile photo" class="h-full w-full object-cover" />
          </span>
          <svg
          onClick={()=>{navigate('/placeorder')}}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 cursor-pointer font-bold   h-7 ml-5 text-gray-400  hover:text-gray-600  ">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
        </button>
        <div class="border-l pl-3 ml-3 space-x-1">
      
          <button
          onClick={()=>{navigate('/')}}
          class="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            <span class="sr-only">Log out</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
</svg>
          </button>
        </div>
      </div>
    </header>

    {ingredients?.length?
      (
    <main class="p-6 sm:p-10 space-y-6">
    <div className='  items-center justify-center flex space-x-5   mb-10  '>
    <div
    // onClick={()=>{navigate('/items/Eatables')}}
    className={`flex cursor-pointer bg-red-700  w-32 px-[13px] py-2 items-start text-lg justify-start   rounded-full  text-white`}
    >
        Ingredients
    </div>

    </div>
      <section class="z-0 grid lg:grid-cols-3 md:grid-cols-2  place-content-center xl:grid-cols-4 gap-6">
     
      {ingredients?.map((ingredient) => (
       <div class=" bg-gray-100 flex items-center">
       <div class="container border-[1px] mx-4 p-9 bg-white max-w-md rounded-2xl  overflow-clip hover:shadow-2xl hover:scale-105 transform transition duration-500 ">
       <h1 className='flex mb-4 py-1 w-28 items-center justify-center  bg-red-100 border-[1px] rounded-full border-[#f91944] text-[#f91944] '>{ingredient.IngredientCategory}</h1>
        <img class="rounded-xl w-full h-52" src={require(`../IngredientImages/${ingredient.image}`)} alt="" />
        <div class="flex justify-between items-center">
          <div>
            <h1 class="mt-5 text-xl font-semibold">{ingredient.IngredientName}</h1>
            <p class="mt-2 font-bold"><span>&#8377;</span>{ingredient.IngredientPrice + " per unit"}</p>
          </div>
          <div className=''>
            <button
            onClick={()=>{navigate(`/ingredientdetail/${ingredient.IngredientName}`)}}
            class="text-white flex text-md font-semibold bg-[#f91944] hover:bg-red-700 py-2 px-2  rounded-lg shadow-md hover:shadow-lg  ">Stock <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          </button>
          </div>
        </div>
       </div>
       </div>
      ))}   
      </section>
    </main>
      ):<></>}
  </div>
  </div>
  </div>
    )
}

export default Ingredients
