import React from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import { Content, Wrap } from './ShopList';
// import { Palette } from './Palette';

function DefaultShops() {
  return (
    <Content>

    <Wrap>
    <img src="/images/soap.jpg" alt="product" />
      <div>
        <button className="liked">
          <span></span>
        </button>
        <Link to="/shop">
        <h4>Visit Shop</h4>
        </Link>
      </div>
      <h3>Marnie's Soaps </h3>
  </Wrap>

          
  <Wrap>
    <img src="/images/crochet.jpg" alt="product" />

      <div>
        <button className="liked">
          <span></span>
        </button>
        <Link to="/shop">
        <h4>Visit Shop</h4>
        </Link>
      </div>
      <h3>Seaside Creations</h3>
  </Wrap>

          
  <Wrap>
    <img src="/images/cookie-tin.jpg" alt="product" />

      <div>
        <button className="liked">
          <span></span>
        </button>
        <Link to="/shop">
        <h4>Visit Shop</h4>
        </Link>
      </div>
      <h3>Cheerilee: Baked Goods</h3>
  </Wrap>

  <Wrap>
    <img src="/images/stickers.jpg" alt="product" />

      <div>
        <button className="liked">
          <span></span>
        </button>
        <Link to="/shop">
        <h4>Visit Shop</h4>
        </Link>
      </div>
      <h3>Shinyfins Stickers</h3>
  </Wrap>
  </Content>
  )
}

export default DefaultShops