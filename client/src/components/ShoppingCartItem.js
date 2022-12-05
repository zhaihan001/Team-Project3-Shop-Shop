import { useMutation } from '@apollo/client';
import { identity } from 'angular';
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { UPDATE_CARTITEM_QUANTITY } from '../utils/mutations';
import { Palette } from './Palette';

export default function ShoppingCartItem({cartItem}) {
    
  const [updateQuantity, {loading, err}] = useMutation(UPDATE_CARTITEM_QUANTITY)
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [item, setItem] = useState(cartItem);

  const changeQuantity = async (e) => {
    try {
        console.log("hit");
        e.persist()
        const {id} = e.target
        
        if(id === "increment"){
            const { data } = await updateQuantity({
                variables: {
                    productId: item.product._id,
                    quantity: item.quantity + 1
                }
            })
            
            setQuantity(prev => prev + 1)

        } else if(id === "decrement"){
            const { data } = await updateQuantity({
                variables: {
                    productId: item.product._id,
                    quantity: item.quantity - 1
                }
            })
            
            setQuantity(prev => prev - 1)

        }
    } catch (error) {
        console.log(error)
    }
  }

    if(cartItem.product === null){
        return (
            <div>Loading...</div>
        )
    }

  return (
    <>
        <Wrap>
              {item.product && <img src={item.product && item.product.images[0]} alt={item.businessId} />}
              <p>
                Unit Price: ${item.product.price}.99
                <br />
                <span style={{width: "100%"}}>Quantity(maximum 5 items): 
                {/* <select name="quantity">
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select> */}
                <span><button onClick={(e) => changeQuantity(e)} id="decrement">-</button> <span>{quantity}</span><button onClick={(e) => changeQuantity(e)} id="increment">+</button></span>
                <br></br>
                </span>
                Total Price: ${(item.product.price + .99) * quantity}
                <br></br>
                <button
                  type="delete"
                  id={item.product._id}
                  onClick={() => console.log("hello", item._id)}
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
