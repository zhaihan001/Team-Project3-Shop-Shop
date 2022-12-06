import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductContext'
import { GET_CART, GET_PRODUCT } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'
import Auth from "../utils/auth";
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function OneProduct({businessId, productId, price}) {
  console.log(businessId);
  const [cartItemIds, setCartItemIds] = useLocalStorage("cartItemIds", []);
  const {checkIfInCart} = useProductContext();
  const {loading: newLoad, data: newData} = useQuery(GET_CART)
  console.log(newData);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const [productData, setProductData] = useState();


  const { addToCart } = useProductContext();
  console.log(businessId);
  console.log(newData);

  const addItemToCart = async () => {
   
  
    if(newData.cart){
      if(businessId !== newData.cart.businessId._id){
        console.log(businessId, newData.cart.businessId._id);
        navigate("/cart", {
          state: {
            errMsg: "Multiple shop error", 
            productId, 
            businessId,
            price
          }
        })
        return 
      }

    }

    setCartItemIds(prev => {
      return [...prev, productId]
    })

    console.log("hit");
    try {
      const { data } = await addToCart({
        variables: {
          productId,
          businessId,
          price
        }
      })

      console.log(data);

      
      window.location.replace("/cart")
    } catch (error) {
      console.log(error)
      return error
    }
  } 

  console.log(productData);

  return (
    <>
      <Container>
          <h2>This Product</h2>
          <Content>
              {typeof(location.state.product) !== "undefined"  && <Wrap>
                <img src={location.state.product.images[0]} alt="product" />
                <div>
                {!cartItemIds.includes(location.state.product._id) ? <h4 onClick={Auth.loggedIn() ? addItemToCart : (() => navigate("/login", {state: {previousUrl: location.pathname}}))}>Add to cart</h4> 
                : 
                <h4>In Cart ✔</h4>
                }
                
                </div>
                <h3>{location.state.product.name}</h3>
              
              </Wrap>}
          </Content>
      </Container>
    </>
  )
}
