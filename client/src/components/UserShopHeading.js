import React from 'react'
import { Content, Wrap } from './ShopList';
import { Header, Products } from './UserShop';


export default function UserShopHeading({myShop, setShowProductForm}) {
  return (
    <>
        <main style={{paddingBottom: "10%"}}>
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
                <div>
                <h3 style={{backgroundColor: myShop.secondaryHex,color: myShop.primaryHex}}>
                    Our Products:
                </h3>
                <Content>
                {myShop && myShop.products.length > 0 &&
                    myShop.products.map((product, index) => (
                    <Wrap key={index}>
                        <img src={product.images[0]} alt={product.name} />
                        
                        <h3>{product.name}</h3>
                    </Wrap>
                    ))}
                </Content>
                </div>

            </Products>
        </main>
        <div><button onClick={setShowProductForm}>Add Product!</button></div>
    </>
  )
}
