import React from 'react'
import styled from "styled-components";
import { Palette } from './Palette';

function Footer() {
  return (
    <Container>
        <h4>Thanks for Shop-Shopping</h4>
        <a href="/">Home</a>
        <a href="/saved">Saved</a>
        <a href="/usershop">My Shop</a>
        <a href="/profile">Profile</a>
        <a href="/cart">Cart</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
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