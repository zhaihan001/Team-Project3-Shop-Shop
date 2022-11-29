import React from 'react'
import styled from 'styled-components'

function Profile() {
  return (
    <Container>
    <h2>My Profile</h2>
    <Wrap>
   <img src="/images/teddy-bear.jpg" alt=""/>
   <p>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
   </p>
   </Wrap>
</Container>
  )
}

export default Profile

const Container = styled.div`

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
    color: black;
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
 }

`

const Wrap = styled.div`

display: flex;
padding-bottom: 80px;

img {
  width: 30%;
  height: 30%;
  margin: 10px 0px 10px 100px;
  border-radius: 3px;
}

p {
  margin: 10px 100px 10px 100px;
  font-size: 20px;
  border: thick solid black;
  color: #273748;
  padding: 20px;
  border-radius: 3px;
}
`