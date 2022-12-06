import { useQuery } from "@apollo/client";
import { identity } from "angular";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";
import { GET_PRODUCTS, GET_SHOP } from "../utils/queries";
import { Container, Content, Wrap } from "./ShopList";
import { Header } from "./UserShop";

export default function ProductList({ id }) {
  const { shops } = useShopContext();
  const [allShopData, setAllShopData] = useState();
  const { loading, data: shopData } = useQuery(GET_SHOP, {
    variables: {
      _id: id,
    },
  });

  useEffect(() => {
    if(shopData){
        const shop = shopData?.getShop || {}

        setAllShopData(shop)
    }

  }, [shopData?.getShop, loading, shopData])

  console.log(allShopData);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <Container style={{ backgroundColor: shopData.getShop.secondaryHex }}>
        <Header style={{ backgroundColor: shopData.getShop.primaryHex }}>
          <div>
            <img id="logo" src={shopData.getShop.image} alt="Logo" />
          </div>
          <div>
            <h2 style={{ color: shopData.getShop.secondaryHex }}>
              {shopData.getShop.businessName}
            </h2>
            <h4>{shopData.getShop.slogan}</h4>
          </div>
        </Header>
        {shopData && (
          <h2 style={{ color: shopData.getShop.primaryHex }}>
            {shopData.getShop.businessName}'s Products
          </h2>
        )}

        <Content>
          {allShopData?.products &&
            allShopData.products.map((item, index) => (
              <Wrap key={index}>
                {<img src={item.images[0] || ""} alt="product" />}
                <Link
                  to={`/shop/${id}/product/${item._id}`}
                  state={{ price: item.price }}
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
