import { useQuery } from '@apollo/client'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductContext'
import { GET_CART, GET_PRODUCT } from '../utils/queries'
import { Container, Content, Wrap } from './ShopList'
import Auth from "../utils/auth";

export default function OneProduct({businessId, productId}) {
  const {loading: newLoad, data: newData} = useQuery(GET_CART)
  console.log(newData);
  const navigate = useNavigate();
  const location = useLocation();
  const {loading, data} = useQuery(GET_PRODUCT, {
    variables: {
      _id: productId
    }
  })

  const { addToCart } = useProductContext();
  console.log(data);

  const addItemToCart = async () => {
    if(businessId !== newData.cart.businessId._id){
      console.log("attempted");
      navigate("/cart", {
        state: {
          errMsg: "Multiple shop error", 
          productId, 
          businessId
        }
      })
      return 
    }

    console.log("hit");
    try {
      const { data } = await addToCart({
        variables: {
          productId,
          businessId
        }
      })

      console.log(data);

      
      window.location.replace("/cart")
    } catch (error) {
      console.log(error)
      return error
    }
  } 

  return (
    <>
      <Container>
          <h2>This Product</h2>
          <Content>
              {data && <Wrap>
                <img src={data.product.images[0]} alt="product" />
                <div>
                <h4 onClick={Auth.loggedIn() ? addItemToCart : (() => navigate("/login", {state: {previousUrl: location.pathname}}))}>Add to cart</h4>
                </div>
                <h3>{data.product.name}</h3>
              
              </Wrap>}
          </Content>
      </Container>
    </>
  )
}
