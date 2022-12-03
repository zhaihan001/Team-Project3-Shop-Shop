import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_SHOP } from '../utils/mutations';
import { GET_MY_SHOP, GET_SHOP, GET_SHOPS } from '../utils/queries';

export const ShopContext = createContext();

export const useShopContext = () => {
    return useContext(ShopContext)
}

export const ShopProvider = ({children}) => {

        // use on page that will accept parameter to complete the query
        // const { loading, data } = useQuery(GET_SHOP, {
        //     variables: { id }
        // });

        const { loading, data: allShops } = useQuery(GET_SHOPS);
        const shops = allShops?.shops || [];


        const {loading: myShopLoading, data} = useQuery(GET_MY_SHOP);
        const myShop = data?.myShop || null;

        console.log(myShop);

        const [newShop, { err, data: newShopData}] = useMutation(ADD_SHOP);

        return (
            <ShopContext.Provider value={{newShop, loading, myShop, shops, newShopData}}>
                {children}
            </ShopContext.Provider>
        )
}
