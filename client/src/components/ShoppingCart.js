import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { SUBMIT_ORDER, DELETE_FROM_CART } from "../utils/mutations";
import { Palette } from "./Palette";
import { useLocation, Navigate } from "react-router-dom";
import ShoppingCartItem from "./ShoppingCartItem";
import { useUserContext } from "../contexts/UserContext";
import { GET_CART } from "../utils/queries";


const ShoppingCart = ({ title }) => {
  const location = useLocation();
  const { cartItems } = useUserContext();
  const {loading, data: cartWithId} = useQuery(GET_CART);
  const [submitOrder, { error }] = useMutation(SUBMIT_ORDER);
  const [cartItemIds, setCartItemIds] = useState(cartItems.map(item => item.product._id))
  console.log(cartItems);
  const [total, setTotal] = useState(cartItems.length > 0 ? cartItems.map(item => item.productPrice * item.quantity).reduce((a,b) => a + b) : 0)
  
  const [items, setItems] = useState([]);
  console.log(items);

 
  // const [state, setState] = useState(cartWithId)
  
  const cart = cartWithId?.cart;
  const businessId = cart?.businessId._id
  


  console.log(cartItems);
  console.log(total);

  console.log(cartItems.map(item => {
    return item.product
  }));


  console.log(cartItemIds);


  const handleSubmit = async () => {
    try {
      const { data } = await submitOrder({
        variables: {
          products: cartItemIds,
          businessId: businessId,
          total
        },
      });

      window.location.reload();

      return data
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    setItems(cartItems)

  }, [cartItems])


  return (
    <Container>
      <h2>{title}</h2>

      <Content>
        {cartItems.length > 0 &&
          items.map((item, index) => (
            <ShoppingCartItem key={index} cartItem={item} items={items} setItems={setItems} setTotal={setTotal} />
          ))}
      </Content>

      {items.length > 0 && <button type="submit" onClick={handleSubmit}>
        Submit Order
      </button>}
      {items.length > 0 && <h4>Total: ${total}.00</h4>}
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
