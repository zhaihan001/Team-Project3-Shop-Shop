import React from 'react'
import styled from 'styled-components';




function Usershop({myShop}) {
  console.log(myShop);

  if(myShop){
    return (
      <main>
        <Header style={{backgroundColor: myShop.primaryHex}}>
      <div>
        <img id='logo' src={myShop.image} alt='Logo'/>
      </div>
      <div>
        <h2 style={{color: myShop.secondaryHex}}>{myShop.businessName}</h2>
        <h4>{myShop.slogan}</h4>
    </div>
      </Header>
    <Products>
      <container>
        <h3 style={{backgroundColor: myShop.secondaryHex,color: myShop.primaryHex}}>
              Our Products:
        </h3>
        <Content>
        {myShop &&
          myShop.products.map((product, index) => (
            <Wrap key={index}>
              <img src={product.image} alt={product.name} />
                <div>
                  <button>Buy Now!</button>
                </div>
                <h3>{product.name}</h3>
            </Wrap>
          ))}
        </Content>
        <div><button>Add Product!</button></div>

      </container>

    </Products>
    <Footer>
      <div>

      </div>
    </Footer>
    </main>
          


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

const Wrap = styled.div`
border-radius: 3px;
  cursor: pointer;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  max-height: 300px;

`

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
`

const Footer = styled.div`
`

const Products = styled.div`
h3{
  display:flex;
  padding: 100px;
  justify-content: center;
}
`

const Header = styled.div`

h2{
  display: flex;
  justify-content: center;
  padding: 100px;
  font-size: 50px;
}


img{
  float: left;
  width: 200px;
  height: 200px;
  border: solid black 3px; 
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
}
`