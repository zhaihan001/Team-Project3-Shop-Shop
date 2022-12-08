import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext, useEffect, useState } from 'react';
import { ADD_SHOP, UPDATE_SHOP_IMAGE } from '../utils/mutations';
import { GET_MY_SHOP, GET_SHOP, GET_SHOPS } from '../utils/queries';

export const ShopContext = createContext();

export const useShopContext = () => {
    return useContext(ShopContext)
}

export const ShopProvider = ({children}) => {
    const [allShops, setAllShops] = useState([])
    const [myShop, setMyShop] = useState({})
    const {loading: myShopLoading, data:userShop} = useQuery(GET_MY_SHOP);


    const { loading, data } = useQuery(GET_SHOPS);

    useEffect(() => {
        if(data?.shops ){
            setAllShops(data?.shops)
        }

    }, [data])

    useEffect(() => {
        if(userShop?.myShop){
            setMyShop(userShop?.myShop)
        }

    }, [userShop])

    const [updImage, {err: updErr, data: updData}] = useMutation(UPDATE_SHOP_IMAGE);


    // const myShop = userShop?.myShop || null;

    console.log(myShop);

    const [newShop, { err, data: newShopData}] = useMutation(ADD_SHOP);

    return (
        <ShopContext.Provider value={{newShop, loading, myShop, allShops, newShopData, updImage}}>
            {children}
        </ShopContext.Provider>
    )
}
