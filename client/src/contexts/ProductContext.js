import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_PRODUCT } from '../utils/mutations';
import { GET_PRODUCT } from '../utils/queries';



export const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {

        const { loading, data: productData } = useQuery(GET_PRODUCT);
        console.log(productData);

        

        const [newProduct, { err, data: newProductData}] = useMutation(ADD_PRODUCT);

        

        return (
            <ProductContext.Provider value={{newProduct, newProductData}}>
                {children}
            </ProductContext.Provider>
        )
}