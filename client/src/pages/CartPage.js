import React, {useState} from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CART, GET_CART_ITEMS } from "../utils/queries";
import { useUserContext } from "../contexts/UserContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../components/UpdateImageModal.js";
import { Button, CloseButton } from "react-bootstrap";
import Auth from "../utils/auth";
import { DELETE_CART } from "../utils/mutations";
import { useProductContext } from "../contexts/ProductContext";
import { useLocalStorage } from "../hooks/useLocalStorage";


function CartPage() {
  const { cartLoading } = useUserContext();
  const [cartItemIds, setCartItemIds] = useLocalStorage("cartItemIds", [])
  const location = useLocation();
  const navigate = useNavigate();
  const [locationState, setLocationState] = useState(location.state || {errMsg: false})
  const [deleteCart, {loading, err}] = useMutation(DELETE_CART);
  const {cartItems} = useUserContext();
  const {addToCart} = useProductContext();
  console.log(cartItems);
  let ids;
  if(cartItems){
    ids = cartItems.map(item => {
      return item.product._id
    })
    console.log(ids);

  }
  console.log(ids);

  if(!Auth.loggedIn()){
    return <Navigate to="/login" state={{previousUrl: location.pathname}} />
  }
  console.log(location.state);

  const replaceCart = async () => {
    console.log(ids);
    try {
      const { data } = await deleteCart({
        variables: {
          products: ids
        }
      })

      const {data: newCart } = await addToCart({
        variables: {
          productId: location.state.productId,
          businessId: location.state.businessId,
          price: location.state.price
        }
      })

      setCartItemIds(prev => {
        return [...prev, location.state.productId]
      })

      navigate("/cart", {
        state: {
          status: 200
        }
      })
      setLocationState({status: 200})

      window.location.reload()


      
    } catch (error) {
      console.log(error)
      return error
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
          <div><img style={{margin:'auto', width:'50%', padding:'20px', display:'block'}} src="/images/loading.gif" alt="loading"/></div>
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
