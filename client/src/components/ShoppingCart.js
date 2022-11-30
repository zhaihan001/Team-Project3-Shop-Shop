import React from "react";
import styled from "styled-components";

const ShoppingCart = ({ cartItems, title }) => {
  // if (!cartItems.length) {
  //   return <h1>Your Cart is Empty</h1>;
  // }
  return (
    <Container>
      <h2>{title}</h2>
      <Content>
        <Wrap>
          <img src="/images/soap.jpg" alt="product" />
          <p>
            Unit Price: <br></br>
            Quantity(maximum 5 items):
            <select name="quantity" id="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br></br>
            Total Price: <br></br>
          </p>
        </Wrap>
        {cartItems &&
          cartItems.map((item) => (
            <Wrap>
              <img src="/images/soap.jpg" alt="product" />
              <p>
                Unit Price: <br></br>
                Quantity(maximum 5 items):
                <select name="quantity" id="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <br></br>
                Total Price: <br></br>
              </p>
            </Wrap>
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
    </Container>
  );
};

const Container = styled.div`
  padding: 0 calc(3.5vw + 5px);
  padding-top: 2vw;
  padding-bottom: 13vw;

  h2 {
    font-size: 40px;
    padding: 15px;
    text-decoration: underline;
    color: black;
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

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  border: 3px solid black;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  p {
    font-size: larger;
  }
  select {
    font-size: large;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
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
export default ShoppingCart;