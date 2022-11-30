import React from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useQuery } from "@apollo/client";
import { GET_CART } from "../utils/queries";

function CartPage() {
  const { loading, data } = useQuery(GET_CART);
  const cartItems = data?.cartItems || [];

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