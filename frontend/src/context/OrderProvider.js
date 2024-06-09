import React, { createContext, useContext, useState } from 'react';

export const OrderContext = createContext();

export const useOrder = () => {
    return useContext(OrderContext)
}
const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState([]);

    // add order function 
    const handleOrder = (food) => {
        console.log(food + "stored in handleorder")
        setOrder((prevValue) => {
            return [
                ...prevValue,
                food, 
            ]
        })
    }

    //remove order from cart 
    const removeOrder = (id) => {
        console.log(" with id: "+id)
        setOrder((prev) => {
            return prev.filter(item => {
                return item.ItemID !== id
            })
        })
    }


    const value = {
        setOrder,
        order,
        handleOrder,
        removeOrder
    }
    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider