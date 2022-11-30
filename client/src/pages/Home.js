import React from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner";
import { useQuery } from "@apollo/client";
import { GET_SHOPS } from "../utils/queries";
import styled from 'styled-components';

function Home() {
  const { loading, data } = useQuery(GET_SHOPS);
  const shops = data?.shops || [];

  return (
    <div>
      <Container>
        <Banner />
        {loading ? (
          <div>Loading...</div>
        ) : (
          // render shoplist
          <ShopList shops={shops} title="List of the Shops" />
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

&:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
`
