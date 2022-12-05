import React from "react";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import OneProduct from "../components/OneProduct";
import { useLocation, useParams } from "react-router-dom";

function ProductPage() {
    const { id, productId } = useParams();
    const location = useLocation();



  return (
    <>
        <OneProduct businessId={id} productId={productId} price={location.state.price} />
    </>
  );
}

export default ProductPage;

