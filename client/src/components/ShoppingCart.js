import React from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { SUBMIT_ORDER, DELETE_FROM_CART } from "../utils/mutations";
import { Palette } from "./Palette";
import { useLocation, Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import ShoppingCartItem from "./ShoppingCartItem";
const ShoppingCart = ({ cartItems, title }) => {
  // if (!cartItems.length) {
  //   return <h1>Your Cart is Empty</h1>;
  // }
  const [submitOrder, { error }] = useMutation(SUBMIT_ORDER);
  const removeItem = useMutation(DELETE_FROM_CART);

  console.log(cartItems);

  const location = useLocation();

  if(!Auth.loggedIn()){
    return <Navigate to="/login" state={{previousUrl: location.pathname}} />
  }

  let cartItemsId = [];
  if (cartItems.products) {
    cartItemsId = cartItems.products.map((e) => {
      return e._id;
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await submitOrder({
        // passing data
        variables: {
          products: cartItemsId,
          businessId: cartItems.businessId._Id,
        },
      });

      window.location.reload();

      return data
    } catch (error) {
      console.error(error);
    }
  };


  const handleRemoval = async (event) => {
    event.preventDefault();
    try {
      const { data } = await removeItem({
        variables: { productId: event.target.id },
      });
      window.location.assign("/cart");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <h2>{title}</h2>

      <Content>
        {cartItems.length > 0 &&
          cartItems.map((item, index) => (
            <ShoppingCartItem key={index} cartItem={item} items={cartItems} />
            // <Wrap>
            //   <img src={item.image} alt={item.businessName} />
            //   <a href={"/shops/" + item._id}>
            //     <div>
            //       <h4>Visit Shop</h4>
            //     </div>
            //     <h3>{item.businessName}</h3>
            //   </a>
            // </Wrap>
          ))}
      </Content>

      {cartItems.length > 0 && <button type="submit" id="submit" onSubmit={handleSubmit}>
        Submit Order
      </button>}
    </Container>
  );
};

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
  button {
    color: white;
    background-color: ${Palette.blue};
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
    }
  }
  #submit {
    display: flex;
    margin: 20px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 20px 40px;
  grid-template-rows: auto;
`;


export default ShoppingCart;
