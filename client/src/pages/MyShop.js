import React from "react";
import Usershop from "../components/UserShop";
import CreateShop from '../components/CreateShop';
import { useShopContext } from "../contexts/ShopContext";
import { useUserContext } from "../contexts/UserContext";

function MyShop() {
  const { myShop } = useShopContext();
  // const { userData } = useUserContext();

  if (!myShop) {
    return (
      <div>
        <CreateShop />
      </div>
    );
  }
  return(
    <Usershop myShop={myShop}/>
  )

  }
   
  

export default MyShop;
