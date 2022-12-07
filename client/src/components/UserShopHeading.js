import React, { useEffect, useState } from 'react'
import { Content, Wrap } from './ShopList';
import { Header, Products } from './UserShop';


export default function UserShopHeading({myShop, setShowProductForm}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(myShop?.products.name){
            const items = myShop?.products || []

            setProducts(items)
        }

    }, [myShop])

    console.log(products);

  return (
    <>
    
        <main style={{paddingBottom: "10%", backgroundColor: myShop.secondaryHex}}>
            <Header style={{backgroundColor: myShop.primaryHex}}>
            <div>
                <img id='logo' src={myShop.image} alt='Logo'/>
            </div>
            <div>
                <h2 style={{color: myShop.secondaryHex}}>{myShop.businessName}</h2>
                <h4 style={{color: myShop.secondaryHex}}>{myShop.slogan}</h4>
            </div>
            </Header>
            <Products>
                <div>
                <h3 style={{backgroundColor: myShop.secondaryHex,color: myShop.primaryHex}}>
                    Your Products:
                </h3>
                <Content style={{margin: "20px"}}>
                {myShop &&
                    myShop.products.map((product, index) => (
                    <Wrap key={index}>
                        <img src={product.images[0]} alt={product.name} />
                        
                        <h3 style={{backgroundColor: myShop.primaryHex, color: myShop.secondaryHex}}>{product.name}</h3>
                    </Wrap>
                    ))}
                </Content>
                </div>

            </Products>
        </main>
        <div><button style={{margin: "20px", padding: "20px", backgroundColor: myShop.primaryHex,color: myShop.secondaryHex}} onClick={setShowProductForm}>Add Product!</button></div>
    </>
  )
}
