import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_USER, LOGIN_USER, UPDATE_USER_IMAGE } from '../utils/mutations';
import { GET_USER } from '../utils/queries';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

        const [login, {err, data: prevUserData}] = useMutation(LOGIN_USER);

        const [newUser, { err: newUserErr, data: newUserData}] = useMutation(ADD_USER);

        const {loading, data: userData} = useQuery(GET_USER);

        const [updateImage, {err: newImgErr, data:newImgData}] = useMutation(UPDATE_USER_IMAGE);

        return (
            <UserContext.Provider value={{newUser, login, newUserData, userData, updateImage}}>
                {children}
            </UserContext.Provider>
        )
}

