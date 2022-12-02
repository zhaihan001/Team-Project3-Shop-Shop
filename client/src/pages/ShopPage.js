import React from "react";
import ProductList from "../components/ProductList";
import {  useParams } from "react-router-dom";

function ShopPage() {
    const { id } = useParams();

  return (
    <>
        <ProductList id={id} />
    </>
  );
}

export default ShopPage;

