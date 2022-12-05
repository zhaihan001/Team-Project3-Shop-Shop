import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_PRODUCT, ADD_TO_CART, DELETE_FROM_CART, UPDATE_CARTITEM_QUANTITY } from '../utils/mutations';
import { GET_PRODUCT } from '../utils/queries';



export const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {

        // const { loading, data: productData } = useQuery(GET_PRODUCT);
        
        const [addToCart, {loading:addingLoad, err: addingErr }] = useMutation(ADD_TO_CART);

        const [removeFromCart, {loading: removeLoad, err: removeErr}] = useMutation(DELETE_FROM_CART);

        const [newProduct, { err, data: newProductData}] = useMutation(ADD_PRODUCT);

        const [updateQuantity, {loading: updLoading, err: updErr}] = useMutation(UPDATE_CARTITEM_QUANTITY);

        return (
            <ProductContext.Provider value={{newProduct, newProductData, addToCart, removeFromCart, updateQuantity}}>
                {children}
            </ProductContext.Provider>
        )
}