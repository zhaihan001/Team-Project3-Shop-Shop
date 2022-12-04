import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Palette } from "./Palette";
import Auth from "../utils/auth";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function Profile() {
  const [image, setImage] = useState(null);
  const location = useLocation();
  const { userData } = useUserContext();
  console.log(userData);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" state={{ previousUrl: location.pathname }} />;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
  const redirectMyShop = () => window.location.assign("/usershop");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  // useEffect(() => {
  //   if(image){
  //     const reader = new FileReader();

  //     reader.onloadend = (e) => {
  //       setDataUrl(e.target.result)
  //     }

  //     reader.readAsDataURL(image)

  //   }

  // }, [image])
  return (
    <Container>
      <h2>{userData.user.username}'s Profile</h2>
      <Wrap>
        <Col>
          <img src="/images/plastic-horses.jpg" alt="" />
          <input
            onChange={handleImageChange}
            type="file"
            name="profileImange"
            id="profileImange"
          />
          <br></br>
        </Col>
        <Content>
          <h3>Welcome, {userData.user.username}</h3>
          <p>Buyer | Seller</p>
          <button onClick={redirectMyShop}>View My Shop</button>
          <button>Edit My Shop</button>
        </Content>
      </Wrap>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  background-image: url("/images/scribbles.png");
  background-size: cover;

  h2 {
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: left;
    padding-left: 17%;
    padding-top: 8vw;
    margin-bottom: 70px;
    font-size: 40px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
    text-shadow: 2px 2px white;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    color: white;
    background-color: ${Palette.blue};
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    margin-left: 110px;
    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      background-color: ${Palette.red};
      transform: scale(1.05);
    }
  }
`;

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
`;

const Wrap = styled.div`
  display: flex;
  padding-bottom: 80px;
  flex-direction: row;

  img {
    width: 80%;
    height: 80%;
    margin: 10px 0px 10px 100px;
    clip-path: circle();
  }
`;
