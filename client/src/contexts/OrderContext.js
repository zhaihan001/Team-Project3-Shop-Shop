import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_TO_CART, SUBMIT_ORDER } from '../utils/mutations';
import { GET_PRODUCT } from '../utils/queries';


export const OrderContext = createContext();

export const useOrderContext = () => {
    return useContext(OrderContext)
}

export const OrderProvider = ({children}) => {

        const { loading, data: orderData } = useQuery(GET_PRODUCT);
        console.log(orderData);

        

        const [newOrder, { err, data: newOrderData}] = useMutation(ADD_TO_CART);

        const [completedOrder, {data: completedOrderData}] = useMutation(SUBMIT_ORDER);

        return (
            <OrderContext.Provider value={{newOrder, completedOrder, completedOrderData, orderData, newOrderData}}>
                {children}
            </OrderContext.Provider>
        )
}
