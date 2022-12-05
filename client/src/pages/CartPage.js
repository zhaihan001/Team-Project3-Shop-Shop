import React, {useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_CART, GET_CART_ITEMS } from "../utils/queries";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../components/UpdateImageModal.js";
import { Button, CloseButton } from "react-bootstrap";
import Auth from "../utils/auth";


function CartPage() {
  const { cartLoading } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, setLocationState] = useState(location.state || {errMsg: false})
  
  if(!Auth.loggedIn()){
    return <Navigate to="/login" state={{previousUrl: location.pathname}} />
  }
  console.log(location.state);

  const replaceCart = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }


  if(locationState.errMsg){
    return (
      <>
        <Modal style={{width: "50%", margin: "auto", backgroundColor: "#eeffff", padding: "2%"}}>
          <h3>Existing cart!</h3>
          <p>You currently have items in your cart from a different shop, and adding a new item will remove the older ones. If you choose to continue, click 'replace' to update your cart</p>
          <Button onClick={replaceCart}>Replace</Button>
          <CloseButton onClick={() => { 
            navigate("/cart", {
              state: {
                status: 200
              }
            })
            setLocationState({status: 200})
            // window.location.reload();
          }}>X</CloseButton>
        </Modal>
      </>
    )
  }
  

  return (
    <div>
      <div>
        {cartLoading ? (
          <div>Loading...</div>
        ) : (
          // render cart items
          <ShoppingCart
            title="Your Shopping Cart Items"

          />
        )}
      </div>
    </div>
  );
}

export default CartPage;
