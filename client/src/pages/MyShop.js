import React from "react";
import Usershop from "../components/UserShop";
import CreateShop from '../components/CreateShop';
import { useShopContext } from "../contexts/ShopContext";
import Auth from "../utils/auth"
import { Navigate, useLocation } from "react-router-dom";

function MyShop() {
  const { myShop } = useShopContext();
  const location = useLocation();
  console.log(location.pathname);
  if(!Auth.loggedIn()){
    return <Navigate to="/login" state={{previousUrl: location.pathname}} />
    
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
    <Usershop myShop={myShop} />
  )

}
   
  

export default MyShop;
