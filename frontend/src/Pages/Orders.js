import React, { useState , useEffect } from 'react'
import a1 from '../images/about.jpeg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Orders() {

    const navigate = useNavigate()
    const[isSidebarOpen , setSidebarOpen] = useState(false)
    const [orders , setOrders] = useState({})
    const [orderdetail , setOrderDetail] = useState({})

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const getorders= async()=>{
          await  axios.get(`http://localhost:4000/getorders`).then((response) => {
             console.log(response.data);
             setOrders(response.data.ot)
             setOrderDetail(response.data.od)
           }); 
       }
      getorders();
        },[]);


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

  class={`${!isSidebarOpen?"hidden":"sidebar  fixed z-50   top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"}  `}
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
    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white"
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
{orders?.length?
        (
<section class="py-12 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
                Order History
            </h2>
            <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">View past orders below to analyze sales trends and optimize inventory.</p>
            {orders?.map((order) => (
            <div class="main-box bg-white border border-gray-300 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full mb-14">
                <div
                    class="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                    <div class="data">
                        <p class="font-semibold text-base leading-7 text-black">Order Id: <span class="text-indigo-600 font-medium">{order.OrderID}</span></p>
                        <p class="font-semibold text-base leading-7 text-black mt-4">Customer Name : <span class="text-gray-700 font-medium">{order.CustomerName}</span></p>
                    </div>
                    <button
                        onClick={()=>{navigate(`/bill/${order.OrderID}`)}}
                        class="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-gray-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-800 hover:shadow-gray-400">View Invoice</button>
                </div>
                <div class="w-full px-3 min-[400px]:px-6">
                {orderdetail?.filter(item => item.OrderID === order.OrderID)?.map((od) => (
                    <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6  w-full">
                        <div class="img-box max-lg:w-full">
                            <img src={require(`../images/${od.image}`)} alt="Premium Watch image" 
                                class="aspect-square w-full lg:max-w-[140px]" />
                        </div>
                        <div class="flex flex-row items-center w-full ">
                            <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                                <div class="flex items-center">
                                    <div class="">
                                        <h2 class="font-semibold text-xl leading-8 text-black mb-3">
                                            {od.ItemName}</h2>
                                        <p class="font-normal text-lg leading-8 text-gray-900 mb-3 ">
                                            Category : {od.CategoryName}</p>
                                        <div class="flex items-center ">
                                            <p
                                                class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                                Price : <span class="text-gray-500"><span>&#8377;</span>{od.Price}</span></p>
                                            <p class="font-medium text-base leading-7 text-black ">Quantity : <span
                                          class="text-gray-500"> {od.Quantity}</span></p>
                                        </div>
                                    </div>

                                </div>
                                <div class="grid grid-cols-5">
                                    <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                        <div class="flex gap-3 lg:block">
                                            <p class="font-medium text-sm leading-7 text-black">Subtotal</p>
                                            <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600"><span>&#8377;</span>{od.SubTotal}</p>
                                        </div>
                                    </div>
                                    <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                        <div class="flex gap-3 lg:block">
                                            <p class="font-medium text-sm leading-7 text-black">CashierID
                                            </p>
                                            <p
                                                class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                                {order.CashierID}</p>
                                        </div>

                                    </div>
                                    <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                        <div class="flex gap-3 lg:block">
                                            <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                                Date</p>
                                            <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-gray-700">
                                                {order.Date}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                ))}
                </div>
                <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                    <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                     
                        <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Mobile Number of Customer :  <span class="text-gray-500">{order.CustomerNumber}</span></p>
                    </div>
                    <p class="font-semibold lg:mr-16 text-lg text-black py-6">Total Price : <span class="text-indigo-600"> <span>&#8377;</span>{order.TotalAmount + 20}</span></p>
                </div>

            </div>
            ))}
        </div>
    </section>
        ):<></>}
