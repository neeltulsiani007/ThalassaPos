// src/PosLandingPage.js

import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import a1 from '../images/about.jpeg'
import Clock from 'react-live-clock';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import BarGraph from '../Components/BarChart';

function PosHome() {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState(new Date());
    const axiosPrivate = useAxiosPrivate()
    const [data,setData] = useState({})
    const [ingqty , setIngqty] = useState({})
    const [idsc , setIdsc] = useState({})

    useEffect(() => {
      const getdata= async()=>{
        await  axiosPrivate.get(`http://localhost:4000/getdata`).then((response) => {
           console.log(response.data);
            setData(response.data)
         }); 

     }

     const geting= async()=>{
      await  axiosPrivate.get(`http://localhost:4000/getingqty`).then((response) => {
         console.log(response.data);
          setIngqty(response.data.recordset)
       }); 
   }

   const getitemdesc= async()=>{
    await  axiosPrivate.get(`http://localhost:4000/getitemdesc`).then((response) => {
       console.log(response.data);
        setIdsc(response.data.recordset)
     }); 
 }


    getdata();
    geting();
    getitemdesc();
      },[]);



    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);

  
      return () => {
        clearInterval(timer);
      };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
        <div 
         style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        class="bg-gray-900 cursor-pointer transition-transform  md:translate-x-0 duration-300 ease-in-out transform md:static">
    <span
      class="absolute text-red-300 text-4xl top-5 left-4 cursor-pointer"
      onclick="openSidebar()"
    >
    </span>
    <div
    onClick={toggleSidebar}
      class={` ${!isSidebarOpen?"hidden":"sidebar  fixed   top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"}  `}
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
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white"
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
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onclick="dropdown()"
      >
        <i class="bi bi-chat-left-text-fill"></i>
        <div
        onClick={()=>{navigate('/ingredients')}}
        class="flex justify-between w-full items-center">
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
      <div class="relative w-full max-w-md sm:-ml-2">
                                    <svg 
                                     className={`${isSidebarOpen?'hidden':'hidden  md:block mt-[6px] ml-5 w-10 font-bold text-black h-10 cursor-pointer'}   `}
                                        onClick={toggleSidebar}
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
       
      </div>
      <div class="flex flex-shrink-0 items-center ml-auto">
        <button class="inline-flex items-center p-2 cursor-default  rounded-lg">
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
    <main class="p-6 sm:p-10 space-y-6">
      <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div class="mr-6">
          <h1 class="text-4xl font-semibold mb-2">Welcome To Dashboard</h1>
          <h2 class="text-gray-600 ml-0.5">Real-time insights and analytics for efficient management of orders, inventory, and sales.</h2>
        </div>
        <div class="flex flex-wrap md:items-start items-center justify-center -mb-3">
          <button
          onClick={()=>{navigate('/items/Eatables')}}
          class="inline-flex px-10 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Add Order
          </button>
          <button
          onClick={()=>{navigate('/expenses')}}
          class="inline-flex px-10 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Expense
          </button>
        </div>
      </div>
      <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div class="bg-gradient-to-r from-purple-600 to-pink-500 p-6 rounded-lg shadow-lg text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-semibold">Total Sales</h2>
                    <p class="text-3xl font-bold mt-2"><span>&#8377;</span>{data.sales}</p>
                </div>
                <div class="bg-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>


                </div>
            </div>
            <div class="mt-4">
                <span class="text-sm">Great Job! Keep up the good work.</span>
            </div>
            </div>
        <div class="bg-gradient-to-br from-green-500 to-blue-500 p-6 rounded-lg shadow-lg text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-semibold">Total Expenses</h2>
                    <p class="text-3xl font-bold mt-2"><span>&#8377;</span>{data.expense}</p>
                </div>
                <div class="bg-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-sm">Expenditure on COGS and Infrastructure.</span>
            </div>
        </div>
        <div class="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg shadow-lg text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-semibold">Number of Items</h2>
                    <p class="text-3xl font-bold mt-2">{data.totalitems+" items"}</p>
                </div>
                <div class="bg-white p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-blue-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
              </svg>

                </div>
            </div>
            <div class="mt-4">
                <span class="text-sm">Variety in Menu.</span>
            </div>
        </div>
        <div class="bg-gradient-to-r from-yellow-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-lg font-semibold">Bestseller</h2>
                    <p class="text-3xl font-bold mt-2">{data.topseller}</p>
                </div>
                <div class="bg-white p-3 rounded-full">
                    <svg class="text-blue-700 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>
            <div class="mt-4">
                <span class="text-sm">This is our best selling item.</span>
            </div>
        </div>
      </section>
      <section class="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
        <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div class="px-6 w-full h-full  py-5 font-semibold border-b border-gray-100">Month on Month Sales Growth.</div>
          <div class="p-4 flex">
            <BarGraph />
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>

          </div>
          <div>
            <span class="block md:text-xl text-2xl font-bold">{date.toDateString()}</span>
            <span class="block text-xl text-gray-500">Date</span>
          </div>
        </div>
        <div class="flex items-center p-8 bg-white shadow rounded-lg">
          <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className='text-2xl font-bold'>
          <Clock
          format={'HH:mm:ss'} ticking={true} timezone={'Asia/Calcutta'} />
            <span class="block text-xl font-normal text-gray-500">Time</span>
          </div>
        </div>
        <div class="row-span-3 bg-white shadow rounded-lg">
          <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Recently Ordered</span>
            <button type="button" class="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Quantity
          
            </button>
           
          </div>
          {ingqty?.length?
            (
          <div class="overflow-y-auto"
          style={{maxHeight: '24 rem'}}>
            <ul class="p-6 space-y-6"> 
               {ingqty.map((ing)=>(
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img src={require(`../IngredientImages/${ing.image}`)} />
                </div>
                <span class="text-gray-600">{ing.image.split('.').slice(0,1)}</span>
                <span class="ml-auto font-semibold">{ing.TotalQuantityOrdered}</span>
              </li> 
              ))} 
            </ul>
          </div>
             ):<></>}
        </div>
        <div class="row-span-3 bg-white shadow rounded-lg">
          <div class="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Top Sellers</span>
            <button type="button" class="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Sales
          
            </button>
           
          </div>
          {idsc?.length?
            (
          <div class="overflow-y-auto"
          style={{maxHeight: '24 rem'}}>
            <ul class="p-6 space-y-6"> 
               {idsc.map((ing)=>(
              <li class="flex items-center">
                <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                  <img src={require(`../images/${ing.image}`)} />
                </div>
                <span class="text-gray-600">{ing.ItemName}</span>
                <span class="ml-auto font-semibold"><span>&#8377;</span>{ing.TotalSubTotal}</span>
              </li> 
              ))} 
            </ul>
          </div>
             ):<></>}
        </div>
      </section>
    </main>
  </div>
  </div>
  </div>
    )
}

export default PosHome;
