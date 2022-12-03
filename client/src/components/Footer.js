import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { Palette } from './Palette';
import Auth from "../utils/auth";

function Footer() {
  const location = useLocation();

  return (
    <Container>
        <h4>Thanks for Shop-Shopping</h4>
        <Link to="/">Home</Link>
        <Link to="/saved">Saved</Link>
        <Link to="/usershop">My Shop</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart">Cart</Link>
        {!Auth.loggedIn() ? <Link to="/login" state={{previousUrl: location.pathname}}>Login | Join</Link> : <button onClick={() => Auth.logout()}>Logout</button>}
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