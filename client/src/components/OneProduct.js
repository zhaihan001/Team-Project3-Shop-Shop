import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useProductContext } from '../contexts/ProductContext'
import { GET_CART, GET_PRODUCT } from '../utils/queries'
// import { Container, Content, Wrap } from './ShopList'
import Auth from "../utils/auth";
import { useLocalStorage } from '../hooks/useLocalStorage'
import styled from 'styled-components';
import { Palette } from "./Palette";

export default function OneProduct({businessId, productId, price}) {
  console.log(businessId);
  const [cartItemIds, setCartItemIds] = useLocalStorage("cartItemIds", []);
  const {checkIfInCart} = useProductContext();
  const {loading: newLoad, data: newData} = useQuery(GET_CART)
  console.log(newData);
  const navigate = useNavigate();
  const location = useLocation();

  const [productData, setProductData] = useState();


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

  console.log(productData);
  

  return (
    <>
      {/* <Container>
          <h2>Product Details - {location.state.product.name}</h2>
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
              <Info>
              <h3>Product Description:</h3>
              <h4>{location.state.product.description}</h4>
              </Info>
          </Content>
      </Container> */}

      <Container>
         <h2>{location.state.product.name} - Product Details</h2>
         <Content>
              {typeof(location.state.product) !== "undefined"  && <Wrap>
                <img src={location.state.product.images[0]} alt="product" />
              </Wrap>}
              
              <Wrap>
              <Row>
              <h3>Product Description:</h3>
              <h4>{location.state.product.description}</h4>
              </Row> 

              <Row>
              <h3>Price:</h3>
              <h4>${location.state.product.price}</h4>
              </Row> 

              <Row>
              <h3>In Stock:</h3>
              <h4>{location.state.product.quantity}</h4>
              </Row> 
             
                </Wrap>

          </Content>

          <div>
                {!cartItemIds.includes(location.state.product._id) ? <h5 onClick={Auth.loggedIn() ? addItemToCart : (() => navigate("/login", {state: {previousUrl: location.pathname}}))}>Add to cart</h5> 
                : 
                <h5>In Cart ✔</h5>
                }
                
                </div>
      </Container>
    </>
  )
}

const Container = styled.div`
padding: 0 calc(3.5vw + 5px);
padding-top: 2vw;
padding-bottom: 5vw;
background-image: url("/images/blotches.png");
background-size: cover;

h2 {
  font-size: 40px;
  padding: 15px;
  margin-bottom: 20px;
  text-decoration: underline;
  color: ${Palette.red};
  font-weight: bold;
  letter-spacing: 1px;
  word-spacing: 4px;
  text-underline-offset: 8px;
}

h5 {
  width: 30%;
  color: white;
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  background: ${Palette.blue};
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  text-align: center; 
  font-size: 40px;

  &:hover {
    background: ${Palette.red};
    cursor: pointer;
  }
`

const Content = styled.div`
display: flex;
flex-direction: row;
border: solid ${Palette.blue} 3px;
width: 100%;
background: white;
border-radius: 10px;
`

const Row = styled.div`
display: flex;
flex-direction: row;
align-items: center;
text-align: center;

h3 {
  color: ${Palette.fadedGrey};
  text-decoration: underline;
}

h4 {
  color: ${Palette.brown};
}

`

const Wrap = styled.div`
display: flex;
flex-direction: column;

img {
  border: solid ${Palette.fadedGrey} 4px;
  margin: 20px;
  max-width: 400px;
}

h3 {
  padding: 20px;
}
`