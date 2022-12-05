import React, {useEffect, useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_CART, GET_CART_ITEMS } from "../utils/queries";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../components/UpdateImageModal.js";
import { Button, CloseButton } from "react-bootstrap";

function CartPage() {
  const { myCart, cartLoading } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, setLocationState] = useState(location.state || null)
  const [total, setTotal] = useState(0);
  console.log(myCart);
  console.log(total);
  

  const cartItems = myCart?.cartItems || null;
  console.log(cartItems);
  
  useEffect(() => {
    if(cartItems){
      setTotal(cartItems.map(item => item.total).reduce((a,b) => a + b))
    }

  }, [cartItems])

  if(locationState){
    console.log(location.state.errMsg);
    return (
      <>
        <Modal>
          <Button>Button</Button>
          <CloseButton onClick={() => { 
            navigate("/cart", {
              state: {
                status: 200
              }
            })
            window.location.reload();
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
            cartItems={cartItems}
            title="Your Shopping Cart Items"
            total={total}
            setTotal={setTotal}
            
          />
        )}
      </div>
    </div>
  );
}

export default CartPage;
