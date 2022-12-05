import React from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_CART, GET_CART_ITEMS } from "../utils/queries";

function CartPage() {
  const { loading, data } = useQuery(GET_CART_ITEMS);
  console.log(data);
  const cartItems = data?.cartItems || null;
  console.log(cartItems);

  return (
    <div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          // render cart items
          <ShoppingCart
            cartItems={cartItems}
            title="Your Shopping Cart Items"
          />
        )}
      </div>
    </div>
  );
}

export default CartPage;
