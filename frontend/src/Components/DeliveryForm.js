import React, { useState } from 'react';
import swal from 'sweetalert';
import { useDelivery } from '../context/DeliveryProvider';
import useAuth from '../hooks/useAuth';
import TextField from '../Components/Textfield';

const DeliveryForm = () => {

    const [change, setChange] = useState({
        name: '',
        number: '',
        cashierid: '',
        cashiername: ''
    })
    const { setInput, setDisabled } = useDelivery();

    //handle Change 
    const handleChange = (e) => {
        const { value, name } = e.target;
        setChange((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })

    }

    //handle Submit 
    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            name: change.name,
            number: change.number,
            date:new Date().toDateString(),
            cashierid: change.cashierid,
            cashiername: change.cashiername
        })
        swal("Information Updated!", "Your shipping details updated successfully!", "success")
        setDisabled(false)
    }

    return (
        <div className="flex flex-col mt-20">
            <h1 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700">Enter Details</h1>
            <form className="my-4" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-3">
                    <TextField
                        type="text"
                        placeholder="Enter Customer Name :"
                        name="name"
                        value={change.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Enter Customer Number :"
                        name="number"
                        value={change.number}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Enter CashierId :"
                        name="cashierid"
                        value={change.cashierid}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        type="text"
                        placeholder="Enter Cashier Name :"
                        name="cashiername"
                        value={change.cashiername}
                        onChange={handleChange}
                        required
                    />
                    <button className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500">Save & Continue</button>
                </div>
            </form>
        </div>
    )
}

export default DeliveryForm