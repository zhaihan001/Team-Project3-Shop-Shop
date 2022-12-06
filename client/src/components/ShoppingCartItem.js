
import { useMutation } from '@apollo/client';
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { useProductContext } from '../contexts/ProductContext';
import { UPDATE_CARTITEM_QUANTITY } from '../utils/mutations';
import { Palette } from './Palette';


export default function ShoppingCartItem({
  cartItem,
  items,
  setTotal,
  setItems,
}) {
  const { updateQuantity, updLoading, removeFromCart } = useProductContext();

  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [item, setItem] = useState(cartItem);
  const [product, setProduct] = useState(item.product)


  const changeQuantity = async (e) => {
    try {
      console.log("hit");
      e.persist();
      const { id } = e.target;

      if (id === "increment") {
        const { data } = await updateQuantity({
          variables: {
            productId: item.product._id,
            quantity: item.quantity + 1,
          },
        });

        setQuantity((prev) => prev + 1);
        setTotal((prev) => prev + item.productPrice);
      } else if (id === "decrement") {
        const { data } = await updateQuantity({
          variables: {
            productId: item.product._id,
            quantity: item.quantity - 1,
          },
        });

        setQuantity((prev) => prev - 1);
        setTotal((prev) => prev - item.productPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (id) => {

    try {
      const { data } = await removeFromCart({
        variables: {
          productId: item.product._id,
        },
      });

      setQuantity(0);
        
        
      if (items.filter((product) => product.product._id !== id).length < 1) {
        window.location.reload();
      }

      return data
      
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  if (quantity === null) {
    return <div><img style={{margin:'auto', width:'30%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>;
  }

  //due to subdocument data not persisting between routes
  if (!product.images) {
    window.location.reload();
  }

  return (
    <>
      {product.images && (
        <Wrap>
          {item.product && (
            <img src={product.images[0]} alt={item.businessId} />
          )}
          <p>
            Unit Price: ${item.product.price}.00
            <br />
            <span style={{ width: "100%" }}>
              Quantity(maximum 5 items):
              <span>
                <button
                  onClick={
                    quantity > 1
                      ? (e) => changeQuantity(e)
                      : () => handleRemoveFromCart(item.product._id)
                  }
                  id="decrement"
                >
                  -
                </button>{" "}
                <span>{quantity}</span>
                <button
                  style={{ backgroundColor: quantity === 5 ? "grey" : "" }}
                  onClick={quantity < 5 ? (e) => changeQuantity(e) : () => true}
                  id="increment"
                >
                  +
                </button>
              </span>
              <br></br>
            </span>
            Total Price: ${item.product.price * quantity}.00
            <br></br>
            <button
              type="delete"
              style={{ backgroundColor: Palette.red }}
              id={item.product._id}
              onClick={() => handleRemoveFromCart(item.product._id)}
            >
              Remove Item
            </button>
          </p>
        </Wrap>
      )}
    </>
  );
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
