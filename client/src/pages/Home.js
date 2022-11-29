import React from "react";
import ShopList from "../components/ShopList";
import { useQuery } from "@apollo/client";
import { GET_SHOPS } from "../utils/queries";

function Home () {
  const { loading, data } = useQuery(GET_SHOPS);
  console.log(data);
  const shops = data?.shops || [];
  

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ShopList shops={shops} title="Here's the list of shops" />
        )}
      </div>
    </div>
  );
};

export default Home;
