import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_SHOP } from '../utils/mutations';
import { GET_SHOP } from '../utils/queries';

export const ShopContext = createContext();

export const useShopContext = () => {
    return useContext(ShopContext)
}

export const ShopProvider = ({children}) => {

        const { loading, data: shopData } = useQuery(GET_SHOP);
        console.log(shopData);

        const [newShop, { err, data: newShopData}] = useMutation(ADD_SHOP);

        return (
            <ShopContext.Provider value={{newShop, shopData, newShopData}}>
                {children}
            </ShopContext.Provider>
        )
}
