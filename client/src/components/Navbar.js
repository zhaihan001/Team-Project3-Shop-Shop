import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Auth from '../utils/auth'
import { Palette } from './Palette'


function Navbar() {
    const location = useLocation();

  return (
    <Nav>

{/* <Icon src="https://c.tenor.com/TYWdCAZu258AAAAC/guardians-of-the-galaxy-rocket-raccoon.gif"/> */}

        <NavMenu>

        <Link to="/">
            <img src='/images/home-icon.png' alt='home'/>
            <span>HOME</span>
        </Link>

        <Link to="/saved">
            <img src='/images/saved-icon.png' alt='saved'/>
            <span>SAVED</span>
        </Link>

        <Link to="/usershop"> 
            <img src='/images/shop-icon.png' alt='myshop'/>
            <span>MY SHOP</span>
        </Link>

        <Link to="/profile">
             <img src='/images/profile-icon.png' alt='profile'/>
            <span>PROFILE</span>
        </Link>

        <Link to="/cart">
            <img src='/images/cart-icon.png' alt='cart'/>
            <span>CART</span>
        </Link>

        {!Auth.loggedIn() ? <Link to="/login" state={{previousUrl: location.pathname}}>
            <img src='/images/login-icon.png' alt='login'/>
            <span>LOGIN | JOIN</span>
        </Link> :
        <button onClick={() => Auth.logout()}>LOGOUT</button>
        }

        </NavMenu>

    </Nav>
  )
}

export default Navbar

const Nav = styled.nav`
height: 70px;
background: ${Palette.brown};;
display: flex;
align-items: center;
padding: 0 36px;
overflow-x: hidden;

`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-around;
    margin-left: 25px;
    align-items: center;

    button {
        background: none;
        font-size: 20px;
        font-weight: bold;
        color: ${Palette.grey};
        transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

        &:hover {
            transform: scaleX(1);
            opacity: 1;
            color: ${Palette.red};
        }
    }

    a:visited { 
        text-decoration: none;
        color: ${Palette.grey}; 
       }
    

    a {
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        color: ${Palette.grey};
        text-decoration: none; 

        img {
            height: 20px;
            margin: 5px 5px 8px 5px;

        @media (max-width: 800px) {
            height: 30px;
            &:hover {
                -webkit-filter: brightness(150%);
            }
             }
        }

        span {
            letter-spacing: 1.42px;
            position: relative;
            font-size: 20px;
            font-weight: bold;

            @media (max-width: 800px) {
               display: none;
              }

            &:after {
                content: "";
                height: 3px;
                background: ${Palette.blue};
                position: absolute;
                left: 0;
                right: 0;
                bottom: -5px;
                opacity: 0;
                transform-origin: center;
                transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
                color: ${Palette.blue};
            }
        }

        &:hover {
            color: white;
            span:after {
                transform: scaleX(1);
                opacity: 1;
                color: white;
            }
        }
    }
`

const Icon = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`