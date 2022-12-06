import { useQuery } from '@apollo/client'
import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductContext'
import { GET_CART, GET_PRODUCT } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'
import Auth from "../utils/auth";
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function OneProduct({businessId, productId, price}) {
  const [cartItemIds, setCartItemIds] = useLocalStorage("cartItemIds", []);
  const {checkIfInCart} = useProductContext();
  const {loading: newLoad, data: newData} = useQuery(GET_CART)
  console.log(newData);
  const navigate = useNavigate();
  const location = useLocation();
  const {loading, data} = useQuery(GET_PRODUCT, {
    variables: {
      _id: productId
    }
  })
  console.log(data);

  const { addToCart } = useProductContext();
  console.log(businessId);
  console.log(newData);

  const addItemToCart = async () => {
   
  
    if(newData.cart){
      if(businessId !== newData.cart.businessId._id){
        console.log("attempted");
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

  if(data){
    console.log(checkIfInCart(data.product._id));

  }

  return (
    <>
      <Container>
          <h2>This Product</h2>
          <Content>
              {data && <Wrap>
                <img src={data.product.images[0]} alt="product" />
                <div>
                {!cartItemIds.includes(data.product._id) ? <h4 onClick={Auth.loggedIn() ? addItemToCart : (() => navigate("/login", {state: {previousUrl: location.pathname}}))}>Add to cart</h4> 
                : 
                <h4>In Cart ✔</h4>
                }
                
                </div>
                <h3>{data.product.name}</h3>
              
              </Wrap>}
          </Content>
      </Container>
    </>
  )
}
