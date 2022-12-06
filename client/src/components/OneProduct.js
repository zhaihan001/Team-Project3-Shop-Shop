import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
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

  const [productData, setProductData] = useState();

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

  useEffect(() => {
    if(typeof(data) !== "undefined"){
      setProductData(data)
    }

  }, [data, loading])

  console.log(productData);


  if (loading) {
    return <div><img style={{margin:'auto', width:'30%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>
  }


  return (
    <>
      <Container>
          <h2>This Product</h2>
          <Content>
              {typeof(productData) !== "undefined" && <Wrap>
                <img src={productData.product.images[0]} alt="product" />
                <div>
                {!cartItemIds.includes(productData.product._id) ? <h4 onClick={Auth.loggedIn() ? addItemToCart : (() => navigate("/login", {state: {previousUrl: location.pathname}}))}>Add to cart</h4> 
                : 
                <h4>In Cart ✔</h4>
                }
                
                </div>
                <h3>{productData.product.name}</h3>
              
              </Wrap>}
          </Content>
      </Container>
    </>
  )
}
