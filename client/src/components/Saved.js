import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Content, Wrap } from './ShopList';
import { Palette } from './Palette';
import { useStorageFunctions } from "../hooks/useLocalStorage";


function Saved() {
  const {savedShops, unLikeShop} = useStorageFunctions();

  return (
    <Container>
      <h2>My Saved Shops</h2>
      <Content>
        {savedShops.map((item,index) => {
          return (
            <Wrap key={index}>
              <img src={item.image} alt="product" />
            
              <div>
                <button id={item._id} onClick={(e) => unLikeShop(item._id)} className="liked">
                  <span></span>
                </button>
                <Link to={`/shop/${item._id}`}>
                <h4>Visit Shop</h4>
                </Link>
              </div>
              <h3>{item.businessName}</h3>
            </Wrap>

          )
        })}
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

