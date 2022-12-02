import React from "react";
import { Link } from "react-router-dom";
import { Container, Content, Wrap } from './ShopList'


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
            <h3>Marnie's Soaps <a href="login"><button>♥️</button></a></h3>
          </Link>
        </Wrap>
        <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <a href="/signup">
            <div>
              <h4>Visit Shop</h4>
            </div>
            <h3>Marnie's Soaps <a href="login"><button>♥️</button></a></h3>
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
