import React from 'react'
import styled from "styled-components";
import { Palette } from './Palette';

function Footer() {
  return (
    <Container>
        <h4>Thanks for Shop-Shopping</h4>
        <a>Home</a>
        <a>Saved</a>
        <a>My Shop</a>
        <a>Profile</a>
        <a>Cart</a>
        <a>Login</a>
        <a>Signup</a>
    </Container>
  )
}

export default Footer

const Container = styled.div`
background-color: ${Palette.brown};
height: 200px;

h4, a {
    padding: 20px;
    color: ${Palette.fadedGrey};
}

a:hover {
    cursor: pointer;
    color: ${Palette.grey};
}

`