import React, { useState } from 'react'
import styled from 'styled-components';
import AddProduct from './AddProduct';
import UserShopHeading from './UserShopHeading';



function Usershop({myShop}) {

  console.log(myShop);


  const [showProductForm, setShowProductForm] = useState(false);


  if(myShop){
    return (
    <>
      {!showProductForm 
        ? <UserShopHeading myShop={myShop} setShowProductForm={setShowProductForm} /> :  <AddProduct setShowProductForm={setShowProductForm}/>}
      
    </>
          


  );
  }else{
    return (
      <>
       <div><img style={{margin:'auto', width:'30%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>
      </>
    )
  }
}

export default Usershop

// const Wrap = styled.div`
// border-radius: 3px;
//   cursor: pointer;
//   position: relative;
//   transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
//   max-height: 300px;

// `

// const Content = styled.div`
// display: grid;
//   grid-gap: 100px 40px;
//   grid-template-columns: repeat(4, minmax(0, 1fr));

//   @media (max-width: 1000px) {
//     grid-template-columns: repeat(3, minmax(0, 1fr));
//   }

//   @media (max-width: 800px) {
//     grid-template-columns: repeat(2, minmax(0, 1fr));
//   }

//   @media (max-width: 600px) {
//     grid-template-columns: repeat(1, minmax(0, 1fr));
//   }
// `

// const Footer = styled.div`
// `

export const Products = styled.div`
h3{
  display:flex;
  padding: 2%;
  justify-content: center;
}
`

export const Header = styled.div`

// border-radius: 10px;
padding: 40px;
display: flex;
text-align: center;
align-items: center;
justify-content: center;

h2{
  // display: flex;
  // justify-content: center;
  padding: 50px;
  font-size: 60px;
  letter-spacing: 4px;
  text-underline-offset: 10px;
  
}

h4 {
  filter: brightness(30%);
  margin-left: 30px;
}

img{
  float: left;
  width: 250px;
  height: 250px;
  border: solid rgba(58, 58, 58, 0.73) 3px; 
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
}
`