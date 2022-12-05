import { useMutation } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { UPDATE_CARTITEM_QUANTITY } from '../utils/mutations';
import { Palette } from './Palette';

export default function ShoppingCartItem({cartItem}) {
    
  const [updateQuantity, {loading, err}] = useMutation(UPDATE_CARTITEM_QUANTITY)
  const [quantity, setQuantity] = useState(cartItem.quantity);


  return (
    <>
        <Wrap>
              {cartItem.product && <img src={cartItem.product.images[0]} alt={cartItem.businessId} />}
              <p>
                Unit Price: ${cartItem.product.price}.99
                <br />
                <p style={{width: "100%"}}>Quantity(maximum 5 items): 
                {/* <select name="quantity">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select> */}
                <span><button>-</button><p type="text">{quantity}</p> <button>+</button></span>
                <br></br>
                </p>
                Total Price: <br></br>
                <button
                  type="delete"
                  id={cartItem.product._id}
                  onClick={() => console.log("hello", cartItem._id)}
                >
                  Remove Item
                </button>
              </p>
            </Wrap>
    </>
  )
}

const Wrap = styled.div`
  background-color: white;
  display: flex;
  height: 200px;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  border: 3px solid ${Palette.fadedGrey};
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  padding: 20px;
  button {
    color: white;
    background-color: ${Palette.red};
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
    }
  }

  p {
    font-size: larger;
    color: ${Palette.brown};
  }

  select {
    margin: 5px;
    font-size: large;
    color: ${Palette.red};
  }

  img {
    margin-right: 20px;
    border: 3px solid ${Palette.grey};
    object-fit: contain;
    z-index: 1;
  }

  h3 {
    border-radius: 3px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    background: grey;
    padding: 4px;
    color: white;
    font-size: 30px;
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }

  div {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    top: 0px;
    opacity: 0;
    z-index: 0;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    display: flex;
    justify-content: center;
    align-items: center;

    h4 {
      color: white;
      padding: 8px;
      border-radius: 20px;
      border: 3px solid rgba(249, 249, 249, 0.1);
      background: grey;
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

      &:hover {
        background: orange;
      }
    }
  }

  &:hover {
    transform: scale(1.03);
    border-color: ${Palette.blue};
    cursor: pointer;

    h3 {
      background: black;
      color: white;
    }

    div {
      opacity: 1;
      object-fit: cover;
      background: rgba(37, 39, 58, 0.76);
    }
  }
`;
