// src/PosLandingPage.js

import React, { useState ,useEffect  } from 'react';
import { useNavigate , useParams  } from 'react-router-dom';
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs';
import axios from 'axios';
import swal from 'sweetalert';
import { useOrder } from '../context/OrderProvider';
import Back from '../Components/back'
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Items() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1)
    const [disabled, setDisabled] = useState(false)
    const [food , setFoods] = useState();
    const { title } = useParams();
    const {handleOrder} = useOrder()

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


    const orderfood = async(food,quantity)=>{
        console.log(food , quantity+" in orderfood")
        const res = await axios.post('http://localhost:4000/selectorder',
          {
            itemid : food.ItemID,
            price : food.Price,
            quantity : quantity
          },
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
      );
      if(res.data.success){
      swal("Wow!!!", "Your order has added to the cart", "success")
      handleOrder(food)
      navigate('/placeorder')
      }
      else
      {
        toast.error("You can order more than "+res.data.allowed+" of this item",styles)
        setQuantity(1)
      }
    }

    useEffect(() => {
      const getitems= async()=>{
        await  axios.get(`http://localhost:4000/getfooditems/${title}`).then((response) => {
           console.log(response.data.recordset);
           setFoods(response.data.recordset[0])
            if(response.data.recordset[0].selectedquantity)
            {
                setQuantity(response.data.recordset[0].selectedquantity)
            }
         }); 
     }
    getitems();
    
      },[title]);

    return (



        <main className="  max-w-screen-xl max-h-screen mx-auto   ">
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
            <Back />
        {food?(
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-10" >

                    {/* left side  */}
                    <div className="order-2  lg:order-1 flex flex-col justify-center">
                        <h1 className="text-center  lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">{food.ItemName}</h1>
                        <p className="text-center  lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">{food.Description}</p>

                        {/* price and quantity  */}
                        <div className="flex items-center justify-center  lg:justify-start space-x-6 pt-8">

                            <h1 className="text-3xl font-bold text-black poppins select-none">
                            <span 
                        className='text-3xl font-bold text-black'
                        style={{fontFamily:'Arial'}}>&#8377;</span>
                                {(food.Price * quantity).toFixed(2)}
                                </h1>
                            {/* quantity  */}
                            <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                                <AiOutlineMinus onClick={() => {
                                    quantity === 1 ? setQuantity(1) : setQuantity(quantity - 1);
                                }}
                                    className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                />
                                <span className="text-lg text-gray-700 poppins select-none">{quantity}</span>

                                <AiOutlinePlus onClick={() => {
                                    setQuantity(quantity + 1);
                                }}
                                    className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                />
                            </div>
                        </div>

                        {/* add button  */}
                        <div className="mt-8 flex items-center justify-center  lg:justify-start">
                            <button disabled={disabled} className={disabled ? "opacity-30 flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105" : "flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"} onClick={() => {
                                food['quantity'] = quantity;
                                food.Price = food.Price * quantity;
                                    orderfood(food , quantity)
                                console.log(food)
                            }}>
                                <BsCart2 className="text-xl" />
                                <span>{disabled ? "Added" : "Add to Cart"}</span>
                            </button>
                        </div>

                    </div>
                    {/* right side  */}
                    <div className="order-1  lg:order-2">
                        <img src={require(`../images/${food.image}`)} className="w-96 md:w-[500px]  lg:w-[500px] h-96 md:h-[550px] mx-auto" alt="food" />
                    </div>
                </div>
            </div>
        ):<></>}

    </main>
    )
}

export default Items;
