import React, { useState ,useEffect } from 'react';
import swal from 'sweetalert';
import DeliveryForm from '../Components/DeliveryForm';
import { useDelivery } from '../context/DeliveryProvider';
import axios from 'axios';
import Back from '../Components/back';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaceOrderScreen = () => {
    const [ order, setOrder ] = useState({});
    const { input, disabled } = useDelivery();
    const [total ,setTotal] = useState(0)
    const [subTotal ,setSubTotal] = useState(0)
    const [deliveryFee ,setDeliveryFee] = useState(20)
    const navigate = useNavigate()

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
  

    const deletefromcart = async(id,p)=>{
        console.log("in delete from cart id: "+id)
        const res = await axios.post('http://localhost:4000/deletefromcart',
        {
          itemid : id,
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(res.data.success)
    setOrder((prev) => {
        return prev.filter(item => {
            return item.ItemID !== id
        })
    })
    setSubTotal(subTotal-p)
    setTotal(subTotal-p+deliveryFee)
    }

    const generatebill = async()=>{
        const res = await axios.post('http://localhost:4000/generatebill',
        {
          input : input,
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(res.data.orderid)
    toast.success('Generating Bill',{styles});
    setTimeout(
        () => navigate(`/bill/${res.data.orderid}`), 
        3000
      );
   
    }

    useEffect(() => {
        const getitems= async()=>{
          await  axios.get(`http://localhost:4000/getcart`).then((response) => {
             console.log(response.data.recordset);        
                  setOrder(response.data.recordset)
                  setSubTotal(response.data.recordset.reduce((n, {TotalPrice}) => n + TotalPrice, 0));
                  setTotal(response.data.recordset.reduce((n, {TotalPrice}) => n + TotalPrice, 0) +20)
           });   
       }
      getitems();
      setDeliveryFee(20)
        },[]);
    
    return (
        <main className=" h-screen bg-[url('./images/bg.avif')] ">
            <div className="max-w-screen-xl py-20 mx-auto px-6">
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
                {order?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                            {/* left side form  */}
                            <div className="col-span-1">
                                <DeliveryForm />
                            </div>
                            {/* right side  */}
                            <div className="col-span-1">
                                <div className="glass p-6 box-border rounded-lg">
                                    {/* order details  */}
                                    <div className="flex flex-col space-y-4 mb-3">
                                        <p className="poppins text-gray-700"> Name :  <span className="font-semibold text-black">{input.name ? `${input.name}` : '-----'}</span></p>
                                        <p className="poppins text-gray-700">Mobile No : <span className="font-semibold text-black">{input.number ? `${input.number}` : '-----'}</span> </p>
                                        <p className="poppins text-gray-700"> Date : <span className="font-semibold text-black">{input.date ? `${input.date}` : '-----'}</span> </p>
                                        <p className="poppins text-gray-700"> CashierId : <span className="font-semibold text-black">{input.cashierid ? `${input.cashierid}` : '-----'}</span> </p>
                                    </div>
                                    {/* orders  */}

                                    <div className=" flex flex-col space-y-3 h-64 overflow-y-scroll  orderContainer  " >
                                        {order.map(props => (
                                             <div className=" rounded-lg p-4 flex space-x-3">
                                             <div className="flex">
                                                 <img className="w-24 h-24 object-contain" src={require(`../images/${props.image}`)} alt="" />
                                             </div>
                                             <div className="flex items-start justify-start space-x-5 flex-col space-y-3 flex-grow">
                                                 <h1 className="text-base font-medium poppins pl-5 text-gray-700">{props.ItemName}</h1>
                                                 <h1 className="font-semibold text-lg text-primary poppins"><span>&#8377;</span>{props.TotalPrice}</h1>
                                                 <p className="text-sm poppins text-gray-400">{props.CategoryName}</p>
                                             </div>
                                 
                                             <div className="flex items-center px-4 py-2 space-x-3">
                                                 <span className="text-lg text-gray-700 poppins select-none">{props.selectedquantity} items</span>
                                             </div>
                                             {/* remove button  */}
                                             <div className="flex flex-col items-center justify-center">
                                                 <AiOutlineDelete className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer" onClick={() => deletefromcart(props.ItemID ,props.TotalPrice)} />
                                             </div>
                                         </div>
                                        ))}
                                    </div>
                                    {/* price  */}
                                    <div className="flex flex-col space-y-3 my-4">
                                    <div className="flex items-center">
                                        <span className="flex-grow poppins text-gray-700">Subtotal</span>
                                        <span className="poppins font-semibold text-black"><span>&#8377;</span>{subTotal}</span>
                                    </div>
                                
                                    <div className="flex items-center">
                                        <span className="flex-grow poppins text-gray-700">Delivery Fee</span>
                                        <span className="poppins font-semibold text-black"><span>&#8377;</span>{deliveryFee}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="flex-grow poppins text-gray-700 text-xl">Total</span>
                                        <span className="poppins font-semibold text-black text-xl"><span>&#8377;</span>{total}</span>
                                    </div>
                                </div>
                                    {/* place order button  */}
                                    <div>
                                        {disabled ? (
                                            <button disabled="disabled" className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500 opacity-40">Place Order</button>
                                        ) : (
                                            <button className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500" 
                                            onClick={() => {
                                                swal("Congratulations!!!", `You have order ${order.length} times successfully`, "success")
                                                generatebill()
                                            }}>Generate bill</button>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="pt-24">
                        <h1 className="text-center text-2xl text-primary poppins">Cart is Empty !</h1>
                    </div>
                )
                }
            </div>
        </main>
    )
}

export default PlaceOrderScreen