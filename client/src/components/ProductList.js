import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";
import { GET_PRODUCTS, GET_SHOP } from "../utils/queries";
import { Container, Content, Wrap } from "./ShopList";
import { Header } from "./UserShop";

export default function ProductList({ id }) {
  const { shops } = useShopContext();
  const [allShopData, setAllShopData] = useState(null);
  const [products, setProducts] = useState(allShopData?.products || null)
  const { loading, data: shopData } = useQuery(GET_SHOP, {
    variables: {
      _id: id,
    },
  });

  useEffect(() => {
   
    const shop = shopData?.getShop || null
    if(shop?.businessName !== null && shop?.products[0]?.name !== null) {
        setAllShopData(shop)

    }
    console.log(shop);

    

  }, [shopData?.getShop, loading, shopData])

  console.log(allShopData);

  if (loading) {
    return <div><img style={{margin:'auto', width:'30%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>;
  }

  console.log(allShopData);

  return (
    <>
      <Container style={{ backgroundColor: shopData.getShop.secondaryHex }}>
        <Header style={{ backgroundColor: shopData.getShop.primaryHex }}>
          <div>
            <img id="logo" src={shopData.getShop.image} alt="Logo" />
          </div>
          <div>
            {allShopData && <h2 style={{ color: shopData.getShop.secondaryHex }}>
              {allShopData.businessName}
            </h2>}
            {allShopData && <h4>{allShopData.slogan}</h4>}
          </div>
        </Header>
        {allShopData && (
          <h2 style={{ color: shopData.getShop.primaryHex }}>
            {allShopData.businessName}'s Products
          </h2>
        )}

        <Content>
          {allShopData?.products[0]?.name &&
            allShopData?.products.map((item, index) => (
              <Wrap key={index}>
                {<img src={item.images[0] } alt="product" />}
                <Link
                  to={`/shop/${id}/product/${item._id}`}
                  state={{ price: item.price, product: item }}
                >
                  <div>
                    <h4>View Product</h4>
                  </div>
                  <h3>{item.name}</h3>
                </Link>
              </Wrap>
            ))}
        </Content>
      </Container>
    </>
  );
}
