import React from "react";
import ShopList from "../components/ShopList";
import { useQuery } from "@apollo/client";
import { GET_SHOPS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(GET_SHOPS);
  const shops = data?.shops || [];

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ShopList shops={shops} title="List of the Shops" />
        )}
      </div>
    </div>
  );
};

export default Home;
