import React from "react";
import Usershop from "../components/UserShop";
import CreateShop from '../components/CreateShop';
import { useShopContext } from "../contexts/ShopContext";
import Auth from "../utils/auth"
import { Navigate } from "react-router-dom";

function MyShop() {
  const { myShop } = useShopContext();
  if(!Auth.loggedIn()){
    return <Navigate to='/login' />
  }
  console.log(myShop);

  if (myShop === null) {
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
