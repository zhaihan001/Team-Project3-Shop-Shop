import React from "react";
import styled from "styled-components";
import { Palette } from './Palette';

const ShopList = ({ shops, title }) => {
  // Reminder add the ! back when adding shops is in
  if (shops.length) {
    return <Container><h2>No Shops Yet 🥲</h2></Container>;
  }
  return (
    <Container>
      <h2>{title}</h2>
      <Content>
        <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps</h3>
          </a>
        </Wrap>
        <Wrap>
          <img src="/images/cookie-tin.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Snap Baked Goods</h3>
          </a>
        </Wrap>
        <Wrap>
          <img src="/images/crochet.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Seaside Creations: Crochet and Embroidery</h3>
          </a>
        </Wrap>
        <Wrap>
          <img src="/images/stickers.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Shinyfins Stickers</h3>
          </a>
        </Wrap>
        {shops &&
          shops.map((shop) => (
            <Wrap>
              <img src={shop.image} alt={shop.businessName} />
              <a href={"/shops/" + shop._id}>
                <div>
                  <h4>Visit Shop</h4>
                </div>
                <h3>{shop.businessName}</h3>
              </a>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
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

const Content = styled.div`
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

const Wrap = styled.div`
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
      background: ${Palette.blue};
      transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

      &:hover {
        background: ${Palette.red};
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
