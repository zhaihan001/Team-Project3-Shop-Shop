import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocalStorage, useStorageFunctions } from "../hooks/useLocalStorage";
import { Palette } from './Palette';

const ShopList = ({ shops, title }) => {
  const {isLiked, likeShop, unLikeShop, } = useStorageFunctions();

  if (!shops) {
    return <Container><h2>No Shops Yet 🥲</h2></Container>;
  }
  return (
    <Container>
      <h2>{title}</h2>
      <Content>
        {shops &&
          shops.map((shop, index) => (
            <Wrap key={index}>
              <img src={shop.image} alt={shop.businessName} />
                <div>
                  <button id={shop._id} onClick={!isLiked(shop._id) ? (() =>likeShop(shop._id)) : (() => unLikeShop(shop._id))} className={`${isLiked(shop._id) ? "liked" : ""}`}>
                    <span></span>
                  </button>
                  <Link to={`/shop/${shop._id}`}>
                    <h4>Visit Shop</h4>
                  </Link>
                </div>
                <h3>{shop.businessName}</h3>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};

export const Container = styled.div`
  padding: 0 calc(3.5vw + 5px);
  padding-top: 0.5vw;
  padding-bottom: 13vw;

  h2 {
    font-size: 40px;
    padding: 15px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-gap: 100px 40px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

export const Wrap = styled.div`
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  border: 3px solid ${Palette.brown};
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  max-height: 300px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  h3 {
    border-radius: 3px;
    border: 3px solid rgba(249, 249, 249, 0.1);
    background: ${Palette.blue};
    padding: 4px;
    color: white;
    font-size: 30px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-height: 80px;
    max-width: 1000px;
  }

  a {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
    color: white;
  }

  // HOVER CONTAINER

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
    flex-direction: column;

    // VISIT SHOP BUTTON

    h4 {
      color: white;
      padding: 8px;
      border-radius: 20px;
      border: 3px solid rgba(249, 249, 249, 0.1);
      background: ${Palette.blue};
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

      &:hover {
        background: ${Palette.red};
      }
    }

    // LIKE BUTTON
    .liked{
      background-position: right;
      animation: animate .8s steps(28) 1;
    }

    button {
      background-image: url("/images/heart.png");
      background-repeat: no-repeat;
      background-position: left;
      background-size: 2900%;
      height: 60px;
      width: 60px;
      position: absolute;
      margin: 10px;
      top: 0;
      right: 0;
      color: white;
      padding: 5px;
      border-radius: 50px;
      border: 3px solid rgba(249, 249, 249, 0.1);
      background-color: ${Palette.blue};
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
      

      // LIKE BUTTON ANIMATION

      @keyframes animate {
        0%{
          background-position: left;
        }
        100%{
          background-position: right;
        }
      }

      &:hover {
        border: 3px solid ${Palette.grey};
      }
    }

  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    cursor: pointer;

    h3 {
      background: ${Palette.blue};
      color: white;
    }

    div {
      opacity: 1;
      object-fit: cover;
      background: ${Palette.opacityBrown};
    }
  }
`;
export default ShopList;
