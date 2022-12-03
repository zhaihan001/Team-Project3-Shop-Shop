import React from 'react'
import styled from 'styled-components';

const Header = styled.div`


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

function Usershop({myShop}) {
  const { myShop: shopData } = myShop;
  return (
    <Header style={{backgroundColor: shopData.primaryHex}}>
      <Products>
      <div>
        <img id='logo' src={shopData.image} alt='Logo'/>
      </div>
      <div>
        <h2 style={{color: shopData.secondaryHex}}>{shopData.businessName}</h2>
        <h4>{shopData.slogan}</h4>
      </div>
      </Products>
    </Header>
    
    

  );
}

export default Usershop