import React from "react";
import ShopForm from ".../components/CreateShop";
import Usershop from "../components/UserShop";
import NavBar from ".../components/NavBar";

function MyShop({ shop }) {
  if (!shop.id) {
    return (
      <div>
        <NavBar />
        <ShopForm />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <Usershop />
    </div>
  );
}

export default MyShop;
