import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_USER, LOGIN_USER, UPDATE_USER_IMAGE } from '../utils/mutations';
import { GET_USER, GET_CART_ITEMS } from '../utils/queries';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

        const [login, {err, data: prevUserData}] = useMutation(LOGIN_USER);

        const [newUser, { err: newUserErr, data: newUserData}] = useMutation(ADD_USER);

        const {loading, data: userData} = useQuery(GET_USER);

        const [updateImage, {err: newImgErr, data:newImgData}] = useMutation(UPDATE_USER_IMAGE);

        const { loading: cartLoading, data: myCart} = useQuery(GET_CART_ITEMS);
        const cartItems = myCart?.cartItems || null;


        return (
            <UserContext.Provider value={{newUser, login, cartLoading, newUserData, userData, updateImage, cartItems}}>
                {children}
            </UserContext.Provider>
        )
}

