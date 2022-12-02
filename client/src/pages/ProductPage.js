import React from "react";
import styled from "styled-components";
import ProductList from "../components/ProductList";
import OneProduct from "../components/OneProduct";
import { useParams } from "react-router-dom";

function ProductPage() {
    const { id, productId } = useParams();

  return (
    <>
        <OneProduct businessId={id} productId={productId} />
    </>
  );
}

export default ProductPage;

