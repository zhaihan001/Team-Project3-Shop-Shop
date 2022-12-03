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
  console.log(myShop);

  if(myShop){
    return (
      <Header style={{backgroundColor: myShop.primaryHex}}>
        <Products>
        <div>
          <img id='logo' src={myShop.image} alt='Logo'/>
        </div>
        <div>
          <h2 style={{color: myShop.secondaryHex}}>{myShop.businessName}</h2>
          <h4>{myShop.slogan}</h4>
        </div>
        </Products>
      </Header>
      
      
  
    );
  }else{
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }
}

export default Usershop