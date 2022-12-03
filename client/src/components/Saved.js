import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Content, Wrap } from './ShopList';
import { Palette } from './Palette';


function Saved() {

  return (
    <Container>
      <h2>My Saved Shops</h2>
      <Content>
      <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <Link to="/shop">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps </h3>
          </Link>
        </Wrap>
        <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps </h3>
          </a>
        </Wrap>
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
          <img src="/images/soap.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps</h3>
          </a>
        </Wrap>
        <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps</h3>
          </a>
        </Wrap>
      </Content>
    </Container>
  );
}

export default Saved;

export const Container = styled.div`
  padding: 0 calc(3.5vw + 5px);
  padding-top: 0.5vw;
  padding-bottom: 13vw;
  background-image: url("/images/groovy.png");
  background-size: cover;

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

