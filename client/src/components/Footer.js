import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Palette } from './Palette';
import Auth from "../utils/auth";

function Footer() {
  return (
    <Container>
        <h4>Thanks for Shop-Shopping</h4>
        <Link href="/">Home</Link>
        <Link href="/saved">Saved</Link>
        <Link href="/usershop">My Shop</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/cart">Cart</Link>
        {!Auth.loggedIn() ? <Link href="/login">Login | Join</Link> : <button onClick={() => Auth.logout()}>Logout</button>}
    </Container>
  )
}

export default Footer

const Container = styled.div`
background-color: ${Palette.brown};
height: 200px;

  button{
    cursor: pointer;
    font-weight: 700;
    background-color: transparent;
    color: ${Palette.fadedGrey}
  }

h4, a {
    padding: 20px;
    color: ${Palette.fadedGrey};
}

a:hover {
    cursor: pointer;
    color: ${Palette.grey};
}

`