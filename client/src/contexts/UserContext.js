import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext, useEffect, useState } from 'react';
import { ADD_USER, DELETE_USER, LOGIN_USER, UPDATE_USER_IMAGE } from '../utils/mutations';
import { GET_USER, GET_CART_ITEMS, USER_ORDERS } from '../utils/queries';
import Auth from '../utils/auth';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const {loading: orderLoading, data} = useQuery(USER_ORDERS);

        const [orders, setOrders] = useState([])

        useEffect(() => {
            if(data?.orders){
                setOrders(data?.orders.slice(0,4))
            }
        
        },[data])


        const [login, {err, data: prevUserData}] = useMutation(LOGIN_USER);

        const [newUser, { err: newUserErr, data: newUserData}] = useMutation(ADD_USER);

        const {loading, data: userData} = useQuery(GET_USER);

        const [updateImage, {err: newImgErr, data:newImgData}] = useMutation(UPDATE_USER_IMAGE);

        const { loading: cartLoading, data: myCart} = useQuery(GET_CART_ITEMS);
        const cartItems = myCart?.cartItems || null;

        const [deleteAccount, {loading:delLoad, err: delErr}] = useMutation(DELETE_USER);

        const delAccount = async (_id) => {
            try {
                const {data} = await deleteAccount({
                    variables: {
                        _id
                    }
                })

                Auth.logout()

                return data
                
            } catch (error) {
                console.log(error)
                return error
            }
        }


        return (
            <UserContext.Provider value={{newUser, login, cartLoading, newUserData, userData, updateImage, cartItems, delAccount, orders}}>
                {children}
            </UserContext.Provider>
        )
}

