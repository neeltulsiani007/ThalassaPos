import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useOrder } from '../context/OrderProvider';
import axios from 'axios';

const OrderCard = (props) => {
    // const copyObj = {...props}
    // const [quantity, setQuantity] = useState(props.quantity);
     const { removeOrder } = useOrder();

    

    return (
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
                <AiOutlineDelete className="w-6 h-6 text-gray-600 transform transition hover:scale-105 duration-500 cursor-pointer"  />
            </div>
        </div>
    )
}

export default OrderCard