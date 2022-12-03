import React from 'react'
import { useShopContext } from '../contexts/ShopContext';
import styled from 'styled-components';



function Usershop() {
  const { shopData } = useShopContext();

  const Header = styled.div`
  background-color: ${shopData.primaryHex}
  
  image{
    float: left;
    width: 400px;
    height: 400px;
    border: solid black 3px; 
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50%;
  }
  `
  const Products = styled.div`

  `
  return (
    <Header>
      <Products>
      <div>
        <img id='logo' src={shopData.image} alt='Logo'/>
      </div>
      <div>
        <h2>Welcome to {shopData.businessName}</h2>
        <h4>{shopData.slogan}</h4>
      </div>
      </Products>
    </Header>
    
    

  );
}

export default Usershop