</div>
</div>
</div>

    //      <section class="py-24 relative">
    //     <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
    //         <h2 class="font-manrope font-bold text-4xl leading-10 text-black text-center">
    //             Payment Successful
    //         </h2>
    //         <p class="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">Thanks for making a purchase
    //             you can
    //             check our order summary frm below</p>
    //         <div class="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
    //             <div
    //                 class="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
    //                 <div class="data">
    //                     <p class="font-semibold text-base leading-7 text-black">Order Id: <span class="text-indigo-600 font-medium">#10234987</span></p>
    //                     <p class="font-semibold text-base leading-7 text-black mt-4">Order Payment : <span class="text-gray-400 font-medium"> 18th march
    //                         2021</span></p>
    //                 </div>
    //                 <button
    //                     class="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">Track
    //                     Your Order</button>
    //             </div>
    //             <div class="w-full px-3 min-[400px]:px-6">
    //                 <div class="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
    //                     <div class="img-box max-lg:w-full">
    //                         <img src="https://pagedone.io/asset/uploads/1701167607.png" alt="Premium Watch image" 
    //                             class="aspect-square w-full lg:max-w-[140px]" />
    //                     </div>
    //                     <div class="flex flex-row items-center w-full ">
    //                         <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
    //                             <div class="flex items-center">
    //                                 <div class="">
    //                                     <h2 class="font-semibold text-xl leading-8 text-black mb-3">
    //                                         Premium Quality Dust Watch</h2>
    //                                     <p class="font-normal text-lg leading-8 text-gray-500 mb-3 ">
    //                                         By: Dust Studios</p>
    //                                     <div class="flex items-center ">
    //                                         <p
    //                                             class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
    //                                             Size: <span class="text-gray-500">100 ml</span></p>
    //                                         <p class="font-medium text-base leading-7 text-black ">Qty: <span
    //                                                 class="text-gray-500">2</span></p>
    //                                     </div>
    //                                 </div>

    //                             </div>
    //                             <div class="grid grid-cols-5">
    //                                 <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm leading-7 text-black">price</p>
    //                                         <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">$100</p>
    //                                     </div>
    //                                 </div>
    //                                 <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm leading-7 text-black">Status
    //                                         </p>
    //                                         <p
    //                                             class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
    //                                             Ready for Delivery</p>
    //                                     </div>

    //                                 </div>
    //                                 <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
    //                                             Expected Delivery Time</p>
    //                                         <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
    //                                             23rd March 2021</p>
    //                                     </div>

    //                                 </div>
    //                             </div>
    //                         </div>


    //                     </div>
    //                 </div>

    //                 <div class="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
    //                     <div class="img-box max-lg:w-full">
    //                         <img src="https://pagedone.io/asset/uploads/1701167621.png" alt="Diamond Watch image" 
    //                             class="aspect-square w-full lg:max-w-[140px]" />
    //                     </div>
    //                     <div class="flex flex-row items-center w-full ">
    //                         <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
    //                             <div class="flex items-center">
    //                                 <div class="">
    //                                     <h2 class="font-semibold text-xl leading-8 text-black mb-3 ">
    //                                         Diamond Platinum Watch</h2>
    //                                     <p class="font-normal text-lg leading-8 text-gray-500 mb-3">
    //                                         Diamond Dials</p>
    //                                     <div class="flex items-center  ">
    //                                         <p
    //                                             class="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
    //                                             Size: <span class="text-gray-500">Regular</span></p>
    //                                         <p class="font-medium text-base leading-7 text-black ">Qty: <span
    //                                                 class="text-gray-500">1</span></p>
    //                                     </div>
    //                                 </div>

    //                             </div>
    //                             <div class="grid grid-cols-5">
    //                                 <div class="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm leading-7 text-black">price</p>
    //                                         <p class="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">$100</p>
    //                                     </div>
    //                                 </div>
    //                                 <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm leading-7 text-black">Status
    //                                         </p>
    //                                         <p
    //                                             class="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
    //                                             Dispatched</p>
    //                                     </div>

    //                                 </div>
    //                                 <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
    //                                     <div class="flex gap-3 lg:block">
    //                                         <p class="font-medium text-sm whitespace-nowrap leading-6 text-black">
    //                                             Expected Delivery Time</p>
    //                                         <p class="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
    //                                             23rd March 2021</p>
    //                                     </div>

    //                                 </div>
    //                             </div>
    //                         </div>


    //                     </div>
    //                 </div>

    //             </div>
    //             <div class="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
    //                 <div class="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
    //                     <button
    //                         class="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
    //                         <svg class="stroke-black transition-all duration-500 group-hover:stroke-indigo-600" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
    //                             fill="none">
    //                             <path d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5" stroke="" stroke-width="1.6"
    //                                 stroke-linecap="round" />
    //                         </svg>
    //                         Cancel Order
    //                     </button>
    //                     <p class="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">Paid using Credit Card <span class="text-gray-500">ending with 8822</span></p>
    //                 </div>
    //                 <p class="font-semibold text-lg text-black py-6">Total Price: <span class="text-indigo-600"> $200.00</span></p>
    //             </div>

    //         </div>
    //     </div>
    // </section>

  )
}

export default Orders
