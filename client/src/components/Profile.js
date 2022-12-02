import React from 'react'
import styled from 'styled-components'
import { Palette } from './Palette';

function Profile() {
  return (
    <Container>
    <h2>My Profile</h2>
    <Wrap>
   <img src="/images/plastic-horses.jpg" alt=""/>
   <Content>
  <h3>Welcome Skully</h3>
  <p>Buyer | Seller</p>
  <button>View My Shop</button>
  <button>Edit My Shop</button>
  </Content>
   </Wrap>
</Container>
  )
}

export default Profile

const Container = styled.div`
background-image: url("/images/scribbles.png");
  background-size: cover;

  h2 {
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: left;
    padding-left: 15%;
    padding-top: 8vw;
    margin-bottom: 70px;
    font-size: 40px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
 }

`

const Content = styled.div`
margin: 10px 100px 10px 100px;
font-size: 20px;
border: thick solid ${Palette.grey};
background-color: white;
color: #273748;
padding: 20px;
border-radius: 3px;
width: 50%;
align-items: center;
text-align: center;

h3 {
  color: ${Palette.red};
  text-decoration: underline dotted;
  text-underline-offset: 5px;
}

p {
  color: ${Palette.fadedGrey};
}

button {
  color: white;
  background-color: ${Palette.blue};
  font-size: 20px;
  padding: 10px;
  margin: 10px;
  transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  &:hover {
    background-color: ${Palette.red};
    transform: scale(1.05);
  }
}
`

const Wrap = styled.div`

display: flex;
padding-bottom: 80px;
flex-direction: row;

img {
  width: 30%;
  height: 30%;
  margin: 10px 0px 10px 100px;
  clip-path: circle();
}

`