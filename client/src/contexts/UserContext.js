import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';

export const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

        const { loading, data: userData } = useMutation(LOGIN_USER);
        console.log(userData);

        const [newUser, { err, data: newUserData}] = useMutation(ADD_USER);

        return (
            <UserContext.Provider value={{newUser, userData, newUserData}}>
                {children}
            </UserContext.Provider>
        )
}

