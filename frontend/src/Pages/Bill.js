import React, { useState , useEffect } from 'react'
import Back from '../Components/back'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import a1 from '../images/about.jpeg'
import { useNavigate } from 'react-router-dom';

function Bill(){


    const { orderid } = useParams();
    const [bill , setBill] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const getbill= async()=>{
          await  axios.get(`http://localhost:4000/getbill/${orderid}`).then((response) => {
             console.log(response.data.recordset);
             setBill(response.data.recordset)
           }); 
       }
      getbill();
        },[orderid]);

  return (
   
    <div className="h-full bg-[url('./images/bg.avif')]">
        <Back />
        {bill?.length?
        (
    <div class="bg-white rounded-lg shadow-lg px-8 py-2 max-w-xl mx-auto">
    <div class="flex items-center justify-between mb-8">
        <div class="flex items-center">
            <img class="h-8 w-8 mr-2" src={a1}
                alt="Logo" />
            <div class="text-gray-700 font-semibold text-lg">Thalassa</div>
        </div>
        <div class="text-gray-700">
            <div class="font-bold text-xl mb-2">INVOICE</div>
            <div class="text-sm">Date : {bill[0].Date}</div>
            <div class="text-sm">OrderID : {bill[0].OrderID.slice(0,1)}</div>
        </div>
    </div>
    <div class="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
        <div class="text-gray-700 mb-2">{bill[0].CustomerName}</div>
        <div class="text-gray-700 mb-2">{bill[0].CustomerNumber}</div>
        <div class="text-gray-700 mb-2">CashierID : {bill[0].CashierID}</div>
    </div>
    <table class="w-full text-left mb-8">
    
        <thead>
            <tr>
                <th class="text-gray-700 font-bold uppercase py-2">Description</th>
                <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
                <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                <th class="text-gray-700 font-bold uppercase py-2">Total</th>
            </tr>
        </thead>
    
        <tbody>
        {bill?.map((item) => (
            <tr>
                <td class="py-4 text-gray-700">{item.ItemName}</td>
                <td class="py-4 text-gray-700">{item.Quantity}</td>
                <td class="py-4 text-gray-700"><span>&#8377;</span>{item.Price}</td>
                <td class="py-4 text-gray-700"><span>&#8377;</span>{item.SubTotal}</td>
            </tr>
        ))}
         
        </tbody>
    </table>
    <div class="flex justify-end mb-8">
        <div class="text-gray-700 mr-2">Subtotal:</div>
        <div class="text-gray-700"><span>&#8377;</span>{bill[0].TotalAmount}</div>
    </div>
    <div class="text-right mb-8">
        <div class="text-gray-700 mr-2">Delivery Fee:</div>
        <div class="text-gray-700"><span>&#8377;</span>20</div>

    </div>
    <div class="flex justify-end mb-8">
        <div class="text-gray-700 mr-2">Total:</div>
        <div class="text-gray-700 font-bold text-xl"><span>&#8377;</span>{bill[0].TotalAmount + 20}</div>
    </div>
    <div class="border-t-2 flex items-center justify-center w-full border-gray-300 pt-8 mb-8">
        <div class="text-gray-700 ">Thank you for dining at Thalassa.</div>
        <button 
        onClick={()=>{navigate('/poshome')}}
        className='border-2 p-2 w-32 font-semibold border-gray-700 hover:text-white hover:bg-gray-700 ml-4 rounded-lg'>Continue</button>
    </div>
</div>
  ):<></>}
</div>
  )

}

export default Bill
