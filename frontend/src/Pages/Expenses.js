import React, { useState ,useEffect  } from 'react';
import a1 from '../images/about.jpeg'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Expenses() {

    const axiosPrivate = useAxiosPrivate()
    const [expenses,setExpenses] = useState({})
    const [cashier , setCashier] = useState({})
    const[invoice , setInvoice] = useState('')
    const[ingname , setIngname] = useState('')
    const[startdate , setStartDate] = useState('')
    const[enddate , setEndDate] = useState('')
    const [cid , setCid] = useState('')
    const [modal , setModal] = useState(false)
    const [modalcid , setModalCid] = useState('')
    const [modaldes , setModalDes] = useState('')
    const [modalquan , setModalQuan] = useState('')
    const [modalamt , setModalAmt] = useState('')

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



    useEffect(() => {

        const getcashier= async()=>{
            await  axiosPrivate.get(`http://localhost:4000/getcashiers`).then((response) => {
               console.log(response.data.recordset);
               setCashier(response.data.recordset)
             }); 
         }

        const getitems= async()=>{
          await  axiosPrivate.get(`http://localhost:4000/getexpenses`).then((response) => {
             console.log(response.data.recordset);
             setExpenses(response.data.recordset)
           }); 
       }
      getitems();
      getcashier()
      
        },[]);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handlereset = async(e)=>{

        e.preventDefault()

        setInvoice("")
        setEndDate("")
        setStartDate("")
        setCid("")
        setIngname("")

        await  axiosPrivate.get(`http://localhost:4000/getexpenses`).then((response) => {
            console.log(response.data.recordset);
            setExpenses(response.data.recordset)
          }); 

    }

    const handlesearch = async(e)=>{
        e.preventDefault()
        setInvoice(e.target.value)

        console.log(invoice , ingname , cid , startdate , enddate)
        const res = await axiosPrivate.post('http://localhost:4000/filterexpense',
        {
         invoice:e.target.value,
         ingname:ingname,
         startdate:startdate,
         enddate:enddate,
         cid:cid
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    setExpenses(res.data.recordset)
    }

    const handleingchange = async(e)=>{
        e.preventDefault()
        setIngname(e.target.value)

        console.log(invoice , ingname , cid , startdate , enddate)
        const res = await axios.post('http://localhost:4000/filterexpense',
        {
         invoice:invoice,
         ingname:e.target.value,
         startdate:startdate,
         enddate:enddate,
         cid:cid
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

    setExpenses(res.data.recordset)

    }

    const handleallsearch = async(e)=>{
        e.preventDefault()
        setInvoice(e.target.value)

        console.log(invoice , ingname , cid , startdate , enddate)
        const res = await axios.post('http://localhost:4000/filterexpense',
        {
         invoice:invoice,
         ingname:ingname,
         startdate:startdate,
         enddate:enddate,
         cid:cid
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    setExpenses(res.data.recordset)
    }

    const handlemodalsubmit = async(e)=>{

        e.preventDefault()
        const re = /^[0-9\b]+$/;
        if(modalquan !== ''){
            if(re.test(modalamt) && re.test(modalquan))
            {
                var res = await axiosPrivate.post('http://localhost:4000/addexpense',
                {
                 cid:modalcid,
                 amt:modalamt,
                 quantity : modalquan,
                 des : modaldes
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            }
            else
            {
                if(re.test(modalamt))
                {
                    toast.error("Invalid Quantity",styles)
                }
                else
                {
                    toast.error("Invalid Amount",styles)
                }
            }
        }
        else
        {
            if(re.test(modalamt))
            {
                var res = await axiosPrivate.post('http://localhost:4000/addexpense',
                {
                 cid:modalcid,
                 amt:modalamt,
                 des : modaldes,
                 quantity:"none"
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            }
            else
            {
                toast.error("Invalid Amount",styles)
            }
        }
        setExpenses(res.data.recordset)
        toast.success('Adding Expense',{styles});
    setTimeout(
        () => setModal(false), 
        3000
      );
    }

    const handlecancel = ()=>{
        setModalCid('')
        setModalAmt('')
        setModalDes('')
        setModalQuan('')
    }
  

  return (
    <div className="flex h-screen bg-gray-100">
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
         <div class={`${modal?'flex py-32 bg-gray-200 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 ':'hidden'}  `} id="modal">
                <div role="alert" class="container space-y-4 mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div class="w-full flex justify-start text-gray-600 mb-3">
                            <svg  xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" width="52" height="52" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-8">Enter Expense Details</h1>
                        <label for="name" class="text-gray-800 text-sm font-bold leading-tight flex tracking-normal">Cashier ID</label>
                        <input 
                        required
                        value={modalcid}
                        onChange={(e)=>{setModalCid(e.target.value)}}
                        id="name" class="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 placeholder:text-sm text-sm border-gray-300 rounded border" placeholder="Enter CashierID" />
                        <label for="email2" class="text-gray-800 flex text-sm font-bold leading-tight tracking-normal">Enter Description</label>
                        <div class="relative mb-5 mt-2">
                        <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                            </div>
                            <input
                            required
                            value={modaldes}
                            onChange={(e)=>{setModalDes(e.target.value)}}
                            type='text' id="email2" class="text-gray-600 placeholder:pt-2  focus:outline-none focus:border focus:border-indigo-700 font-normal w-full flex items-center pl-16 text-sm border-gray-300 rounded border h-10" placeholder="Enter Description ..." />
                        </div>
                        <label for="expiry" class="text-gray-800 flex text-sm font-bold leading-tight tracking-normal">Quantity (Optional)</label>
                        <div class="relative mb-5 mt-2">
                            <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                            </div>
                            <input
                            value={modalquan}
                            onChange={(e)=>{setModalQuan(e.target.value)}}
                            id="expiry" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Quantity ... " />
                        </div>
                        <label for="cvc" class="text-gray-800 flex text-sm font-bold leading-tight tracking-normal">Enter Total Amount</label>
                        <div class="relative mb-5 mt-2">
                            <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                              
                            </div>
                            <input
                            required
                            value={modalamt}
                            onChange={(e)=>{setModalAmt(e.target.value)}}
                            id="cvc" class="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Amount ..." />
                        </div>
                        <div class="flex items-center justify-start w-full">
                            <button 
                            onClick={handlemodalsubmit}
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2  transition duration-150 ease-in-out hover:text-white text-blue-900 border-2 rounded-lg border-blue-800   hover:bg-blue-900 font-semibold   px-8 py-2 text-sm">Submit</button>
                            <button
                            onClick={handlecancel}
                            class="focus:outline-none focus:ring-2 focus:ring-offset-2  transition duration-150 ease-in-out hover:text-white text-blue-900 border-2 rounded-lg border-blue-800 ml-2  hover:bg-blue-900 font-semibold   px-8 py-2 text-sm" onclick="modalHandler()">Cancel</button>
                        </div>
                        <button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onclick="modalHandler()" aria-label="close modal" role="button">
                        <svg 
                        onClick={()=>{setModal(false)}}
                        xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
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
    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-blue-600 text-white"
    onclick="dropdown()"
  >
    <i class="bi bi-chat-left-text-fill"></i>
    <div class="flex justify-between w-full items-center">
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

{/* Filters */}

<div class="m-10 w-screen max-w-screen-xl mx-auto">
  <div class="flex flex-col">
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <form class="">
        <div class="relative mb-10 w-full flex items-center justify-between rounded-md ">
          <svg class="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" class=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
          </svg>
          <input
          value={invoice}
          onChange={handlesearch}
          type="name" name="search" class="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by Invoice Number ..." />
          <button 
          onClick={(e)=>{e.preventDefault(); setModal(true)}}
          class="h-12 w-1/3 mx-auto hover:bg-blue-800 items-center justify-center ml-4  rounded-md border  bg-blue-600 px-8 py-2 font-medium text-white outline-none  cursor-pointer  focus:ring"  >Add Expense</button>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div class="flex flex-col">
            <label for="name" class="text-sm font-medium text-stone-600">Ingredient Name</label>
            <input 
            value={ingname}
            onChange={handleingchange}
            type="text" id="name" placeholder="Enter Name " class="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>

{cashier?.length?
(
          <div class="flex flex-col">
            <label for="manufacturer" class="text-sm font-medium text-stone-600">CashierID</label>
            <select
              onChange={(e)=>{  setCid(e.target.value)}}
            id="manufacturer" class="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option value="">Select Cashier ID</option>
             {cashier.map((c)=>(
               <option value={c.CashierID}>{c.CashierID}</option> 
             ))}
            </select>
          </div>
  ):<></>}

          <div class="flex flex-col">
            <label for="date" class="text-sm font-medium text-stone-600">Start Date</label>
            <input
              value={startdate}
              onChange={(e)=>{setStartDate(e.target.value)}}
            type="date" id="date" class="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>

          <div class="flex flex-col">
            <label for="date" class="text-sm font-medium text-stone-600">End Date</label>
            <input 
              value={enddate}
              onChange={(e)=>{setEndDate(e.target.value)}}
            type="date" id="date" class="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
        </div>

        <div class="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
          <button 
          onClick={handlereset}
          class="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:bg-gray-300 focus:ring">Reset</button>
          <button
          onClick={handleallsearch}
          class="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:bg-blue-800 focus:ring">Search</button>
        </div>
      </form>
    </div>
  </div>
  
</div>

{/* Invoices */}
<div className="container max-h-screen overflow-scroll mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Invoice History</h1>
            
            {/* Invoice History Table */}
           
            <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
            {expenses?.length?
            (
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Invoice
                            </th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cashier ID
                            </th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">
                                View Invoice
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">

                        {/* Sample Data */}
                        {expenses.map((expense)=>(
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-gray-900">#{expense.PurchaseOrderID}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-blue-800">{expense.Description?expense.Description:expense.IngredientName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-700">{expense.Quantity?expense.Quantity:'-'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium  text-gray-900"><span>&#8377;</span>{expense.SubTotal}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-blue-50 text-blue-600">{expense.CashierID}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-normal ">{expense.Date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    View
                                </button>
                            </td>
                        </tr>
                        ))}
                     
                        {/* More rows can be added similarly */}
                    </tbody>
                </table>
                ):<></>}
            </div>
        </div>
</div>
</div>
</div>
  )
}

export default Expenses
