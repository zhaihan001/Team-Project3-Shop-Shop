import { useMutation, useQuery } from '@apollo/client';
import React, { Component, createContext, useContext } from 'react';
import { ADD_PRODUCT, ADD_TO_CART, DELETE_CART, DELETE_FROM_CART, UPDATE_CARTITEM_QUANTITY } from '../utils/mutations';
import { GET_CART_ITEMS, GET_PRODUCT, GET_PRODUCTS } from '../utils/queries';



export const ProductContext = createContext();

export const useProductContext = () => {
    return useContext(ProductContext)
}

export const ProductProvider = ({children}) => {

        // const { loading, data: productData } = useQuery(GET_PRODUCT);
        
        const [addToCart, {loading:addingLoad, err: addingErr }] = useMutation(ADD_TO_CART);

        const [removeFromCart, {loading: removeLoad, err: removeErr}] = useMutation(DELETE_FROM_CART);

        const [removeCart, {loading: delCart, err: delCartErr}] = useMutation(DELETE_CART)
        
        const [newProduct, { err, data: newProductData}] = useMutation(ADD_PRODUCT);

        const [updateQuantity, {loading: updLoading, err: updErr}] = useMutation(UPDATE_CARTITEM_QUANTITY);
        
        const {loading, data} = useQuery(GET_CART_ITEMS);
        console.log(data);
        const items = data?.cartItems || [];

        const checkIfInCart = (id) => {
            if(items){
                console.log("logged");
                if(items.filter(prod => prod._id === id).length > 0){
                    console.log("true");
                    return true
                }
                return false
            }
        }

        return (
            <ProductContext.Provider value={{newProduct, newProductData, addToCart, removeFromCart, updateQuantity, checkIfInCart, removeCart}}>
                {children}
            </ProductContext.Provider>
        )
}