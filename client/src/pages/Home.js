import React from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner";
import { useQuery } from "@apollo/client";
import { GET_SHOPS } from "../utils/queries";
import styled from 'styled-components';
import { useShopContext } from "../contexts/ShopContext";

function Home() {
  // const { loading, data } = useQuery(GET_SHOPS);
  // const shops = data?.shops || [];
  const { shops, loading } = useShopContext();

  return (
    <div>
      <Container>
        <Banner />
        {loading ? (
        <div><img style={{margin:'auto', width:'50%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>
        ) : (
          // render shoplist
          <ShopList shops={shops} title="Featured Shops" />
        )}
      </Container>
    </div>
  );
}

export default Home;

const Container = styled.div`
overflow-x: hidden;
position: relative;
padding: 0;
background-image: url("/images/bluegrid.png");
background-size: contain;

&:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
`
