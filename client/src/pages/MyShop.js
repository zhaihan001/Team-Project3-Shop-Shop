import React from "react";
import Usershop from "../components/UserShop";
import CreateShop from '../components/CreateShop';

function MyShop(shop) {
  if (!shop.id) {
    return (
      <div>
        <CreateShop />
      </div>
    );
  }
  return(
    <Usershop/>
  )

  }
   
  

export default MyShop;
