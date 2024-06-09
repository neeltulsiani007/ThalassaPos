import React, { useState , useEffect } from 'react';
import { useOrder  } from '../context/OrderProvider';

const OrderPrice = (order) => {
  
    
    const [total ,setTotal] = useState(0)
    const [subTotal ,setSubTotal] = useState(0)
    const [deliveryFee ,setDeliveryFee] = useState(0)


    useEffect(() => {
    let allPrice = 0;
    for (var i = 0; i < order.length; i++){
        allPrice += order[i].Price * order[i].quantity
        // console.log(order[i].price * order[i].quantity)
    }
    console.log(allPrice)
    setSubTotal(parseFloat(allPrice.toFixed(2)));
    setDeliveryFee(parseFloat((allPrice % 20).toFixed(2)));
    setTotal(parseFloat((subTotal  + deliveryFee).toFixed(2)))
        },[order]);

    
    return (
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
                <span className="poppins font-semibold text-black text-xl">{total}</span>
            </div>
        </div>
    )
}

export default OrderPrice