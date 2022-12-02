import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../contexts/UserContext";
import Auth from "../utils/auth";
import { Palette } from './Palette';

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const { login } = useUserContext();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userData },
      });
      Auth.login(data.login.token);

      // navigate to my shop or user account page after

      window.location.assign("/");

      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <Container>
      <LoginForm>
        <form onSubmit={formSubmit}>
          <h2>Login</h2>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleFormChange}
            value={userData.username}
            type="text"
            name="username"
            id="username"
          />
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleFormChange}
            value={userData.password}
            type="password"
            name="password"
            id="password"
          />
          <input type="submit" value="Login" />
          <a href="/signup">Need an account? Signup Here</a>
        </form>
      </LoginForm>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  padding-top: 3vw;
  overflow-x: hidden;
  position: relative;
  background-image: url("/images/scribbles.png");
  background-size: cover;

  h2 {
    font-size: 40px;
    text-decoration: underline;
    color: ${Palette.red};
    font-weight: bold;
    letter-spacing: 1px;
    word-spacing: 4px;
    text-underline-offset: 8px;
    margin-bottom: 5vh;
  }
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    padding: 60px;

  input {
    width: 300px;
    min-height: 35px;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid ${Palette.brown};
    &:focus {
      border: 2px solid ${Palette.red};

      }
    }
  }

  label {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${Palette.blue};
  }

  // LOGIN BUTTON STYLES

  input[type="submit"] {
    padding: 20px;
    margin-top: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    background: ${Palette.blue};
    color: white;
    border: none;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    &:hover {
      transform: scale(1.05);
      border-color: rgba(249, 249, 249, 0.8);
      background: ${Palette.blue};
      color: white;
    }
  }

  // Signup link

  a {
    padding-top: 20px;
    color: ${Palette.red};
  }
`;
